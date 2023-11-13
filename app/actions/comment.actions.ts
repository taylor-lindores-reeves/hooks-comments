"use server";

import db from "@hooks-comments/lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { options } from "@hooks-comments/lib/auth";
import { getServerSession } from "next-auth";
import z from "zod";
import { zfd } from "zod-form-data";
import { checkPrismaError } from "@hooks-comments/lib/prisma-error";

const addCommentSchema = zfd.formData({
	comment: zfd.text(
		z
			.string()
			.min(10, { message: "Comment must be at least 10 characters long" })
	)
});

export const addCommentAction = async (
	currentState: any,
	formData: FormData
) => {
	try {
		const data = await addCommentSchema.parse(formData);

		const session = await getServerSession(options);
		const email = session?.user?.email;

		if (!email) return { message: "You must be logged in to comment." };

		const comment: Prisma.CommentCreateInput = {
			content: data.comment,
			score: 0,
			user: { connect: { email } }
		};

		await db.comment.create({ data: comment });

		revalidatePath("/");

		return { message: "Comment added successfully." };
	} catch (e: unknown) {
		if (e instanceof z.ZodError) {
			return { message: "Validation error occurred." };
		}

		checkPrismaError(e as Error);

		return { message: "Error adding comment." };
	}
};

const editCommentSchema = zfd.formData({
	content: zfd.text(
		z
			.string()
			.min(10, { message: "Comment must be at least 10 characters long" })
	)
});

export const editCommentAction = async (
	currentState: any,
	formData: FormData
) => {
	try {
		const data = await editCommentSchema.parse(formData);
		const id = currentState.id;
		const comment = await db.comment.update({
			where: { id: id },
			data: { content: data.content?.toString() }
		});

		revalidatePath("/");

		return {
			message: `Successfully updated comment.`,
			success: true,
			id: comment.id
		};
	} catch (e) {
		if (e instanceof z.ZodError) {
			return {
				message: "Validation error occurred.",
				success: false,
				id: currentState.id
			};
		}

		checkPrismaError(e as Error);

		return {
			message: "Failed to update comment.",
			success: false,
			id: currentState.id
		};
	}
};

const deleteCommentSchema = zfd.formData({
	id: zfd.numeric(z.number().min(0))
});

export const deleteCommentAction = async (
	currentState: any,
	formData: FormData
) => {
	try {
		const data = await deleteCommentSchema.parse(formData);
		const id = data.id;

		const comment = await db.comment.delete({
			where: { id }
		});

		revalidatePath("/");
		return { message: "Comment deleted successfully." };
	} catch (e) {
		return { message: "Error deleting comment." };
	}
};

export const voteAction = async (currentState: any, formData: FormData) => {
	try {
		const action = formData.get("action");
		if (!action) return { message: "No action provided." };

		if (currentState.votes <= 0 && action.toString() === "decrement") {
			await db.comment.update({
				where: { id: currentState.id },
				data: { score: 0 }
			});

			return {
				message: "Cannot decrement score below 0.",
				votes: 0,
				id: currentState.id
			};
		}

		const comment = await db.comment.update({
			where: { id: currentState.id },
			data: { score: { [action.toString()]: 1 } }
		});

		revalidatePath("/");
		return {
			message: "Voted successfully.",
			votes: comment.score,
			id: comment.id
		};
	} catch (e) {
		return { message: "Error voting." };
	}
};
