import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET_KEY!
    );
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.country,
    address?.postal_code,
  ];

  const addressString = addressComponents
    .filter((item) => item !== null)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    await db.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }
  return new NextResponse(null, { status: 200 });
}
