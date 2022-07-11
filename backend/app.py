from flask import Flask
from datetime import date

from backend.RandomForestPredictor import RandomForestPredictor
from backend.Stock import Stock
from backend.StockLibrary import StockLibrary
import json

# Server
from backend.utils import update_database, read_database

app = Flask(__name__)

# App
stockLibrary = StockLibrary()


@app.route('/predict_index', methods=['GET'])
def predict_index():
    curr_date = str(date.today())
    result = read_database(curr_date)
    stockList = {}
    if result is None:
        stockLibrary.train()
        result = stockLibrary.createDirectionPredictions()
        update_database(json.dumps(result), curr_date)
    else:
        result = json.loads(result)
        for symbol in stockLibrary.symbolList:
            if symbol not in result:
                result[symbol] = predict_stock(symbol)
            stockList[symbol] = result[symbol]
    return json.dumps(stockList)

@app.route('/predict_stock/<string:stock_symbol>', methods=['GET'])
def predict_stock(stock_symbol):
    curr_date = str(date.today())
    result = json.loads(read_database(curr_date))
    if stock_symbol not in result:
        predictor = RandomForestPredictor(Stock(stock_symbol).history)
        predictor.train()
        prediction = int(predictor.predict(predictor.data.iloc[-1][predictor.parameters].values.reshape(1, -1))[0])
        result[stock_symbol] = prediction
        update_database(json.dumps(result), curr_date)
    return {stock_symbol: result[stock_symbol]}

@app.route('/get_all_predictions', methods=['GET'])
def get_all_stocks():
    curr_date = str(date.today())
    return read_database(curr_date)


if __name__ == "__main__":
    app.secret_key = '528491@JOKER'
    app.debug = True
    app.run()
