<template>
  <div class="container-home">
    <form
      @submit.prevent="searchCountries"
      class="shadow border rounded-pill mx-sm-5 p-2 d-flex justify-content-between flex-column flex-sm-row"
    >
      <div class="mx-4">
        <label class="d-block fw-bold"> País </label>
        <input
          @click="ShowFilter"
          type="text"
          v-model="countryName"
          placeholder="Ej. Peru, Russia, etc."
          class="custom-input w-100 border-0 border-bottom bg-transparent"
        />
      </div>
      <button
        type="submit"
        class="rounded-pill bg-primary text-white border-0 px-3 mx-2 my-1"
      >
        <b-icon icon="search"></b-icon><span class="px-2">Buscar</span>
      </button>
      <ContinentsModal
        v-if="isVisibleFilter"
        @selectContinent="selectContinent"
        :continentActiveSelected="continentCodeSelected"
      />
    </form>
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
    <div class="d-flex">
      <ul class="grid" v-if="data && !loading">
        <li
          class="shadow rounded overflow-hidden custom-item"
          v-for="country in data.countries"
          :key="country.code"
          @click="ShowDetails"
        >
          <div class="overflow-hidden d-flex align-items-center custom-card">
            <b-img-lazy
              :src="country.imageCountry"
              :alt="`bandera de ${country.name}`"
            >
            </b-img-lazy>
          </div>

          <div
            class="d-flex justify-content-start align-items-center p-3 gap-2"
          >
            <b-img-lazy
              :src="country.imageFlag"
              :alt="`bandera de ${country.name}`"
            >
            </b-img-lazy>
            <div>
              <h6 class="my-0">{{ country.name }}</h6>
              <p class="my-0">{{ country.continent.name }}</p>
            </div>
          </div>
        </li>
      </ul>
      <ViewDetailsCountryModal
        v-if="isVisibleDetails"
        :codeCountry="`PE`"
        @close="isVisibleDetails = false"
      />
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import ContinentsModal from "@/components/modals/ContinentsModal.vue";
import ViewDetailsCountryModal from "@/components/modals/ViewDetailsCountryModal.vue";
import Service from "@/services/index.js";

export default {
  name: "HomeView",
  components: {
    ContinentsModal,
    ViewDetailsCountryModal,
  },

  data() {
    return {
      continentCodeSelected: "",
      isVisibleFilter: false,
      isVisibleDetails: false,
      imageCoutryUrl: "",
      countryName: "",
      loading: false,
      error: null,
      data: null,
      query: gql`
        query GetCountriesByName($name: String, $continent: String) {
          countries(
            filter: { name: { regex: $name }, continent: { regex: $continent } }
          ) {
            code
            name
            continent {
              name
            }
          }
        }
      `,
    };
  },

  async created() {
    await this.searchCountries();
  },

  methods: {
    async selectContinent(continentCode) {
      this.isVisibleFilter = false;
      this.continentCodeSelected = continentCode;
    },

    ShowDetails() {
      this.isVisibleDetails = !this.isVisibleDetails;
    },

    ShowFilter() {
      this.isVisibleFilter = !this.isVisibleFilter;
    },

    async getImagesCountry(countryName) {
      const params = { country: countryName };
      const response = await Service.getImages(params);
      return response.results[0].urls.small;
    },

    getImageUrl(imageId) {
      return `https://flagsapi.com/${imageId}/flat/64.png`;
    },

    async searchCountries() {
      this.isVisibleFilter = false;
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$apollo.query({
          query: this.query,
          variables: {
            name: this.countryName,
            continent: this.continentCodeSelected,
          },
        });
        let countries;

        if (this.countryName) {
          countries = response.data.countries;
        } else {
          countries = response.data.countries.slice(0, 100);
        }

        const countriesWithImages = await Promise.all(
          countries.map(async (country) => {
            const imageCountry = await this.getImagesCountry(country.name);
            const imageFlag = this.getImageUrl(country.code);
            return { ...country, imageCountry, imageFlag };
          })
        );
        this.data = { countries: countriesWithImages };
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    continentCodeSelected: {
      handler() {
        this.searchCountries();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.custom-input:focus-visible {
  outline: none;
  border-color: #0d6efd !important;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  padding: 40px;
}

.container-home {
  max-width: 930px;
  margin: 0 auto;
}
.custom-card {
  height: 120px;
  min-height: 120px;
}

form {
  position: relative;
}

.custom-item {
  cursor: pointer;
}
.custom-item:hover {
  background: #0d6efd;
  color: white;
}
</style>
