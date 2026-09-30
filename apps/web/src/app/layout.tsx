import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JalSuraksha — AI Water Resource Intelligence",
  description: "Predict • Protect • Preserve. National Real-Time Water Resource Management, ML Forecasting & Citizen Decision Support.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💧</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-100 selection:text-navy">
        {children}
      </body>
    </html>
  );
}
