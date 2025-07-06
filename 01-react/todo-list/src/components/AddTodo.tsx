interface propsType {
  title: string;
  handleTitle: (value: string) => void;
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddTodo = ({ title, handleTitle, handleAddTodo }: propsType) => {
  return (
    <form
      className='flex gap-2 items-center w-full justify-center'
      onSubmit={(e) => handleAddTodo(e)}
    >
      <div className='bg-white border border-gray-300 px-3 py-2 rounded-xl w-1/2 shadow'>
        <input
          type='text'
          className='outline-none w-full'
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder='Add a new Todo...'
        />
      </div>

      <button
        className='px-3 bg-green-400 rounded-md py-2 cursor-pointer'
        type='submit'
      >
        Add Todo
      </button>
    </form>
  );
};
export default AddTodo;
