import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { UnityDropBanner } from "./unity-drop-banner";
import journalLibrary from "@/assets/journal-library.jpg";
import journalHero from "@/assets/journal-hero.jpg";
import journalStillife from "@/assets/journal-stillife.jpg";
import journalFeatured from "@/assets/journal-featured.jpg";
import journalRitual from "@/assets/journal-ritual.png";
import journalMorning from "@/assets/journal-morning.jpg";
import journalCafe from "@/assets/journal-cafe.jpg";
import journalTrain from "@/assets/journal-train.jpg";
import ritualMorning from "@/assets/ritual-morning.png";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — thoughts for calmer modern living | VYTAL" },
      { name: "description", content: "An editorial journal on focus, nervous-system recovery, ritual design and a calmer alternative to modern productivity culture." },
      { property: "og:title", content: "VYTAL Journal — thoughts for calmer modern living" },
      { property: "og:description", content: "Reflections on focus, energy, attention and calmer routines. A quiet space inside an overstimulated internet." },
      { property: "og:image", content: journalHero },
      { name: "twitter:image", content: journalHero },
    ],
  }),
  component: JournalPage,
});
<UnityDropBanner />
const categories = [
  "Focus",
  "Rituals",
  "Recovery",
  "Digital Overload",
  "Modern Work",
  "Nervous System",
  "Sustainable Energy",
] as const;

