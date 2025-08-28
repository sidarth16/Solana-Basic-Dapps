import "./globals.css";
import { WalletConnectionProvider } from "@/components/WalletConnectionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletConnectionProvider>{children}</WalletConnectionProvider>
      </body>
    </html>
  );
}
