import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

export async function GET() {
  const posts = await getBlogPostList();
  const feed = new RSS({
    title: "Vic Caruso's Blog",
    description:
      "Personal blog created using Next.js with the guidance of Josh Comeau's course - The Joy of React",
    copyright: 'Vic Caruso 2023',
    language: 'English',
    pubDate: new Date(),
  });
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${process.env.HOST}/${post.slug}`,
      date: post.publishedOn,
    });
  });
  const xml = feed.xml();

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}
