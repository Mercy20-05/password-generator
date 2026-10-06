// Character Sets
const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?"
};

// DOM Elements
const passwordOutput = document.getElementById("password-output");
const copyBtn = document.getElementById("copy-btn");
const copyFeedback = document.getElementById("copy-feedback");
const lengthSlider = document.getElementById("length-slider");
const lengthVal = document.getElementById("length-val");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const errorMessage = document.getElementById("error-message");

// Update length display on slider input
lengthSlider.addEventListener("input", (e) => {
  lengthVal.textContent = e.target.value;
});

// Helper: Pick a random item from a string or array
function getRandomChar(str) {
  const index = Math.floor(Math.random() * str.length);
  return str[index];
}

// Fisher-Yates shuffle algorithm to mix array thoroughly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Password Generator Function
function generatePassword() {
  const length = parseInt(lengthSlider.value, 10);
  const includeUpper = uppercaseCheck.checked;
  const includeLower = lowercaseCheck.checked;
  const includeNumbers = numbersCheck.checked;
  const includeSymbols = symbolsCheck.checked;

  errorMessage.textContent = "";

  // 1. Validation: Handle case where no character option is selected
  if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
    errorMessage.textContent = "Please select at least one character type.";
    passwordOutput.value = "";
    return;
  }

  let pool = "";
  const guaranteedChars = [];

  // 2. Build character pool and ensure at least one character of each selected type is included
  if (includeUpper) {
    pool += CHAR_SETS.uppercase;
    guaranteedChars.push(getRandomChar(CHAR_SETS.uppercase));
  }
  if (includeLower) {
    pool += CHAR_SETS.lowercase;
    guaranteedChars.push(getRandomChar(CHAR_SETS.lowercase));
  }
  if (includeNumbers) {
    pool += CHAR_SETS.numbers;
    guaranteedChars.push(getRandomChar(CHAR_SETS.numbers));
  }
  if (includeSymbols) {
    pool += CHAR_SETS.symbols;
    guaranteedChars.push(getRandomChar(CHAR_SETS.symbols));
  }

  // 3. Fill the remaining characters randomly from the pooled characters
  const remainingLength = length - guaranteedChars.length;
  const randomChars = [];

  for (let i = 0; i < remainingLength; i++) {
    randomChars.push(getRandomChar(pool));
  }

  // 4. Combine and shuffle to avoid predictable character positions
  const finalPasswordArray = shuffleArray([...guaranteedChars, ...randomChars]);
  passwordOutput.value = finalPasswordArray.join("");
}

// Copy to Clipboard logic
async function copyToClipboard() {
  const password = passwordOutput.value;
  if (!password) return;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(password);
    } else {
      // Fallback for older browsers or insecure contexts
      passwordOutput.select();
      document.execCommand("copy");
    }

    // Show temporary feedback tooltip
    copyFeedback.classList.add("show");
    setTimeout(() => {
      copyFeedback.classList.remove("show");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy password:", err);
  }
}

// Event Listeners
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);

// Automatically generate a password on page load
window.addEventListener("DOMContentLoaded", generatePassword);