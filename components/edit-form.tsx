"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  video: z.string().url({
    message: "The video must be a valid URL.",
  }),
  supports: z
    .array(
      z.string().url({
        message: "Each support link must be a valid URL.",
      })
    )
    .min(1, { message: "At least one support link is required." }),
  poster: z.string().url({
    message: "The poster must be a valid URL.",
  }),
});

export default function EditForm() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      video: "",
      supports: [""], // Default to one empty support link field
      poster: "",
    },
  });

  // Initialize field array for supports
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "supports", // This matches the `supports` field in the schema
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Handle form submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[23rem] "
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input placeholder="Your title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video Field */}
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Video:</FormLabel>
              <FormControl>
                <Input placeholder="Video link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Poster Field */}
        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Poster:</FormLabel>
              <FormControl>
                <Input placeholder="Poster link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Supports Field Array */}
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`supports.${index}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <FormLabel>Support {index + 1}:</FormLabel>
                <FormControl>
                  <Input placeholder="Support link" {...field} />
                </FormControl>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="button"
          onClick={() => append("")} // Append an empty string for a new input
          className="mt-2"
        >
          Add Support Link
        </Button>
        {/* Submit Button */}
        <Button type="submit" className="mt-4 ml-[18rem] mb-5">
          Create
        </Button>
      </form>
    </Form>
  );
}
