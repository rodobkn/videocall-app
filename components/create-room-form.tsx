"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { Room } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const CreateRoomForm = () => {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const createRoom = async () => {
    try {
      setIsLoading(true);
      setError(false);

      if (roomName.length === 0) {
        throw new Error("Room Name needs to have more than 0 characters");
      }

      const response = await axios.post("/api/room", {
        roomName,
      })
      const roomCreated = response.data.room as Room;
      router.push(`/room/${roomCreated.id}`);
    } catch (error) {
      console.log(error);
      setError(true);
    }

    // solo por temas de animación
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="bg-white/60 flex flex-col space-y-10 items-center mt-20 border-y border-y-black/20 py-16 shadow-2xl" >
      <h2 className="text-black font-bold text-3xl md:text-6xl text-center" >
        Create a New Video Meeting
      </h2>
      <div className="flex w-full max-w-sm md:max-w-md items-center space-x-2">
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="My Video Meeting"
        />
        <Button onClick={createRoom}>
          Create Meeting
        </Button>
      </div>
      {isLoading && (
        <Loader2 className="h-9 w-9 animate-spin" />
      )}
      {error && (
        <div className="text-xl text-red-600 font-bold rounded">Something Went Wrong!</div>
      )}
    </div>
  )
}