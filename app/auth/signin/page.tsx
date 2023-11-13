import SignIn from "@hooks-comments/components/signin";
import { options } from "@hooks-comments/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
	const session = await getServerSession(options);
	if (session) redirect("/");
	return <SignIn />;
}
