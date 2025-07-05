// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
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

// Magic card interaction
document.getElementById('magicCard').addEventListener('click', function() {
    // Create star explosion effect
    createStarExplosion();
    
    // Show poem section after delay
    setTimeout(() => {
        document.getElementById('poemSection').style.display = 'block';
        document.getElementById('poemSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 1000);
    
    // Hide the magic card
    this.style.transform = 'scale(0)';
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
    }, 500);
});

// Star explosion effect
function createStarExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.style.position = 'fixed';
    explosionContainer.style.top = '50%';
    explosionContainer.style.left = '50%';
    explosionContainer.style.transform = 'translate(-50%, -50%)';
    explosionContainer.style.pointerEvents = 'none';
    explosionContainer.style.zIndex = '1000';
    
    document.body.appendChild(explosionContainer);
    
    // Create multiple stars for explosion
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        star.style.position = 'absolute';
        star.style.fontSize = '2rem';
        star.style.left = '0';
        star.style.top = '0';
        
        const angle = (i / 20) * 360;
        const distance = 200;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        star.style.animation = `explode 2s ease-out forwards`;
        star.style.setProperty('--x', x + 'px');
        star.style.setProperty('--y', y + 'px');
        
        explosionContainer.appendChild(star);
    }
    
    // Remove explosion after animation
    setTimeout(() => {
        document.body.removeChild(explosionContainer);
    }, 2000);
}

// Add explosion animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize stars when page loads
window.addEventListener('load', createStars);

// Add floating hearts on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && Math.random() > 0.95) {
        createFloatingHeart();
    }
    
    lastScrollTop = scrollTop;
});

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Add floating animation
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingStyle);