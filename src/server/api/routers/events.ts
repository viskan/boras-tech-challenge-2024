import { z } from "zod";
import eventSchema from "~/app/events/_components/Event";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { id: "desc" },
    });
  }),

  getEvent: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          name: input.name,
          latitude: 1.0,
          longitude: 2.0,
          eventType: "FUN_EVENT",
          creatorId: ctx.session.user.id,
        },
      });
    }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   return await ctx.db.event.findMany({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
