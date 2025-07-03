document.addEventListener('DOMContentLoaded', function () {

    const passwordToggle = document.getElementById('passwordToggle');
    const passwordField = document.getElementById('password');

    passwordToggle.addEventListener('change', function () {
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });


    const rememberMeCheckbox = document.getElementById('rememberMe');


    const remembered = localStorage.getItem('rememberMe') === 'true';
    rememberMeCheckbox.checked = remembered;

    if (remembered) {
        const savedId = localStorage.getItem('universityId');
        if (savedId) {
            document.getElementById('universityId').value = savedId;
        }
    }

    rememberMeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            const universityId = document.getElementById('universityId').value;
            localStorage.setItem('universityId', universityId);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('universityId');
            localStorage.setItem('rememberMe', 'false');
        }
    });

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const universityId = document.getElementById('universityId').value;
        const password = document.getElementById('password').value;
        const button = this.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;


        button.innerHTML = `
            <div class="button-content">
                <i class="ri-loader-4-line animate-spin"></i>
                <span>جاري تسجيل الدخول...</span>
            </div>
        `;
        button.disabled = true;

        setTimeout(() => {
            if (universityId && password) {

                button.innerHTML = `
                    <div class="button-content">
                        <i class="ri-check-line"></i>
                        <span>تم بنجاح!</span>
                    </div>
                `;
                button.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    alert('تم تسجيل الدخول بنجاح! سيتم توجيهك إلى لوحة التحكم...');
                    window.location.href = '../هوم/index.html';
                }, 1000);
            } else {

                button.innerHTML = `
                    <div class="button-content">
                        <i class="ri-error-warning-line"></i>
                        <span>فشل تسجيل الدخول</span>
                    </div>
                `;
                button.style.backgroundColor = '#F44336';

                setTimeout(() => {
                    button.innerHTML = originalButtonText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 2000);
            }
        }, 1500);
    });
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
});