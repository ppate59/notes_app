import React from 'react';
import NoteForm from '../Home/NoteForm'
import GetNotes from '../Home/GetNotes'
import { Row, Col } from 'antd';

const Home = ({notes, setNotes }) => {
    return (
        <>
            <Row>
                <Col span={12} offset={6}>
                    <NoteForm notes={notes} setNotes={setNotes} />
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <GetNotes notes={notes} key={notes.map(note => note.ref.id )} />
                </Col>
            </Row>
        </>
    );
}
export default Home;
