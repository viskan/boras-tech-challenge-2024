import { type Event } from "~/app/events/_components/Event";

/**
 * Gets the title of an event type.
 *
 * @param eventType The event type to get title for.
 * @returns Returns the title of the event type.
 */
const getEventTypeTitle = (eventType: Event["eventType"]) => {
    switch (eventType) {
        case "FIX_EVENT": {
            return "Problem";
        }

        case "FUN_EVENT": {
            return "Event";
        }

        case "IDEA": {
            return "Idea";
        }
    }
};

export default getEventTypeTitle;