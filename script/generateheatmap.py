import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Define file paths
normal_path = './archive/test5-local50/dataHomepage'
throttling_path = './archive/withthrottling/dataHomepage'

# Define file names
files = [
    'Gatsby - SSG',
    'Gatsby - SSR',
    'Next.js - SSG',
    'Next.js - SSR',
    'Remix - SSR'
]

# Define metrics and their short names
metrics = {
    'Speed Index': 'SI',
    'Largest Contentful Paint': 'LCP',
    'First Contentful Paint': 'FCP',
    'Time to Interactive': 'TTI',
    'Total Blocking Time': 'TBT'
}

# Create a dictionary to store correlation results for each app
correlation_results = {}

# Process each file separately
for file in files:
    app_name = file  # Extract app name
    # Load normal data
    normal_data = pd.read_csv(os.path.join(normal_path, f'{file}.csv'))
    normal_data['throttled'] = 0
    normal_data['app'] = app_name

    # Load throttling data
    throttling_data = pd.read_csv(os.path.join(throttling_path, f'{file}.csv'))
    throttling_data['throttled'] = 1
    throttling_data['app'] = app_name

    # Combine both datasets
    combined_data = pd.concat([normal_data, throttling_data], ignore_index=True)

    # Rename columns to use short metric names
    combined_data.rename(columns=metrics, inplace=True)

    # Calculate correlations for numeric columns only
    numeric_columns = list(metrics.values()) + ['throttled']
    correlations = combined_data[numeric_columns].corr(method='spearman')

    # Get correlation of each metric with 'throttled'
    correlation_with_throttling = correlations['throttled'].drop('throttled')

    # Store the results in the dictionary
    correlation_results[app_name] = correlation_with_throttling

# Convert the dictionary to a DataFrame for easier comparison
correlation_df = pd.DataFrame(correlation_results)

# Save the correlation results to a file
correlation_df.to_csv('correlation_with_throttling_per_app.csv')

# Visualization - Correlation heatmap for each app
plt.figure(figsize=(12, 8))
sns.heatmap(correlation_df, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Korelacja ograniczeń sieci z prędkością aplikacji.')
plt.savefig('correlation_heatmap_per_app.png')
plt.show()

# Print the correlation results
pd.options.display.float_format = '{:.3f}'.format
print("Correlation of Metrics with Throttling per App:")
print(correlation_df)
