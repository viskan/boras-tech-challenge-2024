import { eventRouter } from "~/server/api/routers/events";7
import { organizationRouter } from "~/server/api/routers/organization";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { leaderboardRouter } from "./routers/leaderboard";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  organization: organizationRouter,
  leaderboard: leaderboardRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
