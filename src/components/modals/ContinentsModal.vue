<template>
  <div class="div-absolute p-5 rounded shadow bg-white border">
    <div class="d-flex justify-content-between align-items-center">
      <h3>Continents</h3>
      <p class="text-primary h5 cursor-pointer" @click="clearFilter">Limpiar</p>
    </div>
    <div>
      <div
        v-if="loading"
        class="d-flex justify-content-center align-items-center m-5"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center m-5"
        v-else-if="error"
      >
        Ocurrió un error, vuelve a intentarlo mas tarde...
      </div>
      <section v-if="data" class="grid-continents">
        <div
          v-for="continent in data"
          :key="continent.code"
          class="d-flex flex-column"
        >
          <img
            @click="selectContinent(continent.code)"
            class="img-fluid rounded border custom-img"
            :class="continentActiveSelected == continent.code ? 'border-primary shadow' : 'border-transparent'"
            :src="continent.image"
            :alt="`continente de ${continent.name}`"
          />
          <span class="h6">{{ continent.name }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import africaImage from "../../assets/continents/AF.png";
import norteamericaImage from "../../assets/continents/NA.png";
import sudamericaImage from "../../assets/continents/NA.png";
import oceaniaImage from "../../assets/continents/OC.png";
import antarticaImage from "../../assets/continents/OC.png";
import asiaImage from "../../assets/continents/AS.png";
import europaImage from "../../assets/continents/EU.png";

export default {
    props: {
        continentActiveSelected: {
            type: String,
            required: true,
        }
    },

  data() {
    return {
      loading: false,
      error: null,
      data: null,
      continentImages: {
        AF: africaImage,
        NA: norteamericaImage,
        SA: sudamericaImage,
        OC: oceaniaImage,
        AS: asiaImage,
        EU: europaImage,
        AN: antarticaImage,
      },
      query: gql`
        query {
          continents {
            code
            name
          }
        }
      `,
    };
  },

  async created() {
    await this.searchContinents();
  },

  methods: {

    clearFilter(){
        this.$emit("selectContinent", "");
    },
    selectContinent(continentCode) {
      this.$emit("selectContinent", continentCode);
    },

    async searchContinents() {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$apollo.query({
          query: this.query,
        });

        this.data = response.data.continents.map((continent) => ({
          ...continent,
          image: this.continentImages[continent.code],
        }));
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.grid-continents {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  padding: 0px;
}

.div-absolute {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: auto;
}

.custom-img:hover{
    box-shadow: 0 0.5rem 1rem #0003;
    cursor: pointer;
}
.cursor-pointer{
    cursor: pointer;
}
</style>
