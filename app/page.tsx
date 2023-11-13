"use server";

import clsx from "clsx";
import React from "react";
import { getServerSession } from "next-auth";

import CommentForm from "@hooks-comments/components/comment-form";
import CommentCard from "@hooks-comments/components/comment-card";
import { options } from "@hooks-comments/lib/auth";
import db from "@hooks-comments/lib/db";

import { type NextPage } from "next";

const MainPage: NextPage = async () => {
	const comments = await db.comment.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			user: true
		}
	});

	const session = await getServerSession(options);

	const userEmail = session?.user?.email;

	return (
		<>
			<section className={clsx(!session && "hidden")}>
				<CommentForm />
			</section>
			{comments.length ? (
				<section className="bg-white p-4 my-4 rounded-lg shadow-md">
					<h2 className="font-semibold text-xl">Comments</h2>
					{comments.map((comment, index) => (
						<article key={index}>
							<CommentCard
								currentUserEmail={userEmail || ""}
								comment={comment}
							/>
						</article>
					))}
				</section>
			) : null}
		</>
	);
};

export default MainPage;
