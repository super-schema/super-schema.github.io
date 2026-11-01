import { EXAMPLES } from "./examples.mjs";
import { FIELD_INTENT, REFERENCES, TARGET_REVIEW, pinnedFields } from "./workflow-data.mjs";

const root = document.getElementById("workflow");
if (root) {
  const tabs = [...root.querySelectorAll("[data-workflow-step]")];
  const panels = [...root.querySelectorAll(".wf-demo")];
  root.querySelector(".workflow-steps").setAttribute("role", "tablist");
  tabs.forEach((tab) => {
    tab.parentElement.setAttribute("role", "presentation");
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "workflow-" + tab.dataset.workflowStep);
  });
  panels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "workflow-tab-" + panel.id.slice("workflow-".length));
    panel.tabIndex = 0;
  });

  function selectStep(key, updateHash = false) {
    if (!tabs.some((tab) => tab.dataset.workflowStep === key)) return;
    for (const tab of tabs) {
      const selected = tab.dataset.workflowStep === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const panel of panels) panel.hidden = panel.id !== "workflow-" + key;
    if (updateHash) history.replaceState(null, "", "#workflow-" + key);
  }

  function stepFromHash() {
    const key = location.hash.slice("#workflow-".length);
    return tabs.some((tab) => tab.dataset.workflowStep === key) ? key : "model";
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      selectStep(tab.dataset.workflowStep, true);
    });
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === " ") next = index;
      else return;
      event.preventDefault();
      selectStep(tabs[next].dataset.workflowStep, true);
      tabs[next].focus();
    });
  });
  selectStep(stepFromHash());
  window.addEventListener("hashchange", () => {
    if (location.hash === "#workflow" || location.hash.startsWith("#workflow-")) selectStep(stepFromHash());
  });

  for (const button of root.querySelectorAll("[data-wf-field]")) {
    button.addEventListener("click", () => {
      const key = button.dataset.wfField;
      if (!Object.hasOwn(FIELD_INTENT, key)) return;
      const field = FIELD_INTENT[key];
      root.querySelector("#wf-field-name").textContent = "Customer." + key;
      root.querySelector("#wf-field-description").textContent = field.description;
      root.querySelector("#wf-field-type").textContent = "string · " + (field.optional ? "optional" : "required");
      root.querySelector("#wf-field-classification").textContent = field.classification;
      for (const option of root.querySelectorAll("[data-wf-field]")) option.setAttribute("aria-pressed", String(option === button));
    });
  }

  for (const button of root.querySelectorAll("[data-wf-reference]")) {
    button.addEventListener("click", () => {
      const key = button.dataset.wfReference;
      if (!Object.hasOwn(REFERENCES, key)) return;
      const reference = REFERENCES[key];
      root.querySelector("#wf-reference-title").textContent = reference.title;
      root.querySelector("#wf-reference-description").textContent = reference.description;
      root.querySelector("#wf-reference-language").textContent = reference.language;
      root.querySelector("#wf-reference-code").textContent = reference.code;
      for (const option of root.querySelectorAll("[data-wf-reference]")) option.setAttribute("aria-pressed", String(option === button));
      for (const edge of root.querySelectorAll("[data-wf-edge]")) edge.classList.toggle("is-active", edge.dataset.wfEdge === key);
    });
  }

  const target = root.querySelector("#wf-target");
  function reviewTarget() {
    const key = target.value;
    if (!Object.hasOwn(TARGET_REVIEW, key)) return;
    const example = EXAMPLES[key];
    const review = TARGET_REVIEW[key];
    root.querySelector("#wf-target-name").textContent = example.label;
    root.querySelector("#wf-output-filename").textContent = example.filename;
    root.querySelector("#wf-output-code").textContent = example.code;
    root.querySelector("#wf-target-review").textContent = review.note;
    root.querySelectorAll("[data-wf-mapped]").forEach((cell) => { cell.textContent = review.mapped[cell.dataset.wfMapped]; });
  }
  target.addEventListener("change", reviewTarget);
  reviewTarget();

  const publishButton = root.querySelector("#wf-publish-example");
  const versionSelect = root.querySelector("#wf-pinned-version");
  const nextVersion = versionSelect.querySelector('[value="1.1"]');
  let published = false;

  function renderPin() {
    let fields = pinnedFields(versionSelect.value, published);
    if (!fields) {
      versionSelect.value = "1.0";
      fields = pinnedFields("1.0", published);
    }
    root.querySelector("#wf-pin-label").textContent = "Customer@" + versionSelect.value;
    root.querySelector("#wf-pinned-fields").replaceChildren(...fields.map((field) => {
      const item = document.createElement("li");
      item.textContent = field;
      return item;
    }));
    root.querySelector("#wf-pin-note").textContent = versionSelect.value === "1.1"
      ? "This consumer now explicitly references v1.1, including the optional phone field."
      : published ? "Still pinned to v1.0. Publishing v1.1 did not change this reference." : "This consumer uses the three-field v1.0 definition.";
  }

  function renderPublication() {
    publishButton.disabled = published;
    publishButton.textContent = published ? "Example v1.1 published" : "Publish example v1.1";
    nextVersion.disabled = !published;
    nextVersion.textContent = published ? "Published v1.1" : "v1.1 · publish the example first";
    root.querySelector("#wf-candidate-state").textContent = published ? "Published snapshot" : "Draft change";
    root.querySelector(".wf-candidate").classList.toggle("is-published", published);
    root.querySelector("#wf-candidate-note").textContent = published ? "The example has a new fixed definition." : "Review the added field before publishing.";
    root.querySelector("#wf-publish-status").textContent = published
      ? "Example v1.1 is published. The consumer stays on v1.0 until you change its pin."
      : "The example starts with v1.0 published and v1.1 in draft.";
    renderPin();
  }
  publishButton.addEventListener("click", () => { published = true; renderPublication(); });
  root.querySelector("#wf-reset-example").addEventListener("click", () => {
    published = false;
    versionSelect.value = "1.0";
    renderPublication();
  });
  versionSelect.addEventListener("change", renderPin);
}
