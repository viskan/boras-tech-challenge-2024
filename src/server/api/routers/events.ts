import { z } from "zod";
import eventSchema from "~/app/events/_components/Event";


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const tempData = [
  {
  "eventId":1,
   "name":"Techarena hackaton!",
   "createdBy":1,
   "likes":100,
   "eventType":"EVENT",
   "position": {
    "lat": 57.70887,
    "lng": 11.97456
    },
   "sponsors":[
    {
      "userId": null,
      "organizationId": 1,
      "name": "Högskolan"
    },
    {
      "userId": null,
      "organizationId": 1,
      "name": "NetOnNet"
    }
   ]
  },
  {
    "eventId":2,
    "name":"Grafitti vid butik",
    "createdBy":1,
    "likes":10,
    "type":"PROBLEM",
    "position": {
      "lat": 57.70887,
      "lng": 11.97456
      },
    "sponsors":[
      {
        "userId": 1,
        "organizationId": null,
        "name": "Lokal butik"
      }
    ]
   },
   {
    "eventId":3,
    "name":"Bygg lekplats jämte högskolan!",
    "createdBy":1,
    "likes":0,
    "type":"IDE",
    "position": {
      "lat": 57.70887,
      "lng": 11.97456
      },
    "sponsors":null
   },
];
export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { id: "desc" },
    });
  }),

  getEvent: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return tempData.find((event) => event.eventId === input.id);
    }),

  create: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          name: input.name,
          lat: 1.0,
          long: 2.0,
          eventType: "FUN_EVENT",
          adminUserId: ctx.session.user.id,
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  addUser: protectedProcedure
    .input(z.object({ userId: z.number(), eventId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.update({
        where: { id: input.eventId },
        data: { users: { connect: { id: input.userId } } },
      });
    }),
});
