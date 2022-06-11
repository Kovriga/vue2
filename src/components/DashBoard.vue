<template>
  <div>
    <nav-bar></nav-bar>
    <v-card height="800" class="pa-md-4 ma-lg-4">
      <v-btn
          v-if="$store.state.locationArray.length"
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
                  label="Location"
                  persistent-hint
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
          :items="dataArray"
          :hide-default-footer="true"
          :disable-pagination="true"
          :self="true"
      >
        <template v-slot:[`item.inputLocation`]="{ item }">
          <v-select
              @input="editLocation(item)"
              v-model="item.inputLocation"
              :items="$store.state.locationArray"
              item-text="name"
              persistent-hint
              single-line
              return
          ></v-select>
        </template>
        <template v-slot:[`item.name`]="{ item }">
          <div>
            <v-text-field @keyup.enter="editName(item)" v-model="item.name"></v-text-field>
          </div>
        </template>
        <template v-slot:[`item.comment`]="{ item }">
          <div>
            <v-text-field v-model="item.comment" @keyup.enter="editComment(item)"></v-text-field>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-checkbox
              v-model="item.status"
              @click="editStatus(item)"
              value
          ></v-checkbox>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <v-icon
              small
              @click="openEditDialogType(item)"
          >mdi-eye</v-icon>

        </template>
      </v-data-table>
      <v-card-text class="text-center py-6 mt-9" v-else>
        <h1 class="text-xs-center">Для начало работы добавьте локации</h1>
      </v-card-text>
    </v-card>

    <v-dialog
        v-model="isInitType"
        hide-overlay
        persistent
        transition="dialog-top-transition"
        max-width="600"
    >
      <v-card>
        <v-card-text>
          <div class="input-location">
            <v-text-field v-model="nameType" @keyup.enter="nameType.length && addType()"
                          label="Введите Type"></v-text-field>
            <b-button @click="addType()" :disabled="nameType === ''" variant="primary">Add</b-button>
          </div>
          <v-list class="list" flat>
            <v-list-item-group
                color="primary"
            >
              <v-list-item
                  v-for="(item, i) in watchType.type"
                  :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.type"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon @click="deleteType(item)">mdi-delete</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="isInitType = false"
          >Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  isInit = false;
  isInitType = false;
  nameType = '';
  watchType: any = [];

  headers = [
    {text: 'ID', value: 'id'},
    {text: 'Name', value: 'name',},
    {text: 'Location', value: 'inputLocation'},
    {text: 'Status', value: 'status'},
    {text: 'Comment', value: 'comment'},
    {text: 'Type', value: 'type'},
  ];

  mounted(): void {
    this.getData()
  }

  get dataArray():any {
    return JSON.parse(JSON.stringify(this.$store.state.dataArray))
  }

  addType(): void {
    let watchType = this.watchType.id
    let nameType = this.nameType
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "addType",
        token: String(store.state.token),
        id: String(watchType),
        name: String(nameType)
      }));
    };
    this.nameType = '';
    this.getData();
  }

  deleteType(item: any) {
    let watchType = this.watchType.id
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "deleteType",
        token: String(store.state.token),
        id: String(watchType),
        type_id: String(item.id)
      }));
    };
    this.getData();
  }

  openEditDialogType(item:any): void {
    this.watchType = item
    this.isInitType = true
  }

  editLocation(item: any): void{
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "editInputLocation",
        token: String(store.state.token),
        inputLocation: String(item.inputLocation),
        id: String (item.id)
      }));
    };
    this.getData();
  }

  editStatus(item: any) :void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "editStatus",
        token: String(store.state.token),
        status: Boolean(item.status),
        id: String (item.id)
      }));
    };
    this.getData();
  }

  editComment(item: any){
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "editComment",
        token: String(store.state.token),
        comment: String(item.comment),
        id: String (item.id)
      }));
    };
    this.getData();
  }

  editName(item:any): void {
    let socket = new WebSocket("ws://185.246.65.199:8888/");
    socket.onopen = function () {
      socket.send(JSON.stringify({
        operation: "editName",
        token: String(store.state.token),
        name: String(item.name),
        id: String (item.id)
      }));
    };
    this.getData();
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

}
</script>

<style lang="sass" scoped>

</style>