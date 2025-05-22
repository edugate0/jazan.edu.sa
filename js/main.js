/**
 * Main JavaScript file for Jazan University Academic Portal
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Set active nav item
    setActiveNavItem();
});

/**
 * Set the active navigation item based on current URL
 */
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

/**
 * Format date to Arabic format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDateArabic(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    return new Date(date).toLocaleDateString('ar-SA', options);
}

/**
 * Format number to Arabic format
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
function formatNumberArabic(num) {
    return num.toLocaleString('ar-SA');
}

/**
 * Validate form inputs
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} True if the form is valid, false otherwise
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
            
            // Create error message if it doesn't exist
            let errorDiv = input.nextElementSibling;
            if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                errorDiv.textContent = 'هذا الحقل مطلوب';
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}