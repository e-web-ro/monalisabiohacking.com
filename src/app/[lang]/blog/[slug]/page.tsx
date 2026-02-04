import { getDictionary } from "@/i18n/get-dictionary";
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
        lang: string;
    }>;
}

import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug, lang: rawLang } = await params;
    const lang = rawLang as "ro" | "en" | "de";
    const posts = blogPosts[lang] || blogPosts.ro;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Article Not Found",
            description: "The requested article could not be found."
        };
    }

    const ogUrl = new URL(`${siteConfig.url}/${lang}/blog/${post.slug}`);

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date, // Note: This might need formatting if date is strictly string
            authors: [post.author],
            url: ogUrl.toString(),
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
        alternates: {
            canonical: ogUrl.toString(),
        }
    };
}

export async function generateStaticParams() {
    const locales = ["ro", "en", "de"];
    const params: { lang: string; slug: string }[] = [];

    locales.forEach((lang) => {
        const posts = blogPosts[lang] || blogPosts.ro;
        posts.forEach((post) => {
            params.push({ lang, slug: post.slug });
        });
    });

    return params;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug, lang: rawLang } = await params;
    const lang = rawLang as "ro" | "en" | "de";
    const posts = blogPosts[lang] || blogPosts.ro;
    const post = posts.find((p) => p.slug === slug);
    const dict = await getDictionary(lang);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

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
                        <Link href={`/${lang}/blog`} className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> {dict.blog_page.back_to_blog}
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
                                    <p className="text-xs text-zinc-500">{dict.blog_page.author_label}</p>
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
                    <p className="text-zinc-500 italic">{dict.blog_page.liked_article}</p>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" /> {dict.blog_page.share}
                    </button>
                </div>
            </article>

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
