<template>
  <div class="app">

    <navbar />
<!-- Main Banner -->
<section class="hero is-primary is-medium is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Medium title
      </h1>
      <h2 class="subtitle">
        Medium subtitle
      </h2>
    </div>
  </div>
</section>
<!-- Entry Blocks -->

<div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter  m-lg">
      <div class="block">
        <b-field>
                  <b-input placeholder="Ambulance" v-model="entry"></b-input>
              </b-field></div>
        <div class="block  is-pulled-right"> <h2>Diye yazılır,</h2></div>

        <div class="block"><b-field>
                  <b-input placeholder="Embulıns" v-model="okuma"></b-input>
              </b-field></div>
        <div class="block  is-pulled-right"><h2>Diye okunur.</h2></div>
  </div>
  
</div>
<div class="columns is-mobile">
<div class="column is-half is-offset-one-quarter ">
      <div class="block "><a class="button is-medium is-danger is-pulled-right" @click="gonderi">Gönder</a></div>
          <div class="block">{{ feedback }}</div>
  </div>
  </div>
<!-- All other tile elements -->

  

    <div class="container">
      <h1 class="title">Title Loop</h1>
     <ul>
            <li v-for="(title,index) in titles" :key="index" >
              {{ title }}
            </li>
          </ul>
           <h1 class="title">Comment Loop</h1>
     <ul>
            <h1>Comment Loop</h1>
                  <li v-for="(comment,index) in comments" :key="index">
                    {{ comment }} <br>
                  </li>
                </ul>
      
    </div>
      <!-- Vote Loop -->
<div class="columns is-mobile">
    <div class="column is-three-fifths
is-offset-one-fifth m-lg">
  <div class="card-content">
    <p class="title">
      <strong>
     " Ogilvy</strong> diye yazılır, <strong>Ogilvi </strong>diye okunur.”
    </p>
    <p class="subtitle is-pulled-right">
Username    </p>
  </div>
  <footer class="card-footer is-half is-pulled-right">
    
    <p class="card-footer-item">
  <a class="button is-medium  is-fullwidth is-success is-outlined">DOĞRU</a>
    </p>
    
     <p class="card-footer-item">
  <a class="button is-medium is-fullwidth is-danger is-outlined">YANLIŞ</a>
    </p>
  </footer>
</div>
 </div>
<!-- Footer Banner -->
    <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>SND</strong> by Aslı Arı. The source code is published
      <a href="https://github.com/mssui">on GitHub</a>
    </p>
  </div>
</footer>
  </div>
</template>
<script>
import navbar from './navbar.vue'
import axios from 'axios'
import slugify from 'slugify'
export default {
  name: 'mainland',
  data(){
        return{
        mains : [],
        titles : [],     
        comments: [],
        list: [],
        listcom: [],
        entry: null,
        okuma: null,
        slug: null,
        feedback: null
        }
    },
    components: {
      navbar
    },
  methods: {
      gonderi(){
          // let user= currentUser.uid
          // if (user && this.entry && this.okuma) { 

        if ( this.entry && this.okuma) { // Make sure fields are true, later User ID will be in this control like above
        console.log('Okuma:', this.okuma);
            this.slug = slugify(this.entry, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
            }).toString();
            console.log(this.slug);
          // Check this slug, if it is already in database, add the okuma to its directory
      
              axios.get(`http://localhost:3030/slugs/${this.slug}`)
              .then(function (response) {
                let newdata  = response.data[0]._id;
                console.log(newdata);
                })
                .then((newdata)=>{
                    if (newdata) {
                  // THERE IS ALREADY A POST WITH THIS SLUG IN DB, ADD THE DATA TO THIS SLUG'S ID response.id , {slug: this.slug}
                    return axios.post(`http://localhost:3030/posts/${newdata}/add`, {
                    text: this.okuma,
                    author: {username: 'test'}
                    })
                    .then(function (response) {
                      console.log(response);
                      console.log("Bu slugın idsine comment ekledim");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } else {
                  // CREATE A NEW POST USING THIS SLUG WITH NEW ID
              return axios.post('http://localhost:3030/addpost', {
                title: this.entry,
                slug: this.slug
                })
                .then(function (response) {
                  console.log(response);
                  console.log("Yeni post");
                })
                .catch(function (error) {
                  console.log(error);
                });
                }

                })
              .catch(function (error) {
                console.log(error);
              });


          // Empty The Fields
            this.okuma = null
            this.entry =null

            // Refresh entries data

            // Show a feedback with transition
            // this.feedback= "Added"

        } else {
            
            // User did not sign in, Push router to Login/sign Up page
        }
      }
    },
  props: {
    msg: String
  },
  created(){
       
      axios.get("http://localhost:3030/posts")
      .then(response => {
        this.mains = JSON.stringify(response.data)
        this.mains = JSON.parse(this.mains)

        console.log("Main Data:", this.mains)
        console.log("title:", this.titles)
        console.log("comments:", this.comments)

        //  for (var i = 0; i < this.mains.length; i++) {
        //   var currentData = this.mains[i];
        //   this.titles.push(currentData.title);
        //     for (var j=0; j < currentData.comments.length; j++) {
        //     var currentComment = currentData.comments[j];
        //     this.comments.push(currentComment.text);
        //       }
        // }
        for (var i = 0; i < this.mains.length; i++) {
          var currentData = this.mains[i];
          this.titles.push(currentData.title);
            var currentComment = currentData.comments[currentData.comments.length -1];
            this.comments.push(currentComment.text);
        }
      })
      .catch(error => {
        console.log(error);
        });


  },
  mounted(){
       

  }
}
</script>

<style>
.m-lg {
  margin: 1em;
}
.s-lg {
  margin: 0.2em;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#main-form{
 background: #42b983;     
    }
</style>
