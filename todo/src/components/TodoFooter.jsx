import React from 'react';
import { Segmented } from 'antd';
import { useDispatch } from 'react-redux';
import { showTodos } from '../store/slices/todoSlice';

function TodoFooter() {
  const dispatch = useDispatch();

  const handleSegment = (value) => {
    let completed;
    if (value === 'Completed') {
      completed = true;
      dispatch(showTodos({ completed: true }));
    } else if (value === 'Active') {
      completed = false;
      dispatch(showTodos({ completed: false }));
    } else {
      completed = undefined;
      dispatch(showTodos({ completed: undefined }));
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px 0', textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <Segmented
        style={{ maxWidth: '400px', margin: '0 auto', color: '#1677FF' }}
        options={['All', 'Active', 'Completed']}
        onChange={handleSegment}
      />
    </div>
  );
}

export default TodoFooter;
