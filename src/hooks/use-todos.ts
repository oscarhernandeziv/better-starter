"use client";

import {
	createTodo,
	deleteTodo,
	getAllTodos,
	toggleTodoCompletion,
} from "@/app/actions/todo-actions";
import { useResult } from "@/src/hooks/use-result";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
	const queryClient = useQueryClient();
	const { createMutation } = useResult();

	const todosQuery = useQuery({
		queryKey: ["todos"],
		queryFn: getAllTodos,
	});

	const createTodoMutation = createMutation(
		(formData: FormData) => createTodo(formData),
		{
			loadingMessage: "Creating todo...",
			getSuccessMessage: () => "Todo created successfully",
			getErrorMessage: (error) => error.message || "Failed to create todo",
			minimumLoadingTime: 400,
			resultOptions: {
				onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
			},
			defaultErrorMessage: "Failed to create todo",
		},
	);

	const toggleTodoMutation = createMutation(
		(id: number) => toggleTodoCompletion(id),
		{
			loadingMessage: "Updating todo status...",
			getSuccessMessage: () => "Todo status updated",
			getErrorMessage: (error) => error.message || "Failed to update todo",
			minimumLoadingTime: 350,
			resultOptions: {
				onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
			},
			defaultErrorMessage: "Failed to update todo",
		},
	);

	const deleteTodoMutation = createMutation((id: number) => deleteTodo(id), {
		loadingMessage: "Deleting todo...",
		getSuccessMessage: () => "Todo deleted successfully",
		getErrorMessage: (error) => error.message || "Failed to delete todo",
		minimumLoadingTime: 450,
		resultOptions: {
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
		},
		defaultErrorMessage: "Failed to delete todo",
	});

	return {
		todos: todosQuery.data?.success ? todosQuery.data.data : [],
		isLoading: todosQuery.isLoading,
		isError: todosQuery.isError,
		error: todosQuery.error,
		createTodo: createTodoMutation.mutate,
		isCreating: createTodoMutation.isPending,
		createError:
			createTodoMutation.data?.success === false
				? createTodoMutation.data.error
				: null,
		toggleTodo: toggleTodoMutation.mutate,
		isToggling: toggleTodoMutation.isPending,
		toggleError:
			toggleTodoMutation.data?.success === false
				? toggleTodoMutation.data.error
				: null,
		deleteTodo: deleteTodoMutation.mutate,
		isDeleting: deleteTodoMutation.isPending,
		deleteError:
			deleteTodoMutation.data?.success === false
				? deleteTodoMutation.data.error
				: null,
	};
}
