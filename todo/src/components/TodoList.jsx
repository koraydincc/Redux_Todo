import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Flex, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { completedTodo, deleteTodo } from '../store/slices/todoSlice';
import './TodoList.css';

const { Meta } = Card;

function TodoList() {
  const [deleteId, setDeleteId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const completedTodos = useSelector((state) => state.todo.completedTodos);

  const handleCompleted = (id) => {
    dispatch(completedTodo(id));
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

  return (
    <>
      {todos.map((todo) => (
        <Flex key={todo.id}>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <DeleteOutlined style={{ color: 'red' }} onClick={() => handleSettings(todo.id)} key="delete" />,
              <EditOutlined key="edit" />,
              <CheckOutlined onClick={() => handleCompleted(todo.id)} />,
            ]}
          >
            <Meta
              title={todo.title}
              description={todo.description}
            />
          </Card>
        </Flex>
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
      {completedTodos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </div>
        );
      })}
    </>
  );
}

export default TodoList;
