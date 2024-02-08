import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { completedTodo, deleteTodo } from '../store/slices/todoSlice';
import './TodoList.css';

const { Meta } = Card;

function TodoList() {
  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const visibilityFilter = useSelector((state) => state.todo.visibilityFilter);
  const completedTodos = useSelector((state)=> state.todo.completedTodos);

  const handleCompleted = (id, title, description, completed) => {
    setIsOpen(true)
    dispatch(completedTodo({
      id: id,
      title: title,
      description: description,
      completed: !completed
    }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    message.success('Todo deleted');
    setIsOpen(false);
    setDeleteId(null);
  };

  const handleSettings = (id) => {
    setIsOpen(true);
    setDeleteId(id);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

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

  const style = (completed) => {
      if (completed) {
         return {
          textDecoration: 'line-through'
         }
      }
    
  }



  return (
    <>
      {renderFilteredTodos().map(todo => (
        <Card
          key={todo.id}
          style={{ width: 300, marginTop: 16, ...style(todo.completed)  }}
          actions={[
            <DeleteOutlined style={{ color: 'red'  }} onClick={() => handleSettings(todo.id)} key="delete" />,
            <EditOutlined key="edit" />,
            <CheckOutlined style={{color:'green'}} onClick={() => handleCompleted(todo.id, todo.title, todo.description, todo.completed)} />,
          ]}
        >
          <Meta
            title={todo.title}
            description={todo.description}
          />
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
