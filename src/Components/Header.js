import React, { useContext, useEffect } from 'react';
import { Flex, IconButton, Icon, Box, Heading, Button, useColorMode, Link, Spacer, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const SwitchIcon = colorMode === 'light' ? FaMoon : FaSun;
    const navigate = useNavigate();


    const colorToggle = () => {
        toggleColorMode();
    }


    return (
        // need a media query to change links to menu icon
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="gray.500" color="white" height="75px">
            <Flex align="center" mr={5} onClick={() => navigate('/')} _hover={{ cursor: 'pointer' }}>
                <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                    TTWM
                </Heading>
                <Spacer width="1px" />
                {/* <Image src='../olinguito.svg' alt="Olinguito" boxSize="50px" /> */}
            </Flex>

            <Box display={{ base: "block", md: "block" }} mt={{ base: 4, md: 0 }}>
                <Link as={RouterLink} to="/" p="2" fontSize="xl" borderRadius="md" mr="5px"
                    _hover={{ textDecor: 'none', boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)' }}>
                    Home
                </Link>
                <Link as={RouterLink} to="/about" p="2" fontSize="xl" borderRadius="md" ml="5px" mr="5px"
                    _hover={{ textDecor: 'none', boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)' }}>
                    About
                </Link>
                <IconButton
                    aria-label="Toggle theme"
                    icon={<Icon as={SwitchIcon} />}
                    onClick={colorToggle}
                    size="md"
                    colorScheme=""
                    variant="ghost"
                />
            </Box>
        </Flex>
    );
}
