"use strict";

// Todas as interações são demonstrações na página, sem rede ou armazenamento.
function demoValue(input) {
  const value = input.value.trim();
  input.setCustomValidity(value ? "" : "Digite uma informação fictícia para continuar.");
  if (!value) input.reportValidity();
  return value;
}

const loginForm = document.querySelector("#demo-login");

if (loginForm) {
  const nameInput = document.querySelector("#demo-name");
  const loginPanel = document.querySelector("#login-panel");
  const dashboard = document.querySelector("#demo-dashboard");
  const displayName = document.querySelector("#display-name");
  const dashboardTitle = document.querySelector("#dashboard-title");
  const tasks = Array.from(document.querySelectorAll(".demo-task"));
  const progress = document.querySelector("#task-progress");
  const taskStatus = document.querySelector("#task-status");
  const noticeForm = document.querySelector("#notice-form");
  const noticeInput = document.querySelector("#notice-text");
  const noticePreview = document.querySelector("#notice-preview");

  function updateProgress() {
    const count = tasks.filter(task => task.checked).length;
    progress.value = count;
    progress.textContent = `${count} de ${tasks.length}`;
    taskStatus.textContent = `${count} de ${tasks.length} etapas concluídas.`;
  }

  nameInput.addEventListener("input", () => nameInput.setCustomValidity(""));
  tasks.forEach(task => task.addEventListener("change", updateProgress));

  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = demoValue(nameInput);
    if (!name || !loginForm.reportValidity()) return;
    displayName.textContent = name;
    loginPanel.hidden = true;
    dashboard.hidden = false;
    nameInput.value = "";
    dashboardTitle.focus();
  });

  document.querySelector("#logout-button").addEventListener("click", () => {
    dashboard.hidden = true;
    loginPanel.hidden = false;
    displayName.textContent = "";
    loginForm.reset();
    nameInput.setCustomValidity("");
    tasks.forEach(task => { task.checked = false; });
    dashboard.querySelectorAll("details").forEach(detail => { detail.open = false; });
    updateProgress();
    if (noticeForm) {
      noticeForm.reset();
      noticeInput.setCustomValidity("");
      noticePreview.textContent = "";
      noticePreview.hidden = true;
    }
    nameInput.focus();
  });

  if (noticeForm) {
    noticeInput.addEventListener("input", () => noticeInput.setCustomValidity(""));
    noticeForm.addEventListener("submit", event => {
      event.preventDefault();
      const notice = demoValue(noticeInput);
      if (!notice || !noticeForm.reportValidity()) return;
      noticePreview.textContent = `Aviso de demonstração: ${notice}`;
      noticePreview.hidden = false;
      noticeForm.reset();
    });
  }

  document.querySelector("#login-button").disabled = false;
}

const poloForm = document.querySelector("#polo-form");

if (poloForm) {
  const nameInput = document.querySelector("#polo-name");
  const cityInput = document.querySelector("#polo-city");
  const modelInput = document.querySelector("#polo-model");
  const result = document.querySelector("#polo-result");

  [nameInput, cityInput].forEach(input => {
    input.addEventListener("input", () => input.setCustomValidity(""));
  });

  poloForm.addEventListener("submit", event => {
    event.preventDefault();
    result.hidden = true;
    result.textContent = "";
    const name = demoValue(nameInput);
    const city = demoValue(cityInput);
    if (!name || !city || !poloForm.reportValidity()) return;
    result.textContent = `Simulação concluída!\nResponsável: ${name}\nCidade: ${city}\nProposta: ${modelInput.value}\nNenhuma solicitação foi enviada. Os dados desaparecem ao recarregar esta página.`;
    result.hidden = false;
    poloForm.reset();
  });

  document.querySelector("#polo-button").disabled = false;
}
