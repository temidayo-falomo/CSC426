
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";


const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");


function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message";

  if (type) {
    messageEl.classList.add(type);
  }
}

function clearMessage() {
  messageEl.textContent = "";
  messageEl.className = "message";
}

/* ===========================
   Input validation
   =========================== */
function validateInputs() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  let isValid = true;

  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  if (username === "") {
    usernameInput.classList.add("invalid");
    isValid = false;
  }

  if (password === "") {
    passwordInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    showMessage("Username and password are required.", "error");
  }

  return isValid;
}

/* ===========================
   Auth check
   =========================== */
function authenticate(username, password) {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}


loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateInputs()) {
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (authenticate(username, password)) {
    showMessage("Login Successful", "success");
  } else {
    showMessage("Invalid Username or Password", "error");
  }
});

resetBtn.addEventListener("click", () => {
  loginForm.reset();
  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
  clearMessage();
});
