import { useEffect } from 'react';
import type { TodoType } from '../types/todo';

const filters = ['All', 'Active', 'Completed'];

type FilterPropsType = {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  handleSetFilteredTodos: (todos: TodoType[]) => void;
  active: string;
  setActive: (value: string) => void;
};

const Filter = ({
  todos,
  setTodos,
  handleSetFilteredTodos,
  active,
  setActive,
}: FilterPropsType) => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  useEffect(() => {
    if (active === 'Active') {
      handleSetFilteredTodos(activeTodos);
    } else if (active === 'Completed') {
      handleSetFilteredTodos(completedTodos);
    } else {
      handleSetFilteredTodos(todos);
    }
  }, [active, todos]);

  const handleClearCompletedTodo = () => {
    const activeTodos: TodoType[] = todos.filter((todo) => !todo.completed);

    setTodos(activeTodos);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-10 items-center'>
        {filters.map((filter, idx) => {
          const count =
            filter === 'Active'
              ? activeTodos.length
              : filter === 'Completed'
              ? completedTodos.length
              : todos.length;

          return (
            <button
              key={idx}
              className={`px-3 py-2 rounded-md cursor-pointer ${
                active === filter ? 'bg-blue-400 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActive(filter)}
            >
              {filter} ({count})
            </button>
          );
        })}
      </div>

      {completedTodos.length > 0 && (
        <button
          className='hover:text-red-500 hover:bg-red-300 px-3 py-2 rounded-md cursor-pointer'
          onClick={handleClearCompletedTodo}
        >
          Clear Completed {`(${completedTodos.length})`}
        </button>
      )}
    </div>
  );
};

export default Filter;
