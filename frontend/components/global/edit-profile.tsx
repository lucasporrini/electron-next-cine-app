import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProfile } from "../providers/profile-provider";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const EditProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { profile, setProfile } = useProfile();
  const [open, setOpen] = useState(false);

  if (profile === null) {
    redirect("/login");
  }

  const editSchema = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      username: user?.username,
      name: user?.name,
      email: user?.email,
    },
  });

  const handleSubmit = (values: z.infer<typeof editSchema>) => {
    localStorage.setItem("user", JSON.stringify({ ...user, ...values }));
    setUser({ ...user, ...values });
    setProfile({ ...user, ...values });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-2 rounded-full bg-primary">
          Edit profile <PenIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="p-0 m-0"></DialogTitle>

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
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
              <Button type="submit" className="w-full rounded-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
