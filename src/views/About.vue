<template>
    <h2 class="naslov">About Everything Fitness</h2>
    <p class="nasvlovUvod">Welcome to Everything Fitness, your ultimate source for all things related to health and
        wellness. Our story began with a passion for helping individuals embark on a journey to a healthier, happier life.
        We believe that everyone has the potential to reach their fitness goals and improve their overall well-being, and we
        are here to provide the knowledge, guidance, and support needed to make that a reality.</p>
    <h2 class="naslov2">Our Mission</h2>
    <p class="nasvlovUvod2">At Everything Fitness, our mission is clear: to empower and inspire individuals to take control
        of their health and fitness. We are committed to delivering reliable, evidence-based information, expert advice, and
        a supportive community to help you achieve your goals. Whether you're aiming to shed a few pounds, build muscle, or
        simply lead a more active lifestyle, we are here to guide you every step of the way.</p>
    <h2 class="naslov3">What Sets Us Apart</h2>
    <ul class="nasvlovUvod3">
        <li>Expertise: We collaborate with certified fitness trainers, nutritionists, mental health professionals, and
            wellness experts who share their knowledge and insights to help you make informed choices on your fitness
            journey.</li>
        <li>Community: Our vibrant community of fitness enthusiasts offers a space for sharing experiences, providing
            motivation, and offering a sense of belonging. We're all in this together.</li>
        <li>Holistic Approach: We understand that fitness is more than just physical health; it's about mental well-being
            too. Our content addresses the interconnectedness of physical and mental health, fostering a balanced approach
            to overall wellness.</li>
        <li>User-Centric Design: We've created an easy-to-navigate website to ensure you can find the information you need
            efficiently. Your experience matters to us, and we aim to make your journey with us as smooth as possible.</li>
    </ul>
    <h2 class="naslov4">Join Us on Your Fitness Journey</h2>
    <p class="nasvlovUvod4">Whether you're at the beginning of your fitness adventure or looking to take your current
        routine to the next level, Everything Fitness is your companion on the path to a healthier you. We invite you to
        explore our website, engage with our community, and allow us to be a part of your fitness and wellness
        transformation.
        <br> Thank you for choosing Everything Fitness as your partner in achieving your health and fitness goals. Together,
        we can make a positive impact on your life, one step at a time.
    </p>

    <div class="Rmark">&copy; 2023 EverythingFitnes. All Rights Reserved By IT Crowd</div>
    <p class="terms1" href="#">Privacy Policy</p>
    <p class="terms2" href="#">Terms & Condition</p>
</template>
<style scoped>
/* OZNAKE ZA AUTORSKA PRAVA */
.Rmark {
    position: absolute;
    bottom: 50px;
    left: 100px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
}
.terms1 {
    position: absolute;
    bottom: 40px;
    right: 250px;
    color: white;
}
.terms2 {
    position: absolute;
    bottom: 40px;
    right: 100px;
    color: white;
}
/* NASLOVI I UVODI */
.naslov {
    position: absolute;
    top: 200px;
    left: 80px;
    color: hsl(270, 100%, 50%);
    font-size: 25px;
    filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
}
.nasvlovUvod {
    position: absolute;
    top: 300px;
    left: 50px;
    text-wrap: wrap;
    width: 500px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
}
.naslov2 {
    position: absolute;
    bottom: 300px;
    left: 200px;
    color: hsl(270, 100%, 50%);
    font-size: 25px;
    filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
}
.nasvlovUvod2 {
    position: absolute;
    bottom: 150px;
    left: 50px;
    text-wrap: wrap;
    width: 500px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
}
.naslov3 {
    position: absolute;
    top: 200px;
    right: 150px;
    color: hsl(270, 100%, 50%);
    font-size: 25px;
    filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
}
.nasvlovUvod3 {
    position: absolute;
    top: 300px;
    right: 50px;
    text-wrap: wrap;
    width: 500px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
}
.naslov4 {
    position: absolute;
    bottom: 300px;
    right: 50px;
    color: hsl(270, 100%, 50%);
    font-size: 25px;
    filter: drop-shadow(0px 0px 15px rgb(86, 147, 227));
}
.nasvlovUvod4 {
    position: absolute;
    bottom: 140px;
    right: 50px;
    text-wrap: wrap;
    width: 500px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
}

/* Manji Mobilni Telefoni */
@media all 
and (max-width : 360px)  { 
    .naslov {
    color: hsl(270, 100%, 50%);
    font-size: 20px;
    top: 140px;
    left: 40%;
    width: 400px;
  }

  .nasvlovUvod {
    position: absolute;
    top: 200px;
    left: 50%;
    text-wrap: wrap;
    width: 300px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
  }
  .naslov2, .naslov3, .naslov4 {
    display: none;
  }

  .nasvlovUvod2, .nasvlovUvod3, .nasvlovUvod4 {
    display: none;
  }

  .terms1, .terms2, .Rmark {
    display: none;
  }

  li {
    display: none;
  }
}

/* Veci Mobilni Telefoni */
@media all
and (min-device-width : 361px) 
and (max-device-width : 520px) {
    .naslov {
    color: hsl(270, 100%, 50%);
    font-size: 20px;
    top: 140px;
    left: 15%;
    width: 400px;
  }

  .nasvlovUvod {
    position: absolute;
    top: 200px;
    left: 25%;
    text-wrap: wrap;
    width: 300px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
  }
  .naslov2, .naslov3, .naslov4 {
    display: none;
  }

  .nasvlovUvod2, .nasvlovUvod3, .nasvlovUvod4 {
    display: none;
  }

  .terms1, .terms2, .Rmark {
    display: none;
  }

  li {
    display: none;
  }
}
/* SREDNJA VELICINA 521 do 721 */
@media all
and (min-device-width : 521px) 
and (max-device-width : 721px) {
    .naslov {
    color: hsl(270, 100%, 50%);
    font-size: 20px;
    top: 140px;
    left: 25%;
    width: 400px;
  }

  .nasvlovUvod {
    position: absolute;
    top: 200px;
    left: 30%;
    text-wrap: wrap;
    width: 300px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
  }
  .naslov2, .naslov3, .naslov4 {
    display: none;
  }

  .nasvlovUvod2, .nasvlovUvod3, .nasvlovUvod4 {
    display: none;
  }

  .terms1, .terms2, .Rmark {
    display: none;
  }

  li {
    display: none;
  }
}
/* SREDNJA VELICINA 721 do 1024 */
@media all
and (min-device-width : 722px) 
and (max-device-width : 1024px) {
    .naslov {
    color: hsl(270, 100%, 50%);
    font-size: 20px;
    top: 140px;
    left: 25%;
    width: 400px;
  }

  .nasvlovUvod {
    position: absolute;
    top: 200px;
    left: 30%;
    text-wrap: wrap;
    width: 300px;
    color: white;
    font-size: 15px;
    filter: drop-shadow(0px 0px 15px black);
  }
  .naslov2, .naslov3, .naslov4 {
    display: none;
  }

  .nasvlovUvod2, .nasvlovUvod3, .nasvlovUvod4 {
    display: none;
  }

  .terms1, .terms2, .Rmark {
    display: none;
  }

  li {
    display: none;
  }
}
/* FULL HD :D od 1024 */
@media all
and (min-device-width : 1025px) 
and (max-device-width : 1920px) {

}

</style>
