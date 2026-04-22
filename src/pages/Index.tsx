import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  LineChart,
  Menu,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type NavGroup = {
  label: string;
  items: { title: string; description: string }[];
};

type Story = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  align: "left" | "right";
  points: string[];
  metric: string;
  icon: LucideIcon;
  chartA: number[];
  chartB: number[];
};

type Benefit = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
};

const brand = "Averra";

const heroLines = [
  "Make every market signal actionable.",
  "Ship with more confidence.",
];

const navGroups: NavGroup[] = [
  {
    label: "Solutions",
    items: [
      { title: "Audience Intelligence", description: "Live demand mapping, concept scoring, and AI-guided segmentation." },
      { title: "Creative Performance", description: "Message testing with second-by-second response analysis." },
      { title: "Brand Health", description: "Continuous sentiment tracking across every growth market." },
    ],
  },
  {
    label: "Platform",
    items: [
      { title: "Insight Copilot", description: "Summaries, recommendations, and share-ready narratives in one workspace." },
      { title: "Connected Workflows", description: "Feedback loops that link ideas, campaigns, testing, and iteration." },
      { title: "Enterprise Governance", description: "Reusable knowledge, permissions, and global operating consistency." },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Customer Stories", description: "See how leading teams reduce cycle time and improve launch confidence." },
      { title: "Playbooks", description: "Frameworks for research, experimentation, and cross-functional alignment." },
      { title: "Events", description: "Live sessions on AI strategy, concept validation, and growth planning." },
    ],
  },
];

const logos = ["PepsiCo", "McDonald’s", "Vodafone", "Mars", "SoFi", "Haleon", "Pernod Ricard", "Wendy’s"];

const stats = [
  { value: "42%", label: "faster decision cycles" },
  { value: "3.1x", label: "more experiments shipped" },
  { value: "91%", label: "executive adoption" },
];

const stories: Story[] = [
  {
    eyebrow: "Signal clarity",
    title: "Move from scattered feedback to a connected intelligence system.",
    body: "Bring concept testing, campaign performance, and brand learning into one elegant operating layer so every team can see the same truth and act faster.",
    cta: "Explore connected workflows",
    align: "right",
    points: ["Unified scorecards", "Audience breakouts", "AI-written decision summaries"],
    metric: "87 launch confidence",
    icon: BrainCircuit,
    chartA: [42, 58, 64, 52, 76, 88, 84],
    chartB: [24, 28, 36, 33, 48, 56, 61],
  },
  {
    eyebrow: "Creative intelligence",
    title: "See where attention rises, stalls, and converts before media spend goes live.",
    body: "Blend qualitative reactions, emotion signals, and performance forecasting into premium creative scorecards your brand team can use immediately.",
    cta: "Review creative analytics",
    align: "left",
    points: ["Moment-by-moment feedback", "Conversion drivers", "Market-by-market comparisons"],
    metric: "+29% lift forecast",
    icon: LineChart,
    chartA: [28, 34, 52, 63, 58, 76, 82],
    chartB: [16, 24, 31, 45, 42, 51, 60],
  },
  {
    eyebrow: "Enterprise memory",
    title: "Turn every project into reusable intelligence for the next launch.",
    body: "Store winning messages, rejected concepts, and emerging demand signals in a system that keeps strategy teams aligned across markets, regions, and product lines.",
    cta: "See knowledge flows",
    align: "right",
    points: ["Insight archives", "Governed templates", "Cross-market learnings"],
    metric: "12 markets aligned",
    icon: ShieldCheck,
    chartA: [18, 30, 44, 58, 68, 73, 85],
    chartB: [12, 20, 26, 32, 40, 51, 59],
  },
];

