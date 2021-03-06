import React from 'react'
import { Form, Button, Input, Row, Col } from 'antd';
import { createQuery } from '../../api'
import { toast } from 'react-toastify';
import GetNotes from '../Home/GetNotes'
import 'antd/dist/antd.css';

const { TextArea } = Input;

const NoteForm = ({ form, notes, setNotes }) => {

  const { getFieldDecorator, validateFields, resetFields } = form;

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err && values.note && values.description) {
        createQuery(values.note, values.description).then(res => {
          const newNotesArray = notes.concat([res])
          setNotes(newNotesArray)
          toast.success('Added Successfully')
          resetFields()
          return(
          <GetNotes notes={notes} setNotes={setNotes} />
          )
        })
      }
    });
  }
  
  return (
    <Form style={{marginTop: '3%'}} layout="horizontal" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('note', {
        rules: [{ required: true, message: 'Please enter title!' }],
        })(
          <Row>
            <Col span={4}>
              <span className="noteform-title">Title:</span>
            </Col>
            <Col span={16}>
              <Input
                  className="note-input"
                  size="large"
                  placeholder="Add New Note"
              />
            </Col>
          </Row>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('description', {
        rules: [{ required: true, message: 'Please enter description!' }],
        })(
          <Row>
            <Col span={4}>
              <span className="noteform-title">Description:</span>
            </Col>
            <Col span={16}>
              <TextArea
                className="note-input"
                size="large"
                placeholder="Add New Note Description" 
                autosize={{ minRows: 5, maxRows: 7 }}
              />
            </Col>
          </Row>
        )}
      </Form.Item>
      <Form.Item style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit">
          Create Note
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedNoteForm = Form.create({name: 'notes_form'})(NoteForm)

export default WrappedNoteForm;