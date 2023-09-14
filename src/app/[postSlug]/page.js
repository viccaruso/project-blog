import React from 'react';

import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';

import BlogHero from '@/components/BlogHero';
import Card from '@/components/Card';
import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);

const CircularColorsDemo = dynamic(() =>
  import('@/components/CircularColorsDemo')
);

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
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </Card>
    </article>
  );
}

export default BlogPost;
