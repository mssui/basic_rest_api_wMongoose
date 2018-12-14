<template>
  <div class="hello">
         <div class="main-form">
            <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="input_text" type="text" data-length="120" v-model="entry">
            <label for="input_text"></label>   
          </div>
          <div class="col s6"><h2>diye yazılır,</h2></div> 
        </div>
        <div class="row alt">
          <div class="input-field col s6">
            <textarea id="textarea2" class="materialize-textarea" data-length="120" v-model="okuma"></textarea>
            <label for="textarea2"></label>         
          </div>
           <div class="col s6"><h2>diye okunur.</h2></div>
        </div>
        <p v-if="feedback" class="red-text center">{{ feedback }}</p> 
        <button class="btn waves-effect waves-light center" @click="gonderi">Gönder</button>
      </form>
    </div>
    
    </div>

<!-- <span v-for="(title, index) in titles" :key="index">
    <span>{{title}}</span><span v-if="index+1 < titles.length"> <br></span>
  </span> -->
<h1>Title Loop</h1>
      <ul>
        <li v-for="(title,index) in titles" :key="index" >
          {{ title }}
        </li>
        
      </ul>

<ul>
  <h1>Comment Loop</h1>
        <li v-for="(comment,index) in comments" :key="index">
          {{ comment }}
        </li>
      </ul>
    
  </div>
</template>
<script>
import axios from 'axios'
import slugify from 'slugify'
export default {
  name: 'mainland',
  data(){
        return{
        mains : [],
        titles : [],     
        comments: [],
        entry: null,
        okuma: null,
        slug: null 
        }
    },
  methods: {
      gonderi(){
          // let user= firebase.auth().currentUser.uid
          // if (user && this.entry && this.okuma) { 

        if ( this.entry && this.okuma) { // Make sure fields are true, later User ID will be in this control like above
            this.slug = slugify(this.entry, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
            }).toString();
          // Check this slug, if it is already in database, add the okuma to its directory

              
              axios.get('http://localhost:3030/slugs', {slug: this.slug})
              .then(function (response) {
                if (response) {
                  // THERE IS ALREADY A POST WITH THIS SLUG IN DB, ADD THE DATA TO THIS SLUG'S ID response.id
                    axios.post('http://localhost:3030/posts/${response.id}/add', {
                    title: this.entry
                    })
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } else {
                  // CREATE A NEW POST USING THIS SLUG WITH NEW ID
              axios.post('http://localhost:3030/addpost', {
                title: this.entry,
                slug: this.slug
                })
                .then(function (response) {
                  console.log(response);
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
        // this.mains = JSON.parse(this.mains)
        console.log("Main Data:", this.mains)
        console.log("title:", this.titles)
        console.log("comments:", this.comments)

         for (var i = 0; i < this.mains.length; i++) {
          var currentData = this.mains[i];
          this.titles.push(currentData.title);
            for (var j=0; j < currentData.comments.length; j++) {
            var currentComment = currentData.comments[j];
            this.comments.push(currentComment.text);
              }
        }
      })
      .catch(error => {
        console.log(error);
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
