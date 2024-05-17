"use client";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

const ThumbsUpComponent = ({
  eventId,
  haveLiked,
  isLoggedIn,
  likesCount,
}: {
  eventId: number;
  haveLiked: boolean;
  isLoggedIn: boolean;
  likesCount: number;
}) => {
  const [optHasLiked, setOptHasLiked] = useState(haveLiked);
  const [optLikesCount, setOptLikesCount] = useState(likesCount);

  const router = useRouter();

  const likeEvent = api.event.likeEvent.useMutation({
    onSuccess: async () => {
      router.refresh();
    },
  });

  const handleThumbsUp = async () => {
    setOptHasLiked(!optHasLiked);
    setOptLikesCount(optLikesCount + (optHasLiked ? -1 : 1));
    await likeEvent.mutateAsync({ eventId });
  };

  let thumbsUp = null;
  if (optHasLiked) {
    thumbsUp = (
      <ThumbsUp
        onClick={isLoggedIn ? handleThumbsUp : undefined}
        size="32"
        fill="bg-primary"
        className={isLoggedIn ? "cursor-pointer" : undefined}
      />
    );
  } else {
    thumbsUp = (
      <ThumbsUp
        onClick={isLoggedIn ? handleThumbsUp : undefined}
        size="32"
        className={isLoggedIn ? "cursor-pointer" : undefined}
      />
    );
  }

  return (
    <div className="mt-10 flex items-center justify-center">
        {thumbsUp}
      <div className="items-center justify-center text-center">
        <p className="mr-2 text-3xl">{optLikesCount}</p>
      </div>
    </div>
  );
};

export default ThumbsUpComponent;
