const selector = document.querySelector("#create");
selector.addEventListener("click", async () => {
  try {
    const data = {
      title: document.querySelector("#title").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };
    document.querySelector("#photo").value &&
      (data.photo = document.querySelector("#photo").value);

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products", opts);
    response = await response.json();
    if (response.statusCode === 201) {
      alert("Product created!")
      location.replace("/products/mine");
    } else {
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
