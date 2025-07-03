document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
    
    // Switch form links
    const switchFormButtons = document.querySelectorAll('.switch-form');
    switchFormButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.target;
            const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
            
            if (targetButton) {
                targetButton.click();
            }
        });
    });
    
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');
            
            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94z"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19l-6.21-6.21a2.93 2.93 0 0 0-4.58-.58z"></path>
                `;
            } else {
                input.type = 'password';
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    });
    
    // Form submission handling
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, 'login');
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if passwords match
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            showToast('Password Mismatch', 'Passwords do not match. Please try again.', 'error');
            return;
        }
        
        handleFormSubmission(this, 'signup');
    });
    
    function handleFormSubmission(form, type) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loadingSpinner = submitBtn.querySelector('.loading-spinner');
        
        // Show loading state
        btnText.style.display = 'none';
        loadingSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide loading state
            btnText.style.display = 'flex';
            loadingSpinner.classList.add('hidden');
            submitBtn.disabled = false;
            
            // Show success message and redirect
            if (type === 'login') {
                showToast('Login Successful', 'Welcome! Redirecting to dashboard...', 'success');
                
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000); // Wait 1 second to show the success message
            } else {
                showToast('Account Created', 'Account created successfully! You can now login.', 'success');
            }
        }, 1500);
    }
    
    function showToast(title, message, type) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
        `;
        
        // Add toast styles if not already added
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    max-width: 400px;
                    z-index: 1000;
                    border-left: 4px solid;
                    animation: slideIn 0.3s ease-out;
                }
                .toast-success {
                    border-left-color: #10b981;
                }
                .toast-error {
                    border-left-color: #ef4444;
                }
                .toast-title {
                    font-weight: 600;
                    margin: 0 0 0.25rem 0;
                    font-size: 0.875rem;
                }
                .toast-message {
                    margin: 0;
                    font-size: 0.8rem;
                    opacity: 0.9;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add toast to page
        document.body.appendChild(toast);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
});
