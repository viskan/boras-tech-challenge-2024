import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const organizationRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input })=> {
    const test = await ctx.db.organization.findMany();
    return test;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.organization.findMany();
  }),

  //BELOW THIS DOES NOT WORK
  create: protectedProcedure
    .input(
      z.object(
        { name: z.string().min(1) },
        z.object({ userId: z.string().min(1) }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      //simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      return await ctx.db.organization.create({
        data: {
            name: input.name
        }
      });
    }),
});


