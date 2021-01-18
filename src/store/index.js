import Vue from "vue";
import Vuex from "vuex";
// import module1 from "./modules/module1";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {},
    strict: true,
    state: {
      loot: {
          weapon: null,
          quality: null,
          adjective: null,
          origin: null,
      },
      coin: {
        gold: null,
        silver: null,
        copper: null
      },
      qualities: [
        {text: "Common",
        label: "#616161",
        bg: "#ECECEC"},
        {text: "Uncommon",
        label: "#27A75D",
        bg: "#dafddc"},
        {text: "Rare",
        label: "#1E77C8",
       bg: "##D8F1FE"},
        {text: "Epic",
        label: "#612CA4",
        bg: "#E3D8FE"}
          
     ],
      weapons: [
        "Axe",
        "Bottle",
        "Bow",
        "Cutlass",
        "Dagger",
        "Fork",
        "Hammer",
        "Mace",
        "Pan",
        "Pin",
        "Pitchfork",
        "Plank",
        "Shovel",
        "Spoon",
        "Staff",
        "Stick",
        "Sword",
        "Wand",
      ],
      lootAdjectives : [
        "Fantastic",
        "Slippery",
        "Huge",
        "Breathtaking",
        "Treacherous",
        "Glittery",
        "Tender",
        "Panic-inducing",
        "Flexible",
        "Golden",
        "Vibrating",
        "Slightly Smelly",
        "Awesome",
        "Ergonomic",
        "Very Inefficient",
        "Inappropriate",
        "Self Aware",
        "Stubborn",
      ],
      weaponDescriptions :  [
        "Making your enemies full of holes with deadly speed and precision.",
        "Every weapon collector's dream come true!",
        "Yielding this is no easy task.",
        "I foresee fire. Fire and screams." ,
        "Engraved pattern of a raccoon may hold secrets of yore.",
        "Found in the hands of the last great defender.",
        "Best used with caution and baby oil.", 
        "You better hope this weapon chooses you too",
        "If you believe your weapon wants to end all existence, then so it will",
        "Complete awareness, complete focus. A mind sharpened by diligence to a single deadly point." ,
        "Is known to be triggered by approximity of cats",
        "Its massive pommel is maybe trying to compensate for something.",
        "Crocodile leather grips are back in style.",
        "Just large enough to scare a common orc.",
        "Unfortunately dissolves in water.",
        "Swish and flick.",
        "Best combined with a glitter bomb",
        "Prone to rust if not slaying at least 3 enemies a week.",
        "Almost perfect if it would not be pocket sized.",
        "It vibrates of dark magic and many lost lives.",
        "Very effective in winning arguments.",
        "Turning a back to its wielder may be the last thing you do.",
        "Piece of trash, if you ask the elves.",
        "It has proven to betray its previous owners.",
        "Empowered by a phoenix tailfeather.",
        "Spiders flee from it.",
        "Defeats a leprechaun in 2 blinks of an eye.",
        "Curious... very curious, the way this weapon hums.",
        "Not the most effective against rats.",
        "Poke them with the pointy end.",
        "Astoundingly effective in slicing enemies and cheese.",  
    ],
    lootOrigins : [
        "the Assassin",
        "Dominance",
        "the Hobbit",
        "the Mystery",
        "Daytime Napping",
        "the Druids",
        "the Great Goblin",
        "Reckoning",
        "Revenge",
        "the Jedi",
      ]
    },
    getters: {
        getCat: state => {
            return state.cat;
        },
        getRandomOrigin: state => {
            return state.lootOrigins[ Math.floor(Math.random() * state.lootOrigins.length)];
        }
    },
    mutations: {
        generateCoin(state) {
            state.coin.gold = Math.floor(Math.random() * 10) + 1;
           state.coin.silver = Math.floor(Math.random() * 99) + 1;
            state.coin.copper = Math.floor(Math.random() * 99) + 1;
          },
          setOrigin(state, newOrigin) {
                state.loot.origin = newOrigin;
     
          },

          chooseWeapon(state) {
            let pickedWeapon = state.weapons[ Math.floor(Math.random() * state.weapons.length)];
            if (pickedWeapon !== state.loot.weapon) {
                state.loot.weapon = pickedWeapon;
            } else {
              return this.chooseWeapon();
            }
          },
          chooseAdjective(state) {
            let pickedAdjective = state.lootAdjectives[ Math.floor(Math.random() * state.lootAdjectives.length)];
            if (pickedAdjective !== state.loot.adjective) {
                state.loot.adjective = pickedAdjective;
            } else {
              return this.chooseAdjective();
            }
          },
          chooseDescription(state) {
            let pickedDescription = state.weaponDescriptions[ Math.floor(Math.random() * state.weaponDescriptions.length)];
            if (pickedDescription !== state.loot.description) {
                state.loot.description= pickedDescription;
            } else {
              return this.chooseDescription();
            }
          },
          chooseQuality(state) {
            let random = Math.floor(Math.random() * 100) + 1; //nr between 1 and 100
      
            let pickedQuality;
            if (random < 10) {
              pickedQuality = "Epic";
            } else if (random < 25) {
              pickedQuality = "Rare";
            } else if (random < 55) {
              pickedQuality = "Uncommon";
            } else {
              pickedQuality = "Common";
            }
            state.loot.quality = state.qualities.filter(quality =>quality.text === pickedQuality);
            //   return pickedQuality;
          },
    },
    actions: {
        generateLoot(context,{getters}) {
            context.commit("generateCoin")
            let randomOrigin = getters.getRandomOrigin
            console.log(randomOrigin);
        },
    }
});
