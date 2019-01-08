<template>
<div class="app">
<navbar />
<!-- Main Banner -->
  <section class="hero is-primary is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Animation
        </h1>
        <h2 class="subtitle">
          Comes here
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
  
      <!-- Latest Entries Loop -->
  <div id="contain-loop">
  <!-- <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth m-lg">
    <div class="card-content">
      <p class="read">"Ogilvy </p>diye yazılır, 
      <p class="write">Ogilvi diye okunur.”</p>
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
  </div> -->




<!-- <div class="column is-full is-centered">
   <div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://img.icons8.com/doodle/1600/user-female-red-hair.png" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <div class="subtitle is-4 s-lft metincont"><a class="read" href="#">Ogilvy </a> diye yazılır,<span class="write"> Ogilvi</span> diye okunur. </div>
        <span class="is-pulled-right s-top"> <strong>John Smith</strong></span>
      </div>
      <nav class="level is-mobile">
        <div class="level-left s-lft">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
</div> -->

</div>
<!-- Footer Banner -->
  <footer class="footer">
    <div class="content has-text-centered">
    <p><strong>SND</strong> by Aslı Arı. The source code is published<a href="https://github.com/mssui"> on GitHub</a></p>
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
        author: [],
        list: [],
        listcom: [],
        entry: null,
        read: null,
        slug: null,
        feedback: null,
        user: null
        }
    },
  components: {
      navbar
    },
  methods: {             
        postSend: async function (event){
          event.preventDefault();
        try {
          if (this.entry && this.read) { 
          this.slug = slugify(this.entry, {replacement: '-',remove: /[$*_+~.()'"!\-:@]/g,lower: true}).toString(); //Create a slug
        }
        // Check this slug, if it is already in database, add the read to its directory
        let slugRes = await axios.get(`http://localhost:3030/slugs/${this.slug}`);
        let slugId  = slugRes.data && slugRes.data[0] && slugRes.data[0]._id;

        // If Slug is true, save the comment to it's ID
        if (slugId) {
          const postToSlug = await axios.post(`http://localhost:3030/posts/${slugId}/add`, {
                                  text: this.read,
                                  author: {username: this.user}});
                                  console.log('Added to existing post');
          return postToSlug;
        // If Slug is false, create a new comment with new post ID
        } else {
          axios.post('http://localhost:3030/addpost', {
                                title: this.entry,
                                slug: this.slug}).then(response=>{
                                  console.log(response.data._id)
                                      axios.post(`http://localhost:3030/posts/${response.data._id}/add`, {
                                      text: this.read,
                                      title: this.entry,
                                      author: {username: this.user}}).then(final => {console.log('created', final)
                                      this.entry = null
                                      this.read = null
                                      })
                                })
        }
        } catch(error){
        console.log("error in postSend() =", error);
    }
      }         
    },
  props: {
    msg: String
    },
  created(){
      // Get User Info
      if (localStorage.getItem('user') != null){this.user = localStorage.getItem('user');}

       // Get Post Details                 
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
        // Loop Post Titles  
        
        var container = document.getElementById("contain-loop");
        for (var i = 0; i < this.mains.length; i++) {
          var currentData = this.mains[i];
          this.titles.push(currentData.title);
          container.innerHTML += '<div class="column is-full is-centered">' +
    '<div class="box"><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="https://img.icons8.com/doodle/1600/user-female-red-hair.png" alt="Image">' +
      '</figure></div><div class="media-content"> <div class="content"><div class="subtitle is-4 s-lft metincont"></div></div>' +
      '<nav class="level is-mobile"><div class="level-left s-lft"><a class="level-item" aria-label="reply">' +
       '<span class="icon is-small"><i class="fas fa-arrow-alt-circle-up" aria-hidden="true"></i></span></a>' +
        '<a class="level-item " aria-label="retweet"><span class="icon is-small">' +
        '<i class="fas fa-arrow-alt-circle-down" aria-hidden="true"></i></span></a><a class="level-item" aria-label="like">' +
         '<span class="icon is-small"> <i class="fas fa-heart" aria-hidden="true"></i>' +
          '</span></a></div></nav></div></article></div></div>';
          var span = document.createElement('span');
          var read = document.createElement('a');
          read.className = 'read';
          document.getElementsByClassName('metincont')[i].appendChild(read).innerHTML += currentData.title ;
          document.getElementsByClassName('metincont')[i].appendChild(span).innerHTML += ' diye yazılır, ';
          // Loop Comment Titles  
          var currentComment = currentData.comments[currentData.comments.length -1];
          this.comments.push(currentComment.text);
          var write = document.createElement('span');
          write.className = 'write';
          document.getElementsByClassName('metincont')[i].appendChild(write).innerHTML += currentComment.text + ' diye okunur.';
          
          // Loop Usernames  

          var currentUser = currentData.comments[currentData.comments.length -1];
          this.author.push(currentUser.author.username);
          var username = document.createElement('span');
          username.className = 'is-pulled-right s-top has-text-weight-bold cap';
          document.getElementsByClassName('content')[i].appendChild(username).innerHTML += currentUser.author.username;
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

input[type=text] {    
  height: 4em !important;    
}    
 
/* .read {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  color:blueviolet;
}

.write{
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  color:cadetblue;
} */

.stable-text{
  display: inline-block;
  font-size: 18px;
}
.cap:first-letter {
    text-transform:capitalize;
}
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
