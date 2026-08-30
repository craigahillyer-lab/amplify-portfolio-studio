import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Wrench, Zap, Mail, Linkedin, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import p4 from "@/assets/project-4.jpg";
import wireframe from "@/assets/wireframe-submersible.png.asset.json";
import headshot from "@/assets/headshot.png.asset.json";
import sub1 from "@/assets/sub-1.png.asset.json";
import subCover from "@/assets/submersible-labeled-cover.png.asset.json";
import sub2 from "@/assets/sub-2.png.asset.json";
import sub3 from "@/assets/sub-3.png.asset.json";
import sub4 from "@/assets/sub-4.png.asset.json";
import sub5 from "@/assets/sub-5.png.asset.json";
import sub6 from "@/assets/sub-6.png.asset.json";
import sub7 from "@/assets/sub-7.png.asset.json";
import sub8 from "@/assets/sub-8.png.asset.json";
import sub9 from "@/assets/sub-9.png.asset.json";
import activeCover from "@/assets/active-controls-cover.png.asset.json";
import activeVideo from "@/assets/active-controls-video.mp4.asset.json";
import macroPcb from "@/assets/macro-pcb.png.asset.json";
import macroAssembled from "@/assets/macro-assembled.png.asset.json";
import gooseCover from "@/assets/goose-cover.png.asset.json";
import gooseSide from "@/assets/goose-side.png.asset.json";
import gooseLift from "@/assets/goose-lift.png.asset.json";
import gooseArm from "@/assets/goose-arm.png.asset.json";
import gooseIntake from "@/assets/goose-intake.png.asset.json";
import gooseCam from "@/assets/goose-cam.gif.asset.json";



const subGallery = [
  { url: subCover.url, caption: "Full system layout: electronics, pitch and buoyancy modules" },
  { url: sub9.url, caption: "Assembled multimodal robot — wings deployed" },
  { url: sub2.url, caption: "Full system layout: electronics, pitch and buoyancy modules" },
  { url: sub1.url, caption: "MARS Lab team at pool testing" },
  { url: sub7.url, caption: "Thruster and rudder system" },
  { url: sub3.url, caption: "Thruster assembly with protective shroud" },
  { url: sub5.url, caption: "Buoyancy control module with peristaltic pump and bladder" },
  { url: sub6.url, caption: "Pitch control module — ball screw actuator and moving mass" },
  { url: sub4.url, caption: "Glider pitch dynamics free-body diagram" },
  { url: sub8.url, caption: "Foldable wing linkage kinematics" },
];

const macroGallery = [
  { url: macroAssembled.url, caption: "Assembled macro pad with Raspberry Pi Pico and custom PCB" },
  { url: macroPcb.url, caption: "KiCad PCB layout — switch matrix and Pico pinout" },
];

const gooseGallery = [
  { url: gooseCover.url, caption: "Full robot CAD render — drivetrain, lift and scoring mechanisms" },
  { url: gooseSide.url, caption: "Side profile — team 8902 chassis layout" },
  { url: gooseLift.url, caption: "Vertical lift assembly with linear slides and control hub mount" },
  { url: gooseArm.url, caption: "Scoring arm and intake subassembly" },
  { url: gooseIntake.url, caption: "Intake mechanism with motor-driven linkage" },
  { url: gooseCam.url, caption: "CAM toolpaths for machined side plates" },
];


