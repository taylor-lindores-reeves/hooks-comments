"use client";

import { Prisma } from "@prisma/client";
import Vote from "./vote";
import EditForm from "./edit-form";
import Comment from "./comment";
import { useState } from "react";

type CommentCardProps = {
	currentUserEmail?: string;
	comment: Prisma.CommentGetPayload<{
		include: {
			user: true;
		};
	}>;
};

const CommentCard = ({ currentUserEmail, comment }: CommentCardProps) => {
	const [showEditForm, setEditForm] = useState<boolean>(false);

	const toggleEditForm = (): void => {
		setEditForm(!showEditForm);
	};

	return (
		<>
			<div className="flex w-full gap-4 mb-2 px-4 items-center">
				<Vote votes={comment.score} id={comment.id} />

				<div className="flex flex-col w-full h-full py-3 items-stretch">
					<form className="flex justify-between items-center gap-4 mb-2 w-full h-full">
						<Comment
							toggleEditForm={toggleEditForm}
							showEditForm={showEditForm}
							comment={comment}
							currentUserEmail={currentUserEmail}
						/>
					</form>
					<div>
						{showEditForm ? (
							<EditForm toggleEditForm={toggleEditForm} comment={comment} />
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default CommentCard;
