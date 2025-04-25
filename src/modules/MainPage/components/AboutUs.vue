<template>
  <div
    class="row d-flex pt-5 mt-5 justify-content-between align-items-center"
    id="aboutUs"
  >
    <div class="col-md-6 d-none d-md-block mb-4 mb-md-0">
      <img
        :src="imgAboutUs"
        alt="About Us"
        class="img-fluid rounded-3 shadow-lg"
        style="max-height: 500px; object-fit: cover"
      />
    </div>

    <div class="col-md-6 ps-md-5 text-center text-md-start">
      <h2 class="display-5 fw-bold mb-4 text-danger">About Our Events</h2>

      <div class="row g-4">
        <div class="col-12 col-md-6">
          <div class="card h-100 border-0 shadow-hover transition-all">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-calendar-event fs-3 me-3 text-danger"></i>
                <h3 class="h5 fw-bold mb-0">500+ Events</h3>
              </div>
              <p class="text-muted mt-3 mb-0">
                Over a decade of creating memorable experiences for our clients.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card h-100 border-0 shadow-hover transition-all">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-people fs-3 me-3 text-danger"></i>
                <h3 class="h5 fw-bold mb-0">50k+ Guests</h3>
              </div>
              <p class="text-muted mt-3 mb-0">
                Connecting people through extraordinary event experiences.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card h-100 border-0 shadow-hover transition-all">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-trophy fs-3 me-3 text-danger"></i>
                <h3 class="h5 fw-bold mb-0">Top-Rated</h3>
              </div>
              <p class="text-muted mt-3 mb-0">
                Nationally recognized for innovation and excellence.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="card h-100 border-0 shadow-hover transition-all">
            <div class="card-body p-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-geo-alt fs-3 me-3 text-danger"></i>
                <h3 class="h5 fw-bold mb-0">Global Reach</h3>
              </div>
              <p class="text-muted mt-3 mb-0">
                Events hosted in 20+ countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import imgAboutUs from "../../../assets/imgs/aboutUs.jpeg";
export default defineComponent({
  setup() {
    return { imgAboutUs };
  },
});
</script>
<style scoped>
.shadow-hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.09);
  transition: all 0.3s ease;
}
.shadow-hover:hover {
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
