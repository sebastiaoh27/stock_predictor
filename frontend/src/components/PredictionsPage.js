import {getIndexPredictions} from "../services/Service";
import {Card, CardContent, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import "./../css/PredictionPage.css"
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";


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
        return(
            <CircularProgress/>
        )
    }

    const getArrow = (predicton) => {
        if (predicton > 0) {
            return(<ArrowUpward/>)
        }else {
            return(<ArrowDownward/>)
        }
    }


    return(
    <div className="prediction_page" >
        {predictions.map((pred, i) => (
            <Box sx={{
                width: "9vw",
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
            }}>
                <Card raised={true}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {symbols[i]}
                        </Typography>
                        {getArrow(pred)}

                    </CardContent>
                </Card>
            </Box>
        ))}
    </div>
    )
}

export default PredictionsPage
