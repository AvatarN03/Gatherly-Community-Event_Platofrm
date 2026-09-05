import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  MoreVertical,
  Pencil,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { useCommunityContext } from "../../context/communityContext.ts";

type MenuItem = {
  key: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  to?: string;
  danger?: boolean;
  onClick?: () => void;
};

interface CommunityTopbarProps {
  onDelete?: () => void;
}

const CommunityTopbar = ({ onDelete }: CommunityTopbarProps) => {
  const { community, isCreator, isMember } = useCommunityContext();
  const { slug } = useParams<{ slug: string }>();
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
        {
          key: "chat",
          label: "Chat",
          icon: MessageCircle,
          to: `/communities/${slug}/chat`,
        },
        {
          key: "notice",
          label: "Notice",
          icon: Bell,
          to: `/communities/${slug}/notice`,
        },
        {
          key: "members",
          label: "Members",
          icon: Users,
          to: `/communities/${slug}/members`,
        },
      ]
    : [];

  const ownerItems: MenuItem[] = isCreator
    ? [
        {
          key: "edit",
          label: "Edit community",
          icon: Pencil,
          to: `/communities/${slug}/edit`,
        },
        {
          key: "delete",
          label: "Delete community",
          icon: Trash2,
          danger: true,
          onClick: onDelete,
        },
      ]
    : [];

  const menuGroups = [memberItems, ownerItems].filter(
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
                    {group.map(({ key, label, icon: Icon, to, danger, onClick }) => (
                      to ? (
                        <Link
                          key={key}
                          role="menuitem"
                          to={to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            onClick?.();
                          }}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition ${
                            danger
                              ? "text-red-600 hover:bg-red-50"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon size={16} />
                          {label}
                        </Link>
                      ) : (
                        <button
                          key={key}
                          role="menuitem"
                          type="button"
                          onClick={() => {
                            setIsMenuOpen(false);
                            onClick?.();
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
                      )
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
