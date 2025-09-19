import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const avatarChoices = [
  "https://api.dicebear.com/9.2.0/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/9.2.0/bottts/svg?seed=Max",
  "https://api.dicebear.com/9.2.0/fun-emoji/svg?seed=Lucy",
  "https://api.dicebear.com/9.2.0/shapes/svg?seed=Leo",
  "https://api.dicebear.com/9.2.0/rings/svg?seed=Zoe",
  "https://api.dicebear.com/9.2.0/pixel-art/svg?seed=Milo",
  "https://api.dicebear.com/9.2.0/lorelei/svg?seed=Cleo",
  "https://api.dicebear.com/9.2.0/miniavs/svg?seed=Rocky",
  "https://api.dicebear.com/9.2.0/adventurer-neutral/svg?seed=Jasper",
  "https://api.dicebear.com/9.2.0/croodles/svg?seed=Lola",
  "https://api.dicebear.com/9.2.0/micah/svg?seed=Oscar",
  "https://api.dicebear.com/9.2.0/notionists/svg?seed=Ruby",
];

export function AvatarSelectionModal({ onAvatarSelect }) {
  return (
    <DialogContent className="sm:max-w-[480px] bg-white">
      <DialogHeader>
        <DialogTitle>Choose Your Avatar</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4">
        {avatarChoices.map((avatarUrl, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200"
            onClick={() => onAvatarSelect(avatarUrl)}
          >
            <img
              src={avatarUrl}
              alt={`Avatar choice ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
