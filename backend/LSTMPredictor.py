from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from backend.utils import split_dataset

# Working reasonably well for low beta stocks


class LSTMPredictor:

    def __init__(self, data, test_ratio=0.2, start_date='1990-01-01'):
        self.scaler = StandardScaler()
        self.scalerClose = StandardScaler()
        self.model = Sequential()
        self.data = data[start_date:].copy()
        self.data["Increase"] = (self.data["Close"].shift(-1) > self.data["Close"]).astype(int)
        self.scaled_data = self.data.copy()
        self.parameters = ["Close"]
        self.scaled_data[self.parameters] = self.scalerClose.fit_transform(self.data[self.parameters])

        self.test_ratio = test_ratio
        self.training_ratio = 1 - self.test_ratio

        self.train_size = int(self.training_ratio * len(self.data))
        self.test_size = int(self.test_ratio * len(self.data))
        self.x_train, self.y_train = split_dataset(self.scaled_data, start_date=start_date,
                                                   training_size=self.train_size, parameters=self.parameters)
        self.x_test = self.scaled_data.iloc[self.train_size:][self.parameters]
        self.build()

    def build(self, layer_units=50):
        self.add_layers([LSTM(units=layer_units, return_sequences=True, input_shape=(self.x_train.shape[1], 1)),
                         LSTM(units=layer_units),
                         Dense(1, activation='linear')])
        self.model.compile(loss='mean_squared_error', optimizer='adam')

    def train(self, epochs=15, batch_size=20, verbose=1, validation_split=0.1, shuffle=True):

        self.model.fit(self.x_train.to_numpy().reshape((self.x_train.shape[0], self.x_train.shape[1], 1)),
                       self.y_train.to_numpy().reshape((self.y_train.shape[0], self.y_train.shape[1], 1)), epochs=epochs, batch_size=batch_size, verbose=verbose,
                       validation_split=validation_split, shuffle=shuffle)

    def predict(self, data):
        prediction = self.model.predict(data)
        return self.scalerClose.inverse_transform(prediction)

    def accuracy(self):
        predictions = self.predict(self.x_test.to_numpy().reshape((self.x_test.shape[0], self.x_test.shape[1], 1)))
        predictions = predictions.reshape((1, predictions.shape[0]))
        predictions = pd.Series(predictions.flatten(), index=self.x_test.index, name="Predictions")

        plt.plot(self.x_train.index, self.scalerClose.inverse_transform(self.x_train['Close'].to_numpy().reshape(-1, 1)), label='Train Closing Price')
        plt.plot(self.x_test.index, self.scalerClose.inverse_transform(self.x_test['Close'].to_numpy().reshape(-1, 1)), label='Test Closing Price')
        plt.plot(predictions.index, predictions, label='Predicted Closing Price')
        plt.title('LSTM Model')
        plt.xlabel('Date')
        plt.ylabel('Stock Price ($)')
        plt.legend(loc="upper left")
        plt.show()

    def predict_direction(self, data):
        predictions = self.predict(data.to_numpy().reshape((data.shape[0], data.shape[1], 1)))
        predictions = predictions.reshape((1, predictions.shape[0]))
        predictions = pd.Series(predictions.flatten(), index=data.index, name="Predictions")
        predictions["Movement"] = (predictions.shift(-1) - predictions)
        predictions["Increase"] = (predictions["Movement"] > 0).astype(int)
        return predictions

    def accuracy_direction(self):
        predictions = self.predict_direction(self.x_test)
        accuracy = self.scaled_data.iloc[-self.test_size:]["Increase"] - predictions["Increase"]
        return len(np.where(accuracy == 0))/len(accuracy)

    def add_layers(self, layers):
        for layer in layers:
            self.model.add(layer)
