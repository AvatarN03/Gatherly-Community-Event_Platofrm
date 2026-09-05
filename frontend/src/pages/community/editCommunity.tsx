import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Tag, Users, X } from "lucide-react";
import toast from "react-hot-toast";

import { Field } from "../../components/Field";
import { ImageUpload } from "../../components/ImageUpload";
import LocationPicker from "../../components/shared/LocationPicker";
import RichTextEditor from "../../components/shared/RichTextEditor";
import { COMMUNITY_CATEGORIES, FieldClass } from "../../constant";
import { useCommunityContext } from "../../context/communityContext";
import type { CommunityCategory, CreateCommunity } from "../../types/community";
import { useUpdateCommunityMutation } from "../../hooks/useCommunityMutations";

const buildInitialFormData = (community: any): CreateCommunity => ({
  name: community?.name ?? "",
  description: community?.description ?? "",
  location: community?.location ?? "",
  category: community?.category ?? COMMUNITY_CATEGORIES[0].value,
  latitude: community?.latitude ?? null,
  longitude: community?.longitude ?? null,
  tags: community?.tags ?? [],
});

const EditCommunityPage = () => {
  const navigate = useNavigate();
  const { community } = useCommunityContext();
  const updateMutation = useUpdateCommunityMutation();


  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreateCommunity>(() =>
    buildInitialFormData(community),
  );
  const [errors, setErrors] = useState<Partial<CreateCommunity>>({});

  useEffect(() => {
    setFormData(buildInitialFormData(community));
    setImageFile(null);
    setTagInput("");
    setErrors({});
  }, [community]);

  const previewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    const payload = new FormData()
    payload.append('name', formData.name ?? '')
    payload.append('description', formData.description ?? '')
    payload.append('location', formData.location ?? '')
    payload.append('category', formData.category ?? '')
    if (imageFile) {
      payload.append('updateCommunityImage', imageFile)
      if (community.imageFileId) payload.append('imageFileId', community.imageFileId)
    }

    try {
      const data = await toast.promise(
        updateMutation.mutateAsync({ slug: community.slug, data: payload }),
        {
          loading: 'Updating community...',
          success: 'Community updated successfully!',
          error: 'Failed to update community. Please try again.',
        }
      )

      console.log("Updated community data:", data);
      toast.success("Community details updated.");
      navigate(`/communities/${data.slug}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-10 px-2 md:px-4 min-h-dvh bg-linear-to-b from-teal-50 via-cyan-500 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 rounded-md md:rounded-2xl border border-teal-500 bg-white/80 shadow-sm shadow-teal-100 p-3 md:p-5">
          <button
            type="button"
            onClick={() => navigate(`/communities/${community.slug}`)}
            className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm text-teal-700 transition-colors hover:bg-teal-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-semibold text-teal-900 tracking-tight">
            Edit Community
          </h1>
          <p className="text-teal-700/90 text-sm mt-2">
            Update the existing community details below. The slug stays visible
            so people can reference the current community URL.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-8 rounded-md border border-teal-600 bg-white/85 shadow-sm shadow-teal-100 p-5">
              <Field
                label="Community Name *"
                attach="name"
                error={errors.name}
              >
                <div className={FieldClass.formClass}>
                  <Users className="w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSaving}
                    className={FieldClass.inputClass}
                  />
                </div>
              </Field>

              <Field label="Slug" attach="slug">
                <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-900">
                  {community.slug}
                </div>
              </Field>

              <Field
                label="Category *"
                attach="category"
                error={errors.category}
                classes="cursor-pointer"
              >
                <div className={FieldClass.formClass}>
                  <Tag className="w-4 h-4" />
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isSaving}
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

              <Field label="Tags" attach="tags">
                <div className="space-y-3">
                  <div className={FieldClass.formClass}>
                    <Tag className="w-4 h-4" />
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          addTag(tagInput);
                          setTagInput("");
                        }
                      }}
                      disabled={isSaving}
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
                attach="description"
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
                  disabled={isSaving}
                  placeholder="What is this community about?"
                />
              </Field>
            </div>

            <div className="flex flex-col gap-8 rounded-md border border-teal-600 bg-white/85 shadow-sm shadow-teal-100 p-5">
              <ImageUpload
                file={imageFile}
                onChange={setImageFile}
                label="Community Image"
                existingImageUrl={community.imageUrl}
                disabled={isSaving}
              />

              <Field
                label="Location *"
                attach="location"
                error={errors.location}
              >
                <LocationPicker
                  id="location"
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

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => navigate(`/communities/${community.slug}`)}
              className="flex-1 bg-white border border-teal-200 text-teal-700 py-2.5 px-6 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-6 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm shadow-teal-200"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommunityPage;
