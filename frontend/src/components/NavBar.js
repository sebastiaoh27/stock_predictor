import {Badge, Box, Container, Flex, Heading, Link, Stack, Tag, Text} from "@chakra-ui/react";
import NextLink from 'next/link'
import {getStockMarketDay} from "../services/Service";
import {useEffect, useState} from "react";

const pages = ['Home', 'Predictions', 'Currency Converter']
const links = ['/', '/predictions_page', '/currency_exchange_page']

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
        <Box position="fixed" mt="0" as="nav" w="100%" css={{ backdropFilter: 'blur(10px)' }}>
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
                    {pages.map((p, i) => (
                            <Link
                                href={links[i]}
                                p={2}
                                bg={'grassTeal'}
                                color={'#202023'}
                            >
                                {p}
                            </Link>
                    ))}
                </Stack>
                <Flex align="center" mr={5}>
                    <Badge colorScheme={ openMarket? 'green':'red'} borderRadius="full" size="25" variant="solid">
                        {openMarket? 'These Predictions are for Today': 'These Predictions are for Tomorrow'}
                    </Badge>
                </Flex>
            </Container>
        </Box>
    )
}

export default NavBar
