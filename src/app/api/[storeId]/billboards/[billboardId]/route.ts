import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const deletedBillboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.log("[Billboard API GET ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }
    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    const billboardByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    if (!billboardByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedBillboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: { label, imageUrl },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log("[UPDATE API ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const deletedBillboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.log("[Billboard API DELETE ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
