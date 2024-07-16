import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatProvider, ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <ChatProvider><MyChats fetchAgain={fetchAgain} /></ChatProvider>}
                {user && (
                    <ChatProvider><Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></ChatProvider>
                )}
            </Box>
        </div>
    );
};

export default Chatpage;