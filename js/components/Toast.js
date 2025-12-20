class Toast {
  static init() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  }

  static show(message, type = 'info', duration = 3000) {
    this.init();

    const container = document.getElementById('toast-container');

    // Stack Limit: Remove oldest if > 5
    if (container.childElementCount >= 5) {
      const oldest = container.firstElementChild;
      this.dismiss(oldest);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;

    // Icon based on type
    let icon = '';
    switch (type) {
      case 'success': icon = '<i class="fas fa-check-circle"></i>'; break;
      case 'error': icon = '<i class="fas fa-exclamation-circle"></i>'; break;
      case 'info': icon = '<i class="fas fa-info-circle"></i>'; break;
    }

    toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
        `;

    // Handle Close Click
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.onclick = () => this.dismiss(toast);

    // Add to container
    container.appendChild(toast);

    // Animation in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
  }

  static dismiss(toast) {
    if (!toast || toast.classList.contains('hiding')) return;

    toast.classList.add('hiding');
    toast.classList.remove('show');

    // Wait for CSS transition to finish before removing from DOM
    toast.addEventListener('transitionend', () => {
      if (toast.parentElement) {
        toast.remove();
      }
    });
  }

  static success(message, duration) {
    this.show(message, 'success', duration);
  }

  static error(message, duration) {
    this.show(message, 'error', duration);
  }

  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}
