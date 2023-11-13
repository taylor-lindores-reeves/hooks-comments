import React, { PropsWithChildren } from "react";
import { getServerSession } from "next-auth";

import Header from "@hooks-comments/components/header";
import Provider from "@hooks-comments/components/provider";
import { options } from "@hooks-comments/lib/auth";
import "@hooks-comments/app/styles.css";

async function Layout({ children }: PropsWithChildren) {
	const session = await getServerSession(options);

	return (
		<html lang="en">
			<body className="max-w-xl mx-auto">
				<Provider session={session}>
					<Header />
				</Provider>
				<main>{children}</main>
			</body>
		</html>
	);
}

export default Layout;
