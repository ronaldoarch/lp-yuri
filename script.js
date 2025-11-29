// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de contadores
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
        }
    }, 16);
}

// Observador para animar contadores quando visíveis
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            if (target && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber, target);
            }
        }
    });
}, observerOptions);

// Observar elementos de estatísticas
document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// Adicionar efeito de parallax suave no scroll
let lastScroll = 0;
let isTakingOff = false;

window.addEventListener('scroll', () => {
    if (isTakingOff) return; // Não aplicar parallax durante decolagem
    
    const currentScroll = window.pageYOffset;
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (phoneMockup) {
        phoneMockup.style.transform = `translateY(${currentScroll * 0.05}px)`;
    }
    
    lastScroll = currentScroll;
});

// Adicionar animação de entrada aos elementos
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Evento de conversão Meta Pixel ao clicar no botão CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton && typeof fbq !== 'undefined') {
    ctaButton.addEventListener('click', function() {
        // Disparar evento de concluir inscrição
        fbq('track', 'CompleteRegistration', {
            content_name: 'Quero Pegar meu bônus',
            content_category: 'CTA Click'
        });
    });
}

