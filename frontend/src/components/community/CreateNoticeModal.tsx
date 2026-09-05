import { useState, useEffect, type FormEvent } from "react";
import { Pin, X, Loader2 } from "lucide-react";
import type { CreateCommunityNotice, CommunityNotice } from "../../types/community";

interface CreateNoticeModalProps {
  open: boolean;
  isPending: boolean;
  editingNotice?: CommunityNotice | null;
  onCancel: () => void;
  onConfirm: (noticeData: CreateCommunityNotice) => void;
}

const CreateNoticeModal = ({ open, isPending, editingNotice, onCancel, onConfirm }: CreateNoticeModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);

  // Set initial values when editing
  useEffect(() => {
    if (editingNotice) {
      setTitle(editingNotice.title);
      setContent(editingNotice.content);
      setPinned(editingNotice.pinned);
    } else if (open) {
      setTitle("");
      setContent("");
      setPinned(false);
    }
  }, [editingNotice, open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onConfirm({
      title: title.trim(),
      content: content.trim(),
      pinned,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {editingNotice ? "Edit Notice" : "Create Notice"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={isPending}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title..."
                disabled={isPending}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter notice content..."
                rows={6}
                disabled={isPending}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors disabled:opacity-50 resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  disabled={isPending}
                  className="w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-slate-600">Pin this notice</span>
                <Pin className="w-4 h-4 text-orange-500/70" />
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !title.trim()}
              className="flex-1 py-3 rounded-xl bg-emerald-600 border border-emerald-700 text-white text-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {editingNotice ? "Updating..." : "Creating..."}
                </>
              ) : (
                editingNotice ? "Update Notice" : "Create Notice"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoticeModal;
