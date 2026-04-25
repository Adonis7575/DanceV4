import { useState, useEffect, useRef, useCallback, useMemo, Component } from "react";

/* ══════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════ */
const Ic = {
  Home:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Book:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Music:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Chart:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Users:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Play:(p)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>,
  Pause:(p)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Check:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Lock:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Send:(p)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  Heart:(p)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Camera:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Back:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Right:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Bot:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  Zap:(p)=><svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
  X:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Refresh:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  Plus:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
  Trophy:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6m12 0h1.5a2.5 2.5 0 010 5H18M8 21h8m-4-4v4M3 3h18v8a9 9 0 01-18 0V3z"/></svg>,
  Target:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Upload:(p)=><svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
};
const ic = (C, s=20) => <C style={{width:s,height:s}}/>;

/* ══════════════════════════════════════════════
   DVIDA BRONZE SYLLABUS
══════════════════════════════════════════════ */
const DVIDA = {
  smooth: {
    waltz:    { id:"waltz",    name:"Waltz",           style:"American Smooth", emoji:"🌙", color:"#1a3a5c", bpm:84,  tempo:"3/4", timing:"1-2-3",           level:"beginner",     desc:"Elegant flowing dance in 3/4 time with rise & fall", songs:["Moon River","La Vie En Rose","Can't Help Falling in Love","A Thousand Years","The Way You Look Tonight"], levels:{ "Bronze I":["Box Step (Straight)","Box with Underarm Turn","Progressive","Left Turning Box","Right Turning Box"], "Bronze II":["Balance Steps","Balance and Box","Simple Twinkle","Two-Way Underarm Turn","Face to Face / Back to Back"], "Bronze III":["Reverse Turn","Natural Turn","Progressive Twinkles","Turning Twinkles"], "Full Bronze":["Grapevine","Promenade Chassé","Fallaway and Box","Twinkle and Weave"] }},
    foxtrot:  { id:"foxtrot",  name:"Foxtrot",         style:"American Smooth", emoji:"🎩", color:"#2d1b4e", bpm:120, tempo:"4/4", timing:"Slow-Quick-Quick", level:"intermediate", desc:"Smooth progressive movement across the floor",           songs:["Fly Me to the Moon","The Way You Look Tonight","Cheek to Cheek","Isn't She Lovely","Come Fly With Me"],   levels:{ "Bronze I":["Basic","Promenade","Rock Turn to Left","Rock Turn to Right"], "Bronze II":["Sway Step","Promenade Underarm Turn","Sway Underarm Turn","Zig Zag In Line","Zig Zag Outside Partner","Box Step"], "Bronze III":["Twinkle","Fallaway Twinkles","Promenade Twinkles","Turning Twinkles to Outside Partner"], "Full Bronze":["Grapevine","Promenade Twist","Promenade Pivot","Running Steps in Basic Rhythm","Running Steps in Box Rhythm"] }},
    tango:    { id:"tango",    name:"Tango",            style:"American Smooth", emoji:"🌹", color:"#5c1a1a", bpm:132, tempo:"2/4", timing:"S-S-Q-Q-S",        level:"intermediate", desc:"Sharp staccato movement with dramatic flair",            songs:["La Cumparsita","Por Una Cabeza","El Choclo","Roxanne (Tango)","Libertango"],                             levels:{ "Bronze I":["Straight Basic","Curving Basic","Promenade Turning Left","Promenade Turning Right","Single Corté","Double Corté"], "Bronze II":["Progressive Rocks","Open Fan","Open Fan with Underarm Turn","Running Steps","Checked Promenade"], "Bronze III":["Reverse Turn","Reverse Turn with Outside Swivel","Right Side Fans","Contra Rocks","Continuous Left Rock Turn"], "Full Bronze":["Twist Turn to the Right","Check and Corté","Promenade Pivot","Oversway"] }},
    vwaltz:   { id:"vwaltz",   name:"Viennese Waltz",  style:"American Smooth", emoji:"💫", color:"#0d3b3b", bpm:180, tempo:"3/4", timing:"1-2-3",           level:"advanced",     desc:"Fast continuous turning waltz",                          songs:["The Blue Danube","Edelweiss","An der schönen blauen Donau","Kiss Me","Vienna"],                         levels:{ "Bronze I":["Balance Steps","Fifth Position Breaks","Fifth Position Breaks with Underarm Turn"], "Bronze II":["Reverse Turn","Closed Twinkle"], "Bronze III":["Crossbody Lead","Crossbody Lead with Underarm Turn","Hand to Hand","Forward Progressive Changes","Backward Progressive Changes"], "Full Bronze":["Right Turn","Change of Place","Curtsey & Bow"] }},
  },
  rhythm: {
    rumba:  { id:"rumba",  name:"Rumba",           style:"American Rhythm", emoji:"❤️", color:"#4a0e2e", bpm:100, tempo:"4/4", timing:"2-3-4-1",        level:"beginner",     desc:"Slow romantic dance of love through Cuban motion", songs:["Could You Be Loved","Smooth","Quizás Quizás Quizás","Bésame Mucho","Island in the Sun"],       levels:{ "Bronze I":["Side Basic","Fifth Position","Box Step"], "Bronze II":["Cross Body Lead","Outside Partner","Slow Underarm Turn","Open Break Underarm Turn"], "Bronze III":["Crossover Break","Crossover & Side Rocks","Open Rumba Walks","Turning Twinkles"], "Full Bronze":["Cradle Circle","Quick Underarm Turn & Loop","Open Circular Walks","Spot Turn Combination"] }},
    chacha: { id:"chacha", name:"Cha-Cha",         style:"American Rhythm", emoji:"💃", color:"#5c3a1a", bpm:120, tempo:"4/4", timing:"2-3-cha-cha-1", level:"beginner",     desc:"Playful, flirtatious Cuban rhythm",                songs:["Oye Como Va","Smooth","La Vida Es Un Carnaval","Conga","Mambo No. 5"],                           levels:{ "Bronze I":["Basics in Place","Side Basic","Progressive Basic"], "Bronze II":["Outside Partner","Crossover Break","Cross Body Lead","Open Break & Underarm Turn"], "Bronze III":["Chase Turn","Shoulder Check","Shadow Positions","Butterfly"], "Full Bronze":["Alternating Underarm Turns","Cross Body Pull Back","Three Cha Chas","Crossover Flick to Side Break"] }},
    ecs:    { id:"ecs",    name:"East Coast Swing", style:"American Rhythm", emoji:"🕺", color:"#1a4a1a", bpm:176, tempo:"4/4", timing:"1-2-rock-step",  level:"beginner",     desc:"High-energy bouncy swing dance",                   songs:["Rock Around the Clock","Johnny B. Goode","Jump Jive an' Wail","Sing Sing Sing","In the Mood"],   levels:{ "Bronze I":["Basic","Basic Turning Right","Basic Turning Left","Throwout"], "Bronze II":["Underarm Turn","Underarm Release from Basic","Tuck In – Handshake","Tuck In – Double Handhold with Free Spin","Tuck In – Double Handhold with Underarm Turn"], "Bronze III":["Alternating Underarm Turns","Shoulder Check","Cradle","Cradle to Hammerlock"], "Full Bronze":["Sugar Push Throw Out","Double Face Loop","Opposition Break & Roll Out","Whirlpool"] }},
    samba:  { id:"samba",  name:"Samba",            style:"American Rhythm", emoji:"🎭", color:"#4a3a0e", bpm:100, tempo:"2/4", timing:"1-a-2",          level:"intermediate", desc:"Rhythmic Brazilian carnival dance",                songs:["The Girl from Ipanema","Mas Que Nada","Brazil","Samba de Janeiro","Livin' la Vida Loca"],          levels:{ "Bronze I":["Basic Bounce (exercise)","Forward & Back Basic","Side to Side Basic"], "Bronze II":["Fifth Position","The Box","Extended Box","Samba Walks"], "Bronze III":["Forward & Back Spiral","Reverse Samba Walk","Promenade & Counter Promenade Bota Fogos","Opening Out Left & Right"], "Full Bronze":["Rolling Box","Volta to Left & Right","Open Break","Advanced Left Turn"] }},
    bolero: { id:"bolero", name:"Bolero",           style:"American Rhythm", emoji:"🕯️", color:"#3a1a4a", bpm:96,  tempo:"4/4", timing:"Slow-Quick-Quick",level:"intermediate", desc:"Slowest and most romantic Rhythm dance",           songs:["Bésame Mucho","Perhaps Perhaps Perhaps","Quizás Quizás Quizás","Sabor a Mí","Historia de un Amor"], levels:{ "Bronze I":["Basic Movement","Open Break Underarm Turn"], "Bronze II":["Underarm Pass","Left Side Pass"], "Bronze III":["Crossover Break","Check & Circular Walks","Romantic Sways"], "Full Bronze":["Checked Underarm Pass","Spot Turn Combination","Hip Twist & Spin"] }},
    mambo:  { id:"mambo",  name:"Mambo",            style:"American Rhythm", emoji:"🥁", color:"#4a1a1a", bpm:188, tempo:"4/4", timing:"2-3-4-1",        level:"intermediate", desc:"Fiery staccato Cuban dance",                       songs:["Mambo No. 5","Oye Como Va","Guantanamera","Tequila","Ran Kan Kan"],                               levels:{ "Bronze I":["Forward & Back Basic","Side Breaks","Side Breaks & Cross"], "Bronze II":["Cross Body Lead","Open Break Underarm Turn","Crossover Break & Walk Around","Shoulder Check"], "Bronze III":["Promenade Swivel & Close","Alternating Underarm Turns","Rueda Basic","Cross Body Lead with Inside Turn"], "Full Bronze":["Back Spot Turn","Mambo Twist","Forward Spot Turn to Surprise","Crossover Swivels & Pullback"] }},
  }
};

const ALL_DANCES = [...Object.values(DVIDA.smooth), ...Object.values(DVIDA.rhythm)];
const BRONZE_LEVELS = ["Bronze I","Bronze II","Bronze III","Full Bronze"];
const UNLOCK_THRESHOLD = 0.8;
const CHAT_HISTORY_LIMIT = 10; // max messages sent to API

/* ══════════════════════════════════════════════
   API HELPERS
══════════════════════════════════════════════ */
const SUPA_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const SYSTEM = `You are an elite DVIDA-certified ballroom dance coach specializing in American Smooth (Waltz, Foxtrot, Tango, Viennese Waltz) and American Rhythm (Rumba, Cha-Cha, East Coast Swing, Samba, Bolero, Mambo). You follow the DVIDA Bronze syllabus precisely.
Your personality: Warm, encouraging, technically precise, passionate. Give specific, actionable feedback using correct DVIDA terminology. Be concise — dancers read on mobile between sessions.`;

async function callAI(messages, sys=SYSTEM, max=1000) {
  const r = await fetch("/api/chat", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ messages, system:sys, max_tokens:max })
  });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n") || "";
}

async function visionAI(b64) {
  const r = await fetch("/api/vision", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ imageData:b64 })
  });
  if (!r.ok) throw new Error(`Vision error ${r.status}`);
  return r.json();
}

/* ══════════════════════════════════════════════
   STORAGE
══════════════════════════════════════════════ */
const load = async (k, shared=false) => {
  try {
    if (shared) {
      if (!SUPA_URL) return null;
      const r = await fetch(`${SUPA_URL}/rest/v1/community_posts?order=created_at.desc&limit=50`, {
        headers: { apikey:SUPA_KEY, Authorization:`Bearer ${SUPA_KEY}` }
      });
      return r.ok ? r.json() : null;
    }
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : null;
  } catch(e) { return null; }
};

