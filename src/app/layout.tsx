import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Threads',
  description: 'A vitrine de e-commerce mais moderna.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> 
        {children}
      </body>
    </html>
  );
}