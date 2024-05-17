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

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleQueryparams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleFilterSelect = (value: string) => {
    router.replace(pathname + "?" + handleQueryparams("event", value), {
      scroll: false,
    });
  };

  return (
    <Select onValueChange={handleFilterSelect}>
      <SelectTrigger>
        <SelectValue>Filter</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {eventTypeKeys.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
