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
          <b-field><b-input placeholder="Ambulance" v-model="entry"></b-input></b-field></div>
          <div class="block  is-pulled-right"> <h2>Diye yazılır,</h2></div>
          <div class="block"><b-field><b-input placeholder="Embulıns" v-model="read"></b-input></b-field></div>
          <div class="block  is-pulled-right"><h2>Diye okunur.</h2></div>
    </div>
  </div>
<!-- Send button & Feedback -->
  <div class="columns is-mobile">
      <div class="column is-half is-offset-one-quarter ">
        <div class="block "><a class="button is-medium is-danger is-pulled-right" @click="postSend">Gönder</a></div>
        <div class="block">{{ feedback }}</div>
    </div>
  </div>
<!-- These part for testing, will be deleted -->
  <div class="container">
    <h1 class="title">Title Loop</h1>
    <ul>
      <li v-for="(title,index) in titles" :key="index"> {{ title }} </li>
    </ul>
    <h1 class="title">Comment Loop</h1>
    <ul>      
      <li v-for="(comment,index) in comments" :key="index"> {{ comment }} <br></li>
    </ul>
  </div>
      <!-- Latest Entries Loop -->
  <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth m-lg">
    <div class="card-content">
      <p class="title">"Ogilvy diye yazılır,CORRECT SIDE Ogilvi diye okunur.”</p>
      <p class="subtitle is-pulled-right">Username</p>
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
    <p><strong>SND</strong> by Aslı Arı. The source code is published<a href="https://github.com/mssui">on GitHub</a></p>
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
        read: null,
        slug: null,
        feedback: null
        }
    },
  components: {
      navbar
    },
  methods: {             
        postSend: async () => {
        if (this.entry && this.read) { 
          this.slug = slugify(this.entry, {replacement: '-',remove: /[$*_+~.()'"!\-:@]/g,lower: true}).toString(); //Create a slug
        }
        // Check this slug, if it is already in database, add the read to its directory
        let slugRes = await axios.get(`http://localhost:3030/slugs/${this.slug}`)
        let slugData  = slugRes.data[0]._id;
        // If Slug is true, save the comment to it's ID
        if (slugData) {
          const postSlug = await axios.post(`http://localhost:3030/posts/${slugData}/add`, {
                                  text: this.read,
                                  author: {username: 'test'}});
          return postSlug;
        // If Slug is false, create a new comment with new post ID
        } else {
          const postNew = await axios.post('http://localhost:3030/addpost', {
                                title: this.entry,
                                slug: this.slug})
          return postNew;
        }
        // throw new Error("Error on postSend");
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
          // Select the div and append child for the title
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
