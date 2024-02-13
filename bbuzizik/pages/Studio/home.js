import React, { useEffect, useState } from "react";
import styles from "../../css/studio_home.module.css";
import { useRecoilState } from "recoil";
import { countState, useSSR } from "../states/atom";

function Counter() {
  const [count, setCount] = useSSR();

  return (
    <div>
      <h1>Counter</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {count}
    </div>
  );
}

function DisplayCounter() {
  const [count] = useRecoilState(countState);
  return <div>{count}</div>;
}

export default function Home() {
  return (
    <>
      <div className={styles.studio_header}>
        <p className={`logo_font ${styles.studio_header_maintitle}`}>
          BBUZIZIK
        </p>
        <p className={`logo_font ${styles.studio_header_subtitle}`}>STUDIO</p>
      </div>

      <div>
        <Counter />
        <DisplayCounter />
      </div>
    </>
  );
}
//치지직 참고해서 변경 예정
