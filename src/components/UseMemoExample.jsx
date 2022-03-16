import { useEffect, useMemo, useRef, useState } from 'react';

function UseMemoExample() {
  const [num, setNum] = useState(1);
  const [inc, setInc] = useState(0);

  // const sqrt = getSqrt(num);
  const sqrt = useMemo(() => getSqrt(num), [num]);

  const renders = useRef(1);

  useEffect(() => {
    renders.current = renders.current + 1;
  });

  const onClick = () => {
    setInc(prevState => {
      return prevState + 1;
    });
  };

  return (
    <div className='pt-5'>
      <input
        type='number'
        name=''
        id=''
        className='form-control w-25 mx-auto my-3'
        value={num}
        onChange={e => setNum(e.target.value)}
      />
      <h3 className='my-3 text-light'>
        The sqrt of {num} is {sqrt}
      </h3>

      {/* when we click this we dont want to change the value of num, so only when num is changed, we want to actually
      call the getSqrt(), so this is a good oppurtunuty to memoize the getSqrt(), otherwise it will run on all rerendering. */}
      <button onClick={onClick} className='btn btn-primary mb-5'>
        Re render
      </button>

      <h3 className='text-light'>Renders: {renders.current}</h3>
    </div>
  );
}

const getSqrt = n => {
  for (let i = 0; i < 10000; i++) {
    console.log(i);
  }

  console.log('Expensive function called');
  return Math.sqrt(n);
};

export default UseMemoExample;
