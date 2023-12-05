import { ambassadorRouter } from "~/server/api/routers/ambassador";
import { createTRPCRouter } from "~/server/api/trpc";
import { donationRouter } from "./routers/donation";
import { paymentRouter } from "./routers/payments";
import { projectRouter } from "./routers/projects";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ambassador: ambassadorRouter,
  donations: donationRouter,
  payments: paymentRouter,
  projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
