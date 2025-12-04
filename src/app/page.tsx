"use client"

import { useSession } from 'next-auth/react'
import { Suspense, lazy } from 'react'
import Header from "./components/Header";
import Redirect from "./components/Redirect";
import Loading from './components/Loading';
import type { Metadata } from 'next'

// Note: Client components cannot export metadata in Next.js App Router
// Main page metadata is handled in layout

// Lazy load heavy components
const FileInput = lazy(() => import("./components/FileInput"));

export default function Home(): React.JSX.Element {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <div className="loading-skeleton w-96 h-32 rounded-lg"></div>
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
        <Suspense fallback={<div className="loading-skeleton w-96 h-32 rounded-lg"></div>}>
          <FileInput onFileSelect={(file: File | null) => console.log(file)} />
        </Suspense>
      </div>
    </div>
  );
}