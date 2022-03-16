import { useRef } from 'react';

const useRefExample1 = () => {
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    inputRef.current.value = 'Peaky Blinders';
  };

  return (
    <form onSubmit={onSubmit}>
      <label
        onClick={() => inputRef.current.focus()}
        htmlFor='name'
        className='mb-2'
      >
        Name
      </label>
      <input
        ref={inputRef}
        type='text'
        id='name'
        className='form-control mb-2'
      />
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default useRefExample1;
