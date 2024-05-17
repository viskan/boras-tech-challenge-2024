import { z } from "zod";
import eventSchema from "~/app/events/_components/Event";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOrganisations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.organization.findMany({
      where: {
        users: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
