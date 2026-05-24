import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";

type EmojiPickerPopupProps = {
  icon: string;
  onSelect: (selectedIcon: string) => void;
};

function EmojiPickerPopup({ icon, onSelect }: EmojiPickerPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-4">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 rounded-lg text-primary">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-black">{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiObject) =>
              onSelect(emojiObject?.imageUrl || "")
            }
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerPopup;
