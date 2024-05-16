import {useState} from 'react'
import { z } from 'zod';

type Sponsor  = {
    userId?: string,
    organizationId?: number,
    name: string,
};

const eventSchema = z.object({
  eventId: z.number().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  eventType: z.enum(["FUN_EVENT", "IDEA", "FIX_EVENT"]),
});

export type EventType = z.infer<typeof eventSchema>;
export default eventSchema;