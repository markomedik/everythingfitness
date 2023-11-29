<template>
  <div>
    <h1 class="naslov1">
      Unlock Your Fitness Potential: Tailoring Your Workout to Your Level and
      Schedule
    </h1>
    <p class="opis1">
      Embarking on a fitness journey is like embarking on a personal adventure,
      and just like any expedition, having the right map makes all the
      difference. Your workout routine is that map, guiding you towards your
      fitness goals. Let's talk about the diverse landscapes of workout splits
      and how to choose the one that aligns with your fitness level and the time
      you're ready to commit.
    </p>
    <div class="buttoni">
      <div
        class="radioButoni"
        v-for="(split, index) in workoutSplits"
        :key="index"
      >
        <input type="radio" v-model="selectedSplit" :value="index" id="split" />
        <label for="split">{{ split.name }}</label>
        <div v-if="selectedSplit === index">
          <h2>{{ split.name }}</h2>
          <p class="split-ideal-for">
            <strong>Ideal for:</strong> {{ split.idealFor }}
          </p>
          <p class="split-why"><strong>Why?</strong> {{ split.why }}</p>
          <p class="split-pro-tip">
            <strong>Pro Tip:</strong> {{ split.proTip }}
          </p>
        </div>
      </div>
      <button @click="generateWorkout">Generate Workout</button>
    </div>
    <h2 class="naslov2">Choosing Your Fitness Path</h2>
    <p class="opis2">
      Remember, there's no one-size-fits-all. Your fitness journey is uniquely
      yours. Select a routine based on your current fitness level and the time
      you're ready to invest. Whether you're just starting, or you've been at it
      for years, the key is consistency. Your journey is a marathon, not a
      sprint—choose a path that resonates with you, and let the adventure begin.
      Happy training!
    </p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import useExerciseStore from "../stores/exerciseStore.js";

