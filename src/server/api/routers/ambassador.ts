import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  createOrUpdate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        picture: z.string(),
        linkedin: z.string(),
        instagram: z.string(),
        x: z.string(),
        roleEN: z.string(),
        quoteEN: z.string(),
        roleES: z.string(),
        quoteES: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const ambassador = {
          name: input.name,
          picture: input.picture,
          linkedin: input.linkedin,
          instagram: input.instagram,
          x: input.x,
          role_en: input.roleEN,
          quote_en: input.quoteEN,
          role_es: input.roleES,
          quote_es: input.quoteES,
        };

        await ctx.db.ambassador.upsert({
          where: { id: input.id },
          create: ambassador,
          update: ambassador,
        });

        return true;
      } catch (error) {
        return false;
      }
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.ambassador.delete({
          where: { id: input.id },
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
