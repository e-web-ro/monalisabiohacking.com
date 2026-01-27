import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <Link href="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Înapoi la Blog
                        </Link>

                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
                            {post.category}
                        </span>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-zinc-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative border border-zinc-700">
                                    <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{post.author}</p>
                                    <p className="text-xs text-zinc-500">Autor</p>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="container mx-auto px-4 py-16 max-w-3xl">
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share / Tags Placeholder */}
                <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                    <p className="text-zinc-500 italic">Ți-a plăcut articolul?</p>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" /> Distribuie
                    </button>
                </div>
            </article>

            <Footer />
        </main>
    );
}
