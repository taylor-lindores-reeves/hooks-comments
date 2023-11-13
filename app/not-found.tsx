import React from "react";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="text-center">
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/" className="text-blue-500">
				Return Home
			</Link>
		</div>
	);
};

export default NotFound;
