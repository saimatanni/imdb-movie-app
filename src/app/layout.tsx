// app/layout.tsx
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';

export const metadata = {
  title: 'Movie Search App',
  description: 'A movie search app using TMDB API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class">
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
