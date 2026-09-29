import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TransitionProvider } from "@/components/Transition";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: { default: "DCAR — Giải pháp di chuyển cao cấp cho doanh nghiệp", template: "%s | DCAR" },
  description: "Xe limousine cao cấp thiết kế riêng cho doanh nghiệp. Thiết kế và sản xuất tại Việt Nam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={geologica.variable}>
      <body>
        <SmoothScroll />
        <TransitionProvider>
          <Header />
          <div id="main">
            {children}
            <Footer />
          </div>
        </TransitionProvider>
        <Preloader />
      </body>
    </html>
  );
}
