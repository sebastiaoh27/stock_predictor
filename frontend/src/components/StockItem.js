import {Badge, Container, Text} from "@chakra-ui/react";
import Box from "@mui/material/Box";
import React from "react";
import {ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";

const StockItem = ({symbol, prediction}) => {

    const getArrow = (pred) => {
        if (pred > 0) {
            return(<ArrowUpIcon boxSize={8} color="white"/>)
        }else {
            return(<ArrowDownIcon boxSize={8} color="white"/>)
        }
    }

    return(
        <Box borderRadius="0.5rem" className="stock_box">
            <Text variant="h2" color="white" width="100%" align="center">{symbol}</Text>
            <Container maxWidth="30%" mt="10%" mb="10%">
                {getArrow(prediction)}
            </Container>
            <Badge borderRadius='lg' px='2' colorScheme='teal' float="right">
                Going {prediction > 0 ? 'Up': 'Down'}
            </Badge>
        </Box>
    )
}

export default StockItem
