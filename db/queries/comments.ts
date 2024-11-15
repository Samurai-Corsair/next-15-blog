import { Comment } from "@prisma/client";
import { db } from "../index";
import { cache } from "react";

export type CommentItem = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache( (postId: string): Promise<CommentItem> => {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});
