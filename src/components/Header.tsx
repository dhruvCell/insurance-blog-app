import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Insurance Awareness Blog
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/blogs" className="hover:underline">
            Blogs
          </Link>
          <Link href="/create-blog" className="hover:underline">
            Create Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
