import { posts } from '../data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} - Ndewedo Tours Blog`,
    description: post.excerpt,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600">{post.date}</p>
        </div>
        {post.image && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <div className="text-lg">{post.content}</div>
        <div className="mt-8">
          <Link href="/blog" className="text-blue-500 hover:underline">
            &larr; Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
