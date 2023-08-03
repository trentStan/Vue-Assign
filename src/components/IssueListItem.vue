<!-- This is a single issue template-->

<template >
   <a :name="issue.state" target="_blank" :href="issue.htmlUrl" class="list-group-item list-group-item-action"
      aria-current="true">
      <div class="d-flex w-100 justify-content-between">
         <h5 style="font-weight: bold;" class="mb-1" v-html="issue.title"></h5>
         <small>Date Created: <span v-html="getCreatedDate"></span></small>
      </div>
      <p class="mb-1">Created by: <span v-html="issue.user.login"></span></p>
      <small>id: <span v-html="issue.id"></span></small> |
      <small>State:
         <span v-html="issue.state"></span>
         <span v-if="issue.state === 'closed'"> at {{ getClosedDate }}</span>
      </small>

   </a>
</template>

<script>
import GitHubIssue from '@/models/issue';

export default {
   props: {
      issueReceived: GitHubIssue
   },
   data()
   {
      return {
         issue: this.issueReceived
      }
   },
   computed: {
      // Automated Date formaters
      getCreatedDate()
      {
         var formatedDate = new Date(this.issue.createdAt)

         return formatedDate.toDateString()
      },
      getClosedDate()
      {
         var formatedDate = new Date(this.issue.closedAt)

         return formatedDate.toDateString()
      }
   }
}
</script>
<style src="../assets/IssueItemstyle.css" scoped></style>
