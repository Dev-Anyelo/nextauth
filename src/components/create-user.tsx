"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { UserRole } from "@prisma/client";
import { CreateUserSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ClipLoader } from "react-spinners";
import { UserRoundPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { create } from "@/actions/create-user";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-errors";
import { FormSuccess } from "@/components/form-success";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateUserForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      password: "",
      role: UserRole.USER,
      isTwoFactorEnabled: false,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
    startTransition(() => {
      create(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-full max-w-[950px] mx-auto mt-20 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100 text-center py-4 text-2xl font-semibold flex justify-center items-center">
        <div className="w-full flex justify-center items-center gap-x-2">
          <UserRoundPlus className="w-6 h-6 inline" />
          Create user
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="******"
                        className="w-full p-2 border rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="isTwoFactorEnabled"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-1">
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription className="text-muted-foreground text-sm">
                        Enable two factor authentication for your account
                      </FormDescription>
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              variant="default"
              disabled={isPending || !form.formState.isDirty}
              className="w-full py-2 select-none"
            >
              {isPending ? (
                <ClipLoader size="22" color="#2563EB" />
              ) : (
                "Create user"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm;
