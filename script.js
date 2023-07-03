const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

// numberInput.addEventListener("input", handleInputChange);

let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let btn = document.getElementById("generateBtn");
let passbox = document.getElementById("passBox");
let copyIcon = document.getElementById("copy");

let parentDiv = document.getElementById("parent");
let childDiv = parentDiv.querySelectorAll(".childDiv");

// showing input slider value

let slider = document.getElementById("sliderValue");
let inputRange = document.getElementById("inputRange");
slider.textContent = inputRange.value;

inputRange.addEventListener("input", () => {
  slider.textContent = inputRange.value;
});

btn.addEventListener("click", () => {
  // console.log("passbox", passbox.value);
  passbox.value = generatePassword();

  const minLength = 8;

  // Regular expressions for various password criteria
  const regex = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    digit: /[0-9]/,
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  };

  // Initialize the strength score
  let strength = 0;

  // Check the length of the password
  if (passbox.value.length >= minLength) {
    strength++;
  }

  // Check for uppercase and lowercase letters
  if (
    regex.uppercase.test(passbox.value) ||
    regex.lowercase.test(passbox.value)
  ) {
    strength++;
  }

  // Check for specialcharacter letters
  if (regex.specialChar.test(passbox.value)) {
    strength++;
  }

  // Check for digits
  if (regex.digit.test(passbox.value)) {
    strength++;
  }
  let i = 0;
  for (i = 0; i < strength; i++) {
    childDiv[i].style.backgroundColor = "#a4ffaf";
  }
  for (let j = i; j < 4; j++) {
    childDiv[j].style.backgroundColor = "";
  }
});

let lowerCase = "abcdefghijklmnopqrstuvwxyz";
let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*(*+)-<.>?:;{}[]|";

function generatePassword() {
  let genPassword = "";
  let allChars = "";

  allChars += lowercase.checked ? lowerCase : "";
  allChars += uppercase.checked ? upperCase : "";
  allChars += numbers.checked ? allNumbers : "";
  allChars += symbols.checked ? allSymbols : "";

  if (allChars.length == 0 || allChars == "") {
    alert("Check The Box");
    return genPassword;
  }
  let i = 1;
  while (i <= inputRange.value) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    i++;
  }
  return genPassword;
}

copyIcon.addEventListener("click", () => {
  if (passbox.value != "" || passbox.value.length >= 1) {
    navigator.clipboard.writeText(passbox.value);
    alert("Copy to the Clipboard");
  }
});
