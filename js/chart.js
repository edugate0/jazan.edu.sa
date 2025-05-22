/**
 * JavaScript for creating academic performance charts
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize academic performance chart
    initAcademicPerformanceChart();
});

/**
 * Initialize the academic performance chart
 */
function initAcademicPerformanceChart() {
    const chartCanvas = document.getElementById('academicPerformanceChart');
    
    if (!chartCanvas) {
        return; // Chart canvas not found
    }
    
    // Sample data for the chart
    const semesters = ['الفصل الأول', 'الفصل الثاني'];
    const gpaData = [4.5, 4.75];
    
    // Create chart
    const ctx = chartCanvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: semesters,
            datasets: [{
                label: 'المعدل التراكمي',
                data: gpaData,
                backgroundColor: 'rgba(0, 95, 134, 0.1)',
                borderColor: 'rgba(0, 95, 134, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgba(0, 95, 134, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    },
                    grid: {
                        borderDash: [2, 2]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `المعدل: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });
}