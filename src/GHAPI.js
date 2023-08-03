
const token = "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"

const githubTools = {

   // Takes in string inputted by user
   searchRepos: async function (searchString, pageNum)
   {
      const strEncoded = encodeURIComponent(searchString)
      const url = new URL(`https://api.github.com/search/repositories?q=${strEncoded}&page=${pageNum}`)
      return (await fetch(url, {
         headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`
         }
      })).json()

   },
   // gets repo details based on owner and repo name
   getRepo: async function (ownerName, repoName)
   {
      const user = encodeURIComponent(ownerName)
      const repo = encodeURIComponent(repoName)
      const url = new URL(`https://api.github.com/repos/${user}/${repo}`)
      return (await fetch(url, {
         headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`
         }
      })).json()
   },

   // gets list of issues based on user, repo, state filter and page number
   getIssues: async function (user, repo, state, page)
   {
      var url
      if (state == 'all')
      {
         url = new URL(`https://api.github.com/repos/${user}/${repo}/issues?page=${page}`)
      } else
      {
         url = new URL(`https://api.github.com/repos/${user}/${repo}/issues?state=${state}&page=${page}`)
      }

      return (await fetch(url, {
         headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`
         }
      })).json()
   },

   // gets total number of issues within specified repo for stat and logical functions
   getIssueCount: async function (user, repo)
   {
      const url = new URL(`https://api.github.com/search/issues?q=repo:${user}/${repo}`)
      return (await (await fetch(url, {
         headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`
         }
      })).json()).total_count
   }
}


export default githubTools