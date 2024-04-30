const buttons = document.querySelectorAll(".cardButton");
buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      const userEmail = button.dataset.email;
      const data = { userEmail: userEmail };
      let response = await fetch("/api/products/userProducts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      response = await response.json();
      console.log(response.response.docs);

       const productsContainer = document.getElementById("productsContainer");

      productsContainer.innerHTML = "";

      response.response.docs.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
          <img src="${product.photo}" alt="${product.title}" class="product-image">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <p class="product-stock">Stock: ${product.stock}</p>
        `;

        productsContainer.appendChild(productDiv);
      });

    } catch (error) {
      alert(error.message);
    }
  });
});
