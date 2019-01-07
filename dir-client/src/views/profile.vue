<template>
<div>
  <navbar />
 <div class="block loginform">
         <p class="title">Profile Page for {{user}}</p>
          <p class="subtitle">Dashboard</p>
        </div>
</div>
</template>

<script>
import navbar from '@/components/navbar'

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
      navbar
    },
    created(){
               if (localStorage.getItem('user') != null){
                            this.user = localStorage.getItem('user');
                            // if(this.$route.params.nextUrl != null){
                            //     this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/auth/login')
                            }
    }
  }
</script>

