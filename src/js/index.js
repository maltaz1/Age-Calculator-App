const dayInput = document.getElementById("input-day");
const monthInput = document.getElementById("input-month");
const yearInput = document.getElementById("input-year");
const arrowBtn = document.getElementById("arrow-btn");
const yearsSpan = document.getElementById("years");
const monthsSpan = document.getElementById("months");
const daysSpan = document.getElementById("days");
const errorLabels = document.querySelectorAll(".error");

function mostrarErro() {
  errorLabels.forEach((label) => (label.style.display = "block"));
  dayInput.style.borderColor = "red";
  monthInput.style.borderColor = "red";
  yearInput.style.borderColor = "red";
}

function limparErro() {
  errorLabels.forEach((label) => (label.style.display = "none"));
  dayInput.style.borderColor = "";
  monthInput.style.borderColor = "";
  yearInput.style.borderColor = "";
}

arrowBtn.addEventListener("click", () => {
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
    errorLabels.forEach((label) => {
      mostrarErro();
      return;
    });
  }

  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    mostrarErro();
    return;
  }

  const today = new Date();
  if (birthDate > today) {
    mostrarErro();
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0){
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearsSpan.textContent = `${years} `;
  monthsSpan.textContent = `${months} `;
  daysSpan.textContent = `${days}   `;

  limparErro();
});
