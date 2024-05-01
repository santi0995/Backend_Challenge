const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((each) =>
  each.addEventListener("click", async (product) => {
    try {
      const url = "/api/products/" + product.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      if(response.statusCode===200) {
        alert("Producto eliminado correctamente");
        location.reload()
      }
    } catch (error) {
      alert(error.message);
    }
  })
);