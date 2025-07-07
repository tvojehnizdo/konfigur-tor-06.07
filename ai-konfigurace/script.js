document.getElementById("configForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const config = {};
  formData.forEach((v, k) => config[k] = v);

  try {
    const response = await fetch("https://konfigur-tor-0607-production.up.railway.app/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    const result = await response.text();
    if (response.ok) {
      alert("✅ Konfigurace byla odeslána!");
    } else {
      alert("❌ Chyba serveru: " + result);
    }
  } catch (err) {
    alert("❌ Síťová chyba: " + err.message);
  }
});

document.getElementById("generateBtn").addEventListener("click", async function() {
  const form = document.getElementById("configForm");
  const formData = new FormData(form);
  const type = formData.get("type");
  const roof = formData.get("roof");
  const color = formData.get("color");
  const hex = color.replace("#", "");

  const prompt = `Realistic exterior of a ${type} with a ${roof}, facade color #${hex}, modern architecture, 3D render`;

  document.getElementById("status").textContent = "🧠 Generuji obrázek...";
  document.getElementById("result").style.display = "none";

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "512x512"
      })
    });

    const data = await res.json();
    if (data.data && data.data[0]) {
      const img = document.getElementById("result");
      img.src = data.data[0].url;
      img.style.display = "block";
      document.getElementById("status").textContent = "✅ Vizualizace připravena.";
    } else {
      document.getElementById("status").textContent = "❌ Nepodařilo se vygenerovat obrázek.";
    }

  } catch (err) {
    document.getElementById("status").textContent = "❌ Chyba: " + err.message;
  }
});
