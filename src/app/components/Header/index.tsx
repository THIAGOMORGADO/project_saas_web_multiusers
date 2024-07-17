import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";


import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import  { LogOutButton, OpenMenuButton } from "../Button";

export default async function Header() {
  const session = await getServerSession()
  return(
  <header className="bg-gray-800 p-4 flex items-center justify-between">
    <div className="text-white flex items-center text-2xl">
      <OpenMenuButton className="bg-transparent text-white hover:bg-transparent">
        <IoMdMenu className="cursor-pointer w-6 h-6"/>
      </OpenMenuButton>
     
      <h1 className="text-white text-xl md:text-2xl ml-2">Dashboard</h1>
    </div>
   
    <div className="flex items-center gap-10">
      <div className="text-white flex *:items-center gap-2">
        {session && (
          <div className="flex items-center gap-2">
              <button className="bg-transparent">
                <img src={session?.user?.image || ''} alt="User Image" width={32} height={32}  className="rounded-full"/>
              </button>
             
          </div>
        )}

      </div>
      <div className="text-white flex">
        <LogOutButton className="bg-transparent text-white hover:bg-transparent" >
          <IoMdLogOut className="cursor-pointer w-6 h-6"/>
        </LogOutButton>
      </div>
    </div>
  </header>
  )
}