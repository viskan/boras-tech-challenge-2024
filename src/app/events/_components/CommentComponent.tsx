"use client";

import { inferRouterOutputs } from "@trpc/server";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { AppRouter } from "~/server/api/root";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

interface CommentComponentProps {
  event: inferRouterOutputs<AppRouter>["event"]["getEvent"];
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
}

function CommentComponent({event, session}: CommentComponentProps) {
  const [comment, setComment] = useState({comment: "", dummyId: 0});
  const router = useRouter();

  const addComment = api.event.addComment.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });

  const deleteComment = api.event.deleteComment.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });
  
  if (!event) return null;

  const handleSubmit = async () => {
    if (!comment.comment) return;
    await addComment.mutateAsync({eventId: event.id, comment: comment.comment});
    setComment(prev => ({...prev, comment: "", dummyId: prev.dummyId + 1}));
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment.mutateAsync({commentId});
  }

  return (
      <div className="flex flex-col">
        {session && (
          <div className="flex w-full items-center my-2">
            <div className="bg-red flex-grow">
              <Input
                object={comment}
                placeholder="Add a comment..."
                setObject={setComment}
                fieldKey="comment"
                title=""
                leftAttachment={(
                  <Avatar className="mr-2">
                    <AvatarFallback>{session.user.name}</AvatarFallback>
                    {session.user.image && (
                      <AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
                    )}
                  </Avatar>
                )}
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