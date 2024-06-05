<template lang="">
    <div class="div-absolute bg-white d-flex flex-column">
        <div class="text-end my-1">
            <span class="cursor-pointer" @click="$emit('close')">✖</span>
        </div>
      <div class="overflow-hidden d-flex align-items-center custom-card rounded">
        <!-- TODO add image -->
        <img
          src=""
          alt=""
        />
      </div>
      <div class="d-flex flex-column justify-content-start">
        <div v-if="loading" class="d-flex justify-content-center align-items-center m-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else-if="error" class="d-flex justify-content-center align-items-center m-5">
            Ocurrió un error, vuelve a intentarlo mas tarde...
        </div>
        <div v-else>
          <div class="d-flex justify-content-start align-items-center gap-2">
            <img :src="`https://flagsapi.com/${data.country.code}/flat/64.png`" />
            <div>
              <h6 class="my-0">{{ data.country.name }}</h6>
              <p class="my-0">{{ data.country.continent.name }}</p>
            </div>
          </div>
          <div>
            <ul class="list-unstyled">
              <li><strong>Code:</strong> <span>{{ data.country.code }}</span></li>
              <li><strong>Capital:</strong> <span>{{ data.country.capital }}</span></li>
              <li><strong>Lenguaje:</strong> <span>{{ data.country.native }}</span></li>
              <li><strong>Moneda:</strong> <span>{{ data.country.currency }}</span></li>
              <pre>{{ data }}</pre>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<<script>
import gql from "graphql-tag";

export default {
  props: {
    codeCountry: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      data: null,
      query: gql`
        query GetDetailsCountry($code: String!) {
          country(code: $code) {
            code
            capital
            currency
            name
            native
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
    async searchCountries() {
      this.loading = true;
      this.error = null;
      try {
          const response = await this.$apollo.query({
              query: this.query,
              variables: { code: this.codeCountry },
            });
        this.data = response.data;
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
.div-absolute {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: auto;
  padding: 0 30px 30px 30px;
}

.custom-card {
  height: 120px;
  min-height: 120px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
