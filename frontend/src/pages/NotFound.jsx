export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist. It might have been
        removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-6 flex space-x-4">
        <a
          href="/"
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition shadow-md"
        >
          Go Home
        </a>
        <a
          href="/contact"
          className="px-6 py-2 rounded-lg border border-gray-500 hover:bg-gray-800 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
