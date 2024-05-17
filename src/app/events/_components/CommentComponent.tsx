"use client";

import { type inferRouterOutputs } from "@trpc/server";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { type AppRouter } from "~/server/api/root";

import { type getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

interface CommentComponentProps {
  event: inferRouterOutputs<AppRouter>["event"]["getEvent"];
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
}

function CommentComponent({event, session}: CommentComponentProps) {
  const [comment, setComment] = useState({comment: "", dummyId: 0});
  const router = useRouter();
  const utils = api.useUtils();

  const addComment = api.event.addComment.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteComment = api.event.deleteComment.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });
  
  if (!event) return null;

  const handleSubmit = async () => {
    if (!comment.comment || !session) return;
    await utils.event.getEvent.cancel();
    event.comments = [{
      id: 999999999,
      comment: comment.comment,
      eventId: event.id,
      user: {id: session.user.id, name: session.user.name, image: session.user.image},
      userId: session.user.id,
    }, ...event.comments]
    setComment(prev => ({...prev, comment: "", dummyId: prev.dummyId + 1}));
    await addComment.mutateAsync({eventId: event.id, comment: comment.comment});
  };

  const handleDelete = async (commentId: number) => {
    await utils.event.getEvent.cancel();
    event.comments = event.comments.filter((c) => c.id !== commentId);
    await deleteComment.mutateAsync({commentId});
  }

  return (
      <div className="flex flex-col">
        {session && (
          <div className="flex w-full items-center my-2">
            <div className="bg-red flex-grow">
              <Input
                key={comment.dummyId}
                object={comment}
                placeholder="Add a comment..."
                setObject={setComment}
                fieldKey="comment"
                title=""
              />
            </div>
            <Button onClick={handleSubmit}>Add comment</Button>
          </div>
        )}
        <div className="flex flex-col">
          {event.comments.length === 0 && <div>No comments</div>}
          {event.comments.map((comment) => (
            <div
              key={comment.id}
              className="m-2 flex items-center rounded-3xl bg-muted p-2"
            >
              <Avatar className="mr-2">
                <AvatarFallback>{comment.user.name}</AvatarFallback>
                {comment.user.image && (
                  <AvatarImage
                    src={comment.user.image}
                    alt={comment.user.name ?? ""}
                  />
                )}
              </Avatar>
              <div className="bg-red flex-grow">
                <div className="font-semibold">{comment.user.name}</div>
                <div>{comment.comment}</div>
              </div>
              <div>
                {session && comment.user.id === session.user.id && (
                  <TrashIcon
                    cursor={"pointer"}
                    onClick={() => handleDelete(comment.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default CommentComponent;