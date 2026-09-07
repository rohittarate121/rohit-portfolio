import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-signal text-sm mb-2">404 Not Found</p>
        <h1 className="font-display text-3xl font-semibold mb-4">This route doesn&rsquo;t exist.</h1>
        <Link to="/" className="text-signal font-mono text-sm">← Back home</Link>
      </div>
    </div>
  );
}
