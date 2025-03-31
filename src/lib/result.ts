import {
	AppError,
	UnauthorizedError,
	ValidationError,
} from "@/src/entities/errors/common";
import { redirect } from "next/navigation";
import { z } from "zod";

export type Result<T, E extends Error = AppError> =
	| { success: true; data: T }
	| { success: false; error: E };

export const ok = <T>(data: T): Result<T, never> => ({
	success: true,
	data,
});

export const err = <E extends Error>(error: E): Result<never, E> => ({
	success: false,
	error,
});

/**
 * Options for handling async operations
 */
export interface AsyncOperationOptions {
	errorContext?: string;
	redirectPath?: string | null;
	shouldRedirectOnUnauthorized?: boolean;
}

/**
 * Unified utility to handle async operations and return a Result
 * Can optionally handle redirection on unauthorized errors
 */
export async function handleAsync<T>(
	operation: () => Promise<T>,
	options: AsyncOperationOptions = {},
): Promise<Result<T, AppError>> {
	const {
		errorContext,
		redirectPath = "/sign-in",
		shouldRedirectOnUnauthorized = false,
	} = options;

	try {
		const data = await operation();
		return ok(data);
	} catch (error) {
		const contextMsg = errorContext ? `${errorContext}: ` : "";
		console.error(`${contextMsg}Error:`, error);

		// Handle redirect for unauthorized errors if requested
		if (
			shouldRedirectOnUnauthorized &&
			error instanceof UnauthorizedError &&
			redirectPath
		) {
			redirect(redirectPath);
		}

		// Handle standard error types
		if (error instanceof AppError) {
			return err(error);
		}

		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return err(new ValidationError(JSON.stringify(error.format())));
		}

		// Handle generic errors
		return err(new AppError(`Unexpected error: ${String(error)}`));
	}
}

/**
 * Convenience wrapper for authenticated operations that need redirection
 */
export function handleAuthenticatedAsync<T>(
	operation: () => Promise<T>,
	redirectPath = "/sign-in",
	errorContext?: string,
): Promise<Result<T, AppError>> {
	return handleAsync(operation, {
		errorContext,
		redirectPath,
		shouldRedirectOnUnauthorized: true,
	});
}

/**
 * Converts a Result to a standard API Response
 */
export function resultToResponse<T>(result: Result<T, AppError>): Response {
	if (result.success) {
		return new Response(JSON.stringify(result.data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	const error = result.error;
	return new Response(
		JSON.stringify({
			error: error.message,
			code: error.code || error.name,
			statusCode: "statusCode" in error ? error.statusCode : 500,
		}),
		{
			status: "statusCode" in error ? error.statusCode : 500,
			headers: { "Content-Type": "application/json" },
		},
	);
}

/**
 * Converts a Result to a format suitable for server actions
 */
export function resultToServerActionResponse<T>(result: Result<T, AppError>): {
	data?: T;
	error?: { message: string; code: string; statusCode: number };
} {
	if (result.success) {
		return { data: result.data };
	}

	const error = result.error;
	return {
		error: {
			message: error.message,
			code: error.code || error.name,
			statusCode: "statusCode" in error ? error.statusCode : 500,
		},
	};
}
