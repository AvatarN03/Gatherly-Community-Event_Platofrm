import { useState } from "react";
import { Bell, Plus, Pin } from "lucide-react";
import { useCommunityContext } from "../../context/communityContext";
import { useCommunityNoticesQuery } from "../../hooks/useCommunityNoticeQueries";
import { useCreateCommunityNoticeMutation, useDeleteCommunityNoticeMutation, useTogglePinCommunityNoticeMutation, useUpdateCommunityNoticeMutation } from "../../hooks/useCommunityNoticeMutations";
import NoticeCard from "../../components/community/NoticeCard";
import CreateNoticeModal from "../../components/community/CreateNoticeModal";
import type { CreateCommunityNotice, CommunityNotice } from "../../types/community";

const CommunityNoticePage = () => {
  const { community, isCreator, isAdmin, currentUserId } = useCommunityContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<CommunityNotice | null>(null);

  const canManage = isCreator || isAdmin;

  const { data: notices = [], isLoading } = useCommunityNoticesQuery(community?.id);

  const createMutation = useCreateCommunityNoticeMutation();
  const deleteMutation = useDeleteCommunityNoticeMutation();
  const togglePinMutation = useTogglePinCommunityNoticeMutation();
  const updateMutation = useUpdateCommunityNoticeMutation();

  // Separate pinned and regular notices
  const pinnedNotices = notices.filter(n => n.pinned);
  const regularNotices = notices.filter(n => !n.pinned);

  const handleCreate = (noticeData: CreateCommunityNotice) => {
    createMutation.mutate({
      communityId: community.id,
      noticeData,
    }, {
      onSuccess: () => setShowCreateModal(false),
    });
  };

  const handleDelete = (noticeId: string) => {
    deleteMutation.mutate({
      communityId: community.id,
      noticeId,
    });
  };

  const handleTogglePin = (noticeId: string) => {
    togglePinMutation.mutate({
      communityId: community.id,
      noticeId,
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 rounded-2xl border border-teal-200 bg-white/90 p-5 shadow-sm shadow-teal-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Community Notices
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Important announcements for {community.name}
              </p>
            </div>
          </div>
          
          {canManage && (
            <button
              type="button"
              onClick={() => {
                setEditingNotice(null);
                setShowCreateModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Create Notice
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <p className="text-sm text-slate-500">Loading notices...</p>
          </div>
        )}

        {/* No notices */}
        {!isLoading && notices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="p-4 bg-slate-100 rounded-full">
              <Bell className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">No notices yet</p>
            {canManage && (
              <p className="text-xs text-slate-400 text-center">
                Create the first notice to inform your community members
              </p>
            )}
          </div>
        )}

        {/* Pinned notices */}
        {pinnedNotices.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
              <Pin className="w-4 h-4 text-orange-500" />
              Pinned Notices
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pinnedNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isAdminOrCreator={canManage}
                  isAuthor={notice.author.id === currentUserId}
                  onEdit={() => {
                    setEditingNotice(notice);
                    setShowCreateModal(true);
                  }}
                  onDelete={() => handleDelete(notice.id)}
                  onTogglePin={() => handleTogglePin(notice.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular notices */}
        {regularNotices.length > 0 && (
          <div className={pinnedNotices.length > 0 ? "mt-6" : ""}>
            <h2 className="text-sm font-semibold text-slate-600 mb-3">
              Recent Notices
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regularNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isAdminOrCreator={canManage}
                  isAuthor={notice.author.id === currentUserId}
                  onEdit={() => {
                    setEditingNotice(notice);
                    setShowCreateModal(true);
                  }}
                  onDelete={() => handleDelete(notice.id)}
                  onTogglePin={() => handleTogglePin(notice.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <CreateNoticeModal
        open={showCreateModal}
        isPending={createMutation.isPending || updateMutation.isPending}
        editingNotice={editingNotice}
        onCancel={() => {
          setShowCreateModal(false);
          setEditingNotice(null);
        }}
        onConfirm={(noticeData) => {
          if (editingNotice) {
            updateMutation.mutate(
              {
                communityId: community.id,
                noticeId: editingNotice.id,
                noticeData,
              },
              {
                onSuccess: () => {
                  setShowCreateModal(false);
                  setEditingNotice(null);
                },
              },
            );
          } else {
            handleCreate(noticeData);
          }
        }}
      />
    </div>
  );
};

export default CommunityNoticePage;
