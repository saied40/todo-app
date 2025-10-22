import * as T from "@/components/table";
import todos from "./data";
import TodoItem from "@/components/home/todoItem";

export default function Home() {
  return (
    <>
      <div className="container min-h-screen flex-center">
        <T.Root className="w-4xl mx-auto my-12">
          <T.Header>
            <T.Row isHead>
              <T.Cell className="flex-1/10 text-start">#</T.Cell>
              <T.Cell className="flex-1/10 text-start">Status</T.Cell>
              <T.Cell className="flex-7/10 text-start">Task</T.Cell>
              <T.Cell className="flex-1/10 text-start">Actions</T.Cell>
            </T.Row>
          </T.Header>
          <T.Body>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </T.Body>
        </T.Root>
      </div>
    </>
  );
};
