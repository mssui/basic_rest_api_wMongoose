<template>
  
 <div class="block loginform">
         <p class="title">REGISTER</p>
          <p class="subtitle">LOGIN</p>
         If you are already a member please sign in OR Create a new account
           <!-- Login -->
           <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input id="username" :state="state" v-model.trim="login.username">
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
                </span>
            </p>
            </div>
            <div class="field">
            <p class="control has-icons-left">
                <input type="password" id="password" :state="state" v-model.trim="login.password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
             <div v-if="errors && errors.length">
        <div v-for="(error,index) of errors" :key="index">
          <p> {{error.message}}</p>
        </div>
      </div>
            </div>
            <div class="field">
            <p class="control is-pulled-right">
                <button class="button is-success " @submit="submit">
                Register
                </button>
            </p>
            </div>
            <div class="field">
            
            </div></div>
  </template>

<script>
import axios from 'axios'
  export default {
    name: 'register',
    data(){
        return{
        mail: null,
        pass: null
        }
    },
    methods: {
      submit: function (){
           axios.get('http://localhost:3030/login', {
                                username: this.mail,
                                password: this.pass}).then(response=>{
                                  console.log(response.data)
                                    
                                })
        
      }
      
    },
    components: {
      
    }
  }
</script>

