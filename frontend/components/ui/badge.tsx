import { cn } from "@/lib/utils";

export const Badge = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "rounded-full bg-transparent backdrop-blur-lg px-4 py-1",
        className
      )}
    >
      {name}
    </span>
  );
};
