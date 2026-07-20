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
   * Attach click-to-zoom modal handlers to Mermaid diagrams via event delegation.
   *
   * MERMAID_CLICK_V2 (2026-07-19): rewritten from per-element listeners to
   * document-level delegation. The V1 approach attached listeners in a forEach
   * loop on DOMContentLoaded, but three failure modes hit at once:
   *   1. Mermaid replaces / mutates the container node when it renders SVG,
   *      orphaning the attached listener.
   *   2. Material's navigation.instant SPA-nav swaps the DOM without re-firing
   *      DOMContentLoaded — subsequent pages had no handlers at all.
   *   3. MutationObserver could re-attach handlers multiple times, but only
   *      to the same container reference — which was already orphaned in (1).
   *
   * Delegation attaches ONCE to document, checks `.closest(...)` at click time,
   * and works regardless of when the SVG renders or how many times the DOM swaps.
   * Cursor affordance still comes from CSS (`.md-typeset .mermaid { cursor: zoom-in }`).
   */
  function initMermaidModals() {
    // Only attach once — subsequent calls (e.g. from document$.subscribe)
    // would double up the handler.
    if (document.body.dataset.mermaidClickBound === 'true') {
      console.log('[TCS mermaid] already bound, skipping re-init');
      return;
    }
    document.body.dataset.mermaidClickBound = 'true';

    // MERMAID_CLICK_DEBUG_V1 (2026-07-19): diagnostic logging while
    // debugging "clicking does nothing" — silent-fail with no console errors.
    // Remove this block once click-to-zoom is confirmed working end-to-end.
    const debugCounts = document.querySelectorAll('.mermaid, pre.mermaid, div.mermaid');
    console.log('[TCS mermaid] init: attached document click handler. Currently on page:', debugCounts.length, 'container(s)');
    if (debugCounts.length) {
      console.log('[TCS mermaid] first container classes:', debugCounts[0].className, ', tag:', debugCounts[0].tagName);
      console.log('[TCS mermaid] first container has SVG?', !!debugCounts[0].querySelector('svg'));
    }
    console.log('[TCS mermaid] GLightbox available?', typeof window.GLightbox !== 'undefined');

    document.addEventListener('click', (e) => {
      const container = e.target.closest('.mermaid, pre.mermaid, div.mermaid');
      if (!container) {
        // Diagnostic: if the click target LOOKS mermaid-ish but no container
        // matched, log so we can see what selector we should be using.
        const svgClicked = e.target.closest('svg');
        const preClicked = e.target.closest('pre');
        if (svgClicked || preClicked) {
          console.log('[TCS mermaid] click on svg/pre but no .mermaid container in ancestor chain', {
            target: e.target,
            targetTag: e.target.tagName,
            targetClass: e.target.className,
            nearestSvg: svgClicked,
            nearestPre: preClicked,
            svgParentClass: svgClicked && svgClicked.parentElement ? svgClicked.parentElement.className : null,
          });
        }
        return;
      }
      console.log('[TCS mermaid] click matched container', container.tagName, container.className);
      const svg = container.querySelector('svg');
      if (!svg) {
        console.warn('[TCS mermaid] container matched but no SVG child — mermaid did not render into this container', container);
        return;
      }
      console.log('[TCS mermaid] opening modal for SVG', svg);

      e.preventDefault();
      e.stopPropagation();

      // Serialize the SVG to a data URL
      const svgClone = svg.cloneNode(true);
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgClone.style.margin = '1.5rem';
      svgClone.style.maxWidth = '95vw';
      svgClone.style.maxHeight = '95vh';

      const svgString = new XMLSerializer().serializeToString(svgClone);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      // Open with glightbox if available, else use native dialog fallback
      if (window.GLightbox) {
        window.GLightbox({
          elements: [{ href: url, type: 'image' }],
        }).openAt(0);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } else {
        // Fallback: native modal dialog
        const dialog = document.createElement('dialog');
        dialog.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 95vw;
          max-height: 95vh;
          padding: 2rem;
          background: var(--md-default-bg-color);
          border: 2px solid var(--md-accent-fg-color);
          border-radius: 12px;
          z-index: 1000;
          overflow: auto;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          font-size: 2rem;
          color: var(--md-accent-fg-color);
          cursor: pointer;
        `;
        closeBtn.addEventListener('click', () => dialog.close());

        const svgContainer = document.createElement('div');
        svgContainer.appendChild(svgClone);
        dialog.appendChild(closeBtn);
        dialog.appendChild(svgContainer);
        document.body.appendChild(dialog);
        dialog.showModal();

        dialog.addEventListener('close', () => {
          dialog.remove();
          URL.revokeObjectURL(url);
        });
      }
    }, true); // useCapture so we run before other click handlers
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
    initMermaidModals();
  }

  // Trigger initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
