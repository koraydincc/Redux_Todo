import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { changeEditDescription, changeEditTitle } from '../store/slices/todoSlice';
import { useDispatch } from 'react-redux';


function EditModal(props) {
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
        dispatch(changeEditTitle(e.target.value));
    };

    const handleDescription = (e) => {
        dispatch(changeEditDescription(e.target.value))
    }

    return (
        <Form
            name="trigger"
            style={{
                maxWidth: 500,
            }}
            layout="vertical"
            autoComplete="off"
        >
            <Form.Item
                hasFeedback
                label="Title"
                name="title"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: 'Please input a title!',
                    },
                    {
                        min: 3,
                        max: 20,
                        message: 'Title must be between 3 and 20 characters!',
                    },
                ]}
            >
                <Input
                    placeholder={props.title}
                    onChange={handleTitleChange}
                />
            </Form.Item>
            <Form.Item
                hasFeedback
                label="Description"
                name="description"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: 'Please input a description!',
                    },
                    {
                        min: 3,
                        max: 100,
                        message: 'Description must be between 3 and 100 characters!',
                    },
                ]}
            >
                <Input.TextArea
                    placeholder={props.description}
                    onChange={handleDescription}
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

    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default EditModal;
