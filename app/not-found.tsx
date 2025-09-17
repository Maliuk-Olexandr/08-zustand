'use client';

import css from './page.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist on NoteHub.',
  alternates: {
    canonical: 'https://notehub.app/not-found',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist on NoteHub.',
    url: 'https://notehub.app/404',
    siteName: 'NoteHub',
  },
}

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
    
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p className={css.description}>
        You will be redirected to the homepage in a few seconds…
      </p>
    </div>
  );
}