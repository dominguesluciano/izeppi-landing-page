/**
 * Testimonial Infinite Slider
 * High-performance, SEO-friendly infinite testimonial slider
 * Supports accessibility and reduced motion preferences
 */

class TestimonialSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.track = null;
        this.slides = [];
        this.isInitialized = false;

        // Performance and accessibility settings
        this.config = {
            speed: 30000, // 30 seconds for full cycle
            pauseOnHover: true,
            respectReducedMotion: true,
            duplicateSlides: true
        };

        this.init();
    }

    init() {
        if (!this.container) {
            console.warn('Testimonial slider container not found');
            return;
        }

        this.setupSlider();
        this.duplicateSlides();
        this.bindEvents();
        this.handleReducedMotion();
        this.isInitialized = true;

        // SEO: Ensure content is accessible to crawlers
        this.enhanceAccessibility();
    }

    setupSlider() {
        const existingSlides = this.container.querySelectorAll('.testimonial-slide');

        if (existingSlides.length === 0) {
            console.warn('No testimonial slides found');
            return;
        }

        // Store original slides
        this.slides = Array.from(existingSlides);
    }

    duplicateSlides() {
        if (!this.config.duplicateSlides || this.slides.length === 0) return;

        const track = this.container.querySelector('.testimonial-track');
        if (!track) return;

        // Clone all slides for seamless infinite loop
        this.slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Hide duplicates from screen readers
            track.appendChild(clone);
        });
    }

    bindEvents() {
        if (!this.config.pauseOnHover) return;

        const track = this.container.querySelector('.testimonial-track');
        if (!track) return;

        // Only pause on hover for desktop (tablet and up)
        const mediaQuery = window.matchMedia('(min-width: 769px)');

        const handleHoverEvents = (e) => {
            if (e.matches) {
                // Desktop: enable hover pause
                track.addEventListener('mouseenter', this.pauseAnimation.bind(this));
                track.addEventListener('mouseleave', this.resumeAnimation.bind(this));
                track.addEventListener('focusin', this.pauseAnimation.bind(this));
                track.addEventListener('focusout', this.resumeAnimation.bind(this));
            } else {
                // Mobile: remove hover events to prevent issues
                track.removeEventListener('mouseenter', this.pauseAnimation.bind(this));
                track.removeEventListener('mouseleave', this.resumeAnimation.bind(this));
                track.removeEventListener('focusin', this.pauseAnimation.bind(this));
                track.removeEventListener('focusout', this.resumeAnimation.bind(this));
            }
        };

        // Initial setup
        handleHoverEvents(mediaQuery);

        // Listen for screen size changes
        mediaQuery.addEventListener('change', handleHoverEvents);
    }

    pauseAnimation() {
        const track = this.container.querySelector('.testimonial-track');
        if (track) {
            track.style.animationPlayState = 'paused';
        }
    }

    resumeAnimation() {
        const track = this.container.querySelector('.testimonial-track');
        if (track) {
            track.style.animationPlayState = 'running';
        }
    }

    handleReducedMotion() {
        if (!this.config.respectReducedMotion) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleMotionChange = (e) => {
            const track = this.container.querySelector('.testimonial-track');
            if (!track) return;

            if (e.matches) {
                // User prefers reduced motion
                track.style.animation = 'none';
                this.container.style.overflowX = 'auto';
                this.container.style.scrollBehavior = 'smooth';
            } else {
                // User is ok with motion
                track.style.animation = '';
                this.container.style.overflowX = 'hidden';
            }
        };

        // Check initial preference
        handleMotionChange(prefersReducedMotion);

        // Listen for changes
        prefersReducedMotion.addEventListener('change', handleMotionChange);
    }

    enhanceAccessibility() {
        // Add ARIA labels for better screen reader support
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Customer testimonials');

        // Ensure each slide is focusable and has proper semantics
        this.slides.forEach((slide, index) => {
            slide.setAttribute('role', 'article');
            slide.setAttribute('aria-label', `Testimonial ${index + 1}`);

            // Make quotes accessible
            const quote = slide.querySelector('blockquote');
            if (quote) {
                quote.setAttribute('role', 'blockquote');
            }
        });
    }

    // Public API methods
    pause() {
        this.pauseAnimation();
    }

    resume() {
        this.resumeAnimation();
    }

    destroy() {
        if (!this.isInitialized) return;

        const track = this.container.querySelector('.testimonial-track');
        if (track) {
            track.removeEventListener('mouseenter', this.pauseAnimation);
            track.removeEventListener('mouseleave', this.resumeAnimation);
            track.removeEventListener('focusin', this.pauseAnimation);
            track.removeEventListener('focusout', this.resumeAnimation);
        }

        this.isInitialized = false;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider with better error handling
    try {
        const slider = new TestimonialSlider('.testimonial-slider');

        // Make slider globally accessible for debugging
        window.testimonialSlider = slider;
    } catch (error) {
        console.error('Failed to initialize testimonial slider:', error);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialSlider;
}