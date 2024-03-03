// api/users/route.ts
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const searchTerm = query.get("query");

    let users;
    if (searchTerm) {
      users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      });
    } else {
      users = await db.user.findMany();
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
