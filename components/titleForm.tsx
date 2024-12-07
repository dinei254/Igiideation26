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
    .optional(),
  poster: z.string().url({
    message: "The poster must be a valid URL.",
  }),
});

export default function TitleForm() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      video: "",
      supports: [""], // Explicitly define as an empty array of strings
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
        className="space-y-8 w-[35rem] bg-pink-300 px-10 ml-20"
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
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
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

        {/* Submit Button */}
        <Button type="submit" className="mt-4 ml-[25.5rem] mb-5">
          Submit
        </Button>
      </form>
    </Form>
  );
}
