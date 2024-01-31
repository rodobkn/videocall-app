"use client"

import { Video, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { signOutServerAction } from "@/actions/sign-out";

interface HomeNavbarProps {
  username: string
}

export const HomeNavbar = ({
  username
}: HomeNavbarProps) => {
  const [displaySignOut, setDisplaySignOut] = useState(false);

  const handleSignOut = () => {
    signOutServerAction()
      .then((data) => {
        setDisplaySignOut(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="w-full h-20 px-4 text-white bg-black/90 flex justify-between items-center shadow-xl" >
      <div 
        className="flex items-center space-x-4"
      >
        <PlayCircle className='w-10 h-10' />
        <Video className='w-10 h-10' />
      </div>
      <div className="flex items-center space-x-4" >
        <div className='text-xl capitalize' >{username}</div>
        <div
          className="w-10 h-10 rounded overflow-hidden hover:cursor-pointer"
          onClick={() => setDisplaySignOut((prevState) => !prevState)}
        >
          <img src="/default-blue.png" alt="Avatar Image" />
        </div>
      </div>
      {displaySignOut && (
        <div
          className='bg-white text-black absolute right-3 top-14 p-2 mt-1 rounded hover:bg-gray-100 hover:cursor-pointer'
          onClick={handleSignOut}
        >
          Sign Out
        </div>
      )}
    </div>
  )
}