import { MessageCircle, Send } from "lucide-react";
import { useCommunityContext } from "../../context/communityContext";

const CommunityChatPage = () => {
  const { community } = useCommunityContext();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Chat
              </h1>
              <p className="text-sm text-slate-600">
                Community chat for {community.name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col justify-between p-5">
          <div className="flex-1 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            This is the dedicated chat page for this community slug.
          </div>

          <form className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <input
              type="text"
              placeholder="Write a message..."
              className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm outline-none"
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityChatPage;
