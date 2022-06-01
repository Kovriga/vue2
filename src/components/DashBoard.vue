<template>
  <div>
    <nav-bar></nav-bar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
@Component({
  components: {NavBar}
})

export default class DashBoard extends Vue{

  location = [];
  data = []

}
</script>

<style lang="sass" scoped>

</style>