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
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        include: {
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              }
            },
            orderBy: {
              id: "desc",
            }
          },
          likes: {
            where: {
              userId: ctx.session?.user.id ?? "",
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      if (!event) {
        return null;
      }

      console.log(event.comments);

      return {
        id: event.id,
        name: event.name,
        description: event.description,
        eventType: event.eventType,
        latitude: event.latitude,
        longitude: event.longitude,
        creatorId: event.creatorId,
        haveLiked: event.likes.length > 0,
        likesCount: event._count.likes,
        comments: event.comments
      };
    }),

  create: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
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

  addComment: protectedProcedure
    .input(z.object({ eventId: z.number(), comment: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          eventId: input.eventId,
          comment: input.comment,
          userId: ctx.session.user.id,
        },
      });
    }),
  
  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.delete({
        where: {
          id: input.commentId,
          userId: ctx.session.user.id,
        },
      });
    }),

  likeEvent: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const alreadyLiked = await ctx.db.like.findFirst({
        where: {
          eventId: input.eventId,
          userId: ctx.session.user.id,
        },
      });

      if (alreadyLiked) {
        await ctx.db.like.deleteMany({
            where: {
              eventId: input.eventId,
              userId: ctx.session.user.id,
            },
        });

        return;
      }

      return ctx.db.like.create({
        data: {
          eventId: input.eventId,
          userId: ctx.session.user.id,
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
