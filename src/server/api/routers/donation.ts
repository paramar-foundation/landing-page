import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const donationRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        checkoutId: z.string(),
        projectId: z.number(),
        author: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const matchDonations = await ctx.db.donation.findMany({
          where: { checkoutId: input.checkoutId },
        });

        if (matchDonations.length > 0) throw new Error();

        await ctx.db.donation.create({
          data: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            author: input.author,
            amount: input.amount,
            projectId: input.projectId,
            checkoutId: input.checkoutId,
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    }),

  getAll: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx }) => {
      return ctx.db.donation.findMany({
        select: { projectId: true },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.donation.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
