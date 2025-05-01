import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-lg text-gray-500">Page Not Found</p>
      <Link to="/" className="mt-4 text-primary underline">
        Go Back to Home
      </Link>
    </div>
  );
}
