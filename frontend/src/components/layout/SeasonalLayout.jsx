import React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "@/index.css"
import DefaultLayout from "./DefaultLayout";
import { SeasonalDecoration, DecorationThemeSwitcher } from "@/components/layout/Decoration/seasonal-decoration"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata = {
//   title: "ProGarage - Dịch Vụ Sửa Chữa Xe Ô Tô",
//   description: "Dịch vụ sửa chữa, bảo dưỡng xe ô tô chuyên nghiệp",
//   generator: "v0.app",
//   icons: {
//     icon: [
//       {
//         url: "/icon-light-32x32.png",
//         media: "(prefers-color-scheme: light)",
//       },
//       {
//         url: "/icon-dark-32x32.png",
//         media: "(prefers-color-scheme: dark)",
//       },
//       {
//         url: "/icon.svg",
//         type: "image/svg+xml",
//       },
//     ],
//     apple: "/apple-icon.png",
//   },
// }

export default function SeasonalLayout({ children }) {
  return (
    <>
      <SeasonalDecoration />
      <DecorationThemeSwitcher />
      <DefaultLayout>
      {children}
      </DefaultLayout>
      {/* <Analytics /> */}
    </>
  );
};
