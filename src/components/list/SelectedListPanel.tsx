import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useListStore } from "@/store/useListStore";
import { formatCompactNumber } from "@/lib/formatters";
import { Avatar } from "@/components/common/Avatar";

interface SelectedListPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelectedListPanel({ isOpen, onClose }: SelectedListPanelProps) {
  const profiles = useListStore((s) => s.profiles);
  const removeProfile = useListStore((s) => s.removeProfile);
  const clearList = useListStore((s) => s.clearList);
  const navigate = useNavigate();

  const handleRemove = useCallback(
    (userId: string, name: string) => {
      removeProfile(userId);
      toast(`${name} removed from list`, { icon: "👋", duration: 2000 });
    },
    [removeProfile]
  );

  const handleClear = useCallback(() => {
    clearList();
    toast("List cleared", { icon: "🗑️", duration: 2000 });
  }, [clearList]);

  const handleNavigate = useCallback(
    (username: string, platform: string) => {
      navigate(`/profile/${username}?platform=${platform}`);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="panel-backdrop"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="list-panel"
            role="dialog"
            aria-label="Selected profiles list"
            aria-modal="true"
          >
            <div className="list-panel-header">
              <div className="list-panel-title">
                <Heart size={20} />
                <h2>My List</h2>
                <span className="list-panel-count">{profiles.length}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="list-panel-close"
                aria-label="Close list panel"
              >
                <X size={20} />
              </button>
            </div>

            {profiles.length === 0 ? (
              <div className="list-panel-empty">
                <Heart size={40} strokeWidth={1} />
                <p>No profiles selected yet.</p>
                <p className="list-panel-empty-hint">
                  Click the heart on any profile to add it here.
                </p>
              </div>
            ) : (
              <>
                <div className="list-panel-items">
                  <AnimatePresence mode="popLayout">
                    {profiles.map((profile) => (
                      <motion.div
                        key={profile.user_id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="list-item"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleNavigate(profile.username, profile.platform)
                          }
                          className="list-item-main"
                          aria-label={`View ${profile.fullname}'s profile`}
                        >
                          <Avatar
                            src={profile.picture}
                            name={profile.fullname || profile.username}
                            platform={profile.platform}
                            size="sm"
                            showBadge={false}
                            className="list-item-avatar"
                          />
                          <div className="list-item-info">
                            <span className="list-item-name">
                              {profile.fullname}
                            </span>
                            <span className="list-item-meta">
                              @{profile.username} ·{" "}
                              {formatCompactNumber(profile.followers)}
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(
                              profile.user_id,
                              profile.fullname || profile.username
                            )
                          }
                          className="list-item-remove"
                          aria-label={`Remove ${profile.fullname} from list`}
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="list-panel-footer">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="list-panel-clear"
                  >
                    <Trash2 size={14} />
                    Clear All
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
