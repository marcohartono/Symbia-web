"use client";

import { useWaitlist } from "@/lib/waitlist-context";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function WaitlistButton({ className, children }: Props) {
  const { open } = useWaitlist();
  return (
    <button onClick={open} className={className}>
      {children ?? "Join the waitlist"}
    </button>
  );
}
