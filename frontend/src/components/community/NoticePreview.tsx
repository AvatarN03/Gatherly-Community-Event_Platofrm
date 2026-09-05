import { Pin } from "lucide-react";
import { formatDistanceToNow } from "../../lib/date";
import type { CommunityNotice } from "../../types/community";

interface NoticePreviewProps {
  notice: CommunityNotice | null;
  title: string;
}

const NoticePreview = ({ notice, title }: NoticePreviewProps) => {
  if (!notice) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
        <p className="text-sm text-slate-500">No {title.toLowerCase()} notice</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Pin className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 truncate">{notice.title}</h4>
          <p className="text-xs text-slate-500">
            Posted {formatDistanceToNow(new Date(notice.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-700 line-clamp-3">{notice.content}</p>
    </div>
  );
};

export default NoticePreview;
