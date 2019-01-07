<template>
<div>
  <navbar />
 <div class="block loginform">
         <p class="title">LOGIN</p>
          <p class="subtitle">Login to your account</p>
         If you are already a member please sign in OR Create a new account
           <!-- Login -->
           <div class="field">
           <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="username" id="username"  v-model.trim="login.username">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>
            <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
                <input class="input" type="password" id="password" v-model.trim="login.password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </div>
            </div>
             <!-- <div class="field" v-if="errors && errors.length">
        <div v-for="(error,index) of errors" :key="index">
          <p> {{error.message}}</p>
        </div>
      </div> -->
            <div class="field">
            <p class="control is-pulled-right">
                <button class="button is-success " @click="userSubmit()"> Login</button>
            </p>
            </div>
            <div class="field">
            </div></div>
 </div>
  </template>

<script>
import navbar from '@/components/navbar'
import axios from 'axios'
  export default {
    name: 'login',
    data(){
        return{
        login: {
            username: null,
            password:null
        },
        errors: []
        }
    },
    methods: {
      userSubmit: function (){
        let self = this;
      axios.post(`http://localhost:3030/auth/login/`, this.login)
      .then(response=>{
         if (response.status == '200') {
          let strdata = JSON.parse(response.config.data)
          localStorage.setItem('user', strdata.username)
          self.$router.push('/profile/'+ strdata.username);
      }
      })     
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })}
    },
    components: {
      navbar
    }
  }
</script>

