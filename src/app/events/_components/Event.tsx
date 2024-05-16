"use client"
import {useState} from 'react'
type Sponsor  = {
    userId?: number,
    organizationId?: number,
    name: string,
  };

type Event = {
    eventId:number,
    name: string,
    createdBy: number,
    likes: number,
    eventType: string,
    sponsors?: Sponsor[]
  };
  
  
  export default function Event(event: Event) {
    const [name, setName] = useState(event?.name);
    const [likes, setLikes] = useState(event?.likes);
    const [createdBy, setCreatedBy] = useState(event?.createdBy);

    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-0">
          <span className="text-[hsl(280,100%,70%)]">Cool Event Editor</span>
        </h1>
        <input 
          type="text" 
          value={name}
          onChange= {(e) => setName(e.target.value)}       
          placeholder="Name"         
          className="border rounded-md px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black readOnly"
          />
        <input 
          type="number" 
          value={likes}
          onChange= {(e) => setLikes(Number(e.target.value))}       
          placeholder="Likes"         
          className="border rounded-md px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black readOnly"
          />
        <input 
          type="number" 
          value={createdBy}
          onChange= {(e) => setCreatedBy(Number(e.target.value))}       
          placeholder="Name"         
          className="border rounded-md px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black readOnly"
          />
      </div>
    );
  }