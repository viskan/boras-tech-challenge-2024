import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import MenuBar from "~/components/ui/menu-bar";
import Header from "./_components/header";

export const metadata = {
  title: "LevelUp Borås",
  description: "Var med och skapa framtidens Borås!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} bg-accent`}>
      <body>
        <Header/>
        <div className="mt-20">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 transform">
          <MenuBar />
        </div>
        </div>
      </body>
    </html>
  );
}
