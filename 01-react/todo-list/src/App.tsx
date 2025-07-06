import { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import type { TodoType } from './types/todo';
import TodoList from './components/TodoList';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [active, setActive] = useState('All');
  const [todos, setTodos] = useState<TodoType[]>(
    JSON.parse(localStorage.getItem('todos') ?? '[]')
  );
  const [title, setTitle] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const todo: TodoType = {
      id: uuidv4(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, todo]);
    setTitle('');
  };

  const handleCompleted = (id: string) => {
    const newTodos: TodoType[] = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section
      className='w-screen  flex flex-col gap-8 items-center 
    mt-8 '
    >
      <Header />
      <AddTodo
        title={title}
        handleTitle={setTitle}
        handleAddTodo={handleAddTodo}
      />
      <Filter
        todos={todos}
        setTodos={setTodos}
        handleSetFilteredTodos={setFilteredTodos}
        active={active}
        setActive={setActive}
      />
      <TodoList
        todos={todos}
        filteredTodos={filteredTodos}
        handleSetTodos={setTodos}
        handleCompleted={handleCompleted}
        active={active}
      />
    </section>
  );
};
export default App;
