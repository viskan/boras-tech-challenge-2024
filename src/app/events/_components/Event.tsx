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
  createdBy: z.number().optional(),
  eventType: z.string().optional(),
});

  
export type EventType = z.infer<typeof eventSchema>;
export default eventSchema;