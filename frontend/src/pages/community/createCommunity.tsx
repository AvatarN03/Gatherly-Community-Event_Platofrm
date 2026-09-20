import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { COMMUNITY_CATEGORIES, FieldClass } from "../../constant";
import type { CommunityCategory, CreateCommunity } from "../../types/community";
import toast from "react-hot-toast";
import { ArrowLeft, Globe, Loader2, Lock, MapPin, Tag, Users, X } from "lucide-react";
import { Field } from "../../components/Field";
import { useCreateCommunityMutation } from "../../hooks/useCommunityMutations.ts";
import { ImageUpload } from "../../components/ImageUpload.tsx";
import LocationPicker from "../../components/shared/LocationPicker.tsx";
import { CommunityValidateForm } from "../../lib/validation.ts";
import { handleApiError } from "../../lib/axiosInstance.ts";

const DESC_MAX = 500;

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
    isPrivate: false,
    requireApproval: true,
  });

  const createMutation = useCreateCommunityMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category" ? (value as CommunityCategory) : value,
    }));
    if (errors[name as keyof CreateCommunity]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!CommunityValidateForm(formData, setErrors)) return;

    if (formData.latitude === null || formData.longitude === null) {
      setErrors((prev) => ({ ...prev, location: "Please select a location" }));
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
    payload.append("isPrivate", String(formData.isPrivate));
    payload.append("requireApproval", String(formData.requireApproval));

    if (imageFile) {
      payload.append("communityImage", imageFile);
    }

    try {
      const data = await toast.promise(createMutation.mutateAsync(payload), {
        loading: "Creating community...",
        success: "Community created successfully!",
        error: "Failed to create community",
      });

      navigate(`/communities/${data.community.slug}`, { replace: true });
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  const addTag = useCallback(
    (rawTag: string) => {
      const tag = rawTag.trim();
      if (!tag) return;
      setFormData((prev) => {
        const currentTags = prev.tags ?? [];
        if (currentTags.some((t) => t.toLowerCase() === tag.toLowerCase())) return prev;
        return { ...prev, tags: [...currentTags, tag] };
      });
    },
    [],
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setFormData((prev) => ({
        ...prev,
        tags: (prev.tags ?? []).filter((t) => t !== tagToRemove),
      }));
    },
    [],
  );

  const isPending = createMutation.isPending;

  return (
    <div className="min-h-dvh bg-background pb-16">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/communities")}
            className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Communities
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Create a New Community
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Bring people together around shared interests, goals, and passions.
            Build a community, create meaningful connections, and make an impact.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-8">
        {/* Error banner */}
        {createMutation.isError && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <X className="h-4 w-4 shrink-0" />
            Failed to create community. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* ─── LEFT: Form ─── */}
            <div className="flex flex-col gap-8 lg:col-span-3">
              {/* Section 1: Banner */}
              <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="mb-1 text-sm font-semibold text-foreground">
                  1. Community Banner
                </h2>
                <p className="mb-4 text-xs text-muted-foreground">
                  Add a banner image to represent your community.
                </p>
                <ImageUpload
                  file={imageFile}
                  onChange={setImageFile}
                  label="Community Image"
                  disabled={isPending}
                />
              </section>

              {/* Section 2: Basic Information */}
              <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-foreground">
                  2. Basic Information
                </h2>
                <div className="flex flex-col gap-5">
                  {/* Name + Category row */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Community Name *" attach="name" error={errors.name}>
                      <div className={FieldClass.formClass}>
                        <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isPending}
                          placeholder="e.g. Travel Enthusiasts"
                          className={FieldClass.inputClass}
                        />
                      </div>
                    </Field>

                    <Field label="Category *" attach="category" error={errors.category}>
                      <div className={FieldClass.formClass}>
                        <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <select
                          name="category"
                          id="category"
                          value={formData.category}
                          onChange={handleChange}
                          disabled={isPending}
                          className={FieldClass.selectClass}
                        >
                          {COMMUNITY_CATEGORIES.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Field>
                  </div>

                  {/* Location */}
                  <Field label="Location" attach="location" error={errors.location}>
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
                      disabled={isPending}
                    />
                  </Field>

                  {/* Description */}
                  <Field label="Description *" attach="description" error={errors.description}>
                    <div className="relative">
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isPending}
                        rows={5}
                        maxLength={DESC_MAX}
                        placeholder="Tell people what your community is about, what they can expect, and who can join..."
                        className="w-full resize-none rounded-md border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-colors"
                      />
                      <span className="absolute bottom-2.5 right-3 text-[10px] text-muted-foreground">
                        {formData.description.length}/{DESC_MAX}
                      </span>
                    </div>
                  </Field>
                </div>
              </section>

              {/* Section 3: Community Settings */}
              <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-foreground">
                  3. Community Settings
                </h2>

                {/* Privacy */}
                <p className="mb-2.5 text-xs font-medium text-foreground">Privacy</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setFormData((p) => ({ ...p, isPrivate: false }))}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                      !formData.isPrivate
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <Globe className={`h-5 w-5 shrink-0 ${!formData.isPrivate ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Public</p>
                      <p className="text-xs text-muted-foreground">Anyone can find and join</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setFormData((p) => ({ ...p, isPrivate: true }))}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                      formData.isPrivate
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <Lock className={`h-5 w-5 shrink-0 ${formData.isPrivate ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Private</p>
                      <p className="text-xs text-muted-foreground">Invite only</p>
                    </div>
                  </button>
                </div>

                {/* Membership Approval */}
                <div className="mt-5 flex items-start gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.requireApproval}
                    disabled={isPending}
                    onClick={() => setFormData((p) => ({ ...p, requireApproval: !p.requireApproval }))}
                    className={`mt-0.5 h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
                      formData.requireApproval ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        formData.requireApproval ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-foreground">Membership Approval</p>
                    <p className="text-xs text-muted-foreground">
                      Require approval for new members. You'll be able to review and approve join requests.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Tags */}
              <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <h2 className="mb-1 text-sm font-semibold text-foreground">
                  4. Community Tags (Optional)
                </h2>
                <p className="mb-4 text-xs text-muted-foreground">
                  Add relevant tags to help people find your community.
                </p>
                <div className="space-y-3">
                  <div className={FieldClass.formClass}>
                    <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
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
                      disabled={isPending}
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
                          className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          {tag}
                          <X className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Community"
                  )}
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => navigate("/communities")}
                  className="cursor-pointer rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* ─── RIGHT: Live Preview (desktop only) ─── */}
            <aside className="hidden lg:col-span-2 lg:block">
              <div className="sticky top-24">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Community Preview
                </h3>
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  {/* Preview image */}
                  <div className="h-40 w-full bg-accent">
                    {imageFile ? (
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImagePlaceholderIcon />
                      </div>
                    )}
                  </div>
                  {/* Preview content */}
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-card-foreground">
                      {formData.name || "Community Name"}
                    </h4>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {formData.location || "Location"}
                      <span className="mx-0.5">·</span>
                      {COMMUNITY_CATEGORIES.find((c) => c.value === formData.category)?.label ?? "Category"}
                    </div>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {formData.description ||
                        "This is how your community will appear to others. You can edit this later."}
                    </p>

                    {/* Member avatars placeholder */}
                    <div className="mt-4 text-xs text-muted-foreground">
                      <span className="font-medium text-card-foreground">Members (0)</span>
                    </div>

                    {/* Feature links */}
                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      {[
                        { icon: "📋", label: "Notices" },
                        { icon: "📅", label: "Events" },
                        { icon: "💬", label: "Chat" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.icon}</span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

/** Simple placeholder icon for the preview when no image is set */
const ImagePlaceholderIcon = () => (
  <svg className="h-10 w-10 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);
