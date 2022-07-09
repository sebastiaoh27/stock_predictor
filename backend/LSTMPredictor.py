from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score
from keras.layers import Dense, Dropout, LSTM
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from tensorflow.python.keras.models import Sequential

from backend.utils import split_dataset

# Working reasonably well for low beta stocks


class LSTMPredictor:

    def __init__(self, data, test_ratio=0.2, start_date='1990-01-01', units=96, dropout=0.2, loss='mean_squared_error', optimizer='adam'):
        self.model = Sequential()
        self.times = data.loc[start_date:]['Close'].index
        self.data = data.loc[start_date:]['Close'].values.reshape(-1, 1)
        self.scaler = StandardScaler()

        self.test_ratio = test_ratio
        self.test_size = int(self.test_ratio * len(self.data))
        self.train_size = int((1 - self.test_ratio) * len(self.data))
        self.train_set = self.scaler.fit_transform(self.data[:self.train_size])
        self.test_set = self.scaler.transform(self.data[-self.test_size:])
        self.x_train, self.y_train = split_dataset(self.train_set)
        self.x_test, self.y_test = split_dataset(self.test_set)
        self.x_train = np.reshape(self.x_train, (self.x_train.shape[0], self.x_train.shape[1], 1))
        self.x_test = np.reshape(self.x_test, (self.x_test.shape[0], self.x_test.shape[1], 1))
        self.build(units=units, dropout=dropout, loss=loss, optimizer=optimizer)

    def build(self, units=96, dropout=0.2, loss='mean_squared_error', optimizer='adam'):
        self.add_layers([LSTM(units=units, return_sequences=True, input_shape=(self.x_train.shape[1], 1)),
                         Dropout(dropout),
                         LSTM(units=units, return_sequences=True),
                         Dropout(dropout),
                         LSTM(units=units, return_sequences=True),
                         Dropout(dropout),
                         LSTM(units=units),
                         Dropout(dropout),
                         Dense(units=1)])

        self.model.compile(loss=loss, optimizer=optimizer)



    def train(self, epochs=50, batch_size=32):

        self.model.fit(self.x_train, self.y_train, epochs=epochs, batch_size=batch_size)

    def predict(self, data):
        return self.scaler.inverse_transform(self.model.predict(data))

    def accuracy(self):

        predictions = self.predict(self.x_test)
        self.y_test = self.scaler.inverse_transform(self.y_test.reshape(-1, 1))
        print(predictions.shape)
        times = self.times[-self.test_size:]
        print(times.shape)
        times = times[50:]
        print(times.shape)
        plt.plot(times, predictions, label='Predicted Close Price')
        plt.plot(times, self.y_test, label='True Close Price')
        plt.legend()
        plt.show()

    def add_layers(self, layers):
        for layer in layers:
            self.model.add(layer)
