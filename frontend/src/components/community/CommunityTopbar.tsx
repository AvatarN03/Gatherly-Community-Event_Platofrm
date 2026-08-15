import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  Bell,
  MessageCircle,
  MoreVertical,
  Pencil,
  Tag,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useCommunityContext } from "../../context/communityContext.ts";

type MenuItem = {
  key: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  danger?: boolean;
};

const CommunityTopbar = () => {
  const { community, isCreator, isAdmin, isMember } = useCommunityContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  if (!community) return null;

  const memberItems: MenuItem[] = isMember
    ? [
        { key: "chat", label: "Chat", icon: MessageCircle, onClick: () => {} },
        { key: "members", label: "Members", icon: Users, onClick: () => {} },
      ]
    : [];

  const adminItems: MenuItem[] = isAdmin
    ? [
        { key: "notices", label: "Notices", icon: Bell, onClick: () => {} },
        { key: "requests", label: "Requests", icon: UserPlus, onClick: () => {} },
      ]
    : [];

  const ownerItems: MenuItem[] = isCreator
    ? [
        { key: "edit", label: "Edit community", icon: Pencil, onClick: () => {} },
        {
          key: "delete",
          label: "Delete community",
          icon: Trash2,
          onClick: () => {},
          danger: true,
        },
      ]
    : [];

  const menuGroups = [memberItems, adminItems, ownerItems].filter(
    (group) => group.length > 0,
  );

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-68 w-full overflow-hidden">
        <img
          src={community.imageUrl}
          alt={community.name}
          className="h-full w-full object-cover object-center"
        />

        {/* Category */}
        <div className="absolute left-5 top-5 bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 backdrop-blur-sm rounded-sm border border-teal-200 flex items-center gap-1">
          <Tag size={15} />
          <p className="">{community.category}</p>
        </div>

        {/* Actions dropdown */}
        {menuGroups.length > 0 && (
          <div className="absolute right-5 top-5" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              className="flex items-center justify-center bg-white/90 p-2 text-gray-800 backdrop-blur-sm rounded-sm border border-teal-200 transition hover:bg-white"
            >
              <MoreVertical size={18} />
            </button>

            {isMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg overflow-hidden"
              >
                {menuGroups.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className={
                      groupIndex > 0 ? "border-t border-gray-100 py-1" : "py-1"
                    }
                  >
                    {group.map(({ key, label, icon: Icon, onClick, danger }) => (
                      <button
                        key={key}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onClick();
                          setIsMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition ${
                          danger
                            ? "text-red-600 hover:bg-red-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon size={16} />
                        {label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityTopbar;
