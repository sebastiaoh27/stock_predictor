import json
from datetime import date, datetime, timedelta

import pandas_market_calendars as mcal

import numpy as np
from pandas import Timestamp

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

def stock_market_day():
    curr_date = date.today()
    calendar = mcal.get_calendar('NYSE').schedule(start_date=str(curr_date), end_date=str(curr_date))
    close_time = Timestamp(calendar['market_close'].values[0]).time()
    curr_time = datetime.now()

    # If market is open
    if curr_time.time() < close_time:
        return curr_date
    # If market is closed
    else:
        return curr_date + timedelta(days=1)




