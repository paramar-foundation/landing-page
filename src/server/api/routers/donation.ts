import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const donationRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ amount: z.number(), projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.donation.create({
          data: {
            amount: 100,
            author: {},
            projectId: input.projectId,
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    }),

  getAll: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
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
