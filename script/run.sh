#!/bin/bash

node lighthouse-script.js 9000 "" 50 "dataHomepage/Gatsby - SSG.csv"
node lighthouse-script.js 9001 "" 50 "dataHomepage/Gatsby - SSR.csv"
node lighthouse-script.js 9006 "" 50 "dataHomepage/Next.js - SSG.csv"
node lighthouse-script.js 9007 "" 50 "dataHomepage/Next.js - SSR.csv"
node lighthouse-script.js 46525 "" 50 "dataHomepage/Remix - SSR.csv"
source .venv/bin/activate
python3 convertData.py "dataHomepage" "results/dataHomepage"
python3 chartsSeaBorn.py "results/dataHomepage" "charts/dataHomepage"

node lighthouse-script.js 9000 gallery 50 "dataGallery/Gatsby - SSG.csv"
node lighthouse-script.js 9001 gallery 50 "dataGallery/Gatsby - SSR.csv"
node lighthouse-script.js 9006 gallery 50 "dataGallery/Next.js - SSG.csv"
node lighthouse-script.js 9007 gallery 50 "dataGallery/Next.js - SSR.csv"
node lighthouse-script.js 46525 gallery 50 "dataGallery/Remix - SSR.csv"

python3 convertData.py "dataGallery" "results/dataGallery"
python3 chartsSeaBorn.py "results/dataGallery" "charts/dataGallery"


node lighthouse-script.js 9000 books 50 "dataBooks/Gatsby - SSG.csv"
node lighthouse-script.js 9001 books 50 "dataBooks/Gatsby - SSR.csv"
node lighthouse-script.js 9006 books 50 "dataBooks/Next.js - SSG.csv"
node lighthouse-script.js 9007 books 50 "dataBooks/Next.js - SSR.csv"
node lighthouse-script.js 46525 books 50 "dataBooks/Remix - SSR.csv"
python3 convertData.py "dataBooks" "results/dataBooks"
python3 chartsSeaBorn.py "results/dataBooks" "charts/dataBooks"