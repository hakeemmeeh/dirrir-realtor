"use client";

import { Volume2, VolumeX } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type Props = Omit<ComponentPropsWithoutRef<"video">, "children"> & {
  children?: ReactNode;
  tapForSoundLabel?: string;
  muteLabel?: string;
};

/**
 * Full-bleed hero clip: muted autoplay (policy-safe), then visitor enables audio via button (user gesture).
 */
export function HeroSoundVideo({
  children,
  tapForSoundLabel = "Tap for sound",
  muteLabel = "Mute",
  className,
  ...videoProps
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [audible, setAudible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.volume = audible ? 1 : 0;
    if (audible) {
      void v.play().catch(() => {});
    }
  }, [audible]);

  return (
    <>
      <video ref={ref} {...videoProps} className={className} muted={!audible} playsInline>
        {children}
      </video>
      <button
        type="button"
        onClick={() => setAudible((a) => !a)}
        className="pointer-events-auto absolute bottom-28 right-5 z-[3] inline-flex items-center gap-2 rounded-full border border-white/25 bg-charcoal/55 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:bg-charcoal/75 md:bottom-32 md:right-8"
        aria-label={audible ? muteLabel : tapForSoundLabel}
        aria-pressed={audible}
      >
        {audible ? (
          <>
            <VolumeX className="h-4 w-4 shrink-0" aria-hidden />
            {muteLabel}
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4 shrink-0" aria-hidden />
            {tapForSoundLabel}
          </>
        )}
      </button>
    </>
  );
}
