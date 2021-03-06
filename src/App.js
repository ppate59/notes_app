import React, { useEffect, useContext, useState } from 'react';
import { Router, navigate } from '@reach/router';
import './App.css';
import { getAllQuery } from './api'
import { FaunaCtx, UserCtx } from './contexts';
import useFauna from './config/useFauna'
import useNetlifyIdentity from './config/useNetlifyIdentity'
import Note from './components/Notepage/Note'
import Home from './components/Home/Home'
import NotFound from './components/Default/NotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import { Button, Layout } from 'antd';

const { Header, Content } = Layout;

function Login() {
  const { user, doLogin, doLogout } = useContext(UserCtx);
  const style = { cursor: 'pointer' };
  var actionForm = (
    <span>
      <Button type="primary" onClick={doLogin}>
        Login or Sign Up in Notes app 
      </Button>
    </span>
  );
  return (
    <div className="header-log-button" >
      {user ? (
        <Button type="primary" onClick={() => { 
          navigate('/');
          doLogout();
        }}>
          Logout
        </Button>
      ) : (
        actionForm
      )}
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    getAllQuery.then(res => setNotes(res))
  }, [])

  const fauna = useFauna();
  const { load, onAuthChange, getServerLists } = fauna;
  const identity = useNetlifyIdentity(faunadb_token => {
    onAuthChange(faunadb_token).then(_client => {
      if (_client) load(getServerLists(_client));
    });
  });

  return (
    <FaunaCtx.Provider value={fauna}>
      <UserCtx.Provider value={identity}>
        <Layout >
          <ToastContainer />
          <Header>
            <Login />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {identity.user && (
                <Router>
                  <Home path="/" notes={notes} setNotes={setNotes} />
                  {notes.map(note => 
                      <Note path={note.ref.id.toLowerCase().replace(/\s/g, '-')} NoteID={note.ref.id} key={note.ref.id} notes={notes} setNotes={setNotes} />
                  )}
                  <NotFound default />
                </Router>
            )}
          </Content>
        </Layout>
      </UserCtx.Provider>
    </FaunaCtx.Provider>
  );
}
