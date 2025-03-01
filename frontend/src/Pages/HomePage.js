import React, { useEffect } from 'react';
import {
    Container,
    Box,
    Text,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
}
    from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { ChatProvider } from '../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) navigate("/chats");
    }, [navigate]);
    return (
        <Container maxW='xl' centerContent>
            <Box
                w='100%'
                display="flex"
                justifyContent='center'
                p={3}
                bg='white'
                m='40px 0 15px 0'
                borderWidth='1px'
            >
                <Text
                    fontSize="3xl"
                    fontFamily='Work sans'
                    color='black'
                >
                    Let's Chat</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb='1em'>
                        <Tab w='50%'>Login</Tab>
                        <Tab w='50%'>SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>

    )
}

export default HomePage