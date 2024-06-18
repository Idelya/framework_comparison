import pandas as pd
import scipy.stats as stats

print(stats.mannwhitneyu([ 3, 5, 1, 4, 3, 5], [4, 8, 6, 2, 1, 9]))


DIR = 'archive/test5-local50/dataHomepage'
TYPES = ['Gatsby - SSG', 'Gatsby - SSR', 'Next.js - SSG', 'Next.js - SSR', 'Remix - SSR']

for METRIC in [
'Speed Index',
'Cumulative Layout Shift',
'Largest Contentful Paint',
'First Contentful Paint',
'Time to Interactive',
'Total Blocking Time'
]:
    # print(METRIC)
    values = {}
    for t in TYPES:
        values[t] = pd.read_csv(f'{DIR}/{t}.csv')[METRIC]

    data_s = []
    data_p = []
    # for i, t1 in enumerate(TYPES):
    for i, t1 in enumerate(TYPES[:-1]):
        row_s = [t1.replace(' - ', ' ')]
        row_p = [t1.replace(' - ', ' ')]
        # for j, t2 in enumerate(TYPES):
        for j, t2 in enumerate(TYPES[1:]):
            if i <= j:
            # if True:
                t_stat, p_value = stats.mannwhitneyu(values[t1], values[t2])
                row_s.append(t_stat)
                # print(t_stat, p_value)
                row_p.append(p_value)
            else:
                row_s.append('')
                row_p.append('')
        data_s.append(row_s)
        data_p.append(row_p)

    # cols = [t.replace(' - ', ' ') for t in TYPES]
    cols = [t.replace(' - ', ' ') for t in TYPES[1:]]
    data_s = pd.DataFrame(data_s, columns=['id'] + cols).set_index('id')
    data_p = pd.DataFrame(data_p, columns=['id'] + cols).set_index('id')

    pd.options.display.float_format = '{:.3f}'.format
    # print('Magnitude of difference between means')
    # print(data_s)
    # print()
    
    # print('Statictical significance')
    def fmt(x):
        if isinstance(x, str): return x
        if x > 0.05: return f'{x:.3f}'
        return f'\\textbf{{{x:.3f}}}'
    
    text = data_p.to_latex(na_rep='', formatters={k: fmt for k in cols}, escape=False)
    lines = text.split('\n')
    header = ' & '.join([f'{{{h}}}' if len(h) > 0 else h for h in lines[2][:-3].split(' & ')]) + ' \\\\'
    lines = lines[1:2] + [header] + lines[4:]
    text = '\n'.join(lines)
    mshort = ''.join(m[0] for m in METRIC.split(' '))
    text = f'''
\\begin{{table}}[H]
\\centering
\\caption{{Wyniki testu istotności dla badań metryki {mshort} dla strony bazowej}}
\\label{{tab:statictical_significance_{METRIC.lower().replace(" ", "_")}}}
\\begin{{tabular}}{{lcccc}}
''' + text + '\\end{table}'
    print(text)