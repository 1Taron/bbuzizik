import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "count",
  storage: sessionStorage,
});

export const countState = atom({
  key: "count",
  default: 10,
  effects_UNSTABLE: [persistAtom],
});

export function useSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [count, setCount] = useRecoilState(countState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? 10 : count, setCount];
}
