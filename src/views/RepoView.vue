<template>
   <div v-if="dataRetrieved">
      <h1>
         <span v-html="repo.name" />
      </h1>
      <h2>Owner: <span v-html="repo.owner.login"></span></h2>

      <div class="desc">
         <h3>Description:</h3>
         <span v-html="repo.description"></span>
      </div>
      <div class="link">
         <h3>Link:</h3>
         <a v-html="repo.svn_url" :href="repo.svn_url" target="_blank" id="repolink" class="btn"></a>
      </div>

      <!-- This shows basic repository stats-->
      <div id="stats">
         <table>
            <tr>
               <td>
                  <h5 class="card-title">Number of Forks:</h5>
                  <span v-html="repo.forks_count"></span>
               </td>
               <td rowspan="4">
                  <h6>Issue States:</h6>
                  <PieChart :states="getStateSet" v-if="dataRetrieved" />
               </td>
            </tr>
            <tr>
               <td>
                  <h5 class="card-title">Number of Stargazers:</h5>
                  <span v-html="repo.stargazers_count"></span>
               </td>
            </tr>
            <tr>
               <td>
                  <h5 class="card-title">Number of Issues:</h5>
                  <span v-html="totalIssues"></span>
               </td>
            </tr>
            <tr>
               <td>
                  <h5 class="card-title">Number of Open Issues:</h5>
                  <span v-html="repo.open_issues_count"></span>
               </td>
            </tr>
         </table>
      </div>

      <!-- The State Filter -->
      <h3>Issues</h3>
      <div id="statefilter">
         <input type="radio" name="state" id="open" value="open" v-model="state">
         <label for="open">Open</label>
         <input style="margin-left: 15px;" type="radio" name="state" id="closed" value="closed" v-model="state">
         <label for="closed">Closed</label>
      </div>

      <span hidden>{{ getSelectedState }}</span>

      <small>Click an issue item to go to its Github page</small>

      <!-- Issue List -->
      <div v-if="issuesRetrieved">
         <p>Page {{ pageIndex }} of {{ getPageTotal }}</p>
         <div class="btn-group" role="group" aria-label="page navigator">

            <button name="prev" class="btn btn-secondary" @click="previousPage"
               :disabled="pageIndex == 1">&#8592;Previous</button>
            <button name="next" class="btn btn-secondary" @click="nextPage"
               :disabled="pageIndex == pageTotal">Next&#8594;</button>
         </div>

         <ul class="list-group">
            <IssueListItem v-for="issue in renderIssueList" :issue-received="issue" :key="issue.id"></IssueListItem>
         </ul>
         <p>Page {{ pageIndex }} of {{ getPageTotal }}</p>
         <div class="btn-group" role="group" aria-label="page navigator">

            <button name="prev" class="btn btn-secondary" @click="previousPage" :disabled="pageIndex == 1">&#8592;
               Previous</button>
            <button name="next" class="btn btn-secondary" @click="nextPage" :disabled="pageIndex == pageTotal">Next
               &#8594;</button>
         </div>
      </div>
      <h5 v-else>Loading Issues...</h5>
   </div>
   <h5 v-else>Loading...</h5>

   <!-- This is a float button that allows quick navigation to search page -->
   <a @click="$router.replace('/')" id="backtosearch" class="btn btn-primary ">Back to Search</a>
</template>

<script>
import githubTools from '@/GHAPI';
import GitHubIssue from '@/models/issue';
import repoModels from '@/models/repository';
import IssueListItem from '@/components/IssueListItem.vue';
import PieChart from '@/components/PieChart.vue';

export default {

   data()
   {
      return {
         state: 'open',
         dataRetrieved: false,
         repo: repoModels.GitHubRepo.prototype,
         issuesList: [],
         stateSet: [0, 0],
         totalIssues: 0,
         issuesRetrieved: false,
         pageTotal: 0,
         pageIndex: 1
      }
   },
   components: {
      IssueListItem,
      PieChart
   },
   computed: {
      // these take care of any changes to the data in this component
      getSelectedState()
      {
         console.log("State function")
         this.getIssueList()
         return this.state
      },
      checkIssuesRetrieved()
      {
         return this.issuesRetrieved
      },
      getStateSet()
      {
         return this.stateSet
      },
      renderIssueList()
      {
         return this.issuesList
      },
      getPageTotal()
      {
         return this.pageTotal
      }
   },
   methods: {

      // these 2 functions switches issue pages
      nextPage()
      {
         this.issuesList = []
         this.pageIndex++
         this.getIssueList()
      },
      previousPage()
      {
         this.issuesList = []
         this.pageIndex--
         this.getIssueList()
      },
      // This retrieves list of issues based on state, It is called everytime state filter changes
      getIssueList()
      {

         switch (this.state)
         {
            case 'closed':
               this.pageTotal = Math.ceil(this.stateSet[1] / 30)
               break;
            case 'open':
               this.pageTotal = Math.ceil(this.stateSet[0] / 30)
               break;
            default:
               this.pageTotal = Math.ceil(this.totalIssues / 30)
               break;
         }

         if (this.pageTotal < this.pageIndex)
         {
            this.pageIndex = 1
         }

         this.issuesRetrieved = false
         this.issuesList = []
         githubTools.getIssues(this.repo.owner.login, this.repo.name, this.state, this.pageIndex).then((issues) =>
         {
            issues.forEach(element =>
            {
               this.issuesList.push(new GitHubIssue(element))
            });

            this.issuesRetrieved = true
         }).catch(function (err)
         {
            alert("Github Rate Limit exceeded")
            console.log(err)
         })
      }
   },
   // Initialises the ViewRepo Page
   async created()
   {
      await githubTools.getRepo(this.$route.params.ownersName, this.$route.params.name).then((repo) =>
      {
         var temp = new repoModels.GitHubRepo(repo)
         this.repo = temp
         console.log(this.repo)

         githubTools.getIssueCount(this.repo.owner.login, this.repo.name).then((el) =>
         {
            console.log(el)
            this.totalIssues = el
            this.stateSet[0] = temp.open_issues_count
            this.stateSet[1] = el - temp.open_issues_count
            this.dataRetrieved = true
            this.getIssueList()
         }).catch(function (err)
         {
            alert(err)
            console.log(err)
         })

      })
         .catch(function (err)
         {
            alert(err)
            console.log(err)
         })
   }
}

</script>

<style src="../assets/repoViewStyle.css">
</style>
