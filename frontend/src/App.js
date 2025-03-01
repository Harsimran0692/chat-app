import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import { ChatProvider } from './Context/ChatProvider';

const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/chats' Component={ChatPage} />
            </Routes>
        </div>
    )
}

export default App