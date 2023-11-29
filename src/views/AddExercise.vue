<template>
  <form @submit.prevent="saveData" id="exerciseForm">
    <label for="exercisesName">Exercise Name:</label>
    <input
      type="text"
      id="exercisesName"
      v-model="exercise.exercisesName"
      name="exercisesName"
      required
    />

    <label for="exercisesDescription">Exercise Description:</label>
    <textarea
      id="exercisesDescription"
      v-model="exercise.exercisesDescription"
      name="exercisesDescription"
      rows="4"
      required
    ></textarea>

    <label for="resistance">Resistance:</label>
    <select id="resistance" v-model="exercise.resistance" name="resistance">
      <option value="1">Push</option>
      <option value="2">Pull</option>
      <option value="3">Push and Pull</option>
      <option value="4">Legs</option>
    </select>

    <label for="movement">Movement:</label>
    <select id="movement" v-model="exercise.movement" name="movement">
      <option value="1">Compound</option>
      <option value="2">Isolation</option>
    </select>

    <label for="muscle">Muscle:</label>
    <select id="muscle" v-model="exercise.muscle" name="muscle" required>
      <option value="1">Chest</option>
      <option value="2">Back</option>
      <option value="3">Shoulders</option>
      <option value="4">Arms</option>
      <option value="5">Core</option>
      <option value="6">Legs</option>
    </select>

    <label for="selectedSubMuscles">Select Sub-Muscles:</label>
    <select
      id="selectedSubMuscles"
      v-model="exercise.selectedSubMuscles"
      name="selectedSubMuscles[]"
      multiple
      required
    >
      <option value="1">Chest</option>
      <option value="2">Upper Back (Lats)</option>
      <option value="3">Shoulder Blades (Traps)</option>
      <option value="4">Middle Back (Rhomboids)</option>
      <option value="5">Lower Back (Lower Back)</option>
      <option value="6">Front of Shoulders (Front Delts)</option>
      <option value="7">Sides of Shoulders (Side Delts)</option>
      <option value="8">Back of Shoulders (Rear Delts)</option>
      <option value="9">Biceps</option>
      <option value="10">Triceps</option>
      <option value="11">Forearms</option>
      <option value="12">Abs</option>
      <option value="13">Side Abs</option>
      <option value="14">Quads</option>
      <option value="15">Hamstrings</option>
      <option value="16">Glutes</option>
      <option value="17">Calves</option>
    </select>

    <label for="exercisePicture">Upload Exercise Picture:</label>
    <input
      type="file"
      @change="handleFileUpload"
      id="exercisePicture"
      name="exercisePicture"
      accept="image/*"
      required
    />

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const exercise = reactive({
      exercisesName: "",
      exercisesDescription: "",
      resistance: "",
      movement: "",
      muscle: "",
      selectedSubMuscles: [],
      exercisePicture: null,
    });

    const imageURL = ref("");

    const handleFileUpload = (event) => {
      users.picture_name = event.target.files[0];
      imageURL.value = URL.createObjectURL(users.picture_name);
    };

    const clearExerciseFields = () => {
      exercise.exercisesName = "";
      exercise.exercisesDescription = "";
      exercise.resistance = "";
      exercise.movement = "";
      exercise.muscle = "";
      exercise.selectedSubMuscles = [];
      exercise.exercisePicture = null;
    };

    const errorMessage = ref("");

    const saveData = async () => {
      try {
        const response = await axios.post(
          "http://228k123.e2.mars-hosting.com/exercises/addExercise",
          exercise
        );
        const data = response.data;

        if (data.message === "Exercise Added") {
          errorMessage.value = "";
          alert("Exercise Added Successfully");
          clearExerciseFields();
          router.push("/");
        } else {
          errorMessage.value =
            data.message || "An error occurred while registering the user.";
        }
      } catch (error) {
        errorMessage.value = "An error occurred while registering the user.";
      }
    };

    return {
      exercise,
      errorMessage,
      handleFileUpload,
      saveData,
      clearExerciseFields,
      imageURL,
    };
  },
};
</script>

<style scoped>
select {
  width: 100%;
  height: auto;
  max-height: 200px;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#exerciseForm {
  position: relative;
  transform: scale(0.9);
  padding: 20px;
  left: -700px;
  top: 50px;
}
#exercisesDescription,
#exercisesName {
  width: 93%;
  margin-right: 10px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.container label {
  display: flex;
  align-items: center;
  color: white;
}

input[type="checkbox"] {
  margin-right: 8px;
}
.required-message {
  font-size: 14px;
  font-family: "cursive";
  color: rgb(255, 255, 255);
}

.required-message span {
  font-size: 18px;
  margin: 0 4px;
}

body {
  background-color: black;
  color: white;
  font-family: Arial, sans-serif;
}

h2 {
  color: purple;
}

form {
  width: 300px;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  color: white;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
select,
input[type="date"],
textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(128, 0, 128, 0.7);
  transition: box-shadow 0.3s, transform 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
select:focus,
input[type="date"]:focus,
textarea:focus {
  box-shadow: 0 0 20px rgba(128, 0, 128, 1);
  transform: scale(1.02);
}

button {
  background: purple;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: darkviolet;
}
</style>
