<template>
  <div class="pa-1 d-flex align-center">
    <v-avatar size="33" tile><img :src="item.img" alt="" /> </v-avatar>
    <v-badge
      size="20"
      :style="{ right: item.gameLevel > 9 ? '15px' : '12px' }"
      style="top: -3px;"
      :content="item.gameLevel"
    >
    </v-badge>
       <slot name="editAmount"></slot>
     <slot name="amount"></slot>
    <div class="ml-3">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  components: {},
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>
