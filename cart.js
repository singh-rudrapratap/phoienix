let cart = [];

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if(sidebar) sidebar.classList.toggle('active');
  if(overlay) overlay.classList.toggle('active');
  
  // Prevent body scroll when cart is open
  if(sidebar) {
      document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }
}

function addToCart(name, price) {
  // Check if item already exists, if so increment quantity
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartUI();
  showToast(`${name} added to cart!`);
  
  // Bounce the cart count
  const countEl = document.getElementById('cart-count');
  if(countEl) {
      countEl.style.animation = 'none';
      countEl.offsetHeight; // trigger reflow
      countEl.style.animation = 'bounce 0.4s ease';
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalAmount = document.getElementById('total-amount');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if(cartCount) cartCount.textContent = totalItems;
  
  if (cart.length === 0) {
    if(cartItemsContainer) {
        cartItemsContainer.innerHTML = `
          <div class="cart-empty">
            <span style="font-size:2.5rem;display:block;margin-bottom:0.75rem;">🛒</span>
            <p>Your cart is empty</p>
            <p style="font-size:0.8rem;margin-top:0.25rem;">Add some delicious items!</p>
          </div>`;
    }
    if(totalAmount) totalAmount.textContent = '$0.00';
    return;
  }
  
  if(cartItemsContainer) cartItemsContainer.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}${item.quantity > 1 ? ' (×' + item.quantity + ')' : ''}</span>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">✕ Remove</button>`;
    if(cartItemsContainer) cartItemsContainer.appendChild(itemEl);
  });
  
  if(totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Toast notification system
function showToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
