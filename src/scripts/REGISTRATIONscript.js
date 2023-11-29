// JavaScript kod za slanje podataka na server
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "url_za_obradu_podataka_na_serveru.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    xhr.send(formData);
});

/*----------------------------------image----------------------------------------------*/


document.getElementById("profileImage").addEventListener("change", function (event) {
    let selectedImageContainer = document.getElementById("selectedImageContainer");
    let selectedImage = document.getElementById("selectedImage");
  
    selectedImageContainer.style.display = "block";
  
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        selectedImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      selectedImage.src = "#";
    }
  });
  




