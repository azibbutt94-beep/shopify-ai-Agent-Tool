import "./globals.css";
import Navbar from "./(website)/component/layout/Navbar/page";
import Footer from "./(website)/component/layout/Footer/page";

export const metadata = {
  title: "Shopify AI Commerce Suite",
  description: "Next.js Multi-Page Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}