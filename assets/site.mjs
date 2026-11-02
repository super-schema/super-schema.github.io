import { EXAMPLES } from "./examples.mjs?v=2";

const panel = document.getElementById("example-panel");
if (panel) {
  const tabs = [...document.querySelectorAll('[role="tab"][data-format]')];
  const code = document.getElementById("example-code");
  const filename = document.getElementById("example-filename");
  const targets = [...document.querySelectorAll("[data-target]")];
  const note = document.getElementById("example-detail");

  function selectFormat(key) {
    if (!Object.hasOwn(EXAMPLES, key)) return;
    const example = EXAMPLES[key];
    code.textContent = example.code;
    filename.textContent = example.filename;
    note.textContent = example.note ?? "Review the generated artifact, field types, and optionality before adopting an output.";
    code.parentElement.scrollTop = 0;
    code.parentElement.scrollLeft = 0;
    panel.setAttribute("aria-labelledby", "format-" + key);
    for (const tab of tabs) {
      const selected = tab.dataset.format === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const target of targets) {
      target.classList.toggle("is-active", target.dataset.target === key);
      target.setAttribute("aria-pressed", String(target.dataset.target === key));
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectFormat(tab.dataset.format));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectFormat(tabs[next].dataset.format);
      tabs[next].focus();
    });
  });
  for (const target of targets) {
    target.addEventListener("click", () => selectFormat(target.dataset.target));
  }
  document.querySelector("[data-explore-example]").addEventListener("click", (event) => {
    event.preventDefault();
    history.replaceState(null, "", "#example-panel");
    panel.focus({ preventScroll: true });
    panel.scrollIntoView({ block: "start" });
  });
  selectFormat("json");
}

for (const button of document.querySelectorAll("[data-copy]")) {
  const label = button.textContent;
  let reset;
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    if (!source) return;
    const status = document.getElementById("copy-status");
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      button.textContent = "Copied";
      status.textContent = "Text copied to clipboard.";
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(source);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      button.textContent = "Select text";
      status.textContent = "Clipboard access is unavailable. The text is selected so you can copy it.";
    }
    reset = setTimeout(() => { button.textContent = label; }, 2200);
  });
}
