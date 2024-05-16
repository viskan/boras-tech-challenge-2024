"use client";

import {type MapPin} from "lucide-react";
import {usePathname} from "next/navigation";

/**
 * Properties for the `MenuItem` component.
 */
type MenuItemProps = {
    /**
     * The path of the view that the item navigates to.
     */
    path: string;

    /**
     * The icon of the item.
     */
    icon: typeof MapPin;

    /**
     * The aria-label of the item.
     */
    ariaLabel: string;
};

/**
 * An item within the menu.
 */
const MenuItem = ({path, icon: Icon, ariaLabel}: MenuItemProps) => {
    const pathname = usePathname();
    const isSelected = path === pathname;
    const color = isSelected ? "text-primary" : "text-white"
    const border = isSelected ? "border" : "";
    const cursor = isSelected ? "cursor-default" : "cursor-pointer";
    return (
        <div className={`p-2 m-3 ${border} border-primary rounded-xl ${cursor}`} aria-label={ariaLabel}>
            <Icon className={color}/>
        </div>
    );
};

export default MenuItem;