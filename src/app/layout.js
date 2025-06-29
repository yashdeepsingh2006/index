import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { SessionProvider } from "./context/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Index",
  description: "Upload data files and visualize them with AI-powered insights using Google Gemini and interactive charts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <div className="flex flex-row bg-white h-screen">
            {/* Fixed Navigation */}
            <div className="fixed left-0 top-0 h-screen w-1/5 z-10">
              <Nav />
            </div>

            {/* Main Content Area - This will change based on routes */}
            <div className="ml-[20%] w-4/5 h-screen overflow-auto">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
