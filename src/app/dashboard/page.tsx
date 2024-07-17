import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../components/Header";

export default async function DashBoard() {
  const session = await getServerSession();
  if(!session) {
    return redirect('/')
  }

  const handleTggolemenu = () => {
    console.log('teste')
  }
  
 
  return <div>
    <Header />


  <div className="flex">
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col hidden sm:flex md:flex lg:flex">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Profile</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Settings</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-700">Logout</a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
  </div>;
}