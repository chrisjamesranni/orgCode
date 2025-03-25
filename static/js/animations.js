document.addEventListener('DOMContentLoaded', function() {
    // Create subtle background effect for flood/landslide theme
    createThemeBackground();
    
    // Handle any form interactions
    initializeFormInteractions();
});

// Create a subtle background effect without rain or intense animations
function createThemeBackground() {
    const backgroundContainer = document.querySelector('.background-container');
    
    // Add a gentle gradient wave effect
    const waveEffect = document.createElement('div');
    waveEffect.classList.add('wave-effect');
    
    // Set up wave styling
    waveEffect.style.position = 'absolute';
    waveEffect.style.bottom = '0';
    waveEffect.style.left = '0';
    waveEffect.style.width = '100%';
    waveEffect.style.height = '25%';
    waveEffect.style.background = 'linear-gradient(to top, rgba(0, 100, 180, 0.2), transparent)';
    waveEffect.style.opacity = '0.7';
    waveEffect.style.zIndex = '-1';
    
    // Add subtle animation
    waveEffect.style.animation = 'gentle-wave 15s ease-in-out infinite';
    
    // Add keyframe for gentle wave
    const styleSheet = document.styleSheets[0];
    const waveKeyframe = `
    @keyframes gentle-wave {
        0% {
            transform: translateY(0) scaleY(1);
        }
        50% {
            transform: translateY(-15px) scaleY(1.05);
        }
        100% {
            transform: translateY(0) scaleY(1);
        }
    }`;
    
    try {
        styleSheet.insertRule(waveKeyframe, styleSheet.cssRules.length);
    } catch (e) {
        // Handle potential errors
        console.log('Animation rule already exists');
    }
    
    backgroundContainer.appendChild(waveEffect);
    
    // Add terrain element (representing landslides/mountains)
    const terrain = document.createElement('div');
    terrain.classList.add('terrain-element');
    
    // Style terrain
    terrain.style.position = 'absolute';
    terrain.style.bottom = '0';
    terrain.style.right = '0';
    terrain.style.width = '40%';
    terrain.style.height = '30%';
    terrain.style.background = 'linear-gradient(45deg, rgba(101, 67, 33, 0.4), rgba(70, 50, 20, 0.3))';
    terrain.style.clipPath = 'polygon(100% 100%, 0% 100%, 25% 80%, 50% 30%, 75% 60%, 100% 20%)';
    terrain.style.zIndex = '-1';
    terrain.style.opacity = '0.8';
    
    backgroundContainer.appendChild(terrain);
}

// Initialize form interactions
function initializeFormInteractions() {
    // Password visibility toggle
    const togglePassword = document.querySelectorAll('.toggle-password');
    
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Toggle icon
            this.innerHTML = type === 'password' ? 
                '<i class="far fa-eye"></i>' : 
                '<i class="far fa-eye-slash"></i>';
        });
    });
    
    // Add password strength indicator if password fields exist
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        if (field.id === 'password') {
            field.addEventListener('input', function() {
                const meterBar = document.querySelector('.meter-bar');
                const strengthText = document.querySelector('.strength-text');
                
                if (meterBar && strengthText) {
                    const strength = calculatePasswordStrength(this.value);
                    updatePasswordStrength(strength, meterBar, strengthText);
                }
            });
        }
    });
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]+/)) strength += 20;
    
    return strength;
}

// Update password strength visual indicator
function updatePasswordStrength(strength, meterBar, strengthText) {
    meterBar.style.width = strength + '%';
    
    if (strength < 40) {
        meterBar.style.backgroundColor = '#e74c3c'; // Red - weak
        strengthText.textContent = 'Weak';
    } else if (strength < 80) {
        meterBar.style.backgroundColor = '#f39c12'; // Orange - medium
        strengthText.textContent = 'Medium';
    } else {
        meterBar.style.backgroundColor = '#2ecc71'; // Green - strong
        strengthText.textContent = 'Strong';
    }
}

// Add parallax effect for background
window.addEventListener('mousemove', function(e) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position as percentage
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;
    
    // Apply subtle movement to background elements
    const backgroundContainer = document.querySelector('.background-container');
    if (backgroundContainer) {
        backgroundContainer.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    }
    
    // Move waterfall slightly
    const waterfallContainer = document.querySelector('.waterfall-container');
    if (waterfallContainer) {
        waterfallContainer.style.transform = `translate(${mouseX * 10}px, ${mouseY * 5}px) scale(0.7)`;
    }
});
