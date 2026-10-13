import { useEffect, useRef, useState } from "react";

interface InstagramReelProps {
  url: string;
  name: string;
  className?: string;
}

export function InstagramReel({ url, name, className }: InstagramReelProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(700);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        event.origin !== "https://www.instagram.com" ||
        event.source !== frameRef.current?.contentWindow
      ) {
        return;
      }

      // Instagram sends the rendered height as a JSON MEASURE message.
      let message;
      try {
        message =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      const measuredHeight = message?.details?.height;
      if (
        message?.type === "MEASURE" &&
        typeof measuredHeight === "number" &&
        Number.isFinite(measuredHeight) &&
        measuredHeight > 0 &&
        measuredHeight <= 10000
      ) {
        setHeight(Math.ceil(measuredHeight));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={frameRef}
      className={className}
      src={`${url}/embed/`}
      title={`${name} - Instagram reel`}
      height={height}
      scrolling="no"
      allow="encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
