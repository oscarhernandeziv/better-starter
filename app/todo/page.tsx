import { TodoContent } from "@/app/_components/pages/todo/content";
import { TodoInfo } from "@/app/_components/pages/todo/info";
import { Layout } from "@/app/_components/shared/layout";
import { getTodos } from "@/src/actions/todo-actions";

export default async function TodoPage() {
	const { todos } = await getTodos();

	return (
		<Layout defaultSection="04">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<TodoInfo />
				<TodoContent todos={todos} />
			</div>
		</Layout>
	);
}
