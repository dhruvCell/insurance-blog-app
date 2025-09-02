import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  headline: string;
  image: string;
  createdAt: string;
}

export default function BlogCard({ id, title, headline, image, createdAt }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{headline}</p>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <Link
          href={`/blogs/${id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
