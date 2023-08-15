import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    const { name } = body;
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const newStore = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
      data: { name },
    });

    return NextResponse.json(newStore);
  } catch (error) {
    console.log("[UPDATE API ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession();

    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const newStore = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    return NextResponse.json(newStore);
  } catch (error) {
    console.log("[API DELETE ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
