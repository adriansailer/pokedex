<template>
  <v-app>

  
      <pokedex/>
    <v-footer color="red darken-2 white--text" fixed>
    <v-spacer></v-spacer>
    <div>&copy; Adrian Sailer | Pokedex |{{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>

<script>
import pokedex from './components/pokedex';

export default {
  name: 'App',

  components: {
    pokedex,
  },

  data: () => ({
    //
  }),
};
</script>
