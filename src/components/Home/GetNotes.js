import React from 'react';
import { Link } from '@reach/router';
import { List } from 'antd';

const GetNotes = ({ notes }) => {
    return (
        notes.map((note, index) => 
            <List key={index}>
                <List.Item style={{fontSize: 'large'}}>
                    <Link to={note.ref.id.toLowerCase().replace(/\s/g, '-')} id={note.ref.id} >
                        {note.data.title}
                    </Link>
                </List.Item>
            </List>
        )
    );
}
export default GetNotes;
