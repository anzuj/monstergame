<template>
  <div>
    <Loot />
  </div>
</template>

<script>
import Loot from "@/components/Loot.vue";
export default {
  props: [""],
  components: { Loot },
  data: () => ({}),
  methods: {
    generate() {
      this.$store.dispatch("generateLoot");
    },
  },
  computed: {
    loot() {
      return this.$store.state.loot;
    },
    coin() {
      return this.$store.state.coin;
    },
  },
};
</script>
