import yfinance as yf


class Stock:

    def __init__(self, symbol, period='max'):
        symbol = symbol.upper()
        self.ticker = yf.Ticker(symbol)
        self.history = self.ticker.history(period=period)


