var repoModels = {

   // these are repo models. Note: the repo model is the smaller version of GitHub repo in order to improve memory performance when using Repo search
   GitHubRepo: class
   {
      constructor(data)
      {
         this.id = data.id;
         this.node_id = data.node_id;
         this.name = data.name;
         this.full_name = data.full_name;

         // Owner Information
         this.owner = {
            login: data.owner.login,
            id: data.owner.id,
            node_id: data.owner.node_id,
            avatar_url: data.owner.avatar_url,
            html_url: data.owner.html_url,
            type: data.owner.type,
            site_admin: data.owner.site_admin,
         };
         this.private = data.private;
         this.html_url = data.html_url;
         this.description = data.description;
         this.fork = data.fork;
         this.url = data.url;
         this.issue_comment_url = data.issue_comment_url;
         this.issue_events_url = data.issue_events_url;
         this.issues_url = data.issues_url;
         this.labels_url = data.labels_url;
         this.languages_url = data.languages_url;
         this.releases_url = data.releases_url;
         this.ssh_url = data.ssh_url;
         this.stargazers_url = data.stargazers_url;
         this.svn_url = data.svn_url;
         this.homepage = data.homepage;
         this.language = data.language;
         this.forks_count = data.forks_count;
         this.forks = data.forks;
         this.stargazers_count = data.stargazers_count;
         this.watchers_count = data.watchers_count;
         this.watchers = data.watchers;
         this.size = data.size;
         this.open_issues_count = data.open_issues_count;
         this.is_template = data.is_template;
         this.topics = data.topics;
         this.archived = data.archived;
         this.disabled = data.disabled;
         this.visibility = data.visibility;
         this.pushed_at = data.pushed_at;
         this.created_at = data.created_at;
         this.updated_at = data.updated_at;
         this.permissions = data.permissions;
         this.subscribers_count = data.subscribers_count;
         this.network_count = data.network_count;
         this.organization = data.organization;
         this.parent = data.parent;
         this.source = data.source;
      }
   },

   // Lightweight version of the repository model
   miniRepo: class
   {
      constructor(data)
      {
         this.id = data.id;
         this.node_id = data.node_id;
         this.name = data.name;
         this.full_name = data.full_name;

         // Owner Information
         this.owner = {
            login: data.owner.login,
            id: data.owner.id,
            avatar_url: data.owner.avatar_url,
            html_url: data.owner.html_url,
            type: data.owner.type,
            site_admin: data.owner.site_admin,
         };

         this.html_url = data.html_url;
         this.description = data.description;
         this.fork = data.fork;
         this.url = data.url;
         this.created_at = data.created_at;
         this.updated_at = data.updated_at;
         this.pushed_at = data.pushed_at;
         this.size = data.size;
         this.stargazers_count = data.stargazers_count;
         this.watchers_count = data.watchers_count;
         this.language = data.language;
         this.forks_count = data.forks_count;
         this.open_issues_count = data.open_issues_count;
      }
   }
}
export default repoModels
