import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    VStack
} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate();
    // const history = unstable_HistoryRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    // const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const SubmitHandler = async () => {
        // setPicLoading(true);

        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Empty Fields.',
                description: "Please fill all the required fields",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: 'Check Password & Confirm Password',
                description: "Password & Confirm Password",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post('/api/user', { name, email, password }, config);
            // console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userData', JSON.stringify(data));
            setPicLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setPicLoading(false);
        }
    };

    const postDetails = (pics) => {

    };

    return (

        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    id="email-input"
                    type="email"
                    value={email}
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        id='password-input'
                        type={show ? "text" : "password"}
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        id='confirm-password-input'
                        type={show ? "text" : "password"}
                        value={confirmpassword}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={SubmitHandler}
                loadingText="Submitting"
                isLoading={picLoading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup