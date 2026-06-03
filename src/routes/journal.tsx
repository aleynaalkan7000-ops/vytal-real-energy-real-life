import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";
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

// Category → article anchor mapping (language-independent IDs)
const CATEGORY_LINKS = [
  { href: "#attention-span" },
  { href: "#calmer-mornings" },
  { href: "#productive-crash" },
  { href: "#quiet-hour" },
  { href: "#productivity-exhausting" },
  { href: "#nervous-system" },
  { href: "#slow-caffeine" },
];

// ── English articles ──────────────────────────────────────────────────
const journalArticlesEn: Article[] = [
  {
    id: "attention-span",
    title: "Your attention span isn't broken.",
    readTime: "9 min read",
    category: "Focus",
    date: "May 2026",
    image: journalFeatured,
    excerpt: "The way modern life is designed — endless inputs, endless tabs, endless small emergencies — was never something a nervous system was supposed to hold.",
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
      "Real focus does not come from forcing the mind into constant acceleration. It comes from reducing friction. Reducing noise. Creating conditions where concentration feels natural again. That is also the philosophy behind VYTAL. Sustainable energy should not feel aggressive. It should support a calmer and more stable relationship with focus itself.",
    ],
  },
  {
    id: "productive-crash",
    title: "The myth of the productive crash.",
    readTime: "6 min read",
    category: "Recovery",
    date: "May 18, 2026",
    image: journalRitual,
    excerpt: "Why the cycle of spikes and collapses isn't a personality trait — and what calmer energy actually looks like across a real week.",
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
      "That is why calmer forms of energy are becoming increasingly important. Steadier energy feels fundamentally different from intensity. It does not create dramatic emotional highs. It does not force the nervous system into urgency. Instead, it supports a smoother and more sustainable rhythm throughout the day.",
      "Maybe the productive crash was never a personality trait. Maybe it was a nervous system asking for a calmer rhythm all along.",
    ],
  },
  {
    id: "calmer-mornings",
    title: "Designing calmer mornings.",
    readTime: "4 min read",
    category: "Rituals",
    date: "May 11, 2026",
    image: journalMorning,
    excerpt: "Not 5 a.m. wake-ups. Not ice baths. Three small, repeatable shifts that change the temperature of a day.",
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
      "And calm focus tends to grow more easily inside regulated environments.",
      "The healthiest mornings rarely look dramatic from the outside. They are often quiet. Repetitive. Slightly boring, even. But consistency regulates the nervous system in ways intensity often cannot. Because the goal of a morning routine should not be to impress the internet. The goal is to create a beginning your mind can actually sustain.",
    ],
  },
  {
    id: "quiet-hour",
    title: "A quiet hour inside a loud internet.",
    readTime: "7 min read",
    category: "Digital Overload",
    date: "May 03, 2026",
    image: journalCafe,
    excerpt: "Notes on building one un-interrupted hour a day — and why it matters more than any productivity system.",
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
      "Protect one hour. Defend it gently. The rest of the day will reorganise itself around what you decided was non-negotiable.",
    ],
  },
  {
    id: "productivity-exhausting",
    title: "Why modern productivity feels emotionally exhausting.",
    readTime: "8 min read",
    category: "Modern Work",
    date: "Apr 26, 2026",
    image: journalLibrary,
    excerpt: "The continuous performance of optimization has turned work into an emotional burden that no amount of sleep alone can repair.",
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
      "Because real wellbeing does not come from maximizing every second of existence.",
      "Sometimes it comes from finally allowing yourself to stop performing your life long enough to actually experience it.",
      "And maybe that is what modern productivity culture forgot entirely. A meaningful life was never supposed to feel like a permanent self-improvement project.",
    ],
  },
  {
    id: "slow-caffeine",
    title: "Slow caffeine, explained gently.",
    readTime: "5 min read",
    category: "Sustainable Energy",
    date: "Apr 19, 2026",
    image: journalStillife,
    excerpt: "Why botanical balance — caffeine paired with L-Theanine — produces a long, calm plateau instead of a jagged spike.",
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
      "It is something quieter. More stable attention. Less frantic stimulation. A gentler sense of mental clarity that feels sustainable rather than euphoric.",
      "Maybe energy was never supposed to feel violent in the first place.",
    ],
  },
  {
    id: "afternoon-dip",
    title: "Meetings, screens, and the 3 p.m. dip.",
    readTime: "6 min read",
    category: "Modern Work",
    date: "Apr 12, 2026",
    image: journalTrain,
    excerpt: "A quiet survival kit for office afternoons without the burnout — built from micro-breaks, real light and slow hydration.",
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
      "A calmer approach to afternoon energy tends to look much smaller and less dramatic. Micro-breaks. Natural light. Hydration. Stepping away from screens for a few uninterrupted minutes. Allowing the nervous system to focus on something other than information for a short period of time.",
      "The nervous system does not always need more stimulation. Sometimes it simply needs less overload.",
      "This is also why slower forms of energy often feel more sustainable across an entire workday. Instead of creating sharp spikes of urgency, steadier energy rhythms support concentration more gently and reduce the emotional volatility that often follows aggressive stimulation.",
      "Maybe the real luxury of modern work is not endless productivity at all. Maybe it is simply finishing the day without feeling completely depleted by it.",
    ],
  },
  {
    id: "nervous-system",
    title: "Planning with your nervous system.",
    readTime: "5 min read",
    category: "Nervous System",
    date: "Apr 05, 2026",
    image: ritualMorning,
    excerpt: "Most frameworks treat the mind like a machine. A calmer week begins by reading the body's actual signals first.",
    content: [
      "Most modern productivity systems are built on the assumption that the human mind should function like a machine. Wake up. Optimize output. Maintain consistency. Push through resistance. Repeat.",
      "But human beings are not emotionally neutral operating systems capable of producing the same level of focus every hour of every day.",
      "The nervous system fluctuates constantly.",
      "Energy changes. Attention changes. Emotional regulation changes. Some moments naturally support deep concentration and creative thinking, while others are biologically better suited for recovery, slower tasks or rest.",
      "Yet most productivity culture ignores these internal signals entirely.",
      "Schedules become rigid. Calendars become overloaded. The body is expected to adapt endlessly to external demands regardless of cognitive or emotional state.",
      "Over time, this creates friction between biological reality and modern work expectations.",
      "People begin forcing themselves into intense concentration while already mentally overstimulated. They attempt creative work while emotionally exhausted. They override fatigue with caffeine and pressure instead of recognizing it as information from the body itself.",
      "And eventually, the nervous system starts resisting. Brain fog. Procrastination. Irritability. Emotional exhaustion. Difficulty concentrating despite trying harder and harder to force focus into existence.",
      "Modern culture often interprets these experiences as laziness or poor discipline.",
      "But in many cases, the body is simply operating beyond its current regulatory capacity.",
      "Research around stress physiology and nervous-system regulation continues to show that the autonomic nervous system plays a major role in attention, emotional stability, recovery and cognitive performance.",
      "Planning with the nervous system feels fundamentally different than planning against it. Instead of treating the body like an obstacle to overcome, you begin treating internal signals as useful information.",
      "Some mornings support deep creative work naturally. Some afternoons require slower pacing. Some days call for restoration more than optimization.",
      "Because productivity becomes much less violent when you stop treating the body like something that constantly needs to be conquered. And maybe real balance was never about perfectly managing time at all. Maybe it was about learning how to work with your nervous system instead of permanently fighting against it.",
    ],
  },
];

// ── German articles ───────────────────────────────────────────────────
const journalArticlesDe: Article[] = [
  {
    id: "attention-span",
    title: "Deine Aufmerksamkeitsspanne ist nicht kaputt.",
    readTime: "9 Min. Lesezeit",
    category: "Fokus",
    date: "Mai 2026",
    image: journalFeatured,
    excerpt: "Die Art, wie das moderne Leben gestaltet ist — endlose Inputs, endlose Tabs, endlose kleine Notfälle — war nie etwas, das ein Nervensystem aushalten sollte.",
    content: [
      "Die digitale Welt von heute ist eine Umgebung, für die unsere Nervensysteme nie ausgelegt waren. Jede Benachrichtigung, jeder endlose Scroll-Feed, jede algorithmische Empfehlung und jedes blinkende rote Abzeichen konkurriert um dieselbe begrenzte kognitive Kapazität.",
      "Dennoch rahmt die moderne Kultur Ablenkung ständig als persönliches moralisches Versagen. Wir werden uns gesagt, dass wir uns einfach an Disziplin mangeln, wenn wir uns nicht konzentrieren können. Dass unsere Unfähigkeit, uns zu konzentrieren, beweist, dass wir faul, unmotiviert oder geistig schwach sind.",
      "Aber Forschung zur Aufmerksamkeit legt etwas weit Komplexeres nahe. Kognitionswissenschaftler haben wiederholt gezeigt, dass ständige Unterbrechungen, digitales Aufgaben-Wechseln und kontinuierliche Benachrichtigungen die mentale Erschöpfung erhöhen und die anhaltende Konzentration mit der Zeit verringern.",
      "Das Gehirn ist nicht dafür ausgelegt, endlos zwischen Tabs, Nachrichten, E-Mails und Algorithmen, die um Dringlichkeit kämpfen, hin und herzuschalten. Jede Unterbrechung hat einen kleinen kognitiven Preis. Einzeln fühlen sich diese Momente unbedeutend an. Zusammen erzeugen sie Erschöpfung.",
      "Deine Aufmerksamkeitsspanne ist nicht kaputt. Sie reagiert genau so, wie ein menschliches Nervensystem auf eine Umgebung reagieren würde, die um Unterbrechung herum gebaut ist.",
      "Die meisten Menschen bewegen sich nicht mehr bewusst durch den Tag. Sie wachen auf und nehmen sofort Inputs auf. Benachrichtigungen. E-Mails. Timelines. Nachrichten. Neuigkeiten. Fristen. Gestern offen gelassene Tabs. Das Nervensystem beruhigt sich nie vollständig, weil es ständig darauf vorbereitet ist, auf die nächste Anforderung zu reagieren.",
      "Mit der Zeit schafft das einen Zustand permanenter teilweiser Aufmerksamkeit — wo der Körper nie vollständig zur Ruhe kommt, der Geist aber auch nie vollständig fokussiert ist. Du bist technisch gesehen jederzeit verfügbar, aber mental fast nirgendwo anwesend.",
      "Deshalb fühlt sich moderne Erschöpfung psychologisch anders an als normale Müdigkeit. Es ist nicht nur körperliche Müdigkeit. Es ist kognitive Überlastung. Emotionale Fragmentierung. Der stille Stress, sich nie mental fertig zu fühlen.",
      "Die moderne Produktivitätskultur anerkennt diese Realität selten. Stattdessen verkauft sie zunehmend extreme Lösungen für ein Problem, das die Umgebung selbst geschaffen hat. Mehr Stimulation. Mehr Koffein. Mehr Optimierung. Mehr Dringlichkeit. Mehr Druck, schärfer, schneller und endlos effizienter zu werden.",
      "Aber Intensität ist nicht dasselbe wie Klarheit.",
      "Ein plötzlicher Stimulationsschub kann vorübergehende Aktivierung erzeugen, schafft aber nicht automatisch nachhaltige Konzentration. In vielen Fällen treibt Überstimulation das Nervensystem einfach weiter in Stressreaktionsmuster, die letztendlich zu Abstürzen, Reizbarkeit und mentaler Erschöpfung führen.",
      "Echter Fokus entsteht nicht dadurch, den Geist in ständige Beschleunigung zu zwingen. Er entsteht durch das Reduzieren von Reibung und Lärm — durch Bedingungen, unter denen Konzentration sich wieder natürlich anfühlt. Das ist auch die Philosophie hinter VYTAL. Nachhaltige Energie sollte sich nicht aggressiv anfühlen. Sie sollte eine ruhigere und stabilere Beziehung zur Konzentration selbst unterstützen.",
    ],
  },
  {
    id: "productive-crash",
    title: "Der Mythos des produktiven Absturzes.",
    readTime: "6 Min. Lesezeit",
    category: "Erholung",
    date: "18. Mai 2026",
    image: journalRitual,
    excerpt: "Warum der Zyklus aus Spikes und Zusammenbrüchen kein Persönlichkeitsmerkmal ist — und wie ruhigere Energie über eine echte Woche tatsächlich aussieht.",
    content: [
      "Die moderne Kultur hat eine merkwürdige Beziehung zur Energie normalisiert. Sich ständig überstimuliert, emotional erschöpft und körperlich ausgelaugt zu fühlen, wird oft als Beweis behandelt, dass jemand ehrgeizig genug, diszipliniert genug oder einfach hart genug arbeitet.",
      "Der produktive Absturz ist so häufig geworden, dass viele Menschen ihn nicht mehr hinterfragen. Der Nachmittagsnebel. Die plötzliche Reizbarkeit. Die Unfähigkeit, sich zu konzentrieren, trotz mehr Koffein. Das Gefühl, mental aufgedreht und körperlich erschöpft gleichzeitig zu sein.",
      "Aber das alles ist kein nachhaltiger biologischer Zustand.",
      "Die meisten traditionellen Energiesysteme sind eher auf Intensität als auf Stabilität ausgerichtet. Hochkonzentriertes Koffein, schnelle Zuckerspitzen und ständige Überstimulation treiben das Nervensystem in kurze Ausbrüche künstlicher Dringlichkeit, die sich wie Produktivität anfühlen sollen.",
      "Und für einen Moment funktioniert es.",
      "Der Körper wird aktiviert. Gedanken bewegen sich schneller. Motivation fühlt sich vorübergehend leichter zugänglich an. Aber das Nervensystem kann nicht unbegrenzt in diesem erhöhten Zustand bleiben.",
      "Forschung zur Stressphysiologie zeigt weiterhin, dass der menschliche Körper unter Bedingungen relativer Balance am besten funktioniert, nicht bei endlosen Aktivierungs- und Zusammenbruchszyklen.",
      "Wenn Energie zu aggressiv steigt, kompensiert der Körper schließlich. Der Blutzucker fällt. Kognitive Erschöpfung tritt auf. Die Konzentration schwächt sich ab. Der berühmte '15-Uhr-Absturz' ist oft weniger rätselhaft, als die moderne Kultur es vorgibt.",
      "In vielerlei Hinsicht ist der Absturz einfach das Nervensystem, das versucht, sich von übermäßiger Stimulation zu erholen.",
      "Aber die moderne Produktivitätskultur rahmt das selten so. Stattdessen wird Erschöpfung ästhetisiert. Burnout wird mit Ambition assoziiert. Die Fähigkeit, biologische Grenzen zu überwinden, ist etwas, worauf sich Menschen stillschweigend etwas einbilden.",
      "Das Problem ist, dass der Körper am Ende immer Rechnung stellt.",
      "Mit der Zeit beeinflussen instabile Energiemuster mehr als nur die Produktivität. Sie prägen emotionale Regulation, Schlafqualität, Konzentration, Erholung und sogar die Fähigkeit, in gewöhnlichen Momenten des Lebens mental anwesend zu bleiben.",
      "Deshalb werden ruhigere Energieformen zunehmend wichtiger. Gleichmäßigere Energie fühlt sich grundlegend anders an als Intensität. Sie erzeugt keine dramatischen emotionalen Hochs. Sie drängt das Nervensystem nicht in Dringlichkeit.",
      "Vielleicht war der produktive Absturz nie ein Persönlichkeitsmerkmal. Vielleicht war es ein Nervensystem, das die ganze Zeit nach einem ruhigeren Rhythmus gefragt hat.",
    ],
  },
  {
    id: "calmer-mornings",
    title: "Ruhigere Morgen gestalten.",
    readTime: "4 Min. Lesezeit",
    category: "Rituale",
    date: "11. Mai 2026",
    image: journalMorning,
    excerpt: "Nicht um 5 Uhr aufstehen. Kein Eisbad. Drei kleine, wiederholbare Veränderungen, die die Temperatur eines Tages verändern.",
    content: [
      "Morgenratschläge haben sich still in Aufführungen verwandelt. Um 5 Uhr aufwachen. Kalt duschen. Journalen. Meditieren. Trainieren. Optimieren. Die erste Stunde des Tages wird zunehmend wie ein Produktivitätswettbewerb behandelt, anstatt wie ein biologischer Übergang ins Bewusstsein.",
      "Aber für viele Menschen erzeugen diese Routinen keine Ruhe. Sie erzeugen Druck.",
      "Das Nervensystem wacht auf und fühlt sich bereits im Rückstand. Bevor der Tag richtig begonnen hat, wird der Geist mit Dringlichkeit und der subtilen Angst konfrontiert, Wohlbefinden korrekt aufführen zu müssen.",
      "Echtes Morgendesign geht selten um Intensität.",
      "Es geht um Nervensystem-Temperatur.",
      "Forschung zu Stress und kognitiver Regulation zeigt weiterhin, dass die ersten Momente nach dem Aufwachen emotionalen Zustand, Aufmerksamkeit und Stressreaktivität für den Rest des Tages beeinflussen.",
      "Deshalb fühlt sich unmittelbare Bildschirmexposition so mental invasiv an. Benachrichtigungen und soziale Feeds zwingen das Gehirn in reaktive Verarbeitung, bevor es eine eigene innere Stabilität aufgebaut hat.",
      "Das Nervensystem wacht auf und beginnt sofort, auf externe Anforderungen zu reagieren.",
      "Mit der Zeit schafft das Morgen, die sich psychologisch fragmentiert anfühlen, bevor sie richtig begonnen haben.",
      "Ein ruhigerer Morgen beginnt oft mit Subtraktion statt Addition.",
      "Weniger Dringlichkeit. Weniger Lärm. Weniger Druck, jede Sekunde des Lebens zu optimieren.",
      "Kleine Rituale sind wichtig, weil sie das Nervensystem genug verlangsamen, um vollständig in den Tag anzukommen. Ein Fenster öffnen. Langsam Wasser trinken. Im Tageslicht sitzen. Stille existieren lassen, bevor Informationen in den Körper eintreten.",
      "Und ruhiger Fokus wächst leichter in regulierten Umgebungen.",
      "Die gesündesten Morgen sehen von außen selten dramatisch aus. Sie sind oft ruhig. Repetitiv. Sogar leicht langweilig. Aber Kontinuität reguliert das Nervensystem auf Weisen, die Intensität oft nicht kann. Weil das Ziel einer Morgenroutine nicht sein sollte, das Internet zu beeindrucken. Das Ziel ist, einen Anfang zu schaffen, den dein Geist tatsächlich aufrechterhalten kann.",
    ],
  },
  {
    id: "quiet-hour",
    title: "Eine ruhige Stunde in einem lauten Internet.",
    readTime: "7 Min. Lesezeit",
    category: "Digitale Überlastung",
    date: "3. Mai 2026",
    image: journalCafe,
    excerpt: "Notizen dazu, wie man täglich eine ununterbrochene Stunde aufbaut — und warum das wichtiger ist als jedes Produktivitätssystem.",
    content: [
      "Das moderne Internet wurde nicht dafür entworfen, Aufmerksamkeit zu schützen. Es wurde entworfen, sie zu erfassen.",
      "Jede Plattform, jedes Benachrichtigungssystem und jeder Algorithmus konkurriert um dieselbe begrenzte psychologische Ressource: deine Fähigkeit, mental präsent bei einer Sache zu bleiben, lange genug damit Tiefe entstehen kann.",
      "Als Ergebnis ist ununterbrochener Fokus still zu einer der seltensten Erfahrungen im modernen Leben geworden.",
      "Die meisten Menschen arbeiten nicht mehr in kontinuierlicher Konzentration. Sie arbeiten in Fragmenten. Eine Nachricht kommt. Eine Benachrichtigung erscheint. Ein Tab wird geöffnet. Das Nervensystem findet sich nie vollständig in einem einzigen kognitiven Rhythmus, bevor eine andere Unterbrechung es woandershin zieht.",
      "Und weil sich diese Unterbrechungen einzeln klein anfühlen, bleibt ihre kumulative psychologische Wirkung oft unbemerkt.",
      "Aber Forschung in der kognitiven Psychologie zeigt weiterhin, dass ständiges Aufgaben-Wechseln messbare mentale Kosten hat. Das Gehirn geht nicht sofort reibungslos zwischen Aufgaben über. Jeder Wechsel verbraucht kognitive Energie und schwächt die anhaltende Aufmerksamkeit mit der Zeit.",
      "Das erklärt teilweise, warum so viele Menschen ganze Arbeitstage mental erschöpft beenden, obwohl sie kaum beschreiben können, worauf sie sich wirklich tief konzentriert haben.",
      "Das Problem ist nicht immer die Arbeitsbelastung selbst.",
      "Oft ist das Problem Fragmentierung.",
      "Eine laute digitale Umgebung hält das Nervensystem in einem ständigen Zustand teilweiser Wachsamkeit. Aufmerksamkeit wird oberflächlich, weil das Gehirn ständig auf Unterbrechungen vorbereitet ist.",
      "Deshalb kann eine einzige ununterbrochene Stunde so seltsam mächtig wirken.",
      "In der Stille beginnt der Geist sich anders zu organisieren. Gedanken werden weniger reaktiv. Konzentration vertieft sich. Das Nervensystem verlässt langsam den Überlebensmodus und tritt wieder in einen ruhigeren Zustand anhaltender kognitiver Beschäftigung ein.",
      "Tiefe erfordert psychologische Sicherheit.",
      "Und ständige Unterbrechung entzieht dem Gehirn still diese Sicherheit.",
      "Schütze eine Stunde. Verteidige sie sanft. Der Rest des Tages wird sich um das neu ordnen, was du als nicht verhandelbar entschieden hast.",
    ],
  },
  {
    id: "productivity-exhausting",
    title: "Warum sich moderne Produktivität emotional erschöpfend anfühlt.",
    readTime: "8 Min. Lesezeit",
    category: "Moderne Arbeit",
    date: "26. Apr. 2026",
    image: journalLibrary,
    excerpt: "Die ständige Darbietung der Optimierung hat Arbeit zu einer emotionalen Last gemacht, die kein Schlaf allein reparieren kann.",
    content: [
      "Moderne Produktivität sollte ursprünglich helfen, effektiver zu arbeiten. Irgendwo auf dem Weg ist sie still zu etwas viel Persönlicherem geworden.",
      "Heute wird Produktivität nicht mehr als Werkzeug behandelt. Sie ist zur Identität geworden.",
      "Jeder Teil des modernen Lebens fühlt sich zunehmend messbar an. Schritte verfolgt. Schlaf verfolgt. Fokus verfolgt. Gewohnheiten optimiert. Kalender farbkodiert. Morgenroutinen perfektioniert. Sogar Erholung wird oft durch die Linse von Leistung und Selbstverbesserung bewertet.",
      "Das Ergebnis ist eine Kultur, in der sich Menschen selten fertig fühlen.",
      "Es gibt immer ein weiteres System zu verbessern. Eine weitere Gewohnheit aufzubauen. Eine weitere Routine zu optimieren. Eine weitere Version von dir selbst, die angeblich auf der anderen Seite größerer Disziplin wartet.",
      "Und obwohl ein Großteil der modernen Produktivitätskultur Kontrolle verspricht, erleben viele Menschen emotional das genaue Gegenteil.",
      "Erschöpfung.",
      "Nicht einfach körperliche Müdigkeit, sondern psychologische Ermüdung durch den ständigen Druck, jeden Bereich des Lebens gleichzeitig zu verbessern.",
      "Forschung zu chronischem Stress und kognitiver Überlastung zeigt weiterhin, dass das Nervensystem unter Bedingungen kontinuierlichen psychologischen Drucks kämpft. Das menschliche Gehirn war nie dafür ausgelegt, in einer Umgebung zu existieren, in der Selbstwert ständig an Output, Geschwindigkeit und messbare Effizienz gebunden ist.",
      "Dennoch verstärkt die moderne Arbeitskultur diese Idee überall still.",
      "Erholung beginnt sich schuldig anzufühlen. Langsamkeit fühlt sich unverantwortlich an. Nichts zu tun fühlt sich unproduktiv an, auch wenn der Körper klar nach Erholung fragt.",
      "Mit der Zeit schafft das einen merkwürdigen emotionalen Widerspruch. Menschen werden besessen von Systemen, die das Leben verbessern sollen, während sie sich gleichzeitig zunehmend vom Leben selbst entfremdet fühlen.",
      "Weil echter Wohlstand nicht darum geht, jeden Moment des Lebens zu maximieren.",
      "Manchmal kommt er daher, sich endlich zu erlauben, das Aufführen des eigenen Lebens lang genug aufzuhören, um es tatsächlich zu erleben.",
      "Und vielleicht hat das die moderne Produktivitätskultur völlig vergessen. Ein bedeutungsvolles Leben sollte sich nie wie ein dauerhaftes Selbstverbesserungsprojekt anfühlen.",
    ],
  },
  {
    id: "slow-caffeine",
    title: "Langsames Koffein, sanft erklärt.",
    readTime: "5 Min. Lesezeit",
    category: "Nachhaltige Energie",
    date: "19. Apr. 2026",
    image: journalStillife,
    excerpt: "Warum botanisches Gleichgewicht — Koffein gepaart mit L-Theanin — ein langes, ruhiges Plateau erzeugt statt eines gezackten Spikes.",
    content: [
      "Koffein ist zu einem der normalisiertesten Leistungswerkzeuge im modernen Leben geworden. Es ist überall — in Büros, Bibliotheken, Bahnhöfen, Morgenroutinen, nächtlichen Fristen. Ganze Arbeitskulturen laufen still darauf.",
      "Aber die Erfahrung mit Koffein ist selten nur Koffein selbst.",
      "Das Abgabesystem ist entscheidend.",
      "Die moderne Energiekultur priorisiert oft Intensität über Stabilität. Extrem hohe Koffeindosen, gepaart mit Zuckerspitzen und synthetischen Stimulanzien, sind darauf ausgelegt, sofortige Aktivierung zu erzeugen — schnelle Energie, erhöhte Dringlichkeit, sofortiger psychologischer Schwung.",
      "Und für einen kurzen Moment kann sich diese Intensität produktiv anfühlen.",
      "Das Nervensystem wird wach. Gedanken beschleunigen. Müdigkeit verschwindet vorübergehend unter Stimulation.",
      "Aber aggressive Energieabgabe kommt oft mit ebenso aggressiven Konsequenzen. Zittern. Angst. Mentale Unruhe. Plötzliche Abstürze. Das merkwürdige Gefühl, gleichzeitig überstimuliert und kognitiv erschöpft zu sein.",
      "Das liegt teilweise daran, dass das Nervensystem schnelle Stimulanzspitzen als Stressaktivierung interpretiert. Energie steigt schnell, aber der Körper kämpft darum, diesen Zustand über längere Zeit gleichmäßig aufrechtzuerhalten.",
      "Ein ruhigerer Ansatz zur Energie funktioniert anders.",
      "Anstatt das Nervensystem in vorübergehende Dringlichkeit zu zwingen, zielen langsamere Energiesysteme darauf ab, gleichmäßigere kognitive Rhythmen über den Tag zu unterstützen.",
      "Deshalb ist die Kombination von Koffein mit L-Theanin — einer Aminosäure, die natürlich in grünem Tee vorkommt — zunehmend interessant in Gesprächen über ruhigeren Fokus und nachhaltige Aufmerksamkeit.",
      "Forschung legt nahe, dass L-Theanin eine gleichmäßigere Form der Wachheit unterstützen kann, wenn es mit Koffein kombiniert wird, und möglicherweise einige der nervösen oder überstimulierenden Effekte reduziert.",
      "Das Ergebnis ist normalerweise keine explosive Energie.",
      "Es ist etwas Ruhigeres. Stabilere Aufmerksamkeit. Weniger hektische Stimulation. Ein sanfteres Gefühl mentaler Klarheit, das sich nachhaltig anfühlt statt euphorisch.",
      "Vielleicht war Energie nie dazu gedacht, sich gewalttätig anzufühlen.",
    ],
  },
  {
    id: "afternoon-dip",
    title: "Meetings, Bildschirme und der 15-Uhr-Absturz.",
    readTime: "6 Min. Lesezeit",
    category: "Moderne Arbeit",
    date: "12. Apr. 2026",
    image: journalTrain,
    excerpt: "Ein ruhiges Überlebenskit für Büro-Nachmittage ohne Burnout — aus Mikropausen, echtem Licht und langsamer Hydration.",
    content: [
      "Am frühen Nachmittag beginnt sich moderne Arbeit merkwürdig schwer anzufühlen. Die Konzentration schwächt sich. Die Motivation sinkt. Gedanken werden langsamer, doch das Nervensystem fühlt sich oft gleichzeitig noch überstimuliert an.",
      "Der berühmte '15-Uhr-Einbruch' ist so häufig, dass viele Menschen ihn als persönliche Schwäche behandeln — etwas, das mit mehr Koffein, mehr Zucker oder mehr Druck durchgehalten werden muss.",
      "Aber biologisch ist die Geschichte komplexer.",
      "Menschliche Energie schwankt natürlich über den Tag. Forschung zu zirkadianen Rhythmen zeigt, dass Wachheit und kognitive Leistung nicht vollständig stabil von Morgen bis Abend sind. Der Körper durchläuft natürliche Phasen der Aktivierung und Erholung.",
      "Moderne Arbeitsumgebungen neigen jedoch dazu, diesen Nachmittagsrückgang dramatisch zu intensivieren.",
      "Meetings ohne Pausen. Kontinuierliche Bildschirmexposition. Künstliches Licht. Endlose Benachrichtigungen. Ständiges kognitive Umschalten zwischen E-Mails, Nachrichten, Dokumenten und Videoanrufen. Am Nachmittag ist das Nervensystem oft weniger körperlich müde als mental überladen.",
      "Das Gehirn verbringt Stunden damit, digitale Stimulation ohne bedeutungsvolle Pausen zur sensorischen Erholung zu verarbeiten.",
      "Und weil die meisten Büroumgebungen ständige Reaktionsfähigkeit belohnen, erlauben Menschen selten dem Nervensystem, sich tagsüber richtig zurückzusetzen.",
      "Deshalb fühlt sich der Nachmittagseinbruch anders an als normale Müdigkeit. Es ist nicht immer Schläfrigkeit. Oft ist es kognitive Sättigung.",
      "Der Körper bittet still um Regulation.",
      "Ein ruhigerer Ansatz zur Nachmittags-Energie sieht meist viel kleiner und weniger dramatisch aus. Mikropausen. Natürliches Licht. Hydration. Für ein paar ununterbrochene Minuten vom Bildschirm wegzugehen.",
      "Das Nervensystem braucht nicht immer mehr Stimulation. Manchmal braucht es einfach weniger Überlastung.",
      "Deshalb fühlen sich langsamere Energieformen über einen ganzen Arbeitstag oft nachhaltiger an. Anstatt scharfe Dringlichkeitsspitzen zu erzeugen, unterstützen gleichmäßigere Energierhythmen die Konzentration sanfter.",
      "Vielleicht ist der wahre Luxus moderner Arbeit gar nicht endlose Produktivität. Vielleicht ist es einfach, den Tag zu beenden, ohne vollständig von ihm erschöpft zu sein.",
    ],
  },
  {
    id: "nervous-system",
    title: "Mit deinem Nervensystem planen.",
    readTime: "5 Min. Lesezeit",
    category: "Nervensystem",
    date: "5. Apr. 2026",
    image: ritualMorning,
    excerpt: "Die meisten Systeme behandeln den Geist wie eine Maschine. Eine ruhigere Woche beginnt damit, die echten Signale des Körpers zuerst zu lesen.",
    content: [
      "Die meisten modernen Produktivitätssysteme basieren auf der Annahme, dass der menschliche Geist wie eine Maschine funktionieren sollte. Aufwachen. Output optimieren. Konsistenz wahren. Widerstand überwinden. Wiederholen.",
      "Aber Menschen sind keine emotional neutralen Betriebssysteme, die jede Stunde jedes Tages dasselbe Fokussierungsniveau produzieren können.",
      "Das Nervensystem schwankt ständig.",
      "Energie verändert sich. Aufmerksamkeit verändert sich. Emotionale Regulation verändert sich. Einige Momente unterstützen natürlich tiefe Konzentration und kreatives Denken, während andere biologisch besser für Erholung, langsamere Aufgaben oder Ruhe geeignet sind.",
      "Dennoch ignoriert die meiste Produktivitätskultur diese inneren Signale vollständig.",
      "Zeitpläne werden starr. Kalender werden überladen. Von dem Körper wird erwartet, dass er sich endlos an externe Anforderungen anpasst, unabhängig vom kognitiven oder emotionalen Zustand.",
      "Mit der Zeit schafft das Reibung zwischen biologischer Realität und modernen Arbeitserwartungen.",
      "Menschen zwingen sich in intensive Konzentration, während sie bereits mental überstimuliert sind. Sie versuchen kreative Arbeit, während sie emotional erschöpft sind. Sie überwinden Müdigkeit mit Koffein und Druck, anstatt sie als Information des Körpers selbst zu erkennen.",
      "Und schließlich beginnt das Nervensystem zu widerstehen. Gehirnnebel. Prokrastination. Reizbarkeit. Emotionale Erschöpfung. Schwierigkeiten bei der Konzentration trotz des Versuchens, Fokus ins Dasein zu zwingen.",
      "Moderne Kultur interpretiert diese Erfahrungen oft als Faulheit oder mangelnde Disziplin.",
      "Aber in vielen Fällen operiert der Körper einfach jenseits seiner aktuellen Regulationskapazität.",
      "Forschung zur Stressphysiologie und Nervensystemregulation zeigt weiterhin, dass das autonome Nervensystem eine wichtige Rolle bei Aufmerksamkeit, emotionaler Stabilität, Erholung und kognitiver Leistung spielt.",
      "Mit dem Nervensystem zu planen fühlt sich grundlegend anders an als gegen es zu planen. Anstatt den Körper als Hindernis zu behandeln, das überwunden werden muss, beginnst du, innere Signale als nützliche Informationen zu behandeln.",
      "Einige Morgen unterstützen tiefe kreative Arbeit natürlich. Einige Nachmittage erfordern ein langsameres Tempo. Einige Tage verlangen mehr nach Wiederherstellung als nach Optimierung.",
      "Weil Produktivität viel weniger gewalttätig wird, wenn du aufhörst, den Körper wie etwas zu behandeln, das ständig überwunden werden muss. Und vielleicht war echte Balance nie darum, Zeit perfekt zu managen. Vielleicht war es darum zu lernen, mit dem Nervensystem zu arbeiten statt dauerhaft gegen es zu kämpfen.",
    ],
  },
];

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
  const { tx, lang } = useLanguage();
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles = lang === "de" ? journalArticlesDe : journalArticlesEn;
  const featured = articles[0];

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
    const hash = window.location.hash.substring(1);
    if (hash) {
      const article = articles.find((a) => a.id === hash);
      if (article) setActiveArticle(article);
    }
  }, [articles]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
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
            <span>{tx.journal.heroKicker}</span>
          </div>
          <h1 className="reveal mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.92] tracking-tight text-balance max-w-5xl">
            {tx.journal.heroH1a} <em className="italic font-normal text-primary">{tx.journal.heroH1b}</em>{" "}
            {tx.journal.heroH1c}
          </h1>
          <p className="reveal mt-8 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
            {tx.journal.heroDesc}
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors"
            >
              {tx.journal.heroCta1}
            </a>
            <Link
              to="/refill"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-foreground/20 hover:bg-foreground/5 transition-colors"
            >
              {tx.journal.heroCta2}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-mono text-foreground/70 hover:text-foreground transition-colors ml-2"
            >
              {tx.journal.heroCta3}
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-y border-border bg-background/70 backdrop-blur-sm sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground shrink-0 mr-3">
            {tx.journal.sectionsLabel}
          </span>
          {tx.journal.categories.map((c, i) => (
            <a
              key={c}
              href={CATEGORY_LINKS[i]?.href ?? "#featured"}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* EDITOR'S LETTER */}
      <section className="px-6 md:px-10 py-28 md:py-40 max-w-4xl mx-auto">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
          {tx.journal.editorKicker}
        </p>
        <p className="reveal mt-8 font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
          {tx.journal.editorBody}
        </p>
        <p className="reveal mt-10 text-muted-foreground text-base md:text-lg max-w-2xl">
          {tx.journal.editorBodySub}
        </p>
      </section>

      {/* FEATURED */}
      <section id="featured" className="px-6 md:px-10 pb-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {tx.journal.coverEssueLabel}
            </p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight">
              {tx.journal.coverH2}
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
              {tx.journal.readCoverEssay}
            </button>
          </div>
        </article>
      </section>

      {/* PULL QUOTE */}
      <section className="relative py-32 md:py-48 bg-secondary/50">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <span className="font-display text-primary text-7xl leading-none">"</span>
          <p className="reveal mt-4 font-display text-3xl md:text-5xl leading-[1.2] tracking-tight text-balance">
            {tx.journal.pullQuote}
          </p>
          <p className="reveal mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {tx.journal.pullQuoteSource}
          </p>
        </div>
      </section>

      {/* EDITORIAL GRID */}
      <section className="px-6 md:px-10 py-28 max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight max-w-md text-balance">
            {tx.journal.gridH2}
          </h2>
          <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {tx.journal.springLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[articles[1], articles[2]].map((p) => (
            <ArticleCard key={p.id} article={p} ratio="aspect-[4/5]" onOpen={setActiveArticle} />
          ))}
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {[articles[3], articles[4]].map((p, i) => (
            <ArticleCard
              key={p.id}
              article={p}
              ratio={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
              className={i === 1 ? "md:mt-20" : ""}
              onOpen={setActiveArticle}
            />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary mb-8">
            {tx.journal.shorterNotes}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[articles[5], articles[6], articles[7]].map((p) => (
              <ArticleCard key={p.id} article={p} ratio="aspect-[4/5]" compact onOpen={setActiveArticle} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 md:py-48 overflow-hidden border-t border-border">
        <div className="absolute inset-0 -z-10">
          <img src={journalStillife} alt="" aria-hidden className="h-full w-full object-cover opacity-25" loading="lazy" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
            {tx.journal.continueKicker}
          </p>
          <h2 className="reveal mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance">
            {tx.journal.continueH2}
          </h2>
          <p className="reveal mt-8 text-muted-foreground text-base md:text-lg leading-relaxed">
            {tx.journal.continueDesc}
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="reveal mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder={tx.journal.newsletterPlaceholder}
              className="flex-1 bg-background border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
            />
            <button className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:bg-primary transition-colors">
              {tx.journal.newsletterCta}
            </button>
          </form>

          <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/refill" className="hover:text-foreground transition-colors">
              {tx.common.exploreSystem} →
            </Link>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              {tx.common.shopCta} →
            </Link>
            <a href="#featured" className="hover:text-foreground transition-colors">
              {tx.journal.continueReadingLink}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {activeArticle && (
        <ArticleModal article={activeArticle} articles={articles} onClose={() => setActiveArticle(null)} />
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
  articles,
  onClose,
}: {
  article: Article;
  articles: Article[];
  onClose: () => void;
}) {
  const { tx } = useLanguage();
  const index = articles.findIndex((a) => a.id === article.id) + 1;
  const total = articles.length;
  const displayIndex = index.toString().padStart(2, "0");
  const displayTotal = total.toString().padStart(2, "0");

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
            <span>{tx.journal.modalIssue}</span>
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
              {tx.journal.journalVolumeLine}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] hover:text-primary"
            >
              {tx.common.close}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
