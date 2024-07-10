import React, { useEffect, useState } from 'react'
// import axios from 'axios'

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const fetchChat = async () => {
        try {
            // const response = await axios.get('http://localhost:5000/api/chat');
            const response = await fetch('http://localhost:5000/api/chat');
            // console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);
            setChats(data);
        } catch (error) {
            console.error('Error fetching chat data: ', error);
        }
    }

    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <div>
            {
                chats.map((chat) => {
                    return <div key={chat._id}>{chat.chatName}</div>
                })
            }
        </div>
    )
}

export default ChatPage