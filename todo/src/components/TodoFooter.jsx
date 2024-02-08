import React, { useEffect } from 'react';
import { Segmented } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showTodos } from '../store/slices/todoSlice';


function TodoFooter() {

  const visibilityFilter = useSelector((state) => state.todo.visibilityFilter);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(showTodos('All'));
  }, [dispatch]); 

  const handleSegment = (value) => {
    dispatch(showTodos(value));
    
  };



  return (
    <div style={{ backgroundColor: 'white', padding: '20px 0', textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <Segmented
        value={visibilityFilter}
        style={{ maxWidth: '400px', margin: '0 auto', color: '#1677FF' }}
        options={['All', 'Active', 'Completed']}
        onChange={handleSegment}
      />
    </div>
  );
}

export default TodoFooter;
