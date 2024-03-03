import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const user = await db.user.update({
    where: {
      id: params.id,
    },
    data,
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting the user" },
      { status: 500 }
    );
  }
}
