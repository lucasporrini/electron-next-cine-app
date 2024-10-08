"use client";

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
import users from "@/data/users.json";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  if (user) {
    redirect("/");
  }

  const loginSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(100),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    // check if user exists in local data
    const userByUsername = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (!userByUsername) {
      const userByEmail = users.find(
        (user) =>
          user.email === values.username && user.password === values.password
      );

      if (userByEmail) {
        localStorage.setItem("user", JSON.stringify(userByEmail));
        redirect("/");
      }
    }

    if (userByUsername) {
      localStorage.setItem("user", JSON.stringify(userByUsername));
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
          <Button type="submit" className="w-full rounded-full">
            Submit
          </Button>
        </form>
      </Form>
      <Link href="/register">
        <Button className="w-full mt-2 text-white" variant="link">
          I don&apos;t have an account
        </Button>
      </Link>
    </div>
  );
};

export default LoginForm;
