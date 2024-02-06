import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <span>홈</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <span>소개</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <span>문의</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};