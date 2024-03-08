import { db } from "@/lib/db";
import { USERS_PER_PAGE } from "@/constants";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const searchTerm = query.get("query");
    const page = Number(query.get("page"));

    const currentPage = page;

    const offset = (currentPage - 1) * USERS_PER_PAGE;

    let users;
    if (searchTerm) {
      users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        skip: offset,
        take: USERS_PER_PAGE,
        orderBy: { name: "asc" },
      });
    } else {
      users = await db.user.findMany({
        skip: offset,
        take: USERS_PER_PAGE,
      });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}
