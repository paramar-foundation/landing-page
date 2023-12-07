import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        picture: z.string(),
        quote_en: z.string(),
        quote_es: z.string(),
        role_en: z.string(),
        role_es: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.ambassador.create({
          data: {
            name: input.name,
            picture: input.picture,
            quote_en: input.quote_en,
            quote_es: input.quote_es,
            role_en: input.role_en,
            role_es: input.role_es,
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.ambassador.findMany();
  }),
});
