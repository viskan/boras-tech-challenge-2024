"use client";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const ThumbsUpComponent = ({ eventId }: { eventId: number }) => {
  const router = useRouter();

  const mutate = api.event.likeEvent.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleThumbsUp = async () => {
    await mutate.mutateAsync({ eventId });
  };

  return <ThumbsUp onClick={handleThumbsUp} size="32" />;
};

export default ThumbsUpComponent;
