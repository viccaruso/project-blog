import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

export const metadata = {
  title: 'Bits & Bytes',
  description: 'A wonderful blog about JavaScript ',
};

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
