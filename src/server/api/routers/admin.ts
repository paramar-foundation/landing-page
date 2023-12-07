import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      // simulates loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return input.password === process.env.ADMIN_PASSWORD;
    }),
});
