<template>
  <div class="page-container">
    <div class="left-menu">
      <button
        @click="switchTab('myPlans')"
        :class="{ active: currentTab === 'myPlans' }"
      >
        My Plans
      </button>
      <button
        @click="switchTab('personalDetails')"
        :class="{ active: currentTab === 'personalDetails' }"
      >
        Personal Details
      </button>
    </div>

    <div class="content-container">
      <div v-if="currentTab === 'personalDetails'" class="content">
        <!-- PRIKAZ LICNIH DETALJA -->
        <h2>Personal Details</h2>
        <div class="user-details-container">
          <div class="user-image">
            <img :src="userImageURL" alt="User Image" />
          </div>
          <template v-if="!editMode">
            <p>
              <strong>Name:</strong> {{ userDetails.users_first_name }}
              {{ userDetails.users_last_name }}
            </p>
            <p><strong>Email:</strong> {{ userDetails.users_email }}</p>
            <p>
              <strong>Date of Birth:</strong>
              {{ userDetails.users_date_of_birth }}
            </p>
            <p>
              <strong>Gender:</strong> {{ userDetails.body_measurement_gender }}
            </p>
            <p>
              <strong>Height:</strong>
              {{ userDetails.body_measurement_height }} cm
            </p>
            <p>
              <strong>Weight:</strong>
              {{ userDetails.body_measurement_weight }} kg
            </p>
            <p>
              <strong>Fitness Level:</strong>
              {{ userDetails.body_measurement_fitness_level }}
            </p>
            <p>
              <strong>Fitness Goal:</strong> {{ userDetails.fitness_goal_goal }}
            </p>
            <button @click="enterEditMode">Edit</button>
            <button @click="openChangePasswordForm">Change Password</button>
            <div v-if="showChangePasswordForm">
              <label>
                <strong>New Password:</strong>
                <input v-model="newPassword" type="password" />
              </label>
              <label>
                <strong>Confirm Password:</strong>
                <input v-model="confirmPassword" type="password" />
              </label>
              <p v-if="passwordChangeError" class="error-message">
                {{ passwordChangeError }}
              </p>
              <button @click="confirmPasswordChange">Confirm</button>
              <button @click="cancelPasswordChange">Cancel</button>
            </div>
          </template>
          <template v-else>
            <label>
              <strong>Profile Image:</strong>
              <input type="file" @change="handleFileUpload" accept="image/*" />
            </label>

            <label>
              <strong>First Name:</strong>
              <input v-model="editedFirstName" />
            </label>
            <label>
              <strong>Last Name:</strong>
              <input v-model="editedLastName" />
            </label>
            <label>
              <strong>Email:</strong>
              <input v-model="editedEmail" />
            </label>
            <label>
              <strong>Date of Birth:</strong>
              <input v-model="editedDateOfBirth" />
            </label>
            <label>
              <strong>Gender:</strong>
              <select v-model="editedGender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              <strong>Height:</strong>
              <input type="text" v-model="editedHeight" />
            </label>
            <label>
              <strong>Weight:</strong>
              <input type="text" v-model="editedWeight" />
            </label>
            <label>
              <strong>Fitness Level:</strong>
              <select v-model="editedFitnessLevel">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
            <label>
              <strong>Fitness Goal:</strong>
              <select v-model="editedFitnessGoal">
                <option value="1">Strength</option>
                <option value="2">Build Muscle</option>
                <option value="3">Endurance</option>
                <option value="4">Lose Fat</option>
              </select>
            </label>
            <button @click="saveChanges">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </template>
        </div>
      </div>

      <div v-else-if="currentTab === 'myPlans'" class="content">
        <!-- PRIKAZ PLANA KORISNIKA -->
        <h2>My Plans</h2>
        <div
          v-for="plan in plans.exerciseList"
          :key="plan.plan_id"
          class="plan-item"
        >
          <div class="plan-button-container">
            <button
              @click="selectPlan(plan.plan_id, plan.plan_name)"
              :class="{
                active: selectedPlan === plan.plan_id,
                clickable: true,
              }"
            >
              {{ plan.plan_name }}
            </button>
            <button @click="deletePlan(plan.plan_id)" class="delete-button">
              <img id="trash" src="@/assets/trash.png" alt="Delete Icon" />
            </button>
          </div>
        </div>
      </div>
      <ExerciseListComponent
        v-if="showExerciseListComponent"
        :planId="selectedPlan"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import useExerciseStore from "../stores/exerciseStore.js";
