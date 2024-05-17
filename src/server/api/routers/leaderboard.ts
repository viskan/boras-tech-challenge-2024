import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
    getTopUsers: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany({
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                events: true,
                likes: true
              }
            }
          }
        })

        return users.map(user => ({
          score : user._count.events*3 + user._count.likes*2,
          name: user.name
        })).sort((a, b) => {
          return b.score - a.score
        });

    }),
});