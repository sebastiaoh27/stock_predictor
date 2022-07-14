import {getIndexPredictions} from "../services/Service";
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import "../css/PredictionPage.css"
import {CircularProgress, SimpleGrid, Tag, Text, AspectRatio, Badge} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion"
import {Typography} from "@mui/material";


const HomePage = () => {


    const [predictions, setPredictions] = useState(null)
    const [symbols, setSymbols] = useState(null)

    getIndexPredictions().then(res => {
        let keys = []
        let values = []
        for (const k in res.data) {
            values.push(res.data[k])
            keys.push(k)
        }
        setPredictions(values)
        setSymbols(keys)
    })

    if (predictions == null || symbols == null) {
        return null
    }

    const getArrow = (predicton) => {
        if (predicton > 0) {
            return(<ArrowUpIcon boxSize={8} color="white"/>)
        }else {
            return(<ArrowDownIcon boxSize={8} color="white"/>)
        }
    }


    return(
    <div className="home_page" >
        <Box pt="5%" width="100%" height="100%">
            <SimpleGrid columns={4} gap={6} width="50%" marginLeft="25%">
                {predictions.map((pred, i) => (
                        <Box borderRadius="0.5rem" className="stock_box">
                            <Text variant="h2" ml={48 - symbols[i].length*2.15  + "%"} color="white">{symbols[i]}</Text>
                            <Box ml="40%" mt="10%" mb="10%">
                                {getArrow(pred)}
                            </Box>
                            <Badge borderRadius='lg' px='2' colorScheme='teal' float="right">
                                Going {pred > 0 ? 'Up': 'Down'}
                            </Badge>
                        </Box>
                ))}
            </SimpleGrid>
        </Box>
    </div>
    )
}

export default HomePage
