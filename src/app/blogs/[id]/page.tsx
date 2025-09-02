import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 10; // ISR: revalidate every 10 seconds

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  await dbConnect();
  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return <div className="container mx-auto p-8">Blog not found</div>;
  }

  const blogData = blog as any;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
      <p className="text-gray-600 mb-6">{blogData.headline}</p>
      <img
        src={blogData.image}
        alt={blogData.title}
        className="rounded-lg mb-6 w-full max-w-4xl h-96 object-cover"
      />
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </main>
  );
}