const benefits: Benefit[] = [
  { title: "Executive-ready narratives", body: "Summaries are structured for decisions, not dashboards full of noise.", icon: Sparkles },
  { title: "Continuous validation", body: "Keep the consumer in the loop from idea framing to post-launch refinement.", icon: Workflow },
  { title: "High-signal benchmarking", body: "Compare markets, campaigns, and concepts with consistent enterprise scoring.", icon: LineChart },
  { title: "AI that guides action", body: "Get sharp next-step recommendations built directly into every workspace.", icon: BrainCircuit },
  { title: "Governance by design", body: "Permissions, templates, and evidence trails keep global teams aligned and secure.", icon: ShieldCheck },
  { title: "Human-centered collaboration", body: "Share clips, comments, and customer truths without losing the story behind the data.", icon: MessageSquareText },
];

const testimonials: Testimonial[] = [
  {
    quote: "Averra gave our insights team the credibility of a strategy function. We now walk into launch reviews with proof, not just perspective.",
    name: "Stephan Gans",
    role: "SVP Consumer Insights & Analytics",
    company: "PepsiCo",
    result: "+30% creative effectiveness",
  },
  {
    quote: "We replaced fragmented reporting with one connected view of demand, brand signal, and campaign readiness. Decision speed changed immediately.",
    name: "Amanda Addison",
    role: "Senior Manager, Menu Insights",
    company: "McDonald’s",
    result: "4 weeks saved per campaign cycle",
  },
  {
    quote: "The platform made insight feel operational. Regional teams could act locally while leadership still saw one coherent system.",
    name: "Rachel Morgan",
    role: "Global Brand Director",
    company: "Vodafone",
    result: "12 markets working from one source of truth",
  },
];

const footerGroups = [
  {
    title: "Solutions",
    links: ["Audience intelligence", "Creative analytics", "Brand tracking", "Concept validation"],
  },
  {
    title: "Platform",
    links: ["Insight Copilot", "Connected workflows", "Governance", "API & integrations"],
  },
  {
    title: "Resources",
    links: ["Customer stories", "Playbooks", "Events", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Trust center"],
  },
];

const loopSteps = [
  { title: "Test", body: "Validate concepts and messages with live audiences." },
  { title: "Learn", body: "Surface why response shifts and which signals matter." },
  { title: "Align", body: "Give teams one shared recommendation set." },
  { title: "Optimize", body: "Feed every outcome back into the next iteration." },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

const reveal = (reducedMotion: boolean, delay = 0, axis: "x" | "y" = "y", distance = 28) => ({
  initial: { opacity: 0, [axis]: reducedMotion ? 0 : distance },
  whileInView: { opacity: 1, [axis]: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : delay, ease: transitionEase },
});

const revealGroup = (reducedMotion: boolean, delayChildren = 0) => ({
  initial: reducedMotion ? "visible" : "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  transition: reducedMotion
    ? undefined
    : {
        staggerChildren: 0.12,
        delayChildren,
      },
});

const revealItem = (reducedMotion: boolean, distance = 24) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.72,
      ease: transitionEase,
    },
  },
});

