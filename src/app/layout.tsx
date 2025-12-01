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
        
        {/* Favicon automatically handled by app/favicon.ico */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dataindex.vercel.app" />
        
        {/* Critical CSS Inline - No render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box}
            body,html{margin:0;padding:0;height:100%;font-family:-apple-system,BlinkMacSystemFont,sans-serif}
            :root{--background:#ffffff;--foreground:#171717}
            @media (prefers-color-scheme:dark){:root{--background:#0a0a0a;--foreground:#ededed}}
            body{background:var(--background);color:var(--foreground);min-height:100vh}
            .nav-container{position:fixed;top:0;left:0;right:0;z-index:50;background:white;border-bottom:1px solid #e5e7eb;height:4rem}
            .main-content{padding-top:4rem;min-height:100vh}
            @media (min-width:1024px){.nav-container{position:fixed;width:20%;height:100vh;border-right:1px solid #e5e7eb;border-bottom:none}.main-content{margin-left:20%;width:80%;padding-top:0}}
            .flex{display:flex}
            .flex-col{flex-direction:column}
            .items-center{align-items:center}
            .justify-center{justify-content:center}
            .min-h-screen{min-height:100vh}
            .bg-white{background:white}
            .bg-\\[\\#f9f9ec\\]{background:#f9f9ec}
            .text-\\[\\#596229\\]{color:#596229}
            .loading-skeleton{background:#f0f0f0;animation:pulse 1.5s infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
            .w-96{width:24rem}
            .h-32{height:8rem}
            .rounded-lg{border-radius:0.5rem}
            .p-4{padding:1rem}
            .p-6{padding:1.5rem}
            .mb-4{margin-bottom:1rem}
            .mb-6{margin-bottom:1.5rem}
            .mt-4{margin-top:1rem}
            .text-center{text-align:center}
            .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
            .border{border:1px solid}
            .border-\\[\\#cfd592\\]{border-color:#cfd592}
            .bg-\\[\\#96a141\\]{background:#96a141}
            .bg-\\[\\#757f31\\]{background:#757f31}
            .bg-\\[\\#3e4423\\]{background:#3e4423}
            .text-\\[\\#3e4423\\]{color:#3e4423}
            .text-\\[\\#757f31\\]{color:#757f31}
            .rounded-full{border-radius:50%}
            .w-14{width:3.5rem}
            .h-14{height:3.5rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .text-xl{font-size:1.25rem}
            .font-bold{font-weight:700}
            .font-medium{font-weight:500}
            .text-white{color:white}
            .opacity-75{opacity:0.75}
            .cursor-pointer{cursor:pointer}
            .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
            .px-4{padding-left:1rem;padding-right:1rem}
            .rounded{border-radius:0.25rem}
            .hover\\:bg-\\[\\#596229\\]:hover{background:#596229}
            .transition-all{transition:all 0.15s ease}
            .space-x-2>*+*{margin-left:0.5rem}
            .flex-shrink-0{flex-shrink:0}
            button{cursor:pointer;border:none;outline:none;appearance:none}
            button:disabled{opacity:0.6;cursor:not-allowed}
            .space-y-6>*+*{margin-top:1.5rem}
            .space-y-8>*+*{margin-top:2rem}
            .max-w-sm{max-width:24rem}
            .max-w-md{max-width:28rem}
            .max-w-lg{max-width:32rem}
            .w-full{width:100%}
            .bg-gradient-to-br{background:linear-gradient(to bottom right,var(--tw-gradient-stops))}
            .from-\\[\\#f9f9ec\\]{--tw-gradient-from:#f9f9ec;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,rgba(249,249,236,0))}
            .to-\\[\\#eff0d7\\]{--tw-gradient-to:#eff0d7}
            .min-h-\\[calc\\(100vh-80px\\)\\]{min-height:calc(100vh-80px)}
            .leading-relaxed{line-height:1.625}
            .text-sm{font-size:0.875rem}
            .text-xs{font-size:0.75rem}
            .w-4{width:1rem}
            .h-4{height:1rem}
            .w-6{width:1.5rem}
            .h-6{height:1.5rem}
            svg{display:inline-block;vertical-align:middle}
            @media (min-width:640px){.sm\\:max-w-md{max-width:28rem}.sm\\:space-y-8>*+*{margin-top:2rem}.sm\\:p-6{padding:1.5rem}.sm\\:p-8{padding:2rem}.sm\\:w-16{width:4rem}.sm\\:h-16{height:4rem}.sm\\:text-2xl{font-size:1.5rem}.sm\\:text-base{font-size:1rem}.sm\\:py-4{padding-top:1rem;padding-bottom:1rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:w-5{width:1.25rem}.sm\\:h-5{height:1.25rem}.sm\\:space-x-3>*+*{margin-left:0.75rem}.sm\\:mb-6{margin-bottom:1.5rem}.sm\\:mb-8{margin-bottom:2rem}.sm\\:mt-6{margin-top:1.5rem}.sm\\:pt-6{padding-top:1.5rem}.sm\\:text-sm{font-size:0.875rem}}
            @media (min-width:1024px){.lg\\:max-w-lg{max-width:32rem}.lg\\:p-8{padding:2rem}.lg\\:p-10{padding:2.5rem}.lg\\:w-20{width:5rem}.lg\\:h-20{height:5rem}.lg\\:text-3xl{font-size:1.875rem}.lg\\:text-lg{font-size:1.125rem}.lg\\:py-4{padding-top:1rem;padding-bottom:1rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:w-6{width:1.5rem}.lg\\:h-6{height:1.5rem}.lg\\:text-lg{font-size:1.125rem}.lg\\:mt-8{margin-top:2rem}}
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}>
        {/* Analytics moved to bottom - minimal impact on LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-298J1J1YN4"
          strategy="afterInteractive"
          defer
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            setTimeout(() => {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-298J1J1YN4');
            }, 3000);
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
