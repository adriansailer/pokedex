<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="warning" outlined @click="getPokemonDetail()" dark v-on="on"
          >Show Info</v-btn
        >
      </template>
      <v-card v-if="pokemon"  class="elevation-4">
 
        <v-card-actions class="red ">
          <v-card-title class="headline text-uppercase white--text">{{
            pokemon.species.name
          }}
                 </v-card-title>
                
                 
          <v-spacer></v-spacer>
          
   <v-btn class="white--text" text @click="next(num-1)"><</v-btn>
          <v-btn small class="white--text"  text @click="next(num+1)">></v-btn>
          <v-btn
            color="white darken-1"
            class="headline text-uppercase"
            text
            @click="dialog = false"
            >x</v-btn
          >
        </v-card-actions>
 <v-parallax
    dark
    src="https://cache.desktopnexus.com/thumbseg/1327/1327843-bigthumbnail.jpg"
    height="280"
  >
        <v-img
          v-if="num < 10"
          height="250"
          :src="pic + '00' + num + '.png'"
        ></v-img>
        <v-img
          v-if="num >= 10 && num <= 99"
          height="250"
          :src="pic + '0' + num + '.png'"
        ></v-img>

        <v-img
          v-if="num >= 100"
          height="250"
          :src="pic  + num + '.png'"
        ></v-img>
 </v-parallax>
        <v-card-text>
          <v-divider class=" mt-2"></v-divider>

          <v-card-title class="headline text-uppercase "> stats </v-card-title>
          <v-row v-for="(st, index) in pokemon.stats" :key="index" class="ma-2">
            <label class="title text-uppercase" > {{ st.stat.name }}</label>

            <v-progress-linear
              v-model="st.base_stat"
              color="blue-grey"
              height="25"
              reactive
            >
              <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </v-row>

          <v-divider class="mx-4"></v-divider>
          <v-card-title class="headline text-uppercase ">
            abilities
          </v-card-title>

          <v-row>
            <v-chip v-for="(ab, i) in pokemon.abilities" :key="i" class="ma-2 " outlined color="red"   text-color="black" label> 
              {{ ab.ability.name }}
            </v-chip>
          </v-row>

          <v-divider class="mx-4 mt-2"></v-divider>
          <v-card-title class="headline text-uppercase "> moves </v-card-title>
          <v-row>
            <div v-for="(mv, index) in pokemon.moves" :key="index">
              <v-chip v-if="index <= 10" class="ma-2 " outlined color="red" label   text-color="black">
                {{ mv.move.name }}
              </v-chip>
            </div>
          </v-row>

        </v-card-text>
                  <v-divider class="mx-4 mt-2"></v-divider>
        <v-card-actions>
      
 <v-btn color="red darken-1"  text @click="next(num-1)"><</v-btn>
          <v-btn small color="red darken-1"  text @click="next(num+1)">></v-btn>
              <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
const axios = require("axios");
export default {
  props: ["pName", "number"],
  data() {
    return {
      name: null,
      num: "",
      dialog: false,
      pokemon: null,
      pic: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
    };
  },
  methods: {

    next(num){
      console.log(num)
   if(num == 0){
     this.num = 1;
   }
   else{
 this.num = num 
   }
     
 var self = this;
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + this.num)
        .then(function(response) {
          // handle success
          console.log(response);
          self.pokemon = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    
    },
    getPokemonDetail() {
      var self = this;
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + self.pName)
        .then(function(response) {
          // handle success
          console.log(response);
          self.pokemon = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
          self.num = self.number;
        });
    }
  },
  created() {
    
  }
};
</script>
