
<template>
  <router-view/>    
</template>

<script>
import mainland from './components/mainland'
import login from './views/login'
import register from './views/register'


export default {
  name: 'App',
  components: {
    mainland, login, register
    
  },
  data () {
    return {
      //
    }
  }
}
</script>

