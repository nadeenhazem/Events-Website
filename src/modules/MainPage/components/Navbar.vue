<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand text-danger fw-bold fst-italic fs-4" href="/"
        >Events</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon bg-muted text-muted"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link text-muted" href="#allEvents">All Events </a>
          </li>

          <li class="nav-item">
            <a class="nav-link text-muted" href="#aboutUs">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-muted" href="#contactUs">Contact Us</a>
          </li>
        </ul>
        <span class="text-muted mt-2 me-2">
          {{ userStore?.userData?.name }}
        </span>
        <ul class="navbar-text me-5 pe-5 mb-0 pb-0 list-unstyled">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle no-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-expanded="false"
              title="Account"
            >
              <i class="bi bi-person fs-4 text-muted"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <p
                class="dropdown-item text-muted"
                role="button"
                @click="logoutUser"
              >
                Logout
              </p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../../Auth/store";
import { useRouter } from "vue-router";
import axios from "axios";
export default defineComponent({
  setup() {
    const userStore = useAuthStore();
    const userData = ref(userStore.userData);
    const router = useRouter();
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          "https://interview.development.cat-sw.com/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        localStorage.removeItem("token");
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    return {
      userStore,
      userData,
      logoutUser,
    };
  },
});
</script>
<style scoped>
.no-arrow::after {
  display: none !important;
}
.nav-link:hover {
  color: #000 !important;
}
.dropdown-menu {
  min-width: fit-content;
}
.navbar-toggler-icon {
  filter: invert(60%) sepia(0%) saturate(0%) hue-rotate(175deg) brightness(90%)
    contrast(85%);
}
</style>
