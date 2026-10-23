const form = document.getElementById("register-form");
const confirmation = document.getElementById("confirmation");
const savedList = document.getElementById("saved-list");
const clearBtn = document.getElementById("clear-btn");

function getRegistrations() {
  const data = localStorage.getItem("registrations");
  return data ? JSON.parse(data) : [];
}

function showRegistrations() {
  const registrations = getRegistrations();
  savedList.innerHTML = "";

  if (registrations.length === 0) {
    savedList.innerHTML = "<tr><td colspan=\"5\">No registrations yet.</td></tr>";
    return;
  }

  registrations.forEach(function (r) {
    const row = document.createElement("tr");
    [r.name, r.email, r.phone, r.event, r.source].forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    savedList.appendChild(row);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const registration = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    event: document.getElementById("event").value,
    source: form.elements["source"].value
  };

  const registrations = getRegistrations();
  registrations.push(registration);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  confirmation.textContent = "Thanks, " + registration.name + "! You are registered for " + registration.event + ".";
  form.reset();
  showRegistrations();
});

clearBtn.addEventListener("click", function () {
  localStorage.removeItem("registrations");
  confirmation.textContent = "All saved registrations cleared.";
  showRegistrations();
});

showRegistrations();