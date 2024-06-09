import re
import matplotlib.pyplot as plt
columns = [1, 2, 3, 4, 5]
colormap = plt.get_cmap('RdYlBu')
colormap_start, colormap_end = 0.2, 0.83
data = '''
Speed Index & 0.9998 & 0.9997 & 0.8794 & 0.6958 & 0.9998 \\
Largest Contentful Paint & 0.9185 & 0.9999 & 0.9964 & 0.9929 & 0.9999 \\
First Contentful Paint & 0.9998 & 0.9997 & 0.8848 & 0.7254 & 0.9998 \\
Time to Interactive & 0.9699 & 0.9089 & 0.9400 & 0.9320 & 0.9491 \\
Total Blocking Time & -0.0705 & -0.1187 & -0.8502 & 0.0597 & 0.1425 \\
First Contentful Paint &0.9997 & 0.9996 & 0.8847 & 0.7253 & 0.9998\\
'''
minimum = 1
maximum = -1

for column in columns:
    fraction_to_hex = lambda f: '{:02x}{:02x}{:02x}'.format(*[int(255 * c) for c in colormap(f)[:3]]).upper()
    matrix = [[i.strip() for i in re.sub(r'\\ *$', r'', line).split('&')] for line in data.strip().split('\n')]
    coldata = [row[column] for row in matrix]
    coldata = [float(re.search(r'[0-9.\-\+]+', d).group(0)) for d in coldata]
    # coldata = [(d - min(coldata)) / (max(coldata) - min(coldata)) for d in coldata] # normalize to 0-1
    coldata = [(d - minimum) / (maximum - minimum) for d in coldata] # normalize to --1
    coldata = [d * (colormap_end - colormap_start) + colormap_start for d in coldata] # normalize to colormap_start-colormap_end
    coldata = [fraction_to_hex(d) for d in coldata ]

    new_data = ''
    for i, row in enumerate(matrix):
        for j, d in enumerate(row):
            if j == column: new_data += f'\\cellcolor[HTML]{{{coldata[i]}}}'
            if j < len(row) - 1: new_data += f'{d} & '
            else: new_data += f' {d} \\\\ \n'
    data = new_data

for line in new_data.split('\n'):
    line = line[:-2]
    while line.endswith(' \\'): line = line[:-2]
    if line.strip(): print(line + ' \\\\')