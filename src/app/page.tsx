"use client"

import { useSession } from 'next-auth/react'
import Header from "./components/Header";
import Redirect from "./components/Redirect";
import Loading from './components/Loading';
import FileInput from "./components/FileInput";

export default function Home(): React.JSX.Element {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <Loading />
      </div>
    );
  }

  // If no session, show redirect component
  if (!session) {
    return <Redirect />;
  }

  // If authenticated, show home page
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header title="Home" />
      <div className='flex flex-col items-center justify-center'>
        <FileInput onFileSelect={(file: File | null) => console.log(file)} />
      </div>
    </div>
  );
}