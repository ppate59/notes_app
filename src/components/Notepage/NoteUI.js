import React, { Component } from 'react'
import { Icon } from 'antd'
import { deleteQuery, editQuery } from '../../api'
import { toast } from 'react-toastify';
import { navigate } from '@reach/router';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import "react-popupbox/dist/react-popupbox.css"
import "../../App.css"
import 'antd/dist/antd.css';
import { Button, Card, Row, Col } from 'antd';

export class NoteUI extends Component {
  constructor(props){
    super(props);
    this.state = { 
      noteTitleText: '',
      noteDescriptionText: ''
    }
  }

  handleRemove = (e, id) => {
    e.preventDefault();
    deleteQuery(id).then(res => res)
    const newNotesArray = this.props.data.filter(note => note.ref.id !== id)
    navigate('/')
    this.props.setNotes(newNotesArray)
    toast.success('Removed successfully')
  }

  handleEdit = (e, id, newTitle, newDescription) => {
    e.preventDefault();
    editQuery(id, newTitle, newDescription).then(res => res)
  }

  goHomepage = (e) => {
    e.preventDefault();
    const newURL = this.state.noteTitleText.toLowerCase().replace(/\s/g, '-');
    window.location.reload(false);
  }
  
  handleTitleChange = event => {
    this.setState({ noteTitleText: event.target.innerText });
  }

  handleDescriptionChange = event => {
    this.setState({ noteDescriptionText: event.target.innerText });
  }

  updatePopupbox(e) {
    const content = (
      <Card bordered={false} style={{ width: 450 }}>
        <h3>Title:</h3>
        <p>{this.state.noteTitleText}</p>
        <h3>Description:</h3>
        <p>{this.state.noteDescriptionText}</p>
        <Button type="primary" onClick={this.goHomepage}>Close</Button>
      </Card>
    )

    PopupboxManager.update({
      content,
      config: {
        titleBar: {
          text: 'Updated!',
          closeText: ''
        }
      }
    })
  }

  openPopupbox(e, id, title, description) {
    this.setState({
      noteTitleText: title,
      noteDescriptionText: description
    });
    const content = (
      <Card bordered={false} style={{ width: 450 }}>
        <h3>Title</h3>
        <p id="popupboxNoteText"
          contentEditable
          suppressContentEditableWarning
          onChange={this.handleTitleChange}
          onBlur={this.handleTitleChange}
          onInput={this.handleTitleChange}
          autoFocus
          >{title}
        </p>
        <h3>Description</h3>
        <p id="popupboxNoteDescription"
          contentEditable
          suppressContentEditableWarning
          onChange={this.handleDescriptionChange}
          onBlur={this.handleDescriptionChange}
          onInput={this.handleDescriptionChange}
          >{description}
        </p>
        <Button type="primary" onClick={(e) => {
          this.state.noteTitleText === title && this.state.noteDescriptionText === description?
          alert("No changes were made")
          :
          this.updatePopupbox(e);
          this.handleEdit(e, id, this.state.noteTitleText, this.state.noteDescriptionText);
          }} >save
        </Button>
      </Card>
    )

    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: 'Edit Note'
        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }
  
  render() {
    const data = this.props.data
    const NoteID = this.props.NoteID
    return (
      <div>
        {data && data.filter(note => note.ref.id === NoteID).map(note => (
          <div key={note.ref.id} className="notepage" >
            <Row className="notepage-head">
              <Col span={4} offset={2}>
                <Icon onClick={() =>
                        navigate('/')
                  }
                  theme="twoTone" style={{ cursor: "pointer", fontSize: '37px', marginRight: '50%' }} 
                  type="home" 
                />
              </Col>
              <Col span={12}>
                <Button type="primary" onClick={(e) => this.openPopupbox(e, note.ref.id, note.data.title, note.data.description)}>Edit</Button>
                <PopupboxContainer />
              </Col>
              <Col span={4}>
                <Icon 
                  onClick={(e) => this.handleRemove(e, note.ref.id)} 
                  theme="twoTone" style={{ cursor: "pointer", fontSize: '37px', marginLeft: "5%"}} 
                  type="delete" 
                />
              </Col>
            </Row>
            <Row className="site-card-border-less-wrapper">
              <Col  span={12} offset={6}>
                <Card title={note.data.title} bordered={false} >
                  <p>{note.data.description}</p>
                </Card>
                <span style={{ float: "right" }}>Last Edit:  {Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format((note.ts) / 1000)}
                </span>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    );
  }
}
export default NoteUI;