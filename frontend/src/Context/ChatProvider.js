import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const ChatContext = createContext();


const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    // const navigate = useNavigate();

    // const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // // console.log("ChatProvider: ", userInfo);
        setUser(userInfo);
        // // console.log("ChatProvider user: ", user);


        // if (!userInfo) {
        //     navigate("/");
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const ChatState = () => {
    return useContext(ChatContext);
};


export { ChatProvider, ChatState };