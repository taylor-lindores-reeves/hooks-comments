import { Skeleton } from "@hooks-comments/components/ui/skeleton";
import { options } from "@hooks-comments/lib/auth";
import clsx from "clsx";
import { getServerSession } from "next-auth";

export function CommentsLoading() {
	const session = getServerSession(options);

	return (
		<>
			<section className={clsx(!session ? "hidden" : "py-4")}>
				<h2 className="text-xl font-semibold">Post Comment</h2>
				<Skeleton className="w-full h-[4.5rem]" />
			</section>
			<div className="bg-white p-4 my-4 rounded-lg shadow-md">
				<h2 className="font-semibold text-xl">Comments</h2>
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="flex w-full gap-4 mb-2 px-4 items-center">
						<div className="w-full flex items-center py-3 gap-x-4">
							<Skeleton className="h-16 w-5" />
							<div className="space-y-2 flex flex-col w-full h-full py-3 items-stretch">
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
