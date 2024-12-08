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
  name: z.string().min(2, {
    message: "Name must be at least 5 characters.",
  }),
  association: z.string().min(5, {
    message: "insert association",
  }),
  number: z.string().min(10, {
    message: "must be a valid number.",
  }),
  email: z.string().email({
    message: "must be a valid email.",
  }),
  username: z.string().min(3, {
    message: "Please insert ypur username",
  }),
  password: z.string().min(6, {
    message: "Please insert your password",
  }),
});

export default function JudgeForm() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      association:"",
      number: "",
      email: "",
      username: "",
      password: "",
    },
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
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Full Name:</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number Field */}
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Phone Number:</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Association Field */}
        <FormField
          control={form.control}
          name="association"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Association:</FormLabel>
              <FormControl>
                <Input placeholder="Your Association" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          //control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-5">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="mt-4 ml-[18rem] mb-5">
          Create
        </Button>
      </form>
    </Form>
  );
}
