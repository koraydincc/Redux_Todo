import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, message, Typography  } from 'antd';
import { DeleteOutlined,SmileTwoTone, EditOutlined, CheckCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { completedTodo, deleteTodo, toggleEvent } from '../store/slices/todoSlice';
import './TodoList.css';



const { Text, Title  } = Typography;

function TodoList() {
  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const visibilityFilter = useSelector((state) => state.todo.visibilityFilter);
  
  const completedTodos = useSelector((state) => state.todo.completedTodos);

  const handleCompleted = (id, title, description, completed) => {
    dispatch(completedTodo({
      id: id,
      title: title,
      description: description,
      completed: !completed
    }));
    message.success('Mission Completed ! ')
  };


  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    message.success('Todo deleted');
    setIsOpen(false);
    setDeleteId(null);
  };

  const toggle = (id, completed, title, description) => {
    dispatch(toggleEvent({ id: id, completed:completed, title: title, description: description }));
    message.info('You Back the Mission')
    
}


  const handleSettings = (id) => {
    setIsOpen(true);
    setDeleteId(id);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const itemList = () => {
       if (renderFilteredTodos() <= 0) {
            switch(visibilityFilter){
              case 'All':
              return ( 
                 <Title type='secondary' level={4}>Add ToDo <SmileTwoTone/></Title>
              )
            }
       }

  }
  
  function renderFilteredTodos() {
    if (visibilityFilter === 'All') {
      return todos.concat(completedTodos);
    } else if (visibilityFilter === 'Active') {
      return todos;
    } else if (visibilityFilter === 'Completed') {
      return completedTodos;
    }
    return [];
  }



  const getTodoStyle = (completed) => {
    if (completed) {
      return {
        textDecoration: 'line-through'
      };
    }
    return {};
  };

  return (
    <>
      {renderFilteredTodos().length <= 0 ?  itemList() : 

      renderFilteredTodos().map(todo => (
      
        <Card
          
          hoverable={true}
          size='long'
          key={todo.id}
          style={{ width: 300, marginTop: 16, ...getTodoStyle(todo.completed) }}
          actions={[
            
            <DeleteOutlined style={{ color: 'red' }} onClick={() => handleSettings(todo.id)} key="delete" />,
            <EditOutlined key="edit" />,
            todo.completed ?  (
              <RedoOutlined onClick={() => toggle(todo.id, todo.completed)} style={{ color: 'green' }} />
            ) : <CheckCircleOutlined style={{ color: 'green' }} onClick={() => handleCompleted(todo.id, todo.title, todo.description, todo.completed) } />,
          ]}
        >
          <div className='card'>
            <div className='card-content'>
              <Title type='danger' level={5} strong>
                {todo.title}
              </Title>
              <Text italic>
                  {todo.description}
              </Text>
            </div>
          </div>
         
        </Card>
      ))}
      <Modal
        title="Confirm"
        open={isOpen}
        onOk={() => handleDelete(deleteId)}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this To-Do?</p>
      </Modal>
      
    </>
  );
}

export default TodoList;
