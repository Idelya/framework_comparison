import re
import matplotlib.pyplot as plt

# Define columns and colormap parameters
columns = [1, 2, 3, 4, 5]
colormap = plt.get_cmap('coolwarm')
colormap_start, colormap_end = 1, 0
data = '''
Speed Index                & 0.866 & 0.866 & 0.832 & 0.836 & 0.866 \\
Largest Contentful Paint   & 0.866 & 0.866 & 0.866 & 0.866 & 0.866 \\
First Contentful Paint     & 0.866 & 0.866 & 0.832 & 0.836 & 0.866 \\
Time to Interactive        & 0.866 & 0.797 & 0.866 & 0.866 & 0.866 \\
Total Blocking Time        & -0.092 & -0.164 & -0.847 & 0.072 & 0.143 \\
First Contentful Paint     & 0.866 & 0.866 & 0.832 & 0.836 & 0.866 \\
'''
minimum = 1
maximum = -1

def fraction_to_hex(f):
    return '{:02x}{:02x}{:02x}'.format(*[int(255 * c) for c in colormap(f)[:3]]).upper()

def luminance(hex_color):
    r, g, b = int(hex_color[:2], 16), int(hex_color[2:4], 16), int(hex_color[4:], 16)
    return 0.299 * r + 0.587 * g + 0.114 * b

# Process data
matrix = [[i.strip() for i in re.sub(r'\\ *$', r'', line).split('&')] for line in data.strip().split('\n')]

for column in columns:
    coldata = [row[column] for row in matrix]
    coldata = [float(re.search(r'[0-9.\-\+]+', d).group(0)) for d in coldata]
    coldata = [(d - minimum) / (maximum - minimum) for d in coldata]  # normalize to 0-1
    coldata = [d * (colormap_end - colormap_start) + colormap_start for d in coldata]  # normalize to colormap_start-colormap_end
    coldata = [fraction_to_hex(d) for d in coldata]

    for i, row in enumerate(matrix):
        cell_color = coldata[i]
        cell_luminance = luminance(cell_color)
        text_color = 'FFFFFF' if cell_luminance < 128 else '000000'
        matrix[i][column] = f'\\cellcolor[HTML]{{{cell_color}}}\\color[HTML]{{{text_color}}} {matrix[i][column]}'

# Generate new data
new_data = '\n'.join([' & '.join(row) + ' \\\\' for row in matrix])

# Output the result
for line in new_data.split('\n'):
    line = line[:-2]
    while line.endswith(' \\'): line = line[:-2]
    if line.strip():
        print(line + ' \\\\')
