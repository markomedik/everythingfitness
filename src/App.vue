<template>
  <body>
    <div class="logo1">
      <img class="logo" src="./assets/Logo1.png" />
    </div>
    <nav>
      <RouterLink class="Naslov" to="/">EVERYTHING FITNESS</RouterLink>
    </nav>
    <div class="nav1">
      <RouterLink
        :to="isAuthenticated ? '/logout' : '/login'"
        @click="handleAuthToggle"
      >
        {{ isAuthenticated ? "Logout" : "Login" }}
      </RouterLink>

      <RouterLink to="/myworkout">My Workout</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div class="space"></div>
    <div class="nav2">
      <RouterLink to="/bmicalculator">BMI Calculator</RouterLink>
      <RouterLink to="/bmrcalculator">BMR Calculator</RouterLink>
      <RouterLink to="/workoutgenerator">Workout Generator</RouterLink>
    </div>
    <div>
      <img class="additional-image1" src="./assets/classes-bg.png" />
    </div>
    <div>
      <img class="circle" src="./assets/about-circle-one.png" />
    </div>
    <div>
      <img class="gymRats" src="./assets/hero-banner.png" />
    </div>
    <div>
      <img class="heartrate" src="./assets/HR1.png" />
    </div>
    <div>
      <img class="CLBurned" src="./assets/CLBurned.png" />
    </div>
    <div>
      <h1 class="MotivationQuotes">
        {{ motivationQuote }}
      </h1>
    </div>
    <div>
      <h1 class="Quote">
        "Everything you need to know about living healthy. In one place."
      </h1>
    </div>
    <RouterView />
  </body>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { ref, computed, watchEffect, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export default {
  setup() {
    const auth = useAuthStore();
    const motivationQuote = ref("");

    const isAuthenticatedState = ref(auth.isAuthenticatedGetter);

    const isAuthenticated = computed(() => isAuthenticatedState.value);

    const handleAuthToggle = () => {
      isAuthenticated ? auth.logout() : auth.login();
    };

    const fetchMotivationQuote = async () => {
      try {
        const response = await axios.get(
          "http://228k123.e2.mars-hosting.com/quote"
        );
        console.log("Motivation quote: ", response);
        motivationQuote.value = response.data.quote[0].quotes;
      } catch (error) {
        console.error("Error fetching motivation quote:", error);
      }
    };

    const logout = () => {
      auth.logout();
    };

    onMounted(fetchMotivationQuote);

    watchEffect(() => {
      isAuthenticatedState.value = auth.isAuthenticatedGetter;
    });

    return {
      isAuthenticatedState,
      isAuthenticated,
      logout,
      handleAuthToggle,
      fetchMotivationQuote,
      motivationQuote: computed(() => motivationQuote.value),
    };
  },
};
</script>

<style>
body {
  background-image: url("../src/assets/PozadinaHome.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
/* FONTOVI ZA NASLOVE */
@font-face {
  font-family: "HotSweat";
  src: url(./assets/HotSweat.ttf) format("truetype");
}
@font-face {
  font-family: "SpecialAgent";
  src: url(./assets/SpecialAgent.otf) format("truetype");
}

.MotivationQuotes {
  font-size: 18px;
  text-align: center;
}
</style>
