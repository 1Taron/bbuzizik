import React from 'react';
import Link from 'next/link';

export default function sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link href="/category1">
              <div>카테고리 1</div>
            </Link>
          </li>
          <li>
            <Link href="/category2">
              <div>카테고리 2</div>
            </Link>
          </li>
          <li>
            <Link href="/category3">
              <div>카테고리 3</div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};