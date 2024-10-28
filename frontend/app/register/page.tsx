"use client";

import { useProfile } from "@/components/providers/profile-provider";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const [user, setUser] = useState(null);
  const { setProfile } = useProfile();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  if (user) {
    redirect("/");
  }

  const registerSchema = z
    .object({
      username: z.string().min(2).max(50),
      email: z.string().email(),
      password: z.string().min(8).max(100),
      passwordConfirmation: z.string().min(8).max(100),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
        name: values.username,
      })
    );

    if (user) {
      setProfile(user);
      redirect("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-3/5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full max-w-md space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    className="placeholder:text-white/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="placeholder:text-white/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    className="placeholder:text-white/50"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password confirm"
                    className="placeholder:text-white/50"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-full">
            Submit
          </Button>
        </form>
      </Form>
      <Link href="/">
        <Button className="w-full mt-2 text-white" variant="link">
          Back to home
        </Button>
      </Link>
    </div>
  );
};

export default RegisterForm;
