import {getIndexPredictions} from "../services/Service";
import React, {useState} from 'react';
import "../css/App.css"
import {CircularProgress, SimpleGrid, Container} from "@chakra-ui/react";
import StockItem from "../components/StockItem";


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
        return(
            <CircularProgress isIndeterminate pt="16%" pl="48%"/>
        )
    }


    return(
    <div className="home_page" >
        <Container pt="5%" width="100%" height="100%"  maxW="100ch" >
            <SimpleGrid columns={4} gap={6} width="100%">
                {predictions.map((pred, i) => (
                        <StockItem prediction={pred} symbol={symbols[i]}/>
                ))}
            </SimpleGrid>
        </Container>
    </div>
    )
}

export default HomePage
