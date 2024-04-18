const selector = document.querySelector("#verifiedButton");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      verifiedCode: document.querySelector("#verified").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/verify", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      location.replace("/sessions/login");
      alert(response.response);
    } else {
      const error = new Error("Código de verificación invalido");
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
});
