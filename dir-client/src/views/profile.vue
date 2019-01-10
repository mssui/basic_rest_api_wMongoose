
<template>
<div>
  <navbar />
    <section class="hero is-primary is-medium is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
              Dashboard for {{user}}
          </h1>
          <h2 class="subtitle">
            {{ bio }}
          </h2>
        </div>
      </div>
    </section>
 
<div class="column is-full is-centered">
  <div id="contain-loop">
  </div>
</div>
</div>
</template>

<script>
import navbar from '@/components/navbar'
import axios from 'axios'
export default {
    name: 'profile',
    data() {
        return{
        user: null,
        errors: [],
        posts: [],
        titles: [],
        comments: [],
        userpic: null,
    };
  },
    methods: {
     
    },
    components: {
      navbar
    },
    mounted() {
    if (localStorage.getItem('user') != null){
      this.user = localStorage.getItem('user');
            // if(this.$route.params.nextUrl != null){
            //     this.$router.push(this.$route.params.nextUrl)
      }
      else{
        this.$router.push('/auth/login');
      }  

    axios.get(`http://localhost:3030/posts/${this.user}`)
    .then(response => {
      this.posts = JSON.stringify(response.data);
      this.posts = JSON.parse(this.posts);

        for (var i = 0; i < this.posts.length; i++) {
          var currentData = this.posts[i];
          this.titles.push(currentData.title);
          this.comments.push(currentData.text);
          
          var container = document.getElementById("contain-loop");
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
          document.getElementsByClassName('metincont')[i].appendChild(read).innerHTML +=  currentData.title ;
          document.getElementsByClassName('metincont')[i].appendChild(span).innerHTML += ' diye yazılır, ';
          
          var write = document.createElement('span');
          write.className = 'write';
          document.getElementsByClassName('metincont')[i].appendChild(write).innerHTML += currentData.text + ' diye okunur.';
      }
          })
      .catch(error => {
        console.log(error);
        });
    },
  
  };
</script>

<style >
.s-lft {
  margin-left: 15px;
}
.s-top {
  margin-top: 5px;
}
</style>
