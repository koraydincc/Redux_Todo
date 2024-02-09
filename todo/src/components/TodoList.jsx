import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, message, Typography, Popconfirm   } from 'antd';
import { DeleteOutlined,SmileTwoTone, EditOutlined,QuestionCircleOutlined , CheckCircleOutlined, RedoOutlined, FrownTwoTone, MehTwoTone   } from '@ant-design/icons';
import { completedTodo, deleteTodo, toggleEvent, editTodo } from '../store/slices/todoSlice';
import EditModal from './EditModal';


const { Text, Title  } = Typography;

function TodoList() {

  const [selectedEdit, setSelectedEdit] = useState(null)
  const [editModal, setEditModal] = useState(false);
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
                  <Title type='secondary' level={4}>You do not have active duty <FrownTwoTone /></Title>
                )
                case 'Completed':
                  return (
                    <Title type='secondary' level={4}>
                    You have no completed tasks <MehTwoTone /></Title>
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
    
    const previousData = { id: todo.id, title: todo.title, description: todo.description };

 
    setEditModal(true);
    setSelectedEdit(previousData);
};

const handleEditConfirm = (editedData) => {
   
    dispatch(editTodo({
        id: editedData.id,
        title: editedData.title,
        description: editedData.description
    }));

    clearForm(editedData)

    setEditModal(false);
};

const clearForm = (props) => {
   return (props.title =' ',
  props.description = '')
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
                        handleEdit(todo);
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
        onOk={() => handleEditConfirm(selectedEdit) }
        onCancel={() => {
          editCancel()
        }}

        >
              <EditModal title={selectedEdit ? selectedEdit.title : ""} description={selectedEdit ? selectedEdit.description : ""} />


        </Modal>

     
      
    </>
  );
}

export default TodoList;
