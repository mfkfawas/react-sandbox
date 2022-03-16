import useLocalStorage from '../hooks/useLocalStorage';

const CustomHookExample2 = () => {
  const [task, setTask] = useLocalStorage('task', '');
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const onSubmit = e => {
    e.preventDefault();

    const taskObj = {
      task,
      completed: false,
      date: new Date().toLocaleDateString(),
    };

    setTasks(prevTasks => [...prevTasks, taskObj]);
  };

  return (
    <>
      <form className='w-50 text-light' onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='' className='form-label'>
            Task
          </label>
          <input
            type='text'
            className='form-control'
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
      <hr className='text-light' />

      {tasks.map(task => (
        <h3 className='text-light' key={task.date}>
          {task.task}
        </h3>
      ))}
    </>
  );
};

export default CustomHookExample2;
