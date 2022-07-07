import numpy as np


def split_dataset(data, start_date='1990-01-01', training_size=100, parameters=["Close"]):

    return data.iloc[:training_size][parameters], data.iloc[:training_size][parameters].shift(-1)

