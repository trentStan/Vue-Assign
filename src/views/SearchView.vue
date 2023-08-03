<template>
   <div class="search">
      <h1>Welcome</h1>
      <h3>This is a Github repo search engine</h3>
      <!-- This is where user can enter a term to search for repo -->
      <form>
         <div class="form-group">
            <input required v-model="searchStr" type="text" name="Search" class="form-control" id="search"
               placeholder="Search for repositories">
         </div>
         <button :disabled="searchStr === ''" @click.prevent="getResults" type="submit"
            class="btn btn-primary">Search</button>

      </form>
      <!-- Results are shown here -->
      <h5 v-if="loading">Loading...</h5>
      <div v-if="getPageTotal != 0 && results != [] && loading == false">
         <p>Page {{ pageIndex }} of {{ getPageTotal }}</p>
         <div class="btn-group" role="group" aria-label="page navigator">
            <button name="prev" class="btn btn-secondary" @click="previousPage"
               :disabled="pageIndex == 1">&#8592;Previous</button>
            <button name="next" class="btn btn-secondary" @click="nextPage"
               :disabled="pageIndex == pageTotal">Next&#8594;</button>
         </div>
         
         <ResultsTable>
            <CardTemp v-for="repo in results" :key="repo.id" :id="repo.id" :name="repo.name" :description="repo.description"
            :owner-name="repo.owner.login" :num-open-issues="repo.open_issues_count" />
         </ResultsTable>

         <p>Page {{ pageIndex }} of {{ getPageTotal }}</p>
         <div class="btn-group" role="group" aria-label="page navigator">
            <button name="prev" class="btn btn-secondary" @click="previousPage"
               :disabled="pageIndex == 1">&#8592;Previous</button>
            <button name="next" class="btn btn-secondary" @click="nextPage"
               :disabled="pageIndex == pageTotal">Next&#8594;</button>
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src
import ResultsTable from '@/components/ResultsTable.vue';
import githubTools from '@/GHAPI';
import repoModels from '@/models/repository';
import CardTemp from '../components/CardTemp.vue'

export default {
   name: 'SearchView',
   components: {
      ResultsTable,
      CardTemp
   },
   data()
   {
      return {
         searchStr: '',
         results: [],
         loading: false,
         pageIndex: 1,
         pageTotal: 0
      }
   },
   computed: {
      getPageTotal()
      {
         return this.pageTotal
      }
   },
   methods: {
      // This is called when user clicks the search button
      getResults()
      {
         this.loading = true
         githubTools.searchRepos(this.searchStr, this.pageIndex).then((results) =>
         {
            var tempRes = []
            results.items.forEach(el =>
            {
               tempRes.push(new repoModels.miniRepo(el))
            });

            this.results = tempRes
            this.loading = false
            this.pageTotal = Math.ceil(results.total_count / 30)
            console.log(this.results)
         }).catch(function (err)
         {
            alert(err)
            console.log(err)
         })
      },
      // these 2 functions switches repo pages
      nextPage()
      {
         this.results = []
         this.pageIndex++
         this.getResults()
      },
      previousPage()
      {
         this.results = []
         this.pageIndex--
         this.getResults()
      }
   }

}
</script>

<style scoped>
/* margins set to auto are for aligning content to center */

input[type="text"] {
   margin: auto;
   width: 60%;
}

.form-group {
   margin-bottom: 5px;
   margin-top: 5px;
}


button {
   margin-top: 4px;
}

button[name="next"] {
   margin-left: 5px;
}
</style>


