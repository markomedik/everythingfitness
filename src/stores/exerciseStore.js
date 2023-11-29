import { defineStore } from "pinia";

const useExerciseStore = defineStore("exercise", {
  state: () => ({
    API_URL: "http://228k123.e2.mars-hosting.com/exercises/",
  }),
});

export default useExerciseStore;