export default {
  setup() {
    const selectedSplit = ref(null);
    const generateButton = ref(null);
    const exerciseStore = useExerciseStore();

    const isAuthenticated = computed(
      () => useAuthStore().isAuthenticatedGetter
    );

    const workoutSplits = ref([
      {
        name: "Push/Pull/Legs Split",
        idealFor: "Those seeking balance and efficiency in their workouts.",
        why: "Dividing exercises based on movement types, this split provides stimulus while allowing for recovery. Tailor it to your preferences, 4-6 days a week, with sessions lasting 60-75 minutes.",
        proTip:
          "Customizing your workout weight is an art. Strive for a load that challenges you appropriately, promoting growth, yet doesn't compromise your form. Leaving 1-2 reps in reserve becomes pivotal, especially in the last set, as it ensures a balance between intensity and safety.",
      },
      {
        name: "Full Body Workout",
        idealFor: "Beginners and busy bees with time constraints.",
        why: "This routine targets all major muscle groups, enhancing overall strength and functional fitness. Perfect for those just starting, typically requiring 3 days a week, with each session lasting 45-60 minutes.",
        proTip:
          "Remember, choosing the appropriate weight for each exercise is crucial. It should be heavy enough to reach the designated reps in a set, leaving 1-2 reps in the tank. This ensures optimal muscle engagement across 3-4 sets, with the last set challenging you to barely lift those last two reps.",
      },
      {
        name: "Upper/Lower Split",
        idealFor: "Intermediate to advanced enthusiasts seeking balance.",
        why: "Separating upper and lower body workouts, it's designed for targeted training to boost strength and hypertrophy. Best for those looking for a bit more challenge, usually 4 days a week, sessions lasting 60-75 minutes.",
        proTip:
          "Pro Tip: Nail down your weights. Choose a load that challenges you within the designated rep range but allows for 1-2 reps in reserve. This approach ensures that, especially in your last set, you're pushing your limits while maintaining control and form.",
      },
      {
        name: "Legs/Back/Chest/Arms Split",
        idealFor:
          "Moderately fit individuals preferring targeted muscle training.",
        why: "This split emphasizes symmetry across muscle groups, making it suitable for those with a moderate fitness level. Aim for 4 days a week, dedicating 60-75 minutes to each session focusing on a specific muscle group.",
        proTip:
          "Don't underestimate the power of choosing the right weight. It should be heavy enough to challenge you, yet light enough to maintain proper form. This balance is key for both progress and injury prevention, especially when aiming for that last set's challenging reps.",
      },
      {
        name: "Bro-Split",
        idealFor: "Seasoned lifters and bodybuilders with a solid foundation.",
        why: "For maximal hypertrophy through high-volume training, this is your go-to. Be ready for a challenge - 5-6 days a week, with each session lasting 75-90 minutes, focusing on one muscle group per day.",
        proTip:
          "Precision in weight selection is paramount. Opt for a load that pushes your limits while still allowing for controlled and proper execution of each exercise. Leaving 1-2 reps in reserve becomes especially crucial in those last sets for optimal muscle stimulation.",
      },
    ]);

    const auth = useAuthStore();

    async function generateWorkout() {
      if (!isAuthenticated.value) {
        alert("You must be logged in to use this feature.");
        return;
      }
      if (selectedSplit.value !== null) {
        const selectedWorkout = workoutSplits.value[selectedSplit.value];
        const planName = selectedWorkout.name;
        const userId = auth.userIdGetter;

        if (planName === "Push/Pull/Legs Split") {
          try {
            const response = await axios.post(`${exerciseStore.API_URL}ppl`, {
              userId,
              planName,
            });

            if (response.status === 200) {
              alert("Workout successfully generated!");
            } else {
              alarm("Workout generation failed:", response.data.message);
            }
          } catch (error) {
            console.error("An error occurred while generating workout.", error);
          }
        } else if (planName === "Full Body Workout") {
          try {
            const response = await axios.post(
              `${exerciseStore.API_URL}fullBody`,
              {
                userId,
                planName,
              }
            );

            if (response.status === 200) {
              alert("Workout successfully generated!");
            } else {
              alarm("Workout generation failed:", response.data.message);
            }
          } catch (error) {
            console.error("An error occurred while generating workout.", error);
          }
        } else if (planName === "Upper/Lower Split") {
          try {
            const response = await axios.post(
              `${exerciseStore.API_URL}upperLower`,
              {
                userId,
                planName,
              }
            );

            if (response.status === 200) {
              alert("Workout successfully generated!");
            } else {
              alarm("Workout generation failed:", response.data.message);
            }
          } catch (error) {
            console.error("An error occurred while generating workout.", error);
          }
        } else if (planName === "Legs/Back/Chest/Arms Split") {
          try {
            const response = await axios.post(
              `${exerciseStore.API_URL}legsBackChestArm`,
              {
                userId,
                planName,
              }
            );

            if (response.status === 200) {
              alert("Workout successfully generated!");
            } else {
              alarm("Workout generation failed:", response.data.message);
            }
          } catch (error) {
            console.error("An error occurred while generating workout.", error);
          }
        } else if (planName === "Bro-Split") {
          try {
            const response = await axios.post(
              `${exerciseStore.API_URL}broSplit`,
              {
                userId,
                planName,
              }
            );

            if (response.status === 200) {
              alert("Workout successfully generated!");
            } else {
              alarm("Workout generation failed:", response.data.message);
            }
          } catch (error) {
            console.error("An error occurred while generating workout.", error);
          }
        }
        {
          console.warn("Unsupported workout type.");
        }
      } else {
        alert("Please select a workout before generating.");
      }
    }

    return {
      selectedSplit,
      workoutSplits,
      generateButton,
      generateWorkout,
      isAuthenticated,
    };
  },
};
</script>

<style scoped>
h1,
h2 {
  color: hsl(270, 100%, 50%);
  text-shadow: 2px 2px 2px #c5cae9;
  font-weight: bold;
  margin-bottom: 10px;
}

