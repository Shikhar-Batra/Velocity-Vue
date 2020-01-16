<template>
    <div>
        <!--                        <DropDown @filterJobs="filteredJobs($event)"></DropDown>-->
        <div v-if="isLoading">
            <h5 class="loading-txt"> loading please wait......</h5>
        </div>
        <div id="job-listing-new" class="job-listing job-search" v-if="this.JobPostings.length > 0">
            <div class="container">
                <div class="box-container pt50">
                    <div class="row">
                        <div class="col-md-4 col-xs-6 " v-for="JobPosting in JobPostings" :key="JobPosting.id">
                            <div class="box">
                                <div class="box-bg"><a @click="sendToLever(JobPosting.hostedUrl) "  target="_blank">
                                    <div class="box-details">
                                        <div class="box-title">
                                            <h2>{{JobPosting.text}}</h2>
                                        </div>
                                        <div class="box-height"></div>
                                        <div class="box-sub-title pt10">
                                            <span>Team:  </span><span class="bold text-dark-new">{{JobPosting.categories.team}} </span>
                                        </div>
                                        <div class="box-sub-title pt10">
                                            <span>Department:  </span><span class="bold text-dark-new">{{JobPosting.categories.department}} </span>
                                        </div>
                                        <div class="box-sub-title pt10">
                                            <span>Location:  </span><span class="bold text-dark-new"> {{JobPosting.categories.location}}</span>
                                        </div>
                                    </div>
                                </a>
                                    <div class="box-social">
                <span>
            </span>
                                        <ul>
                                            <li style="margin-left: 0px;">
                                                <a :href=" '   https://twitter.com/share?url=https://jobs.lever.co/velocitycloud/' + JobPosting.id + '&text=' +JobPosting.text" target="_blank">
                                                    <font-awesome-icon class="fa fa-twitter" aria-hidden="true"
                                                                       :icon="{ prefix: 'fab', iconName: 'twitter' }"/>


                                                </a>
                                            </li>
                                            <li><a :href=" 'https://www.facebook.com/sharer.php?u=https://jobs.lever.co/velocitycloud/' + JobPosting.id"  target="_blank">
                                                <font-awesome-icon class="fa fa-facebook" aria-hidden="true"
                                                                   :icon="{ prefix: 'fab', iconName: 'facebook-f' }"/>
                                            </a>


                                            </li>
                                            <li><a :href=" '  https://www.linkedin.com/shareArticle?url=https://jobs.lever.co/velocitycloud/' + JobPosting.id +'&title'+ JobPosting.text"  target="_blank">
                                                <font-awesome-icon class="fa fa-linkedin" aria-hidden="true"
                                                                   :icon="{ prefix: 'fab', iconName: 'linkedin-in' }"/>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div class="text-center">
                <button v-show="load" @click="loadMore" class="btn_loadmore">
                    More Jobs
                </button>
            </div>
        </div>


        <div class="col-md-12 text-center" v-else-if="this.JobPostings.length === 0">
            <img class="img-ok" src="/wp-content/uploads/2019/12/no-job.png">
            <p class="no-job">No matching jobs found. Please Try Again</p>
        </div>


    </div>
</template>

