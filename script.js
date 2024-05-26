// Define the Product class
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // Define the ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
  
    // Method to calculate the total price of the item
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // Define the ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    // Method to get the total of items inside the cart
    getTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    // Method to add an item to the cart
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateCartDisplay();
    }
  
    // Method to remove an item from the cart
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateCartDisplay();
    }
  
    // Method to update the cart display
    updateCartDisplay() {
      const itemsContainer = document.querySelector(".items");
      itemsContainer.innerHTML = ''; // Clear existing items
  
      this.items.forEach(item => {
        const newdiv = document.createElement("div");
        newdiv.classList.add("items1");
        newdiv.innerHTML = `
          <div class="values1">
            <div style="display: flex; align-items: center">
              <img src="${item.product.img}" alt="" width="150" />
              <p style="margin-left: 20px">${item.product.name}</p>
            </div>
            <p id="price">$${item.product.price.toFixed(2)}</p>
            <div class="quantity1">
              <i class="fa-solid fa-less-than"></i>
              <input type="number" id="quantity" value="${item.quantity}" >
              <i class="fa-solid fa-greater-than"></i>
              <button id="remove" class="remove1">remove</button>
            </div>
          </div>
        `;
        itemsContainer.append(newdiv);
  
        const removeButton = newdiv.querySelector("#remove");
        removeButton.addEventListener("click", () => {
          this.removeItem(item.product.id);
        });
  
        const quantityInput = newdiv.querySelector("#quantity");
        quantityInput.addEventListener("change", (e) => {
          if (e.target.value <= 0 || isNaN(e.target.value)) {
            e.target.value = 1;
          }
          item.quantity = parseInt(e.target.value);
          this.updateCartDisplay();
        });
  
        const lessButton = newdiv.querySelector(".fa-less-than");
        const greaterButton = newdiv.querySelector(".fa-greater-than");
  
        lessButton.addEventListener("click", () => {
          quantityInput.value = parseInt(quantityInput.value) - 1;
          if (quantityInput.value <= 0) quantityInput.value = 1;
          item.quantity = parseInt(quantityInput.value);
          this.updateCartDisplay();
        });
  
        greaterButton.addEventListener("click", () => {
          quantityInput.value = parseInt(quantityInput.value) + 1;
          item.quantity = parseInt(quantityInput.value);
          this.updateCartDisplay();
        });
      });
  
      const totalElement = document.querySelector("#totalp");
      totalElement.textContent = "$" + this.getTotal().toFixed(2);
    }
  }
  
  // Create an instance of the shopping cart
  const cart = new ShoppingCart();
  
  // Attach event listeners to buttons for adding products to the cart
  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const cartElement = button.parentElement.parentElement;
      const cartprice = parseFloat(cartElement.querySelector(".cart-price").textContent.replace("$", ""));
      const carttitle = cartElement.querySelector(".cart-title").textContent;
      const img1 = cartElement.querySelector(".cart-img").src;
      const productId = cartElement.dataset.id;
  
      const product = new Product(productId, carttitle, cartprice);
      product.img = img1;
      
      cart.addItem(product, 1);
    });
  });
  
  // Example product creation
  // In a real-world scenario, you would dynamically create these products based on your data source
  const product1 = new Product(1, "Laptop", 1000);
  product1.img = "path/to/laptop/image.jpg";
  
  const product2 = new Product(2, "Phone", 500);
  product2.img = "path/to/phone/image.jpg";
  
  const product3 = new Product(3, "Tablet", 300);
  product3.img = "path/to/tablet/image.jpg";
  