import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, VStack, Divider, Image, Flex, Center } from '@chakra-ui/react';

const BookedAppointment = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/doctor/${id}`);
                setDoctor(response.data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };

        fetchDoctor();

        // Fetch appointment details from sessionStorage
        const appointmentData = JSON.parse(sessionStorage.getItem('appointment'));
        if (appointmentData) {
            setAppointment(appointmentData);
        }
    }, [id]);

    return (
        <Box bg="#F7FAFC" minHeight="100vh" py={{ base: '4', md: '8' }}>
            <Center>
                <Box
                    width="100%"
                    maxWidth="800px"
                    bg="white"
                    borderRadius="lg"
                    boxShadow="lg"
                    px={{ base: '6', md: '12' }}
                    py={{ base: '8', md: '12' }}
                    textAlign="center"
                >
                    <Heading as="h2" size="xl" mb="6" color="#4A5568">Your Appointment Details</Heading>
                    <Divider my="4" borderColor="#E2E8F0" />
                    <Flex flexWrap="wrap" justifyContent="space-between">
                        {/* Doctor details */}
                        {doctor && (
                            <Box width={{ base: '100%', md: '48%' }} mb={{ base: '6', md: '0' }}>
                                <Image src={doctor.image} alt={doctor.name} borderRadius="full" boxSize="150px" mx="auto" mb="6" />
                                <VStack spacing="4" alignItems="center">
                                    <Heading as="h3" size="lg" mb="2" color="#2D3748">{doctor.name}</Heading>
                                    <Text fontSize="md" color="#718096">Department: {doctor.department}</Text>
                                    <Text fontSize="md" color="#718096">Location: {doctor.location}</Text>
                                    <Text fontSize="md" color="#718096">Experience: {doctor.experience}</Text>
                                </VStack>
                            </Box>
                        )}
                        {/* Patient details */}
                        {appointment && (
                            <Box width={{ base: '100%', md: '48%' }}>
                                <VStack spacing="4" alignItems="center">
                                    <Heading as="h3" size="lg" mb="2" color="#2D3748">Patient Details</Heading>
                                    <Text fontSize="md" color="#718096">Date: {appointment.date}</Text>
                                    <Text fontSize="md" color="#718096">Time: {appointment.time}</Text>
                                    <Text fontSize="md" color="#718096">Name: {appointment.name}</Text>
                                    <Text fontSize="md" color="#718096">Age: {appointment.age}</Text>
                                </VStack>
                            </Box>
                        )}
                    </Flex>
                </Box>
            </Center>
        </Box>
    );
};

export default BookedAppointment;
