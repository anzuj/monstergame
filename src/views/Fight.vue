<template>
  <v-container>
    <!-- PLAYERS -->
    <v-row justify="center">
      <v-col
        v-for="player in players"
        :key="player.name"
        class="text-center"
        :class="{
          'grayed-out':
            (player.name === 'MONSTER' && playerWon) ||
            (player.name === 'YOU' && monsterWon),
        }"
      >
        <v-img
          contain
          height="100"
          max-width="120"
          class="mx-auto transitioned"
          :src="require(`@/assets/avatars/${avatar(player.name)}.png`)"
        />
        <h1>{{ player.name }}</h1>

        <v-progress-linear
          class="rounded"
          height="30"
          :color="
            healthColor(player.name === 'YOU' ? playerHealth : monsterHealth)
          "
          :value="player.name === 'YOU' ? playerHealth : monsterHealth"
        >
          <template v-slot:default="{ value }">
            <strong>{{ value }}</strong>
          </template>
        </v-progress-linear>
      </v-col>
    </v-row>
    <!-- /PLAYERS -->

    <!-- SKILLS -->
    <section v-if="gameIsRunning">
      <v-row justify="center" class="small-pop">
        <v-btn
          v-for="skill in skills"
          :key="skill.name"
          fab
          x-large
          depressed
          :color="skill.color"
          class="mx-1"
          @click="handleSkill(skill.action)"
        >
          <v-icon>{{ skill.icon }}</v-icon>
        </v-btn>
      </v-row>

      <v-row class="mt-4" justify="center">
        <v-btn depressed small @click="giveUp">
          <v-icon small left>mdi-flag-variant-outline</v-icon>Give up
        </v-btn>
      </v-row>
    </section>
    <!-- /SKILLS -->

    <!-- GAME ENDED -->
    <section v-else>
      <div v-if="playerWon">
        <h1>You win! <v-icon color="yellow">mdi-trophy</v-icon></h1>
        <p>Here's the loot you've earned:</p>
        <Loot class="mb-4" />
      </div>

      <h1 class="text-center py-4" v-if="monsterWon">
        <v-icon>mdi-emoticon-poop</v-icon> You lost
        <v-icon>mdi-emoticon-poop</v-icon>
      </h1>

      <v-card
        link
        @click="startGame"
        class="mx-auto pa-3 grey lighten-3 text-center"
      >
        <v-icon x-large> mdi-sword-cross</v-icon> <br />

        <h2>START NEW GAME</h2>
      </v-card>
    </section>
    <!-- /GAME ENDED -->

    <!-- COMBAT LOG -->
    <section v-if="turns.length > 0 && gameIsRunning" class="slide-in">
      <strong>Combat log:</strong>

      <v-card outlined class="pa-3">
        <v-card
          v-for="(turn, i) in turns"
          flat
          class="pa-1 mb-1"
          :class="turn.color"
          :key="i"
        >
          <v-icon left :color="turn.iconColor">{{ turn.icon }}</v-icon>
          {{ turn.text }} <span>{{ turn.isHeal ? "+" : "-" }}</span
          >{{ turn.amount }}
        </v-card>
      </v-card>
    </section>
    <!-- /COMBAT LOG -->
  </v-container>
</template>

<script>
import Loot from "@/components/Loot.vue";
export default {
  props: [""],
  components: { Loot },
  data: () => ({
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
    playerWon: false,
    monsterWon: false,
    players: [
      {
        name: "YOU",
        health: "playerHealth",
      },
      {
        name: "MONSTER",
        health: "monsterHealth",
      },
    ],
    skills: [
      {
        name: "Attack",
        action: "attack",
        icon: "mdi-sword",
        color: "light-blue accent-1",
      },
      {
        name: "Special Attack",
        action: "specialAttack",
        icon: "mdi-creation",
        color: "purple lighten-3",
      },
      {
        name: "Heal",
        action: "heal",
        icon: "mdi-leaf",
        color: "light-green accent-1",
      },
    ],
  }),
  methods: {
    startGame() {
      this.playerWon = false;
      this.monsterWon = false;
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    handleSkill(action) {
      if (action === "attack") {
        this.attack();
      } else if (action === "specialAttack") {
        this.specialAttack();
      } else {
        this.heal();
      }
    },
    attack() {
      let currentAttack = this.randomAmount(4, 8);

      if (this.isCrit()) {
        let critAttack = 2 * currentAttack;
        this.monsterHealth -= critAttack;

        this.turns.unshift({
          isCrit: true,
          text: "Critical hit for ",
          icon: "mdi-star-four-points",
          amount: critAttack,
          color: "light-blue lighten-1",
          iconColor: "yellow",
        });
      } else {
        this.monsterHealth -= currentAttack;
        this.turns.unshift({
          isAttack: true,
          text: "You Attack Monster for ",
          icon: "mdi-sword",
          amount: currentAttack,
          color: "light-blue lighten-3",
          iconColor: "blue darken-1",
        });
      }

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack() {
      let specialDamage = this.randomAmount(10, 20);

      if (specialDamage <= this.monsterHealth) {
        this.monsterHealth -= specialDamage;
      } else {
        this.monsterHealth = 0;
      }

      this.turns.unshift({
        isSpecial: true,
        text: "You Special Attack Monster for ",
        icon: "mdi-creation",
        amount: specialDamage,
        color: "purple lighten-3",
        iconColor: "purple darken-3",
      });

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal() {
      let healAmount = this.randomAmount(12, 17);

      if (this.playerHealth <= 88) {
        this.playerHealth += healAmount;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isHeal: true,
        text: "You heal for ",
        icon: "mdi-leaf",
        amount: healAmount,
        color: "light-green accent-1",
        iconColor: "green darken-1",
      });
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
      this.monsterWon = true;
    },
    randomAmount(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        this.playerWon = true;
        this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth <= 0) {
        this.monsterWon = true;
        this.gameIsRunning = false;
        return true;
      }
    },
    isCrit() {
      //10% crit chance
      if (Math.floor(Math.random() * 10) <= 1) {
        return true;
      }
    },
    monsterAttacks() {
      let monsterDamage = this.randomAmount(7, 12);
      this.playerHealth -= monsterDamage;
      this.checkWin();
      this.turns.unshift({
        isMonster: true,
        text: "Monster hits you for ",
        icon: "mdi-skull",
        amount: monsterDamage,
        color: "red accent-1",
        iconColor: "red darken-1",
      });
    },

    healthColor(health) {
      if (health > 75) {
        return "green";
      } else if (health > 50 && health < 76) {
        return "yellow";
      } else if (health > 25 && health < 51) {
        return "orange";
      } else {
        return "red";
      }
    },
    avatar(player) {
      if (player === "YOU") {
        return this.monsterWon ? "me-defeated" : "me";
      } else if (player === "MONSTER") {
        return this.playerWon ? "monster-defeated" : "monster";
      }
    },
  },
  computed: {},
};
</script>

<style>
.grayed-out {
  opacity: 0.5;
}

.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.5);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
