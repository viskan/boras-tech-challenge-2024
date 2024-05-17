import { z } from 'zod';

// type Sponsor  = {
//     userId?: string,
//     organizationId?: number,
//     name: string,
// };
const eventTypeKeys = ["FUN_EVENT", "IDEA", "FIX_EVENT"] as const

const eventSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  eventType: z.enum([...eventTypeKeys]),
  creatorId: z.string()
});

export type Event = z.infer<typeof eventSchema>;
export {eventTypeKeys};
export default eventSchema;