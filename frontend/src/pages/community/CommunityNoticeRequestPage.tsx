import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BellPlus, Send } from "lucide-react";
import toast from "react-hot-toast";

import { useCommunityContext } from "../../context/communityContext";

const CommunityNoticeRequestPage = () => {
  const { community } = useCommunityContext();
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.success("Request draft saved for this session.");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-6 rounded-2xl border border-teal-200 bg-white/90 p-5 shadow-sm shadow-teal-100">
        <Link
          to={`/communities/${community.slug}`}
          className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm text-teal-700 transition-colors hover:bg-teal-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>

        <div className="mt-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <BellPlus className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Request a community notice
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Submit a notice request for {community.name}. This keeps the
              request scoped to the current community slug.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Request subject
          </span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="What should the notice cover?"
          />
        </label>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-slate-700">Details</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Describe why the notice is needed and what should be included."
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <Send className="h-4 w-4" />
            Submit request
          </button>
          <Link
            to={`/communities/${community.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CommunityNoticeRequestPage;
