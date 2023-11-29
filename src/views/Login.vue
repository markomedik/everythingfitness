<template>
  <div class="login-container">
    <form id="loginForm1" @submit.prevent="login">
      <h1 class="Login">
        No Pain, <br />
        No Gain.
      </h1>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          name="email"
          required
          autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          name="password"
          required
          autocomplete="current-password"
        />
      </div>
      <div class="button-container">
        <button
          id="loginButton"
          class="glowing-btn"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
        <p v-if="loginMessage" class="error-message">{{ loginMessage }}</p>
      </div>
      <p>If you don't have an account, please register</p>
      <router-link to="/registration" class="register">HERE</router-link>
    </form>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default {
  setup() {
    const auth = useAuthStore();
    const isAuthenticatedState = ref(auth.isAuthenticatedGetter);

    watch(isAuthenticatedState, (newValue) => {
      console.log("isAuthenticated changed:", newValue);
    });

    const user = reactive({
      email: "",
      password: "",
    });

    const loginMessage = ref("");
    const isLoading = ref(false);

    const router = useRouter();

    const login = async () => {
      try {
        isLoading.value = true;

        const userRole = await auth.login(user);

        if (userRole === 1) {
          router.push("/addexercise");
        } else if (userRole === 2) {
          router.push("/");
        } else {
          console.error("Invalid user role:", userRole);
        }
      } catch (error) {
        loginMessage.value = "Login failed: Wrong email or passsord";
      } finally {
        isLoading.value = false;
        user.email = "";
        user.password = "";
      }
    };

    return {
      user,
      loginMessage,
      isLoading,
      isAuthenticatedState,
      login,
    };
  },
};
</script>

<style></style>
