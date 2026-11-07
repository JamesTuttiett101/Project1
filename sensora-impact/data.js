/*
  SENSORA impact page: all facts and figures live in this file.

  To change something on the page, edit the text between the quotes below,
  save the file, and refresh the page. You never need to touch index.html.

  Rules (from the build brief):
  - Only add facts that are confirmed and approved for public use.
  - Leave a list empty [] rather than guessing. Empty sections hide themselves.
  - Never add donor names, prices, sponsor prospects or private notes here.
    This file is public.
*/
window.SENSORA_DATA = {
  meta: {
    lastUpdated: "2026-11-07",
    approvalBanner: "Needs Charity approval before use"
  },

  // Section A: the headline money figure. Display wording only, never an exact sum.
  moneyRaised: {
    display: "over £200,000",
    caption: "raised at SENSORA 2026, in support of The Brain Tumour Charity",
    source: { label: "Founder confirmation", date: "2026-10-27" }
  },

  // What SENSORA has achieved: verified facts about the 2026 night.
  achievements: [
    { value: "5 May 2026", label: "First SENSORA night, HERE at Outernet, London",
      source: { label: "The Brain Tumour Charity story page", date: "2026-04-15" } },
    { value: "300", label: "Guests on the night",
      source: { label: "SENSORA 2027 partner materials", date: "2026-11-05" } },
    { value: "6 courses", label: "One course for each of the senses",
      source: { label: "The Brain Tumour Charity story page", date: "2026-04-15" } },
    { value: "BICEP", label: "Music for the night",
      source: { label: "The Brain Tumour Charity story page", date: "2026-04-15" } }
  ],

  // Section B: ways to help. Add only Charity-approved items, for example:
  // { type: "Host a table", title: "...", text: "...", link: "https://..." }
  fundraisingOpportunities: [],

  // Section C: research support the Charity has approved for listing.
  researchOpportunities: [],

  // Section D: founders' story, from the Charity's published article only.
  story: {
    quote: "Our story is simple, and it's brutal.",
    quoteBy: "James Tuttiett",
    articleUrl: "https://www.thebraintumourcharity.org/news/high-profile-supporter/sensora-mark-james-story/",
    source: { label: "The Brain Tumour Charity story page", date: "2026-04-15" },
    beats: [
      { title: "Why", text: "Brothers Mark and James Tuttiett lost both their parents to glioblastoma." },
      { title: "The challenge", text: "James had already raised money through sporting events. He challenged Mark to do more, and together they devised a fine dining and music night." },
      { title: "The Charity", text: "They took the idea to The Brain Tumour Charity, who created SENSORA with them and the creative agency VCCP." },
      { title: "5 May 2026", text: "The first SENSORA night at HERE at Outernet: six courses, each built around one of the senses, with BICEP." },
      { title: "8 June 2027", text: "SENSORA returns to HERE at Outernet, with Fatboy Slim." }
    ],
    video: {
      src: "assets/video/mark-and-james.mp4",
      poster: "assets/video/mark-and-james-poster.webp",
      captions: "",  // add "assets/video/mark-and-james.vtt" once the caption file exists
      title: "Mark and James on why SENSORA exists"
    }
  },

  // Section E: chefs. "image" is optional; without it the page shows a text card.
  // "recognition" is shown only when verified. Never add one for Fallow.
  chefs2027: [
    { name: "Mark Tuttiett", role: "SENSORA co-founder and curator; Head Chef, Da Terra, London", recognition: "Two Michelin stars", image: "assets/chefs/chef-tuttiett.webp", lead: true },
    { name: "Gareth Ward", role: "Chef patron, Ynyshir, Wales", recognition: "Two Michelin stars", image: "assets/chefs/chef-ward.webp" },
    { name: "Lisa Goodwin-Allen", role: "Chef patron-director, Northcote, Lancashire", recognition: "One Michelin star", image: "assets/chefs/chef-goodwin-allen.webp" },
    { name: "Nicolai Tram", role: "Chef and co-owner, Knystaforsen, Sweden", recognition: "One Michelin star and a Michelin Green Star", image: "assets/chefs/chef-tram.webp" },
    { name: "Mark Donald", role: "Executive Chef, The Glenturret Lalique Restaurant, Scotland", recognition: "Two Michelin stars", image: "assets/chefs/chef-donald.webp" },
    { name: "Cal Byerley", role: "Chef and co-owner, Restaurant Pine, Northumberland", recognition: "One Michelin star", image: "assets/chefs/chef-byerley.webp" },
    { name: "Will Murray and Jack Croft", role: "Co-founders, Fallow, London", recognition: "", image: "assets/chefs/chef-fallow.webp", wide: true }
  ],
  chefs2026: [
    { name: "Mark Tuttiett", role: "SENSORA co-founder and curator", image: "assets/chefs/chef-tuttiett.webp", lead: true },
    { name: "Cal Byerley", role: "", image: "assets/chefs/chef-byerley.webp" },
    { name: "Holly Middleton-Joseph", role: "", image: "assets/chefs/chef-middleton-joseph.webp" },
    { name: "Mark Donald", role: "", image: "assets/chefs/chef-donald.webp" },
    { name: "Will Murray", role: "Fallow, London", image: "" },
    { name: "Tom Brown", role: "", image: "assets/chefs/chef-brown.webp" }
  ],
  chefsSource2027: { label: "SENSORA 2027 partner materials", date: "2026-11-05" },
  chefsSource2026: { label: "The Brain Tumour Charity story page", date: "2026-04-15" },

  music: { y2026: "BICEP", y2027: "Fatboy Slim" },

  nextEvent: {
    date: "Tuesday 8 June 2027",
    venue: "HERE at Outernet, London",
    music: "Fatboy Slim",
    previewUrl: "/sensora-2027/"
  },

  film: {
    url: "https://next.frame.io/share/d02fbf81-63c4-4e5b-9a96-8e70b0c965d8/view/b9c912db-438a-4184-9457-5c2ebfe29d7c",
    image: "assets/img/2026-room.webp"
  },

  charitySupport: {
    phone: "0808 800 0004",
    url: "https://www.thebraintumourcharity.org"
  },

  howBuilt: [
    "Brief prepared with AI assistance from approved SENSORA facts.",
    "Page built with Claude, working in this site's code on a separate branch, on a plain HTML, CSS and JavaScript stack.",
    "Every figure lives in one editable file, so updates need no coding.",
    "Facts, privacy and wording reviewed by people, with Charity approval before public sharing.",
    "Hosted as an unlisted page on the existing GitHub Pages site, with no paid services."
  ]
};
