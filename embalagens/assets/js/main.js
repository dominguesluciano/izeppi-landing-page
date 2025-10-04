AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

VANTA.GLOBE({
    el: "#vanta-globe",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3f83f8,
    backgroundColor: 0xf8fafc,
    size: 0.8
});

feather.replace();