import { useState } from "react";
import { Pin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "../../lib/date";
import type { CommunityNotice } from "../../types/community";

interface NoticeCardProps {
  notice: CommunityNotice;
  isAdminOrCreator: boolean;
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePin?: () => void;
}


const NoticeCard = ({ notice, isAdminOrCreator, isAuthor, onEdit, onDelete, onTogglePin }: NoticeCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const canManage = isAdminOrCreator || isAuthor;

  return (
    <div className="bg-white/80 border border-stone/200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Notice header with title and pin indicator */}
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold text-night">{notice.title}</h3>
            {notice.pinned && (
              < Pin className="w-4 h-4 text-orange-500 fill-orange-500" />
            )}
          </div>

          {/* Notice content */}
          <div className="prose max-w-none text-fog/80 text-sm">
            <p className="whitespace-pre-wrap">{notice.content}</p>
          </div>

          {/* Notice footer with author and timestamp */}
          <div className="flex items-center gap-2 mt-4 text-xs text-fog/50">
            <div className="flex items-center gap-1.5">
              {notice.author.imageUrl ? (
                <img
                  src={notice.author.imageUrl}
                  alt={notice.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-orchid/20 flex items-center justify-center text-lavender font-bold text-xs">
                  {notice.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-fog/70">{notice.author.name}</span>
            </div>
            <span className="text-stone/40">•</span>
            <span>
              {formatDistanceToNow(new Date(notice.createdAt))}
            </span>
            {notice.updatedAt !== notice.createdAt && (
              <>
                <span className="text-stone/40">•</span>
                <span>Edited {formatDistanceToNow(new Date(notice.updatedAt))}</span>
              </>
            )}
          </div>
        </div>

        {/* Action menu for admin/creator/author */}
        {canManage && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg text-fog/40 hover:text-night hover:bg-stone/10 transition-colors"
              title="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                role="menu"
                className="absolute right-0 mt-1 w-40 rounded-md border border-stone/200 bg-white py-1 shadow-lg z-50 overflow-hidden"
                onClick={() => setShowMenu(false)}
              >
                {onTogglePin && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin();
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition ${notice.pinned ? "text-orange-600 hover:bg-orange-50" : "text-stone-700 hover:bg-stone/10"}`}
                  >
                    <Pin className="w-4 h-4" />
                    <span>{notice.pinned ? "Unpin notice" : "Pin notice"}</span>
                  </button>
                )}
                {onEdit && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone/10 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
