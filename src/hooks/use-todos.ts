"use client";

import {
	createTodo,
	deleteTodo,
	getAllTodos,
	toggleTodoCompletion,
} from "@/src/actions/todo-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
	const queryClient = useQueryClient();

	const todosQuery = useQuery({
		queryKey: ["todos"],
		queryFn: getAllTodos,
	});

	const createTodoMutation = useMutation({
		mutationFn: (formData: FormData) => createTodo(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const toggleTodoMutation = useMutation({
		mutationFn: (id: number) => toggleTodoCompletion(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: (id: number) => deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	return {
		todos: todosQuery.data || [],
		isLoading: todosQuery.isLoading,
		isError: todosQuery.isError,
		error: todosQuery.error,
		createTodo: createTodoMutation.mutate,
		isCreating: createTodoMutation.isPending,
		toggleTodo: toggleTodoMutation.mutate,
		isToggling: toggleTodoMutation.isPending,
		deleteTodo: deleteTodoMutation.mutate,
		isDeleting: deleteTodoMutation.isPending,
	};
}
