import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import "bootstrap/dist/css/bootstrap.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "SmartNote",
  description: "Make Studying Easier",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className}  antialiased`}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
