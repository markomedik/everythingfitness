<template>
  <div>
    <img class="bmicalc" src="../assets/BMIREM1.png" />
    <img class="bmicalc1" src="../assets/BMIprikaz3R.png" />
    <p class="bmi-text">
      Body Mass Index (BMI) uses your height and weight to estimate how much
      body fat you have.
    </p>
    <p class="bmi-naslov">Body Mass Index (BMI)</p>
    <p class="bmi-naslov2">kg / m2</p>
    <p class="bmi-naslov2-brojevi">
      15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35
    </p>
    <div class="bmicalc-content">
      <h4 class="naslov">BMI Calculator</h4>
      <h2 class="welcome">Welcome To BMI Calculator</h2>

      <div class="gender-button">
        <p id="input-p" for="gender">Gender:</p>
        <input
          class="input-radio"
          type="radio"
          name="gender"
          value="male"
          v-model="gender"
          checked
        /><span> Male </span>
        <input
          class="input-radio"
          type="radio"
          name="gender"
          value="female"
          v-model="gender"
        />
        <span> Female </span>
      </div>

      <br /><br />
      <p class="description">
        The Body Mass Index (BMI) is a numerical measurement used to assess an
        individual's body weight in relation to their height. It is a simple and
        widely used method to categorize people into different weight ranges,
        which helps in determining whether a person is underweight, normal
        weight, overweight, or obese. BMI provides a general indication of the
        level of body fat and can be a useful tool for identifying potential
        health risks associated with weight.
      </p>
      <br />
      <div class="bmi" @keyup.enter="calculateBMI">
        <p>
          Height (cm):
          <input type="text" v-model="height" :id="heightInputId" /><br />
          <span :id="heightErrorId">{{ heightError }}</span>
        </p>
        <p>
          Weight (kg):
          <input type="text" v-model="weight" :id="weightInputId" /><br />
          <span :id="weightErrorId">{{ weightError }}</span>
        </p>
        <button class="button" @click="calculateBMI">Calculate BMI</button>
        <br />
      </div>
    </div>
    <p class="rezultat" id="output" v-html="result"></p>
  </div>
</template>

<script>
import SevereUnderweightImage from "@/assets/SevereUnderweight.jpg";
import UnderweightImage from "@/assets/UnderweightR.png";
import NormalWeightImage from "@/assets/NormalR.png";
import OverweightImage from "@/assets/OverweightR.png";
import ObesityImage from "@/assets/ObesityR.png";

export default {
  data() {
    return {
      height: "",
      weight: "",
      heightError: "",
      weightError: "",
      heightInputId: "heightBmi",
      weightInputId: "weightBmi",
      heightErrorId: "heightBmi_error",
      weightErrorId: "weightBmi_error",
      result: "",
      gender: "male",
    };
  },
  methods: {
    calculateBMI() {
      this.validateInput(this.height, "heightError", "height");
      this.validateInput(this.weight, "weightError", "weight");

      if (this.heightError === "" && this.weightError === "") {
        const bmi = (
          this.weight /
          ((this.height * this.height) / 10000)
        ).toFixed(2);
        this.displayResult(bmi);
        this.height = "";
        this.weight = "";
      } else {
        this.result = "The form has errors";
      }
    },
    validateInput(value, errorElement, inputElement) {
      if (value === 0 || isNaN(value) || value <= 0) {
        this[errorElement] = `Please provide a valid ${inputElement}!`;
      } else {
        this[errorElement] = "";
      }
    },
    displayResult(bmi) {
      if (bmi < 16.5) {
        this.result = `Severely underweight: ${bmi} <img src="${SevereUnderweightImage}" alt="Severely Underweight">`;
      } else if (bmi >= 16.6 && bmi < 18.5) {
        this.result = `Underweight: ${bmi} <img src="${UnderweightImage}" alt="Underweight">`;
      } else if (bmi >= 18.6 && bmi < 24.9) {
        this.result = `Normal weight: ${bmi} <img src="${NormalWeightImage}" alt="Normal Weight">`;
      } else if (bmi >= 25 && bmi < 29.9) {
        this.result = `Overweight: ${bmi} <img src="${OverweightImage}" alt="Overweight">`;
      } else {
        this.result = `Obesity: ${bmi}  <img src="${ObesityImage}" alt="Obesity">`;
      }
    },
  },
};
</script>

<style scoped>
body {
  width: 100vh;
  position: center;
  size: cover;
}
/* LOGO I LEVA STRANA */
.bmicalc {
  top: 90px;
  left: 200px;
  position: absolute;
  width: 200px;
  z-index: 5;
}
.bmicalc1 {
  top: 350px;
  left: 45px;
  position: absolute;
  width: 550px;
  height: auto;
  z-index: 5;
}
.bmi-naslov {
  position: absolute;
  top: 310px;
  left: 180px;
  width: 300px;
  font-size: 25px;
  color: white;
  text-wrap: wrap;
  z-index: 5;
}
.bmi-naslov2 {
  position: absolute;
  top: 340px;
  left: 270px;
  width: 300px;
  font-size: 25px;
  color: white;
  z-index: 5;
}
.bmi-naslov2-brojevi {
  position: absolute;
  top: 680px;
  left: 70px;
  width: 500px;
  font-size: 9px;
  color: white;
  letter-spacing: 4px;
  z-index: 5;
}
.bmi-text {
  position: absolute;
  bottom: 150px;
  left: 30px;
  font-size: 18px;
  color: white;
  z-index: 5;
}
/* NASLOV I DESNA STRANA */
.naslov {
  position: absolute;
  top: 300px;
  left: 200px;
}
.bmi {
  position: absolute;
  top: 100px;
  left: 200px;
  margin-top: 40px;
}

.bmi p {
  margin-bottom: 10px;
}
.welcome {
  position: absolute;
  top: 0px;
  left: 100px;
  width: 600px;
}
.description {
  position: absolute;
  top: 380px;
  color: white;
}
.button {
  display: inline-block;
  padding: 0.65em 1.6em;
  margin: 20px 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: white;
  background: transparent;
  text-align: center;
  transition: all 0.2s;
  animation: buttonbouncy 5s infinite linear;
  position: relative;
  width: 280px;
}
.button:hover {
  background-color: blueviolet;
  color: white;
  border-radius: 10px;
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
/* REZULTAT */
.rezultat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 260px;
  right: 10px;
  color: white;
  font-size: 25px;
  z-index: 5;
}
.rezultat img {
  width: 100px;
  height: 300px;
  margin-top: 10px;
  z-index: 5;
}
p {
  margin-bottom: 0px;
}

.gender-button {
  display: flex;
  position: relative;
  width: 300px;
  top: 90px;
  left: 38%;
  align-items: center;
  justify-content: space-around;
}
</style>
