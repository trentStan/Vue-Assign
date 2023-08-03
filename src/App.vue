<template>
   <nav class="navbar">
      <h1 class="navbar-header">Github Viewer</h1>
      <div class="nav navbar-nav navbar-right">
         <router-link to="/" class="nav-item">Search</router-link>
      </div>
   </nav>
   <router-view />
   <!-- floating button used for quick navigation to the page top-->
   <a href="#" id="backtop" class="btn btn-primary floatbtns ">Back to Top</a>
</template>

<style src="./assets/appStyle.css"></style>
