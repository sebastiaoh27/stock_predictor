import {Box, Container, Flex, Heading, Link, Stack, Text} from "@chakra-ui/react";
import NextLink from 'next/link'
import {getStockMarketDay} from "../services/Service";
import {useEffect, useState} from "react";


const NavBar = () => {

    const [openMarket, setOpenMarket] = useState(null)

    function isPredictionForToday() {
        getStockMarketDay().then(res => {
            const marketDay = new Date(res.data)
            const currDay = new Date()
            setOpenMarket(currDay.getDay() === marketDay.getDay())
        })
    }

    useEffect(() => {
        isPredictionForToday()
        const interval = setInterval(() => {
            isPredictionForToday()
        }, 60000);

        return () => clearInterval(interval);
    }, [])

    return(
        <Box position="fixed" as="nav" w="100%" css={{ backdropFilter: 'blur(10px)' }}>
            <Container display="flex" p={2}
                       maxW="100%"
                       wrap="wrap">
                <Flex align="center" mr={50}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Stock Predictor
                    </Heading>
                </Flex>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    display={{ base: 'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                    <NextLink href="/" scroll={false}>
                        <Link
                            p={2}
                            bg={'grassTeal'}
                            color={'#202023'}
                        >
                            Home
                        </Link>
                    </NextLink>
                </Stack>
                <Flex align="center" mr={5}>
                    <Text>
                        {openMarket? 'These Predictions are for Today': 'These Predictions are for Tomorrow'}
                    </Text>
                </Flex>
            </Container>
        </Box>
    )
}

export default NavBar
