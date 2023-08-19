import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const getSingleProduct = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(getSingleProduct);
  } catch (error) {
    console.log("[PRODUCT API GET ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Image Url is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Product price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("category ID is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("size ID is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }
    const userId = await db.user.findUnique({
      where: { email: session?.user.email! },
    });

    if (!userId?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("productId is required", { status: 400 });
    }

    const productByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId.id,
      },
    });

    if (!productByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        isArchived,
        isFeatured,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[UPDATE API ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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
    if (!params.productId) {
      return new NextResponse("product ID is required", { status: 400 });
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

    const deletedProduct = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log("[PRODUCT API DELETE ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
