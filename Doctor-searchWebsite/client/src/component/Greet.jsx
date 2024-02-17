import React, { useState, useEffect } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Greet = () => {
  const [userData, setUserData] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the user ID from the token stored in cookies
        const userId = cookies.get('token');

        // Make an API request to fetch user data using the user ID
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Remove the token from cookies
    cookies.remove('token', { path: '/' });

    // Reload the page or perform any other necessary actions
    window.location.reload();
  };

  return (
    <div>
      {userData ? (
       
        <Flex justify="space-between" align="center" p="5% 25%" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Hi, {userData.name}!
          </Text>
          <Button  size="sm" colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Greet;
