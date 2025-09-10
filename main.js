const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// feature container
ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  interval: 500,
});

// news container
// news container
ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  interval: 500,
});

// === Login with localStorage (FINAL bulletproof version) ===
document.addEventListener("DOMContentLoaded", () => {
  // Ensure modal exists BEFORE anything
  if (!document.getElementById("login-modal")) {
    const modalHTML = `
      <div id="login-modal" class="modal" aria-hidden="true" style="display:none;">
        <div class="modal-content">
          <button class="close-btn" aria-label="Close">&times;</button>
          <h2>Login</h2>
          <form id="login-form" class="login-form">
            <label for="username">Username</label>
            <input type="text" id="username" required />
            <label for="password">Password</label>
            <input type="password" id="password" required />
            <button type="submit" class="btn">Login</button>
          </form>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const closeBtn = loginModal.querySelector(".close-btn");
  const loginForm = loginModal.querySelector("#login-form");

  const showModal = () => {
    loginModal.style.display = "flex";
    loginModal.setAttribute("aria-hidden", "false");
  };

  const hideModal = () => {
    loginModal.style.display = "none";
    loginModal.setAttribute("aria-hidden", "true");
    loginForm.reset();
  };

  const showLoggedIn = (username) => {
    loginBtn.textContent = `Logout (${username})`;
    loginBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("Logged out!");
      location.reload();
    };
  };

  const savedUser = localStorage.getItem("loggedInUser");
  if (savedUser) {
    showLoggedIn(savedUser);
    return;
  }

  loginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  closeBtn?.addEventListener("click", hideModal);
  loginModal?.addEventListener("click", (e) => {
    if (e.target === loginModal) hideModal();
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", username);
      hideModal();
      showLoggedIn(username);
    } else {
      alert("Invalid credentials. Try admin / 1234");
    }
  });
});


// Login Modal
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const closeBtn = document.querySelector(".close-btn");
const loginForm = document.getElementById("login-form");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

loginForm.addEentListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple demo authentication
  if (username === "admin" && password === "1234") {
    alert("Login Successful!");
    loginModal.style.display = "none";
  } else {
    alert("Invalid credentials!");
  }
});

// === Login modal: safe, creates modal if missing ===
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const loginBtn = document.getElementById("login-btn");
      if (!loginBtn) {
        console.warn("Login: No element with id='login-btn' found.");
        return;
      }

      // If modal exists in HTML, use it; else create it.
      let loginModal = document.getElementById("login-modal");
      if (!loginModal) {
        const modalHTML = `
          <div id="login-modal" class="modal" aria-hidden="true">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="login-title">
              <button class="close-btn" aria-label="Close">&times;</button>
              <h2 id="login-title">Login</h2>
              <form id="login-form" class="login-form">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit" class="btn">Login</button>
              </form>
            </div>
          </div>`;
        document.body.insertAdjacentHTML("beforeend", modalHTML);
        loginModal = document.getElementById("login-modal");
      }

      const closeBtn = loginModal.querySelector(".close-btn");
      const loginForm = loginModal.querySelector("#login-form");

      const showModal = () => {
        loginModal.setAttribute("aria-hidden", "false");
        // small delay so CSS transitions (if any) run more smoothly:
        loginModal.style.display = "flex";
      };
      const hideModal = () => {
        loginModal.setAttribute("aria-hidden", "true");
        loginModal.style.display = "none";
        if (loginForm) loginForm.reset();
      };

      // open modal when login button clicked
      loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showModal();
      });

      // close button
      if (closeBtn) closeBtn.addEventListener("click", hideModal);

      // click outside to close
      loginModal.addEventListener("click", function (e) {
        if (e.target === loginModal) hideModal();
      });

      // simple form handler (demo credentials)
      if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const username = (loginForm.querySelector("#username")?.value || "").trim();
          const password = (loginForm.querySelector("#password")?.value || "").trim();

          // DEMO: replace with real authentication later
          if (username === "admin" && password === "1234") {
            alert("Login successful!");
            hideModal();
            // example: change nav to show logged-in state
            // loginBtn.textContent = "Welcome, admin";
          } else {
            alert("Invalid credentials. Try admin / 1234");
          }
        });
      } else {
        console.warn("Login: #login-form not found inside modal.");
      }
    } catch (err) {
      console.error("Login: unexpected error", err);
    }
  });
})();

// === Login with localStorage (safe version) ===
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");

  // Create modal if not already in HTML
  let loginModal = document.getElementById("login-modal");
  if (!loginModal) {
    const modalHTML = `
      <div id="login-modal" class="modal" aria-hidden="true">
        <div class="modal-content">
          <button class="close-btn" aria-label="Close">&times;</button>
          <h2>Login</h2>
          <form id="login-form" class="login-form">
            <label for="username">Username</label>
            <input type="text" id="username" required />
            <label for="password">Password</label>
            <input type="password" id="password" required />
            <button type="submit" class="btn">Login</button>
          </form>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    loginModal = document.getElementById("login-modal");
  }

  const closeBtn = loginModal.querySelector(".close-btn");
  const loginForm = loginModal.querySelector("#login-form");

  const showModal = () => {
    loginModal.style.display = "flex";
    loginModal.setAttribute("aria-hidden", "false");
  };
  const hideModal = () => {
    loginModal.style.display = "none";
    loginModal.setAttribute("aria-hidden", "true");
    loginForm.reset();
  };

  const showLoggedIn = (username) => {
    loginBtn.textContent = `Logout (${username})`;
    loginBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("Logged out!");
      location.reload();
    };
  };

  // Check if already logged in
  const savedUser = localStorage.getItem("loggedInUser");
  if (savedUser) {
    showLoggedIn(savedUser);
    return;
  }

  // Attach listeners only if loginBtn exists
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hideModal);
  }

  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) hideModal();
  });

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "1234") {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        hideModal();
        showLoggedIn(username);
      } else {
        alert("Invalid credentials. Try admin / 1234");
      }
    });
  }
});

// === Booking Form Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");

  if (!bookingForm) {
    console.error("Booking form not found!");
    return;
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const arrivalInput = document.getElementById("arrival");
    const departureInput = document.getElementById("departure");
    const guestsInput = document.getElementById("guests");

    const arrival = new Date(arrivalInput.value);
    const departure = new Date(departureInput.value);
    const guests = parseInt(guestsInput.value);

    if (!arrivalInput.value || !departureInput.value || isNaN(guests)) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (departure <= arrival) {
      alert("Departure date must be after arrival date.");
      return;
    }

    const nights = Math.ceil((departure - arrival) / (1000 * 60 * 60 * 24));

    alert(
      `Booking Summary:\n\nArrival: ${arrival.toDateString()}\nDeparture: ${departure.toDateString()}\nGuests: ${guests}\nNights: ${nights}`
    );
  });
});

// === Reviews Slider ===
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".review__card");
  const prevBtn = document.querySelector(".reviews__controls .prev");
  const nextBtn = document.querySelector(".reviews__controls .next");
  let currentIndex = 0;

  function showReview(index) {
    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === index) card.classList.add("active");
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showReview(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showReview(currentIndex);
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    showReview(currentIndex);
  }, 5000);

  showReview(currentIndex);
});
