import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const { name, value } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = await db.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("store Id is required", { status: 401 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[Color- API Post]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("store Id is required", { status: 401 });
    }

    const colors = await db.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[Color_GET Api Error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
