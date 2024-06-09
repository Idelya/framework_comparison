import os
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Define file paths
normal_path = './archive/test5-local50/dataHomepage'
throttling_path = './archive/withthrottling/dataHomepage'

# Define file names
files = [
    'Gatsby - SSG.csv',
    'Gatsby - SSR.csv',
    'Next.js - SSG.csv',
    'Next.js - SSR.csv',
    'Remix - SSR.csv'
]

# Define metrics
metrics = [
    'Speed Index',
    'Largest Contentful Paint',
    'First Contentful Paint',
    'Time to Interactive',
    'Total Blocking Time',
    'First Contentful Paint'
]

# Create a dictionary to store correlation results for each app
correlation_results = {}

# Process each file separately
for file in files:
    app_name = file  # Extract app name
    # Load normal data
    normal_data = pd.read_csv(os.path.join(normal_path, file))
    normal_data['throttled'] = 0
    normal_data['app'] = app_name

    # Load throttling data
    throttling_data = pd.read_csv(os.path.join(throttling_path, file))
    throttling_data['throttled'] = 1
    throttling_data['app'] = app_name

    # Combine both datasets
    combined_data = pd.concat([normal_data, throttling_data], ignore_index=True)

    # Calculate correlations for numeric columns only
    numeric_columns = metrics + ['throttled']
    correlations = combined_data[numeric_columns].corr()

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
plt.title('Correlation of Metrics with Throttling per App')
plt.savefig('correlation_heatmap_per_app.png')
plt.show()

# Print the correlation results
print("Correlation of Metrics with Throttling per App:")
print(correlation_df)
