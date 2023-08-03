class GitHubIssue
{
   // this is an issue model that holds data for intellisense and use in the front-end
   constructor(data)
   {
      this.id = data.id; //
      this.nodeId = data.node_id;
      this.url = data.url;
      this.repositoryUrl = data.repository_url;
      this.htmlUrl = data.html_url;
      this.number = data.number;
      this.state = data.state;
      this.title = data.title;
      this.body = data.body;
      this.user = {
         login: data.user.login,
         id: data.user.id,
         node_id: data.user.node_id,
         html_url: data.user.html_url,
         type: data.user.type,
         site_admin: data.user.site_admin,
      };
      this.labels = data.labels;
      this.assignee = data.assignee;
      this.assignees = data.assignees;
      this.locked = data.locked;
      this.activeLockReason = data.active_lock_reason;
      this.closedAt = data.closed_at;
      this.createdAt = data.created_at;
      this.updatedAt = data.updated_at;
      this.closedBy = data.closed_by;
      this.stateReason = data.state_reason;
   }
}

export default GitHubIssue