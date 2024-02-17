import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
    Text,
} from '@chakra-ui/react';

const BookAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        age: ''
    });
    const [error, setError] = useState('');

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
    }, [id]);

    const handleInputChange = (e) => {
        setError('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.name || !formData.age || !formData.date || !formData.time) {
            // If any required field is empty, set an error message
            setError('Please fill in all required fields.');
            return; // Exit the function without submitting the form
        }

        // If all required fields are filled in, proceed with form submission
        sessionStorage.setItem('appointment', JSON.stringify(formData));
        setFormData({
            name: '',
            age: '',
            date: '',
            time: '',
        });
        navigate(`/bookedAppointment/${id}`);
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            backgroundImage="url('https://www.shutterstock.com/image-illustration/3d-render-cartoon-character-doctor-600nw-2273375151.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={{ base: '4', md: '8' }}
        >
            <Box
                width="100%"
                maxWidth="850px"
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="center"
            >
                {/* Doctor Details */}
                <Box
                    backgroundColor="rgba(255, 255, 255, 0.9)"
                    color="black"
                    borderRadius="lg"
                    boxShadow="md"
                    padding="6"
                    marginBottom={{ base: '6', md: '0' }}
                    marginRight={{ base: '0', md: '6' }}
                    display="flex"
                    alignItems={{ base: 'center', md: 'flex-start' }}
                >
                    <Box marginRight="6">
                        <Image src={doctor.image} alt={doctor.name} borderRadius="full" boxSize="150px" />
                    </Box>
                    <VStack spacing="1" alignItems="flex-start">
                        <Heading as="h2" size="lg">{doctor.name}</Heading>
                        <Text fontWeight="bold">Department:</Text>
                        <Text>{doctor.department}</Text>
                        <Text fontWeight="bold">Location:</Text>
                        <Text>{doctor.location}</Text>
                        <Text fontWeight="bold">Experience:</Text>
                        <Text>{doctor.experience}</Text>
                    </VStack>
                </Box>

                {/* Appointment Form */}
                <Box
                    backgroundColor="rgba(121, 152, 255, 0.7)"
                    color="black"
                    flex="1"
                    padding="6"
                    borderRadius="md"
                    boxShadow="lg"
                >
                    <Heading as="h2" size="md" marginBottom="4">Book Appointment</Heading>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing="4" alignItems="stretch" width="100%">
                            <FormControl>
                                <FormLabel htmlFor="name" fontWeight="bold">Patient Name:</FormLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    color="black"
                                    borderColor="black"
                                    _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                                    fontSize="md"
                                    padding="3"
                                    width="100%"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="age" fontWeight="bold">Age:</FormLabel>
                                <Input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    color="black"
                                    borderColor="black"
                                    _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                                    fontSize="md"
                                    padding="3"
                                    width="100%"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date" fontWeight="bold">Date:</FormLabel>
                                <Input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    color="black"
                                    borderColor="black"
                                    _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                                    fontSize="md"
                                    padding="3"
                                    width="100%"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="time" fontWeight="bold">Time:</FormLabel>
                                <Input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    color="black"
                                    borderColor="black"
                                    _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
                                    fontSize="md"
                                    padding="3"
                                    width="100%"
                                />
                            </FormControl>
                            {error && (
                                <Text color="red.500" fontSize="sm">
                                    {error}
                                </Text>
                            )}
                            <Button type="submit" colorScheme="blue" width="100%">
                                Submit
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default BookAppointment;
