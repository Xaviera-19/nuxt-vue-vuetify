<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <!-- 聲明式 -->
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-row class="justify-center">
        <div>{{ mixinMsg }}</div>
      </v-row>
      <v-spacer />
      <!-- 弄個像登入的東西 -->
      <v-row class="justify-end">
        <p v-if="$store.state.data !== null">User Name: {{ $store.state.data?.results[0]?.name?.first }}</p>
        <v-btn @click="fetchUserData">OAO</v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- <slot name="test"></slot> -->
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <slot name="footer"></slot>
    </v-footer>
  </v-app>
</template>

<script>
import { myMixin } from "~/plugins/myMixin";

export default {
  mixins: [myMixin],
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-heart-cog",
          title: "生命週期",
          to: "/life",
        },
        {
          icon: "mdi-head-cog-outline",
          title: "v-ouo",
          to: "/practice",
        },
        {
          icon: "mdi-paw",
          title: "綜合作業",
          to: "/animal/allAnimal",
        },
        {
          icon: "mdi-bat",
          title: "父子組件",
          to: "/component",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    async fetchUserData() {
      // 調用 actions 中的 userData 方法
      await this.$store.dispatch("userData");

      console.log(
        "User Name:",
        this.$store.state.data?.results[0]?.name?.first
      );
    },
  },
};
</script>
