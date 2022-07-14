import Axios from 'axios'

export function getIndexPredictions() {
    return Axios.get('/predict_index')
}

export function getPrediction(symbol) {
    return Axios.get('/predict_stock/'+symbol)
}

export function getStockMarketDay() {
    return Axios.get('/get_stock_market_day')
}
