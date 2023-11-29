<template>
  <div class="container">
    <div class="cube">
      <h3>Exercises for the Selected Plan</h3>
      <div class="days-grid">
        <div v-for="(day, index) in exerciseDays" :key="index" class="day">
          <h4>Day {{ index + 1 }}</h4>
          <ul>
            <li v-for="exercise in day.exercises" :key="exercise.exerciseId">
              <span @click="showModal(exercise)" class="exercise-link">
                {{ exercise.exercises_name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedExercise" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedExercise.exercises_name }}</h2>
      <div
        v-if="
          selectedExercise &&
          sets !== undefined &&
          reps !== undefined &&
          restTime !== undefined
        "
      >
        <p>Sets: {{ sets }} | Reps: {{ reps }} | Rest time: {{ restTime }}</p>
      </div>
      <div v-else>
        <p>Training type information not available</p>
      </div>
      <p>{{ selectedExerciseDetails }}</p>
      <button @click="showExerciseImage">Show Exercise Image</button>

      <div v-if="showImage" class="image-container">
        <img :src="exerciseImageUrl" alt="Exercise Image" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";

export default {
  props: {
    planId: Number,
  },
  setup(props) {
    const exerciseDays = ref([]);
    const selectedExercise = ref(null);
    const selectedExerciseDetails = ref("");
    const showImage = ref(false);
    const exerciseImageUrl = ref("");
    const authStore = useAuthStore();
    const userId = authStore.userIdGetter;
    const sets = ref("");
    const reps = ref("");
    const restTime = ref("");

    const getExercises = async () => {
      try {
        const response = await axios.get(
          `http://228k123.e2.mars-hosting.com/exercises/getExercises?planId=${props.planId}`
        );

        const planName = Object.keys(response.data)[0];
        const exercises = response.data[planName];

        const exerciseMap = new Map();

        exercises.forEach((exercise) => {
          const dayName = exercise.days_name;

          if (!exerciseMap.has(dayName)) {
            exerciseMap.set(dayName, []);
          }

          exerciseMap.get(dayName).push({
            ...exercise,
            exerciseId: exercise.exercises_id,
          });
        });

        exerciseDays.value = Array.from(exerciseMap).map(
          ([dayName, exercises]) => ({
            dayName,
            exercises,
          })
        );
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    const showExerciseDetails = async (exerciseId) => {
      try {
        const response = await axios.get(
          `http://228k123.e2.mars-hosting.com/exercises/getExerciseDetails?exerciseId=${exerciseId}`
        );
        const exerciseDetails =
          response.data.Description[0]?.exercises_description;

        if (exerciseDetails) {
          selectedExerciseDetails.value = exerciseDetails;
        } else {
          console.error(
            "No exercise details found in the API response:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    const showExerciseImage = async () => {
      try {
        const response = await axios.get(
          `http://228k123.e2.mars-hosting.com/exercises/getExerciseImage?exerciseId=${selectedExercise.value.exerciseId}`,
          { responseType: "arraybuffer" }
        );

        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        exerciseImageUrl.value = imageUrl;
        showImage.value = true;
      } catch (error) {
        console.error("Error fetching exercise image:", error);
      }
    };

    const getTrainingType = async () => {
      try {
        const response = await axios.get(
          `http://228k123.e2.mars-hosting.com/exercises/trainingType?userId=${userId}`
        );

        const trainingTypeList = response.data.trainingType;

        if (trainingTypeList && trainingTypeList.length > 0) {
          const trainingType = trainingTypeList[0];

          sets.value = trainingType.training_type_sets || "";
          reps.value = trainingType.training_type_reps || "";
          restTime.value = trainingType.training_type_rest_time || "";
        } else {
          console.warn("Training type array is empty");
        }
      } catch (error) {
        console.error("Error fetching training type:", error);
      }
    };

    const showModal = async (exercise) => {
      selectedExercise.value = exercise;
      showExerciseDetails(exercise.exerciseId);
      showImage.value = false;
      await getTrainingType(userId);
    };

    const closeModal = () => {
      selectedExercise.value = null;
      selectedExerciseDetails.value = "";
      showImage.value = false;
      exerciseImageUrl.value = "";
    };

    watch(
      () => props.planId,
      () => {
        if (props.planId) {
          getExercises();
        }
      }
    );

    onMounted(() => {
      if (props.planId) {
        getExercises();
      }
    });

    return {
      sets,
      reps,
      restTime,
      exerciseDays,
      selectedExercise,
      selectedExerciseDetails,
      showImage,
      exerciseImageUrl,
      showModal,
      closeModal,
      showExerciseImage,
      getTrainingType,
    };
  },
};
</script>

<style scoped>
.image-container {
  text-align: center;
  width: 95%;
  height: 500px;
  overflow: hidden;
}
.image-container img {
  max-width: 100%;
  max-height: 90%;
  object-fit: cover;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  overflow: hidden;
  margin-top: 10%;
  margin-left: -300px;
}

.cube {
  margin-left: -30px;
  width: auto;
  background-color: transparent;
  padding: 10;
  z-index: 8;
  color: white;
}

.cube h3 {
  margin-bottom: 20px;
}

.days-grid {
  display: flex;
  width: auto;
}

.day {
  flex: 0 0 auto;
  border: 1px solid #ccc;
  margin-right: 20px;
  padding: 10px;
  filter: drop-shadow(0px 0px 10px black);
}

ul {
  list-style: none;
  padding: 0;
  filter: drop-shadow(0px 0px 30px black);
}

.exercise-link {
  cursor: pointer;
  color: rgb(178, 103, 248);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px; 
  left: 400px;
  width: 50%;
  height: 75%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
  color: white;
  backdrop-filter: blur(10px);
}

.modal-content {
  background-color: transparent;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.5s ease;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  height: 100%;
}
.modal-content h2,
.modal-content p {
  text-align: center;
  vertical-align: top;
  filter: drop-shadow(0px 0px 30px black);
}

.modal-content p {
  font-size: 20px;
}
.modal-content h2 {
  font-size: 30px;
}
.rotate {
  transform: rotateY(180deg);
}
.modal-content img {
  max-width: 90%;
  margin-left : 35px;
}

.modal-content button {
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: blueviolet;
  color: white;
  height: 20px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 40px;
  color: white;
  z-index: 11;
  font-weight: bold;
}

.close:hover {
  color: blueviolet;
}

.exercise-link {
  color: aqua;
}
</style>
