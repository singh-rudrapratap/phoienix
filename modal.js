function openPayment() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add some items first.');
    return;
  }
  // Close cart first
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if(sidebar) sidebar.classList.remove('active');
  if(overlay) overlay.classList.remove('active');
  
  // Open payment
  const paymentOverlay = document.getElementById('payment-overlay');
  if(paymentOverlay) paymentOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePayment() {
  const paymentOverlay = document.getElementById('payment-overlay');
  if(paymentOverlay) paymentOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function processPayment() {
  // Basic validation
  const inputs = document.querySelectorAll('#payment-modal input');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });
  
  if (!valid) {
    showToast('Please fill in all fields');
    return;
  }
  
  showToast('🔥 Order placed successfully! Thank you!');
  cart = [];
  updateCartUI();
  closePayment();
  // Reset form
  inputs.forEach(input => input.value = '');
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('payment-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePayment();
    });
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const paymentOverlay = document.getElementById('payment-overlay');
    if (paymentOverlay && paymentOverlay.classList.contains('active')) {
      closePayment();
    }
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('active')) {
      toggleCart();
    }
  }
});
