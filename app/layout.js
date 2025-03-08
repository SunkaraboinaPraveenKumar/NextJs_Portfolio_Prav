import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Praveen Portfolio",
  description: "Personalized Portfolio",
  keywords: "portfolio, Praveen, developer, machine learning, web developer, AI, nextjs, react, javascript, python",
  authors: [
    {
      name: "Praveen Kumar",
      url: "https://yourwebsite.com",
    },
  ]
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
