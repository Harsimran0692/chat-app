import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'

const App = () => {
    return (
        <Routes>
            <Route path='/' Component={HomePage} />
            <Route path='/chats' Component={ChatPage} />
        </Routes>
    )
}

export default App