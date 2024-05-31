import fs from "fs";
import { REPOS_CONFIG } from "./config.js";
import { generateChart, generateMultiColumnChart } from "./charts.js"

const MAX_DATE = {
    year: 2024,
    month: 5,
    day: 24,
}


const MIN_DATE = {
    year: 2023,
    month: 1,
    day: 1,
}

const filterIssuesAfterMaxDate = (issues) => issues.filter((issue) => {
    const createdAt = new Date(issue.created_at);

    return createdAt < new Date(MAX_DATE.year, MAX_DATE.month-1, MAX_DATE.day)
});

const filterIssuesBeforeMinDate = (issues) => issues.filter((issue) => {
    const closedAt = new Date(issue.closed_at);

    return (closedAt.getFullYear()>=MIN_DATE.year);
});

const filterPullRequests = (issues) => issues.filter((issue) => !issue?.pull_request);
const filterByLabels = (issues, filteredLabels) => issues.filter((issue) => !issue?.labels.some(label => filteredLabels.includes(label.name)));

const processFile = (frameworkName, repo, data, filterLabel, closedByBotLabel) => {
    let openIssues = 0;
    const issuesWithoutPR = filterPullRequests(data);
    const issuesWithoutSomeLabels = filterIssuesAfterMaxDate(filterByLabels(issuesWithoutPR, filterLabel));
    const closedIssues = issuesWithoutSomeLabels.filter((issue) => {
        if(issue.state === "open") {
            openIssues+=1;
            return false;
        }
        if(issue.state !== "closed") {
            console.log(issue)
        }
        return true;
    })

    const issuesNotAutoClosed = closedIssues.filter((issue) => !issue?.labels.some(label => label.name === closedByBotLabel));
    
    //const issuesAutoClosedCount = closedIssues.length - issuesNotAutoClosed.length;
    const issuesClosedAfterMinDate = filterIssuesBeforeMinDate(issuesNotAutoClosed);
    const issuesWithComments = issuesClosedAfterMinDate.filter(issue => issue.comments > 0);
    let issuesFromOpenToClose = 0;
    const issuesCompleted = issuesWithComments.filter(issue => issue.state_reason === 'completed');
    //console.log(issuesCompleted[0], issuesCompleted[0].closed_at, issuesCompleted[0].created_at, new Date(issuesCompleted[0].closed_at), new Date(issuesCompleted[0].closed_at) - new Date(issuesCompleted[1].created_at));
    issuesCompleted.forEach(issue => {
        issuesFromOpenToClose += new Date(issue.closed_at) - new Date(issue.created_at);
    })
    return { 
        frameworkName,
        repo,
        allIssues: data.length, 
        issuesWithoutPR: issuesWithoutPR.length, 
        issuesWithoutSomeLabels: issuesWithoutSomeLabels.length,
        openIssues,
        closedIssues: closedIssues.length,
        issuesNotAutoClosed: issuesNotAutoClosed.length,
        issuesClosedAfterMinDate: issuesClosedAfterMinDate.length,
        issuesWithComments: issuesWithComments.length,
        issuesCompleted: issuesCompleted.length,
        avg: Math.round((issuesFromOpenToClose/issuesCompleted.length)/ (1000 * 60 * 60 *24)),
     }
}

const run = () => {
    const stats = [];

    Promise.all(REPOS_CONFIG.map(async ({name, repos}) => {
        await Promise.all(repos.map(async ({owner, repo, filteredLabels, closedByBotLabel}) => {
            const data = await fs.promises.readFile(`./data/${repo}.json`);
            const content = JSON.parse(data);
            
            const repoStats = processFile(name, repo, content.data, filteredLabels, closedByBotLabel);
            console.log(repoStats)
            stats.push(repoStats)
          
        }));
    })).then(() => {
        generateMultiColumnChart(stats, ['openIssues', 'issuesCompleted'], 'Liczba rozwiązanych i otwartych zgłoszeń w repozytoriach.', ['Otwarte zgłoszenia', 'Rozwiązane zgłoszenia']).then(() => {
            console.log('Wykres został wygenerowany i zapisany w katalogu "images"');
        }).catch(err => {
            console.error('Błąd podczas generowania wykresu:', err);
        });
        generateChart(stats, 'avg', 'Średnia liczba dni od otwarcia do rozwiązania zgłoszenia.').then(() => {
            console.log('Wykres został wygenerowany i zapisany w katalogu "images"');
        }).catch(err => {
            console.error('Błąd podczas generowania wykresu:', err);
        });
    })

}

run();