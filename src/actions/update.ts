"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UpdateUserSchema } from "@/schemas";
import { getUserById, getUserByEmail } from "@/data/user";

export const update = async (
  values: z.infer<typeof UpdateUserSchema> & { id: string }
) => {
  try {
    const user = await getUserById(values.id);

    if (!user) {
      return { error: "User not found" };
    }

    const existingUser = await getUserByEmail(values.email!);

    if (existingUser && existingUser.id !== values.id) {
      return { error: "Email already in use" };
    }

    await db.user.update({
      where: { id: values.id },
      data: {
        name: values.name,
        email: values.email,
        role: values.role,
        isTwoFactorEnabled: values.isTwoFactorEnabled,
      },
    });

    return { success: "Settings updated" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
