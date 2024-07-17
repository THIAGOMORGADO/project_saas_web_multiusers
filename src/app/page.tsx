import Image from "next/image";
import SignIn from "./auth/SignIn/page";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="">
    
      <SignIn />
    </main>
  );
}
