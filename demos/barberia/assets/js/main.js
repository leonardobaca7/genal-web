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
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-6');
            navbar.classList.add('bg-bb-900/95');
            navbar.classList.remove('bg-bb-900/80');
        } else {
            navbar.classList.add('py-6');
            navbar.classList.remove('py-4');
            navbar.classList.add('bg-bb-900/80');
            navbar.classList.remove('bg-bb-900/95');
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

    // Initial check and scroll event listener
    checkReveal();
    window.addEventListener('scroll', checkReveal);

    // --- Mock Booking Form Submission ---
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('success-msg');
    const newBookingBtn = document.getElementById('new-booking-btn');

    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state on button (optional, keeping it simple for now)
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph ph-spinner animate-spin"></i> Procesando...';
            submitBtn.disabled = true;

            // Get form values based on input order
            const elements = bookingForm.querySelectorAll('select, input');
            const servicio = elements[0].options[elements[0].selectedIndex].text;
            const barbero = elements[1].options[elements[1].selectedIndex].text;
            const fecha = elements[2].value;
            const hora = elements[3].options[elements[3].selectedIndex].text;
            const nombre = elements[4].value;
            const telefono = elements[5].value;

            // Simulate network request
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Open WhatsApp
                const text = `Hola Black Barber, soy ${nombre}. Quisiera confirmar mi reserva para: ${servicio} con ${barbero}. Fecha: ${fecha} a las ${hora}. Mi número de contacto es ${telefono}.`;
                const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
                
                // Hide form, show success message
                bookingForm.style.opacity = '0';
                setTimeout(() => {
                    successMsg.classList.remove('hidden');
                    successMsg.style.opacity = '0';
                    // Trigger reflow
                    void successMsg.offsetWidth; 
                    successMsg.style.transition = 'opacity 0.5s ease';
                    successMsg.style.opacity = '1';
                    bookingForm.reset();
                }, 300);

            }, 1000);
        });
    }

    if(newBookingBtn) {
        newBookingBtn.addEventListener('click', () => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
                successMsg.classList.add('hidden');
                bookingForm.style.opacity = '1';
            }, 500);
        });
    }
});
