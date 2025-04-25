<template>
  <footer class="footer mt-5" id="contactUs">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5 class="text-danger">About Us</h5>
          <p class="text-muted">Your company description here.</p>
        </div>
        <div class="col-md-4">
          <h5 class="text-danger">Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-muted">Home</a></li>
            <li><a href="#" class="text-muted">Services</a></li>
            <li><a href="#" class="text-muted">Contact</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5 class="text-danger">Contact Info</h5>
          <p class="text-muted">
            Email: info@example.com<br />Phone: +1 234 567 890
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>
<style scoped>
.footer {
  background-color: rgba(219, 204, 182, 0.2);
  width: 100%;
  padding: 40px 0;
  margin-top: auto;
  border-radius: 10px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
