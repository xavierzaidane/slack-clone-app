import { HashIcon, Trash2 } from "lucide-react"; // Trash2 for delete icon

const CustomChannelPreview = ({ channel, setActiveChannel, activeChannel }) => {
  const isActive = activeChannel && activeChannel.id === channel.id;
  const isDM = channel.data.member_count === 2 && channel.data.id.includes("user_");

  if (isDM) return null;

  const unreadCount = channel.countUnread();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent opening the channel when clicking delete
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the channel "${channel.data.id}"?`
    );
    if (!confirmDelete) return;

    try {
      await channel.delete();
      alert("Channel deleted successfully!");
      // Optional: reset active channel if it was deleted
      if (isActive) setActiveChannel(null);
    } catch (err) {
      console.error("Failed to delete channel:", err);
      alert("Error deleting channel");
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setActiveChannel(channel)}
        className={`str-chat__channel-preview-messenger transition-colors flex items-center w-full text-left px-4 py-2 rounded-lg mb-1 font-medium hover:bg-blue-50/80 min-h-9 ${
          isActive
            ? "!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg text-blue-900"
            : ""
        }`}
      >
        <HashIcon className="w-4 h-4 text-[#9b9b9b] mr-2" />
        <span className="str-chat__channel-preview-messenger-name flex-1">
          {channel.data.id}
        </span>

        {unreadCount > 0 && (
          <span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:text-red-500"
      >
        <Trash2 className="w-4 h-4 text-[#979292]" />
      </button>
    </div>
  );
};

export default CustomChannelPreview;
