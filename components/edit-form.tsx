"use client";

import React, { use, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { Comment } from "@prisma/client";
import { editCommentAction } from "@hooks-comments/app/actions/comment.actions";
import { Button } from "./ui/button";

type EditFormProps = {
	toggleEditForm: () => void;
	comment?: Comment;
};

const UpdateButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			className="mt-4 bg-gray-800 text-white rounded-lg w-28 h-12 row-start-2 justify-self-end disabled:bg-gray-400 disabled:cursor-not-allowed"
			type="submit"
			disabled={pending}
			aria-disabled={pending}
		>
			Update
		</Button>
	);
};

const EditForm = ({ toggleEditForm, comment }: EditFormProps) => {
	const initialState = {
		success: false,
		id: comment?.id,
		message: ""
	};
	const [state, formAction] = useFormState(editCommentAction, initialState);

	useEffect(() => {
		if (state.success) toggleEditForm();
	}, [state]);

	return (
		<form className="flex flex-col" action={formAction}>
			<textarea
				name="content"
				defaultValue={comment?.content}
				className="border rounded-md p-3"
			/>
			<p aria-live="polite" role="status">
				{state?.message}
			</p>
			<UpdateButton />
		</form>
	);
};

export default EditForm;
