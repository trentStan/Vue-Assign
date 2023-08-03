<!-- This is a template for a Pie chart displaying ratio between open and closed issues-->

<template>
   <Pie id="pie" :data="dataSet" :options="options" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Pie } from 'vue-chartjs'


ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default {
   name: 'PieChart',
   components: {
      Pie
   },
   // Receives properties from View Repo
   props: {
      states: [Number]
   },
   data()
   {
      return {
         dataSet: {
            labels: ['Open', 'Closed'],

            datasets: [
               {
                  backgroundColor: ['#41B883', '#E46651'],
                  data: this.states
               }
            ]
         },
         options: {
            responsive: true,
            maintainAspectRatio: false
         }
      }
   },

}
</script>

<style scoped>
#pie {
   max-height: 250px;

}
</style>