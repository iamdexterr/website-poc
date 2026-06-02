import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brandLogoDark.png"
      alt="OneIoT"
      width={883}
      height={264}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
