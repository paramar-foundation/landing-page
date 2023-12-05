import Stripe from "stripe";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getBaseUrl } from "~/src/trpc/shared";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!);

export const paymentRouter = createTRPCRouter({
  createCheckout: publicProcedure
    .input(z.object({ projectId: z.number(), priceId: z.string() }))
    .mutation(async ({ input }) => {
      const checkout = await stripe.checkout.sessions.create({
        currency: "usd",
        mode: "payment",
        invoice_creation: {
          enabled: true,
        },
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: `${getBaseUrl()}/thank-you/${
          input.projectId
        }/{CHECKOUT_SESSION_ID}`,
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
