import journalFeatured from "@/assets/journal-featured.jpg";
import journalRitual from "@/assets/journal-ritual.jpg";
import journalMorning from "@/assets/journal-morning.jpg";
import journalCafe from "@/assets/journal-cafe.jpg";
import journalTrain from "@/assets/journal-train.jpg";

export type JournalArticle = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  dek: string;
  image: string;
  issue?: string;
  paragraphs: string[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "your-attention-span-isnt-broken",
    issue: "Issue 04 · Cover essay",
    category: "Focus",
    date: "May 2026",
    readTime: "9 min",
    title: "Your attention span isn't broken.",
    dek: "The way modern life is designed — endless inputs, endless tabs, endless small emergencies — was never something a nervous system was supposed to hold. A quieter way of working is not a productivity hack. It's recovery.",
    image: journalFeatured,
    paragraphs: [
      "Somewhere along the way, we accepted a quiet lie: that the reason we can't sit with a thought anymore is a personal failing. A weakness of will. A character flaw to be optimised away with another app, another timer, another method. But the truth is far gentler, and far more honest. Your attention is not broken. It is simply being asked, every minute of every day, to do something it was never built to do — to hold the weight of an entire internet, all at once, all in the foreground.",
      "Modern life runs on small emergencies. A notification is an emergency. An unread message is an emergency. A half-finished tab is an emergency. None of these are real, but the nervous system does not know that. It treats each tiny ping the same way it would treat a sound in the dark — with a small pulse of alertness, a small tightening, a small interruption of whatever calm was beginning to settle. Stack a few thousand of those across a day, and you don't have a focus problem. You have a recovery problem.",
      "The places where attention used to feel effortless — libraries, long mornings, analog desks, a quiet train window — were never magical. They were simply environments that asked one thing of you at a time. They allowed the mind to do what minds naturally do when nothing is interrupting them: drift, settle, deepen, return. A quieter way of working is not about discipline. It is about giving the nervous system a room it recognises again. A surface with one object on it. A page with one sentence. A glass with one tablet, slowly dissolving, asking nothing of you for sixty seconds.",
      "That, in the end, is what a ritual is for. Not productivity. Not optimisation. Just a small, repeatable signal to the body that the day will not, in fact, be a continuous emergency. VYTAL is built around that signal — a calm anchor in a loud morning, a moment that belongs to no app and no inbox. Your attention will come back. It always does. It just needs the room.",
    ],
  },
  {
    slug: "the-myth-of-the-productive-crash",
    category: "Recovery",
    date: "May 18, 2026",
    readTime: "6 min",
    title: "The myth of the productive crash.",
    dek: "Why the cycle of spikes and collapses isn't a personality trait — and what calmer energy actually looks like across a real week.",
    image: journalRitual,
    paragraphs: [
      "There is a particular kind of tiredness that doesn't feel like tiredness at all. It feels like irritation. Like a short fuse at 4 p.m., a sudden flatness around a screen, a strange emptiness halfway through a sentence. We have learned to call this normal. We have learned to call it our personality. In fact, it is almost always the back half of a chemical wave we started earlier in the day — a wave we mistook for energy.",
      "Classic energy drinks are engineered for the first half of that wave. A large hit of caffeine, often well past 150 milligrams, paired with a sharp rush of sugar and a long list of additives whose only job is to make the rush feel brighter. For an hour, it works. The world sharpens. The to-do list looks possible. Then the curve turns. Blood sugar drops. Adrenaline retreats. The body, which was asked to perform an emergency response for no real emergency, sends the bill. We call it the 4 p.m. cliff and treat it as weather. It is not weather. It is the predictable second half of a decision we made at 10 a.m.",
      "Calmer energy looks almost boring on a graph. A gentle climb, a long plateau, a soft descent. No cliff. No crash. No sudden hunger for something sweet at 3:47 p.m. just to feel human again. It comes from smaller doses of caffeine, paired with amino acids like L-theanine that round the edges, and from hydration and electrolytes that keep the system quietly supplied instead of jolted. It is less dramatic. It is also, across a real week, the difference between finishing the day with something left over and finishing it with nothing.",
      "We did not build VYTAL to make you feel more. We built it to make the second half of your day feel like the first. A flatter curve. A longer plateau. An afternoon that doesn't ask you to apologise for being a person.",
    ],
  },
  {
    slug: "designing-calmer-mornings",
    category: "Rituals",
    date: "May 11, 2026",
    readTime: "4 min",
    title: "Designing calmer mornings.",
    dek: "Not 5 a.m. wake-ups. Not ice baths. Three small, repeatable shifts that change the temperature of a day.",
    image: journalMorning,
    paragraphs: [
      "Most morning advice asks you to become a different person before breakfast. Wake at five. Plunge into cold water. Journal three pages. Meditate twenty minutes. Read forty. It is a beautiful idea for someone else's life. For most of us, the morning is not a stage. It is a soft, fragile hour where the day is still deciding what it will be — and the smallest shifts decide the most.",
      "The first shift is the simplest one, and the hardest. Do not let the phone be the first surface you touch. Anything else will do. A glass of water. A window. A jumper pulled over your head without checking the weather first. The first input of the morning sets the volume for everything that follows, and a screen full of strangers' emergencies is a loud first input.",
      "The second shift is to drink something before you eat anything. A full glass of water, ideally with a little structure — minerals, electrolytes, a slowly dissolving tablet you can watch for a moment. The body wakes up dehydrated. It is also, for that brief window, unusually receptive — and a small ritual at this hour quietly becomes a daily one, not because you forced it, but because it felt good.",
      "The third shift is to give yourself one analog minute before the laptop opens. Stand at a window. Sit with the cup. Tie shoelaces slowly. It sounds embarrassingly small. It is. That is the point. The day will be full of things that demand. A calm morning is built from things that do not.",
    ],
  },
  {
    slug: "a-quiet-hour-inside-a-loud-internet",
    category: "Digital Overload",
    date: "May 03, 2026",
    readTime: "7 min",
    title: "A quiet hour inside a loud internet.",
    dek: "Notes on building one un-interrupted hour a day — and why it matters more than any productivity system.",
    image: journalCafe,
    paragraphs: [
      "Most of what passes for productivity is, on closer look, a kind of bargaining with interruption. We do not work; we work between things. A paragraph, a ping, a paragraph, a tab. By the end of the morning, we have moved through a great deal of activity and produced very little of it. The honest measure is not how many hours we sat at the desk, but how many of those hours were ours, undivided.",
      "Deep work — the kind that builds something, the kind that solves something — is not a personality trait of the very disciplined. It is a feature of a particular environment: one input, one surface, one window of time long enough for the mind to drop below the surface of itself. Even sixty minutes is enough. Even forty. The problem is that we no longer protect them; we leak them, by default, to whatever asks first.",
      "Protecting an hour is a small act of architecture. Notifications closed at the source, not silenced one by one. A single tab. A single document. A timer that does not nag, just keeps the boundary. Tell the people who matter that you are unreachable for sixty minutes — they will, almost always, simply wait. Most of what we treat as urgent is patient, if we ask it to be.",
      "What returns, in that hour, is something we have nearly forgotten: the feeling of a mind in motion without an audience. No metrics. No streaks. Just one quiet hour in which the work, and the person doing it, get to meet. Build that one hour. Defend it gently. The rest of the day will reorganise itself around what you decided was non-negotiable.",
    ],
  },
  {
    slug: "meetings-screens-and-the-3-pm-dip",
    category: "Modern Work",
    date: "Apr 12, 2026",
    readTime: "6 min",
    title: "Meetings, screens, and the 3 p.m. dip.",
    dek: "A quiet survival kit for office afternoons without the burnout.",
    image: journalTrain,
    paragraphs: [
      "The afternoon dip is not a bug in you. It is a feature of a body that has spent six hours sitting still, looking at a rectangle, and performing alertness for other rectangles. By three, the nervous system has been politely asking for a break since at least one. By three, the request is no longer polite.",
      "Back-to-back meetings are particularly costly, because they remove the small recoveries that used to happen by accident: the walk to a room, the wait by a kettle, the thirty seconds of looking at nothing. The calendar has compressed those out. The body still needs them. Without them, attention starts to fray in ways that look, from the inside, like incompetence — and from the outside, like irritability.",
      "The survival kit is almost embarrassingly low-tech. Stand up between calls, even for ninety seconds. Look at something further than two metres away. Drink a full glass of water that you actually noticed drinking. If you can, take one call without the camera, walking slowly somewhere quiet — the conversation will be better, not worse. Add, somewhere in the slump, a smaller dose of calm caffeine: enough to lift the curve, not enough to start a second one.",
      "None of this is a productivity hack. It is just the polite version of what your body would have done on its own, in an earlier century, without being asked. The 3 p.m. you, with a little water, a little air, and a little less stimulation, is the same person who started the day with everything in front of them. They are still in there. They just need the room to come back.",
    ],
  },
];

export const getArticleBySlug = (slug: string) =>
  journalArticles.find((a) => a.slug === slug);