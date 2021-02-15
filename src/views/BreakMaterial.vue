<template>
  <v-container>
    <h2 class="text-center mb-1">Fleece breakdown demo</h2>
    <p class="text-center">Core rule: 8 fleece -> 10 lower level fleece</p>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-card outlined color="#FFF4D0">
          <v-container>
            <h4 class="mb-1">Your inventory</h4>
            <div v-if="!edit">
              <div v-for="item in userInventory" :key="item.id">
                <ItemDisplay :item="item">
                  <template v-slot:amount>
                    <div class="ml-3 mr-n1">{{ item.amount }} x</div></template
                  ></ItemDisplay
                >
              </div>
              <div class="d-flex justify-end">
                <v-btn dark small @click="edit = true">Edit inventory</v-btn>
              </div>
            </div>

            <div v-else>
              Enter numbers for items you wish to have in your inventory

              <ItemDisplay
                v-for="(item, i) in fleece"
                :key="item.id"
                :item="item"
              >
                <template v-slot:editAmount>
                  <v-text-field
                    type="number"
                    solo
                    style="max-width: 90px"
                    dense
                    hide-details
                    class="ml-3"
                    v-model="customInventory[i].amount"
                  ></v-text-field
                ></template>
              </ItemDisplay>
              {{ customInventory }}
              <div class="d-flex justify-end">
                <v-btn small text @click="edit = false">Cancel</v-btn>
                <v-btn dark small @click="saveCustomInventory"
                  >Save inventory</v-btn
                >
              </div>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3 class="text-center">Choose item</h3>

        <div class="text-caption text-center">
          Item you wish to break down into lower level materials
        </div>

        <div
          v-if="convertibleItems.length > 0"
          class="scale-in"
          :key="convertibleItems.length"
        >
          <div v-for="item in convertibleItems" :key="item.id">
            <v-card
              outlined
              class="mb-1"
              @click="setStartMaterial(item)"
              :class="{
                selectedStyle: startMaterial
                  ? item.level === startMaterial.level
                  : false,
              }"
              :ripple="false"
            >
              <ItemDisplay :item="item">
                <template v-slot:amount>
                  <div class="ml-3 mr-n1">{{ item.amount }} x</div></template
                >
              </ItemDisplay>
              <!--             <div v-if="startMaterial">
              <div
                v-if="startMaterial.level === item.level"
                class="d-flex justify-space-between"
              >
                <v-btn small dark>all</v-btn>
              </div>
            </div> -->
            </v-card>
          </div>
        </div>
        <div v-else class="text-center red--text mt-2">
          No eligible items :(
        </div>
      </v-col>
      <v-col>
        <h3 class="text-center">Choose level</h3>
        <div class="text-caption text-center">
          Level you wish to break your selected materials down to
        </div>
        <div v-if="startMaterial" class="scale-in" :key="startMaterial.level">
          <v-card
            outlined
            v-for="item in availableBreakdownLevels"
            :key="item.id"
            class="mb-1"
            :class="{ selectedStyle: item.level === endLevel }"
            :ripple="false"
            @click="setEndItemLevel(item.level)"
          >
            <ItemDisplay :item="item" />
          </v-card>
        </div>
      </v-col>
      <v-col>
        <h3 class="text-center">Result</h3>
        <div class="scale-in" v-if="resultMaterials">
          <div v-for="item in resultMaterials" :key="item.id">
            <v-card outlined v-if="item.amount > 0" class="mb-1">
              <ItemDisplay :item="item">
                <template v-slot:amount>
                  <div class="ml-3 mr-n1">{{ item.amount }} x</div></template
                >
              </ItemDisplay>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn text class="mr-1" @click="fullReset">Reset</v-btn>
      <v-btn
        :dark="!!resultMaterials"
        @click="updateInventory"
        :disabled="!resultMaterials"
        >Save</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import ItemDisplay from "@/components/ItemDisplay.vue";
export default {
  props: [""],
  components: { ItemDisplay },
  data: () => ({
    edit: false,
    startMaterial: null,
    endLevel: null,
    resultMaterials: null,
    customInventory: [
      { level: 1, amount: 0 },
      { level: 2, amount: 0 },
      { level: 3, amount: 0 },
      { level: 4, amount: 0 },
      { level: 5, amount: 0 },
      { level: 6, amount: 0 },
      { level: 7, amount: 0 },
    ],
    fleece: [
      {
        name: "Featherweight Fleece",
        level: 1,
        gameLevel: 1,
        id: "fleece1",
        img: "https://i.ibb.co/q07yrfp/1.png",
      },
      {
        name: "Gauzygoss Fleece",
        level: 2,
        gameLevel: 15,
        id: "fleece2",
        img: "https://i.ibb.co/TrXHPcx/2.png",
      },
      {
        name: "Duskdown Fleece",
        level: 3,
        gameLevel: 30,
        id: "fleece3",
        img: "https://i.ibb.co/4sBQwSk/3.png",
      },
      {
        name: "Shoresheer Fleece",
        level: 4,
        gameLevel: 45,
        id: "fleece4",
        img: "https://i.ibb.co/bvFr07g/4.png",
      },
      {
        name: "Cragtweed Fleece",
        level: 5,
        gameLevel: 60,
        id: "fleece5",
        img: "https://i.ibb.co/bvFr07g/4.png",
      },
      {
        name: "Twiltree Fleece",
        level: 6,
        gameLevel: 75,
        id: "fleece6",
        img: "https://i.ibb.co/ysHp6zY/6.png",
      },
      {
        name: "Momeer Fleece",
        level: 7,
        gameLevel: 90,
        id: "fleece7",
        img: "https://i.ibb.co/Gk7fQYK/7.png",
      },
    ],
    userInventory: [
      {
        name: "Gauzygoss Fleece",
        level: 2,
        gameLevel: 15,
        amount: 17,
        id: "fleece2",
        img: "https://i.ibb.co/TrXHPcx/2.png",
      },
      {
        name: "Duskdown Fleece",
        level: 3,
        gameLevel: 30,
        amount: 16,
        id: "fleece3",
        img: "https://i.ibb.co/4sBQwSk/3.png",
      },
    ],
  }),
  methods: {
    setStartMaterial(item) {
      this.startMaterial = item;

      if (this.endLevel) {
        this.calculateEndMaterials();
      }
    },
    setEndItemLevel(level) {
      this.endLevel = level;
      this.calculateEndMaterials();
    },
    calculateEndMaterials() {
      let resultMaterials = [];
      for (
        let index = this.startMaterial.level;
        index >= this.endLevel;
        index--
      ) {
        resultMaterials.push({
          level: index,
          amount: 0,
        });
      }
      resultMaterials[0].amount = this.startMaterial.amount;

      for (let index = 0; index + 1 < resultMaterials.length; index++) {
        let leftover = resultMaterials[index].amount % 8;
        resultMaterials[index + 1].amount =
          ((resultMaterials[index].amount - leftover) / 8) * 10;
        resultMaterials[index].amount = leftover;
      }

      //refactor the result for visuals
      let resultInventory = [];
      resultMaterials.forEach((material) => {
        let newMaterial = this.fleece.find(
          (item) => item.level === material.level
        );
        newMaterial.amount = material.amount;
        resultInventory.push(newMaterial);
      });
      this.resultMaterials = resultInventory;
    },
    updateInventory() {
      this.resultMaterials.forEach((element) => {
        // check if item exists in inventory already (-1 if doesn't)
        let idx = this.userInventory.findIndex(
          (item) => item.level === element.level
        );
        // console.log(idx);

        if (idx > -1) {
          if (this.userInventory[idx].level === this.startMaterial.level) {
            this.userInventory[idx].amount = element.amount;
          } else {
            this.userInventory[idx].amount =
              this.userInventory[idx].amount + element.amount;
          }
        } else {
          // add if doesn't exist
          this.userInventory.push(element);
        }
      });
      //delete empty items from inventory
      for (var i = 0; i < this.userInventory.length; i++) {
        if (this.userInventory[i].amount === 0) {
          this.userInventory.splice(i, 1);
          i--;
        }
      }

      // reorder inventory per game level
      this.userInventory.sort((a, b) => (a.gameLevel > b.gameLevel ? 1 : -1));

      this.reset();
    },
    saveCustomInventory() {
      let newInventory = [];
      let newItems = this.customInventory.filter(
        (textField) => textField.amount > 0
      );
      newItems.forEach((item) => {
        //first convert string to nr
        item.amount = Number(item.amount);
        let newItem = this.fleece.find(
          (baseItem) => baseItem.level === item.level
        );
        newItem.amount = item.amount;
        newInventory.push(newItem);
      });

      this.userInventory = newInventory;

      //reset fields
      this.customInventory = [
        { level: 1, amount: 0 },
        { level: 2, amount: 0 },
        { level: 3, amount: 0 },
        { level: 4, amount: 0 },
        { level: 5, amount: 0 },
        { level: 6, amount: 0 },
        { level: 7, amount: 0 },
      ];
      //   hide inputs
      this.edit = false;
    },
    resetInventory() {
      this.userInventory = [
        {
          name: "Gauzygoss Fleece",
          level: 2,
          gameLevel: 15,
          amount: 17,
          id: "fleece2",
          img: "https://i.ibb.co/TrXHPcx/2.png",
        },
        {
          name: "Duskdown Fleece",
          level: 3,
          gameLevel: 30,
          amount: 16,
          id: "fleece3",
          img: "https://i.ibb.co/4sBQwSk/3.png",
        },
      ];
    },
    reset() {
      this.startMaterial = null;
      this.endLevel = null;
      this.resultMaterials = null;
    },
    fullReset() {
      this.reset();
      this.resetInventory();
    },
  },
  computed: {
    convertibleItems() {
      function isEligible(item) {
        return item.amount > 9 && item.level > 1;
      }
      let items = this.userInventory.filter(isEligible);
      return items;
    },
    highestInventoryLevel() {
      let highestLevel = 0;
      this.userInventory.forEach((fleeceItem) => {
        if (fleeceItem.level > highestLevel) {
          highestLevel = fleeceItem.level;
        }
      });
      return highestLevel;
    },
    availableBreakdownLevels() {
      return this.fleece.slice(0, this.startMaterial.level - 1);
    },
  },
};
</script>

<style>
.selectedStyle {
  border: 3px solid black !important;
}
</style>