const save = async (k, v, shared=false) => {
  try {
    if (shared) return;
    localStorage.setItem(k, JSON.stringify(v));
  } catch(e) {}
};

/* ══════════════════════════════════════════════
   PROGRESS DEFAULTS & BADGES
══════════════════════════════════════════════ */
const DEF = {
  xp:0, level:1, streak:0, lastPractice:null, userName:"",
  completedFigures:{}, earnedBadges:[], drillsCompleted:0,
  metronomeSessions:0, postsCount:0, practiceMinutes:0,
  aiChats:0, analysisCount:0, articlesRead:0,
  quizScore:{correct:0, total:0}, dailyLog:{}, routine:[],
  dailyGoalMinutes:15, challengeDoneDate:null,
  onboarded:false,
};

function pctLevel(danceId, lvl, prog) {
  const dance = ALL_DANCES.find(d=>d.id===danceId);
  if (!dance) return 0;
  const figs = dance.levels[lvl] || [];
  if (!figs.length) return 0;
  return figs.filter(f=>prog.completedFigures[`${danceId}::${lvl}::${f}`]).length / figs.length;
}

function isLevelUnlocked(danceId, lvl, prog) {
  const idx = BRONZE_LEVELS.indexOf(lvl);
  if (idx === 0) return true;
  return pctLevel(danceId, BRONZE_LEVELS[idx-1], prog) >= UNLOCK_THRESHOLD;
}

// Stable UID based on first practice date (set once, never changes)
function getUserId(prog) {
  return `dancer-${prog.lastPractice || "new"}-${Object.keys(prog.completedFigures).length}`;
}

const BADGES = [
  {id:"first",       name:"First Step",     icon:"👣", desc:"Complete your first figure",       check:p=>Object.keys(p.completedFigures).length>=1},
  {id:"bronze1_waltz",name:"Waltz Bronze I", icon:"🌙", desc:"Complete all Waltz Bronze I",      check:p=>pctLevel("waltz","Bronze I",p)>=1},
  {id:"bronze1_tango",name:"Tango Bronze I", icon:"🌹", desc:"Complete all Tango Bronze I",      check:p=>pctLevel("tango","Bronze I",p)>=1},
  {id:"bronze1_cha",  name:"Cha-Cha Bronze I",icon:"💃",desc:"Complete all Cha-Cha Bronze I",   check:p=>pctLevel("chacha","Bronze I",p)>=1},
  {id:"bronze1_rumba",name:"Rumba Bronze I", icon:"❤️", desc:"Complete all Rumba Bronze I",     check:p=>pctLevel("rumba","Bronze I",p)>=1},
  {id:"streak3",     name:"Hat Trick",       icon:"🔥", desc:"3-day practice streak",           check:p=>p.streak>=3},
  {id:"streak7",     name:"Weekly Warrior",  icon:"⚔️", desc:"7-day practice streak",           check:p=>p.streak>=7},
  {id:"drills10",    name:"Drill Master",    icon:"💪", desc:"Complete 10 drills",              check:p=>p.drillsCompleted>=10},
  {id:"quiz20",      name:"Scholar",         icon:"🎓", desc:"Answer 20 quiz questions",        check:p=>(p.quizScore?.total||0)>=20},
  {id:"quiz80",      name:"Ace",             icon:"🏅", desc:"80%+ quiz accuracy (min 10)",     check:p=>(p.quizScore?.total||0)>=10&&((p.quizScore?.correct||0)/(p.quizScore?.total||1))>=0.8},
  {id:"routine",     name:"Choreographer",   icon:"🎬", desc:"Build a 5+ figure routine",       check:p=>p.routine.length>=5},
  {id:"community",   name:"Social Dancer",   icon:"🦋", desc:"Post in the community",           check:p=>p.postsCount>=1},
  {id:"analysis3",   name:"Self-Aware",      icon:"📸", desc:"Complete 3 analyses",             check:p=>p.analysisCount>=3},
  {id:"fullbronze",  name:"Full Bronze",     icon:"🥇", desc:"Complete any Full Bronze level",  check:p=>ALL_DANCES.some(d=>pctLevel(d.id,"Full Bronze",p)>=1)},
  {id:"century",     name:"Centurion",       icon:"💎", desc:"Earn 100 XP",                     check:p=>p.xp>=100},
];

