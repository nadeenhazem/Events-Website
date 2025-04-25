<template>
  <div class="bg-transparent">
    <div
      class="card text-center my-3 border-3 border border-light position-relative overflow-hidden"
    >
      <div class="position-relative image-overlay">
        <img
          src="../../../assets/imgs/introImg.png"
          alt="Intro Image"
          class="img-fluid d-block object-fit-cover mx-auto w-100 h-100"
        />

        <div class="position-absolute top-0 start-0 w-100 h-100"></div>
      </div>

      <div
        class="position-absolute top-50 start-50 translate-middle text-white z-1"
      >
        <p class="fst-italic fs-1">Events</p>
        <p class="fst-italic fs-4">Life is a party. Dress like it.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style scoped>
.position-absolute h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.image-overlay {
  height: 50vh;
  overflow: hidden;
  border-radius: 10px;
}
.image-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.image-overlay::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.position-absolute p {
  font-family: "AnotherFont", serif;
  font-style: italic;
}
</style>
