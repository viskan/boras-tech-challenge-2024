import { z } from "zod";


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
    getEvents: publicProcedure
    .query(({ ctx, input }) => {
      return ctx.db.event.findMany({
        orderBy: { id: "desc" },
      });;
    }),

    getEvent: publicProcedure
    .input(z.object({ id:z.number() }))
    .query(({ input }) => {
      return tempData.find(event => event.eventId === input.id);
    }),

    

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
