import numpy as np

# Uses window-day moving average to train the model

def split_dataset(data, window=50):
    x = []
    y = []
    for i in range(window, data.shape[0]):
        x.append(data[i-50:i, 0])
        y.append(data[i, 0])
    x = np.array(x)
    y = np.array(y)
    return x, y
