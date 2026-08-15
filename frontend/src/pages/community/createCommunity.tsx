import { useUser } from "@clerk/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMMUNITY_CATEGORIES, FieldClass } from "../../constant";
import type { CommunityCategory, CreateCommunity } from "../../types/community";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Tag, Users, X } from "lucide-react";
import { Field } from "../../components/Field";
import * as React from "react";
import { useCreateCommunityMutation } from "../../hooks/useCommunityMutations.ts";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import LocationPicker from "../../components/shared/LocationPicker.tsx";
import RichTextEditor from "../../components/shared/RichTextEditor.tsx";
import { CommunityValidateForm } from "../../lib/validation.ts";
import { handleApiError } from "../../lib/axiosInstance.ts";

export const CreateCommunityPage = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<CreateCommunity>>({});
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState<CreateCommunity>({
    name: "",
    description: "",
    location: "",
    category: COMMUNITY_CATEGORIES[0].value,
    latitude: null,
    longitude: null,
    tags: [],
  });

  const { user, isLoaded } = useUser();

  const createMutation = useCreateCommunityMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "category" ? (value as CommunityCategory) : value,
    }));

    if (errors[name as keyof CreateCommunity]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!CommunityValidateForm(formData, setErrors)) return;

    if (formData.latitude === null || formData.longitude === null) {
      setErrors((prev) => ({
        ...prev,
        location: "Please select a location",
      }));
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("category", formData.category);
    payload.append("latitude", String(formData.latitude));
    payload.append("longitude", String(formData.longitude));
    payload.append("tags", JSON.stringify(formData.tags ?? []));

    if (imageFile) {
      payload.append("communityImage", imageFile);
    }

    try {
      const data = await toast.promise(createMutation.mutateAsync(payload), {
        loading: "Creating community...",
        success: "Community created successfully!",
        error: "Failed to create community",
      });

      toast.success(data.message);

      navigate(`/communities/${data.community.slug}`, {
        replace: true,
      });
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  const previewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile],
  );

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim();
    if (!tag) return;
    setFormData((prev) => {
      const currentTags = prev.tags ?? [];
      if (
        currentTags.some(
          (existing) => existing.toLowerCase() === tag.toLowerCase(),
        )
      ) {
        return prev;
      }
      return {
        ...prev,
        tags: [...currentTags, tag],
      };
    });
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags ?? []).filter((tag) => tag !== tagToRemove),
    }));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!user && isLoaded) {
      navigate("/communities");
    }
  }, [user, isLoaded, navigate]);

  return (
    <div className="py-10 px-2 md:px-4 min-h-dvh bg-linear-to-b from-teal-50 via-cyan-500 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 rounded-md md:rounded-2xl border border-teal-500 bg-white/80 shadow-sm shadow-teal-100 p-3 md:p-5">
          <button
            type="button"
            onClick={() => navigate("/communities")}
            className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm text-teal-700 transition-colors hover:bg-teal-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-semibold text-teal-900 tracking-tight">
            Create Community
          </h1>
          <p className="text-teal-700/90 text-sm mt-2">
            Set up your community by adding a name, details, and basic info so
            people can discover and join it.
          </p>
        </div>
        {createMutation.isError && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            <X className="w-4 h-4 shrink-0" />
            Failed to create community. Please try again.
          </div>
        )}
        // TODO: Add the logo and banner seperate
        <form onSubmit={handleSubmit}>
          {/* 2-column on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT column */}
            <div className="flex flex-col gap-8 rounded-md border border-teal-600 bg-white/85 shadow-sm shadow-teal-100 p-5">
              <Field
                label="Community Name *"
                attach={"name"}
                error={errors.name}
              >
                <div className={FieldClass.formClass}>
                  <Users className="w-4 h-4" />
                  <input
                    type="text"
                    id={"name"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={createMutation.isPending}
                    placeholder="e.g. Mumbai Photographers"
                    className={FieldClass.inputClass}
                  />
                </div>
              </Field>

              <Field
                label="Category *"
                attach={"category"}
                error={errors.category}
                classes={"cursor-pointer"}
              >
                <div className={FieldClass.formClass}>
                  <Tag className="w-4 h-4 " />
                  <select
                    name="category"
                    id={"category"}
                    value={formData.category}
                    onChange={handleChange}
                    disabled={createMutation.isPending}
                    className={FieldClass.selectClass}
                  >
                    {COMMUNITY_CATEGORIES.map(({ value, label }) => (
                      <option
                        key={value}
                        value={value}
                        className="bg-teal-50 text-teal-900"
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label="Tags" attach={"tags"}>
                <div className="space-y-3">
                  <div className={FieldClass.formClass}>
                    <Tag className="w-4 h-4 " />
                    <input
                      type="text"
                      id={"tags"}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          addTag(tagInput);
                          setTagInput("");
                        }
                      }}
                      disabled={createMutation.isPending}
                      placeholder="Type a tag and press Enter"
                      className={FieldClass.inputClass}
                    />
                  </div>
                  {(formData.tags ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(formData.tags ?? []).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700 hover:bg-teal-100"
                        >
                          {tag}
                          <X className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              <Field
                label="Description *"
                attach={"description"}
                error={errors.description}
              >
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  disabled={createMutation.isPending}
                  placeholder="What is this community about?"
                />
              </Field>
            </div>

            {/* RIGHT column */}
            <div className="flex flex-col gap-8 rounded-md border border-teal-600 bg-white/85 shadow-sm shadow-teal-100 p-5">
              <ImageUpload
                file={imageFile}
                onChange={setImageFile}
                label="Community Image"
              />

              <Field
                label="Location *"
                attach={"location"}
                error={errors.location}
              >
                <LocationPicker
                  id={"location"}
                  initialAddress={formData.location}
                  initialLat={formData.latitude ?? undefined}
                  initialLng={formData.longitude ?? undefined}
                  onLocationChange={({ address, lat, lng }) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: address,
                      latitude: lat,
                      longitude: lng,
                    }));
                  }}
                />
              </Field>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              disabled={createMutation.isPending}
              onClick={() => navigate("/communities")}
              className="flex-1 bg-white border border-teal-200 text-teal-700 py-2.5 px-6 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm shadow-teal-200"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Community"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
