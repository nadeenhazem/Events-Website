<template>
  <div class="login-container min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="card shadow-lg border-0">
            <div class="card-body row register-card h-100">
              <div class="col-lg-6 h-100 d-none d-lg-block">
                <img
                  src="../../../assets/imgs/registerImg.jpeg"
                  class="img-fluid w-100 h-100 object-fit-cover"
                  alt="Registration Image"
                  style="min-height: 500px"
                />
              </div>

              <div
                class="col-lg-6 col-md-12 d-flex flex-column justify-content-center"
              >
                <h1 class="text-center mb-4 text-danger">Login</h1>

                <div class="mb-3">
                  <label class="form-label text-muted fw-bold">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Email"
                    v-model="LoginData.email"
                    @input="checkValidation('email')"
                  />
                  <div class="text-danger">{{ errorData.emailError }}</div>
                </div>

                <div class="mb-3">
                  <label class="form-label text-muted fw-bold">Password</label>
                  <div class="input-group">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Enter your password"
                      v-model="LoginData.password"
                      @input="checkValidation('password')"
                    />
                    <span
                      class="input-group-text"
                      @click="togglePassword"
                      style="cursor: pointer"
                    >
                      <i
                        :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                      ></i>
                    </span>
                  </div>
                  <div class="text-danger">{{ errorData.passwordError }}</div>
                </div>

                <div class="text-danger text-center">{{ apiError }}</div>
                <div
                  class="my-3 d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    class="btn btn-danger w-50 fw-bold rounded-3"
                    @click="handleSubmit"
                  >
                    Login
                  </button>
                </div>
                <div class="text-center">
                  <router-link
                    to="/register"
                    class="text-primary text-decoration-underline"
                  >
                    <p>Create New Account</p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const LoginData = ref({
      email: "",
      password: "",
    });
    const errorData = ref({
      emailError: "",
      passwordError: "",
    });
    const apiError = ref("");
    const showPassword = ref(false);

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const emailValidation = () => {
      if (!LoginData.value.email) {
        errorData.value.emailError = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(LoginData.value.email)) {
        errorData.value.emailError = "Email is invalid";
      } else {
        errorData.value.emailError = "";
      }
    };
    const passwordValidation = () => {
      if (!LoginData.value.password) {
        errorData.value.passwordError = "Password is required";
      } else if (LoginData.value.password.length < 6) {
        errorData.value.passwordError =
          "Password must be at least 6 characters long";
      } else {
        errorData.value.passwordError = "";
      }
    };

    const checkValidation = (name) => {
      if (name === "email") {
        emailValidation();
      } else if (name === "password") {
        passwordValidation();
      } else {
        emailValidation();
        passwordValidation();
      }

      return !errorData.value.emailError && !errorData.value.passwordError;
    };

    const handleSubmit = async () => {
      const isValid = await checkValidation();
      if (isValid) {
        try {
          const response = await axios.post(
            "https://interview.development.cat-sw.com/api/login",
            LoginData.value
          );

          localStorage.setItem(
            "token",
            JSON.stringify(response.data?.token?.access_token)
          );

          router.push("/");
        } catch (error) {
          apiError.value = error.response.data.error || "An error occurred";
        }
      }
    };
    onMounted(() => {
      const getToken = JSON.parse(localStorage.getItem("token"));
      if (getToken) {
        router.push("/");
      }
    });
    return {
      LoginData,
      errorData,
      showPassword,

      apiError,
      togglePassword,

      handleSubmit,
      checkValidation,
    };
  },
});
</script>
<style scoped>
.login-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.card {
  border-radius: 1.5rem !important;
  overflow: hidden;
  min-height: 600px;
  max-width: 1200px;
  margin: auto;
}

.border-primary {
  border-color: #3498db !important;
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
}

@media (max-width: 768px) {
  .card {
    min-height: auto !important;
    margin: 1rem !important;
  }

  .rounded-start {
    border-radius: 1.5rem 1.5rem 0 0 !important;
  }
}
</style>
