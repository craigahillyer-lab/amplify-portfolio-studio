import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Wrench, Zap, Mail, Github, Linkedin } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    n: "01",
    title: "Titanium Aerospace Bracket",
    tag: "Mechanical / CNC",
    desc: "Topology-optimized 5-axis CNC bracket, 42% mass reduction while exceeding load spec.",
    img: p1,
  },
  {
    n: "02",
    title: "6-DOF Manipulator Arm",
    tag: "Robotics / Control",
    desc: "Custom inverse kinematics and ROS2 stack for a sub-millimeter accurate pick-and-place arm.",
    img: p2,
  },
  {
    n: "03",
    title: "DEX Flight Controller",
    tag: "Embedded / PCB",
    desc: "4-layer STM32 board with onboard IMU, barometer and TVS-protected ESC outputs.",
    img: p3,
  },
  {
    n: "04",
    title: "Carbon Cinewhoop Frame",
    tag: "Composites / CAD",
    desc: "Twill carbon plate frame designed for dampened HD camera capture under 250g.",
    img: p4,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-mono-display text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-glow" />
            <span className="tracking-wider">MERCER/ENG</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#reel" className="transition-colors hover:text-foreground">Reel</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Hire me <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 grid-paper-strong grid-fade-mask" />
        <div
          className="absolute inset-x-0 top-0 h-[600px]"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Portfolio · 2026
          </div>
          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            Engineering
            <span className="text-gradient-primary"> systems </span>
            that move,
            <br />
            sense and think.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            I&apos;m <span className="text-foreground">Alex Mercer</span> — a mechatronics
            engineer building robotics, aerospace and embedded products from first principles
            to shipped hardware.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              View selected work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#reel"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Watch the reel
            </a>
          </div>

          {/* Specs strip */}
          <div className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-8 font-mono-display text-xs uppercase tracking-wider text-muted-foreground md:grid-cols-4">
            {[
              ["07+", "Years shipping"],
              ["32", "Projects delivered"],
              ["12", "Patents & papers"],
              ["BSc · MEng", "Mechanical"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="font-mono-display text-2xl font-medium text-foreground">{k}</div>
                <div className="mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative py-24">
        <div className="absolute inset-0 grid-paper opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
                / 01 — Selected work
              </div>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">Recent builds</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
              A cross-section of mechanical, electrical and firmware projects from the last
              two years.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.n}
                className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/30 transition-all hover:border-primary/50 hover:shadow-glow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <div className="font-mono-display text-xs text-muted-foreground">
                      {p.n} · {p.tag}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={portrait}
                  alt="Alex Mercer in the workshop"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
                / 02 — About
              </div>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Hardware-first.
                <br />
                Software-fluent.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                I work across the stack — from FEA and tolerance stacks, through PCB layout
                and DFM, to the firmware and control loops that bring a product alive. The
                best things I&apos;ve built had every layer designed in concert.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Wrench, label: "Mechanical", body: "SolidWorks, Fusion, FEA, GD&T, CNC, composites" },
                  { icon: Zap, label: "Electrical", body: "Altium, KiCad, STM32, power, signal integrity" },
                  { icon: Cpu, label: "Firmware", body: "C/C++, Rust, ROS2, RTOS, motion control" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-secondary/30 p-5"
                  >
                    <s.icon className="h-5 w-5 text-primary" />
                    <div className="mt-4 font-semibold">{s.label}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REEL */}
      <section id="reel" className="relative py-24">
        <div className="absolute inset-0 grid-paper-strong grid-fade-mask opacity-70" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
            / 03 — In motion
          </div>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Build reel</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Bench tests, first power-ons and field runs from the last twelve months.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { id: "aqz7Mw-bUgQ", title: "Arm calibration · 6-DOF" },
              { id: "LXb3EKWsInQ", title: "Field test · cinewhoop" },
            ].map((v) => (
              <div
                key={v.id}
                className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-glow"
              >
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between p-4 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
                  <span>{v.title}</span>
                  <span>HD · 1080p</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-32">
        <div className="absolute inset-0 grid-paper opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
            / 04 — Contact
          </div>
          <h2 className="mt-4 text-5xl font-bold md:text-7xl">
            Got something
            <br />
            <span className="text-gradient-primary">worth building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Available for full-time roles and selected consulting in robotics, aerospace and
            consumer hardware.
          </p>
          <a
            href="mailto:alex@mercer.eng"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Mail className="h-4 w-4" /> alex@mercer.eng
          </a>
          <div className="mt-10 flex justify-center gap-6 text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground"><Github className="h-5 w-5" /></a>
            <a href="#" className="transition-colors hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
          <span>© 2026 Alex Mercer</span>
          <span>Built & hosted on AWS Amplify</span>
        </div>
      </footer>
    </div>
  );
}
