import React, { memo } from 'react';
import NoteUI from '../Notepage/NoteUI'
import { Icon, Layout } from 'antd';
import { navigate } from '@reach/router';

const { Header, Content, Footer } = Layout;

const Note = memo (({notes, NoteID, setNotes}) => ( 
    <NoteUI 
        data={notes}
        NoteID={NoteID}
        setNotes={setNotes}
    />  
))
export default Note;