import { options } from "@hooks-comments/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const VerifyRequest = async () => {
	const session = await getServerSession(options);
	if (session) redirect("/");

	return (
		<div className="py-4 text-center">
			<h2 className="text-xl font-semibold">Check your email</h2>
			<p>A sign in link has been sent to your email address.</p>
		</div>
	);
};

export default VerifyRequest;
