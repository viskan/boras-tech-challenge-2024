import "~/styles/globals.css";

import { Montserrat } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import MenuBar from "~/components/ui/menu-bar";
import Header from "./_components/header";

export const metadata = {
  title: "LevelUp Borås",
  description: "Var med och skapa framtidens Borås!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className} no-scrollbar`}>
      <body className="bg-secondary no-scrollbar">
        <Header />
        <div className="mt-16">
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 transform">
            <MenuBar />
          </div>
          <div className="h-28"/>
        </div>
      </body>
    </html>
  );
}
