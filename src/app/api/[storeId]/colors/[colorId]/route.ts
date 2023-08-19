import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const color = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[Color API GET ERROR]", error);
    return new NextResponse("[Color API Error]", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Params Id is required", { status: 400 });
    }
    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const colorByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    if (!colorByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updateColor = await db.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: { name, value },
    });

    return NextResponse.json(updateColor);
  } catch (error) {
    console.log("[Size UPDATE API ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
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

    const deleteColor = await db.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(deleteColor);
  } catch (error) {
    console.log("[Color API DELETE ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
