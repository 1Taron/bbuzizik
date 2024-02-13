import React, { useState } from "react";
import styles from "../../css/studio_home.module.css";
import { useRecoilState } from "recoil";
import { countState } from "../states/atom";

function DisplayCounter() {
  const [count] = useRecoilState(countState);
  return <div>{count}</div>;
}

export default function Test() {
  return (
    <>
      <div className={styles.studio_header}>
        <p className={`logo_font ${styles.studio_header_maintitle}`}>
          BBUZIZIK
        </p>
        <p className={`logo_font ${styles.studio_header_subtitle}`}>STUDIO</p>
      </div>

      <div>
        <DisplayCounter />
      </div>
    </>
  );
}
//치지직 참고해서 변경 예정
