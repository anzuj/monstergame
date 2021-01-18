<template>
  <div id="app">
    <v-app>
      <v-main fluid fill-height>
        <!-- <v-btn>Loot gen</v-btn> -->
        <h1 class="text-center hover-pointer">
          {{ pageTitle }} <v-icon large>{{ pageIcon }}</v-icon>
        </h1>
        <v-card class="mx-auto mt-2 pa-3 fade-in" max-width="600">
          <router-view></router-view>
        </v-card>
        <p class="text-center text-caption" v-if="$route.name ==='fight'">
          ..or just have some fun with my
          <a href="/random-loot">loot generator</a>
        </p>
          <p class="text-center text-caption" v-if="$route.name ==='loot'">
          ..or work for the loot in my
          <a href="/fight">lil' monstergame</a>
        </p>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      if (this.$route.name === "fight") {
        return "Lil' monstergame";
      } else if (this.$route.name === "loot") {
        return "Random loot generator";
      } else {
        return "";
      }
    },
    pageIcon() {
      if (this.$route.name === "fight") {
        return "mdi-sword-cross";
      } else if (this.$route.name === "loot") {
        return "mdi-treasure-chest";
      } else {
        return "";
      }
    },
  },
};
</script>
