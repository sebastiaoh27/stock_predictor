import Axios from 'axios'

export function getIndexPredictions() {
    return Axios.get('/predict_index')
}
