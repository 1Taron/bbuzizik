import React from 'react';
import Sidebar from '../components/sidebar';

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <h1>메인 페이지</h1>
      </div>
    </>
  );
}
