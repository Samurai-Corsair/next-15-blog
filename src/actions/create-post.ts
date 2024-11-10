"use server";

import { z } from "zod";
import { auth } from "@/auth";
import {Post, Topic} from "@prisma/client";
import { db } from "../../db";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  prevState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in."],
      },
    };
  }

  const topic = (await db.topic.findFirst({
    where: { slug }
  })) as Topic

  if(!topic) {
    return {
      errors: {
        _form: ['Cannot find a topic']
      }
    }
  }

  let post: Post;
  try {
    post = (await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })) as Post;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
  //todo revalidate topic show page
}
