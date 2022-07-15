import {Button, CircularProgress, Container, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {useState} from "react";
import {getPrediction} from "../services/Service";
import StockItem from "../components/StockItem";
import "../css/App.css"

const PredictionsPage = () => {

    const [searchSymbol, setSearchSymbol] = useState('')
    const [symbol, setSymbol] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [prediction, setPrediction] = useState(null)
    const [searched, setSearched] = useState(false)
    const handleChange = (event) => setSearchSymbol(event.target.value)

    function searchStock() {
        setSearched(true)
        setInvalid(false)
        getPrediction(searchSymbol).then(res => {
            const pred = res.data[searchSymbol]
            console.log(pred)
            if (pred < 0){
                setInvalid(true)
            } else {
                setPrediction(pred)
                setSymbol(searchSymbol.toUpperCase())
            }
        })
    }

    return(
        <div className="predictions_page">
            <Container pt="5%">
                <InputGroup>
                    <Input type="text" placeholder="Enter stock symbol" bg="white" value={searchSymbol} onChange={handleChange}/>
                    <InputRightElement children={<Button colorScheme="teal" onClick={searchStock} ><Search2Icon/></Button>}/>
                </InputGroup>
            </Container>
            <Container pt="10%" width="100%" maxW="17%" maxH="80%" height="100%">
                {invalid? <Text variant="h3" width="100%" align="center">The stock symbol is invalid</Text>: null}
                {!searched || invalid? null: prediction === null? <CircularProgress isIndeterminate pl="43%"/> :<StockItem symbol={symbol} prediction={prediction}/>}
            </Container>
        </div>
    )
}

export default PredictionsPage
