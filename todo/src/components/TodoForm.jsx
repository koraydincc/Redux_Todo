import React, { useState } from 'react';
import { Button, Input, Space, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/slices/todoSlice';
import { changeDescription, changeTitle } from '../store/slices/formSlice';


function TodoForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = useSelector(state => state.form.title);
  const description = useSelector(state => state.form.description)
  const completed = useSelector(state => state.form.completed )
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(addTodo({
      title: title,
      description: description,
      completed: completed,
    }));
    setIsModalOpen(false);

   
  };


  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          value={title}
          onChange={(e) => dispatch(changeTitle(e.target.value))}
          placeholder="Please Enter a Title For the To-Do" 
        />
        <Button style={{ borderRadius:'5px' }} type="primary" onClick={showModal} >Add ToDo</Button>
        <Modal title="Please Enter an Explanation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <TextArea rows={4} value={description} onChange={(e)=> dispatch(changeDescription(e.target.value))} />
        </Modal>
      </Space.Compact>
    </form>
  );
}

export default TodoForm;
