<!-- This is a template of a single repo result -->

<template>
   <div class="card">
      <div class="card-body">
         <h5 v-html="repoName" class="card-title"></h5>
         <h6>Owner: <span v-html="ownerName"></span></h6>
         <p v-html="description" class="card-text"></p>

      </div>
      <small style="margin-bottom: 4px;">Number of Open Issues: <span v-html="repoOpenIssues"></span></small>
      <!-- this calls the view repo function that sends user to ViewRepo page -->
      <a @click="viewRepo" class="btn btn-primary">View Repo</a>
   </div>
</template>

<script>

export default {
   name: "CardTemp",
   props: {
      id: Number,
      name: String,
      description: String,
      ownerName: String,
      numOpenIssues: Number
   },
   data()
   {
      return {
         repoID: this.id,
         repoName: this.name,
         repoOwner: this.ownerName,
         repoOpenIssues: this.numOpenIssues
      }
   },
   methods: {
      viewRepo()
      {
         // This goes to view repo page with parameters
         this.$router.push(`/viewrepo/${this.repoOwner}/${this.repoName}`)
      }
   },
   compatConfig: { MODE: 3 }
}

</script>

<style scoped>
.card {
   margin-top: 2px;
   margin-left: 2px;
   margin-right: 2px;
   min-width: 32%;
   max-width: 33%;

}

h6 span,
h5 {
   font-weight: bold;
}

.btn {
   margin: auto;
   margin-bottom: 8px;
}</style>