import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { ambassadorRouter } from "./routers/ambassador";
import { donationRouter } from "./routers/donation";
import { mailingRouter } from "./routers/mailing";
import { paymentRouter } from "./routers/payments";
import { projectRouter } from "./routers/projects";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  ambassador: ambassadorRouter,
  donations: donationRouter,
  mailing: mailingRouter,
  payments: paymentRouter,
  projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
