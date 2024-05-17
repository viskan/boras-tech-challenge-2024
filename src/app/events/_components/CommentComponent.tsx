"use client";

import { useState } from "react";
import Input from "~/app/_components/Input";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { api } from "~/trpc/react";

function CommentComponent() {
  const [comment, setComment] = useState({comment: ""});
  const addComment = api.event.addComment.useMutation();
  

const leftAttachment = (
  <Avatar>
    <AvatarFallback className="bg-accent">V O</AvatarFallback>
  </Avatar>
);
  return (
    <div className="flex w-full">
      
      <div className="flex-grow bg-red">
        <Input
          object={comment}
          placeholder="Add a comment..."
          setObject={setComment}
          fieldKey="comment"
          title=""
          leftAttachment={leftAttachment}
        />
      </div>
    </div>
  );
}

export default CommentComponent;