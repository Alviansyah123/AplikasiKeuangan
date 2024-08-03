from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import date
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# Define the input data model
class ForecastRequest(BaseModel):
    start_date: date
    end_date: date

app = FastAPI()

@app.post("/predict/")
async def predict_expenses(request: ForecastRequest):
    try:
        # Load the data into a DataFrame
        data = pd.read_excel("dataset2023.xlsx", sheet_name='Sheet1', usecols=['Tanggal', 'Jumlah Biaya'])

        # Ensure proper datetime conversion and handle out-of-bounds dates
        data['Tanggal'] = pd.to_datetime(data['Tanggal'], errors='coerce')  
        # Convert to datetime, invalid parsing will be set as NaT
        data['Moving_Avg'] = data['Jumlah Biaya'].rolling(window=3).mean()

        # Drop NaN values created by rolling window
        data['Date_Ordinal'] = data['Tanggal'].map(pd.Timestamp.toordinal)

        X = data['Date_Ordinal'].values.reshape(-1, 1)
        y = data['Moving_Avg'].values

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
        data.dropna(subset=['Tanggal'], inplace=True)  # Drop rows with invalid dates

        # Set the 'Date' column as the index
        data.set_index('Tanggal', inplace=True)

        # Normalize the 'Expenses' column
        scaler = StandardScaler()
        data['Jumlah Biaya'] = scaler.fit_transform(data[['Jumlah Biaya']])

        # Set the 'Expenses' column as the time series data
        ts_data = data['Jumlah Biaya']

        # Fit the ARIMA model
        model = ARIMA(ts_data, order=(1, 1, 1))  # You may need to tune the order
        model_fit = model.fit()

        # Determine the number of periods to forecast based on start and end date
        periods = (request.end_date.year - request.start_date.year) * 12 + request.end_date.month - request.start_date.month

        if periods <= 0:
            raise HTTPException(status_code=400, detail="End date must be after start date")

        # Make predictions
        forecast = model_fit.forecast(steps=periods)
        forecast_index = pd.date_range(start=ts_data.index[-1], periods=periods + 1, freq='M')[1:]  # Generate index for forecast

        # Inverse transform the forecast to get actual values
        forecast_series = pd.Series(scaler.inverse_transform(forecast.values.reshape(-1, 1)).flatten(), index=forecast_index)

        # Filter the forecast based on start_date
        forecast_series = forecast_series[forecast_series.index >= pd.to_datetime(request.start_date)]

        # Convert forecast to a list for response
        forecast_list = forecast_series.tolist()
        dates_list = forecast_series.index.strftime('%Y-%m-%d').tolist()
        
        # mae = mean_absolute_error(data['Jumlah Biaya'][-12:], forecast)
        # rmse = np.sqrt(mean_squared_error(data['Jumlah Biaya'][-12:], forecast))

        return {"Forecast": forecast_list, "Tanggal": dates_list}

    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
