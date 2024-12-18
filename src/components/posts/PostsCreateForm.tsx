"use client";
import { useFormState } from "react-dom";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import FormButton from "@/components/common/FormButton";
import * as actions from "@/actions";

interface PostsCreateFormProps {
  slug: string;
}

export default function PostsCreateForm({ slug }: PostsCreateFormProps) {
  const [formState, action] = useFormState(actions.createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post!</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post:</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors?.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors?.content?.join(", ")}
            />
            {formState.errors._form && (
              <div className="rounded p-2 bg-red-200 border border-red-200">
                {formState.errors._form?.join(", ")}
              </div>
            )}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
