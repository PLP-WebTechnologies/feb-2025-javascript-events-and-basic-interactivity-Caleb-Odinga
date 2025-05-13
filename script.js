document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button click event
    const clickButton = document.getElementById('clickButton');
    const clickOutput = document.getElementById('clickOutput');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = "Button not clicked yet";
            clickOutput.style.color = "";
        }, 2000);
    });
    
    // Hover effects
    const hoverBox = document.getElementById('hoverBox');
    const hoverOutput = document.getElementById('hoverOutput');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Mouse is hovering! ✨";
        this.style.backgroundColor = "#e3f2fd";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
        this.style.backgroundColor = "";
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypressInput');
    const keypressOutput = document.getElementById('keypressOutput');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
    });
    
    // Secret action (double click or long press)
    const secretBox = document.getElementById('secretBox');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        showSecret("You discovered the double-click secret! 🤫");
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function(e) {
        pressTimer = setTimeout(() => {
            showSecret("You found the long press secret! 🕵️‍♂️");
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function showSecret(message) {
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
        
        // Show message
        const secretMsg = document.createElement('p');
        secretMsg.textContent = message;
        secretMsg.style.color = "#e74c3c";
        secretMsg.style.fontWeight = "bold";
        secretMsg.style.textAlign = "center";
        secretMsg.style.marginTop = "10px";
        
        secretBox.appendChild(secretMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
            secretMsg.remove();
        }, 3000);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Random position
        const startX = Math.random() * secretBox.offsetWidth;
        confetti.style.left = `${startX}px`;
        confetti.style.bottom = '0';
        
        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        secretBox.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
    
    // ========== Interactive Elements ==========
    
    // Button that changes text and color
    const colorChanger = document.getElementById('colorChanger');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
        
        // Reset text after 1 second
        setTimeout(() => {
            this.textContent = "Change My Color!";
        }, 1000);
    });
    
    // Image gallery/slideshow
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Auto-advance slideshow every 3 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }, 3000);
    
    // Tab system
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    const lengthRule = document.getElementById('length-rule');
    const numberRule = document.getElementById('number-rule');
    const specialRule = document.getElementById('special-rule');
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Check length
        if (password.length >= 8) {
            lengthRule.classList.add('valid');
        } else {
            lengthRule.classList.remove('valid');
        }
        
        // Check for number
        if (/\d/.test(password)) {
            numberRule.classList.add('valid');
        } else {
            numberRule.classList.remove('valid');
        }
        
        // Check for special character
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            specialRule.classList.add('valid');
        } else {
            specialRule.classList.remove('valid');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            // Reset password rules display
            [lengthRule, numberRule, specialRule].forEach(el => el.classList.remove('valid'));
        }
    });
});
