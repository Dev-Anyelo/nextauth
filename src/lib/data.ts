import { db } from "@/lib/db";
import { USERS_PER_PAGE } from "@/constants";
import { unstable_noStore as noStore } from "next/cache";

export const fetchFilteredUsers = async (
  query: string,
  currentPage: number
) => {
  noStore();
  try {
    const users = await fetch(`/api/users?query=${query}&page=${currentPage}`);

    if (!users.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await users.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUsersPages = async (query: string) => {
  noStore();
  try {
    const count = await db.user.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return Math.ceil(count / USERS_PER_PAGE);
  } catch (error) {
    throw new Error("Failed to fetch total number of users");
  }
};

export const fetchTotalUsers = async () => {
  noStore();
  try {
    const count = await db.user.count();
    return count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of users");
  }
};
