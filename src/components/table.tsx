import { cn } from "@/lib/utils";

interface TableRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.ReactNode;
  label?: string;
  className?: string;
  tableClassName?: string;
};

interface TableHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.ReactNode;
  className?: string;
  isSticky?: boolean;
};

interface TableBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.ReactNode;
  className?: string;
};

interface TableRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.ReactNode;
  className?: string;
  isHead?: boolean;
  // divide?: boolean;
};

interface TableCellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
  children: React.ReactNode;
  className?: string;
};

function TableRoot({ children, label, className, tableClassName, ...p }: TableRootProps) {
  return (
    <div aria-label="table-container" className={cn("overflow-auto", className)} {...p}>
      <div aria-label="table" role="table" aria-labelledby={label || "table"} className={cn("flex flex-col gap-2 w-full min-w-fit", tableClassName)}>
        {children}
      </div>
    </div>
  );
};

function TableHeader({ children, className, isSticky, ...p }: TableHeaderProps) {
  return <div aria-label="table-header" role="rowgroup" className={cn(isSticky ? "sticky top-0 z-10" : "", className)} {...p}>{children}</div>;
};

function TableBody({ children, className, ...p }: TableBodyProps) {
  return <div aria-label="table-body" role="rowgroup" className={cn("divide-y divide-secondary/50", className)} {...p}>{children}</div>;
};

function TableRow({ children, className, isHead=false, ...p }: TableRowProps) {
  return (
    <div
      aria-label="table-row"
      role="row"
      className={cn(
        "flex items-center justify-between py-2",
        isHead && "flex items-center gap-x-4 bg-primary py-3 px-4 rounded-lg font-semibold",
        // ((divide !== false && isHead) || divide) && "divide-x divide-cyan-200",
        className
      )}
      {...p}
    >
      {children}
    </div>
  );
};

function TableCell({ children, className, ...p }: TableCellProps) {
  return <div aria-label="table-cell" role="cell" className={cn("text-left", className)} {...p}>{children}</div>;
};

export { TableRoot as Root, TableHeader as Header, TableBody as Body, TableRow as Row, TableCell as Cell };
