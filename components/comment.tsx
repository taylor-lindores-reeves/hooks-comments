import { Prisma } from "@prisma/client";
import { deleteCommentAction } from "@hooks-comments/app/actions/comment.actions";
import { format } from "date-fns";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Icons } from "./ui/icons";
import clsx from "clsx";

type CommentProps = {
	toggleEditForm: () => void;
	showEditForm: boolean;
	currentUserEmail?: string;
	comment: Prisma.CommentGetPayload<{
		include: {
			user: true;
		};
	}>;
};

const Comment = (props: CommentProps) => {
	const { comment, currentUserEmail, toggleEditForm, showEditForm } = props;

	const initialState = {
		message: "",
		id: comment.id
	};

	const { pending } = useFormStatus();
	const [_, formAction] = useFormState(deleteCommentAction, initialState);

	return (
		<div className="flex flex-col w-full">
			{pending ? (
				<Icons.spinner className="w-5 h-5 animate-spin" />
			) : (
				<div className="flex justify-between">
					<div className="flex items-center gap-4">
						<p>
							@
							{comment.user.email.substring(0, comment.user.email.indexOf("@"))}
						</p>
					</div>
					<div className="flex items-center gap-2 justify-center">
						<span className="text-gray-500 text-xs">
							{format(comment.createdAt, "MMM do yyyy, H:mm")}
						</span>
						{comment.user.email === currentUserEmail ? (
							<>
								<input type="hidden" name="id" value={initialState.id} />
								<button
									type="submit"
									className="flex flex-row items-center gap-x-2"
									formAction={formAction}
								>
									<Icons.delete className="w-3 h-3" />
								</button>
								<button
									type="button"
									className="flex flex-row items-center gap-x-2"
									onClick={toggleEditForm}
								>
									{showEditForm ? (
										<Icons.x className="w-4 h-4" />
									) : (
										<Icons.edit className="w-3 h-3" />
									)}
								</button>
							</>
						) : null}
					</div>
				</div>
			)}
			<p
				className={clsx("text-black mt-4 font-bold", showEditForm && "hidden")}
			>
				{comment.content}
			</p>
		</div>
	);
};
export default Comment;
