import React, { useState } from 'react';
import { Button, Input, Space, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/slices/todoSlice';
import { changeDescription, changeTitle } from '../store/slices/formSlice';
import { runes } from 'runes2';


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
    if (title.length === 0) {
          message.warning('Please add a title')
          return false
      
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (description.length === 0) {
      message.warning('Please add a description')
      return false
      
    }
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
         
        count={{
          show: true,
          max: 20,
          strategy: (txt) => runes(txt).length,
          exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join('')
        }}
        defaultValue="Please Enter a Title For the To-Do"
      />
        <Button style={{ borderRadius:'5px' }} type="primary" onClick={showModal} >Add ToDo</Button>
        <Modal  title="Please Enter an Explanation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <TextArea style={{maxHeight:100, margin:'10px', resize:'none'}} showCount rows={4} value={description} maxLength={100} onChange={(e)=> dispatch(changeDescription(e.target.value))} />
        </Modal>
      </Space.Compact>
    </form>
  );
}

export default TodoForm;
