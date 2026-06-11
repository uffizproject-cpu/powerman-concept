"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

const COLORS = {
  bg: "#0A0F1E",
  card: "#111827",
  border: "#1E2D4A",
  gold: "#F5A623",
  blue: "#3B82F6",
  green: "#22C55E",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
};

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function LightningIcon({ size = 20, color = "#F5A623" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
    </svg>
  );
}

function GridBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1E2D4A" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,166,35,0.07) 0%, transparent 70%)"
      }} />
    </div>
  );
}

const services = [
  { icon: "🏗️", title: "Civil & Mechanical Engineering", desc: "Roads, structures, and mechanical systems built to last in Uganda's demanding terrain." },
  { icon: "⚡", title: "Electrical & IT Services", desc: "Power infrastructure and technology solutions for businesses and institutions." },
  { icon: "🌲", title: "Timber & Pole Supply", desc: "Eucalyptus and pine poles sourced and supplied across Uganda — reliable, traceable, fast." },
  { icon: "📋", title: "Field Operations Management", desc: "End-to-end tracking of jobs, workers, and inventory — from dispatch to delivery." },
];

const partners = ["UEDCL", "Stanbic Bank", "Roofings Group", "Jinja Sawmills", "Kampala Capital City"];

const stats = [
  { value: "340+", label: "Poles in Stock" },
  { value: "14", label: "Active Field Jobs" },
  { value: "8", label: "Field Workers" },
  { value: "5+", label: "Years Operating" },
];

export default function PowerManLanding() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,15,30,0.85)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "0 24px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LightningIcon size={22} color={COLORS.gold} />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>PowerMan</span>
        </div>
        <a href="#contact" style={{
          background: COLORS.gold, color: "#0A0F1E",
          padding: "8px 18px", borderRadius: 8,
          fontWeight: 700, fontSize: 13, textDecoration: "none",
        }}>
          Request a Demo →
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "96px 24px 80px", textAlign: "center", overflow: "hidden" }}>
        <GridBg />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <FadeUp delay={0}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999, padding: "6px 16px", marginBottom: 28,
            }}>
              <LightningIcon size={13} color={COLORS.gold} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: COLORS.textSecondary }}>
                Engineering Operations · Uganda
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 style={{ fontSize: "clamp(34px, 8vw, 56px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              Engineering Operations,{" "}
              <span style={{ color: COLORS.gold }}>Simplified.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ fontSize: 17, color: COLORS.textSecondary, lineHeight: 1.65, margin: "0 auto 36px", maxWidth: 500 }}>
              From field jobs to pole inventory — one system that replaces the morning chaos and gives your team a single source of truth.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
              <a href="#dashboard" style={{
                background: COLORS.gold, color: "#0A0F1E",
                padding: "13px 26px", borderRadius: 10,
                fontWeight: 700, fontSize: 15, textDecoration: "none",
              }}>
                See the Dashboard →
              </a>
              <a href="#services" style={{
                border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary,
                padding: "13px 26px", borderRadius: 10,
                fontWeight: 600, fontSize: 15, textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
              }}>
                Learn More
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{
                textAlign: "center", padding: "20px 12px",
                borderRight: i % 2 === 0 ? `1px solid ${COLORS.border}` : "none",
                borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none",
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.gold, letterSpacing: "-0.03em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" as const, fontWeight: 600 }}>{s.label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: COLORS.gold, marginBottom: 10 }}>What We Do</p>
            <h2 style={{ fontSize: "clamp(26px, 6vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 48px" }}>
              One company. Every layer of the build.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 14, padding: "24px 20px",
                  borderLeft: `3px solid ${COLORS.gold}`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, lineHeight: 1.3 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD MOCKUP */}
      <section id="dashboard" style={{
        padding: "72px 24px",
        background: "linear-gradient(180deg, transparent 0%, rgba(245,166,35,0.04) 100%)",
        borderTop: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: COLORS.gold, marginBottom: 10 }}>Field Operations System</p>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
              Replace the chaos. One dashboard.
            </h2>
            <p style={{ fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.65, marginBottom: 40, maxWidth: 500 }}>
              Track active jobs, field workers, pole inventory, and open invoices — all in real time. No more WhatsApp groups. No more notebooks.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ background: "#0D1529", border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <LightningIcon size={15} color={COLORS.gold} />
                  <span style={{ fontWeight: 700, fontSize: 13 }}>PowerMan · Field Operations</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.green, background: "rgba(34,197,94,0.1)", padding: "3px 10px", borderRadius: 999 }}>● Live</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: COLORS.border }}>
                {[
                  { label: "Active Jobs", val: "14", color: COLORS.gold },
                  { label: "Workers on Field", val: "8", color: COLORS.blue },
                  { label: "Poles in Stock", val: "340", color: COLORS.green },
                  { label: "Open Invoices", val: "6", color: "#FB923C" },
                ].map((c, i) => (
                  <div key={i} style={{ background: COLORS.card, padding: "20px 18px", borderLeft: `3px solid ${c.color}` }}>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: c.color }}>{c.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.06em", fontWeight: 600 }}>Recent Field Jobs</div>
                {[
                  { name: "Pole delivery — Ntinda", status: "In Progress", dot: COLORS.gold },
                  { name: "Wiring — Muyenga Complex", status: "Active", dot: COLORS.green },
                  { name: "Site survey — Entebbe Rd", status: "Scheduled", dot: COLORS.blue },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
                    <span style={{ fontSize: 13 }}>{row.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: row.dot, background: `${row.dot}18`, padding: "3px 10px", borderRadius: 999 }}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: "56px 24px", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: COLORS.textSecondary, marginBottom: 28 }}>
              Trusted by Uganda&apos;s leading organisations
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center" }}>
              {partners.map((p, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 999, padding: "8px 18px", background: COLORS.card }}>
                  {p}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: "80px 24px", borderTop: `1px solid ${COLORS.border}`, background: "linear-gradient(180deg, rgba(245,166,35,0.05) 0%, transparent 100%)", textAlign: "center" }}>
        <FadeUp>
          <div style={{ maxWidth: 540, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px, 6vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Ready to simplify your operations?
            </h2>
            <p style={{ fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.65, marginBottom: 36 }}>
              Let&apos;s build the tool that gives your team one place to work from — so you spend less time chasing updates and more time closing jobs.
            </p>
            <a href="mailto:hello@powerman.ug" style={{ display: "inline-block", background: COLORS.gold, color: "#0A0F1E", padding: "14px 32px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
              Get in Touch →
            </a>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 24px", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <LightningIcon size={14} color={COLORS.gold} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>PowerMan Uganda</span>
        </div>
        <span style={{ fontSize: 12, color: COLORS.textSecondary }}>© 2026 PowerMan Uganda · Engineering Operations, Simplified</span>
        <a href="https://linkedin.com" style={{ fontSize: 12, color: COLORS.textSecondary, textDecoration: "none", fontWeight: 600 }}>LinkedIn ↗</a>
      </footer>

    </div>
  );
}