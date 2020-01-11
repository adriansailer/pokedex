<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" @click="getPokemonDetail()" dark v-on="on"
          >Show Info</v-btn
        >
      </template>
      <v-card v-if="pokemon">
        <v-card-actions class="red ">
          <v-card-title class="headline text-uppercase white--text">{{
            pokemon.species.name
          }}</v-card-title>
          <v-spacer></v-spacer>

          <v-btn
            color="white darken-1"
            class="headline text-uppercase"
            text
            @click="dialog = false"
            >x</v-btn
          >
        </v-card-actions>

        <v-img
          v-if="number < 10"
          height="250"
          :src="pic + '00' + number + '.png'"
        ></v-img>
        <v-img
          v-if="number >= 10 && number <= 99"
          height="250"
          :src="pic + '0' + number + '.png'"
        ></v-img>

        <v-img
          v-if="number >= 100"
          height="250"
          :src="pic  + number + '.png'"
        ></v-img>

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
      dialog: false,
      pokemon: null,
      pic: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
    };
  },
  methods: {
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
        });
    }
  },
  created() {}
};
</script>
