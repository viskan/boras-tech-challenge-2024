import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOrganisations: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session) {
      return ctx.db.organization.findMany({
        where: {
          users: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }

    return [];
  }),
});
