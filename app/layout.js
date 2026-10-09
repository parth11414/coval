
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://coval-xyz.vercel.app"),

  title: "COVAL Solutions — Engineering Intelligence",
  description: "Engineering intelligence for connected teams.",

  openGraph: {
    title: "COVAL Solutions — Engineering Intelligence",
    description: "Engineering intelligence for connected teams.",
    url: "https://coval-xyz.vercel.app/",
    siteName: "COVAL Solutions",
    images: [
      {
        url: "/coval-solutions.jpg",
        width: 1568,
        height: 989,
        alt: "COVAL Solutions logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "COVAL Solutions — Engineering Intelligence",
    description: "Engineering intelligence for connected teams.",
    images: ["/coval-solutions.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
