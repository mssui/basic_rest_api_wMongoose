/* eslint-disable no-else-return */
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
          <b-field>
            <b-input
              v-model="entry"
              placeholder="Ambulance"
            />
          </b-field>
        </div>
        <div class="block  is-pulled-right">
          <h2>Diye yazılır,</h2>
        </div>
        <div class="block">
          <b-field>
            <b-input
              v-model="read"
              placeholder="Embulıns"
            />
          </b-field>
        </div>
        <div class="block  is-pulled-right">
          <h2>Diye okunur.</h2>
        </div>
      </div>
    </div>
    <!-- Send button & Feedback -->
    <div class="columns is-mobile">
      <div class="column is-half is-offset-one-quarter ">
        <div class="block ">
          <a
            class="button is-medium is-danger is-pulled-right"
            @click="postSend"
          >
            Gönder
          </a>
        </div>
        <div class="block">
          {{ feedback }}
        </div>
      </div>
    </div>

    <!-- Latest Entries Loop -->
    <div id="contain-loop">
     
    </div>
    <!-- Footer Banner -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>SND</strong> by Aslı Arı. The source code is published<a href="https://github.com/mssui">
            on GitHub
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
import slugify from 'slugify'
import navbar from './navbar.vue'

export default {
  name: 'Mainland',
  data() {
    return {
      mains: [],
      titles: [],
      comments: [],
      author: [],
      list: [],
      listcom: [],
      entry: null,
      read: null,
      slug: null,
      feedback: null,
      user: null,
    };
  },
  components: {
    navbar,
  },
  methods: {
    async postSend(event) {
      event.preventDefault();
      try {
        if (this.entry && this.read) {
          this.slug = slugify(this.entry, { replacement: '-', remove: /[$*_+~.()'"!\-:@]/g, lower: true }).toString(); // Create a slug
        }
        // Check this slug, if it is already in database, add the read to its directory
        const slugRes = await axios.get(`http://localhost:3030/slugs/${this.slug}`);
        const slugId = slugRes.data && slugRes.data[0] && slugRes.data[0]._id;

        // If Slug is true, save the comment to it's ID
        if (slugId) {
          const postToSlug = await axios.post(`http://localhost:3030/posts/${slugId}/add`, {
            text: this.read,
            author: { username: this.user },
          });
          console.log('Added to existing post');
          return postToSlug;
        // If Slug is false, create a new comment with new post ID
        }
        axios.post('http://localhost:3030/addpost', {
          title: this.entry,
          slug: this.slug,
        }).then((response) => {
          console.log(response.data._id);
          axios.post(`http://localhost:3030/posts/${response.data._id}/add`, {
            text: this.read,
            title: this.entry,
            author: { username: this.user },
          }).then((final) => {
            console.log('created', final);
            this.entry = null;
            this.read = null;
          });
        });
      } catch (error) {
        console.log('error in postSend() =', error);
      }
    },
  },
  props: {
    msg: String,
  },
  created() {
    // Get User Info
    if (localStorage.getItem('user') != null) { this.user = localStorage.getItem('user'); }

    // Get Post Details
    axios.get('http://localhost:3030/posts')
      .then((response) => {
        this.mains = JSON.stringify(response.data);
        this.mains = JSON.parse(this.mains);

        const container = document.getElementById('contain-loop');
        for (let i = 0; i < this.mains.length; i++) {
          const currentData = this.mains[i];
          this.titles.push(currentData.title);

          // Insert InnerHTML
          container.innerHTML += '<div class="column is-full is-centered">'
        + '<div class="box"><article class="media"><div class="media-left"><figure class="image is-64x64"><img src="https://img.icons8.com/doodle/1600/user-female-red-hair.png" alt="Image">'
        + '</figure></div><div class="media-content"> <div class="content"><div class="subtitle is-4 s-lft metincont"></div></div>'
        + '<nav class="level is-mobile"><div class="level-left s-lft"><a class="level-item" aria-label="reply">'
        + '<span class="icon is-small"><i class="fas fa-arrow-alt-circle-up" aria-hidden="true"></i></span></a>'
        + '<a class="level-item " aria-label="retweet"><span class="icon is-small">'
        + '<i class="fas fa-arrow-alt-circle-down" aria-hidden="true"></i></span></a><a class="level-item" aria-label="like">'
        + '<span class="icon is-small"> <i class="fas fa-heart" aria-hidden="true"></i>'
        + '</span></a></div></nav></div></article></div></div>';

          const span = document.createElement('span');
          const read = document.createElement('a');
          read.className = 'read';
          document.getElementsByClassName('metincont')[i].appendChild(read).innerHTML += currentData.title;
          document.getElementsByClassName('metincont')[i].appendChild(span).innerHTML += ' diye yazılır, ';

          // Loop Comment Titles
          const currentComment = currentData.comments[currentData.comments.length - 1];
          this.comments.push(currentComment.text);
          const write = document.createElement('span');
          write.className = 'write';
          document.getElementsByClassName('metincont')[i].appendChild(write).innerHTML += `${currentComment.text} diye okunur.`;

          // Loop Usernames

          const currentUser = currentData.comments[currentData.comments.length - 1];
          this.author.push(currentUser.author.username);
          const username = document.createElement('span');
          username.className = 'is-pulled-right s-top has-text-weight-bold cap';
          document.getElementsByClassName('content')[i].appendChild(username).innerHTML += currentUser.author.username;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {

  },
};
</script>

<style>

input[type=text] {
  height: 4em !important;
}

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
