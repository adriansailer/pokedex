<template>
  <v-card class="mx-auto">
    <v-app-bar dark color="red darken-1">
    
      <v-toolbar-title>Pokedex</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
            v-model="search"
           
            clearable
            
            type="text"
          ></v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
  
      <v-row dense>
        <v-col v-for="(pokemon, i) in pokemons" :key="i" cols="6">
          <v-card  
        class="elevation-6"
          dark>
           
          
                <v-card-title
                  class="  text-uppercase"
                  v-text="pokemon.name"
                ></v-card-title>

               
           
<v-card-text>
              <v-avatar class="ma-4" size="100" tile>
                <img :src="avatar + (i+1)+'.png'">
              </v-avatar>
</v-card-text>
            <v-card-actions class="mt-n4">
              <v-spacer ></v-spacer>
      <app-details :pName="pokemon.name" :number="(i+1)"></app-details>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
const axios = require("axios");

export default {
 

  data: () => ({
    pokemons: "",
    search: "",
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
   
  }),

  computed: {
    searchPokemon(){
      return this.pokemons.filter((pokemon)=>{
        return pokemon.name.match(this.search)
      })
    }
  },
  

  methods: {
    getPokemonList() {
          var self = this
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
         .then(function (response) {
       
    // handle success
  
    self.pokemons =response.data.results;
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
  mounted(){
    this.getPokemonList()
  }};
</script>
