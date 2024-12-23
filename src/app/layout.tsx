import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.css';
import Footer from './components/layout/Footer';
import Head from 'next/head';
import Header from './components/navigation/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '더줄게',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //헤더 없는 페이지
  const hiddenPaths = ['/login', '/signup'];

  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header hiddenPaths={hiddenPaths} />
        {children}
        <Footer hiddenPaths={hiddenPaths} />
      </body>
    </html>
  );
}
