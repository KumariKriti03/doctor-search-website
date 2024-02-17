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

const SignUpForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createAccount = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/user/register', formData);
      console.log('Account created successfully:', response.data);

      // Show Chakra UI toast notification
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear input fields
      setFormData({ name: '', email: '', phone: '', password: '' });
    } catch (error) {
      console.error('Error creating account:', error.message);
      // Handle errors, update state, or show error messages to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrors({
        name: 'Name is required',
        email: 'Email is required',
        phone: 'Phone number is required',
        password: 'Password is required',
      });
    } else {
      setErrors({}); // Clear any previous errors

      try {
        await createAccount(formData);
        // Optionally, redirect the user or update UI for successful signup
      } catch (error) {
        console.error('Error creating account:', error.message);
        // Handle errors, update state, or show error messages to the user
      }
    }
  };

  return (
    <Box p="4">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

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

        <FormControl mt="4" isRequired isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
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

        <Button mt="4" colorScheme="green" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
