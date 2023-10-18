//este es el inicio de la documentacion, tiene next server actions, tailwind responsive design, prisma, daisyUI, deployment en vercel
//tambien explica como configurar prettier para formatear el orden de las clases de tailwindcss

//de las extensiones de VScode recomienda prettier, tailwindcss intellisense, prisma(para el highlight, code completion, etc)

//se usa atlas mongoDB a la que accede con prisma

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flowmazon",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