type Article = {
  id: string;
  title: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

const journalArticles: Article[] = [
  {
    id: "attention-span",
    title: "Your attention span isn't broken.",
    readTime: "9 min read",
    category: "Focus",
    date: "May 2026",
    image: journalFeatured,
    excerpt:
      "The way modern life is designed — endless inputs, endless tabs, endless small emergencies — was never something a nervous system was supposed to hold.",
    content: [
      "The modern digital landscape is an environment our nervous systems were never evolved to sustain. Every notification, infinite scroll feed, algorithmic recommendation and blinking red badge competes for the same limited cognitive bandwidth.",

      "Yet modern culture keeps framing distraction as a personal moral failure. We are told that if we cannot focus, we simply lack discipline. That our inability to concentrate is proof that we are lazy, unmotivated or mentally weak.",

      "But research on attention suggests something far more complex. Cognitive scientists have repeatedly shown that constant interruptions, digital task-switching and continuous notifications increase mental fatigue and reduce sustained concentration over time.",

      "The brain is not designed to context-switch endlessly between tabs, messages, emails and algorithms competing for urgency. Every interruption carries a small cognitive cost. Individually these moments feel insignificant. Collectively they create exhaustion.",

      "Your attention span is not broken. It is reacting exactly the way a human nervous system would react inside an environment built around interruption.",

      "Most people no longer move through the day intentionally. They wake up and immediately absorb inputs. Notifications. Emails. Timelines. Messages. News. Deadlines. Tabs left open from yesterday. The nervous system never fully settles because it is constantly preparing to respond to the next demand.",

      "Over time, this creates a state of permanent partial attention — where the body never fully rests, yet the mind never fully focuses either. You are technically available at all times, but mentally present almost nowhere.",

      "That is why modern exhaustion feels psychologically different from normal tiredness. It is not only physical fatigue. It is cognitive overload. Emotional fragmentation. The quiet stress of never feeling mentally finished.",

      "Modern productivity culture rarely acknowledges this reality. Instead, it sells increasingly extreme solutions to a problem the environment itself created. More stimulation. More caffeine. More optimization. More urgency. More pressure to become sharper, faster and endlessly efficient.",

      "But intensity is not the same thing as clarity.",

      "A sudden spike of stimulation may create temporary activation, but it does not automatically create sustainable focus. In many cases, overstimulation simply pushes the nervous system further into stress-response patterns that eventually lead to crashes, irritability and mental fatigue.",

      "This is partly why calmer forms of energy are becoming increasingly important. Research around ingredients such as L-Theanine — commonly found in green tea — suggests that when paired with caffeine, it may support a smoother state of alertness compared to highly aggressive stimulant spikes alone.",

      "The goal is not hyperactivity. The goal is steadier attention.",

      "Real focus does not come from forcing the mind into constant acceleration. It comes from reducing friction. Reducing noise. Creating conditions where concentration feels natural again.",

      "This is why rituals matter.",

      "Not because routines are trendy or aesthetically pleasing, but because repetition creates psychological stability inside overstimulation. Small actions become anchors for the nervous system. They tell the body: this moment is safe, this moment matters, this is where we return to ourselves.",

      "Preparing a drink slowly. Sitting near natural light. Opening a notebook before opening notifications. Taking five uninterrupted breaths before responding to the world. These moments appear small, yet over time they rebuild attention in ways constant stimulation slowly erodes.",

      "The body does not interpret calm as laziness. It interprets calm as safety.",

      "And safety is where deeper focus becomes possible again.",

      "That is also the philosophy behind VYTAL. Sustainable energy should not feel aggressive. It should not overwhelm the body further in order to create temporary performance. It should support a calmer and more stable relationship with focus itself.",

      "A smoother form of energy feels different. Less euphoric. Less chaotic. More grounded. It allows the mind to stay present with one thing long enough for meaningful work, reflection and recovery to happen.",

      "Because real performance is not built through endless spikes of intensity. It is built through consistency. Through rhythms the body can actually sustain. Through routines that respect attention as something valuable instead of endlessly extractable.",

      "Maybe the goal was never to become a machine capable of infinite output.",

      "Maybe the goal is simply to create enough quiet to hear yourself think again.",

      "Maybe your attention span was never broken.",

      "Maybe it was simply trying to protect you."
    ]
  },
  {
    id: "productive-crash",
    title: "The myth of the productive crash.",
    readTime: "6 min read",
    category: "Recovery",
    date: "May 18, 2026",
    image: journalRitual,
    excerpt:
      "Why the cycle of spikes and collapses isn't a personality trait — and what calmer energy actually looks like across a real week.",
   content: [
      "Modern culture has normalized a strange relationship with energy. Feeling constantly overstimulated, emotionally drained and physically exhausted is often treated as proof that someone is ambitious enough, disciplined enough or simply working hard enough.",

      "The productive crash has become so common that many people no longer question it. The afternoon fog. The sudden irritability. The inability to focus despite consuming more caffeine. The feeling of being mentally wired while physically exhausted.",

      "But none of this is actually a sustainable biological state.",

      "Most traditional energy systems are built around intensity rather than stability. Highly concentrated caffeine, rapid sugar spikes and constant overstimulation push the nervous system into short bursts of artificial urgency designed to feel like productivity.",

      "And for a moment, it works.",

      "The body becomes activated. Thoughts move faster. Motivation temporarily feels easier to access. But the nervous system cannot remain in that heightened state indefinitely.",

      "Research on stress physiology continues to show that the human body performs best under conditions of relative balance, not endless cycles of activation and collapse. The nervous system constantly attempts to regulate itself back toward equilibrium.",

      "When energy rises too aggressively, the body eventually compensates. Blood sugar drops. Cognitive fatigue appears. Concentration weakens. Mood shifts. The famous '3 p.m. crash' is often less mysterious than modern culture pretends it is.",

      "In many ways, the crash is simply the nervous system trying to recover from excessive stimulation.",

      "But modern productivity culture rarely frames it this way. Instead, exhaustion is aestheticized. Burnout becomes associated with ambition. The ability to override biological limits becomes something people quietly pride themselves on.",

      "The issue is that the body always keeps score eventually.",

      "Over time, unstable energy patterns affect more than productivity alone. They shape emotional regulation, sleep quality, focus, recovery and even the ability to remain mentally present during ordinary moments of life.",

      "That is why calmer forms of energy are becoming increasingly important.",

      "Steadier energy feels fundamentally different from intensity. It does not create dramatic emotional highs. It does not force the nervous system into urgency. Instead, it supports a smoother and more sustainable rhythm throughout the day.",

      "Research around ingredients such as L-Theanine — commonly found in green tea — suggests that when paired with caffeine, it may support calmer attention and smoother cognitive alertness compared to highly aggressive stimulant spikes alone.",

      "The goal is not hyperactivity.",

      "The goal is stability.",

      "A healthier relationship with energy often looks quieter than modern culture expects. Fewer dramatic peaks. Fewer emotional crashes. Less chaos mistaken for motivation. More consistency. More clarity. More room for actual recovery.",

      "Because sustainable performance should not require the body to constantly survive the very systems designed to keep it functioning.",

      "Maybe the productive crash was never a personality trait.",

      "Maybe it was a nervous system asking for a calmer rhythm all along."
    ]
  },
  {
    id: "calmer-mornings",
    title: "Designing calmer mornings.",
    readTime: "4 min read",
    category: "Rituals",
    date: "May 11, 2026",
    image: journalMorning,
    excerpt:
      "Not 5 a.m. wake-ups. Not ice baths. Three small, repeatable shifts that change the temperature of a day.",
    content: [
      "Modern mornings have quietly become performances. Wake up at 5 a.m. Cold plunge. Journal. Meditate. Train. Optimize. Track. Improve. The first hour of the day is increasingly treated like a productivity competition rather than a biological transition into consciousness.",

      "But for many people, these routines do not create calm. They create pressure.",

      "The nervous system wakes up already feeling behind. Before the day has even properly begun, the mind is introduced to urgency, comparison and the subtle anxiety of trying to perform wellness correctly.",

      "True morning design is rarely about intensity.",

      "It is about nervous-system temperature.",

      "Research around stress and cognitive regulation continues to show that the first moments after waking influence emotional state, attention and stress responsiveness throughout the rest of the day. The body does not instantly transition from rest into full performance mode without consequences.",

      "This is partly why immediate screen exposure feels so mentally invasive. Notifications, emails and social feeds force the brain into reactive processing before it has established any internal stability of its own.",

      "The nervous system wakes up and immediately begins responding to external demands.",

      "Over time, this creates mornings that feel psychologically fragmented before they have even properly started.",

      "A calmer morning often begins with subtraction rather than addition.",

      "Less urgency. Less noise. Less pressure to optimize every second of existence.",

      "Small rituals matter because they slow the nervous system down enough to fully arrive inside the day. Opening a window. Drinking water slowly. Sitting near natural light. Allowing silence to exist before information enters the body.",

      "These actions appear simple, yet biologically they communicate safety and regulation. They reduce the immediate cognitive load placed on the brain during the transition from sleep into alertness.",

      "And calm focus tends to grow more easily inside regulated environments.",

      "This is also why slower forms of energy often feel fundamentally different than aggressive stimulation. Instead of shocking the body into temporary activation, steadier rhythms support attention more gently across the day itself.",

      "The healthiest mornings rarely look dramatic from the outside.",

      "They are often quiet. Repetitive. Slightly boring, even.",

      "But consistency regulates the nervous system in ways intensity often cannot.",

      "Because the goal of a morning routine should not be to impress the internet.",

      "The goal is to create a beginning your mind can actually sustain."
    ]
  },
  {
    id: "quiet-hour",
    title: "A quiet hour inside a loud internet.",
    readTime: "7 min read",
    category: "Digital Overload",
    date: "May 03, 2026",
    image: journalCafe,
    excerpt:
      "Notes on building one un-interrupted hour a day — and why it matters more than any productivity system.",
    content: [
      "The modern internet was not designed to protect attention. It was designed to capture it.",

      "Every platform, notification system and algorithm competes for the same limited psychological resource: your ability to stay mentally present with one thing long enough for depth to emerge.",

      "As a result, uninterrupted focus has quietly become one of the rarest experiences in modern life.",

      "Most people no longer work in continuous concentration. They work in fragments. A message arrives. A notification appears. A tab gets opened. An email gets checked. The nervous system never fully settles into a single cognitive rhythm before another interruption pulls it somewhere else.",

      "And because these interruptions feel small individually, their cumulative psychological effect often goes unnoticed.",

      "But research in cognitive psychology continues to show that constant context-switching carries a measurable mental cost. The brain does not instantly transition between tasks without friction. Every switch consumes cognitive energy and weakens sustained attention over time.",

      "This is partly why so many people finish entire workdays feeling mentally exhausted despite struggling to remember what they actually focused on deeply.",

      "The issue is not always workload itself.",

      "Often, the issue is fragmentation.",

      "A loud digital environment keeps the nervous system in a continuous state of partial alertness. Attention becomes shallow because the brain is constantly preparing for interruption.",

      "This is why a single uninterrupted hour can feel strangely powerful.",

      "Inside silence, the mind begins to organize itself differently. Thoughts become less reactive. Concentration deepens. The nervous system slowly exits survival mode and re-enters a calmer state of sustained cognitive engagement.",

      "Depth requires psychological safety.",

      "And constant interruption quietly removes that safety from the brain.",

      "Modern culture often mistakes frantic responsiveness for productivity. Fast replies become associated with competence. Constant availability becomes associated with ambition. But being reachable at every second of the day is not the same thing as doing meaningful work.",

      "In many cases, the opposite is true.",

      "The highest quality thinking usually emerges inside protected environments — environments where the mind is given enough uninterrupted time to move beyond surface-level reaction and into deeper reflection.",

      "This is also why calmer rituals around focus matter. Slower mornings. Fewer notifications. More intentional transitions between tasks. Less digital noise competing for urgency.",

      "The nervous system performs differently when it no longer expects interruption every few minutes.",

      "A quiet hour does not just improve productivity.",

      "It changes the emotional texture of work itself.",

      "Tasks begin to feel less frantic. Attention becomes less scattered. Even time feels slower in a strangely restorative way.",

      "Because deep focus was never simply about efficiency.",

      "It was also about feeling mentally present inside your own life again.",

      "And in an internet built around constant interruption, protecting even one quiet hour a day becomes a small act of psychological resistance."
    ]
  },
  {
    id: "productivity-exhausting",
    title: "Why modern productivity feels emotionally exhausting.",
    readTime: "8 min read",
    category: "Modern Work",
    date: "Apr 26, 2026",
    image: journalLibrary,
    excerpt:
      "The continuous performance of optimization has turned work into an emotional burden that no amount of sleep alone can repair.",
    content: [
      "Modern productivity was originally supposed to help people work more effectively. Somewhere along the way, it quietly became something far more personal.",

      "Today, productivity is no longer treated as a tool. It has become an identity.",

      "Every part of modern life increasingly feels measurable. Steps tracked. Sleep tracked. Focus tracked. Habits optimized. Calendars color-coded. Morning routines perfected. Even rest is often evaluated through the lens of performance and self-improvement.",

      "The result is a culture where people rarely feel finished.",

      "There is always another system to improve. Another habit to build. Another routine to optimize. Another version of yourself supposedly waiting on the other side of greater discipline.",

      "And while much of modern productivity culture promises control, many people experience the exact opposite emotionally.",

      "Exhaustion.",

      "Not simply physical tiredness, but psychological fatigue created by the constant pressure to improve every area of existence simultaneously.",

      "Research around chronic stress and cognitive overload continues to show that the nervous system struggles under conditions of continuous psychological pressure. The human brain was never designed to exist inside an environment where self-worth constantly feels tied to output, speed and measurable efficiency.",

      "Yet modern work culture quietly reinforces this idea everywhere.",

      "Rest begins to feel guilty. Slowness feels irresponsible. Doing nothing feels unproductive, even when the body is clearly asking for recovery.",

      "Over time, this creates a strange emotional contradiction. People become obsessed with systems designed to improve life while simultaneously feeling increasingly disconnected from life itself.",

      "The nervous system remains trapped in low-level hyper-vigilance — constantly scanning for unfinished tasks, unread messages, missed opportunities and future responsibilities.",

      "This is partly why modern exhaustion often feels difficult to fully recover from through sleep alone.",

      "The body may physically rest, but the mind never fully exits performance mode.",

      "Even moments meant for recovery become optimized. Evening routines become productivity strategies. Weekends become opportunities for self-improvement. Vacations become content.",

      "And eventually, the emotional weight of constantly managing the self becomes exhausting in its own right.",

      "Modern culture often frames this emotional burnout as a motivation problem. As if people simply need better discipline or stronger habits.",

      "But in many cases, the issue is not laziness.",

      "The issue is overstimulation paired with impossible psychological expectations.",

      "Human beings are not machines designed for endless optimization. The nervous system requires variation, softness, recovery and emotional safety in order to function sustainably.",

      "This is why slower rhythms matter psychologically.",

      "Calmer mornings. Less aggressive stimulation. Fewer systems competing for urgency. More room for presence without constantly evaluating whether every moment is productive enough.",

      "Because real wellbeing does not come from maximizing every second of existence.",

      "Sometimes it comes from finally allowing yourself to stop performing your life long enough to actually experience it.",

      "And maybe that is what modern productivity culture forgot entirely.",

      "A meaningful life was never supposed to feel like a permanent self-improvement project."
    ]
  },
  {
    id: "slow-caffeine",
    title: "Slow caffeine, explained gently.",
    readTime: "5 min read",
    category: "Sustainable Energy",
    date: "Apr 19, 2026",
    image: journalStillife,
    excerpt:
      "Why botanical balance — caffeine paired with L-Theanine — produces a long, calm plateau instead of a jagged spike.",
   content: [
      "Caffeine has become one of the most normalized performance tools in modern life. It exists everywhere — offices, libraries, train stations, morning routines, late-night deadlines. Entire work cultures quietly run on it.",

      "But the experience of caffeine is rarely just about caffeine itself.",

      "The delivery system matters.",

      "Modern energy culture often prioritizes intensity over stability. Extremely high caffeine doses paired with sugar spikes and synthetic stimulants are designed to create immediate activation — fast energy, heightened urgency, instant psychological momentum.",

      "And for a short moment, that intensity can feel productive.",

      "The nervous system becomes alert. Thoughts accelerate. Fatigue temporarily disappears beneath stimulation.",

      "But aggressive energy delivery often comes with equally aggressive consequences. Jitters. Anxiety. Mental restlessness. Sudden crashes. The strange feeling of being simultaneously overstimulated and cognitively exhausted.",

      "This is partly because the nervous system interprets rapid stimulant spikes as stress activation. Energy rises quickly, but the body struggles to sustain that state smoothly over longer periods of time.",

      "A calmer approach to energy works differently.",

      "Instead of overwhelming the nervous system into temporary urgency, slower energy systems aim to support steadier cognitive rhythms throughout the day itself.",

      "This is one reason combinations such as caffeine paired with L-Theanine — an amino acid naturally found in green tea — have become increasingly interesting within conversations around calmer focus and sustainable attention.",

      "Research suggests that L-Theanine may help support a smoother form of alertness when combined with caffeine, potentially reducing some of the jittery or overstimulating effects often associated with highly aggressive caffeine consumption alone.",

      "The result is not usually explosive energy.",

      "It is something quieter.",

      "More stable attention. Less frantic stimulation. A gentler sense of mental clarity that feels sustainable rather than euphoric.",

      "This is also why many people describe slower caffeine experiences differently emotionally. The body feels less pushed. Focus feels less chaotic. Concentration becomes easier to sustain without the dramatic emotional highs and lows that often accompany overstimulation.",

      "Modern culture tends to associate effectiveness with intensity. The stronger the stimulation feels, the more productive it appears to be.",

      "But sustainable cognitive performance often depends on the opposite.",

      "Consistency.",

      "A nervous system that feels regulated enough to maintain attention calmly across an entire day instead of constantly oscillating between spikes and crashes.",

      "Because real focus rarely feels frantic.",

      "It usually feels quiet.",

      "And maybe energy was never supposed to feel violent in the first place."
    ]
  },
  {
    id: "afternoon-dip",
    title: "Meetings, screens, and the 3 p.m. dip.",
    readTime: "6 min read",
    category: "Modern Work",
    date: "Apr 12, 2026",
    image: journalTrain,
    excerpt:
      "A quiet survival kit for office afternoons without the burnout — built from micro-breaks, real light and slow hydration.",
    content: [
      "By mid-afternoon, modern work begins to feel strangely heavy. Concentration weakens. Motivation drops. Thoughts become slower, yet the nervous system often still feels overstimulated at the same time.",

      "The famous '3 p.m. dip' is so common that many people treat it as a personal weakness — something to fight through with more caffeine, more sugar or more pressure.",

      "But biologically, the story is more complex than that.",

      "Human energy naturally fluctuates throughout the day. Research around circadian rhythms shows that alertness and cognitive performance are not completely stable from morning until evening. The body moves through natural phases of activation and recovery.",

      "Modern work environments, however, tend to intensify this afternoon decline dramatically.",

      "Back-to-back meetings. Continuous screen exposure. Artificial lighting. Endless notifications. Constant cognitive switching between emails, messages, documents and video calls. By afternoon, the nervous system is often less physically tired than mentally overloaded.",

      "The brain spends hours processing digital stimulation without meaningful pauses for sensory recovery.",

      "And because most office environments reward constant responsiveness, people rarely allow the nervous system to reset properly during the day itself.",

      "This is partly why the afternoon slump feels different from ordinary tiredness. It is not always sleepiness. Often, it is cognitive saturation.",

      "The body quietly asking for regulation.",

      "Modern culture usually responds to this state with more stimulation. Another coffee. Another energy drink. Another quick dopamine spike to force the nervous system back into temporary activation.",

      "But constantly overriding biological fatigue often creates even more instability later in the evening. The body becomes trapped in repeated cycles of stimulation and recovery without ever fully settling.",

      "A calmer approach to afternoon energy tends to look much smaller and less dramatic.",

      "Micro-breaks. Natural light. Hydration. Stepping away from screens for a few uninterrupted minutes. Allowing the eyes and nervous system to focus on something other than information for a short period of time.",

      "Research around cognitive recovery suggests that even brief moments of reduced sensory input can help restore mental clarity and attention capacity.",

      "The nervous system does not always need more stimulation.",

      "Sometimes it simply needs less overload.",

      "This is also why slower forms of energy often feel more sustainable across an entire workday. Instead of creating sharp spikes of urgency, steadier energy rhythms support concentration more gently and reduce the emotional volatility that often follows aggressive stimulation.",

      "A calmer afternoon changes more than productivity alone.",

      "It changes how the rest of the evening feels.",

      "You leave work with more mental clarity. More emotional capacity. More energy still available for actual life outside the office.",

      "Because sustainable focus should not require sacrificing the nervous system just to survive the second half of the day.",

      "And maybe the real luxury of modern work is not endless productivity at all.",

      "Maybe it is simply finishing the day without feeling completely depleted by it."
    ]
  },
  {
    id: "nervous-system",
    title: "Planning with your nervous system.",
    readTime: "5 min read",
    category: "Nervous System",
    date: "Apr 05, 2026",
    image: ritualMorning,
    excerpt:
      "Most frameworks treat the mind like a machine. A calmer week begins by reading the body's actual signals first.",
    content: [
      "Most modern productivity systems are built on the assumption that the human mind should function like a machine. Wake up. Optimize output. Maintain consistency. Push through resistance. Repeat.",

      "But human beings are not emotionally neutral operating systems capable of producing the same level of focus every hour of every day.",

      "The nervous system fluctuates constantly.",

      "Energy changes. Attention changes. Emotional regulation changes. Some moments naturally support deep concentration and creative thinking, while others are biologically better suited for recovery, slower tasks or rest.",

      "Yet most productivity culture ignores these internal signals entirely.",

      "Schedules become rigid. Calendars become overloaded. The body is expected to adapt endlessly to external demands regardless of cognitive or emotional state.",

      "Over time, this creates friction between biological reality and modern work expectations.",

      "People begin forcing themselves into intense concentration while already mentally overstimulated. They attempt creative work while emotionally exhausted. They override fatigue with caffeine and pressure instead of recognizing it as information from the body itself.",

      "And eventually, the nervous system starts resisting.",

      "Brain fog. Procrastination. Irritability. Emotional exhaustion. Difficulty concentrating despite trying harder and harder to force focus into existence.",

      "Modern culture often interprets these experiences as laziness or poor discipline.",

      "But in many cases, the body is simply operating beyond its current regulatory capacity.",

      "Research around stress physiology and nervous-system regulation continues to show that the autonomic nervous system plays a major role in attention, emotional stability, recovery and cognitive performance.",

      "When the body remains in prolonged states of stress activation, concentration becomes more difficult because the nervous system prioritizes survival and responsiveness over calm, sustained focus.",

      "This is partly why planning with the nervous system feels fundamentally different than planning against it.",

      "Instead of treating the body like an obstacle to overcome, you begin treating internal signals as useful information.",

      "Some mornings support deep creative work naturally. Some afternoons require slower pacing. Some days call for restoration more than optimization.",

      "A calmer relationship with productivity begins by removing the belief that every hour of existence must produce the same level of output.",

      "This does not mean abandoning structure or ambition.",

      "It means understanding that sustainable focus depends on regulation, not constant self-pressure.",

      "The nervous system performs best inside environments that feel psychologically safe enough for concentration to emerge naturally.",

      "This is also why slower rituals matter so deeply. Sleep. Hydration. Natural light. Reduced overstimulation. Small transitions between tasks. Quiet moments without immediate digital interruption.",

      "These actions appear simple, yet biologically they support regulation in ways modern work culture often neglects entirely.",

      "Because productivity becomes much less violent when you stop treating the body like something that constantly needs to be conquered.",

      "And maybe real balance was never about perfectly managing time at all.",

      "Maybe it was about learning how to work with your nervous system instead of permanently fighting against it."
    ]
  },
];

const featured = journalArticles[0];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function JournalPage() {
  useReveal();
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveArticle(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeArticle]);

  useEffect(() => {
    const onScroll = () => {
      const el = heroImgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + Math.min(y, 600) / 6000})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1); // z.B. "attention-span"
    if (hash) {
      const article = journalArticles.find((a) => a.id === hash);
      if (article) {
        setActiveArticle(article);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
          <img
            src={journalHero}
            alt="A quiet morning desk with notebook, matcha and a glass of water"
            className="h-full w-full object-cover"
            width={1792}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <div className="reveal flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/70">
            <span className="h-px w-10 bg-foreground/40" />
            <span>Volume 03 · The Journal — Spring 2026</span>
          </div>
          <h1 className="reveal mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.92] tracking-tight text-balance max-w-5xl">
            Thoughts for <em className="italic font-normal text-primary">calmer</em> modern living.
          </h1>
          <p className="reveal mt-8 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            Editorial reflections on focus, recovery, attention and ritual —
            a quiet space inside an overstimulated internet.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              Read the journal
            </a>
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              Explore rituals
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-foreground transition-colors ml-2"
            >
              Discover VYTAL →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CATEGORIES STRIP ─────────────────────────── */}
      <section className="border-y border-border bg-background/70 backdrop-blur-sm sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground shrink-0 mr-3">
            Sections
          </span>
          {categories.map((c) => (
            <a
              key={c}
              href={
                  c === "Focus"
                    ? "#attention-span"
                    : c === "Recovery"
                    ? "#productive-crash"
                    : c === "Rituals"
                    ? "#calmer-mornings"
                    : c === "Digital Overload"
                    ? "#quiet-hour"
                    : c === "Modern Work"
                    ? "#productivity-exhausting"
                    : c === "Nervous System"
                    ? "#nervous-system"
                    : c === "Sustainable Energy"
                    ? "#slow-caffeine"
                    : "#featured"
                }
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── EDITOR'S LETTER ─────────────────────────── */}
      <section className="px-6 md:px-10 py-28 md:py-40 max-w-4xl mx-auto">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
          A note from the editor
        </p>
        <p className="reveal mt-8 font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
          We started this journal because the loudest voices in modern productivity
          rarely speak about <span className="italic text-primary">how</span>
          {" "}any of it actually feels. So we made a quieter one.
        </p>
        <p className="reveal mt-10 text-muted-foreground text-base md:text-lg max-w-2xl">
          Slow essays, honest observations, and small rituals — written for the kind
          of attention modern life keeps trying to take away. No life hacks. No
          dopamine bait. Just notes on living a little more calmly, on purpose.
        </p>
      </section>

      {/* ─────────────────────────── FEATURED ─────────────────────────── */}
      <section id="featured" className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              Issue 01 · Cover Essay
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight">
              The Cover Essay
            </h2>
          </div>
        </div>

        <article className="reveal group grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <button
            type="button"
            onClick={() => setActiveArticle(featured)}
            className="lg:col-span-7 block overflow-hidden rounded-sm text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              />
            </div>
          </button>
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {featured.category} · {featured.date} · {featured.readTime}
            </p>
            <button
              type="button"
              onClick={() => setActiveArticle(featured)}
              className="block group/title text-left w-full"
            >
              <h3 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance group-hover/title:text-primary transition-colors">
                {featured.title}
              </h3>
            </button>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              {featured.excerpt}
            </p>
            <button
              type="button"
              onClick={() => setActiveArticle(featured)}
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors"
            >
              Read the cover essay →
            </button>
          </div>
        </article>
      </section>

      {/* ─────────────────────────── PULL QUOTE ─────────────────────────── */}
      <section className="relative py-32 md:py-48 bg-secondary/50">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <span className="font-display text-primary text-7xl leading-none">“</span>
          <p className="reveal mt-4 font-display text-3xl md:text-5xl leading-[1.2] tracking-tight text-balance">
            A calmer life isn't a slower one. It's a more <em className="italic text-primary">honest</em> one
            — one that admits how much energy attention actually costs.
          </p>
          <p className="reveal mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            — From the editor's notes, Issue 01
          </p>
        </div>
      </section>

      {/* ─────────────────────────── EDITORIAL GRID ─────────────────────────── */}
      <section className="px-6 md:px-10 py-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight max-w-md text-balance">
            Essays from the current volume.
          </h2>
          <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Spring · 2026
          </span>
        </div>

        {/* Row A — two columns: articles 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[journalArticles[1], journalArticles[2]].map((p) => (
            <ArticleCard
              key={p.id}
              article={p}
              ratio="aspect-[4/5]"
              onOpen={setActiveArticle}
            />
          ))}
        </div>

        {/* Row B — two columns: articles 4 & 5 */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[journalArticles[3], journalArticles[4]].map((p, i) => (
            <ArticleCard
              key={p.id}
              article={p}
              ratio={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
              className={i === 1 ? "md:mt-20" : ""}
              onOpen={setActiveArticle}
            />
          ))}
        </div>

        {/* Row C — three columns: articles 6, 7, 8 */}
        <div className="mt-24 md:mt-32">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary mb-8">
            Shorter notes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[journalArticles[5], journalArticles[6], journalArticles[7]].map((p) => (
              <ArticleCard
                key={p.id}
                article={p}
                ratio="aspect-[4/5]"
                compact
                onOpen={setActiveArticle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FINAL CTA ─────────────────────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src={journalStillife}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            Continue reading
          </p>
          <h2 className="reveal mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            Built calmly. <span className="italic font-normal text-primary">On purpose.</span>
          </h2>
          <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            One slow newsletter, once a month. One essay. One ritual. One small
            update from inside the VYTAL system. No life hacks, no urgency.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="reveal mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@calm.day"
              className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
            />
            <button className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors">
              Join quietly
            </button>
          </form>

          <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/refill" className="hover:text-foreground transition-colors">
              Explore the system →
            </Link>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop VYTAL →
            </Link>
            <a href="#featured" className="hover:text-foreground transition-colors">
              Continue reading →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ─────────────────────────── ARTICLE MODAL ─────────────────────────── */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}
    </main>
  );
}

function ArticleCard({
  article,
  ratio,
  className = "",
  compact = false,
  onOpen,
}: {
  article: Article;
  ratio: string;
  className?: string;
  compact?: boolean;
  onOpen: (a: Article) => void;
}) {
  return (
    <button
      id={article.id}
      type="button"
      onClick={() => onOpen(article)}
      className={`reveal group block text-left w-full ${className}`}
    >
      <div className={`overflow-hidden rounded-sm ${ratio}`}>
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={1280}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        {article.category} · {article.readTime}
      </p>
      <h3
        className={`mt-3 font-display ${
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        } font-bold leading-[1.08] tracking-tight text-balance group-hover:text-primary transition-colors`}
      >
        {article.title}
      </h3>
      {!compact && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xl">
          {article.excerpt}
        </p>
      )}
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {article.date}
      </p>
    </button>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  // Wir finden den Index (0-basiert), deshalb +1 für die Anzeige
  const index = journalArticles.findIndex((a) => a.id === article.id) + 1;
  const total = journalArticles.length;
  
  // Formatierung: 01 / 08
  const displayIndex = index.toString().padStart(2, '0');
  const displayTotal = total.toString().padStart(2, '0');
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close article"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[2rem] bg-background shadow-2xl">
        <button
          type="button"
          aria-label="Close article"
          onClick={onClose}
          className="sticky top-6 float-right mr-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border text-foreground hover:text-primary transition-colors"
        >
          ✕
        </button>

        <article className="px-6 sm:px-12 md:px-20 py-12 md:py-20">
          <div className="flex justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            <span>Issue 01 · Editorial Journal</span>
            <span>{displayIndex} / {displayTotal}</span>
          </div>

          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {article.category} · {article.date} · {article.readTime}
          </p>

          <h1 className="mt-6 font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-balance">
            {article.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl md:text-2xl leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>

          <img
            src={article.image}
            alt={article.title}
            className="mt-16 w-full rounded-[2rem] object-cover"
          />

          <div className="mx-auto mt-20 max-w-3xl space-y-8 text-[18px] md:text-xl leading-[1.9] text-foreground/85">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-8 flex justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              VYTAL Journal · Volume 04
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] hover:text-primary"
            >
              Close ✕
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}