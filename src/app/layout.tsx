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
  title: {
    default: "DataIndex - AI-Powered Enterprise Data Analytics Platform",
    template: "%s | DataIndex"
  },
  description: "Upload CSV, Excel, and JSON files to get AI-powered insights using Groq and Gemini models. Interactive data visualization, chat with your data, and comprehensive analytics with enterprise-grade reliability.",
  keywords: [
    "index",
    "data index", 
    "DataIndex",
    "data indexing",
    "index data",
    "AI data analytics",
    "data visualization", 
    "CSV analysis",
    "Excel insights",
    "Groq AI",
    "Gemini AI",
    "business intelligence",
    "data processing",
    "interactive charts",
    "enterprise analytics",
    "MongoDB caching",
    "rate limiting",
    "fallback systems",
    "monitoring dashboard",
    "feature flags",
    "data management",
    "database indexing",
    "search index",
    "data catalog",
    "metadata index"
  ],
  authors: [{ name: "Yashdeep Singh", url: "https://github.com/yashdeepsingh2006" }],
  creator: "Yashdeep Singh",
  publisher: "DataIndex",
  applicationName: "DataIndex Analytics",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dataindex.vercel.app",
    siteName: "DataIndex",
    title: "DataIndex - AI-Powered Enterprise Data Analytics Platform",
    description: "Upload data files and get AI-powered insights using Groq and Gemini models. Interactive visualization, chat interface, and enterprise reliability features.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataIndex - AI Data Analytics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataIndex - AI-Powered Data Analytics",
    description: "Upload data files and get AI-powered insights with interactive visualization and chat interface.",
    creator: "@harmanyash_",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Technology",
  classification: "Business Intelligence Software",
  other: {
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#ffffff",
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DataIndex" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dataindex.vercel.app" />
        
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
