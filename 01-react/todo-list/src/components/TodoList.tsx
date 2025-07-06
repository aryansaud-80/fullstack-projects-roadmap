import { FiEdit3 } from 'react-icons/fi';
import type { TodoType } from '../types/todo';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface propsType {
  todos: TodoType[];
  filteredTodos: TodoType[];
  handleSetTodos: (todos: TodoType[]) => void;
  handleCompleted: (id: string) => void;
  active: string;
}

interface isEditType {
  id: string;
  edit: boolean;
}

const TodoList = ({
  todos,
  filteredTodos,
  handleSetTodos,
  handleCompleted,
  active,
}: propsType) => {
  const activeTodo = todos.filter((todo) => todo.completed === false);
  const [isEdit, setIsEdit] = useState<isEditType>({
    id: '',
    edit: false,
  });
  const [newTitle, setNewTitle] = useState<string>('');

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    handleSetTodos(newTodos);
  };

  const handleEditToggle = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    setIsEdit({
      id,
      edit: true,
    });

    setNewTitle(todo.title);
  };

  const handleSave = (id: string) => {
    const updatedTodos: TodoType[] = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
        };
      }
      return todo;
    });

    handleSetTodos(updatedTodos);
    setIsEdit({
      id: '',
      edit: false,
    });
  };

  if (filteredTodos.length === 0) {
    if (active === 'All')
      return (
        <div className='flex flex-col gap-3 items-center text-slate-500'>
          <h1 className='text-2xl '>No todos yet</h1>
          <span>Add one above to get started</span>
        </div>
      );
    else if (active === 'Active') {
      return (
        <div className='flex flex-col gap-3 items-center text-slate-500'>
          <h1 className='text-2xl '>No Active todos</h1>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-3 items-center text-slate-500'>
          <h1 className='text-2xl '>No Completed todos</h1>
        </div>
      );
    }
  }
  return (
    <div className='w-2/4 flex flex-col gap-5 mb-10'>
      {filteredTodos.map((todo, idx) => {
        return (
          <div
            key={idx}
            className='flex justify-between items-center bg-white shadow px-3 py-6 rounded-md cursor-pointer hover:shadow-md '
          >
            {isEdit.edit && isEdit.id === todo.id ? (
              <div className='w-full flex gap-3  items-center justify-between'>
                <div className='flex gap-4 items-center border border-gray-400 rounded-md p-2 w-full'>
                  <input
                    type='text'
                    value={newTitle}
                    className='outline-none'
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className='flex gap-3 items-center'>
                  <button
                    className='bg-green-500 px-3 py-2 rounded-md cursor-pointer'
                    onClick={() => handleSave(todo.id)}
                  >
                    <IoCheckmarkOutline className='w-5 h-5' />
                  </button>

                  <button
                    className='bg-gray-200 px-3 py-2 rounded-md cursor-pointer'
                    onClick={() =>
                      setIsEdit({
                        id: '',
                        edit: false,
                      })
                    }
                  >
                    <RxCross1 className='w-5 h-5' />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex gap-4 items-center w-full '>
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => handleCompleted(todo.id)}
                    className='w-5 h-5 cursor-pointer'
                  />
                  <h1
                    className={` text-xl w-full ${
                      todo.completed
                        ? 'text-gray-400 line-through decoration-1 decoration-slate-300'
                        : 'text-slate-600'
                    }`}
                  >
                    {todo.title}
                  </h1>
                </div>

                <div className='flex gap-6 text-slate-400'>
                  <button
                    className='cursor-pointer'
                    onClick={() => handleEditToggle(todo.id)}
                  >
                    <FiEdit3 />
                  </button>

                  <button
                    className='cursor-pointer'
                    onClick={() => handleDelete(todo.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      <span className='text-center text-slate-600'>
        {`${activeTodo.length} of ${todos.length} todos remaining`}
      </span>
    </div>
  );
};
export default TodoList;
