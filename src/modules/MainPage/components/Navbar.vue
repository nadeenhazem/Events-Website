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

        <ul
          class="navbar-text me-5 pe-5 mb-0 pb-0 list-unstyled d-md-flex d-block"
        >
          <li class="nav-item d-flex align-items-center me-3">
            <div class="input-group">
              <select
                v-model="selectedFilter"
                class="form-select w-auto border-end-0"
                style="max-width: 105px"
              >
                <option value="name">Name</option>
                <option value="address">Address</option>
              </select>

              <input
                type="search"
                class="form-control border-start-0 border-end-0"
                placeholder="Search..."
                aria-label="Search"
                v-model="searchInput"
              />

              <span
                class="input-group-text border-start-0 bg-transparent"
                @click="clearSearch"
                v-if="clickSearch"
                role="button"
              >
                <i class="bi bi-x-circle text-muted"></i>
              </span>
              <span
                class="input-group-text border-start-0 bg-transparent"
                @click="searchData"
                role="button"
                v-else
              >
                <i class="bi bi-search text-muted"></i>
              </span>
            </div>
          </li>

          <li
            class="nav-item dropdown d-flex text-muted justify-content center"
          >
            <i class="bi bi-person fs-4 text-muted">
              <span class="fs-6">{{ userStore?.userData?.name }}</span></i
            >
          </li>
          <li
            class="nav-item dropdown d-flex text-muted justify-content center ms-md-4 ms-0 me-0 mt-1 fs-5"
          >
            <i
              class="bi bi-box-arrow-right"
              role="button"
              @click="logoutUser"
            ></i>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useAuthStore } from "../../Auth/store";
import { useRouter } from "vue-router";
import axios from "axios";
import { useEventStore } from "../store";

export default defineComponent({
  setup() {
    const getToken = JSON.parse(localStorage.getItem("token"));

    const userStore = useAuthStore();
    const userData = ref(userStore.userData);
    const router = useRouter();
    const searchInput = ref("");
    const clickSearch = ref(false);
    const selectedFilter = ref("name");
    const eventStore = useEventStore();

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
    const searchData = async () => {
      eventStore.setLoading(true);
      try {
        const response = await axios.get(
          `https://interview.development.cat-sw.com/api/event?${selectedFilter.value}=${searchInput.value}`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );

        eventStore.setEventData(response.data?.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        eventStore.setLoading(false);
      }
      clickSearch.value = true;
    };
    const clearSearch = async () => {
      searchInput.value = "";
      eventStore.setLoading(true);
      try {
        const response = await axios.get(
          `https://interview.development.cat-sw.com/api/event`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        if (response.data?.data?.length != 0) {
          eventStore.setEventData(response.data?.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        clickSearch.value = false;
        eventStore.setLoading(false);
      }
    };
    watch(
      () => searchInput.value,
      (newVal) => {
        newVal.length == 0 && clearSearch();
      }
    );
    watch(
      () => selectedFilter.value,
      () => {
        clearSearch();
      }
    );
    return {
      userStore,
      userData,
      searchInput,
      clickSearch,
      selectedFilter,
      clearSearch,
      logoutUser,
      searchData,
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
