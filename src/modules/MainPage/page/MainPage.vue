<template>
  <div class="container">
    <Navbar />
    <IntroPage />
    <Events />
    <AboutUs />
    <Footer />
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useAuthStore } from "../../Auth/store";
import Navbar from "../components/Navbar.vue";
import IntroPage from "../components/IntroPage.vue";
import Events from "../components/Events.vue";
import Footer from "../components/Footer.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import AboutUs from "../components/AboutUs.vue";
export default defineComponent({
  components: {
    Navbar,
    IntroPage,
    Events,
    AboutUs,
    Footer,
  },
  setup() {
    const getToken = JSON.parse(localStorage.getItem("token"));
    const userStore = useAuthStore();
    const userData = userStore.userData;
    const router = useRouter();
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://interview.development.cat-sw.com/api/me",
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        userStore.setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    onMounted(() => {
      if (!getToken) {
        router.push("/login");
      } else {
        getUserData();
      }
    });
    return {
      userData,
    };
  },
});
</script>
<style>
body {
  overflow-x: hidden;
}
</style>
