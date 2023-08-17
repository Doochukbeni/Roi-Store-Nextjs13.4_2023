import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Size API GET ERROR]", error);
    return new NextResponse("[Size API Error]", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    const { name, value } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value  is required", { status: 400 });
    }
    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("value is required", { status: 400 });
    }

    const sizeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    if (!sizeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updateSize = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: { name, value },
    });

    return NextResponse.json(updateSize);
  } catch (error) {
    console.log("[Size UPDATE API ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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
      return new NextResponse("store ID is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const deleteSize = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(deleteSize);
  } catch (error) {
    console.log("[Size API DELETE ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
