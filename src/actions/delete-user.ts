"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const handleDeleteUser = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      return null;
    }
    await db.user.delete({
      where: {
        id: userId,
      },
    });

    return userId;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
