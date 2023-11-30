import Stripe from "stripe";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getBaseUrl } from "~/src/trpc/shared";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const paymentRouter = createTRPCRouter({
  createCheckout: publicProcedure
    .input(z.object({ priceId: z.string() }))
    .mutation(async ({ input }) => {
      const checkout = await stripe.checkout.sessions.create({
        currency: "usd",
        mode: "payment",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url:
          getBaseUrl() +
          "?project=3&checkout_id={CHECKOUT_SESSION_ID}&success=true",
        cancel_url: getBaseUrl() + "/projects",
      });

      return checkout;
    }),
  getCheckoutDetails: publicProcedure
    .input(z.object({ checkoutId: z.string() }))
    .mutation(async ({ input }) => {
      return await stripe.checkout.sessions.retrieve(input.checkoutId);
    }),
});
