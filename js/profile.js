/**
 * JavaScript for the student profile functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize edit profile functionality
    initProfileEdit();
});

/**
 * Initialize profile editing functionality
 */
function initProfileEdit() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    
    if (!editProfileBtn || !saveProfileBtn || !cancelEditBtn || !profileForm) {
        return; // Elements not found, we're not on the profile page
    }
    
    const editableFields = profileForm.querySelectorAll('.profile-editable');
    const originalValues = {};
    
    // Store original values for cancellation
    editableFields.forEach(field => {
        originalValues[field.id] = field.value;
        field.disabled = true; // Initially disabled
    });
    
    // Enable editing
    editProfileBtn.addEventListener('click', function() {
        editableFields.forEach(field => {
            field.disabled = false;
        });
        
        editProfileBtn.style.display = 'none';
        saveProfileBtn.style.display = 'inline-block';
        cancelEditBtn.style.display = 'inline-block';
    });
    
    // Cancel editing
    cancelEditBtn.addEventListener('click', function() {
        editableFields.forEach(field => {
            field.value = originalValues[field.id];
            field.disabled = true;
        });
        
        editProfileBtn.style.display = 'inline-block';
        saveProfileBtn.style.display = 'none';
        cancelEditBtn.style.display = 'none';
    });
    
    // Save profile changes
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(profileForm)) {
            showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Show loading state
        saveProfileBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> جارٍ الحفظ...';
        saveProfileBtn.disabled = true;
        
        // Simulate form submission (in a real app, this would be an AJAX call)
        setTimeout(() => {
            // Store updated values
            editableFields.forEach(field => {
                originalValues[field.id] = field.value;
                field.disabled = true;
            });
            
            // Reset buttons
            editProfileBtn.style.display = 'inline-block';
            saveProfileBtn.style.display = 'none';
            cancelEditBtn.style.display = 'none';
            
            // Reset button state
            saveProfileBtn.innerHTML = 'حفظ التغييرات';
            saveProfileBtn.disabled = false;
            
            // Show success message
            showToast('تم تحديث الملف الشخصي بنجاح', 'success');
        }, 1500);
    });
}