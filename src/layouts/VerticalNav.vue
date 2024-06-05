<template>
  <b-col cols="12" sm="3" class="bg-secondary px-3 py-2">
    <b-navbar
      toggleable="sm"
      class="d-flex align-items-center flex-sm-column flex-row w-100"
    >
      <h1 class="rounded bg-white p-2 text-center d-block col-6 col-sm-12">
        LOGO
      </h1>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="w-100">
        <ul class="list-unstyled w-100">
          <li>
            <router-link
              class="text-decoration-none rounded p-2 d-flex"
              :class="
                $route.name == 'home'
                  ? 'bg-white text-dark fw-bold'
                  : 'text-white'
              "
              to="/"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              class="text-decoration-none rounded p-2 d-flex"
              :class="
                $route.name == 'about'
                  ? 'bg-white text-dark fw-bold'
                  : 'text-white'
              "
              to="/about"
              >Item 1</router-link
            >
          </li>
          <li>
            <router-link
              class="text-decoration-none rounded p-2 d-flex"
              :class="
                $route.name == 'others'
                  ? 'bg-white text-dark fw-bold'
                  : 'text-white'
              "
              to="/others"
              >Item 2</router-link
            >
          </li>
        </ul>
      </b-collapse>
    </b-navbar>
  </b-col>
</template>

<script>
export default {};
</script>
<style scoped></style>
