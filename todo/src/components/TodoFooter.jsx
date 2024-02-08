import React from 'react';
import { Segmented } from 'antd';
import { useDispatch } from 'react-redux';
import { showTodos } from '../store/slices/todoSlice';

function TodoFooter() {
  const dispatch = useDispatch();

  const handleSegment = (value) => {
    dispatch(showTodos({payload: value}));

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
