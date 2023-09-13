import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import Card from '@/components/Card';

async function BlogPost({ params }) {
  console.log(params);
  const post = await loadBlogPost(params.postSlug);
  console.log({ post });

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
