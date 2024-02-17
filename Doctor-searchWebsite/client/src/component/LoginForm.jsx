import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useAuth } from '../context/authContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const cookies = new Cookies();
  const { setLoggedIn } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', formData);
      console.log('Login successful:', response.data);

      // Set token to cookies with a 1-hour expiration time
      cookies.set('token', response.data.user._id, { path: '/', maxAge: 3600 });

      // Set loggedIn state to true
      setLoggedIn(true);

      // Show Chakra UI toast notification for successful login
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle errors, update state, or show error messages to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({
        email: 'Email is required',
        password: 'Password is required',
      });
    } else {
      setErrors({}); // Clear any previous errors

      try {
        await loginUser(formData);
        // Optionally, redirect the user or update UI for successful login
      } catch (error) {
        console.error('Error logging in:', error.message);
        // Handle errors, update state, or show error messages to the user
      }
    }
  };

  return (
    <Box p="4">
      <form onSubmit={handleSubmit}>
        <FormControl mt="4" isRequired isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl mt="4" isRequired isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Button mt="4" colorScheme="blue" type="submit">
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
