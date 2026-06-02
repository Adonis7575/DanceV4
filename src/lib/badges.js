/* ══════════════════════════════════════════════
   BADGES — earn conditions are pure predicates over progress.
══════════════════════════════════════════════ */
import { ALL_DANCES } from "../data/dvida.js";
import { pctLevel } from "./scoring.js";

export const BADGES = [
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
