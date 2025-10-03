import { cn } from "../lib/utils";

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  mobileCols?: 1 | 2;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
}

export const Grid = ({
  children,
  cols = 2,
  mobileCols = 1,
  gap = 4,
  className,
}: GridProps) => {
  const mobileGridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
  };

  const gridCols = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
  };

  const gridGap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div
      className={cn(
        "grid",
        mobileGridCols[mobileCols],
        gridCols[cols],
        gridGap[gap],
        className
      )}
    >
      {children}
    </div>
  );
};
