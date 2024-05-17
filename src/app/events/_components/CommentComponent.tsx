"use client";

import { inferRouterOutputs } from "@trpc/server";
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
  session: NonNullable<Awaited<ReturnType<typeof getServerAuthSession>>>;
}

function CommentComponent({event, session}: CommentComponentProps) {
  const [comment, setComment] = useState({comment: ""});
  const router = useRouter();
  const addComment = api.event.addComment.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });

  if (!event) return null;

  const handleSubmit = async () => {
    if (!comment.comment) return;
    await addComment.mutateAsync({eventId: event.id, comment: comment.comment});
    setComment({comment: ""});
  };
  

const leftAttachment = (
  <Avatar className="mr-2">
    <AvatarFallback>{session.user.name}</AvatarFallback>
    {session.user.image && (
      <AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
    )}
  </Avatar>
);
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center">
        <div className="bg-red flex-grow">
          <Input
            object={comment}
            placeholder="Add a comment..."
            setObject={setComment}
            fieldKey="comment"
            title=""
            leftAttachment={leftAttachment}
          />
        </div>
        <Button onClick={handleSubmit}>Add comment</Button>
      </div>
      <div className="flex flex-col">
        {event.comments.map((comment) => (
          <div key={comment.id} className="flex items-center bg-muted m-2 p-2 rounded-3xl">
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
              <div>{comment.user.name}</div>
              <div>{comment.comment}</div>
            </div>
            <div>{comment.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentComponent;