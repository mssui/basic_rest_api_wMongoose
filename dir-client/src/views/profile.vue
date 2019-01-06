<template>
  
 <div class="block loginform">
         <p class="title">PROFİLE {{user}}</p>
          <p class="subtitle">LOGIN</p>
        </div>
  </template>

<script>
import axios from 'axios'
  export default {
    name: 'profile',
    data(){
        return{
        user: null,
        errors: []
        }
    },
    methods: {
     
    },
    components: {
      
    },
    created(){
       
        let loggedin = localStorage.getItem('user');
        if (loggedin != null){
                            this.user = localStorage.getItem('user');
                            console.log(loggedin)
                            // if(this.$route.params.nextUrl != null){
                            //     this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/')
                            }
    }
  }
</script>

