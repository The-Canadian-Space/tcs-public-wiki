/**
 * Deep Space Wiki Animations & Interactions
 *
 * Core responsibilities:
 * - Scroll reveal: IntersectionObserver-based fade-in on h2/h3 and .tcs-reveal elements
 * - Page transitions: Smooth opacity transition on route changes via Material's document$ event
 * - Starfield twinkle: Subtle twinkling accent stars in hero section
 * - Accessibility: Respects prefers-reduced-motion preference
 */

'use strict';

(function () {
  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Initialize scroll reveal with IntersectionObserver
   * Auto-reveals h2/h3 in main content and any .tcs-reveal elements
   */
  function initScrollReveal() {
    if (prefersReducedMotion()) {
      // If reduced motion is preferred, make all reveal elements immediately visible
      const revealElements = document.querySelectorAll(
        '.tcs-reveal, main h2, main h3'
      );
      revealElements.forEach((el) => {
        if (!el.classList.contains('tcs-reveal')) {
          el.classList.add('tcs-reveal');
        }
        el.classList.add('visible');
      });
      return;
    }

    // Select elements to observe
    const revealElements = document.querySelectorAll('.tcs-reveal');
    const headingElements = document.querySelectorAll('main h2, main h3');

    // Add .tcs-reveal to headings if not already present
    headingElements.forEach((heading) => {
      if (!heading.classList.contains('tcs-reveal')) {
        heading.classList.add('tcs-reveal');
      }
    });

    // Create IntersectionObserver
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all reveal elements
    const allRevealElements = document.querySelectorAll('.tcs-reveal');
    allRevealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /**
   * Initialize page transition effects
   * Adds subtle opacity transition on route changes via Material's document$ observable
   */
  function initPageTransitions() {
    // Try to hook into Material's document$ observable (exists after MkDocs loads)
    if (
      typeof window.document$ !== 'undefined' &&
      window.document$.subscribe
    ) {
      window.document$.subscribe(() => {
        const body = document.body;
        body.classList.add('tcs-transitioning');

        // Remove transitioning class after animation completes
        setTimeout(() => {
          body.classList.remove('tcs-transitioning');
          // Reinitialize scroll reveal for new content
          initScrollReveal();
        }, 300);
      });
    } else {
      // Fallback: listen for popstate (browser back/forward)
      window.addEventListener('popstate', () => {
        const body = document.body;
        body.classList.add('tcs-transitioning');
        setTimeout(() => {
          body.classList.remove('tcs-transitioning');
          initScrollReveal();
        }, 300);
      });

      // Also listen for link clicks with metadata attribute
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="/"]');
        if (
          link &&
          !link.hasAttribute('download') &&
          !link.hasAttribute('target')
        ) {
          const body = document.body;
          body.classList.add('tcs-transitioning');
        }
      });
    }
  }

  /**
   * Create starfield twinkle effect in hero section
   * Injects fixed twinkling stars at pseudo-random positions using pre-computed data
   */
  function initHeroStarfieldTwinkle() {
    if (prefersReducedMotion()) {
      return; // Skip twinkle animation if motion is reduced
    }

    const hero = document.querySelector('.tcs-hero');
    if (!hero) return;

    // Pre-computed pseudo-random positions for deterministic rendering
    // Format: {x: percentage from left, y: percentage from top}
    const twinklePositions = [
      { x: 12, y: 8 },
      { x: 88, y: 12 },
      { x: 25, y: 65 },
      { x: 92, y: 72 },
      { x: 15, y: 45 },
      { x: 78, y: 35 },
      { x: 45, y: 18 },
      { x: 62, y: 82 },
    ];

    // Inject twinkle stars
    twinklePositions.forEach((pos, index) => {
      const twinkle = document.createElement('span');
      twinkle.className = 'tcs-twinkle';
      twinkle.style.cssText = `
        position: absolute;
        left: ${pos.x}%;
        top: ${pos.y}%;
        width: 2px;
        height: 2px;
        background-color: #ffffff;
        border-radius: 50%;
        opacity: 0.6;
        pointer-events: none;
        z-index: 1;
        animation: twinkle-fade 3s infinite alternate;
        animation-delay: ${index * 0.25}s;
      `;
      hero.appendChild(twinkle);
    });
  }

  /**
   * Add twinkle-fade keyframe animation to document if not present
   */
  function injectTwinkleKeyframes() {
    if (document.querySelector('style[data-tcs-twinkle]')) {
      return; // Already injected
    }

    const style = document.createElement('style');
    style.setAttribute('data-tcs-twinkle', 'true');
    style.textContent = `
      @keyframes twinkle-fade {
        0% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          opacity: 0.3;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Main initialization function
   * Called when DOM is fully loaded
   */
  function init() {
    injectTwinkleKeyframes();
    initScrollReveal();
    initPageTransitions();
    initHeroStarfieldTwinkle();
  }

  // Trigger initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
