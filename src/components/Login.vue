<template>
  <div class="home">
    <div>
      <b-button @click="onToken()" variant="outline-primary">Войти</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from "@/store";

@Component({
  components: {

  },
})
export default class Login extends Vue {

  onToken():void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function() {
      socket.send(JSON.stringify({
        operation: "getToken",
        token: ""
      }))
    }
    socket.onmessage = function(event) {
      store.commit('getToken', JSON.parse(event.data).token)
    }
    this.$router.push({ name: 'dashBoard'})
  }
}
</script>