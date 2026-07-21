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
    // Material's document$ observable isn't defined at DOMContentLoaded — it
    // gets exposed later when Material's bundle finishes bootstrapping. Poll
    // for it and subscribe once available. Same pattern for mermaid, which
    // Material lazy-imports.
    const trySubscribe = (attemptsLeft) => {
      if (typeof window.document$ !== 'undefined' && window.document$.subscribe) {
        window.document$.subscribe(() => {
          const body = document.body;
          body.classList.add('tcs-transitioning');

          // Re-render mermaid diagrams on the newly-swapped content (first
          // load OR SPA nav). document$ fires on both.
          renderMermaidFromSource();

          // Remove transitioning class after animation completes
          setTimeout(() => {
            body.classList.remove('tcs-transitioning');
            // Reinitialize scroll reveal for new content
            initScrollReveal();
          }, 300);
        });
      } else if (attemptsLeft > 0) {
        setTimeout(() => trySubscribe(attemptsLeft - 1), 200);
      }
    };
    trySubscribe(30); // up to 6s

    if (typeof window.document$ === 'undefined') {
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
   * Render Mermaid diagrams whose containers are empty.
   *
   * Material 9.x's built-in mermaid pipeline transforms the server-rendered
   * <pre class="mermaid"><code>…source…</code></pre> into an empty
   * <div class="mermaid"></div> but fails to insert the rendered SVG back —
   * the diagram never appears, no error surfaces, and the empty container is
   * left with cursor:zoom-in from our CSS (looks clickable, does nothing).
   *
   * Workaround: fetch the raw HTML for the current URL, pull the <pre.mermaid>
   * sources, and render them via the mermaid API that Material's bundle
   * already loaded. Guarded on empty containers — if Material ever fixes its
   * pipeline, this becomes a no-op.
   */
  async function renderMermaidFromSource() {
    if (!window.mermaid || typeof window.mermaid.render !== 'function') return;
    // Only match div.mermaid — that's the post-transform shape Material
    // leaves behind. Rendering into a still-present pre.mermaid would race
    // with Material's own transform and get clobbered.
    const emptyContainers = Array.from(
      document.querySelectorAll('div.mermaid')
    ).filter((el) => !el.querySelector('svg'));
    if (emptyContainers.length === 0) return;

    let html;
    try {
      const resp = await fetch(window.location.href, { cache: 'reload' });
      html = await resp.text();
    } catch (e) {
      console.warn('[TCS mermaid] source fetch failed:', e.message);
      return;
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const sources = Array.from(
      doc.querySelectorAll('pre.mermaid > code')
    ).map((c) => c.textContent);

    for (let i = 0; i < emptyContainers.length && i < sources.length; i++) {
      try {
        const { svg } = await window.mermaid.render(
          `tcs-mermaid-${i}-${Date.now()}`,
          sources[i]
        );
        emptyContainers[i].innerHTML = svg;
      } catch (e) {
        console.warn(`[TCS mermaid] render #${i} failed:`, e.message);
      }
    }
  }

  /**
   * Attach click-to-zoom modal handler to Mermaid diagrams via event delegation.
   * One document-level listener so we survive Material's SPA nav swaps.
   */
  function initMermaidModals() {
    if (document.body.dataset.mermaidClickBound === 'true') return;
    document.body.dataset.mermaidClickBound = 'true';

    document.addEventListener('click', (e) => {
      const container = e.target.closest('.mermaid, pre.mermaid, div.mermaid');
      if (!container) return;
      const svg = container.querySelector('svg');
      if (!svg) return;

      e.preventDefault();
      e.stopPropagation();

      // Serialize the SVG to a data URL for the modal.
      //
      // Mermaid renders SVGs with width="100%" and no background — fine when
      // embedded in the page, wrong for a standalone blob-URL image in
      // GLightbox: "100%" resolves to 0 (no parent) and the transparent SVG
      // sits on GLightbox's white slide, which hides the deep-space theme's
      // dark arrows. We fix both here — pad the viewBox for breathing room,
      // stamp explicit pixel dimensions, and prepend a background <rect>.
      const svgClone = svg.cloneNode(true);
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgClone.style.removeProperty('max-width');

      const vb = svg.getAttribute('viewBox');
      if (vb) {
        const [vbX, vbY, vbW, vbH] = vb.split(/\s+/).map(Number);
        if (vbW && vbH) {
          const pad = 32;
          const outX = vbX - pad;
          const outY = vbY - pad;
          const outW = vbW + pad * 2;
          const outH = vbH + pad * 2;
          svgClone.setAttribute('viewBox', `${outX} ${outY} ${outW} ${outH}`);
          svgClone.setAttribute('width', String(Math.round(outW)));
          svgClone.setAttribute('height', String(Math.round(outH)));

          const bgRect = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
          );
          bgRect.setAttribute('x', String(outX));
          bgRect.setAttribute('y', String(outY));
          bgRect.setAttribute('width', String(outW));
          bgRect.setAttribute('height', String(outH));
          bgRect.setAttribute('fill', '#0A1428');
          svgClone.insertBefore(bgRect, svgClone.firstChild);
        }
      }

      // Mermaid's internal <style> uses dark strokes (#333333) and default
      // theme colors that vanish against our #0A1428 modal background.
      // Append an override <style> that forces light-on-dark for each
      // diagram type we use on the wiki (flowchart, sequence, gantt,
      // timeline). Node FILLS aren't touched — inline `style X fill:...`
      // directives set those with !important, which wins over any CSS.
      const overrideStyle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'style'
      );
      overrideStyle.textContent = `
        /* --- Flowchart --- */
        .flowchart-link, .edgePath .path {
          stroke: rgba(255, 255, 255, 0.75) !important;
          stroke-width: 1.5px !important;
          fill: none !important;
        }
        .marker, .marker * {
          fill: rgba(255, 255, 255, 0.75) !important;
          stroke: rgba(255, 255, 255, 0.75) !important;
        }
        .node rect, .node polygon, .node circle, .node ellipse, .node path,
        .label-container {
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 1.5px !important;
        }
        .edgeLabel, .edgeLabel rect { background-color: transparent !important; }
        .edgeLabel foreignObject > div { background-color: rgba(10, 20, 40, 0.85) !important; }

        /* --- Sequence diagram --- */
        rect.actor, .actor {
          fill: rgba(255, 255, 255, 0.92) !important;
          stroke: rgba(255, 255, 255, 0.6) !important;
        }
        text.actor, text.actor > tspan {
          fill: #0A1428 !important;
        }
        .messageLine0, .messageLine1, line.loopLine {
          stroke: rgba(255, 255, 255, 0.75) !important;
          stroke-width: 1.5px !important;
        }
        .actor-line {
          stroke: rgba(255, 255, 255, 0.35) !important;
        }
        text.messageText, .messageText {
          fill: rgba(255, 255, 255, 0.95) !important;
        }
        .note, rect.note {
          fill: rgba(255, 255, 255, 0.12) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
        }
        text.noteText, .noteText {
          fill: rgba(255, 255, 255, 0.95) !important;
        }
        .labelBox { stroke: rgba(255, 255, 255, 0.6) !important; fill: rgba(255, 255, 255, 0.08) !important; }
        .labelText, .labelText tspan, .loopText, .loopText tspan {
          fill: rgba(255, 255, 255, 0.95) !important;
        }

        /* --- Gantt --- */
        .grid .tick line, .grid path, .exclude-range {
          stroke: rgba(255, 255, 255, 0.25) !important;
        }
        .grid .tick text, .titleText, .sectionTitle, .taskText,
        .taskTextOutsideRight, .taskTextOutsideLeft, .today {
          fill: rgba(255, 255, 255, 0.95) !important;
        }
        line.today { stroke: #FF9D3D !important; stroke-width: 2px !important; }

        /* --- Timeline --- */
        .timeline-node rect, .timeline-node circle, .section-line {
          stroke: rgba(255, 255, 255, 0.6) !important;
        }
      `;
      svgClone.appendChild(overrideStyle);

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

    // Poll for mermaid to be lazy-loaded by Material, then render. document$
    // (below, in initPageTransitions) is the primary render trigger; this is
    // a first-load safety net in case document$ never becomes available.
    const tryRender = (attemptsLeft) => {
      if (window.mermaid && typeof window.mermaid.render === 'function') {
        renderMermaidFromSource();
      } else if (attemptsLeft > 0) {
        setTimeout(() => tryRender(attemptsLeft - 1), 200);
      }
    };
    tryRender(30); // up to 6s
  }

  // Trigger initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
