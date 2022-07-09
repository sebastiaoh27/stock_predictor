from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score
from keras.layers import Dense, Dropout, LSTM
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from backend.utils import split_dataset


# Working reasonably well for low beta stocks


class RandomForestPredictor:

    def __init__(self, data, test_ratio=0.2, start_date='1990-01-01', n_estimators=100, min_samples_split=100,
                 random_state=1):
        self.model = RandomForestClassifier(n_estimators=n_estimators, min_samples_split=min_samples_split,
                                            random_state=random_state)
        self.data = data[start_date:].copy()
        self.data["Increase"] = (self.data["Close"].shift(-1) > self.data["Close"]).astype(int)
        self.parameters = ["Close", "High", "Low", "Volume", "Open"]

        self.test_ratio = test_ratio
        self.test_size = int(self.test_ratio * len(self.data))
        self.train_set = self.data.iloc[:-self.test_size]
        self.x_train, self.y_train = self.train_set[self.parameters], self.train_set["Increase"]
        self.x_test = self.data.iloc[-self.test_size:][self.parameters]


    def train(self):
        self.model.fit(self.x_train, self.y_train)

    def predict(self, data):
        return self.model.predict(data)

    def accuracy(self):
        predictions = self.predict(self.x_test)
        predictions = pd.Series(predictions, index=self.x_test.index)

        print(precision_score(self.data.iloc[-self.test_size:]["Increase"], predictions))
