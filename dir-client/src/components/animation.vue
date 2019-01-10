<template>
<section class="hero is-primary is-medium is-bold">
      <div class="hero-body">
        <div class="container">
          <p class="animation">- Animation comes here...</p>
          <p class="animation">- Welcome</p>
        </div>
      </div>
    </section>
</template>

<script>

export default {
  name: 'animation',
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style>

.animation {
  color: white; 
  font-family: "Vollkorn";
  font-size: 34px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 50em;
  animation: type 4s steps(60, end); 
}

.animation:nth-child(2){
  animation: type2 7s steps(60, end);
}
.animation:nth-child(3){
  animation: type2 10s steps(60, end);
}
.animation:nth-child(4){
  animation: type2 15s steps(80, end);
}

@keyframes type{ 
  from { width: 0; } 
} 

@keyframes type2{
  0%{width: 0;}
  50%{width: 0;}
  100%{ width: 100; } 
} 

@keyframes blink{
  to{opacity: .0;}
}

::selection{
  background: black;
}
</style>