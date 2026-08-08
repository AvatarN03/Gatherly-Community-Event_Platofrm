import {useUser} from "@clerk/react"
import {useEffect, useMemo, useState} from "react"
import {useNavigate} from "react-router-dom"
import {COMMUNITY_CATEGORIES, FieldClass} from "../../constant"
import type {CommunityCategory, CreateCommunity} from "../../types/community"
import toast from "react-hot-toast"
import {Loader2, MapPin, Tag, Users, X} from "lucide-react"
import {Field} from "../../components/Field"
import * as React from "react";
import {useCreateCommunityMutation} from "../../hooks/useCommunityMutations.ts";
import {ImageUpload} from "../../components/ImageUpload.tsx";
import LocationPicker from "../../components/shared/LocationPicker.tsx";
import RichTextEditor from "../../components/shared/RichTextEditor.tsx";
import {CommunityValidateForm, getSlateText} from "../../lib/validation.ts";
import {handleApiError} from "../../lib/axiosInstance.ts";

export const CreateCommunityPage = () => {
    const navigate = useNavigate()

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Partial<CreateCommunity>>({})

    const [formData, setFormData] = useState<CreateCommunity>({
        name: '',
        description: '',
        location: '',
        category: COMMUNITY_CATEGORIES[0].value,
        latitude: null,
        longitude: null,
    })

    const {user, isLoaded} = useUser()

    const createMutation = useCreateCommunityMutation()

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const {name, value} = e.target

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "category"
                    ? (value as CommunityCategory)
                    : value,
        }))

        if (errors[name as keyof CreateCommunity]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!CommunityValidateForm(formData, setErrors)) return

        if (formData.latitude === null || formData.longitude === null) {
            setErrors((prev) => ({
                ...prev,
                location: "Please select a location",
            }));
            return;
        }

        const payload = new FormData()
        payload.append('name', formData.name)
        payload.append('description', formData.description)
        payload.append('location', formData.location)
        payload.append('category', formData.category)
        payload.append("latitude", String(formData.latitude));
        payload.append("longitude", String(formData.longitude));

        if (imageFile) {
            payload.append('communityImage', imageFile)
        }

        try {
            const data = await toast.promise(createMutation.mutateAsync(payload), {
                loading: 'Creating community...',
                success: 'Community created successfully!',
                error: 'Failed to create community',
            })

            toast.success(data.message)

            navigate(`/communities/${data.community.slug}`, {
                replace: true,
            });
        } catch (error: unknown) {
            handleApiError(error);
        }
    }

    const previewUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : null), [imageFile])

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    useEffect(() => {
        if (!user && isLoaded) {
            navigate('/communities')
        }
    }, [user, isLoaded, navigate])


    return (
        <div className=" bg-black py-10 px-4 min-h-dvh">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-mist">Create a Community</h1>
                    <p className="text-stone text-sm mt-1">Fill in the details to start your community</p>
                </div>

                {createMutation.isError && (
                    <div
                        className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        <X className="w-4 h-4 shrink-0"/>
                        Failed to create community. Please try again.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* 2-column on desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT column */}
                        <div className="flex flex-col gap-10">
                            <ImageUpload
                                file={imageFile}
                                onChange={setImageFile}
                                // disabled={createMutation.isPending}
                                label="Community Image"
                            />
                            <Field label="Location *" attach={"location"} error={errors.location}>
                                <LocationPicker
                                    id={"location"}
                                    initialAddress={formData.location}
                                    initialLat={formData.latitude ?? undefined}
                                    initialLng={formData.longitude ?? undefined}
                                    onLocationChange={({address, lat, lng}) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            location: address,
                                            latitude: lat,
                                            longitude: lng,
                                        }));
                                    }}
                                />
                            </Field>

                            {/* Preview card */}
                            {formData.name && (
                                <div className="bg-deep-ocean/75 border border-stone rounded-xl p-4">
                                    <p className="text-fog text-xs uppercase tracking-widest mb-3">Preview</p>

                                    {previewUrl && (
                                        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                                            <img src={previewUrl} alt="Community"
                                                 className="w-full h-full object-cover"/>
                                        </div>
                                    )}
                                    <p className="text-mist font-medium truncate">{formData.name}</p>
                                    {formData.description && (
                                        <p className="text-fog/75 text-sm mt-1 line-clamp-2">{getSlateText(formData.description)}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-3">
                                        {formData.location && (
                                            <span
                                                className="text-mist text-xs flex items-center gap-1 py-0.5 px-2 bg-slate-800/50 border border-slate-700 rounded-full">
                        <MapPin className="w-3 h-3 text-fog"/>
                                                {formData.location}
                      </span>
                                        )}
                                        <span
                                            className="text-xs text-lavender bg-orchid/10 border border-orchid/20 px-2 py-0.5 rounded-full block ml-auto">
                      {
                          COMMUNITY_CATEGORIES.find(
                              (category) => category.value === formData.category
                          )?.label
                      }
                    </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT column */}
                        <div className="flex flex-col gap-10">

                            <Field label="Community Name *" attach={"name"} error={errors.name}>
                                <div className={FieldClass.formClass}>
                                    <Users className="w-6 h-6 text-stone transition  group-focus-within:text-cocoa"/>
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

                            <Field label="Category *" attach={"category"} error={errors.category}
                                   classes={'cursor-pointer'}>
                                <div className={FieldClass.formClass}>
                                    <Tag className="w-6 h-6 text-stone transition  group-focus-within:text-cocoa"/>
                                    <select
                                        name="category"
                                        id={"category"}
                                        value={formData.category}
                                        onChange={handleChange}
                                        disabled={createMutation.isPending}
                                        className={FieldClass.selectClass}
                                    >
                                        {COMMUNITY_CATEGORIES.map(({value, label}) => (
                                            <option key={value} value={value} className="bg-forest">
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Field>


                            <Field label="Description *" attach={"description"} error={errors.description}>
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


                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-8">

                        <button
                            type="button"
                            disabled={createMutation.isPending}
                            onClick={() => navigate('/communities')}
                            className="flex-1 bg-forest-teal border border-lavender/50  text-mist py-2.5 px-6 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-forest-teal hover:bg-forest-teal/90 "
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="flex-1 flex items-center justify-center gap-2 bg-orchid hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-mist py-2.5 px-6 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                    Creating...
                                </>
                            ) : (
                                'Create Community'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
