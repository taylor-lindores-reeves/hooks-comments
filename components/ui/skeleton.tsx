import { cn } from "@hooks-comments/lib/cn";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-gray-100", className)}
			{...props}
		/>
	);
}

export { Skeleton };
