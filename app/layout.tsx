import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "The Master BMX | BMX School Thailand 2026",
  description: "Learn BMX from national team coaches. Programs for kids 4-15 years old. Racing & Freestyle training at skate parks in Bangkok.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="bg-black text-white antialiased">
        <LanguageProvider>
          <Navbar />
          {children}
          <footer className="py-8 px-6 bg-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex justify-center gap-6 mb-4">
                <a href="https://www.instagram.com/rushfestth" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm uppercase tracking-wider">
                  Instagram @rushfestth
                </a>
              </div>
              <p className="text-gray-500 text-sm uppercase tracking-wide">© 2026 The Master BMX.</p>
            </div>
          </footer>
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
