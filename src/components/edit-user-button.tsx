"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExtendedUser } from "@/next-auth";
import { User, UserRole } from "@prisma/client";
import { ClipLoader } from "react-spinners";
import { update } from "@/actions/edit-user";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

interface EditUserButtonProps {
  username: string;
  userId: string;
  userData: User;
  children: React.ReactNode;
  onUserUpdated: () => void;
}

const EditUserButton = ({
  userId,
  username,
  children,
  userData,
  onUserUpdated,
}: EditUserButtonProps) => {

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: userData.name!,
      email: userData.email!,
      role: userData.role,
      isTwoFactorEnabled: userData.isTwoFactorEnabled,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateUserSchema>) => {
    startTransition(() => {
      const updatedValues = { ...values, id: userId };
      update(updatedValues).then((data) => {
        if (!data) {
          toast.error(data);
          return;
        }
        toast.success("User updated successfully");
        onUserUpdated();
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 text-center">
            Edit profile
          </DialogTitle>
          <DialogDescription className="text-center text-balance flex justify-center items-center gap-x-1">
            User
            <span className="text-blue-700 font-semibold text-sm">
              {username}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 text-gray-600"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="w-full col-span-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter your name"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="w-full col-span-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="user@example.com"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="w-full col-span-4">
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.USER}>USER</SelectItem>
                          <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center  mt-4">
              <div className="space-y-1 col-span-4 flex justify-between items-center">
                <FormField
                  name="isTwoFactorEnabled"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-1">
                        <FormLabel>Two Factor Authentication</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="default"
                disabled={isPending || !form.formState.isDirty}
                className="w-full py-2 select-none"
              >
                {isPending ? (
                  <ClipLoader size="22" color="#2563EB" />
                ) : (
                  "Update user"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserButton;
