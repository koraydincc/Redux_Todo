import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { changeEditDescription, changeEditTitle } from '../store/slices/todoSlice';

function EditModal(props) {
    const dispatch = useDispatch();

 

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
                    
                    placeholder='dasdsa'
                    onChange={handleTitleChange}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                validateTrigger="onBlur"
            >
                <Input.TextArea
                     placeholder='dsadsadsadas'
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
    selectedEdit: PropTypes.object,
};

export default EditModal;