<script lang="ts">
    import axios from "axios"
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DropDown from "./Dropdown.vue";


    @Component({
        components: {
            DropDown
        }
    })
    export default class JobListing extends Vue {

        @Prop() private msg!: string;
        JobPostings: any = [];
        jobs: any = [];
        posts: any;

        postings: any = [];
        JobId: any = this.JobPostings.id;
        isLoading: boolean = true;
        icon: any = [];
        count: any = 0;
        location: any = this.getQueryString('location', window.location.href)
        department: any = this.getQueryString('department', window.location.href)
        load: Boolean = false;


        async mounted() {
            this.location = this.location ? this.location.replace("%2C+", ", ") : "null"
            this.department = this.department ? this.department.replace("%2F", "/").replace("%26", "&").replace("%20", " ").replace("+", " ") : "null"
            await this.listJobs()
        }

        sendToLever(applyLink: any) {
            location.href = `${applyLink}`;
        }


        getQueryString(field: any, url: any) {
            let href = url ? url : window.location.href;
            let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
            let string = reg.exec(href);
            return string ? string[1] : null;
        }


        // filteredJobs(data: any) {
        //     this.JobPostings = data
        //     this.isLoading = false;
        // }


        loadMore() {
            let post = this.jobs;
            let posts = post.splice(12, 12)
            if (posts) {
                if (posts.length < 12) this.load = false;
                this.JobPostings = [...this.JobPostings, ...posts]
            }
        }

        async listJobs() {

            await axios.get(`https://api.lever.co/v0/postings/velocitycloud`)
                .then(((jobRes) => {
                    this.JobPostings = jobRes.data;

                    if (this.location == 'null' && this.department == 'null') this.JobPostings = this.JobPostings;
                    else this.JobPostings = (this.location !== 'null' && this.department !== 'null') ? this.JobPostings.filter((job: any) => job.categories.location === this.location && job.categories.department === this.department) : '' || (this.department !== '' && this.location === 'null') ? this.JobPostings.filter((job: any) => job.categories.department === this.department) : '' || (this.location !== '' && this.department === 'null') ? this.JobPostings.filter((job: any) => job.categories.location === this.location) : '';
                    this.isLoading = false;

                }))
            this.jobs = this.JobPostings
            this.postings = this.JobPostings
            if (this.postings.length > 12) {
                this.load = true
                this.JobPostings = this.postings.slice(0, 12)
            }
            this.isLoading = false;

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .btn_loadmore {
        background-color: #003E7B;
        color: #fff;
        height: 45px;
        border: none;
        min-height: 45px;
        margin-top: 5px;
        margin-right: 5px !important;
        border-radius: 2px;
        font-weight: bold;
    }


    h5.loading-txt {
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        top: 50%;
        z-index: 999999;
        text-align: center;
        vertical-align: middle;
    }


    .loading-txt:before {
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        top: -60px;
        margin: 0 auto;
        background-image: url("http://uat.gas.ind.in/loading.svg");
        background-size: 60px;
        width: 60px;
        height: 60px;
        z-index: 9999;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
    }


    .loading-txt:after {
        content: '';
        background-color: rgba(255, 255, 255, 0.35);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }


    .no-job {
        text-align: center !important;
        line-height: 22px;
        color: #333333;
        opacity: 0.7;
        font-family: "avenir-med", sans-serif;
        text-align: center;
    }

    .img-ok {
        max-width: 200px;
        width: 100%;
        margin-bottom: 20px;
    }


    .pt10 {
        padding-top: 10px !important;
    }

    .pt50 {
        padding-top: 50px !important;
    }

    a {
        text-decoration: none !important;
        cursor: pointer !important;
    }

    .box-container .box {
        position: relative;
        margin-bottom: 30px;
        height: 215px;
        display: block;
    }

    .container {
        margin-right: auto;
        margin-left: auto;
        padding-left: 15px;
        padding-right: 15px;
        max-width: 1050px;
    }

    .box-bg {
        position: relative;
        float: left;
        width: 100%;
        background-color: #FFFFFF;
        padding: 20px;
        box-shadow: 0px 21px 47.52px 0.48px rgba(190, 196, 207, 0.4);
        display: block;
        border-radius: 8px;
        transition: all .2s ease;
        -webkit-transition: all .2s ease;
        -moz-transition: all .2s ease;
        height:290px;
    }

    .box-bg:hover {
        background-color: #003E7B;
        margin-top: -10px;
    }

    .box-details {
        margin-top: 50px;
    }

    .box-bg:hover .box-details .box-title h2 {
        color: #fff;
    }

    .box-bg:hover .box-sub-title {
        color: #fff;
    }

    .box-details .box-title h2 {
        font-family: 'Avenir Demi';
        font-size: 20px;
        color: #153447;
        line-height: 28px;
        max-height: 20px;

    }

    .box-sub-title {
        font-family: 'Avenir Pro';
        font-size: 15px;
        color: #153447;
        opacity: .6;
    }


    .banner-main .form-group .form-control option {
        padding-left: 50px !important;
    }

    .banner-main .form-group .form-control select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 5px;
    }

    .banner-inner .banner-title h1 {
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
    }

    .job-search .box-details {
        margin-top: 0px;
    }

    .job-search .box-details .box-sub-title {
        opacity: 1;
        color: grey;
        letter-spacing: 0.02em;
    }

    .bold {
        font-family: 'Avenir Demi';
    }

    .text-dark-new {
        color: #153447;
    }

    .box-social span {
        display: inline-flex;
    }

    .box-social ul {
        margin: 0;
        padding: 0;
    }

    .box-social ul li {
        list-style: none;
        float: left;
        margin: 0 10px;
    }


    .box-social ul li a {
        display: block;
        color: #aaa;
        font-size: 22px;
        transition: 0.5s;
        text-align: center;
    }

    .box-social ul li:first-child {
        margin-left: 0px !important;
    }

    .box-social ul li a .fa-twitter {
        color: #03a9f4;
    }

    .box-social ul li a .fa-facebook {
        color: #475993;
    }

    .box-social ul li a .fa-linkedin {
        color: #007aaa;
    }

    .box-social ul li:hover a {
        transform: rotateY(360deg);
    }

    .box-bg:hover .box-sub-title span {
        color: #fff;
    }

    .box-bg:hover .box-social ul li a .fa {
        color: #fff;
    }

    .box-height {
        width: 100%;
        position: relative;
        margin-top: 30px;
    }

    .job-search .box-details .box-title h2 {
        min-height: 55px;
    }

    .job-search .box {
        min-height: 300px !important;
    }


    @media only screen and (max-width: 768px) {

        .box-container .box {
            margin-bottom: 20px;
        }
    }
</style>
