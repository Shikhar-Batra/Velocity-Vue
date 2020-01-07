import Vue from 'vue'
import './plugins/fontawesome'
import JobListing from './components/JobListing.vue';
import DepartmentBox from './components/DepartmentBox.vue';



import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF)
library.add(faTwitter)
library.add(faLinkedinIn)




Vue.config.productionTip = false



  new Vue({
    render: h => h(JobListing),
  }).$mount('#job-listing')


  new Vue({
    render: h => h(DepartmentBox),
  }).$mount('#department-box')


