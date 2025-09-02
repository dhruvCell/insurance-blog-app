import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Blog Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, responsive blog application built with Next.js, TypeScript, and MongoDB. Perfect for creating content-rich websites.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            href="/blogs"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Blogs
          </Link>
          <Link
            href="/create-blog"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Create New Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Modern Tech Stack</h3>
            <p className="text-gray-600">
              Built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB for optimal performance and developer experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
            <p className="text-gray-600">
              Fully responsive design that works perfectly on desktop, tablet, and mobile devices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Easy Customization</h3>
            <p className="text-gray-600">
              Clean, modular code structure makes it easy to customize and extend for your specific needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
