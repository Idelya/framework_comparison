import pandas as pd
import os
import sys
# Folder containing the CSV files
#input_folder_path = 'dataHomepage'
#output_folder_path = 'results/dataHomepage'

input_folder_path = sys.argv[1] 
output_folder_path = sys.argv[2]


# Create the output directory if it doesn't exist
os.makedirs(output_folder_path, exist_ok=True)

# List of CSV files to read
files = [
    'Gatsby - SSG.csv',
    'Gatsby - SSR.csv',
    'Next.js - SSG.csv',
    'Next.js - SSR.csv',
    'Remix - SSR.csv'
]

# Initialize dictionaries to hold dataframes for each metric
metrics = [
    'Speed Index',
    'Cumulative Layout Shift',
    'Largest Contentful Paint',
    'First Contentful Paint',
    'Time to Interactive',
    'Total Blocking Time'
]

metric_data = {metric: pd.DataFrame() for metric in metrics}

# Iterate over each file
for file in files:
    # Read the CSV file
    df = pd.read_csv(os.path.join(input_folder_path, file))
    
    # Extract the framework and rendering type from the filename
    framework_render = file.replace('.csv', '')
    
    # Rename columns to include framework and rendering type
    for metric in metrics:
        df_renamed = df[['Iteration', metric]].rename(columns={metric: framework_render})
        
        # Merge the data into the corresponding metric dataframe
        if metric_data[metric].empty:
            metric_data[metric] = df_renamed
        else:
            metric_data[metric] = pd.merge(metric_data[metric], df_renamed, on='Iteration', how='outer')

# Save each metric dataframe to a separate CSV file
for metric, df in metric_data.items():
    # Omit the 'Iteration' column before saving
    df = df.drop(columns=['Iteration'])
    output_file_path = os.path.join(output_folder_path, f'{metric.replace(" ", "_")}.csv')
    df.to_csv(output_file_path, index=False)
