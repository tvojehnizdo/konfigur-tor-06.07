document.getElementById("configForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const config = {};
  formData.forEach((value, key) => { config[key] = value; });

  try {
    const response = await fetch("https://konfigur-tor-0607-production.up.railway.app/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });

    const result = await response.text();

    if (response.ok) {
      alert("Úspěšně odesláno do Google Sheets!");
    } else {
      alert("Chyba serveru: " + result);
      console.error("Chyba:", result);
    }

  } catch (err) {
    alert("Síťová chyba: " + err.message);
    console.error("Síťová chyba:", err);
  }
});