/* ══════════════════════════════════════════════
   METRONOME HOOK
══════════════════════════════════════════════ */
function useMet() {
  const [on, setOn] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(-1);
  const [ts, setTs] = useState(4);
  const iv = useRef(null), ctx = useRef(null);

  const click = useCallback((acc) => {
    if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    const c = ctx.current, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.frequency.value = acc ? 1000 : 700;
    g.gain.setValueAtTime(acc ? 0.5 : 0.3, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
    o.start(c.currentTime); o.stop(c.currentTime + 0.08);
  }, []);

  const start = useCallback(() => {
    setOn(true); let b = 0;
    const tick = () => { click(b===0); setBeat(b); b = (b+1) % ts; };
    tick(); iv.current = setInterval(tick, 60000/bpm);
  }, [bpm, ts, click]);

  const stop = useCallback(() => {
    setOn(false); setBeat(-1);
    if (iv.current) clearInterval(iv.current);
  }, []);

  const restart = useCallback(() => { stop(); setTimeout(start, 30); }, [stop, start]);

  useEffect(() => () => { if (iv.current) clearInterval(iv.current); }, []);
  return { on, bpm, setBpm, beat, ts, setTs, start, stop, restart };
}

/* ══════════════════════════════════════════════
   CSS — injected once at top level
══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07090f;--s1:rgba(255,255,255,.04);--s2:rgba(255,255,255,.07);
  --bdr:rgba(255,255,255,.07);--gold:#c9a84c;--gold2:#f0d478;
  --txt:#ddd8cc;--txt2:rgba(221,216,204,.55);--txt3:rgba(221,216,204,.28);
  --grn:#6abf7b;--red:#cf6b6b;--blu:#6b9ecf;--purp:#9b7ecf;
  --serif:'Cormorant Garamond',Georgia,serif;--sans:'Outfit',system-ui,sans-serif;
  --r:14px;
}
::-webkit-scrollbar{width:0}
body{background:var(--bg);color:var(--txt);font-family:var(--sans)}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes si{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
.gl{background:var(--s1);backdrop-filter:blur(16px);border:1px solid var(--bdr);border-radius:var(--r)}
.gold{background:linear-gradient(135deg,var(--gold),var(--gold2),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:sh 4s linear infinite}
.btn{border:none;cursor:pointer;font-family:var(--sans);transition:all .18s;border-radius:var(--r)}
.btn:active{transform:scale(.96)}
.card{border-radius:var(--r);transition:transform .2s,box-shadow .2s;cursor:pointer}
.card:active{transform:scale(.97)}
.spin{width:18px;height:18px;border:2px solid var(--bdr);border-top-color:var(--gold);border-radius:50%;animation:spin .6s linear infinite;display:inline-block}
input,textarea{font-family:var(--sans);outline:none;border-radius:var(--r)}
`;

/* ══════════════════════════════════════════════
   HELPERS — defined outside App (stable refs)
══════════════════════════════════════════════ */
const localDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const fmtT = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
const ago = iso => {
  const d = (Date.now()-new Date(iso))/1000;
  return d<60?"just now":d<3600?`${~~(d/60)}m ago`:d<86400?`${~~(d/3600)}h ago`:`${~~(d/86400)}d ago`;
};
const vibrate = (ms=30) => { try { navigator.vibrate?.(ms); } catch(e) {} };

/* ── Static sub-components ── */
const Row = ({children, style:s}) => <div style={{padding:"0 18px",marginBottom:20,...(s||{})}}>{children}</div>;
const Pill = ({active,children,onClick}) => (
  <button style={{padding:"7px 16px",border:`1px solid ${active?"var(--gold)":"var(--bdr)"}`,background:active?"rgba(201,168,76,.12)":"transparent",color:active?"var(--gold)":"var(--txt2)",fontSize:12,fontWeight:500,borderRadius:20,cursor:"pointer",fontFamily:"var(--sans)",whiteSpace:"nowrap"}} onClick={onClick}>{children}</button>
);
const ScoreBar = ({label,val}) => (
  <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
      <span style={{textTransform:"capitalize"}}>{label}</span>
      <span style={{color:val>=80?"var(--grn)":val>=60?"var(--gold)":"var(--red)",fontWeight:700}}>{val}</span>
    </div>
    <div style={{height:5,borderRadius:3,background:"var(--s1)"}}>
      <div style={{height:"100%",borderRadius:3,width:`${val}%`,background:val>=80?"var(--grn)":val>=60?"var(--gold)":"var(--red)",transition:"width .8s ease"}}/>
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   ERROR BOUNDARY
══════════════════════════════════════════════ */
class ErrorBoundary extends Component {
  state = { error:null };
  static getDerivedStateFromError(e) { return {error:e}; }
  render() {
    if (this.state.error) return (
      <div style={{background:"var(--bg)",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,padding:24,textAlign:"center"}}>
        <div style={{fontSize:40}}>⚠️</div>
        <div style={{fontFamily:"var(--serif)",fontSize:20,color:"var(--gold)"}}>Something went wrong</div>
        <div style={{fontSize:13,color:"var(--txt2)",lineHeight:1.5}}>{this.state.error.message}</div>
        <button onClick={()=>window.location.reload()} style={{marginTop:8,padding:"10px 24px",background:"rgba(201,168,76,.15)",border:"1px solid rgba(201,168,76,.3)",color:"var(--gold)",borderRadius:12,cursor:"pointer",fontFamily:"var(--sans)"}}>Reload App</button>
      </div>
    );
    return this.props.children;
  }
}

/* ══════════════════════════════════════════════
   BADGE TOAST
══════════════════════════════════════════════ */
function BadgeToast({badge, onDone}) {
  useEffect(() => {
    vibrate(100);
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div onClick={onDone} style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",zIndex:9999,maxWidth:320,width:"calc(100% - 36px)",animation:"slideUp .4s ease"}}>
      <div className="gl" style={{borderRadius:18,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,border:"1px solid rgba(201,168,76,.3)",boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
        <div style={{fontSize:36,animation:"pop .5s ease"}}>{badge.icon}</div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>🏆 Badge Unlocked!</div>
          <div style={{fontSize:15,fontWeight:700,fontFamily:"var(--serif)"}}>{badge.name}</div>
          <div style={{fontSize:11,color:"var(--txt2)"}}>{badge.desc}</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ONBOARDING
══════════════════════════════════════════════ */
function Onboarding({onComplete}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [pref, setPref] = useState("");

  const steps = [
    {
      title:"Welcome to Dance Coach",
      sub:"DVIDA Bronze · AI-Powered · Your pocket dance studio",
      content: (
        <div>
          <div style={{fontSize:56,textAlign:"center",marginBottom:20}}>💃</div>
          <div style={{fontSize:13,color:"var(--txt2)",textAlign:"center",lineHeight:1.7,marginBottom:24}}>
            Train with the official DVIDA Bronze syllabus. Get AI coaching, technique analysis, and personalized drills — all in your pocket.
          </div>
          <div style={{fontSize:12,color:"var(--txt3)",marginBottom:8}}>What should your coach call you?</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name..."
            onKeyDown={e=>e.key==="Enter"&&name.trim()&&setStep(1)}
            style={{width:"100%",padding:"12px 16px",background:"var(--s1)",border:"1px solid var(--bdr)",color:"var(--txt)",fontSize:15}}/>
        </div>
      ),
      canNext: name.trim().length > 0
    },
    {
      title:`Great to meet you, ${name}!`,
      sub:"Let's personalize your training",
      content: (
        <div>
          <div style={{fontSize:13,color:"var(--txt2)",marginBottom:16}}>Which style are you focusing on?</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              {k:"smooth",label:"American Smooth",sub:"Waltz · Foxtrot · Tango · Viennese Waltz",em:"🎩"},
              {k:"rhythm",label:"American Rhythm",sub:"Rumba · Cha-Cha · ECS · Samba · Bolero · Mambo",em:"💃"},
              {k:"both",  label:"Both Styles",    sub:"Full DVIDA Bronze curriculum",em:"⭐"},
            ].map(o=>(
              <div key={o.k} onClick={()=>setPref(o.k)} className="card gl" style={{padding:16,display:"flex",gap:14,alignItems:"center",border:`1px solid ${pref===o.k?"rgba(201,168,76,.4)":"var(--bdr)"}`,background:pref===o.k?"rgba(201,168,76,.08)":"var(--s1)"}}>
                <div style={{fontSize:30}}>{o.em}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:pref===o.k?"var(--gold)":"var(--txt)"}}>{o.label}</div>
                  <div style={{fontSize:11,color:"var(--txt3)",marginTop:2}}>{o.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      canNext: !!pref
    },
    {
      title:"You're all set!",
      sub:"Your journey starts now",
      content: (
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:56,marginBottom:16,animation:"pop .5s ease"}}>🏆</div>
          <div style={{fontSize:13,color:"var(--txt2)",lineHeight:1.7,marginBottom:20}}>
            Your coach is ready. Start with the <strong style={{color:"var(--gold)"}}>Today's Challenge</strong> on the home screen, or dive into the <strong style={{color:"var(--gold)"}}>DVIDA Syllabus</strong> to explore all your figures.
          </div>
          <div className="gl" style={{borderRadius:14,padding:14,textAlign:"left"}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",marginBottom:8}}>Your Training Plan:</div>
            {["Complete Bronze I figures to unlock Bronze II","Use AI drills to master each figure","Test yourself with the figure quiz","Analyze your technique with the camera"].map((t,i)=>(
              <div key={i} style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,marginBottom:4,display:"flex",gap:8}}>
                <span style={{color:"var(--gold)"}}>→</span>{t}
              </div>
            ))}
          </div>
        </div>
      ),
      canNext: true
    }
  ];

  const cur = steps[step];
  return (
    <div style={{background:"var(--bg)",minHeight:"100vh",display:"flex",flexDirection:"column",padding:"0 0 40px"}}>
      <div style={{padding:"60px 24px 20px",textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Step {step+1} of 3</div>
        <h1 style={{fontFamily:"var(--serif)",fontSize:24,fontWeight:700,marginBottom:4}}>{cur.title}</h1>
        <p style={{fontSize:12,color:"var(--txt3)"}}>{cur.sub}</p>
      </div>
      {/* Progress dots */}
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
        {[0,1,2].map(i=><div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i<=step?"var(--gold)":"var(--bdr)",transition:"all .3s"}}/>)}
      </div>
      <div style={{flex:1,padding:"0 24px"}}>{cur.content}</div>
      <div style={{padding:"24px"}}>
        <button disabled={!cur.canNext} onClick={()=>{
          if(step<2) setStep(s=>s+1);
          else onComplete(name.trim(), pref);
        }} style={{width:"100%",padding:"14px",background:cur.canNext?"linear-gradient(135deg,var(--gold),#a08030)":"var(--s1)",color:cur.canNext?"#07090f":"var(--txt3)",fontSize:15,fontWeight:700,borderRadius:16,border:"none",cursor:cur.canNext?"pointer":"default",fontFamily:"var(--sans)",transition:"all .2s"}}>
          {step<2?"Continue →":"Start Training 💃"}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("home");
  const [prog, setProg] = useState(DEF);
  const [ready, setReady] = useState(false);
  const [toastBadge, setToastBadge] = useState(null);
  const met = useMet();

  // Nav state
  const [selDance, setSelDance] = useState(null);
  const [selLevel, setSelLevel] = useState(null);
  const [subView, setSubView] = useState("metronome");
  const [styleFilter, setStyleFilter] = useState("All");

  // AI Coach
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatIn, setChatIn] = useState("");
  const [chatLoad, setChatLoad] = useState(false);
  const chatEnd = useRef(null);

  // Camera
  const [camOn, setCamOn] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const vidRef = useRef(null), canvRef = useRef(null), streamRef = useRef(null);
  const fileRef = useRef(null);

  // Drill
  const [drillOn, setDrillOn] = useState(false);
  const [drillDance, setDrillDance] = useState(null);
  const [drillFig, setDrillFig] = useState(null);
  const [drillPlan, setDrillPlan] = useState(null);
  const [drillSec, setDrillSec] = useState(0);
  const [drillLoad, setDrillLoad] = useState(false);
  const drillIv = useRef(null);
  const drillLvlRef = useRef("Bronze I");

  // Community
  const [posts, setPosts] = useState([]);
  const [postIn, setPostIn] = useState("");
  const [postLoad, setPostLoad] = useState(false);

  // Quiz
  const [quiz, setQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [quizExplain, setQuizExplain] = useState("");
  const [quizLoad, setQuizLoad] = useState(false);
  const [quizLevelFilter, setQuizLevelFilter] = useState("Bronze I");

  // Routine
  const [routine, setRoutine] = useState([]);
  const [shareRoutine, setShareRoutine] = useState(null);

  // Daily goal
  const [showGoalSetter, setShowGoalSetter] = useState(false);

  // Today's challenge
  const todayChallenge = useMemo(() => {
    const seed = localDate();
    const all = ALL_DANCES.flatMap(d=>Object.entries(d.levels).flatMap(([lvl,figs])=>figs.map(f=>({dance:d,level:lvl,fig:f}))));
    const idx = Array.from(seed).reduce((a,c)=>a+c.charCodeAt(0),0) % all.length;
    return all[idx];
  }, []);

  // Load on mount
  useEffect(() => {
    (async () => {
      const p = await load("dvida-prog-v4");
      if (p) {
        setProg({...DEF, ...p, quizScore:{...DEF.quizScore,...(p.quizScore||{})}});
        setRoutine(p.routine || []);
      }
      const comm = await load("dvida-community", true);
      if (comm && Array.isArray(comm)) {
        setPosts(comm.map(p=>({...p, user:p.user_name||p.user, likedBy:p.liked_by||p.likedBy||[], time:p.created_at||p.time})));
      }
      setReady(true);
    })();
  }, []);

  // Update + badge check + toast
  const update = useCallback((changes) => {
    setProg(prev => {
      const next = {...prev, ...changes};
      next.level = Math.floor(next.xp / 100) + 1;
      const today = localDate();
      const yest = new Date(Date.now()-86400000).toLocaleDateString("sv-SE");
      if (next.lastPractice !== today) {
        next.streak = next.lastPractice === yest ? next.streak+1 : 1;
        next.lastPractice = today;
      }
      const newBadges = BADGES.filter(b=>b.check(next)&&!next.earnedBadges.includes(b.id));
      if (newBadges.length) {
        next.earnedBadges = [...next.earnedBadges, ...newBadges.map(b=>b.id)];
        setToastBadge(newBadges[0]); // show first earned
        vibrate([50, 50, 100]);
      }
      save("dvida-prog-v4", next);
      return next;
    });
  }, []);

  const navTo = (t, sv) => { setTab(t); setSelDance(null); setSelLevel(null); if(sv) setSubView(sv); };
  const figKey = (dId,lvl,fig) => `${dId}::${lvl}::${fig}`;
  const isFigDone = (dId,lvl,fig) => !!prog.completedFigures[figKey(dId,lvl,fig)];
  const figPct = (dance, lvl) => {
    const figs = dance.levels[lvl] || [];
    if (!figs.length) return 0;
    return figs.filter(f=>prog.completedFigures[figKey(dance.id,lvl,f)]).length / figs.length;
  };
  const dancePct = dance => {
    const all = Object.values(dance.levels).flat();
    const done = all.filter(f=>BRONZE_LEVELS.some(lvl=>prog.completedFigures[figKey(dance.id,lvl,f)])).length;
    return Math.round((done/all.length)*100);
  };

  const completeFig = (dance, lvl, fig) => {
    const key = figKey(dance.id, lvl, fig);
    if (!prog.completedFigures[key]) {
      vibrate(30);
      update({completedFigures:{...prog.completedFigures,[key]:true}, xp:prog.xp+20});
    }
  };

  // Weekly chart
  const weekData = useMemo(() => {
    const out = [];
    for (let i=6; i>=0; i--) {
      const d = new Date(Date.now()-i*86400000);
      const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const log = prog.dailyLog?.[k] || {};
      out.push({day:["S","M","T","W","T","F","S"][d.getDay()], min:log.minutes||0, isToday:i===0});
    }
    return out;
  }, [prog.dailyLog]);
  const maxMin = Math.max(1, ...weekData.map(d=>d.min));
  const todayMin = weekData.find(d=>d.isToday)?.min || 0;
  const goalPct = Math.min(100, Math.round((todayMin / prog.dailyGoalMinutes) * 100));

  // AI Chat — trim to last CHAT_HISTORY_LIMIT messages
  const sendChat = async () => {
    if (!chatIn.trim() || chatLoad) return;
    const txt = chatIn.trim(); setChatIn(""); setChatLoad(true);
    const newMsgs = [...chatMsgs, {role:"user", content:txt}];
    setChatMsgs(newMsgs);
    try {
      const ctx = `[${prog.userName||"Student"}: DVIDA Bronze Level ${prog.level}, ${prog.xp} XP, ${prog.streak}d streak, ${Object.keys(prog.completedFigures).length} figures done, ${prog.drillsCompleted} drills]`;
      const trimmed = newMsgs.slice(-CHAT_HISTORY_LIMIT);
      const resp = await callAI([{role:"user",content:ctx},{role:"assistant",content:"Understood, coaching tailored to this dancer."},...trimmed]);
      setChatMsgs(p=>[...p, {role:"assistant",content:resp}]);
      update({aiChats:prog.aiChats+1, xp:prog.xp+2});
    } catch(e) {
      setChatMsgs(p=>[...p,{role:"assistant",content:"Connection issue — please try again!"}]);
    }
    setChatLoad(false);
  };
  useEffect(() => { chatEnd.current?.scrollIntoView({behavior:"smooth"}); }, [chatMsgs]);

  // Camera
  const startCam = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:640}}});
      streamRef.current = s;
      if (vidRef.current) { vidRef.current.srcObject = s; vidRef.current.play(); }
      setCamOn(true); setUploadMode(false);
    } catch(e) { alert("Camera permission needed for live analysis."); }
  };
  const stopCam = () => {
    streamRef.current?.getTracks().forEach(t=>t.stop());
    streamRef.current = null; setCamOn(false);
  };
  const runAnalysis = async (b64) => {
    setAnalyzing(true);
    try {
      const r = await visionAI(b64);
      setAnalysis(r);
      const dk = localDate();
      update({analysisCount:prog.analysisCount+1, xp:prog.xp+25,
        dailyLog:{...prog.dailyLog,[dk]:{minutes:(prog.dailyLog?.[dk]?.minutes||0)+5, drills:(prog.dailyLog?.[dk]?.drills||0)}}});
    } catch(e) {
      setAnalysis({scores:{posture:0,frame:0,alignment:0,balance:0,expression:0},overall:0,feedback:["Analysis failed — ensure you are well-lit and clearly visible."],strengths:[],priority:"Try again with better lighting"});
    }
    setAnalyzing(false);
  };
  const captureFromCamera = async () => {
    if (!vidRef.current || !canvRef.current) return;
    const v = vidRef.current, c = canvRef.current;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    await runAnalysis(c.toDataURL("image/jpeg", 0.8).split(",")[1]);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadMode(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const b64 = ev.target.result.split(",")[1];
      await runAnalysis(b64);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => () => stopCam(), []);

  // AI Drill — fixed: single merged update(), no duplicate dk
  const startDrill = async (dance, lvl, fig) => {
    setDrillOn(true); setDrillDance(dance); setDrillFig(fig);
    drillLvlRef.current = lvl;
    setDrillSec(0); setDrillPlan(null); setDrillLoad(true);
    navTo("practice","drills");
    if (drillIv.current) clearInterval(drillIv.current);
    drillIv.current = setInterval(() => setDrillSec(s=>s+1), 1000);
    try {
      const r = await callAI([{role:"user",content:`Create a focused DVIDA Bronze practice drill for the "${fig}" in ${dance.name} (${dance.style}), ${lvl}. Dancer: Level ${prog.level}, ${Object.keys(prog.completedFigures).length} figures done.\n\nReturn ONLY valid JSON:\n{"warmup":"2 sentence warmup","steps":["step1","step2","step3","step4","step5"],"count":"exact timing/count","dvida_note":"one key DVIDA technique point","mistakes":["mistake1","mistake2"],"visualization":"mental image","song_tempo":"${dance.bpm} BPM suggestion"}`}]);
      setDrillPlan(JSON.parse(r.replace(/```json|```/g,"").trim()));
    } catch(e) {
      setDrillPlan({warmup:`Begin with slow ${dance.name} walks in ${dance.tempo} time.`,steps:["Walk through without music","Count aloud","Half tempo","Full tempo","Performance run"],count:dance.timing,dvida_note:`DVIDA ${lvl} figure — focus on the syllabus requirement.`,mistakes:["Rushing footwork","Dropping frame"],visualization:"Move smoothly and deliberately.",song_tempo:`${dance.bpm} BPM`});
    }
    setDrillLoad(false);
  };

  const endDrill = () => {
    setDrillOn(false);
    if (drillIv.current) clearInterval(drillIv.current);
    const mins = Math.max(1, Math.ceil(drillSec / 60));
    const dk = localDate();
    const drillXP = 10 + mins * 3;
    const fk = drillDance && drillFig ? figKey(drillDance.id, drillLvlRef.current, drillFig) : null;
    const newFigs = fk && !prog.completedFigures[fk] ? {...prog.completedFigures,[fk]:true} : prog.completedFigures;
    const bonusXP = fk && !prog.completedFigures[fk] ? 20 : 0;
    update({
      drillsCompleted: prog.drillsCompleted+1,
      practiceMinutes: prog.practiceMinutes+mins,
      completedFigures: newFigs,
      xp: prog.xp + drillXP + bonusXP,
      dailyLog: {...prog.dailyLog, [dk]:{minutes:(prog.dailyLog?.[dk]?.minutes||0)+mins, drills:(prog.dailyLog?.[dk]?.drills||0)+1}}
    });
    vibrate([30, 20, 60]);
  };

  // Quiz — supports all levels
  const genQuiz = async (dance, lvl) => {
    setQuizLoad(true); setQuiz(null); setQuizResult(null); setQuizExplain("");
    const figs = dance.levels[lvl] || [];
    const correct = figs[Math.floor(Math.random() * figs.length)];
    const sameDanceFigs = new Set(Object.values(dance.levels).flat());
    const others = ALL_DANCES.flatMap(d=>d.id===dance.id?[]:Object.values(d.levels).flat()).filter(f=>!sameDanceFigs.has(f));
    const shuffle = a => [...a].sort(() => Math.random()-.5);
    const choices = shuffle([correct, ...shuffle(others).slice(0,3)]);
    setQuiz({dance, lvl, choices, correct});
    try {
      const exp = await callAI([{role:"user",content:`In 2 sentences, describe the DVIDA Bronze "${correct}" in ${dance.name} — what it looks like and one key technique point. Be specific.`}]);
      setQuizExplain(exp);
    } catch(e) { setQuizExplain(`The ${correct} is a ${lvl} figure in ${dance.name}.`); }
    setQuizLoad(false);
  };

  const answerQuiz = (choice) => {
    const correct = choice === quiz.correct;
    setQuizResult(correct ? "correct" : "wrong");
    vibrate(correct ? [30,20,60] : 80);
    update({quizScore:{correct:(prog.quizScore?.correct||0)+(correct?1:0),total:(prog.quizScore?.total||0)+1}, xp:prog.xp+(correct?10:2)});
  };

  // Community
  const reloadPosts = async () => {
    const c = await load("dvida-community", true);
    if (c && Array.isArray(c)) setPosts(c.map(p=>({...p,user:p.user_name||p.user,likedBy:p.liked_by||p.likedBy||[],time:p.created_at||p.time})));
  };

  const submitPost = async () => {
    if (!postIn.trim()) return;
    setPostLoad(true);
    const displayName = prog.userName || `Dancer_${Math.floor(Math.random()*900)+100}`;
    const newPost = {id:Date.now(), user_name:displayName, content:postIn.trim(), likes:0, liked_by:[], created_at:new Date().toISOString()};
    setPosts(prev=>[{...newPost,user:displayName,likedBy:[],time:newPost.created_at},...prev].slice(0,50));
    setPostIn("");
    update({postsCount:prog.postsCount+1, xp:prog.xp+5});
    if (SUPA_URL) {
      await fetch(`${SUPA_URL}/rest/v1/community_posts`, {
        method:"POST",
        headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},
        body:JSON.stringify(newPost)
      }).catch(e=>console.warn("Post failed:",e));
    }
    setPostLoad(false);
  };

  const likePost = async (id) => {
    const uid = getUserId(prog); // stable UID
    const post = posts.find(p=>p.id===id);
    if (!post) return;
    const liked = post.likedBy || post.liked_by || [];
    const has = liked.includes(uid);
    const newLikes = has ? post.likes-1 : post.likes+1;
    const newLikedBy = has ? liked.filter(u=>u!==uid) : [...liked,uid];
    setPosts(prev=>prev.map(p=>p.id!==id?p:{...p,likes:newLikes,likedBy:newLikedBy,liked_by:newLikedBy}));
    if (SUPA_URL) {
      await fetch(`${SUPA_URL}/rest/v1/community_posts?id=eq.${id}`, {
        method:"PATCH",
        headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},
        body:JSON.stringify({likes:newLikes,liked_by:newLikedBy})
      }).catch(e=>console.warn("Like failed:",e));
    }
  };

  // Routine
  const addToRoutine = (dance, lvl, fig) => {
    const item = {dance:dance.id, dName:dance.name, emoji:dance.emoji, level:lvl, fig, id:Date.now()};
    const newR = [...routine, item];
    setRoutine(newR); update({routine:newR, xp:prog.xp+5});
  };
  const removeFromRoutine = (id) => {
    const newR = routine.filter(r=>r.id!==id);
    setRoutine(newR); update({routine:newR});
  };
  const genRoutineSheet = async () => {
    if (!routine.length) return;
    setShareRoutine("loading");
    try {
      const figList = routine.map((r,i)=>`${i+1}. ${r.dName} — ${r.fig} (${r.level})`).join("\n");
      const r = await callAI([{role:"user",content:`Competition routine:\n${figList}\n\nBrief coaching note: flow, transitions, timing/technique watch-outs. Under 150 words.`}]);
      setShareRoutine(r);
    } catch(e) { setShareRoutine("Could not generate notes — please try again."); }
  };

  // Computed
  const totalFigs = ALL_DANCES.reduce((a,d)=>a+Object.values(d.levels).flat().length,0);
  const doneFigs = Object.keys(prog.completedFigures).length;
  const challengeDoneToday = prog.challengeDoneDate === localDate();

  // ── Loading ──
  if (!ready) return (
    <div style={{background:"var(--bg)",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <div style={{fontSize:48,animation:"pulse 1.5s ease infinite"}}>💃</div>
      <div style={{fontFamily:"var(--serif)",fontSize:20,letterSpacing:3,color:"var(--gold)"}}>DANCE COACH</div>
      <div className="spin"/>
    </div>
  );

  // ── Onboarding ──
  if (!prog.onboarded) return (
    <>
      <Onboarding onComplete={(name, pref) => update({onboarded:true, userName:name, stylePref:pref, xp:10})} />
    </>
  );

  const greeting = prog.userName ? `Welcome back, ${prog.userName}` : "Welcome back";

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <ErrorBoundary>
      <div style={{background:"var(--bg)",minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative"}}>
        <canvas ref={canvRef} style={{display:"none"}}/>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFileUpload}/>
        {/* Badge toast */}
        {toastBadge && <BadgeToast badge={toastBadge} onDone={()=>setToastBadge(null)}/>}
        {/* Ambient glow */}
        <div style={{position:"fixed",top:-100,right:-60,width:280,height:280,background:"radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none",zIndex:0}}/>

        <div style={{position:"relative",zIndex:1,paddingBottom:72,minHeight:"100vh"}}>

          {/* ═══════ HOME ═══════ */}
          {tab==="home"&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"44px 18px 14px",background:"linear-gradient(180deg,rgba(201,168,76,.06) 0%,transparent)"}}>
                <div style={{fontSize:10,fontWeight:600,color:"var(--gold)",letterSpacing:3,textTransform:"uppercase",marginBottom:2}}>DVIDA Bronze Trainer</div>
                <h1 style={{fontFamily:"var(--serif)",fontSize:28,fontWeight:700,lineHeight:1.1}}><span className="gold">{greeting}</span></h1>
                <p style={{fontSize:12,color:"var(--txt3)",marginTop:3}}>American Smooth & Rhythm · AI-Powered</p>
              </div>

              {/* Stats row */}
              <Row>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
                  {[["⭐",prog.level,"Level"],["✨",prog.xp,"XP"],["🔥",`${prog.streak}d`,"Streak"],["💃",`${doneFigs}/${totalFigs}`,"Figs"]].map(([em,v,l],i)=>(
                    <div key={i} className="gl" style={{borderRadius:12,padding:"12px 6px",textAlign:"center",animation:`fu .4s ease ${i*.06}s both`}}>
                      <div style={{fontSize:18,marginBottom:2}}>{em}</div>
                      <div style={{fontSize:16,fontWeight:700,color:"var(--gold)",fontFamily:"var(--serif)"}}>{v}</div>
                      <div style={{fontSize:9,color:"var(--txt3)",textTransform:"uppercase",letterSpacing:.8}}>{l}</div>
                    </div>
                  ))}
                </div>
                {/* XP bar */}
                <div style={{marginTop:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--txt3)",marginBottom:4}}>
                    <span>Level {prog.level}</span><span>{prog.xp%100}/100 XP</span>
                  </div>
                  <div style={{height:4,borderRadius:2,background:"var(--s1)"}}>
                    <div style={{height:"100%",borderRadius:2,width:`${prog.xp%100}%`,background:"linear-gradient(90deg,var(--gold),var(--gold2))",transition:"width .5s"}}/>
                  </div>
                </div>
              </Row>

              {/* Daily Goal Ring */}
              <Row>
                <div className="gl" style={{borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
                  {/* Circle progress */}
                  <div style={{position:"relative",width:52,height:52,flexShrink:0}}>
                    <svg viewBox="0 0 52 52" style={{width:52,height:52,transform:"rotate(-90deg)"}}>
                      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--s2)" strokeWidth="4"/>
                      <circle cx="26" cy="26" r="22" fill="none" stroke="var(--gold)" strokeWidth="4"
                        strokeDasharray={`${2*Math.PI*22}`}
                        strokeDashoffset={`${2*Math.PI*22*(1-goalPct/100)}`}
                        strokeLinecap="round" style={{transition:"stroke-dashoffset .5s ease"}}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"var(--gold)"}}>{goalPct}%</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>Daily Practice Goal</div>
                    <div style={{fontSize:11,color:"var(--txt2)"}}>{todayMin} / {prog.dailyGoalMinutes} min today</div>
                    {goalPct>=100&&<div style={{fontSize:10,color:"var(--grn)",marginTop:2,fontWeight:600}}>✓ Goal complete!</div>}
                  </div>
                  <button className="btn" onClick={()=>setShowGoalSetter(!showGoalSetter)}
                    style={{background:"none",color:"var(--txt3)",fontSize:10,padding:"4px 8px",border:"1px solid var(--bdr)"}}>
                    {prog.dailyGoalMinutes}m
                  </button>
                </div>
                {showGoalSetter&&(
                  <div className="gl" style={{borderRadius:12,padding:14,marginTop:8,animation:"fu .3s ease"}}>
                    <div style={{fontSize:11,color:"var(--txt2)",marginBottom:10}}>Set daily goal (minutes):</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {[10,15,20,30,45,60].map(m=>(
                        <button key={m} className="btn" onClick={()=>{update({dailyGoalMinutes:m});setShowGoalSetter(false);}}
                          style={{padding:"6px 14px",background:prog.dailyGoalMinutes===m?"rgba(201,168,76,.15)":"var(--s1)",border:`1px solid ${prog.dailyGoalMinutes===m?"rgba(201,168,76,.3)":"var(--bdr)"}`,color:prog.dailyGoalMinutes===m?"var(--gold)":"var(--txt2)",fontSize:12}}>
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Row>

              {/* Today's Challenge */}
              <Row>
                <div style={{borderRadius:16,padding:16,background:`linear-gradient(135deg,${todayChallenge.dance.color}bb,${todayChallenge.dance.color}44)`,border:"1px solid rgba(255,255,255,.07)",opacity:challengeDoneToday?.7:1}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{fontSize:10,fontWeight:700,color:"var(--gold)",letterSpacing:2}}>⚡ TODAY'S CHALLENGE</div>
                    {challengeDoneToday&&<div style={{fontSize:10,color:"var(--grn)",fontWeight:600}}>✓ Done</div>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{fontSize:34}}>{todayChallenge.dance.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,marginBottom:2}}>{todayChallenge.fig}</div>
                      <div style={{fontSize:11,color:"var(--txt2)"}}>{todayChallenge.dance.name} · {todayChallenge.level}</div>
                    </div>
                    {!challengeDoneToday&&(
                      <button className="btn" onClick={()=>{startDrill(todayChallenge.dance,todayChallenge.level,todayChallenge.fig);update({challengeDoneDate:localDate()});}}
                        style={{padding:"9px 16px",background:"rgba(201,168,76,.15)",border:"1px solid rgba(201,168,76,.25)",color:"var(--gold)",fontSize:12,fontWeight:600,flexShrink:0}}>
                        Drill It
                      </button>
                    )}
                  </div>
                </div>
              </Row>

              {/* Quick Actions */}
              <Row>
                <div style={{fontSize:17,fontWeight:600,fontFamily:"var(--serif)",marginBottom:10}}>Quick Start</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    {em:"🤖",l:"AI Coach",   d:"Chat with your coach", a:()=>navTo("coach")},
                    {em:"🎯",l:"Drill",       d:"AI-generated practice",a:()=>navTo("practice","drills")},
                    {em:"🧠",l:"Quiz",        d:"Test your knowledge",  a:()=>navTo("practice","quiz")},
                    {em:"📸",l:"Analyze",     d:"Camera or photo",      a:()=>navTo("practice","technique")},
                  ].map((q,i)=>(
                    <div key={i} className="gl card" onClick={q.a} style={{padding:14,animation:`fu .4s ease ${.15+i*.06}s both`}}>
                      <div style={{fontSize:26,marginBottom:5}}>{q.em}</div>
                      <div style={{fontSize:13,fontWeight:600,marginBottom:1}}>{q.l}</div>
                      <div style={{fontSize:10,color:"var(--txt3)"}}>{q.d}</div>
                    </div>
                  ))}
                </div>
              </Row>

              {/* Dance carousels */}
              <Row>
                <div style={{fontSize:17,fontFamily:"var(--serif)",fontWeight:600,marginBottom:10}}>DVIDA Syllabi</div>
                {["smooth","rhythm"].map(cat=>(
                  <div key={cat} style={{marginBottom:14}}>
                    <div style={{fontSize:10,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>
                      American {cat==="smooth"?"Smooth":"Rhythm"}
                    </div>
                    <div style={{display:"flex",gap:9,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
                      {Object.values(DVIDA[cat]).map((d,i)=>{
                        const pct = dancePct(d);
                        return(
                          <div key={d.id} className="card" onClick={()=>{setSelDance(d);setTab("syllabus");}}
                            style={{minWidth:110,borderRadius:16,padding:"16px 12px",textAlign:"center",background:`linear-gradient(145deg,${d.color}bb,${d.color}44)`,border:"1px solid rgba(255,255,255,.07)",animation:`si .4s ease ${i*.07}s both`,flexShrink:0}}>
                            <div style={{fontSize:30,marginBottom:5}}>{d.emoji}</div>
                            <div style={{fontSize:12,fontWeight:700}}>{d.name}</div>
                            <div style={{fontSize:9,color:pct>0?"var(--gold)":"var(--txt3)",marginTop:2}}>{pct>0?`${pct}% done`:"Start"}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </Row>
            </div>
          )}

          {/* ═══════ SYLLABUS — overview ═══════ */}
          {tab==="syllabus"&&!selDance&&!selLevel&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"44px 18px 14px"}}>
                <h1 style={{fontFamily:"var(--serif)",fontSize:26}}><span className="gold">DVIDA Syllabus</span></h1>
                <p style={{fontSize:11,color:"var(--txt3)"}}>Official Bronze figures · 4 progressive levels</p>
              </div>
              <Row>
                <div style={{display:"flex",gap:7,marginBottom:14}}>
                  {["All","Smooth","Rhythm"].map(f=><Pill key={f} active={styleFilter===f} onClick={()=>setStyleFilter(f)}>{f}</Pill>)}
                </div>
                {ALL_DANCES.filter(d=>styleFilter==="All"||d.style.includes(styleFilter)).map((d,i)=>{
                  const pct = dancePct(d);
                  return(
                    <div key={d.id} className="card gl" onClick={()=>setSelDance(d)}
                      style={{padding:14,marginBottom:8,display:"flex",gap:12,alignItems:"center",animation:`fu .35s ease ${i*.05}s both`,borderLeft:`3px solid ${d.color}`}}>
                      <div style={{fontSize:32,flexShrink:0}}>{d.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontSize:14,fontWeight:700}}>{d.name}</span>
                          <span style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:"rgba(255,255,255,.06)",color:"var(--txt2)"}}>{d.style.replace("American ","")}</span>
                        </div>
                        <div style={{fontSize:11,color:"var(--txt2)",marginTop:2,marginBottom:6}}>{Object.values(d.levels).flat().length} figures · 4 levels</div>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <div style={{flex:1,height:4,borderRadius:2,background:"rgba(255,255,255,.05)"}}>
                            <div style={{height:"100%",borderRadius:2,width:`${pct}%`,background:"var(--gold)",transition:"width .5s"}}/>
                          </div>
                          <span style={{fontSize:11,color:"var(--gold)",fontWeight:700}}>{pct}%</span>
                        </div>
                      </div>
                      {ic(Ic.Right,14)}
                    </div>
                  );
                })}
              </Row>
            </div>
          )}

          {/* SYLLABUS — dance detail (level list) */}
          {tab==="syllabus"&&selDance&&!selLevel&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"16px 18px",background:`linear-gradient(180deg,${selDance.color}cc,transparent)`}}>
                <button className="btn" onClick={()=>setSelDance(null)} style={{background:"none",color:"var(--gold)",padding:"6px 0",display:"flex",alignItems:"center",gap:6,fontSize:12,marginBottom:10}}>{ic(Ic.Back,16)} Back</button>
                <div style={{textAlign:"center",padding:"8px 0 12px"}}>
                  <div style={{fontSize:48}}>{selDance.emoji}</div>
                  <h2 style={{fontFamily:"var(--serif)",fontSize:26,margin:"6px 0 2px"}}>{selDance.name}</h2>
                  <div style={{fontSize:11,color:"var(--txt2)"}}>{selDance.style} · {selDance.tempo} · {selDance.bpm} BPM · {selDance.timing}</div>
                  <div style={{marginTop:6,fontSize:11,color:"var(--txt3)"}}>🎵 {selDance.songs.slice(0,2).join(" · ")}</div>
                </div>
              </div>
              <Row>
                <div style={{fontSize:11,color:"var(--txt2)",marginBottom:14,lineHeight:1.5}}>Complete <strong style={{color:"var(--gold)"}}>80% of each level</strong> to unlock the next.</div>
                {BRONZE_LEVELS.map((lvl,li)=>{
                  const figs = selDance.levels[lvl]||[];
                  const done = figs.filter(f=>isFigDone(selDance.id,lvl,f)).length;
                  const pct = figs.length ? done/figs.length : 0;
                  const unlocked = isLevelUnlocked(selDance.id,lvl,prog);
                  const colors = ["var(--grn)","var(--gold)","var(--blu)","var(--purp)"];
                  return(
                    <div key={lvl} onClick={()=>unlocked&&setSelLevel(lvl)}
                      className={unlocked?"gl card":"gl"} style={{padding:14,marginBottom:9,opacity:unlocked?1:.45,cursor:unlocked?"pointer":"not-allowed",borderLeft:`3px solid ${colors[li]}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontSize:13,fontWeight:700,color:colors[li]}}>{lvl}</span>
                            {!unlocked&&<span style={{color:"var(--txt3)"}}>{ic(Ic.Lock,12)}</span>}
                            {pct>=1&&<span style={{fontSize:10,color:colors[li]}}>✓ Complete</span>}
                          </div>
                          <div style={{fontSize:11,color:"var(--txt3)",marginTop:2}}>{figs.length} figures · {done} done</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:18,fontWeight:700,color:colors[li],fontFamily:"var(--serif)"}}>{Math.round(pct*100)}%</div>
                          {unlocked&&ic(Ic.Right,14)}
                        </div>
                      </div>
                      <div style={{height:4,borderRadius:2,background:"var(--s1)",marginTop:10}}>
                        <div style={{height:"100%",borderRadius:2,width:`${pct*100}%`,background:colors[li],transition:"width .6s"}}/>
                      </div>
                    </div>
                  );
                })}
              </Row>
            </div>
          )}

          {/* SYLLABUS — figures list */}
          {tab==="syllabus"&&selDance&&selLevel&&(
            <div style={{animation:"fu .35s ease"}}>
              <div style={{padding:"16px 18px 10px",background:`linear-gradient(180deg,${selDance.color}99,transparent)`}}>
                <button className="btn" onClick={()=>setSelLevel(null)} style={{background:"none",color:"var(--gold)",padding:"6px 0",display:"flex",alignItems:"center",gap:6,fontSize:12,marginBottom:10}}>{ic(Ic.Back,16)} {selDance.name}</button>
                <h2 style={{fontFamily:"var(--serif)",fontSize:22}}>{selLevel} <span style={{color:"var(--txt2)",fontSize:16}}>· {selDance.name}</span></h2>
              </div>
              <Row>
                <div style={{display:"flex",gap:7,marginBottom:14}}>
                  <button className="btn" onClick={()=>{if(!quizLoad){setQuizLevelFilter(selLevel);genQuiz(selDance,selLevel);navTo("practice","quiz");}}} style={{padding:"7px 14px",background:"rgba(107,158,207,.12)",border:"1px solid rgba(107,158,207,.2)",color:"var(--blu)",fontSize:11,fontWeight:600}}>🧠 Quiz Level</button>
                  <button className="btn" onClick={()=>navTo("practice","drills")} style={{padding:"7px 14px",background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.2)",color:"var(--gold)",fontSize:11,fontWeight:600}}>🎯 Drills</button>
                </div>
                {(selDance.levels[selLevel]||[]).map((fig,i)=>{
                  const done = isFigDone(selDance.id,selLevel,fig);
                  const inRoutine = routine.some(r=>r.dance===selDance.id&&r.fig===fig);
                  return(
                    <div key={fig} className="gl" style={{borderRadius:12,padding:13,marginBottom:7,display:"flex",alignItems:"center",gap:10,borderLeft:done?"3px solid var(--gold)":"3px solid transparent",animation:`si .35s ease ${i*.05}s both`}}>
                      <div style={{width:28,height:28,borderRadius:7,background:done?"rgba(201,168,76,.15)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:done?"var(--gold)":"var(--txt3)",fontWeight:700,fontSize:12}}>
                        {done?ic(Ic.Check,13):i+1}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600}}>{fig}</div>
                        <div style={{fontSize:10,color:"var(--txt3)",marginTop:1}}>DVIDA {selLevel} · {selDance.name}</div>
                      </div>
                      <div style={{display:"flex",gap:5,flexShrink:0}}>
                        <button className="btn" onClick={()=>startDrill(selDance,selLevel,fig)} style={{padding:"4px 9px",background:"rgba(201,168,76,.08)",border:"1px solid rgba(201,168,76,.15)",color:"var(--gold)",fontSize:10}}>Drill</button>
                        <button className="btn" onClick={()=>addToRoutine(selDance,selLevel,fig)} style={{padding:"4px 9px",background:inRoutine?"rgba(107,158,207,.15)":"var(--s1)",border:`1px solid ${inRoutine?"rgba(107,158,207,.2)":"var(--bdr)"}`,color:inRoutine?"var(--blu)":"var(--txt3)",fontSize:10}}>{ic(Ic.Plus,12)}</button>
                        {!done&&<button className="btn" onClick={()=>completeFig(selDance,selLevel,fig)} style={{padding:"4px 9px",background:"rgba(106,191,123,.08)",border:"1px solid rgba(106,191,123,.15)",color:"var(--grn)",fontSize:10}}>✓</button>}
                      </div>
                    </div>
                  );
                })}
              </Row>
            </div>
          )}

          {/* ═══════ AI COACH ═══════ */}
          {tab==="coach"&&(
            <div style={{animation:"fu .4s ease",display:"flex",flexDirection:"column",height:"calc(100vh - 72px)"}}>
              <div style={{padding:"44px 18px 12px",borderBottom:"1px solid var(--bdr)",flexShrink:0}}>
                <h1 style={{fontFamily:"var(--serif)",fontSize:22}}><span className="gold">DVIDA AI Coach</span></h1>
                <p style={{fontSize:11,color:"var(--txt3)"}}>{prog.userName?"Coaching " + prog.userName + " ·":""} Bronze syllabus expert · Last {CHAT_HISTORY_LIMIT} messages sent</p>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"14px 18px"}}>
                {chatMsgs.length===0&&(
                  <div style={{textAlign:"center",padding:"28px 0"}}>
                    <div style={{fontSize:44,marginBottom:10}}>🤖</div>
                    <p style={{fontSize:13,color:"var(--txt2)",lineHeight:1.6,marginBottom:16}}>{prog.userName?`Hi ${prog.userName}! `:""} I'm your personal DVIDA Bronze coach. Ask me anything!</p>
                    <div style={{display:"flex",flexDirection:"column",gap:7}}>
                      {["How do I improve my Waltz Natural Turn?","Explain Cross Body Lead in Cha-Cha","Tips for my Tango Corté technique","What should I focus on for my first comp?","Rumba hip action — how do I get it?"].map(q=>(
                        <button key={q} className="btn gl card" onClick={()=>setChatIn(q)} style={{padding:"10px 14px",color:"var(--txt2)",fontSize:12,textAlign:"left"}}>{q}</button>
                      ))}
                    </div>
                  </div>
                )}
                {chatMsgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:10,animation:"fu .3s ease"}}>
                    <div style={{maxWidth:"86%",padding:"10px 14px",borderRadius:16,background:m.role==="user"?"rgba(201,168,76,.13)":"var(--s1)",border:`1px solid ${m.role==="user"?"rgba(201,168,76,.2)":"var(--bdr)"}`,borderBottomRightRadius:m.role==="user"?3:16,borderBottomLeftRadius:m.role==="user"?16:3}}>
                      {m.role==="assistant"&&<div style={{fontSize:9,color:"var(--gold)",fontWeight:700,marginBottom:3,letterSpacing:1}}>DVIDA COACH</div>}
                      <div style={{fontSize:13,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{m.content}</div>
                    </div>
                  </div>
                ))}
                {chatLoad&&<div style={{display:"flex",gap:8,alignItems:"center",color:"var(--txt3)",fontSize:12}}><span className="spin"/> Thinking...</div>}
                <div ref={chatEnd}/>
              </div>
              <div style={{padding:"10px 18px",borderTop:"1px solid var(--bdr)",background:"rgba(7,9,15,.95)",flexShrink:0}}>
                <div style={{display:"flex",gap:7}}>
                  <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask about any DVIDA figure..."
                    style={{flex:1,padding:"11px 14px",background:"var(--s1)",border:"1px solid var(--bdr)",color:"var(--txt)",fontSize:13}}/>
                  <button className="btn" onClick={sendChat} disabled={chatLoad||!chatIn.trim()}
                    style={{width:42,height:42,background:chatIn.trim()?"linear-gradient(135deg,var(--gold),#a08030)":"var(--s1)",color:chatIn.trim()?"#07090f":"var(--txt3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {ic(Ic.Send,16)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════ PRACTICE ═══════ */}
          {tab==="practice"&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"44px 18px 12px"}}>
                <h1 style={{fontFamily:"var(--serif)",fontSize:26}}><span className="gold">Practice Studio</span></h1>
              </div>
              <div style={{display:"flex",gap:7,padding:"0 18px",marginBottom:18,overflowX:"auto"}}>
                {[{k:"metronome",l:"🎵 Beat"},{k:"drills",l:"🎯 Drills"},{k:"quiz",l:"🧠 Quiz"},{k:"technique",l:"📸 Analyze"},{k:"routine",l:"📋 Routine"}].map(s=>(
                  <Pill key={s.k} active={subView===s.k} onClick={()=>{setSubView(s.k);setAnalysis(null);if(s.k!=="quiz"){setQuiz(null);setQuizResult(null);}}}>{s.l}</Pill>
                ))}
              </div>

              {/* METRONOME — fixed: slider only restarts on mouseUp */}
              {subView==="metronome"&&(
                <Row>
                  <div className="gl" style={{borderRadius:20,padding:26,textAlign:"center"}}>
                    <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:24}}>
                      {Array.from({length:met.ts},(_,i)=>(
                        <div key={i} style={{width:i===0?24:18,height:i===0?24:18,borderRadius:"50%",background:met.on&&met.beat===i?(i===0?"var(--gold)":"rgba(201,168,76,.6)"):"var(--s1)",border:`2px solid ${i===0?"var(--gold)":"rgba(201,168,76,.2)"}`,transform:met.on&&met.beat===i?"scale(1.3)":"scale(1)",boxShadow:met.on&&met.beat===i?"0 0 14px rgba(201,168,76,.3)":"none",transition:"all .1s ease"}}/>
                      ))}
                    </div>
                    <div style={{fontSize:52,fontWeight:700,fontFamily:"var(--serif)",color:"var(--gold)"}}>{met.bpm}</div>
                    <div style={{fontSize:10,color:"var(--txt3)",textTransform:"uppercase",letterSpacing:2,marginBottom:18}}>BPM</div>
                    {/* FIX: only restart on mouseUp, not every pixel drag */}
                    <input type="range" min={40} max={240} value={met.bpm}
                      onChange={e=>met.setBpm(+e.target.value)}
                      onMouseUp={()=>met.on&&met.restart()}
                      onTouchEnd={()=>met.on&&met.restart()}
                      style={{width:"100%",marginBottom:16,accentColor:"var(--gold)"}}/>
                    <div style={{fontSize:11,color:"var(--txt3)",marginBottom:10}}>Quick set by dance:</div>
                    <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",marginBottom:18}}>
                      {ALL_DANCES.map(d=>(
                        <button key={d.id} className="btn" onClick={()=>{met.setBpm(d.bpm);met.setTs(d.tempo==="3/4"?3:d.tempo==="2/4"?2:4);if(met.on)met.restart();}}
                          style={{padding:"4px 9px",borderRadius:8,background:met.bpm===d.bpm?"rgba(201,168,76,.15)":"var(--s1)",border:`1px solid ${met.bpm===d.bpm?"rgba(201,168,76,.3)":"var(--bdr)"}`,color:met.bpm===d.bpm?"var(--gold)":"var(--txt3)",fontSize:10}}>
                          {d.emoji} {d.bpm}
                        </button>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:22}}>
                      {[2,3,4].map(t=>(
                        <button key={t} className="btn" onClick={()=>{met.setTs(t);if(met.on)met.restart();}}
                          style={{padding:"6px 14px",borderRadius:10,background:met.ts===t?"rgba(201,168,76,.15)":"var(--s1)",border:`1px solid ${met.ts===t?"var(--gold)":"var(--bdr)"}`,color:met.ts===t?"var(--gold)":"var(--txt2)",fontSize:13,fontWeight:600}}>
                          {t}/4
                        </button>
                      ))}
                    </div>
                    <button className="btn" onClick={()=>{if(met.on)met.stop();else{met.start();update({metronomeSessions:prog.metronomeSessions+1});}}}
                      style={{width:60,height:60,borderRadius:"50%",background:met.on?"rgba(207,107,107,.2)":"linear-gradient(135deg,var(--gold),#a08030)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:`0 0 20px ${met.on?"rgba(207,107,107,.15)":"rgba(201,168,76,.2)"}`}}>
                      {met.on?ic(Ic.Pause):ic(Ic.Play)}
                    </button>
                  </div>
                </Row>
              )}

              {/* DRILLS */}
              {subView==="drills"&&(
                <Row>
                  {drillOn&&drillDance?(
                    <div className="gl" style={{borderRadius:20,padding:22,textAlign:"center"}}>
                      <div style={{fontSize:40,marginBottom:6}}>{drillDance.emoji}</div>
                      <div style={{fontSize:9,color:"var(--txt3)",letterSpacing:2,textTransform:"uppercase"}}>DRILLING · {drillLvlRef.current}</div>
                      <div style={{fontFamily:"var(--serif)",fontSize:20,margin:"4px 0"}}>{drillFig}</div>
                      <div style={{fontSize:11,color:"var(--txt2)",marginBottom:16}}>{drillDance.name}</div>
                      <div style={{fontSize:44,fontWeight:700,color:"var(--gold)",fontFamily:"var(--serif)",marginBottom:16}}>{fmtT(drillSec)}</div>
                      {drillLoad?(
                        <div style={{padding:16}}><span className="spin"/> <span style={{fontSize:12,color:"var(--txt2)",marginLeft:8}}>Generating your drill plan...</span></div>
                      ):drillPlan&&(
                        <div style={{textAlign:"left"}}>
                          {[
                            {label:"🔥 Warm-Up",    content:drillPlan.warmup,                                              color:"var(--red)"},
                            {label:"⏱ Count",        content:drillPlan.count,                                               color:"var(--gold)"},
                            {label:"📋 Steps",       content:drillPlan.steps?.map((s,i)=>`${i+1}. ${s}`).join("\n"),       color:"var(--grn)"},
                            {label:"🎓 DVIDA Note",  content:drillPlan.dvida_note,                                          color:"var(--blu)"},
                            {label:"⚠️ Watch For",   content:drillPlan.mistakes?.map(m=>`• ${m}`).join("\n"),              color:"var(--red)"},
                            {label:"💭 Visualize",   content:drillPlan.visualization,                                       color:"var(--purp)"},
                            {label:"🎵 Music",       content:drillPlan.song_tempo,                                          color:"var(--txt2)"},
                          ].map(({label,content,color},i)=>content&&(
                            <div key={i} className="gl" style={{borderRadius:11,padding:12,marginBottom:8}}>
                              <div style={{fontSize:10,fontWeight:700,color,marginBottom:4}}>{label}</div>
                              <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,whiteSpace:"pre-wrap"}}>{content}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <button className="btn" onClick={endDrill} style={{padding:"11px 32px",background:"linear-gradient(135deg,var(--gold),#a08030)",color:"#07090f",fontSize:13,fontWeight:700,marginTop:12}}>
                        FINISH DRILL
                      </button>
                    </div>
                  ):(
                    <>
                      <p style={{fontSize:12,color:"var(--txt2)",marginBottom:12}}>Tap any figure — the AI builds a custom drill with DVIDA-specific coaching.</p>
                      {ALL_DANCES.map((d,i)=>(
                        <div key={d.id} className="gl" style={{borderRadius:12,padding:12,marginBottom:7,animation:`fu .3s ease ${i*.04}s both`}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                            <span style={{fontSize:20}}>{d.emoji}</span>
                            <span style={{fontSize:13,fontWeight:700}}>{d.name}</span>
                            <span style={{fontSize:9,color:"var(--txt3)",marginLeft:"auto"}}>{d.timing}</span>
                          </div>
                          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                            {["Bronze I","Bronze II"].flatMap(lvl=>(d.levels[lvl]||[]).map(fig=>({fig,lvl}))).slice(0,6).map(({fig,lvl})=>(
                              <button key={fig+lvl} className="btn" onClick={()=>startDrill(d,lvl,fig)}
                                style={{padding:"3px 8px",borderRadius:7,background:"rgba(201,168,76,.06)",border:"1px solid rgba(201,168,76,.1)",color:"var(--gold)",fontSize:9}}>{fig}</button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </Row>
              )}

              {/* QUIZ — all levels, all dances */}
              {subView==="quiz"&&(
                <Row>
                  {!quiz||quizLoad?(
                    <div className="gl" style={{borderRadius:16,padding:20,textAlign:"center"}}>
                      <div style={{fontSize:40,marginBottom:10}}>🧠</div>
                      <div style={{fontFamily:"var(--serif)",fontSize:18,marginBottom:6}}>Figure Knowledge Quiz</div>
                      <div style={{fontSize:12,color:"var(--gold)",fontWeight:600,marginBottom:16}}>
                        Score: {prog.quizScore?.correct||0}/{prog.quizScore?.total||0} ({(prog.quizScore?.total||0)>0?Math.round(((prog.quizScore?.correct||0)/(prog.quizScore?.total||1))*100):0}%)
                      </div>
                      {/* Level filter */}
                      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
                        {BRONZE_LEVELS.map(l=><Pill key={l} active={quizLevelFilter===l} onClick={()=>setQuizLevelFilter(l)}>{l}</Pill>)}
                      </div>
                      {quizLoad?(
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span className="spin"/> Generating...</div>
                      ):(
                        <div style={{display:"flex",flexDirection:"column",gap:7}}>
                          {ALL_DANCES.filter(d=>(d.levels[quizLevelFilter]||[]).length>0).map(d=>(
                            <button key={d.id} className="btn gl card" disabled={quizLoad} onClick={()=>{if(!quizLoad)genQuiz(d,quizLevelFilter);}}
                              style={{padding:"10px 14px",color:"var(--txt2)",fontSize:12,display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontSize:20}}>{d.emoji}</span> {d.name} — {quizLevelFilter}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ):(
                    <div style={{animation:"fu .4s ease"}}>
                      <div className="gl" style={{borderRadius:16,padding:18,marginBottom:12}}>
                        <div style={{fontSize:10,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>{quiz.dance.name} · {quiz.lvl}</div>
                        <div style={{fontFamily:"var(--serif)",fontSize:17,marginBottom:4}}>Which figure is described?</div>
                        <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,fontStyle:"italic",minHeight:40}}>{quizExplain||"Loading description..."}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                        {quiz.choices.map(c=>{
                          let bg="var(--s1)",bdr="var(--bdr)",col="var(--txt)";
                          if(quizResult){
                            if(c===quiz.correct){bg="rgba(106,191,123,.15)";bdr="rgba(106,191,123,.3)";col="var(--grn)";}
                            else if(c===quiz.choice&&c!==quiz.correct){bg="rgba(207,107,107,.1)";bdr="rgba(207,107,107,.2)";col="var(--red)";}
                          }
                          return(
                            <button key={c} className="btn" onClick={()=>{if(!quizResult){setQuiz(q=>({...q,choice:c}));answerQuiz(c);}}}
                              style={{padding:"12px 16px",background:bg,border:`1px solid ${bdr}`,color:col,fontSize:13,textAlign:"left",fontWeight:quizResult&&c===quiz.correct?700:400}}>
                              {c}
                            </button>
                          );
                        })}
                      </div>
                      {quizResult&&(
                        <div style={{animation:"fu .3s ease"}}>
                          <div className="gl" style={{borderRadius:12,padding:14,marginBottom:12,background:quizResult==="correct"?"rgba(106,191,123,.08)":"rgba(207,107,107,.07)",border:`1px solid ${quizResult==="correct"?"rgba(106,191,123,.2)":"rgba(207,107,107,.15)"}`}}>
                            <div style={{fontSize:14,fontWeight:700,color:quizResult==="correct"?"var(--grn)":"var(--red)",marginBottom:4}}>
                              {quizResult==="correct"?"✓ Correct! +10 XP":"✗ Not quite — keep practicing! +2 XP"}
                            </div>
                            <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6}}>Answer: <strong style={{color:"var(--gold)"}}>{quiz.correct}</strong></div>
                          </div>
                          <button className="btn" onClick={()=>{setQuiz(null);setQuizResult(null);setQuizExplain("");}}
                            style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,var(--gold),#a08030)",color:"#07090f",fontSize:13,fontWeight:700}}>
                            Next Question
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Row>
              )}

              {/* TECHNIQUE ANALYSIS — camera + photo upload */}
              {subView==="technique"&&(
                <Row>
                  <div className="gl" style={{borderRadius:20,padding:22,textAlign:"center",marginBottom:14}}>
                    {!camOn&&!uploadMode?(
                      <>
                        <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.03))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>{ic(Ic.Camera,26)}</div>
                        <div style={{fontFamily:"var(--serif)",fontSize:18,marginBottom:6}}>DVIDA Technique Analysis</div>
                        <p style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,marginBottom:18}}>Claude Vision AI analyzes posture, frame, alignment, balance, and expression against DVIDA Bronze standards.</p>
                        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                          <button className="btn" onClick={startCam} style={{padding:"11px 22px",background:"linear-gradient(135deg,var(--gold),#a08030)",color:"#07090f",fontSize:12,display:"flex",alignItems:"center",gap:7}}>
                            {ic(Ic.Camera,16)} Live Camera
                          </button>
                          <button className="btn" onClick={()=>fileRef.current?.click()} style={{padding:"11px 18px",background:"var(--s1)",border:"1px solid var(--bdr)",color:"var(--txt2)",fontSize:12,display:"flex",alignItems:"center",gap:7}}>
                            {ic(Ic.Upload,16)} Upload Photo
                          </button>
                        </div>
                      </>
                    ):camOn?(
                      <>
                        <div style={{position:"relative",borderRadius:14,overflow:"hidden",marginBottom:12}}>
                          <video ref={vidRef} playsInline muted style={{width:"100%",borderRadius:14,transform:"scaleX(-1)"}}/>
                          {analyzing&&<div style={{position:"absolute",inset:0,background:"rgba(7,9,15,.75)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}><span className="spin" style={{width:30,height:30}}/><span style={{fontSize:12,color:"var(--gold)"}}>Analyzing with DVIDA standards...</span></div>}
                        </div>
                        <div style={{display:"flex",gap:9,justifyContent:"center"}}>
                          <button className="btn" onClick={captureFromCamera} disabled={analyzing} style={{padding:"10px 22px",background:"linear-gradient(135deg,var(--gold),#a08030)",color:"#07090f",fontSize:12,opacity:analyzing?0.5:1}}>Analyze Now</button>
                          <button className="btn" onClick={stopCam} style={{padding:"10px 18px",background:"var(--s1)",border:"1px solid var(--bdr)",color:"var(--txt2)",fontSize:12}}>{ic(Ic.X,14)} Close</button>
                        </div>
                      </>
                    ):(
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:20}}>
                        {analyzing?<><span className="spin" style={{width:28,height:28}}/><span style={{fontSize:13,color:"var(--txt2)"}}>Analyzing your photo...</span></>:<span style={{fontSize:13,color:"var(--txt2)"}}>Photo loaded ✓</span>}
                        <button className="btn" onClick={()=>setUploadMode(false)} style={{background:"none",color:"var(--txt3)",padding:4}}>{ic(Ic.X,16)}</button>
                      </div>
                    )}
                  </div>
                  {analysis&&(
                    <div style={{animation:"fu .4s ease"}}>
                      <div className="gl" style={{borderRadius:18,padding:20,textAlign:"center",marginBottom:10}}>
                        <div style={{fontSize:46,fontWeight:700,fontFamily:"var(--serif)",color:analysis.overall>=80?"var(--grn)":analysis.overall>=60?"var(--gold)":"var(--red)"}}>{analysis.overall}</div>
                        <div style={{fontSize:10,color:"var(--txt3)",textTransform:"uppercase",letterSpacing:2}}>Overall · DVIDA Standards</div>
                      </div>
                      <div className="gl" style={{borderRadius:18,padding:16,marginBottom:10}}>
                        {Object.entries(analysis.scores||{}).map(([k,v])=><ScoreBar key={k} label={k} val={v}/>)}
                      </div>
                      <div className="gl" style={{borderRadius:18,padding:16,marginBottom:10}}>
                        <div style={{fontSize:12,fontWeight:700,color:"var(--gold)",marginBottom:8}}>Coach Feedback</div>
                        {analysis.feedback?.map((f,i)=><div key={i} style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,marginBottom:6,paddingLeft:10,borderLeft:"2px solid rgba(201,168,76,.2)"}}>{f}</div>)}
                      </div>
                      {analysis.priority&&<div style={{borderRadius:16,padding:14,background:"rgba(201,168,76,.07)",border:"1px solid rgba(201,168,76,.12)"}}>
                        <div style={{fontSize:12,fontWeight:700,marginBottom:3}}>🎯 Priority Focus</div>
                        <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.5}}>{analysis.priority}</div>
                      </div>}
                      <button className="btn" onClick={()=>{setAnalysis(null);setUploadMode(false);stopCam();}} style={{width:"100%",marginTop:12,padding:"10px",background:"var(--s1)",border:"1px solid var(--bdr)",color:"var(--txt2)",fontSize:12}}>
                        New Analysis
                      </button>
                    </div>
                  )}
                </Row>
              )}

              {/* ROUTINE BUILDER */}
              {subView==="routine"&&(
                <Row>
                  <div style={{fontFamily:"var(--serif)",fontSize:17,marginBottom:4}}>Competition Routine Builder</div>
                  <p style={{fontSize:11,color:"var(--txt2)",marginBottom:14,lineHeight:1.5}}>Add figures via the Syllabus tab (tap +) · Separate Smooth from Rhythm for competition</p>
                  {routine.length===0?(
                    <div className="gl" style={{borderRadius:16,padding:24,textAlign:"center"}}>
                      <div style={{fontSize:36,marginBottom:8}}>📋</div>
                      <div style={{fontSize:13,color:"var(--txt2)"}}>Go to Syllabus → any level → tap + on a figure</div>
                      <button className="btn" onClick={()=>navTo("syllabus")} style={{marginTop:14,padding:"9px 20px",background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.2)",color:"var(--gold)",fontSize:12}}>Browse Syllabus</button>
                    </div>
                  ):(
                    <>
                      {/* Group by style */}
                      {["American Smooth","American Rhythm"].map(style=>{
                        const styled = routine.filter(r=>ALL_DANCES.find(d=>d.id===r.dance)?.style===style);
                        if(!styled.length) return null;
                        return(
                          <div key={style} style={{marginBottom:16}}>
                            <div style={{fontSize:10,fontWeight:700,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{style.replace("American ","")}</div>
                            {styled.map((r,i)=>(
                              <div key={r.id} className="gl" style={{borderRadius:12,padding:12,marginBottom:7,display:"flex",alignItems:"center",gap:10,animation:`fu .3s ease ${i*.04}s both`}}>
                                <div style={{width:24,height:24,borderRadius:6,background:"rgba(201,168,76,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"var(--gold)"}}>{i+1}</div>
                                <span style={{fontSize:18}}>{r.emoji}</span>
                                <div style={{flex:1}}>
                                  <div style={{fontSize:13,fontWeight:600}}>{r.fig}</div>
                                  <div style={{fontSize:10,color:"var(--txt3)"}}>{r.dName} · {r.level}</div>
                                </div>
                                <button className="btn" onClick={()=>removeFromRoutine(r.id)} style={{background:"none",color:"var(--red)",padding:4}}>{ic(Ic.Trash,14)}</button>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                      <button className="btn" onClick={genRoutineSheet} style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,var(--gold),#a08030)",color:"#07090f",fontSize:13,fontWeight:700,marginTop:4}}>
                        🎬 Get AI Coaching Notes
                      </button>
                      {shareRoutine&&shareRoutine!=="loading"&&(
                        <div className="gl" style={{borderRadius:14,padding:16,marginTop:10,animation:"fu .4s ease"}}>
                          <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",marginBottom:6}}>AI Routine Notes</div>
                          <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{shareRoutine}</div>
                        </div>
                      )}
                      {shareRoutine==="loading"&&<div style={{textAlign:"center",padding:14}}><span className="spin"/></div>}
                    </>
                  )}
                </Row>
              )}
            </div>
          )}

          {/* ═══════ PROGRESS ═══════ */}
          {tab==="progress"&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"44px 18px 14px"}}>
                <h1 style={{fontFamily:"var(--serif)",fontSize:26}}><span className="gold">{prog.userName?"Your Journey":""} Progress</span></h1>
              </div>
              <Row>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:16}}>
                  {[["📊",doneFigs,"Figures"],["🎯",prog.drillsCompleted,"Drills"],["⏱",prog.practiceMinutes,"Minutes"],["🧠",prog.quizScore?.correct||0,"Quiz ✓"],["📸",prog.analysisCount,"Analyses"],["🏅",prog.earnedBadges.length,"Badges"]].map(([em,v,l],i)=>(
                    <div key={i} className="gl" style={{borderRadius:12,padding:"12px 6px",textAlign:"center",animation:`fu .35s ease ${i*.05}s both`}}>
                      <div style={{fontSize:16,marginBottom:2}}>{em}</div>
                      <div style={{fontSize:18,fontWeight:700,color:"var(--gold)",fontFamily:"var(--serif)"}}>{v}</div>
                      <div style={{fontSize:9,color:"var(--txt3)",textTransform:"uppercase",letterSpacing:.6}}>{l}</div>
                    </div>
                  ))}
                </div>
                {/* Weekly chart — real data */}
                <div className="gl" style={{borderRadius:16,padding:16,marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:12}}>This Week</div>
                  <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90,justifyContent:"space-between"}}>
                    {weekData.map((d,i)=>(
                      <div key={i} style={{flex:1,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"}}>
                        {d.min>0&&<div style={{fontSize:8,color:"var(--gold)",marginBottom:2,fontWeight:600}}>{d.min}m</div>}
                        <div style={{width:"100%",height:`${Math.max(4,(d.min/maxMin)*72)}%`,borderRadius:4,background:d.isToday?"linear-gradient(180deg,var(--gold),#a08030)":d.min>0?"rgba(201,168,76,.22)":"var(--s1)",transition:"height .5s"}}/>
                        <div style={{fontSize:9,color:d.isToday?"var(--gold)":"var(--txt3)",marginTop:5,fontWeight:d.isToday?600:400}}>{d.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Per-dance progress */}
                <div style={{fontSize:14,fontWeight:600,marginBottom:10,fontFamily:"var(--serif)"}}>Syllabus Progress</div>
                {ALL_DANCES.map(d=>{
                  const pct = dancePct(d);
                  return(
                    <div key={d.id} style={{marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18,flexShrink:0}}>{d.emoji}</span>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                          <span>{d.name}</span><span style={{color:"var(--gold)",fontWeight:600}}>{pct}%</span>
                        </div>
                        <div style={{height:4,borderRadius:2,background:"var(--s1)"}}>
                          <div style={{height:"100%",borderRadius:2,width:`${pct}%`,background:d.color,transition:"width .6s"}}/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Row>
              {/* Badges */}
              <Row>
                <div style={{fontSize:14,fontWeight:600,marginBottom:10,fontFamily:"var(--serif)"}}>Achievements</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {BADGES.map((b,i)=>{
                    const earned = prog.earnedBadges.includes(b.id);
                    return(
                      <div key={b.id} className="gl" style={{borderRadius:12,padding:12,opacity:earned?1:.35,position:"relative",animation:`fu .3s ease ${i*.04}s both`}}>
                        {earned&&<div style={{position:"absolute",top:7,right:7,color:"var(--gold)"}}>{ic(Ic.Check,13)}</div>}
                        <div style={{fontSize:24,marginBottom:4}}>{b.icon}</div>
                        <div style={{fontSize:11,fontWeight:700,color:earned?"var(--gold)":"inherit"}}>{b.name}</div>
                        <div style={{fontSize:9,color:"var(--txt3)",marginTop:2,lineHeight:1.4}}>{b.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </Row>
            </div>
          )}

          {/* ═══════ COMMUNITY ═══════ */}
          {tab==="community"&&(
            <div style={{animation:"fu .4s ease"}}>
              <div style={{padding:"44px 18px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h1 style={{fontFamily:"var(--serif)",fontSize:26}}><span className="gold">Community</span></h1>
                  <button className="btn" onClick={reloadPosts} style={{background:"none",color:"var(--txt3)",padding:4}}>{ic(Ic.Refresh,16)}</button>
                </div>
                <p style={{fontSize:11,color:"var(--txt3)"}}>Real-time · Shared across all dancers{prog.userName?` · Posting as ${prog.userName}`:""}</p>
              </div>
              <Row>
                <div className="gl" style={{borderRadius:14,padding:14}}>
                  <textarea value={postIn} onChange={e=>setPostIn(e.target.value)} placeholder="Share a DVIDA tip, celebrate a win, or ask for help..."
                    style={{width:"100%",background:"transparent",border:"none",color:"var(--txt)",fontSize:13,resize:"none",height:52,lineHeight:1.5}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <span style={{fontSize:9,color:"var(--txt3)"}}>Shared with all dancers</span>
                    <button className="btn" onClick={submitPost} disabled={postLoad||!postIn.trim()}
                      style={{padding:"6px 14px",background:postIn.trim()?"linear-gradient(135deg,var(--gold),#a08030)":"var(--s1)",color:postIn.trim()?"#07090f":"var(--txt3)",fontSize:11,display:"flex",alignItems:"center",gap:4}}>
                      {postLoad?<span className="spin" style={{width:12,height:12}}/>:ic(Ic.Send,12)} Post
                    </button>
                  </div>
                </div>
              </Row>
              <Row>
                {posts.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:"var(--txt3)"}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p style={{fontSize:12}}>No posts yet — start the conversation!</p></div>}
                {posts.map((p,i)=>(
                  <div key={p.id} className="gl" style={{borderRadius:14,padding:13,marginBottom:9,animation:`fu .3s ease ${i*.04}s both`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(201,168,76,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"var(--gold)"}}>{(p.user||"D").charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{fontSize:11,fontWeight:600}}>{p.user||"Dancer"}</div>
                        <div style={{fontSize:9,color:"var(--txt3)"}}>{ago(p.time)}</div>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.6,marginBottom:8}}>{p.content}</div>
                    <button className="btn" onClick={()=>likePost(p.id)}
                      style={{background:"none",color:"var(--txt3)",fontSize:11,display:"flex",alignItems:"center",gap:4,padding:0}}>
                      <span style={{color:(p.likedBy||[]).includes(getUserId(prog))?"var(--red)":"var(--txt3)"}}>{ic(Ic.Heart,13)}</span>{p.likes}
                    </button>
                  </div>
                ))}
              </Row>
            </div>
          )}

        </div>

        {/* NAV BAR */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,zIndex:100}}>
          <div style={{background:"rgba(7,9,15,.97)",backdropFilter:"blur(16px)",borderTop:"1px solid var(--bdr)",padding:"5px 0 max(5px,env(safe-area-inset-bottom))",display:"flex",justifyContent:"space-around"}}>
            {[
              {k:"home",     l:"Home",    I:Ic.Home},
              {k:"syllabus", l:"Syllabus",I:Ic.Book},
              {k:"coach",    l:"Coach",   I:Ic.Bot},
              {k:"practice", l:"Practice",I:Ic.Music},
              {k:"progress", l:"Progress",I:Ic.Chart},
              {k:"community",l:"Social",  I:Ic.Users},
            ].map(({k,l,I})=>(
              <button key={k} className="btn" onClick={()=>navTo(k)}
                style={{background:"none",color:tab===k?"var(--gold)":"var(--txt3)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 6px",position:"relative",minWidth:0}}>
                {tab===k&&<div style={{position:"absolute",top:-1,left:"10%",right:"10%",height:2,borderRadius:1,background:"var(--gold)"}}/>}
                {ic(I,18)}
                <span style={{fontSize:9,fontWeight:tab===k?600:400,letterSpacing:.2,whiteSpace:"nowrap"}}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
