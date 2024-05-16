"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { EventType } from "./Event";
import Input from "../../_components/SmartInput"

interface EventFormProps {
  event: EventType,
  setEvent: Dispatch<SetStateAction<EventType>>
}
export default function EventForm({event, setEvent}: EventFormProps) {

  console.log(event);
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="mt-0 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Cool Event Editor</span>
      </h1>
      <Input title="" object={event} setObject={setEvent} fieldKey="name"/>
    </div>
  );
}
