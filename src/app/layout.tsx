import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { SessionProvider } from "./context/SessionProvider";
import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Index",
  description: "Upload data files and visualize them with AI-powered insights using Google Gemini and interactive charts.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-298J1J1YN4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-298J1J1YN4');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <div className="bg-white min-h-screen">
            {/* Navigation Component - handles its own positioning */}
            <Nav />

            {/* Main Content Area */}
            <div className="lg:ml-[20%] lg:w-4/5 w-full min-h-screen pt-16 lg:pt-0">
              <div className="h-full overflow-auto">
                {children}
              </div>
            </div>
          </div>
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
