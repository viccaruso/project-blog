import React from 'react';

import { BLOG_TITLE } from '@/constants';
import Link from 'next/link';

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
      <Link href="/">Or click here to return home.</Link>
    </div>
  );
}

export default NotFound;