const SolutionVisual = ({ story, reducedMotion }: { story: Story; reducedMotion: boolean }) => {
  const Icon = story.icon;

  return (
    <motion.div
      className="relative"
      {...reveal(reducedMotion, 0.12)}
    >
      <div className="glass-panel panel-sheen hero-grid relative overflow-hidden p-6 md:p-8">
        <div className="relative z-10 flex items-center justify-between gap-4 pb-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{story.eyebrow}</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Live workspace</h3>
          </div>
          <div className="stat-pill">
            <Icon className="h-4 w-4 text-brand" />
            <span>{story.metric}</span>
          </div>
        </div>

        <div className="relative z-10 grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[1.5rem] border border-divider/70 bg-surface p-5 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-support">Forecast</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{story.metric}</p>
              </div>
              <div className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">AI guided</div>
            </div>

            <svg viewBox="0 0 340 180" className="h-44 w-full overflow-visible">
              <defs>
                <linearGradient id={`line-a-${story.title}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--brand))" />
                  <stop offset="100%" stopColor="hsl(var(--support))" />
                </linearGradient>
              </defs>
              {Array.from({ length: 5 }).map((_, index) => (
                <line
                  key={index}
                  x1="0"
                  x2="340"
                  y1={20 + index * 35}
                  y2={20 + index * 35}
                  stroke="hsl(var(--divider))"
                  strokeWidth="1"
                />
              ))}
              <polyline
                fill="none"
                stroke={`url(#line-a-${story.title})`}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={story.chartA.map((value, index) => `${index * 56 + 2},${170 - value * 1.7}`).join(" ")}
              />
              <polyline
                fill="none"
                stroke="hsl(var(--brand) / 0.35)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={story.chartB.map((value, index) => `${index * 56 + 2},${172 - value * 2.2}`).join(" ")}
              />
              {story.chartA.map((value, index) => (
                <circle key={index} cx={index * 56 + 2} cy={170 - value * 1.7} r="5.5" fill="hsl(var(--surface))" stroke="hsl(var(--brand))" strokeWidth="3" />
              ))}
            </svg>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-divider/70 bg-surface p-5 shadow-soft">
              <p className="text-sm font-medium text-muted-foreground">Top actions</p>
              <div className="mt-4 space-y-3">
                {story.points.map((point, index) => (
                  <div key={point} className="flex items-center justify-between rounded-full bg-surface-muted px-4 py-3 text-sm text-foreground">
                    <span>{point}</span>
                    <span className="text-muted-foreground">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-divider/70 bg-surface p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Signal mix</span>
                <span className="text-sm font-semibold text-foreground">Live</span>
              </div>
              <div className="mt-4 space-y-3">
                {[78, 62, 49].map((width, index) => (
                  <div key={width} className="space-y-2">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      <span>{["Intent", "Clarity", "Recall"][index]}</span>
                      <span>{width}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${width}%`, opacity: index === 1 ? 0.75 : index === 2 ? 0.55 : 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -left-4 top-8 hidden rounded-[1.5rem] border border-divider/70 bg-surface px-4 py-3 shadow-panel md:block"
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Audience pulse</p>
        <p className="mt-1 text-lg font-semibold text-foreground">Trend improving</p>
      </motion.div>

      <motion.div
        className="absolute -bottom-5 right-6 hidden rounded-[1.5rem] border border-divider/70 bg-surface px-4 py-3 shadow-panel md:block"
        animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Next best move</p>
        <p className="mt-1 text-lg font-semibold text-foreground">Shift budget to high-intent segments</p>
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [compactHeader, setCompactHeader] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroForegroundY = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : 80]);
  const heroBackgroundY = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : -50]);

  useEffect(() => {
    const onScroll = () => {
      setCompactHeader(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const supportingTestimonials = useMemo(
    () => testimonials.filter((_, index) => index !== activeTestimonial).slice(0, 2),
    [activeTestimonial],
  );

  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 mesh-backdrop opacity-90" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-mesh"
        style={{ y: heroBackgroundY }}
      />

      <AnimatePresence>
        {!compactHeader && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: transitionEase }}
            className="sticky top-0 z-50 border-b border-divider/60 bg-announcement text-announcement-foreground"
          >
            <div className="container flex min-h-11 items-center justify-between gap-4 text-sm">
              <p className="truncate font-medium">New: launch-ready market intelligence built for faster enterprise decisions.</p>
              <a href="#final-cta" className="hidden items-center gap-2 font-semibold text-brand transition-colors hover:text-support md:inline-flex">
                Book a strategy session
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: transitionEase }}
        className="sticky top-0 z-40"
      >
        <div className="container py-4">
          <div
            className={`rounded-full border transition-all duration-500 ${
              compactHeader
                ? "border-divider/70 bg-surface/80 shadow-panel backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <div className={`flex items-center justify-between gap-4 px-4 transition-all duration-500 md:px-6 ${compactHeader ? "py-3" : "py-4"}`}>
              <a href="#hero" className="focus-ring flex items-center gap-3 rounded-full px-1 py-1">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-glow">A</span>
                <span className="text-lg font-semibold tracking-tight text-foreground">{brand}</span>
              </a>

              <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
                {navGroups.map((group) => (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(group.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button
                      type="button"
                      className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-surface hover:text-foreground"
                      aria-expanded={activeMenu === group.label}
                      onFocus={() => setActiveMenu(group.label)}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeMenu === group.label ? "rotate-180 text-brand" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {activeMenu === group.label && (
                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(12px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          transition={{ duration: reducedMotion ? 0 : 0.3, ease: transitionEase }}
                          className="absolute left-1/2 top-full z-30 mt-4 w-[34rem] -translate-x-1/2"
                        >
                          <div className="glass-panel p-4">
                            <div className="grid gap-3 md:grid-cols-3">
                              {group.items.map((item) => (
                                <button
                                  key={item.title}
                                  type="button"
                                  className="rounded-[1.25rem] border border-transparent bg-surface p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-soft"
                                >
                                  <p className="font-semibold text-foreground">{item.title}</p>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <a href="#proof" className="link-accent rounded-full px-4 py-2 text-sm">Customers</a>
                <a href="#footer" className="link-accent rounded-full px-4 py-2 text-sm">Company</a>
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <Button variant="nav" size="sm">Sign in</Button>
                <Button variant="hero" size="lg">Talk to sales</Button>
              </div>

              <Button
                variant="secondary"
                size="icon"
                className="lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.35, ease: transitionEase }}
                  className="overflow-hidden border-t border-divider/70 lg:hidden"
                >
                  <div className="space-y-5 px-5 py-5">
                    {navGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-sm font-semibold text-foreground">{group.label}</p>
                        <div className="mt-3 grid gap-2">
                          {group.items.map((item) => (
                            <a key={item.title} href="#solutions" className="rounded-[1.25rem] bg-surface px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button variant="secondary" size="lg">Sign in</Button>
                      <Button variant="hero" size="lg">Talk to sales</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <main>
        <section id="hero" className="section-shell overflow-hidden pt-8 md:pt-10">
          <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div style={{ y: heroForegroundY }} className="relative z-10 max-w-2xl">
              <motion.div {...reveal(reducedMotion)} className="section-label">
                <Sparkles className="h-4 w-4" />
                Enterprise market intelligence
              </motion.div>

              <div className="space-y-3">
                {heroLines.map((line, index) => (
                  <motion.h1
                    key={line}
                    initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : index * 0.12, ease: transitionEase }}
                    className="text-display max-w-[12ch] text-5xl text-foreground sm:text-6xl lg:text-7xl"
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.3, ease: transitionEase }}
                className="mt-8 max-w-xl text-body"
              >
                Averra helps insight, marketing, and strategy teams see what customers will do next — with AI-guided analysis, connected research workflows, and launch-ready recommendations.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.42, ease: transitionEase }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button variant="hero" size="xl">
                  Request a live demo
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" size="xl">
                  <Play className="h-4 w-4" />
                  Watch platform tour
                </Button>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.5, ease: transitionEase }}
                className="mt-12 grid gap-4 sm:grid-cols-3"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-divider/70 bg-surface/80 p-5 shadow-soft backdrop-blur-xl">
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.25, ease: transitionEase }}
              className="relative lg:pl-6"
            >
              <div className="glass-panel hero-grid panel-sheen relative overflow-hidden p-6 md:p-8">
                <div className="relative z-10 flex items-center justify-between gap-4 rounded-[1.5rem] border border-divider/70 bg-surface/90 px-4 py-4 shadow-soft">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Ask Averra</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Which audience should we prioritize for the next launch?</p>
                  </div>
                  <div className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground">AI live</div>
                </div>

                <div className="relative z-10 mt-6 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[1.75rem] border border-divider/70 bg-surface p-5 shadow-soft">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Launch confidence index</p>
                        <p className="mt-2 text-3xl font-semibold text-foreground">84 / 100</p>
                      </div>
                      <div className="stat-pill">
                        <Sparkles className="h-4 w-4 text-support" />
                        Recommended action
                      </div>
                    </div>
                    <svg viewBox="0 0 340 200" className="h-52 w-full overflow-visible">
                      <defs>
                        <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="hsl(var(--brand))" />
                          <stop offset="100%" stopColor="hsl(var(--support))" />
                        </linearGradient>
                      </defs>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <line key={index} x1="0" x2="340" y1={32 + index * 42} y2={32 + index * 42} stroke="hsl(var(--divider))" />
                      ))}
                      <polyline
                        fill="none"
                        stroke="url(#hero-line)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,166 52,132 104,142 156,98 208,112 260,76 312,52"
                      />
                      <polyline
                        fill="none"
                        stroke="hsl(var(--brand) / 0.28)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,182 52,162 104,154 156,138 208,118 260,104 312,94"
                      />
                      {[166, 132, 142, 98, 112, 76, 52].map((value, index) => (
                        <circle key={index} cx={index * 52} cy={value} r="5" fill="hsl(var(--surface))" stroke="hsl(var(--brand))" strokeWidth="3" />
                      ))}
                    </svg>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[1.75rem] border border-divider/70 bg-surface p-5 shadow-soft">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Signal mix</p>
                        <span className="text-sm font-semibold text-foreground">North America</span>
                      </div>
                      <div className="mt-5 space-y-4">
                        {["Intent", "Clarity", "Affinity"].map((item, index) => (
                          <div key={item} className="space-y-2">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                              <span>{item}</span>
                              <span>{[88, 74, 67][index]}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-surface-muted">
                              <div className="h-full rounded-full bg-brand" style={{ width: `${[88, 74, 67][index]}%`, opacity: index === 0 ? 1 : index === 1 ? 0.78 : 0.58 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-divider/70 bg-surface p-5 shadow-soft">
                      <p className="text-sm font-medium text-muted-foreground">Copilot recommendation</p>
                      <p className="mt-4 text-lg font-semibold text-foreground">Lead with value proof, then pivot to premium benefit messaging in high-intent segments.</p>
                      <a href="#solutions" className="link-accent mt-5">View the full decision narrative</a>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -left-2 top-16 hidden rounded-[1.5rem] border border-divider/70 bg-surface px-4 py-4 shadow-panel md:block"
                animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Audience shift</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Premium seekers +14%</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 right-4 hidden rounded-[1.5rem] border border-divider/70 bg-surface px-4 py-4 shadow-panel md:block"
                animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Consumer note</p>
                <p className="mt-2 text-lg font-semibold text-foreground">“Feels premium, but still practical.”</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.58, ease: transitionEase }}
            className="container mt-16"
          >
            <div className="rounded-[2rem] border border-divider/70 bg-surface/80 p-5 shadow-soft backdrop-blur-xl md:p-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Trusted by insight teams at</p>
              <div className="logo-marquee mt-6 overflow-hidden">
                <div className="flex min-w-max items-center gap-12 text-lg font-semibold text-muted-foreground animate-marquee hover:animation-paused md:gap-16">
                  {[...logos, ...logos].map((logo, index) => (
                    <span key={`${logo}-${index}`} className="transition-all duration-300 hover:scale-105 hover:text-foreground">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="solutions" className="section-shell">
          <div className="container space-y-24">
            {stories.map((story, index) => (
              <div key={story.title} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <motion.div
                  {...revealGroup(!!reducedMotion, 0.04)}
                  className={`${story.align === "left" ? "lg:order-2" : ""}`}
                >
                  <motion.span variants={revealItem(!!reducedMotion, 18)} className="section-label">{story.eyebrow}</motion.span>
                  <motion.h2 variants={revealItem(!!reducedMotion, 22)} className="text-display max-w-[12ch] text-4xl text-foreground md:text-5xl">{story.title}</motion.h2>
                  <motion.p variants={revealItem(!!reducedMotion, 24)} className="mt-6 max-w-xl text-body">{story.body}</motion.p>
                  <motion.ul variants={revealItem(!!reducedMotion, 26)} className="mt-8 space-y-3">
                    {story.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-base text-foreground">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </motion.ul>
                  <motion.div variants={revealItem(!!reducedMotion, 28)}>
                    <Button variant="secondary" size="lg" className="mt-8">
                      {story.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                <div className={`${story.align === "left" ? "lg:order-1" : ""}`}>
                  <SolutionVisual story={story} reducedMotion={!!reducedMotion} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...revealGroup(!!reducedMotion)}>
              <motion.span variants={revealItem(!!reducedMotion, 18)} className="section-label">Connected system</motion.span>
              <motion.h2 variants={revealItem(!!reducedMotion, 22)} className="text-display max-w-[12ch] text-4xl text-foreground md:text-5xl">A continuous loop that turns insight into momentum.</motion.h2>
              <motion.p variants={revealItem(!!reducedMotion, 24)} className="mt-6 max-w-xl text-body">
                Instead of isolated studies, Averra creates a feedback engine. Every experiment sharpens the next decision, every campaign teaches the next launch, and every market signal stays connected.
              </motion.p>
              <motion.div variants={revealItem(!!reducedMotion, 28)} className="mt-8 grid gap-4 sm:grid-cols-2">
                {loopSteps.map((step) => (
                  <div key={step.title} className="rounded-[1.5rem] border border-divider/70 bg-surface/90 p-5 shadow-soft">
                    <p className="text-lg font-semibold text-foreground">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div {...reveal(reducedMotion, 0.08)} className="relative flex items-center justify-center">
              <div className="relative h-[30rem] w-full max-w-[36rem] rounded-[2.5rem] border border-divider/70 bg-surface/85 shadow-panel backdrop-blur-xl">
                <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
                  <motion.path
                    d="M300,90 C415,90 510,185 510,300 C510,415 415,510 300,510 C185,510 90,415 90,300 C90,185 185,90 300,90 Z"
                    fill="none"
                    stroke="hsl(var(--divider))"
                    strokeWidth="2"
                    strokeDasharray="8 12"
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0.6 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: reducedMotion ? 0 : 1.25, ease: transitionEase }}
                  />
                  <motion.path
                    d="M300,90 C415,90 510,185 510,300 C510,415 415,510 300,510 C185,510 90,415 90,300 C90,185 185,90 300,90 Z"
                    fill="none"
                    stroke="url(#loop-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 0.82 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: reducedMotion ? 0 : 1.8, delay: reducedMotion ? 0 : 0.15, ease: transitionEase }}
                  />
                  <defs>
                    <linearGradient id="loop-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--brand))" />
                      <stop offset="100%" stopColor="hsl(var(--support))" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-brand text-brand-foreground shadow-glow"
                    animate={reducedMotion ? undefined : { scale: [1, 1.03, 1] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-sm uppercase tracking-[0.2em] text-brand-foreground/80">Core loop</span>
                    <span className="mt-3 max-w-[8ch] text-center text-3xl font-semibold leading-tight">Better decisions, continuously</span>
                  </motion.div>
                </div>

                {[
                  { className: "left-1/2 top-10 -translate-x-1/2", title: "Test" },
                  { className: "right-10 top-1/2 -translate-y-1/2", title: "Learn" },
                  { className: "bottom-10 left-1/2 -translate-x-1/2", title: "Optimize" },
                  { className: "left-10 top-1/2 -translate-y-1/2", title: "Align" },
                ].map((node, index) => (
                  <motion.div
                    key={node.title}
                    className={`absolute ${node.className} flex h-28 w-28 items-center justify-center rounded-full border border-divider/70 bg-surface text-center text-sm font-semibold text-foreground shadow-soft`}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.22 + index * 0.12, ease: transitionEase }}
                  >
                    {node.title}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <motion.div {...revealGroup(!!reducedMotion)} className="max-w-2xl">
              <motion.span variants={revealItem(!!reducedMotion, 18)} className="section-label">Why teams choose Averra</motion.span>
              <motion.h2 variants={revealItem(!!reducedMotion, 22)} className="text-display text-4xl text-foreground md:text-5xl">A platform designed for enterprise confidence, not dashboard fatigue.</motion.h2>
              <motion.p variants={revealItem(!!reducedMotion, 24)} className="mt-6 text-body">Every interaction is built to feel strategic, quick, and premium — from first signal to final recommendation.</motion.p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    {...reveal(reducedMotion, index * 0.06)}
                    className="group rounded-[1.75rem] border border-divider/70 bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-panel"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">{benefit.body}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="proof" className="section-shell">
          <div className="container grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.div {...revealGroup(!!reducedMotion)} className="rounded-[2rem] border border-divider/70 bg-surface p-8 shadow-panel md:p-10">
              <motion.span variants={revealItem(!!reducedMotion, 18)} className="section-label">Customer proof</motion.span>
              <div className="relative min-h-[22rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonials[activeTestimonial].quote}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: transitionEase }}
                    className="absolute inset-0"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <p className="max-w-3xl text-3xl font-semibold leading-tight text-foreground md:text-4xl">“{testimonials[activeTestimonial].quote}”</p>
                        <div className="mt-8 flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground text-lg font-semibold shadow-glow">
                            {testimonials[activeTestimonial].name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-foreground">{testimonials[activeTestimonial].name}</p>
                            <p className="text-sm leading-6 text-muted-foreground">{testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].company}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <div className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">
                          {testimonials[activeTestimonial].result}
                        </div>
                        <div className="stat-pill">
                          <Star className="h-4 w-4 text-support" />
                          Trusted by enterprise strategy teams
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {supportingTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.quote}
                  {...reveal(reducedMotion, index * 0.08)}
                  className="rounded-[1.75rem] border border-divider/70 bg-surface p-6 shadow-soft"
                >
                  <p className="text-xl font-semibold leading-tight text-foreground">“{testimonial.quote}”</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{testimonial.company}</p>
                    </div>
                    <div className="rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-foreground">{testimonial.result}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="final-cta" className="section-shell pb-24">
          <div className="container">
            <motion.div
              {...revealGroup(!!reducedMotion)}
              className="relative overflow-hidden rounded-[2.5rem] border border-divider/70 bg-cta px-8 py-12 shadow-panel md:px-14 md:py-16"
            >
              <div className="absolute inset-0 opacity-70" />
              <div className="relative z-10 max-w-3xl">
                <motion.span variants={revealItem(!!reducedMotion, 18)} className="section-label">Ready when your team is</motion.span>
                <motion.h2 variants={revealItem(!!reducedMotion, 22)} className="text-display text-4xl text-foreground md:text-6xl">Build a sharper growth engine around what customers actually signal.</motion.h2>
                <motion.p variants={revealItem(!!reducedMotion, 24)} className="mt-6 max-w-2xl text-body">
                  Replace fragmented reporting with a premium system for testing, learning, and action. Your next board-ready insight can start with one conversation.
                </motion.p>
                <motion.div variants={revealItem(!!reducedMotion, 28)} className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button variant="hero" size="xl">
                    Book your strategy demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="xl">See the platform tour</Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer id="footer" className="border-t border-divider/70 bg-surface/80 pb-12 pt-16 backdrop-blur-xl">
        <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div {...reveal(reducedMotion)}>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-glow">A</span>
              <span className="text-xl font-semibold text-foreground">{brand}</span>
            </div>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
              Premium market intelligence for enterprise teams that want faster alignment, clearer decisions, and stronger launches.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-muted-foreground">
              <span className="rounded-full border border-divider/70 px-4 py-2">LinkedIn</span>
              <span className="rounded-full border border-divider/70 px-4 py-2">X</span>
              <span className="rounded-full border border-divider/70 px-4 py-2">YouTube</span>
            </div>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group, index) => (
              <motion.div key={group.title} {...reveal(reducedMotion, index * 0.05)}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="link-accent text-sm text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="container mt-14 flex flex-col gap-4 border-t border-divider/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-5">
            <a href="#" className="link-accent text-sm">Privacy</a>
            <a href="#" className="link-accent text-sm">Terms</a>
            <a href="#" className="link-accent text-sm">Security</a>
          </div>
          <p>© 2026 {brand}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
