import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const organizationRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({organizationId: z.number(), currentUser: z.boolean().default(true)})).query(async ({ ctx, input })=> {
    const organization = await ctx.db.organization.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        id: input.organizationId,
        users: input.currentUser ? {
          some: {
            id: ctx.session?.user.id,
          },
        } : undefined,
      },
    });

    return organization;
  }),

  addOrganization: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.organization.create({
        data: {
          name: input.name,
          users: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        }
      });
    }),

  saveOrganization: protectedProcedure
    .input(z.object({ organizationId: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Just verify that the user owns this organization
      await ctx.db.organization.findUniqueOrThrow({
        where: {
          id: input.organizationId,
          users: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      // Update the organization
      await ctx.db.organization.update({
        where: {
          id: input.organizationId,
        },
        data: {
          name: input.name,
        },
      });
    }),

  getMyOrganizations: protectedProcedure
    .query(async ({ ctx }) => {
    return await ctx.db.organization.findMany({
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
 /*create: protectedProcedure
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
    }),*/

  // addUser: protectedProcedure
  //   .input(
  //     z.object({
  //       organizationId: z.number().min(1),
  //       userId: z.number().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return await ctx.db.organization.update({
  //       where: {
  //         id: input.organizationId,
  //       },
  //       data: {
  //         users: {
  //           connect: {
  //             id: input.userId,
  //           },
  //         },
  //       },
  //     });
  //   }),


