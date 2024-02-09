import { Alert, Form, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types'; // prop-types eklenmeli

function EditModal(props) {
    console.log(props.selectedEdit.title);

    return (
        <>
            <Form
                name="trigger"
                style={{
                    maxWidth: 500,
                }}
                layout="horizontal"
                autoComplete="off"
            >
                <Form.Item
                    hasFeedback
                    label="Title"
                    name="title"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            min: 3,
                            max: 20,
                        },
                    ]}
                >
                    <Input placeholder={props.selectedEdit.title} />
                </Form.Item>
            </Form>
        </>
    );
}

EditModal.propTypes = {
    selectedEdit: PropTypes.object.isRequired // props doğrulaması yapılandırması
};

export default EditModal;
