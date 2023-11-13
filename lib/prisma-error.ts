import { Prisma } from "@prisma/client";

function getPrismaErrorType(e: Error) {
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		return "PrismaClientKnownRequestError";
	} else if (e instanceof Prisma.PrismaClientInitializationError) {
		return "PrismaClientInitializationError";
	} else if (e instanceof Prisma.PrismaClientRustPanicError) {
		return "PrismaClientRustPanicError";
	} else if (e instanceof Prisma.PrismaClientValidationError) {
		return "PrismaClientValidationError";
	} else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
		return "PrismaClientUnknownRequestError";
	}
	return null;
}

export function checkPrismaError(e: Error) {
	const errorType = getPrismaErrorType(e);

	switch (errorType) {
		case "PrismaClientKnownRequestError":
			return `Known request error: ${e.message}`;
		case "PrismaClientInitializationError":
			return `Initialization error: ${e.message}`;
		case "PrismaClientRustPanicError":
			return `Rust panic error: ${e.message}`;
		case "PrismaClientValidationError":
			return `Validation error: ${e.message}`;
		case "PrismaClientUnknownRequestError":
			return `Unknown request error: ${e.message}`;
	}
}
