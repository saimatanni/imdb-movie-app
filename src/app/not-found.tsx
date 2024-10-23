// app/not-found.tsx
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
