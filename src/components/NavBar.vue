<template>
  <div id="nav-bar">
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

      <b-modal id="modal-1" class="content-in-dialog" title="Редактор локаций">
        <b-list-group flush>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-modal>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component

export default class NavBar extends Vue{
}
</script>

<style lang="sass">
#nav-bar
  #modal-1___BV_modal_outer_
    height: 50vh
    overflow: auto
</style>