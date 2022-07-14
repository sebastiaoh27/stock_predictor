import {getIndexPredictions} from "../services/Service";
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import "./../css/PredictionPage.css"
import {CircularProgress, SimpleGrid, Tag, Text} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'


const PredictionsPage = () => {


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
            return(<ArrowUpIcon/>)
        }else {
            return(<ArrowDownIcon/>)
        }
    }


    return(
    <div className="prediction_page" >
        <Box marginTop="10vh" width="100%">
            <SimpleGrid columns={4} gap={6} width="75%" marginLeft="10%">
                {predictions.map((pred, i) => (
                    <Box borderWidth='1px' borderRadius='lg' w="80%"
                         textAlign="center" bgcolor="Teal">
                        <Text mt={2} fontSize={20}>
                            {symbols[i]}
                        </Text>
                        {getArrow(pred)}
                        <Tag variant="solid" colorScheme="Teal">
                            Going {pred > 0 ? 'Up': 'Down'}
                        </Tag>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    </div>
    )
}

export default PredictionsPage
