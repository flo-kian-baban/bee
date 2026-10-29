"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { nav, ui } from "@/content/site";

const sectionId = (href: string) => href.split("#")[1];
const sectionIds = nav.links.map((link) => sectionId(link.href));

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionInView, setSectionInView] = useState<string | null>(null);
  const activeSection = isHome ? sectionInView : null;

  const closeMenu = () => setMenuOpen(false);

  // The active section is the first nav section, in page order, that reaches
  // into the band between the bottom of the nav and the middle of the viewport.
  // The observer only signals that a section crossed the band; positions are
  // then read from the layout, because a jump that lands a section's bottom
  // exactly on the nav still counts as intersecting and fires no callback.
  useEffect(() => {
    if (!isHome) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);
    if (sections.length === 0) return;

    const navHeight = headerRef.current?.offsetHeight ?? 0;
    const update = () => {
      const bandBottom = window.innerHeight / 2;
      const current = sections.find((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return bottom > navHeight && top < bandBottom;
      });
      setSectionInView(current?.id ?? null);
    };
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${navHeight}px 0px -50% 0px`,
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // While the menu sheet is open, everything outside the header is inert, the
  // page behind it does not scroll, and Escape closes it. Reaching the desktop
  // breakpoint closes it too, since the sheet only exists below it.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const outside = Array.from(document.body.children).filter(
      (element) => element !== headerRef.current && !element.hasAttribute("inert"),
    );
    outside.forEach((element) => element.setAttribute("inert", ""));
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const breakpoint = getComputedStyle(root).getPropertyValue("--breakpoint-md").trim();
    const desktop = window.matchMedia(`(min-width: ${breakpoint})`);
    const onBreakpointChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      outside.forEach((element) => element.removeAttribute("inert"));
      root.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 h-(--nav-height) border-b border-divider/70">
      {/* The blur lives on its own layer: a backdrop-filter on the header itself
          would become the containing block of the fixed menu sheet. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur-xl" />

      <div className="page-container flex h-full items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" onClick={closeMenu} className="inline-flex min-h-11 shrink-0 items-center justify-self-start">
          <Logo />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={link.href}
                  aria-current={activeSection === sectionId(link.href) ? "true" : undefined}
                  className="inline-flex min-h-11 items-center type-small text-text-secondary transition-colors hover:text-text aria-[current=true]:font-medium aria-[current=true]:text-brand"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Button href={nav.cta.href} size="sm" onClick={closeMenu} className="whitespace-nowrap">
            {nav.cta.label}
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={ui.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-container text-text-secondary transition-colors hover:text-text aria-expanded:text-brand md:hidden"
          >
            {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-(--nav-height) bottom-0 overflow-y-auto overscroll-contain bg-bg md:hidden"
      >
        <nav aria-label={ui.mainNav}>
          <ul className="page-container py-6">
            {nav.links.map((link) => (
              <li key={link.href} className="border-b border-divider">
                <AppLink
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={activeSection === sectionId(link.href) ? "true" : undefined}
                  className="flex py-4 type-h3 text-text-secondary transition-colors hover:text-text aria-[current=true]:text-brand"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
