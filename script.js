// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  // Select the container that holds all products
  const container = document.querySelector(".list-products");
  const totalPriceElement = document.querySelector(".total");

  // Function to update the total price
  function updateTotalPrice() {
    let total = 0;
    
    // Select all cards currently in the DOM
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card) => {
      // Get Unit Price (remove '$' and whitespace)
      const unitPriceString = card.querySelector(".unit-price").innerText.replace("$", "").trim();
      const unitPrice = parseFloat(unitPriceString);
      
      // Get Quantity
      const quantityElement = card.querySelector(".quantity");
      const quantity = parseInt(quantityElement.innerText);
      
      // Add to total
      total += unitPrice * quantity;
    });

    // Update the DOM
    totalPriceElement.innerText = total + " $";
  }

  // --- EVENT DELEGATION ---
  // We attach ONE event listener to the container instead of many to buttons
  container.addEventListener("click", (event) => {
    
    // 1. HANDLE PLUS BUTTON
    if (event.target.classList.contains("fa-plus-circle")) {
      const quantityElement = event.target.nextElementSibling; // The span next to +
      let quantity = parseInt(quantityElement.innerText);
      quantity++;
      quantityElement.innerText = quantity;
      updateTotalPrice();
    }

    // 2. HANDLE MINUS BUTTON
    if (event.target.classList.contains("fa-minus-circle")) {
      const quantityElement = event.target.previousElementSibling; // The span before -
      let quantity = parseInt(quantityElement.innerText);
      if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;
        updateTotalPrice();
      }
    }

    // 3. HANDLE TRASH (DELETE) BUTTON
    if (event.target.classList.contains("fa-trash-alt")) {
      // Find the parent .card-body div and remove it
      const cardToRemove = event.target.closest(".card-body"); 
      cardToRemove.remove();
      updateTotalPrice();
    }

    // 4. HANDLE HEART (LIKE) BUTTON
    if (event.target.classList.contains("fa-heart")) {
      // Toggle the CSS class 'liked' which makes it pink
      event.target.classList.toggle("liked");
    }

  });
});