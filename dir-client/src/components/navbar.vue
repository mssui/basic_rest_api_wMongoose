<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">SDN
      <!-- <img src="" width="112" height="50"> -->
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link :to="{name: 'mainland'}">
            Home
          </router-link>
      
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Contact
          </a>
          
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div v-if="isloggedin" class="buttons">
         
        <a class="button is-primary" @click="$router.push('profile/'+ isloggedin)">Dashboard</a>
        <a class="button is-warning" @click="userLogout">Logout</a> 
        <p v-if="statusText">{{ statusText }}</p>
        </div>
         <div v-else class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light is-pulled-right" @click="login">
            Log in</a>
            <div class="modal">
  <div class="modal-background has-background-lightgray"></div>
  <div class="modal-content fcolor">
    
    <!-- Login Form Starts -->
  
     <div class="block loginform">
         <p class="title">LOGIN</p>
          <p class="subtitle">LOGIN</p>
         If you are already a member please sign in OR Create a new account
           <!-- Login -->
           <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email">
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
                <input class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
            </div>
            <div class="field">
            <p class="control is-pulled-right">
                <button class="button is-success ">
                Login
                </button>
            </p>
            </div>
            <div class="field">
            
            </div>
  <!-- Sign UP -->
<p class="title">SIGNUP</p>
        <div class="field "> 
        <div class="control">
            <input class="input" type="text" placeholder="Your Name">
        </div>
        </div>

        <div class="field">
        
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Pick a Username">
            <span class="icon is-small is-left has-text-info">
            <i class="fas fa-user"></i>
            </span>
            <!-- <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
            </span> -->
        </div>
        <!-- <p class="help is-success">This username is available</p> -->
        </div>

        <div class="field">
       
        <div class="control has-icons-left has-icons-right">
            <input class="input is-danger" type="email" placeholder="Your E-mail">
            <span class="icon is-small is-left has-text-info">
            <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
            </span>
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
        </div>
           <div class="field">
            <p class="control has-icons-left has-text-info">
                <input class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
            </div>
        <div class="field">
            <p class="control is-pulled-right">
                <button class="button is-success ">
                SignUp
                </button>
            </p>
            </div>
            </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="closemodel"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import axios from 'axios'

export default {
    
  name: 'navbar',
  data(){
        return{
          isloggedin: localStorage.getItem('user'),
          statusText : null
        }
    },
    components: {
      
    },
    methods: {
        login(){
            document.querySelector('.modal').classList.add('is-active')
        },
        closemodel(){
            document.querySelector('.modal').classList.remove('is-active')
        },
        userLogout(){
          let self = this;
            //  if (localStorage.getItem('user') != null){
                axios.get("http://localhost:3030/auth/logout")
                      .then((response)=>{
                      console.log(response.data.message)
                      self.statusText = response.data.message; // Show logged out message to user
                      localStorage.removeItem('user')
                      self.$router.push('/')
                      })
                      .catch(error => {
                            console.log(error);
                            });
                            // }
        }
    },
    mounted(){
  
    }
}
</script>

<style>

.loginform{
    margin: 2em;
}
.fcolor{
    color:lightslategray;
    background-color:rgba(230, 227, 227, 0.856); 
}
</style>
