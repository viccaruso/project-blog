import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const posts = await getBlogPostList();
  const postsWithId = posts.map((post) => ({
    ...post,
    id: crypto.randomUUID(),
  }));
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {postsWithId.map((post) => (
        <BlogSummaryCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Home;
