"use client";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const ThumbsUpComponent = ({
  eventId,
  haveLiked,
  isLoggedIn,
}: {
  eventId: number;
  haveLiked: boolean;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();

  const likeEvent = api.event.likeEvent.useMutation({
    onSuccess: async () => {
      router.refresh();
    },
  });

  const handleThumbsUp = async () => likeEvent.mutateAsync({ eventId });

  if (haveLiked) {
    return (
      <ThumbsUp
        onClick={isLoggedIn ? handleThumbsUp : undefined}
        size="32"
        fill="bg-primary"
        className={isLoggedIn ? "cursor-pointer" : undefined}
      />
    );
  }

  return (
    <ThumbsUp
      onClick={isLoggedIn ? handleThumbsUp : undefined}
      size="32"
      className={isLoggedIn ? "cursor-pointer" : undefined}
    />
  );
};

export default ThumbsUpComponent;
