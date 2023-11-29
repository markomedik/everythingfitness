<template>
  <form @submit.prevent="saveData" id="registrationForm">
    <h1>REGISTRATION</h1>
    <h2>User information</h2>
    <label for="users_first_name">First Name *</label>
    <input
      type="text"
      id="users_first_name"
      v-model="users.name"
      name="users_first_name"
      required
    /><br />

    <label for="users_last_name">Last Name *</label>
    <input
      type="text"
      id="users_last_name"
      v-model="users.lastName"
      name="users_last_name"
      required
    /><br />

    <label for="users_email">Email *</label>
    <input
      type="email"
      id="users_email"
      v-model="users.email"
      name="users_email"
      required
    /><br />

    <label for="users_password">Password *</label>
    <input
      type="password"
      id="users_password"
      v-model="users.password"
      name="users_password"
      required
    /><br />

    <label for="users_date_of_birth">Dob (yyyy-mm-dd) *</label>
    <input
      type="text"
      id="users_date_of_birth"
      v-model="users.date_of_birth"
      name="users_date_of_birth"
      required
    /><br />

    <label for="profileImage">Profile Image: *</label>
    <input
      type="file"
      id="profileImage"
      @change="handleFileUpload"
      name="profileImage"
      accept="image/*"
      required
    />
    <div id="selectedImageContainer" v-if="users.picture_name">
      <img id="selectedImage" :src="imageURL" alt="Selected Image" />
    </div>

    <h2>Body Measurements</h2>
    <label for="body_measurment_gender">Gender *</label>
    <select
      id="body_measurment_gender"
      v-model="users.gender"
      name="body_measurment_gender"
      required
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option></select
    ><br />

    <label for="body_measurment_height">Height</label>
    <input
      type="text"
      id="body_measurment_height"
      v-model="users.height"
      name="body_measurment_height"
    /><br />

    <label for="body_measurment_weight">Weight</label>
    <input
      type="text"
      id="body_measurment_weight"
      v-model="users.weight"
      name="body_measurment_weight"
    /><br />

    <label for="body_measurment_fitnes_level">Fitness Level</label>
    <select
      id="body_measurment_fitnes_level"
      v-model="users.fitness_level"
      name="body_measurment_fitnes_level"
    >
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option></select
    ><br />

    <h2>Fitness Goal</h2>
    <label for="fitness_goal_goal">Fitness Goal *</label>
    <select
      id="fitness_goal_goal"
      v-model="users.fitness_goal"
      name="fitness_goal_goal"
      required
    >
      <option value="1">Strength</option>
      <option value="2">Build Muscle</option>
      <option value="3">Endurance</option>
      <option value="4">Lose Fat</option></select
    ><br />
    <input
      type="submit"
      value="Register"
      class="glowing-btn glowing-txt"
      id="registerButton"
    />
    <p>* Required field</p>
  </form>
</template>
<script>
import { ref, reactive } from "vue";
import router from "../router/index.js";
import axios from "axios";
import useGeneralStore from "../stores/general.js";

export default {
  setup() {
    const generalStore = useGeneralStore();

    const users = reactive({
      name: "",
      lastName: "",
      email: "",
      password: "",
      picture_name: null,
      gender: "",
      height: "",
      weight: "",
      fitness_level: "",
      fitness_goal: "",
      date_of_birth: "",
    });

    const errorMessage = ref("");

    const imageURL = ref("");

    const handleFileUpload = (event) => {
      users.picture_name = event.target.files[0];
      imageURL.value = URL.createObjectURL(users.picture_name);
    };

    const validateEmail = (email) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(email);
    };

    const saveData = async () => {
      if (!validateEmail(users.email)) {
        errorMessage.value =
          "Invalid email format. Please enter a valid email address.";
        return;
      }

      try {
        const formData = new FormData();
        formData.append("name", users.name);
        formData.append("lastName", users.lastName);
        formData.append("email", users.email);
        formData.append("password", users.password);
        formData.append("picture_name", users.picture_name);
        formData.append("gender", users.gender);
        formData.append("height", users.height);
        formData.append("weight", users.weight);
        formData.append("fitness_level", users.fitness_level);
        formData.append("fitness_goal", users.fitness_goal);
        formData.append("date_of_birth", users.date_of_birth);
        const response = await axios.post(
          `${generalStore.API_URL}user/register`,
          formData
        );
        const data = response.data;

        alert("User Registered Successfully");
        router.push("/login");
      } catch (error) {
        errorMessage.value = "An error occurred while registering the user.";
      }
    };

    return {
      users,
      handleFileUpload,
      validateEmail,
      saveData,
      errorMessage,
      imageURL,
    };
  },
};
</script>

<style scoped></style>
