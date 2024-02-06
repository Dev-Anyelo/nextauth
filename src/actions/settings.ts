"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existigUser = await getUserByEmail(values.email);

    if (existigUser && existigUser.id !== user.id) return { error: "Email already in use" };

    const verificatrionToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificatrionToken.email,
      verificatrionToken.token
    );

    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: { ...values },
  });

  return { success: "Settings updated" };
};
