import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import Card from '@/components/Card';
import { BLOG_TITLE } from '@/constants';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: `${frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  return (
    <article>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <Card className={styles.page}>
        <MDXRemote source={post.content} />
      </Card>
    </article>
  );
}

export default BlogPost;
