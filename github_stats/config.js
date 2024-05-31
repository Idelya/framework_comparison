export const REPOS_CONFIG = [
    {
        name: "Next.js",
        repos: [{
            owner: "vercel",
            repo: "next.js",
            filteredLabels: ["area: app", "examples", "linear: turbopack", "Turbopack", "please add a complete reproduction", "please simplify reproduction"],
            closedByBotLabel: "invalid link",
        }]

    },
   {
        name: "Gatsby",
        repos: [{
            owner: "gatsbyjs",
            repo: "gatsby",
            filteredLabels: ["status: needs more info", "status: needs reproduction", "status: awaiting author response", "type: feature or enhancement"],
            closedByBotLabel: "stale?",
        }]
    },
    {
        name: "Remix",
        repos: [{
            owner: "remix-run",
            repo: "remix",
            filteredLabels: [
                "needs-response", 
                "proposal:remix", 
                "proposal:superseded", 
                "proposal:implemented", 
                "template:architect", 
                "template:vite-express", 
                "template:vite-cloudflare", 
                "template:vite", 
                "template:vercel", 
                "template:spa", 
                "template:remix-javascript", 
                "template:remix", 
                "template:netlify", 
                "template:fly", 
                "template:express", 
                "template:deno", 
                "template:cloudflare-workers", 
                "template:cloudflare-pages", 
                "template:bun", 
                "template:bun"],
        }],
        closedByBotLabel: "",
    }
];