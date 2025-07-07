document.getElementById("visualForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
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
      const imgUrl = data.data[0].url;
      const img = document.getElementById("result");
      img.src = imgUrl;
      img.style.display = "block";
      document.getElementById("status").textContent = "✅ Obrázek vygenerován.";
    } else {
      document.getElementById("status").textContent = "❌ Nepodařilo se vygenerovat obrázek.";
      console.error(data);
    }

  } catch (err) {
    document.getElementById("status").textContent = "Chyba požadavku: " + err.message;
    console.error(err);
  }
});
