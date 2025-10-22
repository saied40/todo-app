"use client";
import Tooltip from "@/components/tooltip";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Todo from "@/types/todo";
import * as T from "../table";

export default function TodoItem({ todo }: { todo: Todo }) {
  const handleEdit = () => {
    console.log("to handle edit", todo);
  };

  const handleDelete = () => {
    console.log("to handle delete", todo);
  };

  const handleToggle = () => {
    console.log("to handle toggle complete", todo);
  };

  return (
    <T.Row className="py-3 px-4 gap-4">
      <T.Cell className="flex-1/10">{todo.id}</T.Cell>
      <T.Cell className="flex-1/10">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </T.Cell>
      <T.Cell className="flex flex-col gap-2 flex-7/10">
        <h3
          className={
            "text-lg truncate" + (todo.completed ? " line-through" : "")
          }
        >
          {todo.title}
        </h3>
        <p
          className={
            "line-clamp-2 text-sm text-gray-600 dark:text-gray-300" +
            (todo.completed ? " line-through" : "")
          }
        >
          {todo.description}
        </p>
      </T.Cell>
      <T.Cell className="flex-1/10 flex gap-2">
        <Tooltip title="Edit">
          <button className="p-2 rounded-full w-fit" onClick={handleEdit}>
            <CiEdit size={20} />
          </button>
        </Tooltip>
        <Tooltip title="Delete">
          <button className="p-2 rounded-full w-fit" onClick={handleDelete}>
            <MdDeleteForever size={20} className="text-red-500" />
          </button>
        </Tooltip>
      </T.Cell>
    </T.Row>
  );
}
