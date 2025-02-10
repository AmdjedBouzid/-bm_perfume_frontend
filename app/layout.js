import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import ToastProvider from "./_components/ToastProvider";

export const metadata = {
  title: "MB Perfume",
  description: "Generated by create next app",
};

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={cairo.className}>
        <ToastProvider />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
