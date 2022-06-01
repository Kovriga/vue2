<template>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>главная страница</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text>{{ $store.state.token }}</b-nav-text>
      </b-navbar-nav>
    </b-collapse>

    <b-nav-item-dropdown text="Lang" right>
      <b-dropdown-item>EN</b-dropdown-item>
      <b-dropdown-item>EN</b-dropdown-item>
      <b-dropdown-item>EN</b-dropdown-item>
      <b-dropdown-item>EN</b-dropdown-item>
      <b-dropdown-item>EN</b-dropdown-item>
    </b-nav-item-dropdown>

    <b-button variant="outline-primary" v-b-modal.modal-1 right>EDIT</b-button>

    <b-modal id="modal-1" title="Редактор локаций">
      <b-card header="Card with list group">
        <b-list-group v-for="(index, row) in locations" :key="index">
            <b-list-group-item href="#">{{row}}</b-list-group-item>
        </b-list-group>

        <p class="card-text mt-2">
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
          consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
          mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
        </p>
      </b-card>
    </b-modal>

  </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component

export default class NavBar extends Vue{

}
</script>

<style scoped>

</style>