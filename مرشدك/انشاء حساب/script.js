document.addEventListener('DOMContentLoaded', function() {
   
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const field = this.id === 'passwordToggle' ? 
                document.getElementById('password') : 
                document.getElementById('confirmPassword');
            field.type = this.checked ? 'text' : 'password';
        });
    });

    const registerForm = document.getElementById('registerForm');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && 
               hasUpperCase && 
               hasLowerCase && 
               hasNumbers && 
               hasSpecialChar;
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const universityId = document.getElementById('universityId').value;
        const email = document.getElementById('email').value;
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        const terms = document.getElementById('terms').checked;
        
        const button = this.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;

        document.querySelectorAll('.error-message').forEach(el => el.remove());

        if (!validatePassword(password)) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم وحرف خاص';
            passwordField.parentNode.appendChild(errorMessage);
            return;
        }

        if (password !== confirmPassword) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'كلمة المرور غير متطابقة';
            confirmPasswordField.parentNode.appendChild(errorMessage);
            return;
        }

        if (!terms) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'يجب الموافقة على الشروط والأحكام';
            document.querySelector('.terms-group').appendChild(errorMessage);
            return;
        }

        button.innerHTML = `
            <div class="btn-content">
                <i class="ri-loader-4-line spinner"></i>
                <span>جاري إنشاء الحساب...</span>
            </div>
        `;
        button.disabled = true;

        setTimeout(() => {
            if (fullName && universityId && email && password && terms) {
              
                button.innerHTML = `
                    <div class="btn-content">
                        <i class="ri-check-line"></i>
                        <span>تم إنشاء الحساب بنجاح!</span>
                    </div>
                `;
                button.style.backgroundColor = '#10b981';
                
               
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="ri-check-line"></i>
                    <span>تم إنشاء حسابك بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول...</span>
                `;
                document.body.appendChild(successMessage);

              
                setTimeout(() => {
                    successMessage.remove();
                  
                }, 3000);
            } else {
             
                button.innerHTML = `
                    <div class="btn-content">
                        <i class="ri-error-warning-line"></i>
                        <span>فشل إنشاء الحساب</span>
                    </div>
                `;
                button.style.backgroundColor = '#ef4444';
                
                setTimeout(() => {
                    button.innerHTML = originalButtonText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 2000);
            }
        }, 1500);
    });
});