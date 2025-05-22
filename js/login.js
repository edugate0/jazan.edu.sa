/**
 * JavaScript for the login page functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize login form
    initLoginForm();
});

/**
 * Initialize login form handling
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        return; // Not on the login page
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const nationalId = document.getElementById('national_id').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!nationalId || !password) {
            showToast('يرجى إدخال رقم جامعي وكلمة المرور', 'error');
            return;
        }
        
        // Check credentials for demo student (ريفان سلمان)
        if (nationalId === '469225310' && password === '1132070754') {
            // Create toast container if it doesn't exist
            let toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
            }
            
            // Show loading toast
            const toast = document.createElement('div');
            toast.className = 'toast toast-info';
            toast.innerHTML = `
                <div class="toast-body">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    جاري تسجيل الدخول...
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Simulate server request (in a real app, this would be an AJAX call)
            setTimeout(() => {
                // Redirect to dashboard
                window.location.href = 'home.html';
            }, 1500);
        } else {
            showToast('الرقم الجامعي أو كلمة المرور غير صحيحة', 'error');
        }
    });
    
    // Pre-fill demo student credentials if in demo mode
    const demoMode = new URLSearchParams(window.location.search).get('demo');
    if (demoMode === 'true') {
        document.getElementById('national_id').value = '469225310';
        document.getElementById('password').value = '1132070754';
    }
}

/**
 * Show a toast notification for login errors/messages
 * If main.js is loaded, this function will be available globally
 * Otherwise, we define it here
 */
if (typeof showToast !== 'function') {
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
}