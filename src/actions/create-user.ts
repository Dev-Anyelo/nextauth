"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { CreateUserSchema } from "@/schemas";

export const create = async (values: z.infer<typeof CreateUserSchema>) => {
  const validateFields = CreateUserSchema.safeParse(values);

  if (!validateFields.success) return { error: "Invalid fields" };

  const { name, email, password, role, isTwoFactorEnabled } =
    validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      isTwoFactorEnabled,
    },
  });

  return { success: "User created successfully" };
};
