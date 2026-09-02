const confettiColors = ["#7462f3", "#f27954", "#1f6a47", "#f4c95d", "#ef8ca0"];

function sprinkleConfetti() {
  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = confettiColors[i % confettiColors.length];
    piece.style.animationDelay = `${Math.random() * .4}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.append(piece);
  }
  document.body.append(layer);
  window.setTimeout(() => layer.remove(), 2600);
}

function initLoading() {
  const fill = document.querySelector("[data-load-fill]");
  const percent = document.querySelector("[data-load-percent]");
  const reveal = document.querySelector("[data-load-reveal]");
  const track = document.querySelector("[role='progressbar']");
  if (!fill || !percent || !reveal) return;
  const start = performance.now();
  const duration = 5200;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * 100);
    fill.style.width = `${value}%`;
    percent.textContent = `${value}%`;
    if (track) track.setAttribute("aria-valuenow", value);
    if (progress < 1) window.requestAnimationFrame(tick);
    else reveal.classList.add("visible");
  };
  window.requestAnimationFrame(tick);
}

function initTerminal() {
  const form = document.querySelector("[data-terminal-form]");
  const input = document.querySelector("[data-terminal-input]");
  const output = document.querySelector("[data-terminal-output]");
  if (!form || !input || !output) return;
  const lines = [
    ["> Fetching project_details...", "dim"],
    ["> Error: Sleep_Schedule.sys not found.", ""],
    ["> Warning: Financial budget redirected to Diapers.", ""],
    ["> Success: New user account created.", "success"],
    ["> Final deployment target: March 31, 2027", "success"],
    ["> System Role assigned: YOU ARE GOING TO BE UNCLES/AUNTS!", "success"],
  ];
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.dataset.running) return;
    form.dataset.running = "true";
    input.disabled = true;
    const command = input.value.trim() || "run";
    output.replaceChildren();
    const commandLine = document.createElement("div");
    commandLine.className = "terminal-line";
    commandLine.textContent = `> ${command}`;
    output.append(commandLine);
    lines.forEach(([text, tone], index) => {
      window.setTimeout(() => {
        const line = document.createElement("div");
        line.className = `terminal-line ${tone}`;
        line.textContent = text;
        output.append(line);
        output.scrollTop = output.scrollHeight;
        if (index === lines.length - 1) sprinkleConfetti();
      }, 480 * (index + 1));
    });
  });
}

function initPuzzle() {
  const form = document.querySelector("[data-puzzle-form]");
  const input = document.querySelector("[data-puzzle-input]");
  const attempts = document.querySelector("[data-attempts]");
  const reveal = document.querySelector("[data-puzzle-reveal]");
  if (!form || !input || !attempts || !reveal) return;
  let count = 0;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (count >= 3) return;
    count += 1;
    input.value = "";
    if (count < 3) {
      attempts.textContent = `Nope. Attempt ${count} / 3 — try again.`;
      input.focus();
      return;
    }
    attempts.textContent = "Puzzle complete.";
    input.disabled = true;
    form.querySelector("button").disabled = true;
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

function initIncident() {
  const button = document.querySelector("[data-incident-ack]");
  const reveal = document.querySelector("[data-incident-reveal]");
  if (!button || !reveal) return;
  button.addEventListener("click", () => {
    button.disabled = true;
    button.textContent = "Incident acknowledged";
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

function initPackage() {
  const button = document.querySelector("[data-package-start]");
  const fill = document.querySelector("[data-package-fill]");
  const steps = [...document.querySelectorAll("[data-package-steps] > div")];
  const reveal = document.querySelector("[data-package-reveal]");
  if (!button || !fill || !steps.length || !reveal) return;
  button.addEventListener("click", () => {
    if (button.dataset.running) return;
    button.dataset.running = "true";
    button.textContent = "Scanning live shipment…";
    steps.forEach((step) => step.classList.remove("active", "done"));
    steps[0].classList.add("done");
    steps.forEach((step, index) => {
      window.setTimeout(() => {
        step.classList.add(index === steps.length - 1 ? "active" : "done");
        step.querySelector("small").textContent = index === steps.length - 1 ? "March 31, 2027" : "Complete";
        fill.style.width = `${Math.max(10, index * 25)}%`;
        if (index === steps.length - 1) {
          button.textContent = "Tracking complete ↻";
          reveal.classList.add("visible");
          sprinkleConfetti();
        }
      }, 650 * (index + 1));
    });
  });
}

function initApi() {
  const button = document.querySelector("[data-api-try]");
  const reveal = document.querySelector("[data-api-reveal]");
  if (!button || !reveal) return;
  button.addEventListener("click", () => {
    button.textContent = "Request sent";
    button.disabled = true;
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

function initRelease() {
  const button = document.querySelector("[data-release-accept]");
  const reveal = document.querySelector("[data-release-reveal]");
  if (!button || !reveal) return;
  button.addEventListener("click", () => {
    button.disabled = true;
    button.textContent = "Update accepted";
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

function initCaptcha() {
  const grid = document.querySelector("[data-captcha-grid]");
  const countLabel = document.querySelector("[data-captcha-count]");
  const verify = document.querySelector("[data-captcha-verify]");
  const reveal = document.querySelector("[data-captcha-reveal]");
  if (!grid || !countLabel || !verify || !reveal) return;
  let selected = 0;
  grid.querySelectorAll("button").forEach((tile) => {
    tile.addEventListener("click", () => {
      tile.classList.toggle("selected");
      selected += tile.classList.contains("selected") ? 1 : -1;
      countLabel.textContent = `${selected} selected`;
    });
  });
  verify.addEventListener("click", () => {
    if (selected < 3) {
      countLabel.textContent = "Select a few more squares";
      return;
    }
    verify.disabled = true;
    verify.textContent = "Verified";
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

function initAbTest() {
  const choices = document.querySelectorAll("[data-ab-choice]");
  const result = document.querySelector("[data-ab-result]");
  const picked = document.querySelector("[data-ab-picked]");
  if (!choices.length || !result || !picked) return;
  choices.forEach((choice) => choice.addEventListener("click", () => {
    choices.forEach((button) => { button.disabled = true; });
    picked.textContent = choice.dataset.abChoice;
    result.classList.add("visible");
    sprinkleConfetti();
  }));
}

function initSmartHome() {
  const button = document.querySelector("[data-home-scan]");
  const device = document.querySelector("[data-new-device]");
  const reveal = document.querySelector("[data-home-reveal]");
  if (!button || !device || !reveal) return;
  button.addEventListener("click", () => {
    button.disabled = true;
    button.textContent = "Scan complete";
    device.classList.add("scanned");
    device.querySelector("span").textContent = "◉";
    device.querySelector("strong").textContent = "Baby monitor";
    device.querySelector("small").textContent = "Provisioning";
    reveal.classList.add("visible");
    sprinkleConfetti();
  });
}

initLoading();
initTerminal();
initPuzzle();
initIncident();
initPackage();
initApi();
initRelease();
initCaptcha();
initAbTest();
initSmartHome();
