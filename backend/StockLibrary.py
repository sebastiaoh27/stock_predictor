import pandas as pd
import numpy as np

from backend.LSTMPredictor import LSTMPredictor
from backend.RandomForestPredictor import RandomForestPredictor
from backend.Stock import Stock


class StockLibrary:

    def __init__(self, direction=True):
        # Should only be used when actual server is running
        self.stockList = pd.read_csv('./backend/nasdaq_screener_1657370654277.csv')

        # Used for smaller scale deployments
        self.symbolList = ['^GSPC', 'MSFT', 'MA', 'MCD', 'EL', 'SPGI', 'ADSK', 'ASML', 'HUBS', 'TTD', 'OKTA']
        self.library = {}
        self.predictedPrices = {}
        self.predictedDirections = {}

        for symbol in self.symbolList:
            print('################# Training ', symbol, ' #################')
            if direction:
                self.library[symbol] = RandomForestPredictor(Stock(symbol).history)
            else:
                self.library[symbol] = LSTMPredictor(Stock(symbol).history, test_ratio=0)
            self.library[symbol].train()


    def createPredictions(self):
        for symbol in self.symbolList:
            print('################# Predicting ', symbol, ' #################')
            data = np.array([self.library[symbol].data[-50:, 0]])
            price = self.library[symbol].predict(data.reshape((data.shape[0], data.shape[1], 1)))
            self.predictedPrices[symbol] = price
            print('Today: ', Stock(symbol).history.iloc[-1]['Close'], ' Tomorrow: ', price[0][0])
        return self.predictedPrices

    def createDirectionPredictions(self):
        for symbol in self.symbolList:
            print('################# Predicting Direction ', symbol, ' #################')
            price = self.library[symbol].predict(self.library[symbol].data.iloc[-1][self.library[symbol].parameters].values.reshape(1, -1))
            self.predictedPrices[symbol] = price
            print('Today: ', self.library[symbol].data.iloc[-1]['Increase'], ' Tomorrow: ', price[0])
        return self.predictedPrices
