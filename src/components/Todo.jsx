import { useState, useEffect, useRef } from 'react';

const Todo = () => {
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState({});

  const isMounted = useRef(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(data => {
        // To make the process longer for this usecase to understand
        setTimeout(() => {
          if (isMounted.current) {
            setTodo(data);
            setLoading(false);
          }
        }, 3000);
      });

    //if you remove this fn you will get the warning of memory leakage.
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return loading ? <h3>Loading...</h3> : <h1>{todo.title}</h1>;
};

export default Todo;

// 1. The memory leak comes from trying to update the state of a component that is not in the DOM.

// 2. Brad uses a isMounted ref to keep track of if the component is in the DOM or not, if it is then
//  it is safe to try and update state, if it is not then we don't update state - no memory leak.

// It is a tricky one though and I wouldn't say using a ref here is always the approach you should take.
// Many asynchronous API's you use (like Fetch or Firebase) will provide ways to correctly cleanup and cancel
// some asynchronous action you started.
// For example in this useRef example we won't get a memory leak from updating state but we still potentially
// have a memory leak in that our setTimeout is still running and our fetch request may still be waiting for a
// response. So we do still have memory leaks, you just don't get a nice warning about them.

// Hope that makes sense.

// You can return a function from useEffect.

// That function will get called when your component is unmounted i.e. when it leaves the DOM.

// So by returning a function that set's isMounted.current to false then the check prior to
//  updating state fails the condition and no longer runs, which is why we no longer try to update state in an unmounted component.
