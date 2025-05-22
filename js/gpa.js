/**
 * JavaScript for the GPA calculator functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GPA calculator
    initGpaCalculator();
});

/**
 * Initialize the GPA calculator functionality
 */
function initGpaCalculator() {
    const gpaCalculatorForm = document.getElementById('gpaCalculatorForm');
    const coursesContainer = document.getElementById('coursesContainer');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const calculateBtn = document.getElementById('calculateGpaBtn');
    const gpaResult = document.getElementById('gpaResult');
    
    if (!gpaCalculatorForm || !coursesContainer || !addCourseBtn || !calculateBtn || !gpaResult) {
        return; // Not on the GPA calculator page
    }
    
    // Add example nursing courses
    addExampleNursingCourses();
    
    // Add course button event listener
    addCourseBtn.addEventListener('click', function() {
        addCourseRow();
    });
    
    // Calculate GPA button event listener
    gpaCalculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateGPA();
    });
    
    /**
     * Add nursing courses examples to the form
     */
    function addExampleNursingCourses() {
        // Clear container first
        coursesContainer.innerHTML = '';
        
        // Define example nursing courses
        const nursingCourses = [
            { name: 'أساسيات التمريض', hours: 3, grade: '' },
            { name: 'تشريح وفسيولوجيا', hours: 3, grade: '' },
            { name: 'تمريض باطني وجراحي', hours: 2, grade: '' },
        ];
        
        // Add each example course
        nursingCourses.forEach((course, index) => {
            addCourseRow(course.name, course.hours, course.grade);
        });
    }

    /**
     * Add a new course row to the form
     * @param {string} courseName - Optional course name
     * @param {number} creditHours - Optional credit hours
     * @param {string} grade - Optional grade
     */
    function addCourseRow(courseName = '', creditHours = '', grade = '') {
        const rowCount = document.querySelectorAll('.course-row').length;
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.innerHTML = `
            <div class="form-group">
                <input type="text" class="form-control course-name" placeholder="اسم المقرر" value="${courseName}" required>
            </div>
            <div class="form-group">
                <input type="number" class="form-control credit-hours" placeholder="الساعات المعتمدة" min="1" max="6" value="${creditHours}" required>
            </div>
            <div class="form-group">
                <select class="form-control course-grade" required>
                    <option value="">الدرجة</option>
                    <option value="A+" ${grade === 'A+' ? 'selected' : ''}>A+</option>
                    <option value="A" ${grade === 'A' ? 'selected' : ''}>A</option>
                    <option value="B+" ${grade === 'B+' ? 'selected' : ''}>B+</option>
                    <option value="B" ${grade === 'B' ? 'selected' : ''}>B</option>
                    <option value="C+" ${grade === 'C+' ? 'selected' : ''}>C+</option>
                    <option value="C" ${grade === 'C' ? 'selected' : ''}>C</option>
                    <option value="D+" ${grade === 'D+' ? 'selected' : ''}>D+</option>
                    <option value="D" ${grade === 'D' ? 'selected' : ''}>D</option>
                    <option value="F" ${grade === 'F' ? 'selected' : ''}>F</option>
                </select>
            </div>
            <div class="form-group text-center">
                ${rowCount > 0 ? '<span class="remove-course-btn" title="حذف المقرر"><i class="fas fa-trash-alt"></i></span>' : ''}
            </div>
        `;
        
        coursesContainer.appendChild(newRow);
        
        // Add event listener to remove button
        const removeBtn = newRow.querySelector('.remove-course-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                newRow.remove();
            });
        }
    }
    
    /**
     * Calculate the GPA based on the entered courses
     */
    function calculateGPA() {
        // Collect course data
        const courses = [];
        const courseRows = document.querySelectorAll('.course-row');
        
        courseRows.forEach(row => {
            const courseName = row.querySelector('.course-name').value;
            const creditHours = row.querySelector('.credit-hours').value;
            const grade = row.querySelector('.course-grade').value;
            
            if (courseName && creditHours && grade) {
                courses.push({
                    courseName: courseName,
                    creditHours: creditHours,
                    grade: grade
                });
            }
        });
        
        if (courses.length === 0) {
            showToast('يرجى إدخال بيانات المقررات أولاً', 'warning');
            return;
        }
        
        // Show loading state
        calculateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> جارٍ الحساب...';
        calculateBtn.disabled = true;
        
        // Calculate GPA
        const result = calculateGpaClientSide(courses);
        
        // Simulate processing time (in a real app, this would be an AJAX call)
        setTimeout(() => {
            // Reset button state
            calculateBtn.innerHTML = 'حساب المعدل';
            calculateBtn.disabled = false;
            
            // Display result
            gpaResult.innerHTML = `
                <div class="alert alert-success">
                    <h4 class="text-center mb-3">نتيجة حساب المعدل</h4>
                    <p class="text-center mb-2">المعدل التراكمي: <span class="calculated-gpa">${result.gpa}</span></p>
                    <p class="text-center mb-0">مجموع النقاط: ${result.total_points.toFixed(2)} | مجموع الساعات: ${result.total_credits}</p>
                </div>
            `;
            
            // Scroll to result
            gpaResult.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
}

/**
 * Calculate GPA client-side
 * @param {Array} courses - Array of course objects
 * @returns {Object} GPA calculation results
 */
function calculateGpaClientSide(courses) {
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
        const creditHours = parseFloat(course.creditHours);
        const grade = course.grade;
        
        // Convert letter grade to points
        let gradePoints = 0;
        switch (grade) {
            case 'A+': gradePoints = 5.0; break;
            case 'A': gradePoints = 4.75; break;
            case 'B+': gradePoints = 4.5; break;
            case 'B': gradePoints = 4.0; break;
            case 'C+': gradePoints = 3.5; break;
            case 'C': gradePoints = 3.0; break;
            case 'D+': gradePoints = 2.5; break;
            case 'D': gradePoints = 2.0; break;
            case 'F': gradePoints = 0.0; break;
        }
        
        totalPoints += creditHours * gradePoints;
        totalCredits += creditHours;
    });
    
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    
    return {
        gpa: gpa,
        total_points: totalPoints,
        total_credits: totalCredits
    };
}