import React from 'react';
import Header from '../pages/Header';
import Sidebar from '../pages/sidebar';

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <h1>메인 페이지</h1>
        안녕하세요
      </div>
    </>
  );
}
