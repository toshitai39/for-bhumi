// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Create animated stars
    createStars();
    
    // Create flying stars
    createFlyingStars();
    
    // Add click listener for background color changes
    document.addEventListener('click', changeBackgroundColor);
});

// Create animated stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 2 + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starsContainer.appendChild(star);
    }
}

// Create flying stars everywhere
function createFlyingStars() {
    setInterval(() => {
        const flyingStar = document.createElement('div');
        flyingStar.innerHTML = ['⭐', '✨', '🌟', '💫', '🌙'][Math.floor(Math.random() * 5)];
        flyingStar.style.position = 'fixed';
        flyingStar.style.left = Math.random() * window.innerWidth + 'px';
        flyingStar.style.top = '-50px';
        flyingStar.style.fontSize = '2rem';
        flyingStar.style.pointerEvents = 'none';
        flyingStar.style.zIndex = '99';
        flyingStar.style.animation = 'flyDown 4s linear forwards';
        
        document.body.appendChild(flyingStar);
        
        setTimeout(() => {
            if (flyingStar.parentNode) {
                flyingStar.parentNode.removeChild(flyingStar);
            }
        }, 4000);
    }, 800);
}

// Background color changer
const backgroundColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let currentBgIndex = 0;

function changeBackgroundColor() {
    currentBgIndex = (currentBgIndex + 1) % backgroundColors.length;
    document.body.style.background = backgroundColors[currentBgIndex];
    
    // Create click sparkles
    createClickSparkles(event.clientX, event.clientY);
}

function createClickSparkles(x, y) {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.left = x + 'px';
    sparkleContainer.style.top = y + 'px';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '1000';
    
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        
        const angle = (i / 8) * 360;
        const distance = 50;
        const sparkleX = Math.cos(angle * Math.PI / 180) * distance;
        const sparkleY = Math.sin(angle * Math.PI / 180) * distance;
        
        sparkle.style.animation = `clickSparkle 1s ease-out forwards`;
        sparkle.style.setProperty('--sparkle-x', sparkleX + 'px');
        sparkle.style.setProperty('--sparkle-y', sparkleY + 'px');
        
        sparkleContainer.appendChild(sparkle);
    }
    
    setTimeout(() => {
        document.body.removeChild(sparkleContainer);
    }, 1000);
}

// Function to toggle poem visibility with flip animation
function togglePoem(card, poemId) {
    event.stopPropagation();
    
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
        
        // Create sparkle effect
        createSparkles(card);
        
        // Add typing effect to poem
        setTimeout(() => {
            const poemText = card.querySelector('.poem-text p');
            if (poemText && !poemText.classList.contains('typed')) {
                typeWriter(poemText);
            }
        }, 300);
    }
}

// Sparkle effect when card flips
function createSparkles(card) {
    const rect = card.getBoundingClientRect();
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = rect.top + 'px';
    sparkleContainer.style.left = rect.left + 'px';
    sparkleContainer.style.width = rect.width + 'px';
    sparkleContainer.style.height = rect.height + 'px';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '1000';
    
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.animation = `sparkleFloat 2s ease-out forwards`;
        sparkle.style.animationDelay = Math.random() * 0.5 + 's';
        
        sparkleContainer.appendChild(sparkle);
    }
    
    setTimeout(() => {
        document.body.removeChild(sparkleContainer);
    }, 2000);
}

// Typing effect for poems
function typeWriter(element) {
    const text = element.innerHTML;
    element.innerHTML = '';
    element.classList.add('typed');
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes flyDown {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes clickSparkle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--sparkle-x), var(--sparkle-y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Enhanced magic card interaction
document.getElementById('magicCard').addEventListener('click', function() {
    // Create rainbow explosion effect
    createRainbowExplosion();
    
    // Show poem section after delay
    setTimeout(() => {
        document.getElementById('poemSection').style.display = 'block';
        document.getElementById('poemSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Type the final poem
        const finalPoem = document.querySelector('#poemSection .poem-text p');
        if (finalPoem) {
            typeWriter(finalPoem);
        }
    }, 1500);
    
    // Hide the magic card with scale animation
    this.style.transform = 'scale(0) rotate(360deg)';
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
    }, 800);
});

// Rainbow explosion effect
function createRainbowExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.style.position = 'fixed';
    explosionContainer.style.top = '50%';
    explosionContainer.style.left = '50%';
    explosionContainer.style.transform = 'translate(-50%, -50%)';
    explosionContainer.style.pointerEvents = 'none';
    explosionContainer.style.zIndex = '1000';
    
    document.body.appendChild(explosionContainer);
    
    const colors = ['💖', '💛', '💚', '💙', '💜', '🧡'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = colors[Math.floor(Math.random() * colors.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.left = '0';
        heart.style.top = '0';
        
        const angle = (i / 30) * 360;
        const distance = 150 + Math.random() * 100;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        heart.style.animation = `rainbowExplode 3s ease-out forwards`;
        heart.style.setProperty('--x', x + 'px');
        heart.style.setProperty('--y', y + 'px');
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        
        explosionContainer.appendChild(heart);
    }
    
    setTimeout(() => {
        document.body.removeChild(explosionContainer);
    }, 3000);
}

// Add rainbow explosion animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbowExplode {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rainbowStyle);