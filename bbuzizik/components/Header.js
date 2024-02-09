import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../css/header.module.css'

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo_bar}>
                <Link className={styles.Link_a} href="/">
                    <img src="/image/Logo11.svg" alt="Logo" />
                </Link>
            </h1>
            <div className={styles.center_bar}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.searchform}>
                        <input className={styles.input} type="text" value={searchTerm} onChange={handleChange} placeholder="스티리머, 게임 영상 검색" />
                        <button className={styles.button} type="submit">
                            <img src="/image/serch_icon.svg" alt="serch_icon"></img>
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.right_bar}>

            </div>
        </header>
    );
};