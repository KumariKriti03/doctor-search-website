import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import logo from '../images/logo.png';
import { FaHome, FaInfo, FaUserMd } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm'; // Assuming you have a LoginForm component
import Greet from './Greet';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loggedIn } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleDrawerOpen = () => {
    onOpen();
    // By default, open the drawer in signup mode
    setIsLoginMode(true);
  };

  const toggleAuthMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="#3498db"
      color="white"
      position="fixed"
      p={3}
      top="0"
      left="0"
      w="100%"
      zIndex="1000"
      boxShadow="md"
    >
      {/* Left Section */}
      <Flex align="center">
        <Image src={logo} alt="Logo" boxSize="40px" />
      </Flex>

      {/* Right Section */}
      <Box>
        <List styleType="none" display="flex" m="0" p="0">
          <ListItem mr="4">
            <FaHome />
            <Link to="/" color="white" textDecoration="none" fontWeight="bold">
              Home
            </Link>
          </ListItem>
          <ListItem mr="4">
            <FaInfo />
            <Link to="/about" color="white" textDecoration="none" fontWeight="bold">
              About
            </Link>
          </ListItem>
          <ListItem mr="4">
            <FaUserMd />
            <Link to="/doctor" color="white" textDecoration="none" fontWeight="bold">
              Doctor
            </Link>
          </ListItem>
          <ListItem style={{ cursor: 'pointer' }} onClick={handleDrawerOpen}>
            <MdAccountCircle />
            <Text color="white" fontSize="small" fontWeight="bold">
              Account
            </Text>
          </ListItem>
        </List>
      </Box>

      {/* Chakra UI Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} size="sm" placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">
            {loggedIn ? "Welcome Back!" : (
              isLoginMode ? (
                <Flex justify="space-between" align="center" p="0 2em">
                  <Text>Welcome Back!</Text>
                  <Button
                    variant="outline"
                    colorScheme="green"
                    size="sm"
                    onClick={toggleAuthMode}
                  >
                    Create an Account
                  </Button>
                </Flex>

              ) : (
                <Flex justify="space-between" align="center" p="0 2em">
                  <Text>Create an Account</Text>
                  <Button
                    variant="outline"
                    colorScheme="green"
                    size="sm"
                    onClick={toggleAuthMode}
                  >
                    Log In
                  </Button>
                </Flex>
              )
            )}
          </DrawerHeader>

          <DrawerBody>
            {loggedIn ? (
              // Content for logged-in user (green)
              <Greet />
            ) : (
              <>
                {isLoginMode ? <LoginForm /> : <SignUpForm />}
              </>
            )}
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
