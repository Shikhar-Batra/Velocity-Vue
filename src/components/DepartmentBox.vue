<template>
    <div>
        <div class="box-wrapper">
            <div class="dotted-overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box-inner pt50 pb50">
                            <div class="box-heading text-center">
                                <h1 class="headings pb50">Current <span class="text-red">openings</span></h1>
                            </div>
                            <div class="box-container">
                                <div class="row">

                                    <div class="col-md-4" v-for="DepartmentValue in uniqueDepartments"
                                         :key="DepartmentValue.id">

                                        <div class="box">
                                            <a :href="'/careers/?location=null&department='+ DepartmentValue.department">

                                                <div class="box-bg">
                                                    <div v-if = "DepartmentValue.department === 'Sales' " class="v-icon sales"></div>
                                                    <div v-else-if = "DepartmentValue.department === 'Cloud Services/VCAMP' " class="v-icon cloud"></div>
                                                    <div v-else-if = "DepartmentValue.department === 'Operations' " class="v-icon service"></div>
                                                    <div v-else-if = "DepartmentValue.department === 'Marketing' " class="v-icon j"></div>
                                                    <div v-else class="v-icon briefcase"></div>
                                                    <div class="box-details">
                                                        <div class="box-title">
                                                            <h2 v-if = "DepartmentValue.department === 'Cloud Services/VCAMP' " >Cloud Services</h2>
                                                            <h2 v-else>{{DepartmentValue.department}}</h2>

                                                        </div>
                                                        <div class="box-sub-title">{{DepartmentValue.jobCount}} Jobs</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-md-4" v-if="!uniqueDepartments.some(x=> x.department === 'G&A')">
                                        <div class="box">
                                            <a :href="'/careers/?location=null&department=G%26A'">
                                                <div class="box-bg">
                                                    <div class="v-icon briefcase"></div>
                                                    <div class="box-details">
                                                        <div class="box-title">
                                                            <h2>G&A</h2>
                                                        </div>
                                                        <div class="box-sub-title">
                                                            No Jobs
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>

<script lang="ts">
    import axios from "axios"
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {counter} from "@fortawesome/fontawesome-svg-core";


    @Component({
        components: {}
    })
    export default class DepartmentBox extends Vue {

        DepartmentValues: any = [];
        uniqueArrDep: any = [];
        uniqueDepartments: any = [];
        list: any = [];
        department: any = null;

        jobCount: any = 0;


        async mounted() {


            await this.listDepartmentValues()
            this.uniqueArrDep = [...new Set(this.DepartmentValues.map((data: any) => data.categories.department))]

            this.uniqueArrDep.map((x: any) => {
                this.jobCount = 0
                this.DepartmentValues.map((y: any) => {
                    if (y.categories.department === x){
                        this.jobCount++
                    }
                })

                this.uniqueDepartments.push({ department:x,jobCount:this.jobCount})
            })
            console.log(this.uniqueDepartments);
        }


        async listDepartmentValues() {
            await axios.get(`https://api.lever.co/v0/postings/velocitycloud`)
                .then(((jobRes) => {
                    this.DepartmentValues = jobRes.data;
                }))

        }



    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .box-wrapper .container {
        max-width: 1050px;
    }

    .dotted-overlay {
        position: absolute;
        background-image: url(/wp-content/uploads/2019/11/circle-dotted.svg);
        background-position-y: bottom;
        background-position-x: left;
        background-size: 100%;
        width: 400px;
        height: 450px;
        bottom: -10px;
    }


    .pb50 {
        padding-bottom: 50px !important;
    }

    .pt50 {
        padding-top: 50px !important;
    }

    .box-heading h1.headings {
        float: left;
        width: 100%;
        height: auto;
        color: #153447;
        font-size: 24px;
        line-height: 30px;
        font-family: 'Avenir Bold';
        font-weight: 600;
        text-align: left;
        text-transform: capitalize;
        margin: 0;
        padding: 0;
        letter-spacing: 0.02em;
    }

    .text-red {
        color: #003E7B !important;
    }

    .box-container .box {
        position: relative;
        margin-bottom: 30px;
        min-height: 215px !important;
        display: block;
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
    }

    .box-details .box-title h2 {
        font-family: 'Avenir Demi';
        font-size: 20px;
        color: #153447;
        line-height: 28px;
    }

    .box-bg:hover {
        background-color: #003E7B;
    }

</style>
