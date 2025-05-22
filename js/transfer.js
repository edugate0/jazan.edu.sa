/**
 * JavaScript for the program transfer functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize transfer request form handling
    initTransferForm();
    
    // Setup college-major dropdowns
    setupCollegeMajorDropdowns();
});

/**
 * Initialize the transfer request form handling
 */
function initTransferForm() {
    const transferForm = document.getElementById('transferRequestForm');
    
    if (!transferForm) {
        return; // Not on the transfer page
    }
    
    transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(transferForm)) {
            showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Get submit button
        const submitBtn = transferForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> جارٍ التقديم...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in a real app, this would be an AJAX call)
        setTimeout(() => {
            // Show success message
            showToast('تم تقديم طلب التحويل بنجاح', 'success');
            
            // Reset form
            transferForm.reset();
            
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Redirect to dashboard after a brief delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 1500);
    });
}

/**
 * Setup the relationship between college and major dropdowns
 */
function setupCollegeMajorDropdowns() {
    const collegeSelect = document.getElementById('college');
    const majorSelect = document.getElementById('desired_major');
    
    if (!collegeSelect || !majorSelect) {
        return; // Not on the transfer page or elements not found
    }
    
    // Sample data for majors by college
    const majorsByCollege = {
        "1": [ // كلية العلوم
            {id: 1, name: "كيمياء"},
            {id: 2, name: "فيزياء"},
            {id: 3, name: "رياضيات"},
            {id: 4, name: "أحياء"}
        ],
        "2": [ // كلية العلوم الصحية
            {id: 5, name: "طب"},
            {id: 6, name: "صيدلة"},
            {id: 7, name: "تمريض"}
        ],
        "3": [ // كلية الهندسة
            {id: 8, name: "هندسة مدنية"},
            {id: 9, name: "هندسة كهربائية"},
            {id: 10, name: "هندسة حاسب"}
        ]
    };
    
    // When college selection changes, update majors
    collegeSelect.addEventListener('change', function() {
        const collegeId = this.value;
        
        // Clear and disable major dropdown if no college selected
        if (!collegeId) {
            majorSelect.innerHTML = '<option value="">اختر التخصص</option>';
            majorSelect.disabled = true;
            return;
        }
        
        // Show loading state
        majorSelect.innerHTML = '<option value="">جارٍ التحميل...</option>';
        majorSelect.disabled = true;
        
        // Simulate API call to get majors (in a real app, this would be an AJAX call)
        setTimeout(() => {
            // Get majors for selected college
            const majors = majorsByCollege[collegeId] || [];
            
            // Populate major dropdown
            majorSelect.innerHTML = '<option value="">اختر التخصص</option>';
            
            majors.forEach(major => {
                const option = document.createElement('option');
                option.value = major.name;
                option.textContent = major.name;
                majorSelect.appendChild(option);
            });
            
            majorSelect.disabled = false;
        }, 500);
    });
    
    // Trigger change event if college is pre-selected
    if (collegeSelect.value) {
        collegeSelect.dispatchEvent(new Event('change'));
    }
}