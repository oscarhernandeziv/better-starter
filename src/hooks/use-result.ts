"use client";

import type { Result } from "@/src/lib/result";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export type ResultHandlerOptions<T, R = T> = {
	onSuccess?: (data: T) => R | null | undefined;
	onError?: (error: Error) => R | null | undefined;
	successMessage?: string;
	errorMessage?: string;
	showErrorToast?: boolean;
	// New options for enhanced toast functionality
	duration?: number;
	closeButton?: boolean;
	// Actions for success and error toasts
	successAction?: {
		label: string;
		onClick: (data?: T) => void;
	};
	errorAction?: {
		label: string;
		onClick: (error?: Error) => void;
	};
};

// Type for our enhanced mutation options with additional result handling
export type ResultMutationOptions<TData, TError, TVariables, TContext> = Omit<
	UseMutationOptions<Result<TData, Error>, TError, TVariables, TContext>,
	"onSuccess"
> & {
	resultOptions?: ResultHandlerOptions<TData, unknown>;
	defaultErrorMessage?: string;
	onSuccess?: (
		data: Result<TData, Error>,
		variables: TVariables,
		context: TContext | undefined,
	) => void;
};

/**
 * Hook for handling Result objects in components
 * Provides a unified method to process results with customizable handling
 */
export function useResult() {
	/**
	 * Process a Result object with configurable handling options
	 * Returns the data if successful, undefined if not
	 */
	const handle = useCallback(
		<T, R = T>(
			result: Result<T, Error>,
			options: ResultHandlerOptions<T, R> = {},
		): T | R | undefined => {
			const {
				onSuccess,
				onError,
				successMessage,
				errorMessage,
				showErrorToast = true,
				duration,
				closeButton,
				successAction,
				errorAction,
			} = options;

			if (result.success) {
				// Show success message if provided
				if (successMessage) {
					const toastOptions = {
						duration,
						closeButton,
						// Add action button if provided
						...(successAction && {
							action: {
								label: successAction.label,
								onClick: () => successAction.onClick(result.data),
							},
						}),
					};

					toast.success(successMessage, toastOptions);
				}

				// Call success handler if provided
				if (onSuccess) {
					return onSuccess(result.data) as R;
				}

				// Otherwise just return the data
				return result.data;
			}

			// Handle error case
			const error = result.error;

			// Show error toast by default
			if (showErrorToast) {
				const errorToastOptions = {
					duration,
					closeButton,
					// Add action button if provided
					...(errorAction && {
						action: {
							label: errorAction.label,
							onClick: () => errorAction.onClick(error),
						},
					}),
				};

				toast.error(
					errorMessage || error.message || "An unexpected error occurred",
					errorToastOptions,
				);
			}

			// Call error handler if provided
			if (onError) {
				return onError(error) as R;
			}

			// Return undefined for error case
			return undefined;
		},
		[],
	);

	/**
	 * Creates a promise-based toast for async operations
	 * Shows loading, success, and error states automatically
	 */
	const promiseToast = useCallback(
		<T>(
			promise: Promise<Result<T, Error>>,
			{
				loading = "Loading...",
				success = "Operation successful",
				error = "Operation failed",
				...options
			}: {
				loading?: string;
				success?: string | ((data: T) => string);
				error?: string | ((error: Error) => string);
				duration?: number;
				closeButton?: boolean;
			} = {},
		) => {
			return toast.promise(
				promise.then((result) => {
					if (result.success) {
						return result.data;
					}
					throw result.error;
				}),
				{
					loading,
					success: (data) => {
						return typeof success === "function" ? success(data) : success;
					},
					error: (err) => {
						return typeof error === "function" ? error(err) : error;
					},
					...options,
				},
			);
		},
		[],
	);

	/**
	 * Creates a mutation with standardized Result handling
	 * This ensures consistent toast notifications across all mutations
	 */
	const createMutation = useCallback(
		<TData, TError = Error, TVariables = void, TContext = unknown>(
			mutationFn: (variables: TVariables) => Promise<Result<TData, Error>>,
			options: ResultMutationOptions<TData, TError, TVariables, TContext> & {
				loadingMessage?: string;
				getSuccessMessage?: (data: TData) => string;
				getErrorMessage?: (error: Error) => string;
				minimumLoadingTime?: number; // New option for minimum loading toast display time
			} = {},
		) => {
			const {
				loadingMessage = "Processing...",
				getSuccessMessage = () =>
					options.resultOptions?.successMessage || "Success",
				getErrorMessage = (error) =>
					error.message || options.defaultErrorMessage || "Error",
				minimumLoadingTime = 0, // Default to no minimum time
				onSuccess,
				resultOptions,
				...restOptions
			} = options;

			return useMutation({
				mutationFn: (variables: TVariables) => {
					const startTime = Date.now();
					const promise = mutationFn(variables);

					// Wrap the original promise to ensure minimum loading time
					const wrappedPromise = promise.then(async (result) => {
						if (minimumLoadingTime > 0) {
							const elapsed = Date.now() - startTime;
							const remainingTime = minimumLoadingTime - elapsed;

							// If operation was faster than minimum time, wait for the remaining time
							if (remainingTime > 0) {
								await new Promise((resolve) =>
									setTimeout(resolve, remainingTime),
								);
							}
						}
						return result;
					});

					// Show the promise toast
					toast.promise(
						wrappedPromise.then((result) => {
							if (result.success) {
								return result.data;
							}
							throw result.error;
						}),
						{
							loading: loadingMessage,
							success: (data) => getSuccessMessage(data),
							error: (error) => getErrorMessage(error),
							duration: options.resultOptions?.duration,
							closeButton: options.resultOptions?.closeButton,
						},
					);

					return promise; // Return original promise to not delay the actual mutation
				},
				...restOptions,
				onSuccess: (result, variables, context) => {
					// Process the result with the handle function to ensure resultOptions.onSuccess is called
					if (resultOptions) {
						handle(result, resultOptions);
					}

					// Still call onSuccess, but don't show another toast
					onSuccess?.(result, variables, context);
				},
			});
		},
		[handle],
	);

	return { handle, createMutation, promiseToast };
}
