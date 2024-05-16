import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
    getTopUsers: publicProcedure.query(async ({ ctx }) => {
        // const users = await ctx.db.user.findMany({orderBy: {events: "desc"}})

        return ctx.db.user.findMany({orderBy: {id: "desc"}})
    }),
});