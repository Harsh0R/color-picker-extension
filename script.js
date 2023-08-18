const btn = document.querySelector(".changeColorBtn");
const colotGrid = document.querySelector(".colorGrid");
const colotVal = document.querySelector(".colorValue");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  // console.log(tab)
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColorr,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        colotGrid.style.backgroundColor = color;
        colotVal.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
});

async function pickColorr() {
  try {
    const eyeDrop = new EyeDropper();
    return await eyeDrop.open();
    // console.log(selectedColor);
  } catch (error) {
    console.log(error);
  }
}
