import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const dbUser = await db.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!dbUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await db.store.create({
      data: {
        name,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("store-post", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
