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
          // let user= firebase.auth().currentUser.uid
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


console.log('List',this.list);

  },
  mounted(){
       

  //   for (var i = 0; i < this.mains.length; i++) {
  //   var currentData = this.mains[i];
  //   this.titles.push(currentData.title);
  //     for (var j=0; j < currentData.comments.length; j++) {
  //     var currentComment = currentData.comments[j];
  //     this.comments.push(currentComment.text);
  //       }
  // }
  //        var data = [ { "title": "Yeni bir comment", "slug": "yeni-bir-comment", "id": "5c111f2a71ee9d4498447d1a", "comments": [ { "author": { "username": "David" }, "_id": "5c111f4171ee9d4498447d1b", "text": "Yeni bir comment", "__v": 0 } ] }, { "title": "Ogilvy", "slug": "ogilvy", "id": "5c1141e113667615383ae693", "comments": [ { "author": { "username": "David" }, "_id": "5c11421d13667615383ae694", "text": "ogilvi", "__v": 0 }, { "author": { "username": "Aslı" }, "_id": "5c11422a13667615383ae695", "text": "ogilviy", "__v": 0 } ] }, { "title": "ambulance", "slug": "ambulance", "id": "5c1142e413667615383ae69a", "comments": [ { "author": { "username": "David" }, "_id": "5c11430313667615383ae69b", "text": "embulıns", "__v": 0 }, { "author": { "username": "Asli" }, "_id": "5c11431f13667615383ae69c", "text": "ambulans", "__v": 0 } ] } ];
  //       var titles = [ambulance];
  //       var comments = [ambulıns, ambulans, embulıns, ];
  //       for (var i = 0; i < data.length; i++) {
  //           titles.push(data[i].title);
  //           comments.push(data[i].comments[i].text);
  //               };
        
  //               console.log(titles);
  //               console.log(comments);
      
  //     Last Comment için
      // this.mains[i].title && this.mains[i].comments[comments.length]
    // console.log(this.mains[0].comments[comments.length]);
    

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
