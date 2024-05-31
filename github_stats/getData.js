import { Octokit } from "octokit";
import fetch from "node-fetch";
import fs from "fs";
import {REPOS_CONFIG} from "./config.js"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const octokit = new Octokit({
  request: {
    fetch: fetch,
    auth: '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'
  },
});

const getGithubData = async () => {
    REPOS_CONFIG.map(async (repoConfig) => {
        console.log(repoConfig.name);

        
        repoConfig.repos.map(async ({owner, repo, filteredLabels}) => {
            let countAll = 0;
            const issues_fetched = [];
            const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
                owner: owner,
                repo: repo,
                per_page: 100,
                state: 'all',
                since: '2023-01-01T00:00:00Z'
              });
            
            for await (const { data: issues } of iterator) {
                for (const issue of issues) {
                  console.log("Issue", issue, countAll);
                  countAll+=1;
                  issues_fetched.push(issue);
                }
                await sleep(61000);
            }
            const json = JSON.stringify({data: issues_fetched});
            
            fs.writeFile("data/"+repo+'.json', json, 'utf8', () => {});

            console.log("Stats:")
            console.log("Count:",countAll)
        })
    })

}

getGithubData();