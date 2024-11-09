"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic!</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors?.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors?.description?.join(", ")}
            />
            {formState.errors._form && (
              <div className="rounded p-2 bg-red-200 border border-red-200">
                {formState.errors._form?.join(", ")}
              </div>
            )}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}