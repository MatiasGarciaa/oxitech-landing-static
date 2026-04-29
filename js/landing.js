// ================================================================
// Óxitech — Landing interactions
// ================================================================

document.addEventListener("DOMContentLoaded", () => {

    // Scroll reveal: observe all major sections and key elements
    const targets = document.querySelectorAll(
        ".manifesto__title, .manifesto__text, .pillars__header, .pillar, .statement__title, .statement__text, .statement__pills, .showcase__text, .showcase__visual, .cta__title, .cta__text, .cta__actions"
    );

    targets.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger children of the same parent
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80;
                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, Math.min(delay, 300));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    });

    targets.forEach(el => observer.observe(el));

    // Nav shadow on scroll
    const nav = document.querySelector(".nav");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;

        if (scrolled > 8) {
            nav.style.boxShadow = "0 1px 0 rgba(0, 0, 0, 0.06)";
        } else {
            nav.style.boxShadow = "none";
        }

        lastScroll = scrolled;
    }, { passive: true });

    // Smooth scroll for anchor links (respects reduced motion)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#" || targetId.length <= 1) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 64;

            window.scrollTo({
                top: offset,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    });
});
