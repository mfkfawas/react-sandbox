import React, { useState, useCallback } from 'react';

const UseCallbackExample = () => {
  const [tasks, setTasks] = useState([]);

  //Think of memoization as caching a value so that it does not need to be recalculated.
  //(To understand useCallback and React.memo look my notes of Max)
  const addTask = useCallback(() => {
    setTasks(prevState => [...prevState, 'Some Tasks']);
  }, []);

  return (
    <div>
      <Button addTask={addTask} />
      {tasks.map((task, index) => (
        <p className='text-light' key={index}>
          {task}
        </p>
      ))}
    </div>
  );
};

const Button = React.memo(({ addTask }) => {
  console.log('Button Rendered');
  return (
    <button className='btn btn-primary mt-5' onClick={addTask}>
      Add Task
    </button>
  );
});

export default UseCallbackExample;
