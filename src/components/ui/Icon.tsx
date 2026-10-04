import type { SVGProps } from "react";

const paths = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  map: <path d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2-6-2Zm0 0v14m6-12v14" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export function DiscordMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 5.2A17.6 17.6 0 0 0 15.3 4l-.5 1.1a16.3 16.3 0 0 0-5 0L9.3 4a17.5 17.5 0 0 0-4.4 1.3C2.2 9.4 1.4 13.4 1.8 17.3a17.8 17.8 0 0 0 5.4 2.7l1.2-1.9c-.7-.3-1.3-.6-1.9-1l.5-.4a12.6 12.6 0 0 0 10.8 0l.5.4c-.6.4-1.2.7-1.9 1l1.2 1.9a17.7 17.7 0 0 0 5.4-2.7c.5-4.5-.8-8.5-3.4-12.1ZM8.7 14.9c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Zm6.6 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Z" />
    </svg>
  );
}
