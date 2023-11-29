
<template>
    <p class="naslov">BMR Calculator</p>
    <h2 class="welcome">Welcome To BMR Calculator</h2>
    <p class="description">
      The Basal Metabolic Rate (BMR) is the amount of energy or calories that your body requires to maintain
      basic physiological functions
      while at rest. These functions include processes like breathing, circulating blood, maintaining body
      temperature,
      and supporting cellular activities. BMR represents the minimum amount of energy your body needs to sustain
      these vital functions
      without any additional physical activity.</p>
    <div class="bmr">
      <div class="gender-input">
      <p for="gender">Gender:</p>
      <input class="input-gender" type="radio" name="gender" value="male" v-model="gender"><span> Male </span>
      <input class="input-gender" type="radio" name="gender" value="female" v-model="gender"><span> Female </span>
      </div>
      
      <p>Age:
        <input type="text" id="ageBmr" v-model="age"><br><span id="ageBmr_error"></span>
      </p>
      <p>Height (cm):
        <input type="text" id="heightBmr" v-model="height"><br><span id="heightbmr_error"></span>
      </p>
      <p>Weight (kg):
        <input type="text" id="weightBmr" v-model="weight"><br><span id="weightbmr_error"></span><br>
      </p>
      <p for="activity">Activity Level:</p>
      <select class="activitylabel" name="activity" required v-model="activity">
        <option value="1.2">Sedentary (little or no exercise)</option>
        <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
        <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
        <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
        <option value="1.9">Super active (very hard exercise/sports & physical job)</option>
      </select>
      <br><br>
      <button class="button" id="btn-bmr" @click="calculateBMR">Calculate BMR</button></div>
    <div id="resultWindow" class="result-window">
      <div class="result-content">
        <span id="closeResult" class="close-result" @click="closeResultWindow">&times;</span>
        <div id="resultContent">
          {{ resultText }}
        </div>
      </div>
    </div>  
    <video class="bmr-banner" autoplay loop loading="lazy">
      <source src="../assets/BMRVideo.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
 
</template>

<script>
export default {
  data() {
    return {
      gender: 'male',
      age: '',
      height: '',
      weight: '',
      activity: '1.2',
      result: '',
      resultText: ''
    };
  },
  methods: {
    calculateBMR() {
      let heightbmr_status = false, weight_status = false, age_status = false;
      let bmr;

      if (this.height === '' || isNaN(this.height) || this.height <= 0) {
        document.getElementById('heightbmr_error').innerHTML = 'Please provide a valid height!';
      } else {
        document.getElementById('heightbmr_error').innerHTML = '';
        heightbmr_status = true;
      }

      if (this.weight === '' || isNaN(this.weight) || this.weight <= 0) {
        document.getElementById('weightbmr_error').innerHTML = 'Please provide a valid weight!';
      } else {
        document.getElementById('weightbmr_error').innerHTML = '';
        weight_status = true;
      }

      if (this.age === '' || isNaN(this.age) || this.age <= 0) {
        document.getElementById('ageBmr_error').innerHTML = 'Please provide a valid age!';
      } else {
        document.getElementById('ageBmr_error').innerHTML = '';
        age_status = true;
      }

      if (heightbmr_status && weight_status && age_status) {
        if (this.gender === "male") {
          bmr = 88.362 + (13.397 * parseInt(this.weight)) + (4.799 * parseInt(this.height)) - (5.677 * parseInt(this.age));
        } else if (this.gender === "female") {
          bmr = 447.593 + (9.247 * parseInt(this.weight)) + (3.098 * parseInt(this.height)) - (4.330 * parseInt(this.age));
        }
        const totalCalories = bmr * parseFloat(this.activity);
        this.resultText = `Your BMR:\n ${bmr.toFixed(2)} \ncalories/day\nEstimated Total Calories:\n ${totalCalories.toFixed(2)} \ncalories/day`;
        this.result = totalCalories.toFixed(2);
        this.openResultWindow();
      }
      this.age = '';
      this.height = '';
      this.weight = '';
      
    },
    openResultWindow() {
      let resultWindow = document.getElementById('resultWindow');
      resultWindow.style.display = 'block';
    },
    closeResultWindow() {
      let resultWindow = document.getElementById('resultWindow');
      resultWindow.style.display = 'none';
    }
  }
};
</script>

<style scoped>


  </style>
  