import { z } from "zod";
import eventSchema from "~/app/events/_components/Event";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: {
        id: "desc",
      },
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
      console.log(input)
      return ctx.db.event.create({
        data: {
          name: input.name,
          latitude: input.latitude,
          longitude: input.longitude,
          eventType: input.eventType,
          description: input.description,
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
