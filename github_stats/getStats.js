import { Octokit } from "octokit";
import fetch from "node-fetch";
import fs from "fs";
import {REPOS_CONFIG} from "./config.js"

const octokit = new Octokit({
  request: {
    fetch: fetch,
  },
});

const getGithubData = async () => {
    REPOS_CONFIG.map(async (repoConfig) => {
        console.log(repoConfig.name);

        
        repoConfig.repos.map(async ({owner, repo}) => {
            let countAll = 0;
            const issues = [];
            const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
                owner: owner,
                repo: repo,
                per_page: 100,
              });
            
            for await (const { data: issues } of iterator) {
                for (const issue of issues) {
                  console.log("Issue #%d: %s", issue.number, issue.title);
                  countAll+=1;
                  issues.push(issue);
                }
            }
            const json = JSON.stringify({data: issues});
            
            fs.writeFile(repoConfig.name+'.json', json, 'utf8');

            console.log("Stats:")
            console.log("Count:",countAll)
        })
    })

}

getGithubData();