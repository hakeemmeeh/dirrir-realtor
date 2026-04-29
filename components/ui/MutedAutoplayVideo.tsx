"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

type Props = Omit<ComponentPropsWithoutRef<"video">, "children"> & {
  children?: ReactNode;
};

/**
 * Hero / background clips that must stay silent (autoplay policies + no accidental audio).
 */
export function MutedAutoplayVideo({ children, ...videoProps }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const enforceSilent = () => {
      v.muted = true;
      v.volume = 0;
    };

    enforceSilent();
    v.addEventListener("play", enforceSilent);
    v.addEventListener("volumechange", enforceSilent);
    v.addEventListener("loadedmetadata", enforceSilent);

    return () => {
      v.removeEventListener("play", enforceSilent);
      v.removeEventListener("volumechange", enforceSilent);
      v.removeEventListener("loadedmetadata", enforceSilent);
    };
  }, []);

  return (
    <video ref={ref} {...videoProps} muted playsInline>
      {children}
    </video>
  );
}
