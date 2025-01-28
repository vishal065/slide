import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string);

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ status: 404 });
  }
  try {
    const priceID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID as string;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceID, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id=${CHECKOUT_SESSION_ID}`, //change this in production
      cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
    });
    if (session)
      return NextResponse.json({ status: 200, session_url: session.url });
    return NextResponse.json({ status: 404 });
  } catch (error) {
    console.error(error);
  }
}
