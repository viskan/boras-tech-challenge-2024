"use client";
import { useState } from "react";
import { EventType } from "./Event";

export default function EventForm(eventInput: EventType) {
  const [event, setEvent] = useState(eventInput);
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="mt-0 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Cool Event Editor</span>
      </h1>
      <input
        type="text"
        name="name"
        onChange={handleEventChange}
        placeholder="Name"
        className={
          "w-full max-w-md rounded-md border px-3 py-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      />
    </div>
  );
}
