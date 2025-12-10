/* Aseguraramos de que se ejecute el script solo después de que index.html ha sido completamente cargado. */
document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger); // Habilita el plugin ScrollTrigger para animaciones basadas en el desplazamiento.

    // Funciones de utilidad para seleccionar elementos (abreviaturas de querySelector y querySelectorAll)
    const qs = (selector, scope) => (scope || document).querySelector(selector);
    const qsa = (selector, scope) => (scope || document).querySelectorAll(selector);

    // ANIMACIÓN HERO
    // Se usa .timeline() para que vayan entrando paso a paso los elementos.
    const heroTl = gsap.timeline({
        defaults: {duration: 0.7, ease: 'power3.out'}, // Configuración por defecto para este Timeline
        scrollTrigger: {
            // El trigger es la sección Hero, identificada por el atributo data-anim-section
            trigger: '[data-anim-section="hero"]', 
            start: 'top 80%', // La animación comienza cuando se alcanza el 80% del viewport
            toggleActions: 'play none none none' // Solo se realiza una vez, si luego vuelvo a subir no se repite
        }
    });

    heroTl.from('[data-anim="titulo"]', { // Animación para el título principal (h1)
        y: 30, // Viene desde 30px abajo respecto a su posición original
        opacity: 0}) // Transiciona de 0 a 1 para dar la sensación de que aparece

    .from('[data-anim="subtitulo"]', { // Animación para el texto base (p)
        y: 20, 
        opacity: 0}, '-=0.35') // Comienza 0.35s antes de que termine la animación anterior

    .from('[data-anim="cta"] .btn', { // Animación para los botones
        y: 12, 
        opacity: 0, 
        stagger: 0.12}, '-=0.35') // cada botón entra con un retraso de 0.12 segundos respecto al anterior

    .from('[data-anim="ilustracion"]', { // Animación para la imagen del principio
        scale: 0.96, // Empieza un poco más pequeño
        opacity: 0}, '-=0.45'); // Comienza 0.45 segundos antes


    // ANIMACIÓN CARACTERÍSTICAS
    gsap.from('[data-anim="titulo-seccion"]', {
        y: 20, 
        opacity: 0, 
        duration: 0.6,
        scrollTrigger: {
            trigger: '[data-anim="titulo-seccion"]', 
            start: 'top 90%', // Comienza cuando el título está en la parte superior del 90% del viewport
            toggleActions: 'play none none none'
        }
    });

    // Animación para el texto de la sección de características.
    gsap.from('[data-anim="subtitulo-seccion"]', {
        y: 16, 
        opacity: 0, 
        duration: 0.6, 
        delay: 0.08,
        scrollTrigger: {
            trigger: '[data-anim="subtitulo-seccion"]', 
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    // ANIMACIÓN TARJETAS
    const tarjetas = qsa('.tarjeta'); // Selecciona todas las tarjetas
    const direcciones = ['-150%', '150%', '120%', '-120%']; // Array de direcciones

    tarjetas.forEach((tarjeta, i) => { // Itera sobre cada tarjeta
        const dir = direcciones[i % direcciones.length]; // Asigna una dirección del array a la tarjeta de la iteración actual
        
        gsap.from(tarjeta, {
            x: dir, // Posición inicial fuera de la pantalla asignada antes
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: tarjeta,
            start: 'top 85%', // Cada tarjeta se anima individualmente cuando su parte superior alcanza el 85% del viewport
            toggleActions: 'play none none none',
            }
        });
    });


    // ANIMACIÓN FOOTER
    const footerElemento = qs('[data-anim-section="footer"]'); // Selecciona el footer por su atributo data-anim-section
    
    if (footerElemento) { // Se activa cuando el footer está 
        const footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: footerElemento,
                start: 'top 95%', // La animación del footer comienza cuando su borde superior está casi al fondo del viewport
                toggleActions: 'play none none none'
            }
        });

        footerTl.from(footerElemento, { // Entrada general del contenedor footer
            y: 40, 
            opacity: 0, 
            duration: 0.9, 
            ease: 'power3.out'
        })
        .from('[data-anim="footer-titulo"]', { // Título
            y: 12, 
            opacity: 0, 
            duration: 0.5}, '-=0.35')

        .from('[data-anim="footer-descripcion"]', { // Párrafo descripción
            y: 8,
            opacity: 0,
            duration: 0.4
        }, '-=0.3')

        .from(qsa('[data-anim^="footer-contacto"]'), { // Contacto
            y: 8, 
            opacity: 0, 
            duration: 0.45, 
            stagger: 0.08}, '-=0.3');
    }

    // ANIMACIÓN BOTÓN CTA
    const ctaBtn = qs('[data-anim="cta-btn"]');
    
    if (ctaBtn) {
        const ctaPulse = gsap.fromTo(ctaBtn, {
                scale: 1, 
                boxShadow: '0 8px 24px rgba(108,92,231,0.12)'
            },

            {
                scale: 1.04,
                boxShadow: '0 18px 48px rgba(108,92,231,0.14)', // Sombra
                duration: 1.4, 
                yoyo: true, // Vuelve al estado inicial
                repeat: -1, // Se repite todo el rato
                ease: 'sine.inOut'
            }
        );

        // Pausa la animación si la pantalla es menor o igual a 360px (móvil).
        if (window.matchMedia && window.matchMedia('(max-width:360px)').matches) {
            ctaPulse.pause();
        }
    }
});