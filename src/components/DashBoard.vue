<template>
  <div>
    <nav-bar></nav-bar>
    <v-card height="800" class="pa-md-4 ma-lg-4">
      <v-btn
          color="primary"
          @click="isInit = true"
      >Добавить данные
      </v-btn>
      <v-dialog
          v-model="isInit"
          hide-overlay
          persistent
          transition="dialog-top-transition"
          max-width="600"
      >
          <v-card>
            <v-toolbar
                color="primary"
                dark
            ><h4>Добавление данных в таблицу</h4>
            </v-toolbar>
            <v-card-text>
              <div>
                <v-text-field v-model="name" label="Name"></v-text-field>
              </div>
              <v-checkbox
                  v-model="checkbox"
                  label="Status"
              ></v-checkbox>
              <v-select
                  v-model="select"
                  :items="$store.state.locationArray"
                  item-text="name"
                  item-value="id"
                  label="Location"
                  persistent-hint
                  return-object
                  single-line
              ></v-select>
              <v-textarea
                  label="Comment"
                  v-model="comment"
              ></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="isInit = false"
              >Закрыть
              </v-btn>
              <v-btn
                  color="primary"
                  dark
                  @click="addData()"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-data-table
          v-if="$store.state.locationArray.length"
          no-data-text="Добавте данных в таблицу"
          height="500"
          :headers="headers"
          :items="$store.state.dataArray"
          :hide-default-footer="true"
          :disable-pagination="true"
          :self="true"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-simple-checkbox
              v-model="item.status"
              disabled
          ></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="openEditDialog(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteData(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-card-text class="text-center py-6 mt-9" v-else>
        <h1 class="text-xs-center">Для начало работы добавьте локации</h1>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import store from "@/store";

@Component({
  components: {NavBar}
})

export default class DashBoard extends Vue {

  checkbox = false;
  name = '';
  comment = '';
  select = '';
  id = '';
  isInit = false

  headers = [
    {text: 'ID', value: 'id'},
    {text: 'Name', value: 'name',},
    {text: 'Location', value: 'inputLocation'},
    {text: 'Status', value: 'status'},
    {text: 'Comment', value: 'comment'},
    {text: 'Actions', value: 'actions', sortable: false,},
  ];

  mounted(): void {
    this.getData()
  }

  openEditDialog(item: any): void {
    console.log(item)
    this.checkbox = item.status;
    this.name = item.name;
    this.comment = item.comment;
    this.select = item.inputLocation;
    this.id = item.id
    this.isInit = true;
  }

  getData(): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "getData",
        token: String(store.state.token)
      }));
    };
    socket.onmessage = function (event) {
      store.commit('getDataArray', JSON.parse(event.data).data);
    }
  }

  addData(): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    let nameLoc = this.name;
    let com = this.comment;
    let status = this.checkbox;
    let loc = this.select;
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "addData",
        token: String(store.state.token),
        name: String(nameLoc),
        inputLocation: String(loc),
        status: Boolean(status),
        comment: String(com)
      }));
    };
    this.name = '';
    this.comment = '';
    this.checkbox = false;
    this.select = '';
    this.getData();
  }

  deleteData(item: string): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "deleteLocation",
        token: String(store.state.token),
        id: String(item)
      }));
    };
    this.getData();
  }

}
</script>

<style lang="sass" scoped>

</style>