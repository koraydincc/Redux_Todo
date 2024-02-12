import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, message, Typography, Popconfirm   } from 'antd';
import { DeleteOutlined,SmileTwoTone, EditOutlined , CheckCircleOutlined, RedoOutlined, FrownTwoTone, MehTwoTone   } from '@ant-design/icons';
import { completedTodo, deleteTodo, toggleEvent, editTodo, clearEditValues } from '../store/slices/todoSlice';

import EditModal from './EditModal';


const { Text, Title  } = Typography;

function TodoList() {

  
  const [editModal, setEditModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null)
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
  const editCancel = () => {
 
    setEditModal(false);
  }; 

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    message.success('Todo deleted');

  };



  const toggle = (id, completed, title, description) => {
    dispatch(toggleEvent({ id: id, completed:completed, title: title, description: description }));
    message.info('You Back the Mission')
    
}


  const itemList = () => {
       if (renderFilteredTodos() <= 0) {
            switch(visibilityFilter){
              case 'All':
              return ( 
                 <Title type='secondary' level={4}>Add ToDo <SmileTwoTone/></Title>
              )
              case 'Active':
                return (
                  <Title type='secondary' level={4}>You do not have active ToDo <FrownTwoTone /></Title>
                )
                case 'Completed':
                  return (
                    <Title type='secondary' level={4}>
                    You have no completed ToDo <MehTwoTone /></Title>
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

  const handleEdit = (todo) => {
    console.log(todo);
    setEditedTodo({
        id: todo.id,
        title: todo.title,
        description: todo.description
    });
 
    setEditModal(true);
    
  
};
  
const handleEditConfirm = () => {
  dispatch(editTodo({
      id: editedTodo.id,
      title: editedTodo.title,
      description: editedTodo.description
  }));
  dispatch(clearEditValues(' '))
  setEditModal(false);
  message.success('Changes Saved!');
};

  
 
  
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
             <Popconfirm
             key='delete'
             title="Are you sure delete this task?"
             onConfirm={() => handleDelete(todo.id)}
             okText="Yes"
             cancelText="No"
             >
                  <DeleteOutlined style={{color: 'red'}}></DeleteOutlined>
             </Popconfirm>,
            <EditOutlined 
                  style={{ color: todo.completed ? '#ccc' : '#1677FF'}} 
                  key="edit" 
                  onClick={() => {
                    if (todo.completed) {
                        message.warning('You cannot edit a completed task.');
                    } else {
                        handleEdit(todo)
                    }
                }}
                
            />,
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
              <Text italic >
                  {todo.description}
              </Text>
            </div>
          </div>
          
        </Card>
      ))}
      <Modal
        title='Edit'
        open={editModal}
        onOk={() => handleEditConfirm() }
        onCancel={() => {
          editCancel()
        }}

        >
              <EditModal  editedTodo= {editedTodo}/>


        </Modal>

     
        
    </>
  );
}

export default TodoList;
