import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os
import numpy as np
import sys
# List of CSV files and their names
csv_files = ['Cumulative_Layout_Shift.csv', 'Largest_Contentful_Paint.csv', 'Time_to_Interactive.csv', 'Total_Blocking_Time.csv', 'Speed_Index.csv']
titles = ['Cumulative Layout Shift', 'Largest Contentful Paint', 'Time to Interactive', 'Total Blocking Time', 'Speed Index']
#input_path = 'results/dataHomepage'
#output_path = 'charts/dataHomepage'

input_path = sys.argv[1]
output_path = sys.argv[2]


# Ensure the output directory exists
os.makedirs(output_path, exist_ok=True)

# Initialize a dictionary to store the data
data = {}

# Load the data from CSV files
for i, file in enumerate(csv_files):
    df = pd.read_csv(os.path.join(input_path, file))
    if titles[i] != 'Total Blocking Time':
        # Convert milliseconds to seconds for all except Total Blocking Time
        df = df / 1000
    data[titles[i]] = df

# Function to create bar plot with error bars and save it
def plot_with_error_bars(data, title):
    means = data.mean()
    stds = data.std()
    mins = means - data.min()
    maxs = data.max() - means

    plt.figure(figsize=(8, 6))
    x = np.arange(len(means))  # generate x values for the bars
    sns.boxplot(data, palette='Spectral')
    # plt.bar(x, means.values, yerr=[mins.values, maxs.values], capsize=5)
    plt.title(title)
    plt.ylabel('Czas (sekundy)' if title != 'Total Blocking Time' else 'Czas (milisekundy)')
    plt.xlabel('')
    plt.xticks(x, means.index, rotation=45)  # set x tick labels
    plt.tight_layout()
    plt.savefig(os.path.join(output_path, f'{title.replace(" ", "_")}.png'))
    plt.close()

# Create and save bar plots for each dataset
for title, df in data.items():
    plot_with_error_bars(df, title)
