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

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();

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

    const product = await db.product.create({
      data: {
        name,
        price,
        isArchived,
        isFeatured,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },

        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("product-post", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    // const isArchived = searchParams.get('isArchived');

    if (!params.storeId) {
      return new NextResponse("store Id is required", { status: 401 });
    }

    const product = await db.product.findMany({
      where: {
        storeId: params.storeId,
        colorId,
        categoryId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("product-get", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
