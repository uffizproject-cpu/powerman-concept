import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PowerMan Uganda — Engineering Operations, Simplified",
  description: "From field jobs to pole inventory — one dashboard that replaces the chaos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0A0F1E" }}>
        {children}
      </body>
    </html>
  );
}