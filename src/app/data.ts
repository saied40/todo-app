import Todo from "@/types/todo";

const todos: Todo[] = [
  {
    id: 1,
    title: "Set up project structure",
    description: "Initialize folders and base files for the Todo List App",
    completed: true,
  },
  {
    id: 2,
    title: "Implement add todo feature",
    description: "Create a form to add new todos and update the state",
    completed: false,
  },
  {
    id: 3,
    title: "Add delete functionality",
    description: "Allow users to remove todos from the list",
    completed: false,
  },
  {
    id: 4,
    title: "Add toggle complete",
    description: "Let users mark todos as completed or incomplete",
    completed: true,
  },
  {
    id: 5,
    title: "Persist data",
    description: "Save todos in localStorage or a database",
    completed: false,
  },
  {
    id: 6,
    title: "Add filter options",
    description: "Filter todos by completed, active, or all",
    completed: false,
  },
];

export default todos;