p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.radio-container {
  margin-bottom: 20px;
  display: flex;
}

input[type="radio"] {
  margin-right: 8px;
}

label {
  color: #8751e5;
  cursor: pointer;
  filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
}

button {
  position: relative;
  background: transparent;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  left: 30px;
  margin-top: auto;
  text-align: center;
  transition: all 0.2s;
  animation: buttonbouncy 5s infinite linear;
  width: 200px;
}

button:hover {
  background-color: blueviolet;
  color: white;
  border: 1px solid blueviolet;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
  font-style: italic;
}

.naslov1 {
  position: absolute;
  top: 100px;
  right: 50px;
  text-wrap: wrap;
  width: 400px;
}

.opis1 {
  position: absolute;
  top: 300px;
  right: 100px;
  text-wrap: wrap;
  width: 300px;
  color: white;
  filter: drop-shadow(0px 0px 14px black);
}

.naslov2 {
  position: absolute;
  bottom: 350px;
  right: 50px;
  text-wrap: wrap;
  width: 400px;
}

.opis2 {
  position: absolute;
  bottom: 100px;
  right: 100px;
  text-wrap: wrap;
  width: 300px;
  color: white;
  filter: drop-shadow(0px 0px 14px black);
}

.radioButoni {
  margin-bottom: 10px;
  padding: auto;
}
.radioButoni label {
  cursor: pointer;
}
.selected-split {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.buttoni {
  position: absolute;
  top: 150px;
  left: 150px;
  height: 600px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  align-items: flex-start;
}

#idealfor {
  color: white;
}

.split-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.split-ideal-for {
  font-weight: bold;
  color: white;
  text-wrap: wrap;
  width: 400px;
  filter: drop-shadow(0px 0px 14px black);
}

.split-why {
  font-weight: bold;
  color: white;
  text-wrap: wrap;
  width: 400px;
  filter: drop-shadow(0px 0px 14px black);
}

.split-pro-tip {
  font-weight: bold;
  color: white;
  text-wrap: wrap;
  width: 400px;
  filter: drop-shadow(0px 0px 14px black);
}

@keyframes buttonbouncy {
  0% {
    top: 0em;
  }

  40% {
    top: 0em;
  }

  43% {
    top: -0.9em;
  }

  46% {
    top: 0em;
  }

  48% {
    top: -0.4em;
  }

  50% {
    top: 0em;
  }

  100% {
    top: 0em;
  }
}
/* Manji Mobilni Telefoni */
@media all and (max-width: 360px) {
  .naslov1,
  .naslov2,
  .opis1,
  .opis2 {
    display: none;
  }
  .buttoni {
    top: 100px;
    left: 50%;
    height: 600px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: flex-start;
    transform: scale(0.7);
  }
}

/* Veci Mobilni Telefoni */
@media all and (min-device-width: 361px) and (max-device-width: 520px) {
  .naslov1,
  .naslov2,
  .opis1,
  .opis2 {
    display: none;
  }
  .buttoni {
    top: 100px;
    left: 50%;
    height: 600px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: flex-start;
    transform: scale(0.7);
  }
}
/* SREDNJA VELICINA 521 do 721 */
@media all and (min-device-width: 521px) and (max-device-width: 721px) {
  .naslov1,
  .naslov2,
  .opis1,
  .opis2 {
    display: none;
  }
  .buttoni {
    top: 100px;
    left: 50%;
    height: 600px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: flex-start;
    transform: scale(0.7);
  }
}
/* SREDNJA VELICINA 721 do 1024 */
@media all and (min-device-width: 722px) and (max-device-width: 1024px) {
  .naslov1,
  .naslov2,
  .opis1,
  .opis2 {
    display: none;
  }
  .buttoni {
    top: 100px;
    left: 50%;
    height: 600px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: flex-start;
    transform: scale(0.7);
  }
}
/* FULL HD :D od 1024 */
@media all and (min-device-width: 1025px) and (max-device-width: 1920px) {
}
</style>
