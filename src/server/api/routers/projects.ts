import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        is_test: z.boolean(),
        image: z.string(),
        location: z.string(),
        goal: z.number(),
        stripe_price_id_en: z.string(),
        title_en: z.string(),
        details_en: z.string(),
        description_en: z.string().max(1024),
        stripe_price_id_es: z.string(),
        title_es: z.string(),
        details_es: z.string(),
        description_es: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.project.create({
          data: {
            is_test: input.is_test,
            image: input.image,
            location: input.location,
            goal: input.goal,
            stripe_price_id_en: input.stripe_price_id_en,
            title_en: input.title_en,
            details_en: input.details_en,
            description_en: input.description_en,
            stripe_price_id_es: input.stripe_price_id_es,
            title_es: input.title_es,
            details_es: input.details_es,
            description_es: input.description_es,
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      include: {
        donations: true,
        _count: true,
      },
    });
  }),

  findUnique: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
    }),
});
