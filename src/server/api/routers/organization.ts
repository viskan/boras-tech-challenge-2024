import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const organizationRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(async ({ ctx })=> {
    const test = await ctx.db.organization.findMany();
    return test;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.organization.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object(
        { name: z.string().min(1) },
        z.object({ userId: z.string().min(1) }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.organization.create({
        data: {
            name: input.name
        }
      });
    }),

  addUser: protectedProcedure
    .input(
      z.object({
        organizationId: z.number().min(1),
        userId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.organization.update({
        where: {
          id: input.organizationId,
        },
        data: {
          users: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});


