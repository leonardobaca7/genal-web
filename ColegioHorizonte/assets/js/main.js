document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isClosed = mobileMenu.classList.contains('translate-x-full');
        if (isClosed) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; 
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-4', 'shadow-sm');
        } else {
            navbar.classList.add('py-4', 'shadow-sm');
            navbar.classList.remove('py-2', 'shadow-md');
        }
    });

    // --- Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    checkReveal();
    window.addEventListener('scroll', checkReveal);

    // --- Admission Form Submission ---
    const admissionForm = document.getElementById('admission-form');
    const formSuccess = document.getElementById('form-success');

    if(admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = admissionForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph-bold ph-spinner animate-spin"></i> Enviando...';
            submitBtn.disabled = true;

            const inputs = admissionForm.querySelectorAll('input, select, textarea');
            const nombre = inputs[0].value;
            const telefono = inputs[1].value;
            const correo = inputs[2].value;
            const nivel = inputs[3].options[inputs[3].selectedIndex].text;

            // Generate WhatsApp message based on form data (Bonus integration like the Barber shop)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                const text = `Hola Colegio Horizonte, soy ${nombre}. He enviado una solicitud de información para el ${nivel}. Mi correo es ${correo} y mi teléfono ${telefono}.`;
                const whatsappUrl = `https://wa.me/51999888777?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
                
                admissionForm.style.display = 'none';
                formSuccess.classList.remove('hidden');

            }, 1000);
        });
    }
});
