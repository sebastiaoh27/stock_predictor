import json

import numpy as np

DB_PATH = 'prediction_database.json'

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

def update_database(data, date):

    with open(DB_PATH, 'r') as fp:
        db = json.load(fp)

    db[date] = data

    with open(DB_PATH, 'w') as fp:
        json.dump(db, fp)

def read_database(date):

    with open(DB_PATH, 'r') as fp:
        db = json.load(fp)

    if date in db:
        return db[date]
    else:
        return None


