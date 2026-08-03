import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Wrench, Zap, Mail, Linkedin, MapPin } from "lucide-react";
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
    title: "Multimodal Underwater Robot",
    tag: "MARS Research Lab · Purdue · ASME IDETC/CIE 2026",
    desc: "Design and Development of a Multimodal Underwater Robot: an all-In-one Drifter, Glider, and Thruster. Redesigned the internal frame and modules for improved strength and modularity.",
    img: p1,
    links: [
      { label: "Lab site", url: "https://www.purduemars.com/" },
      { label: "Build video", url: "https://www.youtube.com/watch?v=cd5N3-Pw6c0" },
    ],
  },
  {
    n: "02",
    title: "SharpCut Tool Head",
    tag: "R&D Intern · Colex Finishing Solutions",
    desc: "Designed and prototyped next-generation cutting machine tool head components, validated via 3D printing and low-cost machining.",
    img: p2,
  },
  {
    n: "03",
    title: "CAD Macro Pad",
    tag: "Personal Project · PCB + Firmware",
    desc: "Custom low-cost macro pad for engineers. Designed a programmable PCB in KiCad and wrote Python firmware that works across SolidWorks, NX, Fusion 360 and Onshape.",
    img: p3,
  },
  {
    n: "04",
    title: "Active Controls Rocketry",
    tag: "Purdue Space Program",
    desc: "Designed and executed 3-axis and 5-axis CNC toolpaths for high-tolerance rocketry components used on the active controls airframe.",
    img: p4,
  },
];

const experience = [
  {
    role: "Undergraduate Researcher",
    org: "MARS Research Lab — Purdue University",
    date: "Oct 2025 – Present",
    bullets: [
      "Redesigned submersible internal frame for strength and modularity",
      "Machined custom components for water flow and wire management",
      "Authored testing protocols and documentation for a research paper",
      "Exploring imitation learning for autonomous control integration",
    ],
  },
  {
    role: "R&D Intern",
    org: "Colex Finishing Solutions — Elmwood Park, NJ",
    date: "Jun 2025 – Aug 2025",
    bullets: [
      "Designed components for the next-gen SharpCut tool head (~10k units)",
      "Modeled complex parts and assemblies alongside senior engineers",
      "Designed a custom LED PCB integrated into the new machine",
      "Operated CNC machines to assist production",
    ],
  },
  {
    role: "Robotics Team Captain",
    org: "Glen Rock High School",
    date: "2021 – 2025",
    bullets: [
      "Led mechanical design and manufacturing of competition robots",
      "Created CNC toolpaths and guided members in CAD and prototyping",
      "Managed a $10,000+ annual budget for the team",
      "Ran a summer CAD camp for younger members",
    ],
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
            <span className="tracking-wider">HILLYER/ENG</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
            <a href="#reel" className="transition-colors hover:text-foreground">Reel</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <a
            href="mailto:chillyer@purdue.edu"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
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
            Mechanical
            <span className="text-gradient-primary"> engineering </span>
            student building
            <br />
            robots, hardware, and systems.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            I&apos;m <span className="text-foreground">Craig Hillyer</span> — a Purdue first-year
            engineer working across CAD, CNC, PCB design and firmware.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              View work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#reel"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Watch reel
            </a>
          </div>

          {/* Specs strip */}
          <div className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-8 font-mono-display text-xs uppercase tracking-wider text-muted-foreground md:grid-cols-2">
            {[
              ["3.80", "Purdue GPA · Dean's List"],
              ["2029", "Expected graduation"],
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
                / 01 — Work
              </div>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">Projects</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
              Mechanical, electrical and firmware projects from research, internships and personal
              builds.
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
                    {p.links && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {p.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            {l.label} <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
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
              <div className="rounded-2xl border border-border bg-secondary/30 p-8">
                <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
                  Education
                </div>
                <div className="mt-4 space-y-6">
                  <div>
                    <div className="font-semibold">Purdue University</div>
                    <div className="text-sm text-muted-foreground">
                      First-Year Engineering Program · West Lafayette, IN
                    </div>
                    <div className="mt-1 font-mono-display text-xs text-muted-foreground">
                      Intended Major: Mechanical Engineering · Expected 2029
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono-display text-xs text-primary">
                      Dean&apos;s List · 3.80 GPA
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <div className="font-semibold">Glen Rock High School</div>
                    <div className="text-sm text-muted-foreground">Glen Rock, NJ · 2021 – 2025</div>
                    <div className="mt-1 font-mono-display text-xs text-muted-foreground">
                      High Honor Roll · 4.428 GPA
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
                / 02 — About
              </div>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">About me</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                I work across CAD, PCB design, DFM and firmware — from model to machined part to
                working prototype.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Wrench,
                    label: "CAD & CAM",
                    body: "SolidWorks, Siemens NX, Fusion 360, Inventor, Onshape, Teamcenter",
                  },
                  {
                    icon: Zap,
                    label: "Fabrication",
                    body: "CNC machining, FDM & LFS 3D printing, laser & vinyl cutting, soldering",
                  },
                  {
                    icon: Cpu,
                    label: "Electronics",
                    body: "KiCad PCB design, microcontrollers, Python firmware",
                  },
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

      {/* EXPERIENCE */}
      <section id="experience" className="relative py-24">
        <div className="absolute inset-0 grid-paper opacity-60" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
            / 03 — Experience
          </div>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Experience</h2>

          <div className="mt-14 space-y-4">
            {experience.map((e) => (
              <div
                key={e.role + e.org}
                className="grid gap-4 rounded-2xl border border-border bg-secondary/30 p-6 transition-colors hover:border-primary/40 md:grid-cols-[200px_1fr]"
              >
                <div className="font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
                  {e.date}
                </div>
                <div>
                  <div className="text-xl font-semibold">{e.role}</div>
                  <div className="text-sm text-primary">{e.org}</div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REEL */}
      <section id="reel" className="relative py-24">
        <div className="absolute inset-0 grid-paper-strong grid-fade-mask opacity-70" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
            / 04 — Reel
          </div>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Reel</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Shop work, prototyping, and CNC runs.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { id: "aqz7Mw-bUgQ", title: "CNC toolpath · 5-axis" },
              { id: "LXb3EKWsInQ", title: "Robotics build · season recap" },
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
            / 05 — Contact
          </div>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            I&apos;d love to <span className="text-gradient-primary">connect</span> — reach out below.
          </h2>
          <a
            href="mailto:chillyer@purdue.edu"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Mail className="h-4 w-4" /> chillyer@purdue.edu
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Glen Rock, NJ</span>
            <span>(551) 221-4541</span>
            <a
              href="https://linkedin.com/in/craig-hillyer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" /> craig-hillyer
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
          <span>© 2026 Craig Hillyer</span>
          <span>Built & hosted on AWS Amplify</span>
        </div>
      </footer>
    </div>
  );
}
