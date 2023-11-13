"use client";

import React from "react";
import { useFormStatus, useFormState } from "react-dom";
import { addCommentAction } from "@hooks-comments/app/actions/comment.actions";
import { Button } from "./ui/button";

function AddButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			className="mt-4 bg-gray-800 text-white rounded-lg w-28 h-12 row-start-2 justify-self-end disabled:bg-gray-400 disabled:cursor-not-allowed"
			type="submit"
			disabled={pending}
			aria-disabled={pending}
		>
			Post Comment
		</Button>
	);
}

const CommentForm = () => {
	const initialState = {
		message: ""
	};

	const [state, formAction] = useFormState(addCommentAction, initialState);

	return (
		<div className="py-4">
			<h2 className="font-semibold text-xl">Add a Comment</h2>
			<form
				className="grid grid-cols-2 gap-3 md:flex md:items-start"
				action={formAction}
			>
				<div className="row-start-1 col-span-2 md:flex-grow">
					<textarea
						aria-label="Add a comment"
						className="w-full p-2 rounded-lg border-gray-300 border"
						placeholder="Type your comment here..."
						name="comment"
						required
					/>
					<p aria-live="polite" role="status">
						{state?.message}
					</p>
				</div>
				<AddButton />
			</form>
		</div>
	);
};

export default CommentForm;
