import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { SessionProvider } from "./context/SessionProvider";
import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dataindex.vercel.app'),
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
    google: "_Po_b4V16HeOD3I1GitERw51eWKHcXEWY1gh0DsoH00",
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
        
        {/* Mobile-optimized resource hints - defer Google Analytics */}
        <link rel="dns-prefetch" href="https://api.groq.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        
        {/* Preload critical resources for mobile */}
        <link rel="preload" href="/og-image.png" as="image" type="image/png" media="(min-width: 768px)" />
        <link rel="preload" href="/favicon-32x32.png" as="image" type="image/png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dataindex.vercel.app" />
        
        {/* Critical CSS Inline - No render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#ffffff;--foreground:#171717;--font-sans:var(--font-geist-sans)}
            @media (prefers-color-scheme:dark){:root{--background:#0a0a0a;--foreground:#ededed}}
            body{background:var(--background);color:var(--foreground);font-family:var(--font-sans),-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:0;min-height:100vh}
            .nav-container{position:fixed;top:0;left:0;right:0;z-index:50;background:white;border-bottom:1px solid #e5e7eb}
            .main-content{padding-top:4rem}
            @media (max-width:1023px){.nav-container{height:4rem}}
            @media (min-width:1024px){.nav-container{position:fixed;width:20%;height:100vh;border-right:1px solid #e5e7eb;border-bottom:none}.main-content{margin-left:20%;width:80%;padding-top:0}}
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}>
        {/* Optimized Google Analytics - Deferred for mobile performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-298J1J1YN4"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-298J1J1YN4', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        
        <SessionProvider>
          <div className="bg-white min-h-screen">
            {/* Navigation Component - mobile optimized with critical CSS */}
            <nav className="nav-container">
              <Nav />
            </nav>

            {/* Main Content Area - mobile optimized */}
            <main className="main-content min-h-screen">
              <div className="h-full overflow-auto">
                {children}
              </div>
            </main>
          </div>
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
