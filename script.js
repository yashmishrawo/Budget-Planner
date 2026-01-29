// ===== ELEMENTS =====
console.log("JS connected successfully");

const budgetInput = document.getElementById("budgetInput");
const saveBudgetBtn = document.getElementById("saveBudgetBtn");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const distributionList = document.getElementById("distributionList");

// ===== DATA =====
const percentages = {
  "Food & Groceries": 30,
  "Transport": 10,
  "Training & Personal Dev": 10,
  "Daily Expenses": 20,
  "Academic Supplies": 5
};

let monthlyBudget = 0;

// ===== LOAD SAVED DATA =====
window.onload = function () {
  const savedBudget = localStorage.getItem("monthlyBudget");

  if (savedBudget) {
    monthlyBudget = Number(savedBudget);
    step1.style.display = "none";
    step2.style.display = "block";
    showDistribution(monthlyBudget);
  }
};

// ===== SAVE BUDGET =====
saveBudgetBtn.addEventListener("click", function () {
  const value = Number(budgetInput.value);

  if (value <= 0) {
    alert("Please enter a valid budget amount");
    return;
  }

  monthlyBudget = value;
  localStorage.setItem("monthlyBudget", monthlyBudget);

  step1.style.display = "none";
  step2.style.display = "block";

  showDistribution(monthlyBudget);
});

// ===== SHOW DISTRIBUTION =====
function showDistribution(budget) {
  distributionList.innerHTML = "";

  for (let category in percentages) {
    const percent = percentages[category];
    const amount = (budget * percent) / 100;

    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <label><strong>${category}</strong></label><br>
      <input 
        type="number" 
        class="category-input"
        data-category="${category}"
        value="${amount.toFixed(0)}"
      >
    `;

    distributionList.appendChild(div);
  }

  // Savings display
  const savingsDiv = document.createElement("div");
  savingsDiv.id = "savingsDiv";
  savingsDiv.style.marginTop = "15px";
  savingsDiv.style.fontWeight = "bold";

  distributionList.appendChild(savingsDiv);

  updateSavings();
}

// ===== UPDATE SAVINGS =====
function updateSavings() {
  let totalSpent = 0;

  document.querySelectorAll(".category-input").forEach(input => {
    totalSpent += Number(input.value);
  });

  const savingsAmount = monthlyBudget - totalSpent;
  const savingsPercent = (savingsAmount / monthlyBudget) * 100;

  const savingsDiv = document.getElementById("savingsDiv");

  savingsDiv.innerHTML = `
    Savings: ₹${savingsAmount.toFixed(2)} (${savingsPercent.toFixed(1)}%)
  `;

  savingsDiv.style.color = savingsAmount < 0 ? "red" : "green";
}

// ===== LIVE ADJUSTMENT =====
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("category-input")) {
    updateSavings();
  }
});
