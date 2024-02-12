import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditDescription, changeEditTitle } from '../store/slices/todoSlice';

function EditModal(props) {
    const dispatch = useDispatch();
    const editTitle = useSelector(state => state.todo.editTitle);
    const editDescription = useSelector(state => state.todo.editDescription);


  
    const handleTitleChange = (e) => {
    
        dispatch(changeEditTitle(e.target.value));
    };

    const handleDescriptionChange = (e) => {

        dispatch(changeEditDescription(e.target.value));
    };



    return (
        
        <Form
           
            style={{
                maxWidth: 500,
            }}
            layout="vertical"
            
        >
            <Form.Item
                label="Title"
              
                validateTrigger="onBlur"
            >
                <Input
                     maxLength={20}
                    showCount
                    value={editTitle}
                    placeholder={props.editedTodo.title}
                    onChange={handleTitleChange}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                validateTrigger="onBlur"
            >
                <Input.TextArea
                    value={editDescription}
                     placeholder= {props.editedTodo.description}
                    onChange={handleDescriptionChange}
                    style={{ maxHeight: 100, resize: 'none' }}
                    showCount
                    rows={4}
                    maxLength={100}
                />
            </Form.Item>
        </Form>
    
    );
}

EditModal.propTypes = {
    editedTodo: PropTypes.object,
};

export default EditModal;