function Slideshow({ images }: { images: { url: string; caption: string }[] }) {
  const [i, setI] = useState(0);
  const current = images[i];
  const go = (d: number) => setI((prev) => (prev + d + images.length) % images.length);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
          Gallery
        </div>
        <div className="font-mono-display text-xs text-muted-foreground">
          {i + 1} / {images.length}
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-background/60">
        <img
          key={current.url}
          src={current.url}
          alt={current.caption}
          className="h-[300px] w-full bg-white object-contain md:h-[460px]"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {current.caption}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {images.map((g, idx) => (
            <button
              key={g.url}
              onClick={() => setI(idx)}
              aria-label={`Show image ${idx + 1}`}
              className={`h-14 w-20 overflow-hidden rounded-lg border transition-colors ${
                idx === i ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={g.url} alt={g.caption} loading="lazy" className="h-full w-full bg-white object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CardGallery({
  images,
  title,
}: {
  images: { url: string; caption: string }[];
  title: string;
}) {
  const [i, setI] = useState(0);
  const go = (e: React.MouseEvent, d: number) => {
    e.stopPropagation();
    setI((prev) => (prev + d + images.length) % images.length);
  };

  return (
    <>
      <img
        src={images[i].url}
        alt={`${title} — ${images[i].caption}`}
        loading="lazy"
        className="h-full w-full bg-white object-contain transition-transform duration-700"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => go(e, -1)}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => go(e, 1)}
            aria-label="Next image"
            className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/70 px-2.5 py-1.5 backdrop-blur">
            {images.map((g, idx) => (
              <span
                key={g.url}
                className={`h-1.5 w-1.5 rounded-full ${idx === i ? "bg-primary" : "bg-muted-foreground/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    n: "01",
    title: "Multimodal Underwater Robot",
    tag: "MARS Research Lab · Purdue · ASME IDETC/CIE 2026",
    desc: "Design and Development of a Multimodal Underwater Robot: an all-In-one Drifter, Glider, and Thruster. Redesigned the internal frame and modules for improved strength and modularity.",
    img: subCover.url,
    links: [
      { label: "Lab site", url: "https://www.purduemars.com/" },
      { label: "Build video", url: "https://www.youtube.com/watch?v=cd5N3-Pw6c0" },
    ],
    gallery: subGallery,
  },
  {
    n: "02",
    title: "SharpCut Vacuum Box",
    tag: "R&D Intern · Colex Finishing Solutions",
    desc: "Designed a sheet-metal vacuum plenum box for the SharpCut flatbed cutting table, improving hold-down airflow distribution and simplifying assembly for production.",
    compact: true,
  },
  {
    n: "03",
    title: "SharpCut Tool Head",
    tag: "R&D Intern · Colex Finishing Solutions",
    desc: "Designed and prototyped next-generation cutting machine tool head components, validated via 3D printing and low-cost machining.",
    compact: true,
  },
  {
    n: "04",
    title: "Bechtel Center Training",
    tag: "Purdue · Manufacturing Training",
    desc: "Completed hands-on manufacturing training at Purdue's Bechtel Innovation Design Center — manual mill and lathe, CNC machining, welding and additive manufacturing certifications used to fabricate project parts.",
    img: p4,
  },
  {
    n: "05",
    title: "Active Controls Rocketry",
    tag: "Purdue Space Program",
    desc: "Designed and executed 3-axis and 5-axis CNC toolpaths for high-tolerance rocketry components used on the active controls airframe.",
    img: activeCover.url,
    videoUrl: activeVideo.url,
    links: [{ label: "PSP site", url: "https://purdueseds.space/active-controls/" }],
  },
  {
    n: "06",
    title: "Cosmic Goose — FTC Competition Robot",
    tag: "Mechanical Lead · High School FTC",
    desc: "Led mechanical design and fabrication of Cosmic Goose, our FTC competition robot — drivetrain, intake and scoring mechanisms designed in CAD, then machined, 3D printed and iterated between matches.",
    img: gooseCover.url,
    gallery: gooseGallery,
    links: [{ label: "Team Instagram", url: "https://www.instagram.com/cosmicgoose8902/" }],
  },
  {
    n: "07",
    title: "CAD Macro Pad",
    tag: "Personal Project · PCB + Firmware",
    desc: "Custom low-cost macro pad for engineers. Designed a programmable PCB in KiCad and wrote Python firmware that works across SolidWorks, NX, Fusion 360 and Onshape.",
    img: macroAssembled.url,
    gallery: macroGallery,
  },
];

const experience = [
  {
    role: "Undergraduate Researcher",
    org: "MARS Research Lab — Purdue University",
    date: "Oct 2025 – Present",
    bullets: [
      "Redesigned submersible internal frame and modules for strength and modularity",
      "Machined custom frame components for integrated water flow and wire management",
      "Developed testing protocols and comprehensive documentation for a research paper",
      "Exploring imitation learning to enhance autonomous control",
    ],
  },
  {
    role: "Research & Development Intern",
    org: "Colex Finishing Solutions — Oakland, NJ",
    date: "Jun 2025 – Aug 2025",
    bullets: [
      "Designed and prototyped tool and tool-interface components for the next-gen SharpCut tool head",
      "Conducted product development research to evaluate concepts and prove manufacturing feasibility",
      "Collaborated with senior engineers to model complex parts and full machine assemblies",
      "Used 3D printing and low-cost machining to test and validate prototypes",
      "Designed a custom LED circuit board integrated into the new machine",
      "Ran CNC machines to assist in production",
    ],
  },
  {
    role: "Active Controls — Purdue Space Program",
    org: "Purdue University",
    date: "Aug 2025 – Present",
    bullets: [
      "Designed and executed 3-axis and 5-axis CNC toolpaths for high-tolerance rocketry components",
    ],
  },
  {
    role: "Gate Guard",
    org: "Glen Rock Municipal Pool — Glen Rock, NJ",
    date: "Summer 2022 – 2024",
    bullets: [
      "Assisted with equipment maintenance and repair, including pool filtration system support",
      "Scanned memberships and provided customer service to keep daily operations running smoothly",
    ],
  },
  {
    role: "Robotics Team Captain",
    org: "Glen Rock High School",
    date: "2021 – 2025",
    bullets: [
      "Led mechanical design and manufacturing of competition robots",
      "Created CNC toolpaths, oversaw fabrication, and guided members in CAD and prototyping",
      "Managed a $10,000+ yearly operating budget for the team",
      "Ran a summer CAD camp to teach younger members the basics of CAD",
    ],
  },
  {
    role: "Technical Theater Manager",
    org: "Glen Rock High School",
    date: "2021 – 2025",
    bullets: [
      "Designed, rigged and programmed lighting and sound systems for multiple productions",
      "Managed production crews and technical equipment for high school and middle school shows",
    ],
  },
];

function Index() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.n === expanded);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

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
            <a href="#work" className="transition-colors hover:text-foreground">Projects</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
            <a href="#videos" className="transition-colors hover:text-foreground">Videos</a>
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
        <img
          src={wireframe.url}
          alt="Submersible robot wireframe"
          className="pointer-events-none absolute top-1/2 left-[58%] h-auto w-[150%] max-w-7xl -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-luminosity md:w-[130%]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Portfolio · 2026
          </div>
          <div className="mt-6 flex items-center gap-4 md:gap-6">
            <h1 className="max-w-5xl text-6xl font-normal leading-[0.95] md:text-7xl lg:text-8xl">
              Craig Hillyer
            </h1>
            <img
              src={headshot.url}
              alt="Craig Hillyer"
              className="hidden h-20 w-16 rounded-2xl border border-border object-cover shadow-lg md:block lg:h-28 lg:w-22"
            />
          </div>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            I&apos;m <span className="text-foreground">Craig Hillyer</span> — a sophomore in
            Mechanical Engineering at Purdue University with hands-on skills in CAD, CNC, PCB design and
            firmware.
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
              href="#videos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Watch videos
            </a>
          </div>

          {/* Specs strip */}
          <div className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-8 font-mono-display text-xs uppercase tracking-wider text-muted-foreground md:grid-cols-2">
            {[
              ["3.80", "Purdue GPA · Dean's List"],
              ["Spring 2029", "Expected graduation"],
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
                / 01 — Projects
              </div>
              <h2 className="mt-4 text-5xl font-normal md:text-6xl">Projects</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
              Mechanical, electrical and firmware projects from research, internships and personal
              builds.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {(() => {
              const items: React.ReactNode[] = [];
              for (let i = 0; i < projects.length; i++) {
                const p = projects[i];
                const card = (
                  <article
                    key={p.n}
                    onClick={() => setExpanded(p.n)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-secondary/30 transition-all hover:border-primary/50 hover:shadow-glow ${p.compact ? "flex flex-1 flex-col justify-center" : ""}`}
                  >
                    {(p.gallery || p.img) && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {p.gallery ? (
                          <CardGallery images={p.gallery} title={p.title} />
                        ) : (
                          <img
                            src={p.img}
                            alt={p.title}
                            loading="lazy"
                            width={1280}
                            height={960}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-4 p-6">
                      <div>
                        <div className="font-mono-display text-xs text-muted-foreground">
                          {p.n} · {p.tag}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </article>
                );
                if (p.compact && i + 1 < projects.length && projects[i + 1].compact) {
                  items.push(
                    <div key="colex-group" className="flex flex-col gap-6">
                      {card}
                      {(() => {
                        const next = projects[i + 1];
                        return (
                          <article
                            key={next.n}
                            onClick={() => setExpanded(next.n)}
                            className="group relative flex flex-1 cursor-pointer flex-col justify-center overflow-hidden rounded-2xl border border-border bg-secondary/30 transition-all hover:border-primary/50 hover:shadow-glow"
                          >
                            <div className="flex items-start justify-between gap-4 p-6">
                              <div>
                                <div className="font-mono-display text-xs text-muted-foreground">
                                  {next.n} · {next.tag}
                                </div>
                                <h3 className="mt-2 text-xl font-semibold">{next.title}</h3>
                              </div>
                              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </div>
                          </article>
                        );
                      })()}
                    </div>
                  );
                  i++;
                } else {
                  items.push(card);
                }
              }
              return items;
            })()}
          </div>

          {selectedProject && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
              onClick={() => setExpanded(null)}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-border bg-secondary/50 p-6 shadow-2xl md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-background"
                  aria-label="Close project details"
                >
                  <X className="h-5 w-5" />
                </button>
                {selectedProject.gallery ? (
                  <Slideshow key={selectedProject.n} images={selectedProject.gallery} />
                ) : selectedProject.videoUrl ? (
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                    <video
                      src={selectedProject.videoUrl}
                      controls
                      autoPlay
                      muted
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : selectedProject.img ? (
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                    <img
                      src={selectedProject.img}
                      alt={selectedProject.title}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="mt-6">
                  <div className="font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
                    {selectedProject.n} · {selectedProject.tag}
                  </div>
                  <h3 className="mt-2 text-4xl font-normal md:text-5xl">{selectedProject.title}</h3>
                  <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{selectedProject.desc}</p>
                  {selectedProject.links && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {selectedProject.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          {l.label} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
                      Mechanical Engineering · West Lafayette, IN
                    </div>
                    <div className="mt-1 font-mono-display text-xs text-muted-foreground">
                      Expected Graduation: Spring 2029
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
              <h2 className="mt-4 text-5xl font-normal md:text-6xl">About me</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Hello, my name is Craig. I use CAD, CAM and a range of technologies to build
                prototypes and products from concept to finished part.
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
          <h2 className="mt-4 text-5xl font-normal md:text-6xl">Experience</h2>

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

      {/* VIDEOS */}
      <section id="videos" className="relative py-24">
        <div className="absolute inset-0 grid-paper-strong grid-fade-mask opacity-70" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="font-mono-display text-xs uppercase tracking-[0.3em] text-primary">
            / 04 — Videos
          </div>
          <h2 className="mt-4 text-5xl font-normal md:text-6xl">Videos</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Project build videos and demos.
          </p>

          <div className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-glow">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/cd5N3-Pw6c0"
                  title="Multimodal underwater robot build"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between p-4 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
                <span>Multimodal underwater robot build</span>
                <span>HD · 1080p</span>
              </div>
            </div>
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
          <h2 className="mt-4 text-5xl font-normal md:text-6xl">
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
              href="https://linkedin.com/in/craig-hillyer/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  "https://linkedin.com/in/craig-hillyer/",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              aria-label="Open Craig Hillyer's LinkedIn profile"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" /> craig-hillyer
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 font-mono-display text-xs uppercase tracking-wider text-muted-foreground">
          <span>© 2026 Craig Hillyer</span>
        </div>
      </footer>
    </div>
  );
}
