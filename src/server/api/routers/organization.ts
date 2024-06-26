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

  removeUser: protectedProcedure
    .input(z.object({ organizationId: z.number(), userId: z.string() }))
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

      await ctx.db.organization.update({
        data: {
          users: {
            disconnect: {
              id: input.userId,
            },
          },
        },
        where: {
          id: input.organizationId,
        }
      });
    }),

  saveOrganization: protectedProcedure
    .input(z.object({ organizationId: z.number(), name: z.string().min(1)}))
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
