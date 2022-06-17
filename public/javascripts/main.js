const templateArea = document.getElementById("template");
const engine = document.getElementById("engine");
const renderArea = document.getElementById("render");
const renderBtn = document.getElementById("renderbtn");
renderBtn.addEventListener(
  "click",
  function (e) {
    renderBtn.disabled = true;
    fetch("/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        engine: engine.value,
        template: templateArea.value,
      }),
    })
      .then(function (response) {
        if (response.status !== 200) {
          return `Error sending http request: ${response.statusText}`;
        } else {
          return response.text().then(function (t) {
            return t;
          });
        }
      })
      .then(function (text) {
        renderArea.value = text;
      })
      .catch(function (e) {
        renderArea.value = `Error sending http request: ${e.message}`;
      })
      .finally(function () {
        renderBtn.disabled = false;
      });
  },
  false
);
