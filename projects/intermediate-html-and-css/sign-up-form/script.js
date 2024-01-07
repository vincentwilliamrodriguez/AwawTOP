const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const warning = document.getElementById("warning");

password.onchange = validatePassword;
confirm.onkeyup = validatePassword;

function validatePassword() {
  if (password.value == confirm.value) {
    confirm.setCustomValidity("");
    confirm.classList.remove("error")
    password.classList.remove("error")
    warning.style.opacity = 0;
  }
  else {
    confirm.setCustomValidity("Passwords do not match.");
    confirm.classList.add("error")
    password.classList.add("error")
    warning.style.opacity = 1;
  }
}