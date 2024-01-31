"use client"
import { useRouter } from "next/navigation";

interface CardProps {
  roomId: string
  roomName: string
}

export const Card = ({
  roomId,
  roomName,
}: CardProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/room/${roomId}`);
  }

  return (
    <div 
      className="bg-white text-black text-xl p-4 rounded-lg whitespace-nowrap hover:cursor-pointer hover:bg-gray-100"
      onClick={handleOnClick}
    >
      {roomName}
    </div>
  )
}