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

      <b-nav-item-dropdown  text="Lang" right>
        <b-dropdown-item v-for="(item, i) in $store.state.locationArray"
                         :key="i">{{ item.name }}</b-dropdown-item>
      </b-nav-item-dropdown>

      <v-col cols="auto">
        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
            >EDIT
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                  color="primary"
                  dark
              ><h4>Редактор локаций</h4>
              </v-toolbar>
              <v-card-text>
                <div class="input-location">
                  <v-text-field v-model="nameLocation" @keyup.enter="nameLocation.length &&addLocation()"
                                label="Введите название локации"></v-text-field>
                  <b-button @click="addLocation()" :disabled="nameLocation === ''" variant="primary">Add</b-button>
                </div>
                <v-list class="list" flat>
                  <v-subheader>Локации</v-subheader>
                  <v-list-item-group
                      color="primary"
                  >
                    <v-list-item
                        v-for="(item, i) in $store.state.locationArray"
                        :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon @click="deleteLocation(item.id)">mdi-delete</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="dialog.value = false"
                >Закрыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import store from "@/store";

@Component

export default class NavBar extends Vue {

  nameLocation = '';

  getLocation(): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "getLocations",
        token: String(store.state.token)
      }));
    };
    socket.onmessage = function (event) {
      store.commit('getLocationArray', JSON.parse(event.data).data);
    }
  }

  mounted(): void {
    this.getLocation();
  }

  deleteLocation(item: number): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "deleteLocation",
        token: String(store.state.token),
        id: String(item)
      }));
    };
    this.getLocation();
  }

  addLocation(): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    let nameLoc = this.nameLocation
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "addLocation",
        token: String(store.state.token),
        name: nameLoc
      }));
    };
    this.getLocation();
    this.nameLocation = ''
  }

}
</script>

<style lang="sass">
  .dropdown-menu
    height: 250px
    overflow: auto

  .v-list-item__title
    text-align: left

  .alert
    position: absolute
    z-index: 20

  .input-location
    display: flex
    align-items: center
    justify-content: space-between

    div
      max-width: 380px

  .list
    .v-item-group
      height: 50vh
      overflow: auto

    .v-item-group::-webkit-scrollbar
      width: 9px

    .v-item-group::-webkit-scrollbar-track
      background-color: #e4e4e4
      border-radius: 100px

    .v-item-group::-webkit-scrollbar-thumb
      background-color: rgba(79, 78, 78, 0.54)
      border-radius: 100px


</style>