import ExerciseListComponent from "../components/ExerciseListComponent.vue";
import useGeneralStore from "../stores/general.js";
import { useRouter } from "vue-router";
const exerciseStore = useExerciseStore();
export default {
  name: "MyWorkout",
  components: {
    ExerciseListComponent,
  },
  setup() {
    const currentTab = ref("personalDetails");
    const plans = ref({ exerciseList: [] });
    const authStore = useAuthStore();
    const generalStore = useGeneralStore();
    const selectedPlan = ref("");
    const userImageURL = ref("");
    const userDetails = ref({});
    const showUserDetailsForm = ref(false);
    const showExerciseListComponent = ref(false);

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const dob = ref("");
    const gender = ref("");
    const height = ref("");
    const weight = ref("");
    const fitnessLevel = ref("");
    const fitnessGoal = ref("");

    const editMode = ref(false);
    const editedFirstName = ref("");
    const editedLastName = ref("");
    const editedEmail = ref("");
    const editedDateOfBirth = ref("");
    const editedGender = ref("");
    const editedHeight = ref("");
    const editedWeight = ref("");
    const editedFitnessLevel = ref("");
    const editedFitnessGoal = ref("");
    const userDetailsLoaded = ref(false);
    const selectedImage = ref(null);
    const picture_name = ref(null);

    const newPassword = ref("");
    const confirmPassword = ref("");
    const passwordChangeError = ref(null);
    const showChangePasswordForm = ref(false);

    const router = useRouter();

    const switchTab = (tab) => {
      currentTab.value = tab;
      if (tab === "myPlans") {
        getMyPlans();
      } else if (tab === "personalDetails") {
        showExerciseListComponent.value = false;
        getUserDetails();
      }
    };

    const getMyPlans = async () => {
      const userId = authStore.userIdGetter;

      try {
        const response = await axios.get(`${exerciseStore.API_URL}getPlan`, {
          params: { userId },
        });

        plans.value = response.data;
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    const getUserDetails = async () => {
      const userId = authStore.userIdGetter;

      try {
        const userDetailsResponse = await axios.get(
          `${generalStore.API_URL}user/userDetails?userId=${userId}`
        );

        firstName.value = userDetailsResponse.data.user[0].users_first_name;
        lastName.value = userDetailsResponse.data.user[0].users_last_name;
        email.value = userDetailsResponse.data.user[0].users_email;
        dob.value = userDetailsResponse.data.user[0].users_date_of_birth;

        gender.value = userDetailsResponse.data.user[0].body_measurement_gender;
        height.value = userDetailsResponse.data.user[0].body_measurement_height;
        weight.value = userDetailsResponse.data.user[0].body_measurement_weight;
        fitnessLevel.value =
          userDetailsResponse.data.user[0].body_measurement_fitness_level;
        fitnessGoal.value = userDetailsResponse.data.user[0].fitness_goal_id;
        userDetails.value = userDetailsResponse.data.user[0];

        userDetailsLoaded.value = true;
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const getUserImage = async () => {
      const pictureId = authStore.pictureIdGetter;
      try {
        const timestamp = Date.now();
        const userImageResponse = await axios.get(
          `http://228k123.e2.mars-hosting.com/user/getUserImage?pictureId=${pictureId}&timestamp=${timestamp}`,
          { responseType: "arraybuffer" }
        );

        const blob = new Blob([userImageResponse.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        userImageURL.value = imageUrl;
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    const selectPlan = (planId, planName) => {
      selectedPlan.value = planId;
      showExerciseListComponent.value = true;
    };

    const deletePlan = async (planId) => {
      const confirmation = window.confirm(
        "Are you sure you want to delete this plan?"
      );

      if (confirmation) {
        try {
          const response = await axios.delete(
            `${exerciseStore.API_URL}deletePlan?planId=${planId}`
          );

          alert("Plan deleted successfully:");

          getMyPlans();
        } catch (error) {
          alert("Error deleting plan:", error);
        }
      }
    };

    const openUserDetailsForm = () => {
      showUserDetailsForm.value = true;
    };

    const closeUserDetailsForm = () => {
      showUserDetailsForm.value = false;
    };

    const enterEditMode = () => {
      editedFirstName.value = firstName.value;
      editedLastName.value = lastName.value;
      editedEmail.value = email.value;
      editedDateOfBirth.value = dob.value;
      editedGender.value = gender.value;
      editedHeight.value = height.value;
      editedWeight.value = weight.value;
      editedFitnessLevel.value = fitnessLevel.value;
      editedFitnessGoal.value = fitnessGoal.value;

      editMode.value = true;
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      selectedImage.value = file;
    };

    const saveChanges = async () => {
      const userId = authStore.userIdGetter;
      const bodyId = authStore.bodyIdGetter;
      const pictureId = authStore.pictureIdGetter;

      const updatedUserDetails = {
        userId,
        users_first_name: editedFirstName.value,
        users_last_name: editedLastName.value,
        users_email: editedEmail.value,
        users_date_of_birth: editedDateOfBirth.value,

        fitness_goal_goal: editedFitnessGoal.value,
      };
      const updatedBodyDetails = {
        bodyId,
        body_measurement_gender: editedGender.value,
        body_measurement_height: editedHeight.value,
        body_measurement_weight: editedWeight.value,
        body_measurement_fitness_level: editedFitnessLevel.value,
      };

      try {
        if (selectedImage.value) {
          const formData = new FormData();
          formData.append("picture", selectedImage.value);
          const updateImageResponse = await axios.put(
            `http://228k123.e2.mars-hosting.com/user/updatePicture?pictureId=${authStore.pictureIdGetter}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        const userDetailsResponse = await axios.put(
          `http://228k123.e2.mars-hosting.com/user/updateUserInformation?userId=${userId}&name=${updatedUserDetails.users_first_name}&lastName=${updatedUserDetails.users_last_name}&email=${updatedUserDetails.users_email}&fitness_goal=${updatedUserDetails.fitness_goal_goal}&date_of_birth=${updatedUserDetails.users_date_of_birth}`
        );

        const bodyMeasurmentResponse = await axios.put(
          `http://228k123.e2.mars-hosting.com/user/updateBodyMeasurment?bodyId=${bodyId}&gender=${updatedBodyDetails.body_measurement_gender}&height=${updatedBodyDetails.body_measurement_height}&weight=${updatedBodyDetails.body_measurement_weight}&fitness_level=${updatedBodyDetails.body_measurement_fitness_level}`
        );

        userDetails.users_first_name = editedFirstName.value;
        userDetails.users_last_name = editedLastName.value;
        userDetails.users_email = editedEmail.value;
        userDetails.users_date_of_birth = editedDateOfBirth.value;
        userDetails.body_measurement_gender = editedGender.value;
        userDetails.body_measurement_height = editedHeight.value;
        userDetails.body_measurement_weight = editedWeight.value;
        userDetails.body_measurement_fitness_level = editedFitnessLevel.value;
        userDetails.fitness_goal_goal = editedFitnessGoal.value;

        editMode.value = false;

        getUserDetails();
        getUserImage();
        alert("Changes saved successfully!");
      } catch (error) {
        alert("Error saving changes:", error);
      }
    };

    const cancelEdit = () => {
      editMode.value = false;
    };

    const openChangePasswordForm = () => {
      showChangePasswordForm.value = true;
      newPassword.value = "";
      confirmPassword.value = "";
      passwordChangeError.value = null;
    };

    const cancelPasswordChange = () => {
      showChangePasswordForm.value = false;
    };

    const confirmPasswordChange = async () => {
      if (newPassword.value === confirmPassword.value) {
        const userId = authStore.userIdGetter;

        try {
          await axios.put(
            `http://228k123.e2.mars-hosting.com/user/changePassword?userId=${userId}&password=${newPassword.value}`
          );

          console.log("New password is: ", newPassword.value);

          newPassword.value = "";
          confirmPassword.value = "";
          passwordChangeError.value = null;
          showChangePasswordForm.value = false;

          alert("Password changed successfully!");
        } catch (error) {
          passwordChangeError.value =
            "Error changing password. Please try again.";
          console.error("Error changing password:", error);
        }
      } else {
        passwordChangeError.value = "Passwords do not match.";
      }
    };

    onMounted(async () => {
      if (!authStore.isAuthenticatedGetter) {
        alert("You must be logged in to access this section");
        router.push("/login");
        return;
      } else {
        switchTab("myPlans");
      }
      getMyPlans();
    });

    watch(
      () => currentTab.value,
      (newTab) => {
        if (newTab === "personalDetails") {
          getUserDetails();
          getUserImage();
        } else if (newTab === "myPlans") {
          getMyPlans();
        }
      }
    );

    return {
      firstName,
      lastName,
      email,
      dob,
      gender,
      height,
      weight,
      fitnessLevel,
      fitnessGoal,
      currentTab,
      plans,
      switchTab,
      selectedPlan,
      selectPlan,
      deletePlan,
      userImageURL,
      handleFileUpload,
      userDetails,
      openUserDetailsForm,
      closeUserDetailsForm,
      showUserDetailsForm,
      editMode,
      enterEditMode,
      saveChanges,
      cancelEdit,
      editedFirstName,
      editedLastName,
      editedEmail,
      editedDateOfBirth,
      editedGender,
      editedHeight,
      editedWeight,
      editedFitnessLevel,
      editedFitnessGoal,
      showExerciseListComponent,
      openChangePasswordForm,
      showChangePasswordForm,
      newPassword,
      confirmPassword,
      passwordChangeError,
      confirmPasswordChange,
      cancelPasswordChange,
      selectedImage,
    };
  },
};
</script>

<style scoped>
body {
  margin: 0;
  width: 100vh;
  position: center;
  size: cover;
}
.page-container {
  display: flex;
  height: 80%;
}

.left-menu {
  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 100px;
  background-color: transparent;
  margin-top: 0px;
  margin-left: 20px;
}

.left-menu button.active {
  background-color: blueviolet;
  color: #fff;
}

.left-menu button {
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  width: 120px;
  height: 40px;
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 8px;
  z-index: 7;
}

.left-menu button:hover {
  background-color: #ce0df0;
  filter: drop-shadow(0px 0px 20px rgb(236, 232, 240));
}

.left-menu button:not(.active):hover {
  color: #fff;
}

.left-menu button.clickable:active {
  transform: scale(0.95);
}

.content-container {
  flex: 1;
  padding-left: 40px;
  margin-top: 20px;
  margin-left: 20px;
}
.content-container h2 {
  margin-left: 20px;
}

.content-container button.active {
  background-color: blueviolet;
  color: #fff;
  z-index: 8;
}

.content-container button {
  display: block;
  margin-bottom: 10px;
  width: 150px;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  z-index: 8;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.content-container button:hover {
  background-color: #9c27b0;
  z-index: 8;
}

.content-container button:not(.active):hover {
  color: #fff;
  z-index: 8;
}

.content-container button.clickable:active {
  transform: scale(0.95);
  z-index: 8;
}
.day {
  margin-bottom: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 100;
}

.modal-content {
  display: block;
  width: 100px;
  z-index: 9;
}

.container {
  position: absolute;
  top: 100px;
  width: 100vw;
  z-index: 8;
  left: 40px;
}
.content {
  width: 150px;
  height: 300px;
}

.plan-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
  top: 12px;
}

.plan-button-container {
  display: flex;
  align-items: center;
}

button {
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 8px;
  z-index: 7;
}

.delete-button {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: blueviolet;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 8px;
  margin-left: 8px;
  z-index: 7;
}

.plan-button-container .delete-button {
  width: 60px;
}

.plan-button-container .delete-button:hover {
  background-color: #fc0404;
  font-style: italic;
  filter: drop-shadow(0px 0px 20px rgb(236, 232, 240));
}

.user-image {
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
}

.user-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content p {
  color: aqua;
  width: 200px;
  filter: drop-shadow(0px 0px 15px black);
}

.content label {
  color: aqua;
  margin-left: 10px;
}

.content select {
  width: 173px;
}
.user-details-container {
  z-index: 7;
  filter: drop-shadow(0px 0px 15px blueviolet);
}

.user-details-container input,
.user-details-container select {
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  height: 20px;
}

.user-details-container button {
  width: 177px;
  height: 30px;
}

#trash {
  width: 30px;
  filter: brightness(0) invert(1);
}

#trash:hover {
  filter: brightness(1) invert(0);
}

.trash {
  background: #ff6873;
  width: 66px;
  height: 80px;
  display: inline-block;
  margin: 0 auto;

  position: relative;
  -webkit-border-bottom-right-radius: 6px;
  -webkit-border-bottom-left-radius: 6px;
  -moz-border-radius-bottomright: 6px;
  -moz-border-radius-bottomleft: 6px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.trash:after {
  content: "Mouse hover on Recile Bin";
  position: absolute;
  left: -99px;
  right: 0;
  bottom: -50px;
  width: 300px;
}
.trash span {
  position: absolute;
  height: 12px;
  background: #ff6873;
  top: -19px;
  left: -10px;
  right: -10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: rotate(0deg);
  transition: transform 250ms;
  transform-origin: 19% 100%;
}
.trash span:after {
  content: "";
  position: absolute;
  width: 27px;
  height: 7px;
  background: #ff6873;
  top: -10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: rotate(0deg);
  transition: transform 250ms;
  transform-origin: 19% 100%;
  left: 27px;
}

.trash i {
  position: relative;
  width: 5px;
  height: 50px;
  background: #fff;
  display: block;
  margin: 14px auto;
  border-radius: 5px;
}
.trash i:after {
  content: "";
  width: 5px;
  height: 50px;
  background: #fff;
  position: absolute;
  left: -18px;
  border-radius: 5px;
}
.trash i:before {
  content: "";
  width: 5px;
  height: 50px;
  background: #fff;
  position: absolute;
  right: -18px;
  border-radius: 5px;
}

.trash:hover span {
  transform: rotate(-45deg);
  transition: transform 250ms;
}
</style>
