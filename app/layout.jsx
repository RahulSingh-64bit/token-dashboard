// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";  // ← Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Token Management Dashboard",
  description: "Manage tokens, agents, and analytics efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {children}

        {/* ← Add the Toaster here (only once in the entire app) */}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontSize: "14px",
            },
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}