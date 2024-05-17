import { type Event } from "~/app/events/_components/Event";
import { MapPin as MapPinIcon } from "lucide-react";

/**
 * Properties for the `MapPin` component.
 */
type MapPinProps = {
    /**
     * Whether or not the pin is clickable. Defaults to `false`.
     */
    isClickable?: boolean;

    /**
     * Additional extra class names.
     */
    className?: string;

    /**
     * The type of the event.
     */
    eventType: Event["eventType"];
}

/**
 * A component for rendering the map pin icon.
 */
const MapPin = ({isClickable, className, eventType}: MapPinProps) => {
    const color = (() => {
        switch (eventType) {
            case "PROBLEM": {
                return "#f07767";
            }

            case "EVENT": {
                return "#74b5f2";
            }

            case "IDEA": {
                return "#8fcc6c";
            }
        }
    })();

    return <MapPinIcon className={className} fill={color} cursor={isClickable ? "pointer" : undefined}/>;
};

export default MapPin;