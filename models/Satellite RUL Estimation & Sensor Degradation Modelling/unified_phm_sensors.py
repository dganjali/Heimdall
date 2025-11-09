"""
Telemetry Data Unit Schema

Canonical column:	Proxy feature:	Units:

time_norm:	normalized time 0-1	:—
imu_accel	vibration RMS / accel amplitude	g
imu_gyro	vibration kurtosis / freq drift	°/s
strain_axial	torque or stress signal	MPa
temp_core	temperature sensor	°C
press_main	pressure sensor	psi
RUL	derived remaining life	cycles


"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def normalize_time(df, time_col):
    df = df.copy()
    df['time_norm'] = (df[time_col] - df[time_col].min()) / (df[time_col].max() - df[time_col].min())
    return df

def resample_uniform(df, n_steps=300):
    df = df.sort_values('time_norm')
    new_time = np.linspace(0, 1, n_steps)
    return pd.DataFrame({
        'time_norm': new_time,
        **{col: np.interp(new_time, df['time_norm'], df[col]) for col in df.columns if col != 'time_norm'}
    })

def load_and_map():
    # Load individual datasets (replace paths)
    cmapss = pd.read_csv('datasets/CMAPSS_temp.csv')        # has T2, T24 etc.
    pcoe   = pd.read_csv('datasets/PCOE_battery.csv')       # has Voltage_measured, Current_measured
    hydro  = pd.read_csv('datasets/Hydraulic_pressure.csv') # has PS1, PS2
    ims    = pd.read_csv('datasets/IMS_vibration.csv')      # has RMS
    te     = pd.read_csv('datasets/Tennessee_process.csv')  # has flow or stress proxies

    # Normalize time
    cmapss = normalize_time(cmapss, 'cycle')
    pcoe   = normalize_time(pcoe, 'time')
    hydro  = normalize_time(hydro, 'time')
    ims    = normalize_time(ims, 'time')
    te     = normalize_time(te, 'time')

    # Resample uniformly
    cmapss_r = resample_uniform(cmapss)
    pcoe_r   = resample_uniform(pcoe)
    hydro_r  = resample_uniform(hydro)
    ims_r    = resample_uniform(ims)
    te_r     = resample_uniform(te)

    # Merge on time_norm
    merged = cmapss_r[['time_norm', 'T2']].rename(columns={'T2': 'temp_core'})
    merged = merged.merge(pcoe_r[['time_norm', 'Voltage_measured', 'Current_measured']],
                          on='time_norm', how='outer')
    merged = merged.merge(hydro_r[['time_norm', 'PS1']], on='time_norm', how='outer')
    merged = merged.merge(ims_r[['time_norm', 'RMS']], on='time_norm', how='outer')
    merged = merged.merge(te_r[['time_norm', 'A_feed']], on='time_norm', how='outer')

    # Rename and clean
    merged.rename(columns={
        'Voltage_measured': 'volt_bus',
        'Current_measured': 'curr_draw',
        'PS1': 'press_main',
        'RMS': 'vib_rms',
        'A_feed': 'strain_axial'
    }, inplace=True)

    # interpolate any NaNs
    merged.interpolate(inplace=True)

    # Compute synthetic RUL
    max_rul = 125
    merged['RUL'] = (1 - merged['time_norm']) * max_rul

    # Scale all features 0–1 for ML
    scaler = MinMaxScaler()
    features = ['temp_core', 'volt_bus', 'curr_draw', 'press_main', 'vib_rms', 'strain_axial']
    merged[features] = scaler.fit_transform(merged[features])

    return merged

if __name__ == "__main__":
    df = load_and_map()
    df.to_csv('synthetic_satellite_health.csv', index=False)
    print(df.head())
