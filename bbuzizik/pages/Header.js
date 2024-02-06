import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <div>홈</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <div>소개</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <div>문의</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};