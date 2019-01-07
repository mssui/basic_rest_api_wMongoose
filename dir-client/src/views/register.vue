<template>
<div>
  <navbar />
 <div class="block loginform">
         <p class="title">Register</p>
          <p class="subtitle">Register</p>
            Become a member today!
           <!-- Register -->
           <div class="field">
             <label class="label">Pick a Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="username" id="username"  v-model.trim="register.username">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>
            <div class="field">
              <label class="label">Write a Password</label>
            <div class="control has-icons-left">
                <input class="input" type="password" id="password" v-model.trim="register.password">
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
                <button class="button is-success " @click="userSubmit()"> Register </button>
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
    name: 'register',
    data(){
        return{
        register: {
            username: null,
            password:null
        },
        errors: [],
        statusText: null
        }
    },
    methods: {
      userSubmit: function (){
        let self = this;
      axios.post(`http://localhost:3030/auth/register/`, this.register)
      .then(response=>{
        
         if (response.status == '200') {
          let strdata = JSON.parse(response.config.data)
          localStorage.setItem('user', strdata.username)
          self.statusText = response.data.message; // Show logged out message to user
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

