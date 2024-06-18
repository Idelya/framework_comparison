import pandas as pd
import scipy.stats as stats

DIR = 'archive/test5-local50/dataHomepage'
METRICS = ['Speed Index','Cumulative Layout Shift','Largest Contentful Paint','First Contentful Paint','Time to Interactive','Total Blocking Time']
# TYPES = ['Gatsby - SSR', 'Gatsby - SSG']
TYPES = ['Gatsby - SSR', 'Gatsby - SSG', 'Next.js - SSR', 'Next.js - SSG', 'Remix - SSR']

for METRIC in METRICS:
    values = {}
    for t in TYPES:
        values[t] = pd.read_csv(f'{DIR}/{t}.csv')[METRIC]


    data_s = []
    data_p = []
    for t1 in TYPES:
        row_s = [t1]
        row_p = [t1]
        for t2 in TYPES:
            t_stat, p_value = stats.mannwhitneyu(values[t1], values[t2])
            row_s.append(t_stat)
            row_p.append(p_value)
        data_s.append(row_s)
        data_p.append(row_p)

    data_s = pd.DataFrame(data_s, columns=['id'] + TYPES).set_index('id')
    data_p = pd.DataFrame(data_p, columns=['id'] + TYPES).set_index('id')

    pd.options.display.float_format = '{:.5f}'.format
    # print('Magnitude of difference between means')
    # print(data_s.to_latex())
    print()
    print('Statictical significance', METRIC)
    print(data_p.to_latex())