/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Stripe from "stripe";
import { api } from "~/src/trpc/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_ID!
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        const { amount_received, metadata, receipt_email } = event.data.object;

        await api.donations.create.query({
          projectId: Number(metadata.projectId!) || 1,
          amount: amount_received / 100,
          email: receipt_email ?? "error@error.com",
        });

        console.log(`PaymentIntent for ${event.type} was successful!`);

        break;
      default:
        return new Response(event.type, {
          status: 400,
        });
    }

    return new Response("ok", {
      status: 200,
    });
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed.`, error);

    return new Response("err", {
      status: 400,
    });
  }
}
