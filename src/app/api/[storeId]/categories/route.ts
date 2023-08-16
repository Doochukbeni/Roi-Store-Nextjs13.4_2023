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

    const { name, billboardId } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboard Id is required", { status: 400 });
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

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[category-post]", error);
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

    const category = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
