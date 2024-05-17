"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { eventTypeKeys } from "./Event";
import { useCallback } from "react";
import { capitalize } from "~/lib/utils";

const items = ["ALL", ...eventTypeKeys] as const;

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleQueryparams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value === "ALL") {
        params.delete(name);
        return params.toString();
      }

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleFilterSelect = (value: string) => {
    router.replace(pathname + "?" + handleQueryparams("eventType", value), {
      scroll: false,
    });
  };

  return (
    <div className="w-full max-w-3xl flex justify-center align-center">
      <Select onValueChange={handleFilterSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select Event Type" />
        </SelectTrigger>
        <SelectContent>
          {items.map((option) => (
            <SelectItem key={option} value={option}>
              {capitalize(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
