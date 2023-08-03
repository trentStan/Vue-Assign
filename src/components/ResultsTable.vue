<!-- This holds the results of the repo search -->

<template>
   <div class="result-table">
      <div class="card-group">

         <slot>
            <h3>No Repos Found</h3>
         </slot>

      </div>
   </div>
</template>

<style scoped>
.card-group {

   margin: auto;
   margin-top: 5px;
   max-width: 75%
}
</style>