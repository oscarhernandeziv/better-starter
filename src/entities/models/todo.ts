import { z } from "zod";

/**
 * Todo Schema - defines the core Todo entity with all properties
 * Matches the database schema structure
 */
export const todoSchema = z.object({
	id: z.number(),
	content: z.string().min(1, "Content is required"),
	completed: z.boolean().default(false),
	createdAt: z.string(),
	userId: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

/**
 * Create Todo Schema - for creating a new todo
 * Omits id and createdAt which are generated by the database
 */
export const createTodoSchema = todoSchema
	.omit({ id: true, createdAt: true })
	.extend({
		content: z
			.string()
			.min(1, "Content is required")
			.max(255, "Content is too long"),
	});

export type CreateTodo = z.infer<typeof createTodoSchema>;

/**
 * Update Todo Schema - for updating an existing todo
 * All fields are optional except id
 */
export const updateTodoSchema = todoSchema
	.omit({ id: true, createdAt: true, userId: true })
	.partial();

export type UpdateTodo = z.infer<typeof updateTodoSchema>;

/**
 * Toggle Todo Schema - specifically for toggling the completed status
 */
export const toggleTodoSchema = z.object({
	completed: z.boolean(),
});

export type ToggleTodo = z.infer<typeof toggleTodoSchema>;

/**
 * Filter Todo Schema - for filtering todos in queries
 */
export const filterTodoSchema = z.object({
	completed: z.boolean().optional(),
	search: z.string().optional(),
});

export type FilterTodo = z.infer<typeof filterTodoSchema>;
