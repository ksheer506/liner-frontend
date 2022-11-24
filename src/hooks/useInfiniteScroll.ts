import { useCallback, useEffect, useRef, useState } from "react";

interface useInfiniteScrollProps {
  onIntersecting(): void;
  coolTime?: number;
  initiateOnMount?: boolean;
}

/**
 * @param onIntersecting 관찰하는 요소와 겹칠 때 실행할 함수
 * @param coolTime onIntersecting이 실행되는 최소 시간 간격(ms)을 설정
 * @param initiateOnMount 컴포넌트 마운트 후 바로 무한 스크롤을 실행할지 여부 설정
 */
export const useInfiniteScroll = <T extends Element = HTMLDivElement>({
  onIntersecting,
  coolTime = 50,
  initiateOnMount = true,
}: useInfiniteScrollProps) => {
  const [enabled, setEnabled] = useState(initiateOnMount);
  const bottomRef = useRef<T>(null);
  const ioRef = useRef<IntersectionObserver>(null);
  const prevTime = useRef(0);

  const initialize = useCallback(() => {
    if (initiateOnMount) return;

    setEnabled(true);
    onIntersecting();
  }, [initiateOnMount, onIntersecting]);

  const terminate = useCallback(() => {
    if (!ioRef.current) return;

    const io = ioRef.current;
    io.disconnect();
  }, []);

  useEffect(() => {
    if (!bottomRef.current || !enabled) return;
    const options = {
      rootMargin: "150px",
    };
    const io = new IntersectionObserver(([{ isIntersecting, time }]) => {
      // body 하단에서 intersection 이벤트가 무한히 발생하지 않도록
      if (!isIntersecting || time - prevTime.current < coolTime) return;

      onIntersecting();
      prevTime.current = time;
    }, options);

    io.observe(bottomRef.current);

    return () => io.disconnect();
  }, [enabled, coolTime, onIntersecting]);

  return { bottomRef, enabled, initialize, terminate };
};
