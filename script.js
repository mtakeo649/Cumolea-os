
const CORRECT_PIN = "0919";
const RECIPIENT_NAME = "Linchy";

const lockScreen = document.getElementById("lockScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const pinDisplay = document.getElementById("pinDisplay");
const keypad = document.getElementById("keypad");
const errorMessage = document.getElementById("errorMessage");
const recipientName = document.getElementById("recipientName");
const balloonContainer = document.getElementById("balloonContainer");
const confettiContainer = document.getElementById("confettiContainer");
const birthdayMusic = document.getElementById("birthdayMusic");
const letterModal = document.getElementById("letterModal");

let currentPin = "";

recipientName.textContent = RECIPIENT_NAME;

function updatePinDisplay() {
  const dots = pinDisplay.querySelectorAll("span");

  dots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < currentPin.length);
  });
}

function clearPin() {
  currentPin = "";
  updatePinDisplay();
}

function submitPin() {
  if (currentPin === CORRECT_PIN) {
    unlockBirthday();
  } else {
    errorMessage.classList.add("show");
    clearPin();

    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 1800);
  }
}

function addNumber(number) {
  if (currentPin.length >= 4) return;

  currentPin += number;
  updatePinDisplay();

  if (currentPin.length === CORRECT_PIN.length) {
    setTimeout(submitPin, 180);
  }
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const key = button.dataset.key;

  if (key === "clear") {
    clearPin();
  } else if (key === "enter") {
    submitPin();
  } else {
    addNumber(key);
  }
});

document.addEventListener("keydown", (event) => {
  if (!lockScreen.classList.contains("active")) return;

  if (/^[0-9]$/.test(event.key)) {
    addNumber(event.key);
  } else if (event.key === "Backspace") {
    clearPin();
  } else if (event.key === "Enter") {
    submitPin();
  }
});

function unlockBirthday() {
  lockScreen.classList.remove("active");
  birthdayScreen.classList.add("active");

  createBalloons(18);
  createConfetti(120);
  birthdayMusic.play().catch(() => {
    document.getElementById("musicHint").style.display = "block";
  });
}

function createBalloons(amount) {
  const balloons = ["🎈", "🎈", "🎈", "🎈", "🎈"];

  for (let i = 0; i < amount; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = balloons[i % balloons.length];

    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDuration = `${7 + Math.random() * 7}s`;
    balloon.style.animationDelay = `${Math.random() * 3}s`;

    balloonContainer.appendChild(balloon);
  }
}

function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${3 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    confettiContainer.appendChild(piece);
  }
}


document.getElementById("messageButton").addEventListener("click", () => {
  letterModal.classList.add("open");
});

document.getElementById("closeLetter").addEventListener("click", () => {
  letterModal.classList.remove("open");
});

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    letterModal.classList.remove("open");
  }
});


document.getElementById("musicHint").addEventListener("click", () => {
  birthdayMusic.play();
  document.getElementById("musicHint").style.display = "none";
});
