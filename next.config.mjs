"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, FolderKanban, Mic, Sparkles, Heart, Check, ExternalLink, Wallet, Flame, Share2, Send, FileText, Lightbulb, Trash2, MessageCircle, Building2, Star, Zap, LayoutDashboard, CheckCircle2, Circle, RefreshCw, Award, Rocket, Link2 as LinkIcon, Bell, Clock, Users, TrendingUp, ShieldCheck, Download } from "lucide-react";

// تخزين يعمل في أي متصفّح (localStorage). الملاحظة: التخزين المشترك (shared) هنا لكل جهاز —
// التجميع الحقيقي عبر كل المستخدمين يتطلب قاعدة بيانات (انظر README).
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    get: async (k) => { try { const v = localStorage.getItem(k); return v != null ? { value: v } : null; } catch { return null; } },
    set: async (k, v) => { try { localStorage.setItem(k, v); } catch {} },
    delete: async (k) => { try { localStorage.removeItem(k); } catch {} },
    list: async () => ({ keys: [] }),
  };
}

// ── Brand: المنقذ ─────────────────────────────────────────────
const C = {
  bg: "#0C1118", surface: "#141B25", surface2: "#1B2430", surfaceHi: "#222C3A",
  ink: "#E9EEF5", sub: "#98A4B4", faint: "#66717F", line: "rgba(255,255,255,.08)",
  p1: "#2E6BF0", p2: "#18A0D8", acc: "#6BA6F2", lime: "#D9A441", mint: "#2FB873", amber: "#D9A441", rose: "#E0574F",
  chip: "rgba(255,255,255,.05)",
};
const DISP = "'IBM Plex Sans Arabic', sans-serif";
const BODY = "'IBM Plex Sans Arabic', sans-serif";
const GRAD = "linear-gradient(120deg,#2E6BF0,#18A0D8)";
const GLOW = "0 12px 40px -12px rgba(46,107,240,.5)";
const LOGO = "data:image/jpeg;base64,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";

const CITY_EN = { "الرياض": "Riyadh", "جدة": "Jeddah", "الدمام": "Dammam", "الخبر": "Khobar", "مكة المكرمة": "Mecca", "المدينة المنورة": "Medina", "نيوم": "NEOM", "الطائف": "Taif", "تبوك": "Tabuk", "أبها": "Abha", "الأحساء": "Al Ahsa", "القصيم": "Qassim", "ينبع": "Yanbu", "جازان": "Jazan" };
const CITIES = Object.keys(CITY_EN);
const JOB_TYPES = ["الكل", "دوام كامل", "دوام جزئي", "تدريب", "عن بُعد"];
const WORK_MODES = ["الكل", "حضوري", "عن بُعد", "هجين"];
const PIPE = [["saved", "محفوظة"], ["applied", "قدّمت"], ["interview", "مقابلة"], ["offer", "عرض"]];
const STATUS_LABEL = { saved: "محفوظة", applied: "قدّمت", interview: "مقابلة", offer: "عرض" };
const STATUS_COLOR = { saved: "#2E6BF0", applied: "#18A0D8", interview: "#D9A441", offer: "#2FB873" };
const BOARD_DOMAINS = [["linkedin", "linkedin.com"], ["لينكد", "linkedin.com"], ["bayt", "bayt.com"], ["بيت", "bayt.com"], ["indeed", "indeed.com"], ["gulftalent", "gulftalent.com"], ["naukri", "naukrigulf.com"], ["tanqeeb", "tanqeeb.com"], ["تنقيب", "tanqeeb.com"], ["jadarat", "jadarat.sa"], ["جدارات", "jadarat.sa"], ["glassdoor", "glassdoor.com"], ["google", "google.com"], ["مسند", "mihnati.com"], ["wadhefti", "wadhefti.taqat.sa"]];
const OWNER_PASS = "2030"; // ← غيّره لرمزك الخاص (لوحة المالك)
const COST_PER_AI_CALL = 0.012; // ← تكلفة تقديرية للنداء الواحد بالدولار (عدّلها حسب فاتورتك)
const USD_TO_SAR = 3.75;
const CV_TPLS = [
  { id: "modern", name: "عصري", desc: "حديث وأنيق — للتقنية والتسويق", accent: "#2E6BF0", band: true, chips: true },
  { id: "classic", name: "احترافي كلاسيكي", desc: "منظّم ورسمي — للشركات والحكومي", accent: "#6BA6F2", band: false, chips: false },
  { id: "creative", name: "إبداعي", desc: "جريء ومميّز — للتصميم والإبداع", accent: "#18A0D8", band: true, chips: true },
  { id: "exec", name: "تنفيذي", desc: "يبرز الإنجازات والقيادة — للمناصب العليا", accent: "#D9A441", band: false, chips: false },
];
const logoFor = (name) => { const n = (name || "").toLowerCase(); for (const [k, d] of BOARD_DOMAINS) { if (n.includes(k)) return d; } return null; };
const favicon = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
const G = (site, q, extra) => `https://www.google.com/search?q=${encodeURIComponent(`site:${site} ${q} ${extra || ""}`)}`;
function salaryNum(s) { if (!s) return 0; const L = String(s).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)); const m = L.match(/\d+/); let n = m ? +m[0] : 0; if (/ألف|الف|k/i.test(L) && n < 1000) n *= 1000; return n; }
const LOADERS = ["نقرأ ملفك…", "نلفّ على المواقع…", "نطابق لك الوظايف…", "نجهّز الملخّص…"];
const FOCUSES = ["في LinkedIn", "في Bayt.com", "في Indeed السعودية", "في GulfTalent للإدارة والهندسة", "في Naukrigulf للتقنية والهندسة", "في منصة جدارات الحكومية", "بمسميات وظيفية مرادفة وقريبة من التخصص", "لحديثي التخرج وأول وظيفة", "للمستويات القيادية (senior, lead, manager)", "عن بُعد أو هجين", "في كبرى الشركات السعودية ومشاريع رؤية ٢٠٣٠", "منشورة خلال الأيام الأخيرة"];

function buildLinks(field, city, jobType, workMode) {
  const en = CITY_EN[city] || city, q = encodeURIComponent(field.trim()), cityEnc = encodeURIComponent(en);
  let li = `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${encodeURIComponent(en + ", Saudi Arabia")}`;
  const wt = { "حضوري": "1", "عن بُعد": "2", "هجين": "3" }[workMode]; if (wt) li += `&f_WT=${wt}`;
  const jt = { "دوام كامل": "F", "دوام جزئي": "P", "تدريب": "I" }[jobType]; if (jt) li += `&f_JT=${jt}`;
  if (jobType === "عن بُعد") li += `&f_WT=2`;
  return [
    { group: "شركات خاصة", items: [
      { name: "LinkedIn", domain: "linkedin.com", url: li }, { name: "بيت.كوم", domain: "bayt.com", url: `https://www.bayt.com/en/saudi-arabia/jobs/?q=${q}` },
      { name: "Indeed", domain: "indeed.com", url: `https://sa.indeed.com/jobs?q=${q}&l=${cityEnc}` }, { name: "GulfTalent", domain: "gulftalent.com", url: G("gulftalent.com", field, en) },
      { name: "Naukrigulf", domain: "naukrigulf.com", url: G("naukrigulf.com", field, "saudi arabia") }, { name: "تنقيب", domain: "tanqeeb.com", url: G("tanqeeb.com", field, en) },
    ]},
    { group: "حكومي ووطني", items: [{ name: "جدارات", domain: "jadarat.sa", url: G("jadarat.sa", field) }]},
    { group: "رواتب وتقييم", items: [{ name: "Glassdoor", domain: "glassdoor.com", url: G("glassdoor.com", field + " salary", en) }, { name: "Google Jobs", domain: "google.com", url: `https://www.google.com/search?q=${q}+jobs+${cityEnc}&ibp=htl;jobs` }]},
  ];
}

export default function JobFinder() {
  const [field, setField] = useState("");
  const [years, setYears] = useState("");
  const [city, setCity] = useState("الرياض");
  const [jobType, setJobType] = useState("الكل");
  const [workMode, setWorkMode] = useState("الكل");
  const [nationality, setNationality] = useState("سعودي");
  const [fEligible, setFEligible] = useState(false);
  const [fRemote, setFRemote] = useState(false);
  const [fLevel, setFLevel] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [cvText, setCvText] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const [cvBase64, setCvBase64] = useState("");
  const [showIntake, setShowIntake] = useState(false);
  const [appd, setAppd] = useState({ name: "", email: "", phone: "", linkedin: "", notice: "", salary: "", status: "سعودي", relocate: "نعم" });

  const [phase, setPhase] = useState("form");
  const [tab, setTab] = useState("home");
  const [aiState, setAiState] = useState("idle");
  const [jobs, setJobs] = useState([]);
  const [report, setReport] = useState(null);
  const [cvReport, setCvReport] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [kits, setKits] = useState({});
  const [details, setDetails] = useState({});
  const [negos, setNegos] = useState({});
  const [company, setCompany] = useState({});
  const [refer, setRefer] = useState({});
  const [scam, setScam] = useState({});
  const [salaryR, setSalaryR] = useState(null);
  const [learnP, setLearnP] = useState(null);
  const [coverL, setCoverL] = useState(null);
  const [appliedAt, setAppliedAt] = useState({});
  const [cmp, setCmp] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [links, setLinks] = useState([]);
  const [status, setStatus] = useState({});
  const [viewFilter, setViewFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [shown, setShown] = useState(12);
  const [progress, setProgress] = useState(0);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [streak, setStreak] = useState({ count: 0, last: "", xp: 0 });
  const [account, setAccount] = useState({ connected: false, provider: "", name: "" });
  const [showAccount, setShowAccount] = useState(false);
  const [importing, setImporting] = useState(false);
  const [cvBuild, setCvBuild] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const [cvTpl, setCvTpl] = useState("modern");
  const [cvForm, setCvForm] = useState({ name: "", title: "", email: "", phone: "", linkedin: "", city: "", summary: "", experience: "", education: "", skills: "", languages: "", certs: "", achievements: "" });
  const [career, setCareer] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const fileRef = useRef(null);
  const toastId = useRef(0);

  useEffect(() => {
    const l = document.createElement("link"); l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(l); return () => { document.head.removeChild(l); };
  }, []);
  useEffect(() => { if (aiState !== "loading") return; const t = setInterval(() => setMsgIdx((i) => (i + 1) % LOADERS.length), 1900); return () => clearInterval(t); }, [aiState]);

  const today = () => new Date().toISOString().slice(0, 10);
  const sGet = async (k) => { try { if (window.storage) { const r = await window.storage.get(k, false).catch(() => null); return r ? JSON.parse(r.value) : null; } } catch {} return null; };
  const sSet = (k, v) => { try { if (window.storage) window.storage.set(k, JSON.stringify(v), false); } catch {} };
  const sGetS = async (k) => { try { if (window.storage) { const r = await window.storage.get(k, true).catch(() => null); return r ? JSON.parse(r.value) : null; } } catch {} return null; };
  const sSetS = (k, v) => { try { if (window.storage) window.storage.set(k, JSON.stringify(v), true); } catch {} };
  const uidRef = useRef(null);
  const aiPendingRef = useRef(0);
  const incr = (o, k) => { if (!k) return; o[k] = (o[k] || 0) + 1; };
  const trackAdmin = async (type, p = {}) => {
    try {
      const s = (await sGetS("laqha_admin_stats")) || {};
      s.users = s.users || {}; s.byField = s.byField || {}; s.byCity = s.byCity || {}; s.byNat = s.byNat || {}; s.funnel = s.funnel || { saved: 0, applied: 0, interview: 0, offer: 0 }; s.skillGaps = s.skillGaps || {}; s.recent = Array.isArray(s.recent) ? s.recent : []; s.daily = s.daily || {}; s.aiCalls = s.aiCalls || 0; s.searches = s.searches || 0; s.cvBuilds = s.cvBuilds || 0; s.connects = s.connects || 0;
      const day = new Date().toISOString().slice(0, 10);
      const db = s.daily[day] = s.daily[day] || { u: {}, searches: 0, applies: 0, ai: 0 };
      const pend = aiPendingRef.current || 0; aiPendingRef.current = 0; s.aiCalls += pend; db.ai += pend;
      if (uidRef.current) db.u[uidRef.current] = 1;
      const push = (label) => { s.recent = [{ t: label, f: p.field || "", c: p.city || "", ts: Date.now() }, ...s.recent].slice(0, 40); };
      if (type === "search") { s.searches += 1; db.searches += 1; incr(s.byField, p.field); incr(s.byCity, p.city); incr(s.byNat, p.nat); if (uidRef.current && Object.keys(s.users).length < 3000) s.users[uidRef.current] = Date.now(); push("بحث"); }
      else if (["saved", "applied", "interview", "offer"].includes(type)) { s.funnel[type] = (s.funnel[type] || 0) + 1; if (type === "applied") db.applies += 1; push(STATUS_LABEL[type] || type); }
      else if (type === "gaps") { (p.gaps || []).forEach((k) => incr(s.skillGaps, k)); }
      else if (type === "cv") { s.cvBuilds += 1; push("سيرة ذاتية"); }
      else if (type === "account") { s.connects += 1; push("ربط حساب"); }
      const days = Object.keys(s.daily); if (days.length > 70) { days.sort(); delete s.daily[days[0]]; }
      sSetS("laqha_admin_stats", s);
    } catch {}
  };
  const saveProfile = () => sSet("laqha_profile", { field, years, city, jobType, workMode, nationality, appd, cvText });

  useEffect(() => { (async () => {
    const seenI = await sGet("laqha_seen_intro"); if (!seenI) setShowIntro(true);
    const p = await sGet("laqha_profile");
    if (p) { setField(p.field || ""); setYears(p.years || ""); setCity(p.city || "الرياض"); setJobType(p.jobType || "الكل"); setWorkMode(p.workMode || "الكل"); if (p.nationality) setNationality(p.nationality); if (p.appd) setAppd(p.appd); if (p.cvText) setCvText(p.cvText); }
    const al = await sGet("laqha_alerts"); if (Array.isArray(al)) setAlerts(al);
    const aa = await sGet("laqha_appliedat"); if (aa) setAppliedAt(aa);
    let u = await sGet("laqha_uid"); if (!u) { u = Math.random().toString(36).slice(2, 10); sSet("laqha_uid", u); } uidRef.current = u;
    const sj = await sGet("laqha_jobs"); if (Array.isArray(sj)) setSavedJobs(sj);
    const stt = await sGet("laqha_status"); if (stt) setStatus(stt);
    const st = await sGet("laqha_streak"); if (st) setStreak(st);
    const acc = await sGet("laqha_account"); if (acc) setAccount(acc);
    setLoaded(true);
  })(); }, []);

  const toast = (msg) => { const id = ++toastId.current; setToasts((t) => [...t, { id, msg }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2300); };

  const handleFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (f.type !== "application/pdf") { setErrMsg("ارفع PDF بس، أو الصق نص سيرتك."); return; }
    setErrMsg(""); setCvFileName(f.name);
    const r = new FileReader(); r.onload = () => setCvBase64(String(r.result).split(",")[1] || ""); r.onerror = () => setErrMsg("ما قدرنا نقرأ الملف."); r.readAsDataURL(f);
  };
  const clearFile = () => { setCvBase64(""); setCvFileName(""); if (fileRef.current) fileRef.current.value = ""; };

  async function callClaude(messages, useSearch) {
    aiPendingRef.current = (aiPendingRef.current || 0) + 1;
    const res = await fetch("/api/claude", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages, useSearch }) });
    const data = await res.json();
    return (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  }
  function parseJobs(text) {
    const clean = text.replace(/```json|```/g, "").trim();
    try { const a = clean.indexOf("["), b = clean.lastIndexOf("]"); if (a !== -1 && b !== -1) return JSON.parse(clean.slice(a, b + 1)); } catch {}
    const out = []; const re = /\{[^{}]*?"title"[^{}]*?\}/g; let m; while ((m = re.exec(clean))) { try { out.push(JSON.parse(m[0])); } catch {} } return out;
  }
  function parseObj(text) { const c = text.replace(/```json|```/g, "").trim(); try { return JSON.parse(c.slice(c.indexOf("{"), c.lastIndexOf("}") + 1)); } catch { return null; } }
  function clientStats(list) {
    const ms = list.map((j) => +j.match || 0);
    const avg = ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length) : 0;
    const max = ms.length ? Math.max(...ms) : 0;
    const dist = { high: ms.filter((m) => m >= 80).length, mid: ms.filter((m) => m >= 60 && m < 80).length, low: ms.filter((m) => m < 60).length };
    return { avg, max, dist, total: list.length, salary: "", keywords: [], insights: [], steps: [], enriching: true };
  }

  const start = () => {
    if (!field.trim()) { setErrMsg("اكتب تخصصك أول."); return; }
    setErrMsg(""); saveProfile(); bumpDay(5); trackAdmin("search", { field, city, nat: nationality }); setLinks(buildLinks(field, city, jobType, workMode));
    setStatus({}); setViewFilter("all"); setSortBy("match"); setShown(12); setShowPlatforms(false); setCvReport(null); setDetails({}); setNegos({}); setPhase("results"); runAi();
  };

  const runAi = async () => {
    setAiState("loading"); setJobs([]); setReport(null); setKits({}); setProgress(0); setMsgIdx(0);
    const cvLine = cvText.trim() ? ` (سيرتي: ${cvText.trim().slice(0, 900)})` : "";
    const filt = `${jobType !== "الكل" ? "، " + jobType : ""}${workMode !== "الكل" ? "، " + workMode : ""}`;
    const seen = new Set(); const collected = [];
    const tmpl = (focus) =>
      `ابحث على الإنترنت عن وظائف حقيقية منشورة حالياً في السوق السعودي تناسب تخصص "${field}"، خبرة ${years || "أي"} سنة، مدينة ${city}${filt}. جنسية المتقدّم: ${nationality} (راعِ متطلبات السعودة/نطاقات — بعض الوظائف للسعوديين فقط).${cvLine} ركّز هذه المرة ${focus}.\n` +
      `أعِد JSON فقط (بدون نص/أسوار كود) كمصفوفة حتى 6 عناصر بهذه الحقول:\n[{"title":"","company":"","city":"","board":"","url":"رابط حقيقي من البحث","match":85,"salary":"نطاق راتب شهري","why":"سبب قصير جداً","missing":["كلمة ناقصة"],"saudiOnly":false,"posted":"قبل كم يوم تقريباً","level":"مبتدئ أو متوسط أو خبير","rating":4.2,"competition":"منخفضة أو متوسطة أو عالية","type":"دوام كامل أو جزئي أو عن بُعد"}]\nاجعل "match" أعلى إذا كانت الوظيفة متاحة لجنسية المتقدّم. روابط حقيقية فقط. قيم مختصرة بالعربية.`;
    const tasks = FOCUSES.map((f) => (async () => {
      try {
        const raw = await callClaude([{ role: "user", content: tmpl(f) }], true);
        const list = parseJobs(raw); const fresh = [];
        for (const j of list) { if (!j || !j.title) continue; const key = ((j.title || "") + "|" + (j.company || "")).toLowerCase().replace(/\s+/g, " ").trim(); if (!key || seen.has(key)) continue; seen.add(key); j._id = key; fresh.push(j); collected.push(j); }
        if (fresh.length) setJobs((prev) => [...prev, ...fresh]);
      } catch {} setProgress((p) => p + 1);
    })());
    await Promise.allSettled(tasks);
    if (collected.length === 0) { setAiState("error"); return; }
    setReport(clientStats(collected)); setAiState("done"); enrich(collected);
    if (cvText.trim() || cvBase64) analyzeCV();
  };
  const enrich = async (list) => {
    try {
      const prompt = `ملف مهني: تخصص ${field}، خبرة ${years || "—"} سنة، ${city}. أمثلة وظائف: ${list.slice(0, 14).map((j) => j.title).join("، ")}.\nأعِد JSON فقط: {"salary":"متوسط الراتب الشهري المتوقع لهذا التخصص في ${city} بالريال","keywords":["٥ كلمات مفتاحية تقوّي ظهور المرشح"],"insights":["٢-٣ ملاحظات عن السوق ضمن رؤية ٢٠٣٠"],"steps":["٣ خطوات تالية"]}. مختصر بالعربية بدون أسوار كود.`;
      const o = parseObj(await callClaude([{ role: "user", content: prompt }], false)) || {};
      setReport((r) => ({ ...r, enriching: false, salary: o.salary || "", keywords: o.keywords || [], insights: o.insights || [], steps: o.steps || [] }));
    } catch {
      setReport((r) => ({ ...r, enriching: false, salary: r?.salary || "", keywords: r?.keywords?.length ? r.keywords : [field, "Vision 2030", "تنظيم الوقت", "شغل الفريق", "التواصل"], insights: r?.insights?.length ? r.insights : ["الطلب على التخصص في زيادة مع مشاريع رؤية ٢٠٣٠."], steps: r?.steps?.length ? r.steps : ["حدّث سيرتك بكلمات الإعلانات", "فعّل «مهتم بفرص عمل» في لينكدإن", "قدّم بأول ٤٨ ساعة"] }));
    }
  };
  const analyzeCV = async () => {
    setCvReport({ loading: true });
    const content = cvBase64
      ? [{ type: "document", source: { type: "base64", media_type: "application/pdf", data: cvBase64 } }, { type: "text", text: `حلّل جاهزية هذه السيرة لوظائف "${field}" بالسعودية وأنظمة الفرز ATS. أعِد JSON فقط: {"score":رقم 0-100,"strengths":["نقطتا قوة"],"fixes":["٣ تحسينات سريعة"]}. بالعربية بدون أسوار كود.` }]
      : `حلّل جاهزية هذه السيرة لوظائف "${field}" بالسعودية وأنظمة الفرز ATS. السيرة: ${cvText.trim().slice(0, 2500)}.\nأعِد JSON فقط: {"score":رقم 0-100,"strengths":["نقطتا قوة"],"fixes":["٣ تحسينات سريعة"]}. بالعربية بدون أسوار كود.`;
    try { const o = parseObj(await callClaude([{ role: "user", content }], false)); setCvReport(o ? { loading: false, ...o } : null); } catch { setCvReport(null); }
  };
  const jobDetail = async (job) => {
    const id = job._id; setDetails((p) => ({ ...p, [id]: { loading: true } }));
    try { const t = await callClaude([{ role: "user", content: `اكتب نبذة موجزة بالعربية عن وظيفة "${job.title}" في "${job.company}": «المهام» (٣-٤ نقاط)، «المطلوب منك» (٣-٤ نقاط)، «عن الشركة» (سطر). مختصر.` }], false); setDetails((p) => ({ ...p, [id]: { loading: false, text: t.trim() } })); }
    catch { setDetails((p) => ({ ...p, [id]: { loading: false, text: "ما ضبط، جرّب مرة ثانية." } })); }
  };
  const companyInfo = async (job) => {
    const id = job._id; setCompany((p) => ({ ...p, [id]: { loading: true } }));
    try { const t = await callClaude([{ role: "user", content: `أعطني نبذة عن شركة "${job.company}" بأسلوب مراجعات الموظفين (مثل Glassdoor) بالعربية: «الإيجابيات» (٣ نقاط)، «السلبيات» (نقطتان)، «أجواء العمل» (سطر)، «نصيحة قبل المقابلة» (سطر). مختصر وواقعي.` }], false); setCompany((p) => ({ ...p, [id]: { loading: false, text: t.trim() } })); }
    catch { setCompany((p) => ({ ...p, [id]: { loading: false, text: "ما ضبط، جرّب مرة ثانية." } })); }
  };
  const referMsg = async (job) => {
    const id = job._id; setRefer((p) => ({ ...p, [id]: { loading: true } }));
    const me = `أنا ${appd.name || "(اسمك)"}، تخصص ${field || "—"}، خبرة ${years || "—"} سنة.`;
    try { const t = await callClaude([{ role: "user", content: `اكتب رسالة قصيرة ودودة ومهذّبة بالعربية أرسلها على لينكدإن لموظف أو مسؤول توظيف في شركة "${job.company}"، أعرّف بنفسي بإيجاز وأطلب ترشيحي/تعريفي لوظيفة "${job.title}". ${me} جاهزة للنسخ ومختصرة (٤-٥ أسطر).` }], false); setRefer((p) => ({ ...p, [id]: { loading: false, text: t.trim() } })); }
    catch { setRefer((p) => ({ ...p, [id]: { loading: false, text: "ما ضبط، جرّب مرة ثانية." } })); }
  };
  const scamCheck = async (job) => {
    const id = job._id; setScam((p) => ({ ...p, [id]: { loading: true } }));
    try { const o = parseObj(await callClaude([{ role: "user", content: `قيّم مصداقية إعلان وظيفة "${job.title}" في "${job.company}" (${job.board || ""}). أعِد JSON فقط: {"risk":"آمنة أو انتبه أو مشبوهة","flags":["إشارة تحذير إن وُجدت"],"tip":"نصيحة سطر واحد للتحقق"}. بدون أسوار كود.` }], false)); setScam((p) => ({ ...p, [id]: { loading: false, data: o || { risk: "—", flags: [], tip: "" } } })); }
    catch { setScam((p) => ({ ...p, [id]: { loading: false, data: { risk: "—", flags: [], tip: "تعذّر التحقق" } } })); }
  };
  const salaryRadar = async () => {
    setSalaryR({ loading: true }); saveProfile();
    try { const o = parseObj(await callClaude([{ role: "user", content: `قدّر رواتب وظيفة "${field || "غير محدد"}" في ${city} بالسعودية حسب الخبرة. أعِد JSON فقط: {"role":"","city":"","levels":[{"name":"مبتدئ","range":"نطاق شهري","mid":8000},{"name":"متوسط","range":"","mid":15000},{"name":"خبير","range":"","mid":25000}],"factors":["عامل يرفع الراتب"],"note":"ملاحظة سوقية سطر"}. أرقام واقعية بالريال. بدون أسوار كود.` }], false)); setSalaryR({ loading: false, data: o }); }
    catch { setSalaryR({ loading: false, error: true }); }
  };
  const learnPath = async () => {
    setLearnP({ loading: true }); saveProfile();
    const gaps = [...new Set(jobs.flatMap((j) => Array.isArray(j.missing) ? j.missing : []))].slice(0, 6).join("، ");
    try { const o = parseObj(await callClaude([{ role: "user", content: `اقترح مسار تعلّم لشخص تخصصه "${field || "غير محدد"}"${gaps ? ` ويحتاج هذه المهارات: ${gaps}` : ""} ليصير أقوى في سوق العمل السعودي. أعِد JSON فقط: {"skills":[{"name":"المهارة","why":"فايدتها سطر","resource":"مصدر مجاني مقترح (دروب/مهارات/يوتيوب/كورسيرا)"}]}. ٤-٥ مهارات بالعربية. بدون أسوار كود.` }], false)); setLearnP({ loading: false, data: o }); }
    catch { setLearnP({ loading: false, error: true }); }
  };
  const coverLetter = async () => {
    setCoverL({ loading: true }); saveProfile();
    try { const t = await callClaude([{ role: "user", content: `اكتب خطاب تقديم (Cover Letter) احترافي ومختصر بالعربية لشخص: ${appd.name || "(الاسم)"}، تخصص ${field || "—"}، خبرة ${years || "—"} سنة، ${city}. عام بحيث يصلح للتعديل لأي وظيفة، بنبرة واثقة. جاهز للنسخ.` }], false); setCoverL({ loading: false, text: t.trim() }); }
    catch { setCoverL({ loading: false, text: "ما ضبط، جرّب مرة ثانية." }); }
  };
  const makeKit = async (job) => {
    const id = job._id; setKits((p) => ({ ...p, [id]: { loading: true, parts: [] } }));
    const cvLine = cvText.trim() ? `\nسيرتي الحالية: ${cvText.trim().slice(0, 1300)}` : "";
    const me = `بياناتي: الاسم ${appd.name || "—"}، الإيميل ${appd.email || "—"}، الجوال ${appd.phone || "—"}، لينكدإن ${appd.linkedin || "—"}، الحالة ${appd.status}، فترة الإشعار ${appd.notice || "—"}، الراتب المتوقع ${appd.salary || "—"}، الانتقال ${appd.relocate}. تخصصي ${field}، خبرتي ${years || "—"} سنة.`;
    const J = `وظيفة "${job.title}" في "${job.company}" بمدينة ${job.city || city}`;
    const prompts = [
      `اكتب سيرة ذاتية مخصّصة لـ${J} بالعربية جاهزة للنسخ. ${me}${cvLine}\nبعناوين: «الملخص المهني» (٣ أسطر)، «أبرز المهارات» (٦-٨ نقاط)، «الخبرات والإنجازات» (٣-٤ نقاط بكلمات الإعلان). لا تختلق؛ الناقص اتركه بين قوسين.`,
      `اكتب بالعربية لـ${J} جزأين جاهزين. ${me}\n«رسالة التقديم»: ٤-٦ أسطر.\n«إيميل التقديم للمسؤول»: سطر الموضوع ثم نص يذكر إرفاق السيرة.`,
      `اكتب بالعربية لـ${J} ثلاثة أقسام. ${me}\n«إجابات أسئلة الفرز»: الإشعار، الراتب، الانتقال، سبب الاهتمام.\n«أسئلة مقابلة متوقعة»: ٣ مع إجابات.\n«رسالة المتابعة»: بعد أسبوع.`,
    ];
    const titles = ["سيرتك المخصّصة", "رسالة التقديم + الإيميل", "الفرز · المقابلة · المتابعة"];
    try { const results = await Promise.all(prompts.map((pr) => callClaude([{ role: "user", content: pr }], false))); setKits((p) => ({ ...p, [id]: { loading: false, parts: results.map((t, k) => ({ title: titles[k], body: t.trim() })) } })); }
    catch { setKits((p) => ({ ...p, [id]: { loading: false, parts: [{ title: "خطأ", body: "ما ضبط، جرّب مرة ثانية." }] } })); }
  };
  const negotiate = async (job) => {
    const id = job._id; setNegos((p) => ({ ...p, [id]: { loading: true } }));
    try { const t = await callClaude([{ role: "user", content: `وصلت لمرحلة عرض وظيفي لوظيفة "${job.title}" في "${job.company}". راتبي المتوقع ${appd.salary || "غير محدد"}. اكتب لي بالعربية المهذّبة: «٣ نصائح تفاوض» + «رسالة قصيرة جاهزة أرسلها للمسؤول لأفاوض على الراتب بأدب». مختصر وعملي.` }], false); setNegos((p) => ({ ...p, [id]: { loading: false, text: t.trim() } })); }
    catch { setNegos((p) => ({ ...p, [id]: { loading: false, text: "ما ضبط، جرّب مرة ثانية." } })); }
  };

  const copy = (t, msg) => { navigator.clipboard?.writeText(t); toast(msg || "نسخناها لك ✓"); };
  const shareJob = async (job) => {
    const txt = `${job.title} — ${job.company || ""}${job.city ? " · " + job.city : ""}\n${job.url || ""}`;
    try { if (navigator.share) { await navigator.share({ title: job.title, text: txt, url: job.url }); return; } } catch {}
    navigator.clipboard?.writeText(txt); toast("نسخنا الوظيفة، شاركها 🔥");
  };
  const reset = () => { setPhase("form"); setAiState("idle"); setJobs([]); setReport(null); setCvReport(null); setStatus({}); setErrMsg(""); };
  const upsert = (arr, job) => [{ ...job }, ...arr.filter((x) => x._id !== job._id)];
  const setStatusFor = (job, s, toggle) => {
    const cur = status[job._id];
    const ns = (toggle && cur === s) ? null : s;
    const n = { ...status }; if (ns) n[job._id] = ns; else delete n[job._id];
    const nj = ns ? upsert(savedJobs, job) : savedJobs.filter((x) => x._id !== job._id);
    setStatus(n); setSavedJobs(nj); sSet("laqha_status", n); sSet("laqha_jobs", nj);
    if (ns && ["saved", "applied", "interview", "offer"].includes(ns)) { trackAdmin(ns, { field, city }); if (Array.isArray(job.missing) && job.missing.length) trackAdmin("gaps", { gaps: job.missing.slice(0, 4) }); }
  };
  const setJobStatus = (job, s) => { setStatusFor(job, s, true); if (s === "applied") { bumpDay(10); setAppliedAt((p) => { const n = { ...p, [job._id]: Date.now() }; sSet("laqha_appliedat", n); return n; }); } toast(s === "saved" ? "حفظناها ♥" : "وسمناها مقدَّمة ✓"); };
  const setStage = (job, s) => { setStatusFor(job, s, false); toast(`نقلناها لـ«${STATUS_LABEL[s]}»`); };
  const untrack = (job) => { const n = { ...status }; delete n[job._id]; const nj = savedJobs.filter((x) => x._id !== job._id); setStatus(n); setSavedJobs(nj); sSet("laqha_status", n); sSet("laqha_jobs", nj); toast("شِلناها"); };

  const bumpDay = (add) => {
    const t = today(); let count = streak.count; const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (streak.last !== t) count = streak.last === y ? streak.count + 1 : 1;
    const ns = { count, last: t, xp: streak.xp + add }; setStreak(ns); sSet("laqha_streak", ns);
  };
  const saveAlert = () => {
    if (!field.trim()) return;
    const a = { id: field + "|" + city + "|" + Date.now(), field, city, jobType, workMode, nationality };
    const na = [a, ...alerts.filter((x) => !(x.field === field && x.city === city))].slice(0, 8);
    setAlerts(na); sSet("laqha_alerts", na); toast("فعّلنا تنبيه لوظايف مثلها 🔔");
  };
  const runAlert = (a) => { setField(a.field); setCity(a.city); setJobType(a.jobType || "الكل"); setWorkMode(a.workMode || "الكل"); if (a.nationality) setNationality(a.nationality); setTab("jobs"); setErrMsg(""); saveProfile(); bumpDay(5); setLinks(buildLinks(a.field, a.city, a.jobType || "الكل", a.workMode || "الكل")); setStatus({}); setViewFilter("all"); setSortBy("match"); setShown(12); setShowPlatforms(false); setCvReport(null); setDetails({}); setNegos({}); setPhase("results"); runAi(); };
  const removeAlert = (id) => { const na = alerts.filter((x) => x.id !== id); setAlerts(na); sSet("laqha_alerts", na); };
  const exportPdf = () => {
    if (!cvBuild?.data) return;
    const tpl = CV_TPLS.find((t) => t.id === cvBuild.tpl) || CV_TPLS[0];
    const html = cvHtml(cvBuild.data, tpl);
    let w = null;
    try { w = window.open("", "_blank"); } catch (e) {}
    if (w && w.document) {
      try { w.document.open(); w.document.write(html); w.document.close(); toast("بتفتح نافذة الطباعة — اختر «حفظ كـ PDF» 📄"); return; } catch (e) {}
    }
    try {
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `السيرة-الذاتية-${(cvBuild.data.name || "cv").replace(/\s+/g, "-")}.html`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 6000);
      toast("نزّلنا سيرتك — افتح الملف واختر «حفظ كـ PDF» 📄");
    } catch { toast("تعذّر التصدير، جرّب مرة ثانية"); }
  };
  const openCV = () => {
    setCvForm((f) => ({ ...f, name: f.name || appd.name || "", title: f.title || field || "", email: f.email || appd.email || "", phone: f.phone || appd.phone || "", linkedin: f.linkedin || appd.linkedin || "", city: f.city || city || "", summary: f.summary || (cvText ? cvText.slice(0, 400) : "") }));
    setShowCV(true);
  };
  const buildCV = async () => {
    saveProfile(); setShowCV(false); setCvBuild({ loading: true, tpl: cvTpl });
    const tpl = CV_TPLS.find((t) => t.id === cvTpl) || CV_TPLS[0];
    const f = cvForm;
    const info = `الاسم: ${f.name || "(الاسم)"}\nالمسمى المستهدف: ${f.title || field || "—"}\nالتواصل: ${[f.email, f.phone, f.linkedin, f.city].filter(Boolean).join(" | ") || "—"}\nنبذة: ${f.summary || "—"}\nالخبرات: ${f.experience || "—"}\nالتعليم: ${f.education || "—"}\nالمهارات: ${f.skills || "—"}\nاللغات: ${f.languages || "—"}\nالشهادات: ${f.certs || "—"}\nإنجازات: ${f.achievements || "—"}`;
    try {
      const o = parseObj(await callClaude([{ role: "user", content: `اصنع سيرة ذاتية احترافية وإبداعية بأسلوب قالب "${tpl.name}" (${tpl.desc}) لشخص بهذه المعلومات:\n${info}\nحسّن الصياغة، استخدم أفعال إنجاز وأرقاماً إن أمكن، ولا تختلق معلومات (الناقص اتركه فاضي).\nأعِدها بنسختين: عربية كاملة، وإنجليزية مترجمة بالكامل ترجمة احترافية (الأسماء تُكتب بالحروف اللاتينية).\nأعِد JSON فقط بهذا الشكل:\n{"ar":{"name":"","title":"","contact":"سطر تواصل واحد","summary":"٢-٣ أسطر","experience":["خبرة/إنجاز"],"education":[".."],"skills":[".."],"languages":[".."],"certs":[".."]},"en":{"name":"","title":"","contact":"one line","summary":"2-3 lines","experience":["achievement"],"education":[".."],"skills":[".."],"languages":[".."],"certs":[".."]}}\nبدون أسوار كود.` }], false));
      if (o) { setCvBuild({ loading: false, tpl: cvTpl, data: o }); trackAdmin("cv", {}); } else setCvBuild({ loading: false, tpl: cvTpl, error: true });
    } catch { setCvBuild({ loading: false, tpl: cvTpl, error: true }); }
  };
  const connectAccount = (provider) => { const acc = { connected: true, provider, name: appd.name || (appd.email ? appd.email.split("@")[0] : "حسابك") }; setAccount(acc); sSet("laqha_account", acc); setShowAccount(false); trackAdmin("account", {}); toast(`ربطنا حسابك عبر ${provider} ✓`); };
  const openAdmin = async () => { setAdminOpen(true); setAdminAuthed(false); setAdminPass(""); await trackAdmin("flush"); setAdminData(await sGetS("laqha_admin_stats")); };
  const startApp = (goJobs) => { setShowIntro(false); sSet("laqha_seen_intro", 1); setTab(goJobs ? "jobs" : "home"); };
  const refreshAdmin = async () => { await trackAdmin("flush"); setAdminData(await sGetS("laqha_admin_stats")); };
  const disconnectAccount = () => { const acc = { connected: false, provider: "", name: "" }; setAccount(acc); sSet("laqha_account", acc); toast("فصلنا الحساب"); };
  const importLinkedIn = async (text) => {
    if (!text.trim()) { toast("الصق نبذتك أو خبراتك من لينكدإن أول"); return; }
    setImporting(true);
    try {
      const o = parseObj(await callClaude([{ role: "user", content: `هذا محتوى ملف لينكدإن لشخص (نبذة وخبرات): "${text.slice(0, 2500)}". استخرج بياناته. أعِد JSON فقط: {"name":"الاسم","title":"المسمى أو التخصص الأنسب للبحث عن وظيفة","years":"عدد سنوات الخبرة رقم فقط","city":"المدينة بالعربية إن وُجدت","summary":"ملخص مهني ٣ أسطر + أبرز المهارات"}. بدون أسوار كود.` }], false)) || {};
      const nyears = o.years ? String(o.years).replace(/[^\d]/g, "") : years;
      const ncity = (o.city && CITIES.includes(o.city)) ? o.city : city;
      const nfield = o.title || field;
      const ncv = o.summary || cvText;
      const nappd = { ...appd, name: o.name || appd.name };
      if (o.title) setField(nfield);
      if (nyears) setYears(nyears);
      setCity(ncity);
      if (o.summary) setCvText(ncv);
      setAppd(nappd);
      const acc = { connected: true, provider: "LinkedIn", name: o.name || appd.name || "حسابك" };
      setAccount(acc); sSet("laqha_account", acc); trackAdmin("account", {});
      sSet("laqha_profile", { field: nfield, years: nyears, city: ncity, jobType, workMode, appd: nappd, cvText: ncv });
      setImporting(false); setShowAccount(false);
      toast("عبّينا ملفك من لينكدإن ✓");
    } catch { setImporting(false); toast("ما ضبط الاستيراد، جرّب مرة ثانية"); }
  };

  const buildCareer = async () => {
    setCareer({ loading: true }); saveProfile();
    try {
      const o = parseObj(await callClaude([{ role: "user", content: `ارسم مساراً مهنياً طموحاً لشخص تخصصه "${field || "غير محدد"}"، خبرته ${years || "—"} سنة، في ${city} بالسعودية. أعطِ ٤ مراحل متصاعدة من وضعه الحالي حتى القيادة. أعِد JSON فقط: {"stages":[{"title":"المسمى الوظيفي","salary":"نطاق الراتب الشهري","skills":["مهارة","مهارة"]}]}. اربط الفرص برؤية ٢٠٣٠ عند المناسبة. مختصر بالعربية بدون أسوار كود.` }], false)) || {};
      setCareer({ loading: false, stages: o.stages || [] });
    } catch { setCareer({ loading: false, stages: [] }); }
  };

  const setJobStatusLegacyRemoved = null;
  const mColor = (m) => (m >= 80 ? C.mint : m >= 60 ? C.amber : C.p2);
  const savedCount = Object.values(status).filter((s) => s === "saved").length;
  const appliedCount = Object.values(status).filter((s) => ["applied", "interview", "offer"].includes(s)).length;
  const tracked = savedJobs;

  const eligible = (j) => nationality === "سعودي" || !j.saudiOnly;
  let visible = jobs.filter((j) => {
    if (viewFilter !== "all" && status[j._id] !== viewFilter) return false;
    if (fEligible && !eligible(j)) return false;
    if (fRemote && !/عن ?بُعد|عن ?بعد|remote|هجين/i.test(`${j.type || ""} ${j.board || ""} ${j.title || ""}`)) return false;
    if (fLevel && j.level && j.level !== fLevel) return false;
    return true;
  });
  visible = [...visible].sort((a, b) => (sortBy === "salary" ? salaryNum(b.salary) - salaryNum(a.salary) : (+b.match || 0) - (+a.match || 0)));
  const best = (aiState === "done" && viewFilter === "all" && visible.length) ? visible.reduce((x, y) => ((+y.match || 0) > (+x.match || 0) ? y : x)) : null;
  const listJobs = best ? visible.filter((j) => j._id !== best._id) : visible;

  const jb = (job) => ({ job, st: status[job._id], kit: kits[job._id], detail: details[job._id], company: company[job._id], refer: refer[job._id], scam: scam[job._id], city, eligible: eligible(job), nationality,
    onKit: () => makeKit(job), onSave: () => setJobStatus(job, "saved"), onApplied: () => setJobStatus(job, "applied"),
    onDetail: () => jobDetail(job), onCompany: () => companyInfo(job), onRefer: () => referMsg(job), onScam: () => scamCheck(job), onShare: () => shareJob(job), onCopy: copy, mColor });

  return (
    <div className="jf" dir="rtl" style={{ background: C.bg, color: C.ink, fontFamily: BODY, minHeight: "100%", position: "relative" }}>
      <div style={{ position: "fixed", top: -120, right: -80, width: 320, height: 320, borderRadius: 999, background: "radial-gradient(circle,rgba(46,107,240,.3),transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: 260, left: -120, width: 320, height: 320, borderRadius: 999, background: "radial-gradient(circle,rgba(24,160,216,.2),transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <style>{`
        .jf{ -webkit-tap-highlight-color:transparent; }
        .jf input,.jf select,.jf textarea{color-scheme:dark}
        .jf input:focus,.jf select:focus,.jf textarea:focus{border-color:${C.p1}!important;box-shadow:0 0 0 4px rgba(46,107,240,.22)}
        .jf ::placeholder{color:#7E739B}
        .jf ::selection{background:rgba(46,107,240,.4)}
        .jf .chip,.jf .solid,.jf .gh,.jf .seg,.jf .jobcard{transition:transform .15s,box-shadow .15s,border-color .15s,background .15s,color .15s}
        .jf .chip:hover{border-color:${C.p1};transform:translateY(-2px)}
        .jf .solid:hover{transform:translateY(-2px);box-shadow:0 18px 44px -12px rgba(46,107,240,.7)}
        .jf .gh:hover{background:rgba(255,255,255,.06)}
        .jf .jobcard:hover{border-color:rgba(46,107,240,.4)}
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:.8}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-300px 0}100%{background-position:300px 0}}
        @keyframes toastin{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        .jf .pop{animation:pop .3s ease}
        .jf .sk{background:linear-gradient(90deg,${C.surface2} 25%,${C.surfaceHi} 50%,${C.surface2} 75%);background-size:600px 100%;animation:shimmer 1.3s infinite}
        .jf h1,.jf h2,.jf h3{font-family:${DISP}}
      `}</style>

      {/* APP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(12,17,24,.82)", borderBottom: `1px solid ${C.line}`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "11px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Brand size={36} />
            <span style={{ fontFamily: DISP, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>المنقذ</span>
          </div>
          {account.connected
            ? <button onClick={() => setTab("home")} style={{ border: "none", background: C.chip, cursor: "pointer", fontFamily: BODY, display: "flex", alignItems: "center", gap: 7, padding: "5px 10px 5px 12px", borderRadius: 99, color: C.ink }}><span style={{ width: 22, height: 22, borderRadius: 99, background: GRAD, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>{(account.name || "ح").trim().charAt(0)}</span><span style={{ fontSize: 12.5, fontWeight: 700 }}>{account.name}</span></button>
            : <button onClick={() => setShowAccount(true)} style={{ border: `1px solid ${C.line}`, background: C.chip, cursor: "pointer", fontFamily: BODY, display: "flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: 99, color: C.acc, fontSize: 12.5, fontWeight: 700 }}><LinkIcon size={14} /> ربط الحساب</button>}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "20px 18px 104px" }}>

        {tab === "home" && (() => {
          const level = Math.floor(streak.xp / 100) + 1;
          const prog = streak.xp % 100;
          const pipe = (k) => Object.values(status).filter((s) => s === k).length;
          return (
            <div className="pop">
              {/* greeting + streak */}
              <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", padding: "26px 24px", marginBottom: 16, background: "linear-gradient(150deg,#16233D,#0E1726)", border: `1px solid ${C.line}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <p style={{ color: C.sub, fontSize: 14, margin: 0 }}>أهلاً 👋</p>
                    <h1 style={{ fontWeight: 700, fontSize: 27, margin: "4px 0 0" }}>{appd.name ? appd.name : "يا بطل"}، جاهز لليوم؟</h1>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,.2)", padding: "8px 14px", borderRadius: 99 }}>
                    <Flame size={18} color={C.amber} /><span style={{ fontWeight: 700, fontSize: 16 }}>{toAr(streak.count)}</span><span style={{ fontSize: 12, color: C.sub }}>يوم</span>
                  </div>
                </div>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: GRAD, display: "grid", placeItems: "center", flexShrink: 0 }}><Award size={20} color="#fff" /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}><span style={{ fontWeight: 700 }}>المستوى {toAr(level)}</span><span style={{ color: C.sub }}>{toAr(prog)}/١٠٠ نقطة</span></div>
                    <div style={{ height: 7, background: "rgba(255,255,255,.1)", borderRadius: 99, overflow: "hidden" }}><div style={{ height: "100%", width: `${prog}%`, background: GRAD, borderRadius: 99, transition: "width .4s" }} /></div>
                  </div>
                </div>
              </div>

              {/* connect account */}
              {account.connected ? (
                <div style={{ ...card, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: GRAD, display: "grid", placeItems: "center", fontWeight: 800, color: "#fff", fontSize: 18 }}>{(account.name || "ح").trim().charAt(0)}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 15 }}>{account.name}</div><div style={{ fontSize: 12.5, color: C.mint, display: "flex", alignItems: "center", gap: 5 }}><Check size={13} /> مرتبط عبر {account.provider}</div></div>
                  </div>
                  <button onClick={disconnectAccount} className="gh" style={{ ...ghost, fontSize: 12.5, padding: "8px 14px" }}>فصل الحساب</button>
                </div>
              ) : (
                <div style={{ ...card, marginBottom: 16, background: "linear-gradient(150deg,#1A2740,#141B25)" }}>
                  <h2 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}><LinkIcon size={17} color={C.acc} /> اربط حسابك</h2>
                  <p style={{ color: C.sub, fontSize: 13.5, margin: "0 0 14px", lineHeight: 1.7 }}>اربط حسابك عشان نحفظ تقدّمك ونعبّي بياناتك بالتقديم تلقائياً.</p>
                  <button onClick={() => setShowAccount(true)} className="solid" style={{ ...primary, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><LinkIcon size={17} /> اربط الحين</button>
                </div>
              )}

              {/* quick actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[[Search, "دوّر وظايف", () => setTab("jobs"), C.p1], [FileText, "اصنع سيرتي", openCV, C.acc], [Mic, "بروفة مقابلة", () => setTab("interview"), C.amber], [FolderKanban, "طلباتك", () => setTab("apps"), C.mint]].map(([Ic, lbl, fn, col], i) => (
                  <button key={i} onClick={fn} className="jobcard" style={{ ...card, cursor: "pointer", textAlign: "right", padding: 16, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center" }}><Ic size={20} color={col} /></div>
                    <span style={{ fontWeight: 700, fontSize: 14.5 }}>{lbl}</span>
                  </button>
                ))}
              </div>

              {/* saved alerts */}
              {alerts.length > 0 && (
                <div style={{ ...card, marginBottom: 16 }}>
                  <h2 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}><Bell size={17} color={C.acc} /> تنبيهاتك</h2>
                  <div style={{ display: "grid", gap: 9 }}>
                    {alerts.map((a) => (
                      <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, background: C.surface2, borderRadius: 13, padding: "11px 13px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{a.field}</div><div style={{ fontSize: 12, color: C.sub }}>{a.city} · {a.nationality}{a.jobType && a.jobType !== "الكل" ? ` · ${a.jobType}` : ""}</div></div>
                        <button onClick={() => runAlert(a)} className="solid" style={{ ...primary, width: "auto", padding: "8px 14px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 5 }}><Search size={14} /> دوّر</button>
                        <button onClick={() => removeAlert(a.id)} className="gh" style={{ ...ghost, padding: "8px 10px", color: C.faint }}><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* pipeline snapshot */}
              {savedJobs.length > 0 && (
                <div style={{ ...card, marginBottom: 16 }}>
                  <h2 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 12px" }}>مسار طلباتك</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9 }}>
                    {PIPE.map(([k, lbl]) => <div key={k} style={{ background: C.surface2, borderRadius: 12, padding: "10px 6px", textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 19, color: STATUS_COLOR[k] }}>{toAr(pipe(k))}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 4 }}>{lbl}</div></div>)}
                  </div>
                </div>
              )}

              {/* CV builder output */}
              {cvBuild && (
                <div style={{ ...card, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8, flexWrap: "wrap" }}>
                    <h2 style={{ fontWeight: 700, fontSize: 16, margin: 0, display: "flex", alignItems: "center", gap: 8 }}><FileText size={18} color={C.acc} /> سيرتك الذاتية</h2>
                    {cvBuild.data && <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={openCV} className="gh" style={{ ...ghost, fontSize: 12, padding: "6px 13px" }}>عدّل / غيّر القالب</button>
                      <button onClick={() => copy(cvToText(cvBuild.data), "نسخنا سيرتك ✓")} className="gh" style={{ ...ghost, fontSize: 12, padding: "6px 13px" }}>انسخها</button>
                      <button onClick={exportPdf} className="solid" style={{ ...primary, width: "auto", fontSize: 12, padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: 6 }}><Download size={14} /> تصدير PDF</button>
                    </div>}
                  </div>
                  {cvBuild.loading ? <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 22, height: 22, borderRadius: 99, border: `3px solid ${C.line}`, borderTopColor: C.p1, animation: "spin .85s linear infinite" }} /><span style={{ fontSize: 13.5, color: C.sub }}>نبني لك سيرة احترافية…</span></div>
                    : cvBuild.error ? <p style={{ fontSize: 13.5, color: C.sub, margin: 0 }}>ما ضبط، جرّب مرة ثانية.</p>
                    : cvBuild.data ? <CVPreview data={cvBuild.data} tpl={CV_TPLS.find((t) => t.id === cvBuild.tpl) || CV_TPLS[0]} /> : null}
                </div>
              )}

              {/* tools: salary radar, learning path, cover letter */}
              <div style={{ ...card, marginBottom: 16 }}>
                <h2 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}><Sparkles size={17} color={C.acc} /> أدواتك</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 }}>
                  {[[Wallet, "رادار الرواتب", salaryRadar, salaryR?.loading], [TrendingUp, "مسار التعلّم", learnPath, learnP?.loading], [FileText, "خطاب تقديم", coverLetter, coverL?.loading]].map(([Ic, lbl, fn, ld], i) => (
                    <button key={i} onClick={fn} className="jobcard" style={{ ...card, cursor: "pointer", padding: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                      <Ic size={20} color={C.acc} /><span style={{ fontWeight: 700, fontSize: 12.5 }}>{ld ? "…" : lbl}</span>
                    </button>
                  ))}
                </div>
                {salaryR?.data && (
                  <div style={{ marginTop: 14, background: C.surface2, borderRadius: 13, padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>💰 رواتب {salaryR.data.role || field} {salaryR.data.city ? `· ${salaryR.data.city}` : ""}</div>
                    {(salaryR.data.levels || []).map((lv, i) => { const max = Math.max(...(salaryR.data.levels || []).map((z) => +z.mid || 0), 1); return (
                      <div key={i} style={{ marginBottom: 9 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}><span style={{ fontWeight: 700 }}>{lv.name}</span><span style={{ color: C.sub }}>{lv.range}</span></div>
                        <div style={{ height: 8, background: "rgba(255,255,255,.06)", borderRadius: 99 }}><div style={{ height: "100%", width: `${Math.round((+lv.mid || 0) / max * 100)}%`, background: GRAD, borderRadius: 99 }} /></div>
                      </div>
                    ); })}
                    {salaryR.data.note && <p style={{ fontSize: 12, color: C.sub, margin: "8px 0 0" }}>{salaryR.data.note}</p>}
                  </div>
                )}
                {learnP?.data?.skills && (
                  <div style={{ marginTop: 14, background: C.surface2, borderRadius: 13, padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📚 مسار تطوير مهاراتك</div>
                    <div style={{ display: "grid", gap: 9 }}>{learnP.data.skills.map((s, i) => (
                      <div key={i} style={{ background: C.surface, borderRadius: 11, padding: "10px 12px" }}>
                        <div style={{ fontWeight: 700, fontSize: 13.5, color: C.acc }}>{s.name}</div>
                        {s.why && <div style={{ fontSize: 12.5, color: "#D4DBE6", margin: "3px 0", lineHeight: 1.6 }}>{s.why}</div>}
                        {s.resource && <div style={{ fontSize: 12, color: C.mint }}>▸ {s.resource}</div>}
                      </div>
                    ))}</div>
                  </div>
                )}
                {coverL && (
                  <div style={{ marginTop: 14, background: C.surface2, borderRadius: 13, padding: 14, borderRight: `3px solid ${C.acc}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontWeight: 700, fontSize: 13.5 }}>✉️ خطاب التقديم</span>{coverL.text && <button onClick={() => copy(coverL.text, "نسخنا الخطاب ✓")} className="gh" style={{ ...ghost, fontSize: 11.5, padding: "5px 11px" }}>انسخ</button>}</div>
                    {coverL.loading ? <span style={{ fontSize: 13, color: C.sub }}>نكتب لك الخطاب…</span> : <p style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.9, margin: 0, color: "#D4DBE6" }}>{coverL.text}</p>}
                  </div>
                )}
              </div>

              {/* career roadmap */}
              <div style={{ ...card, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: career?.stages?.length ? 16 : 0 }}>
                  <h2 style={{ fontWeight: 700, fontSize: 16, margin: 0, display: "flex", alignItems: "center", gap: 8 }}><Rocket size={18} color={C.amber} /> مسارك المهني</h2>
                  <button onClick={buildCareer} className="gh" style={{ ...ghost, fontSize: 12.5, padding: "7px 13px" }}>{career?.loading ? "نرسم…" : career?.stages?.length ? "ارسم من جديد" : "ارسم مساري"}</button>
                </div>
                {career?.loading && <div style={{ marginTop: 14 }}><Shimmer /></div>}
                {career?.stages?.length > 0 && (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: 17, top: 6, bottom: 6, width: 2, background: "linear-gradient(#2E6BF0,#2FB873)", borderRadius: 2 }} />
                    {career.stages.map((s, i) => (
                      <div key={i} style={{ position: "relative", paddingRight: 44, marginBottom: i === career.stages.length - 1 ? 0 : 16 }}>
                        <div style={{ position: "absolute", right: 6, top: 2, width: 24, height: 24, borderRadius: 99, background: i === 0 ? GRAD : C.surface2, border: `2px solid ${i === 0 ? "transparent" : C.line}`, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, color: i === 0 ? "#fff" : C.sub }}>{toAr(i + 1)}</div>
                        <div style={{ background: C.surface2, borderRadius: 14, padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>{s.title}{i === 0 && <span style={{ fontSize: 11, color: C.acc, marginRight: 6 }}> · الآن</span>}</span>
                            {s.salary && <span style={{ fontSize: 12, fontWeight: 700, color: C.mint, background: "rgba(47,184,115,.12)", padding: "4px 10px", borderRadius: 99 }}>{s.salary}</span>}
                          </div>
                          {Array.isArray(s.skills) && s.skills.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 9 }}>{s.skills.map((sk, x) => <span key={x} style={{ fontSize: 11.5, fontWeight: 600, color: C.sub, background: C.chip, border: `1px solid ${C.line}`, padding: "3px 9px", borderRadius: 8 }}>{sk}</span>)}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!career && <p style={{ color: C.sub, fontSize: 13.5, margin: "10px 0 0" }}>شوف وين تقدر توصل بتخصصك، والمهارات اللي تنقلك للمرحلة الجاية.</p>}
              </div>

              <p style={{ textAlign: "center", color: C.faint, fontSize: 12.5, marginTop: 6, lineHeight: 1.7 }}>كل خطوة صغيرة تقرّبك. لا تطنّش اليوم 💙</p>
              <div style={{ textAlign: "center", marginTop: 14 }}><button onClick={openAdmin} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: BODY, fontSize: 11.5, color: C.faint, opacity: .6, display: "inline-flex", alignItems: "center", gap: 5 }}><ShieldCheck size={12} /> لوحة المالك</button></div>
            </div>
          );
        })()}

        {tab === "jobs" && (<>
        {phase === "form" && (<>
          <div style={{ position: "relative", borderRadius: 30, overflow: "hidden", padding: "34px 26px", marginBottom: 18, background: "linear-gradient(150deg,#16233D,#0E1726)", border: `1px solid ${C.line}` }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: C.lime, background: "rgba(217,164,65,.12)", padding: "6px 13px", borderRadius: 99 }}><Zap size={14} /> ٥٠+ وظيفة · ببلاش</span>
            <h1 style={{ fontFamily: DISP, fontWeight: 800, fontSize: 38, lineHeight: 1.25, margin: "16px 0 8px" }}>لاقِ <span style={{ background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>شغلك</span> بثواني</h1>
            <p style={{ color: C.sub, fontSize: 15, lineHeight: 1.85, margin: 0, maxWidth: 480 }}>نلفّ لك على عشرات الوظايف الحقيقية، نحلّل سيرتك، ونجهّزلك كل شي للتقديم — وكله ببلاش 💜</p>
          </div>

          <div style={card}>
            <Field label="وش تخصصك؟"><input value={field} onChange={(e) => setField(e.target.value)} placeholder="إدارة مشاريع، تسويق، مبرمج…" style={inp} /></Field>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Field label="كم سنة خبرة؟" grow><input value={years} onChange={(e) => setYears(e.target.value.replace(/[^\d]/g, ""))} placeholder="٥" inputMode="numeric" style={inp} /></Field>
              <Field label="وين مدينتك؟" grow><select value={city} onChange={(e) => setCity(e.target.value)} style={{ ...inp, appearance: "none" }}>{CITIES.map((c) => <option key={c} style={optS}>{c}</option>)}</select></Field>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Field label="نوع الدوام" grow><select value={jobType} onChange={(e) => setJobType(e.target.value)} style={{ ...inp, appearance: "none" }}>{JOB_TYPES.map((c) => <option key={c} style={optS}>{c}</option>)}</select></Field>
              <Field label="نمط العمل" grow><select value={workMode} onChange={(e) => setWorkMode(e.target.value)} style={{ ...inp, appearance: "none" }}>{WORK_MODES.map((c) => <option key={c} style={optS}>{c}</option>)}</select></Field>
            </div>
            <Field label="جنسيتك؟ (نطابق لك حسب متطلبات السعودة)">
              <div style={{ display: "flex", gap: 10 }}>
                {["سعودي", "غير سعودي"].map((n) => (
                  <button key={n} onClick={() => setNationality(n)} style={{ flex: 1, cursor: "pointer", fontFamily: BODY, fontSize: 14.5, fontWeight: 700, padding: "12px", borderRadius: 13, background: nationality === n ? GRAD : C.surface2, border: `1.5px solid ${nationality === n ? "transparent" : C.line}`, color: nationality === n ? "#fff" : C.sub }}>{n}</button>
                ))}
              </div>
            </Field>
            <Field label="سيرتك الذاتية (لو عندك — تفعّل تحليل الجاهزية)">
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => fileRef.current?.click()} className="gh" style={{ ...ghost, display: "inline-flex", alignItems: "center", gap: 7 }}><FileText size={16} /> ارفع PDF</button>
                <input ref={fileRef} type="file" accept="application/pdf" onChange={handleFile} style={{ display: "none" }} />
                {cvFileName && <span style={{ fontSize: 13, color: C.acc, fontWeight: 700 }}>{cvFileName}<button onClick={clearFile} style={xbtn}>×</button></span>}
              </div>
              <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} rows={3} placeholder="أو الصق خبراتك ومهاراتك هنا…" style={{ ...inp, marginTop: 10, resize: "vertical", lineHeight: 1.9 }} />
            </Field>
            <button onClick={() => setShowIntake((s) => !s)} className="gh" style={{ ...ghost, width: "100%", marginBottom: showIntake ? 14 : 0 }}>{showIntake ? "إخفاء بياناتك ▲" : "بياناتك للتقديم (يعبّيها لك) ▾"}</button>
            {showIntake && (
              <div style={{ background: C.surface2, borderRadius: 16, padding: 16, marginBottom: 4 }}>
                <p style={{ fontSize: 12, color: C.sub, margin: "0 0 14px" }}>نعبّيها لك بطلبات التقديم وأسئلة الفرز تلقائياً.</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Mini label="اسمك الكامل"><input value={appd.name} onChange={(e) => setAppd({ ...appd, name: e.target.value })} style={inp} /></Mini>
                  <Mini label="إيميلك"><input value={appd.email} onChange={(e) => setAppd({ ...appd, email: e.target.value })} style={inp} /></Mini>
                  <Mini label="جوالك"><input value={appd.phone} onChange={(e) => setAppd({ ...appd, phone: e.target.value })} style={inp} /></Mini>
                  <Mini label="لينكدإن"><input value={appd.linkedin} onChange={(e) => setAppd({ ...appd, linkedin: e.target.value })} style={inp} /></Mini>
                  <Mini label="فترة الإشعار"><input value={appd.notice} onChange={(e) => setAppd({ ...appd, notice: e.target.value })} placeholder="شهر" style={inp} /></Mini>
                  <Mini label="راتبك المتوقع"><input value={appd.salary} onChange={(e) => setAppd({ ...appd, salary: e.target.value })} placeholder="١٨٬٠٠٠" style={inp} /></Mini>
                  <Mini label="الحالة"><select value={appd.status} onChange={(e) => setAppd({ ...appd, status: e.target.value })} style={{ ...inp, appearance: "none" }}><option style={optS}>سعودي</option><option style={optS}>مقيم</option></select></Mini>
                  <Mini label="تنتقل لمدينة ثانية؟"><select value={appd.relocate} onChange={(e) => setAppd({ ...appd, relocate: e.target.value })} style={{ ...inp, appearance: "none" }}><option style={optS}>نعم</option><option style={optS}>لا</option></select></Mini>
                </div>
              </div>
            )}
            {errMsg && <p style={{ color: C.rose, fontSize: 14, margin: "12px 0 4px" }}>{errMsg}</p>}
            <button onClick={start} className="solid" style={{ ...primary, marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Search size={19} /> يلا دوّر</button>
          </div>
        </>)}

        {phase === "results" && (<>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 10, flexWrap: "wrap" }}>
            <div><h2 style={{ fontWeight: 800, fontSize: 22, margin: 0 }}>{field}</h2><span style={{ color: C.sub, fontSize: 13 }}>{city}{aiState === "done" ? ` · ${toAr(jobs.length)} فرصة` : ""}</span></div>
            <button onClick={reset} className="gh" style={{ ...ghost, fontSize: 13.5, padding: "9px 16px" }}>دوّر من جديد</button>
          </div>

          {aiState === "loading" && (<>
            <div style={{ ...card, padding: "20px 22px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ fontFamily: DISP, fontWeight: 800, fontSize: 36, background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>{toAr(jobs.length)}</span><span style={{ fontSize: 14, color: C.ink }}>{LOADERS[msgIdx]}</span></div>
              <div style={{ height: 6, background: C.surface2, borderRadius: 99, overflow: "hidden", marginTop: 12 }}><div style={{ height: "100%", width: `${(progress / FOCUSES.length) * 100}%`, background: GRAD, borderRadius: 99, transition: "width .4s" }} /></div>
              <p style={{ color: C.sub, fontSize: 12.5, margin: "9px 0 0" }}>نلفّ على {toAr(FOCUSES.length)} مصادر مرة وحدة ({toAr(progress)}/{toAr(FOCUSES.length)})</p>
            </div>
            {jobs.length === 0 && [0, 1, 2].map((i) => (<div key={i} style={{ ...card, marginBottom: 12 }}><div className="sk" style={{ height: 16, width: "40%", borderRadius: 8, marginBottom: 12 }} /><div className="sk" style={{ height: 20, width: "75%", borderRadius: 8, marginBottom: 8 }} /><div className="sk" style={{ height: 14, width: "55%", borderRadius: 8 }} /></div>))}
          </>)}
          {aiState === "error" && (<div style={{ ...card, marginBottom: 16 }}><p style={{ fontSize: 14.5, lineHeight: 1.85, margin: 0 }}>ما طلّعنا شي هالمرة — جرّب روابط المواقع تحت.</p><button onClick={runAi} className="gh" style={{ ...ghost, marginTop: 12 }}>جرّب مرة ثانية</button></div>)}

          {aiState === "done" && report && (
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 14, border: "none" }}>
              <div style={{ background: GRAD, padding: "20px 22px 18px", color: "#fff" }}>
                <span style={{ fontSize: 12, fontWeight: 800, opacity: .9 }}>وضعك بنظرة</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginTop: 14 }}>
                  <Stat n={toAr(report.total)} l="فرصة" /><Stat n={toAr(report.avg) + "٪"} l="متوسط التطابق" /><Stat n={toAr(report.max) + "٪"} l="أعلى تطابق" />
                </div>
                {(report.salary || report.enriching) && (<div style={{ marginTop: 9, background: "rgba(0,0,0,.18)", borderRadius: 14, padding: "11px 14px", display: "flex", alignItems: "center", gap: 11 }}><Wallet size={20} /><div><div style={{ fontSize: 11, opacity: .85, fontWeight: 700 }}>متوسط الراتب للتخصص</div><div style={{ fontWeight: 800, fontSize: 15 }}>{report.salary || "نحسبه…"}</div></div></div>)}
              </div>
              <div style={{ background: C.surface, padding: 20 }}>
                {cvReport && (<Section title="جاهزية سيرتك (ATS)">{cvReport.loading ? <Shimmer /> : (<div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}><Ring value={cvReport.score || 0} color={mColor(cvReport.score || 0)} /><div style={{ flex: 1, minWidth: 200 }}>{(cvReport.strengths || []).length > 0 && <div style={{ fontSize: 13, marginBottom: 6 }}><b style={{ color: C.mint }}>قوّتك: </b>{(cvReport.strengths || []).join("، ")}</div>}{(cvReport.fixes || []).map((f, i) => <div key={i} style={{ fontSize: 13.5, color: C.sub, display: "flex", gap: 7, marginTop: 4 }}><span style={{ color: C.amber }}>↑</span>{f}</div>)}</div></div>)}</Section>)}
                <Section title="كيف توزّعت الفرص"><Dist label="ممتاز ٨٠٪+" v={report.dist.high} total={report.total} color={C.mint} /><Dist label="جيد ٦٠–٧٩٪" v={report.dist.mid} total={report.total} color={C.amber} /><Dist label="مقبول أقل من ٦٠٪" v={report.dist.low} total={report.total} color={C.p2} /></Section>
                <Section title="كلمات تقوّيك">{report.enriching && !report.keywords.length ? <Shimmer /> : <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{report.keywords.map((k, i) => <span key={i} style={{ fontSize: 13, fontWeight: 700, background: C.chip, color: C.acc, padding: "6px 13px", borderRadius: 99, border: `1px solid ${C.line}` }}>{k}</span>)}</div>}</Section>
                {(report.insights.length || report.enriching) ? <Section title="نبض السوق">{report.enriching && !report.insights.length ? <Shimmer /> : <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>{report.insights.map((a, i) => <li key={i} style={{ fontSize: 14, lineHeight: 1.75, paddingRight: 20, position: "relative", color: C.ink }}><span style={{ position: "absolute", right: 0, color: C.p2 }}>◆</span>{a}</li>)}</ul>}</Section> : null}
                <Section title="خطواتك الجاية" last>{report.enriching && !report.steps.length ? <Shimmer /> : <div style={{ display: "grid", gap: 10 }}>{report.steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}><span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 99, background: GRAD, color: "#fff", fontSize: 13, fontWeight: 800, display: "grid", placeItems: "center", fontFamily: DISP }}>{toAr(i + 1)}</span><span style={{ fontSize: 14, lineHeight: 1.6, paddingTop: 3 }}>{s}</span></div>)}</div>}</Section>
              </div>
            </div>
          )}

          {jobs.length > 0 && aiState === "done" && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
              {[["all", `الكل ${toAr(jobs.length)}`], ["saved", `♡ ${toAr(savedCount)}`], ["applied", `✓ ${toAr(appliedCount)}`]].map(([k, lbl]) => (
                <button key={k} className="seg" onClick={() => { setViewFilter(k); setShown(12); }} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 13, fontWeight: 700, padding: "8px 14px", borderRadius: 99, background: viewFilter === k ? GRAD : C.chip, color: viewFilter === k ? "#fff" : C.sub }}>{lbl}</button>
              ))}
              <div style={{ marginRight: "auto" }}><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ ...inp, padding: "8px 12px", fontSize: 13, width: "auto", appearance: "none" }}><option value="match" style={optS}>الأعلى تطابق</option><option value="salary" style={optS}>الأعلى راتب</option></select></div>
            </div>
          )}
          {jobs.length > 0 && aiState === "done" && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
              <button onClick={() => setFEligible((v) => !v)} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 12.5, fontWeight: 700, padding: "7px 13px", borderRadius: 99, background: fEligible ? C.mint : C.chip, color: fEligible ? "#0B0617" : C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><Check size={13} /> المتاحة لي</button>
              <button onClick={() => setFRemote((v) => !v)} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 12.5, fontWeight: 700, padding: "7px 13px", borderRadius: 99, background: fRemote ? C.p2 : C.chip, color: fRemote ? "#fff" : C.sub }}>عن بُعد</button>
              <select value={fLevel} onChange={(e) => setFLevel(e.target.value)} style={{ ...inp, padding: "7px 11px", fontSize: 12.5, width: "auto", appearance: "none" }}><option value="" style={optS}>كل المستويات</option><option value="مبتدئ" style={optS}>مبتدئ</option><option value="متوسط" style={optS}>متوسط</option><option value="خبير" style={optS}>خبير</option></select>
              <button onClick={saveAlert} className="gh" style={{ ...ghost, fontSize: 12.5, padding: "7px 13px", marginRight: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: C.acc, borderColor: "rgba(107,166,242,.4)" }}><Bell size={14} /> نبّهني بمثلها</button>
            </div>
          )}

          {best && (
            <div className="pop" style={{ position: "relative", borderRadius: 22, padding: 1.5, background: GRAD, marginBottom: 14 }}>
              <div style={{ background: C.surface, borderRadius: 20.5, padding: 20 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 800, color: C.amber }}><Flame size={15} /> أقوى تطابق لك</span>
                <JobBody {...jb(best)} />
              </div>
            </div>
          )}

          {listJobs.slice(0, shown).map((job) => (
            <div key={job._id} className="jobcard pop" style={{ ...card, marginBottom: 12, border: status[job._id] === "applied" ? `1.5px solid ${C.p2}` : status[job._id] === "saved" ? `1.5px solid ${C.p1}` : `1px solid ${C.line}` }}>
              <JobBody {...jb(job)} />
            </div>
          ))}

          {listJobs.length > shown && <button onClick={() => setShown((s) => s + 12)} className="gh" style={{ ...ghost, width: "100%", marginTop: 4, marginBottom: 4 }}>ورّني أكثر ({toAr(listJobs.length - shown)} فرصة)</button>}
          {aiState === "done" && visible.length === 0 && <p style={{ textAlign: "center", color: C.sub, fontSize: 14, padding: "10px 0" }}>ما في شي بهالقائمة لين الحين.</p>}

          {aiState !== "loading" && (
            <div style={{ ...card, marginTop: 14 }}>
              <button onClick={() => setShowPlatforms((s) => !s)} style={{ width: "100%", border: "none", background: "none", color: C.ink, fontFamily: BODY, fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span>دوّر بنفسك بالمواقع</span><span style={{ color: C.sub }}>{showPlatforms ? "▲" : "▾"}</span></button>
              {showPlatforms && <div style={{ marginTop: 14 }}>{links.map((grp) => (<div key={grp.group} style={{ marginBottom: 12 }}><div style={{ fontSize: 11.5, fontWeight: 800, color: C.sub, marginBottom: 8 }}>{grp.group}</div><div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>{grp.items.map((l) => (<a key={l.name} className="chip" href={l.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: C.ink, background: C.chip, border: `1px solid ${C.line}`, padding: "8px 13px 8px 11px", borderRadius: 12, fontWeight: 700, fontSize: 13.5, display: "inline-flex", alignItems: "center", gap: 8 }}><Logo domain={l.domain} size={18} />{l.name}</a>))}</div></div>))}</div>}
            </div>
          )}
          <p style={{ textAlign: "center", color: C.faint, fontSize: 11.5, marginTop: 24 }}>التقديم تسوّيه بنفسك بضغطة — وكله ببلاش 💜</p>
        </>)}
        </>)}

        {tab === "interview" && <Interview field={field} call={callClaude} toast={toast} mColor={mColor} />}

        {tab === "apps" && (
          <div className="pop">
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "26px 24px", marginBottom: 16, background: "linear-gradient(150deg,#16233D,#0E1726)", border: `1px solid ${C.line}` }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: C.lime, background: "rgba(217,164,65,.12)", padding: "6px 13px", borderRadius: 99 }}><FolderKanban size={14} /> متتبّع طلباتك</span>
              <h1 style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.3, margin: "14px 0 6px" }}>طلباتك</h1>
              <p style={{ color: C.sub, fontSize: 14.5, lineHeight: 1.8, margin: 0 }}>تابع وظايفك من الحفظ لين العرض، ونقّلها بين المراحل بضغطة.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9, marginTop: 16 }}>{PIPE.map(([k, lbl]) => <Stat key={k} n={toAr(Object.values(status).filter((s) => s === k).length)} l={lbl} />)}</div>
            </div>
            {tracked.length > 0 && (() => {
              const appN = Object.values(status).filter((s) => ["applied", "interview", "offer"].includes(s)).length;
              const intN = Object.values(status).filter((s) => ["interview", "offer"].includes(s)).length;
              const offN = Object.values(status).filter((s) => s === "offer").length;
              const rate = appN ? Math.round(intN / appN * 100) : 0;
              return (
                <div style={{ ...card, marginBottom: 16 }}>
                  <h2 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}><TrendingUp size={17} color={C.acc} /> لوحة تحليلاتك</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9 }}>
                    {[[toAr(appN), "قدّمت"], [toAr(rate) + "٪", "نسبة الردود"], [toAr(offN), "عروض"]].map(([n, l], i) => <div key={i} style={{ background: C.surface2, borderRadius: 12, padding: "12px 6px", textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 21, color: C.acc }}>{n}</div><div style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>{l}</div></div>)}
                  </div>
                </div>
              );
            })()}
            {cmp.length === 2 && (() => {
              const a = savedJobs.find((j) => j._id === cmp[0]), b = savedJobs.find((j) => j._id === cmp[1]);
              if (!a || !b) return null;
              const rows = [["الوظيفة", a.title, b.title], ["الشركة", a.company, b.company], ["التطابق", toAr(a.match || 0) + "٪", toAr(b.match || 0) + "٪"], ["الراتب", a.salary || "—", b.salary || "—"], ["المستوى", a.level || "—", b.level || "—"], ["المنافسة", a.competition || "—", b.competition || "—"], ["الإتاحة", a.saudiOnly ? "للسعوديين" : "للمقيمين", b.saudiOnly ? "للسعوديين" : "للمقيمين"]];
              return (
                <div style={{ ...card, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><h2 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>⚖️ مقارنة وظيفتين</h2><button onClick={() => setCmp([])} className="gh" style={{ ...ghost, fontSize: 12, padding: "6px 12px" }}>إلغاء</button></div>
                  <div style={{ display: "grid", gap: 1, background: C.line, borderRadius: 12, overflow: "hidden" }}>
                    {rows.map(([h, x, y], i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 1 }}>
                        <div style={{ background: C.surface2, padding: "9px 10px", fontSize: 12, fontWeight: 700, color: C.sub }}>{h}</div>
                        <div style={{ background: C.surface, padding: "9px 10px", fontSize: 12.5, color: C.ink }}>{x}</div>
                        <div style={{ background: C.surface, padding: "9px 10px", fontSize: 12.5, color: C.ink }}>{y}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
            {tracked.length === 0 ? (
              <div style={{ ...card, textAlign: "center", padding: "36px 22px" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: C.surface2, display: "grid", placeItems: "center", margin: "0 auto 12px" }}><FolderKanban size={26} color={C.sub} /></div>
                <p style={{ fontSize: 15, fontWeight: 800, margin: "0 0 6px" }}>ما عندك طلبات بعد</p>
                <p style={{ color: C.sub, fontSize: 13.5, margin: "0 0 16px" }}>احفظ أو علّم وظايف من تبويب «الوظايف» وراح تطلع هنا.</p>
                <button onClick={() => setTab("jobs")} className="solid" style={{ ...primary, width: "auto", padding: "11px 22px", display: "inline-flex", alignItems: "center", gap: 8 }}><Search size={17} /> روح للوظايف</button>
              </div>
            ) : (
              tracked.map((job) => {
                const cur = status[job._id]; const nego = negos[job._id];
                return (
                  <div key={job._id} className="pop" style={{ ...card, marginBottom: 12, padding: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0 }}><h3 style={{ fontWeight: 800, fontSize: 16.5, margin: 0, lineHeight: 1.4 }}>{job.title}</h3><p style={{ color: C.sub, fontSize: 13.5, margin: "3px 0 0", display: "flex", alignItems: "center", gap: 5 }}><Building2 size={13} />{job.company}{job.city ? ` · ${job.city}` : ""}</p></div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#0B0617", background: STATUS_COLOR[cur] || C.p1, padding: "5px 12px", borderRadius: 99, whiteSpace: "nowrap" }}>{STATUS_LABEL[cur] || cur}</span>
                    </div>
                    <div style={{ display: "flex", gap: 7, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
                      {PIPE.map(([k, lbl]) => (<button key={k} onClick={() => setStage(job, k)} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 12.5, fontWeight: 700, padding: "7px 13px", borderRadius: 99, background: cur === k ? STATUS_COLOR[k] : C.chip, color: cur === k ? "#0B0617" : C.sub }}>{lbl}</button>))}
                      {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: 12.5, fontWeight: 700, color: C.acc, padding: "7px 4px", display: "inline-flex", alignItems: "center", gap: 4 }}><ExternalLink size={13} /> الإعلان</a>}
                      <button onClick={() => untrack(job)} className="gh" style={{ ...ghost, fontSize: 12, padding: "7px 11px", marginRight: "auto", color: C.faint, display: "inline-flex", alignItems: "center", gap: 5 }}><Trash2 size={13} /> شِلها</button>
                      <button onClick={() => setCmp((p) => p.includes(job._id) ? p.filter((x) => x !== job._id) : (p.length < 2 ? [...p, job._id] : p))} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 12, fontWeight: 700, padding: "7px 11px", borderRadius: 99, background: cmp.includes(job._id) ? C.acc : C.chip, color: cmp.includes(job._id) ? "#0B0617" : C.sub }}>قارن</button>
                    </div>
                    {["applied", "interview", "offer"].includes(cur) && appliedAt[job._id] && (() => { const days = Math.floor((Date.now() - appliedAt[job._id]) / 86400000); return (
                      <div style={{ marginTop: 10, fontSize: 12.5, color: days >= 4 && cur === "applied" ? C.amber : C.sub, display: "flex", alignItems: "center", gap: 6 }}><Clock size={13} /> قدّمت {days === 0 ? "اليوم" : `قبل ${toAr(days)} يوم`}{days >= 4 && cur === "applied" ? " · 🔔 وقت المتابعة — أرسل رسالة متابعة" : ""}</div>
                    ); })()}
                    {cur === "offer" && (
                      <div style={{ marginTop: 12 }}>
                        <button onClick={() => negotiate(job)} className="solid" style={{ ...primary, width: "auto", padding: "10px 18px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 7 }}><MessageCircle size={16} /> {nego?.loading ? "نجهّز…" : "ساعدني أفاوض الراتب"}</button>
                        {nego?.text && <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.mint}` }}><p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.95, margin: 0, color: "#E3DAF2" }}>{nego.text}</p><button onClick={() => copy(nego.text)} className="gh" style={{ ...ghost, fontSize: 12, marginTop: 10, padding: "6px 13px" }}>انسخها</button></div>}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "rgba(12,17,24,.92)", borderTop: `1px solid ${C.line}`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex" }}>
          {[["home", LayoutDashboard, "الرئيسية"], ["jobs", Search, "الوظايف"], ["apps", FolderKanban, "طلباتك"], ["interview", Mic, "المقابلة"]].map(([k, Ic, lbl]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", fontFamily: BODY, padding: "10px 6px 13px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: tab === k ? C.ink : C.faint, position: "relative" }}>
              {tab === k && <span style={{ position: "absolute", top: 3, width: 26, height: 3, borderRadius: 99, background: GRAD }} />}
              <span style={{ position: "relative", display: "grid", placeItems: "center" }}>
                <Ic size={21} color={tab === k ? C.p2 : C.faint} strokeWidth={tab === k ? 2.4 : 2} />
                {k === "apps" && tracked.length > 0 && <span style={{ position: "absolute", top: -6, left: -10, minWidth: 15, height: 15, padding: "0 3px", borderRadius: 99, background: C.amber, color: "#0B0617", fontSize: 9.5, fontWeight: 800, display: "grid", placeItems: "center" }}>{toAr(tracked.length)}</span>}
              </span>
              <span style={{ fontSize: 10.5, fontWeight: tab === k ? 800 : 600 }}>{lbl}</span>
            </button>
          ))}
        </div>
      </div>

      {showIntro && <Intro onStart={() => startApp(true)} onBrowse={() => startApp(false)} />}
      {showAccount && <AccountSheet onPick={connectAccount} onImport={importLinkedIn} importing={importing} onClose={() => setShowAccount(false)} />}
      {showCV && <CVBuilder form={cvForm} setForm={setCvForm} tpl={cvTpl} setTpl={setCvTpl} onBuild={buildCV} onClose={() => setShowCV(false)} />}
      {adminOpen && (
        <div onClick={() => setAdminOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(6,9,14,.82)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 16, zIndex: 90, overflowY: "auto" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 560, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 22, padding: 20, margin: "12px 0 90px", animation: "pop .3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, margin: 0, display: "flex", alignItems: "center", gap: 8 }}><LayoutDashboard size={20} color={C.acc} /> لوحة المالك</h2>
              <button onClick={() => setAdminOpen(false)} style={{ border: "none", background: C.chip, color: C.ink, width: 30, height: 30, borderRadius: 99, cursor: "pointer", fontSize: 16 }}>×</button>
            </div>
            {!adminAuthed ? (
              <div style={{ marginTop: 10 }}>
                <p style={{ color: C.sub, fontSize: 13.5, lineHeight: 1.7, margin: "0 0 14px" }}>أدخل رمز المالك لعرض التحليلات المجمّعة.</p>
                <input value={adminPass} onChange={(e) => setAdminPass(e.target.value)} type="password" placeholder="رمز المالك" style={{ ...inp, fontSize: 15, textAlign: "center", letterSpacing: 3 }} onKeyDown={(e) => { if (e.key === "Enter" && adminPass === OWNER_PASS) { setAdminAuthed(true); refreshAdmin(); } }} />
                <button onClick={() => { if (adminPass === OWNER_PASS) { setAdminAuthed(true); refreshAdmin(); } else toast("رمز غير صحيح"); }} className="solid" style={{ ...primary, marginTop: 12 }}>دخول</button>
              </div>
            ) : (() => {
              const d = adminData || {};
              const users = Object.keys(d.users || {}).length;
              const fn = d.funnel || { saved: 0, applied: 0, interview: 0, offer: 0 };
              const rate = fn.applied ? Math.round(fn.interview / fn.applied * 100) : 0;
              const top = (obj, n = 6) => Object.entries(obj || {}).sort((a, b) => b[1] - a[1]).slice(0, n);
              const maxOf = (rows) => Math.max(1, ...rows.map((r) => r[1]));
              const Bars = ({ rows, color }) => { const mx = maxOf(rows); return (<div style={{ display: "grid", gap: 7 }}>{rows.length ? rows.map(([k, v], i) => (<div key={i}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 3 }}><span style={{ fontWeight: 600 }}>{k}</span><span style={{ color: C.sub }}>{toAr(v)}</span></div><div style={{ height: 7, background: "rgba(255,255,255,.06)", borderRadius: 99 }}><div style={{ height: "100%", width: `${Math.round(v / mx * 100)}%`, background: color || GRAD, borderRadius: 99 }} /></div></div>)) : <p style={{ fontSize: 12.5, color: C.faint, margin: 0 }}>لا توجد بيانات بعد.</p>}</div>); };
              const kpi = [[toAr(users), "مستخدم"], [toAr(d.searches || 0), "عملية بحث"], [toAr(fn.applied || 0), "تقديم"], [toAr(rate) + "٪", "نسبة الردود"]];
              const nat = top(d.byNat, 2);
              return (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 12, color: C.faint }}>تحليلات مجمّعة ومجهّلة — بدون بيانات شخصية</span>
                    <button onClick={refreshAdmin} className="gh" style={{ ...ghost, fontSize: 12, padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 5 }}><RefreshCw size={13} /> تحديث</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9, marginBottom: 18 }}>
                    {kpi.map(([n, l], i) => <div key={i} style={{ background: C.surface2, borderRadius: 13, padding: "13px 6px", textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 20, color: C.acc }}>{n}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 4 }}>{l}</div></div>)}
                  </div>

                  {/* daily usage */}
                  {(() => {
                    const daily = d.daily || {};
                    const days = Object.keys(daily).sort().slice(-10);
                    const rows = days.map((dy) => [dy.slice(5), Object.keys(daily[dy].u || {}).length, daily[dy].searches || 0]);
                    const mx = Math.max(1, ...rows.map((r) => Math.max(r[1], r[2])));
                    const todayKey = new Date().toISOString().slice(0, 10);
                    const todayU = Object.keys((daily[todayKey] || { u: {} }).u || {}).length;
                    return (
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}><h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>الاستخدام اليومي</h3><span style={{ fontSize: 12, color: C.sub }}>اليوم: {toAr(todayU)} مستخدم</span></div>
                        {rows.length ? (
                          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
                            {rows.map((r, i) => (
                              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 64, justifyContent: "center" }}>
                                  <div title="مستخدمون" style={{ width: 9, height: `${Math.round(r[1] / mx * 100)}%`, minHeight: 2, background: GRAD, borderRadius: 3 }} />
                                  <div title="عمليات بحث" style={{ width: 9, height: `${Math.round(r[2] / mx * 100)}%`, minHeight: 2, background: C.amber, borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 9.5, color: C.faint }}>{r[0]}</span>
                              </div>
                            ))}
                          </div>
                        ) : <p style={{ fontSize: 12.5, color: C.faint, margin: 0 }}>لا توجد بيانات بعد.</p>}
                        <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 11, color: C.sub }}><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: C.p1 }} /> مستخدمون</span><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: C.amber }} /> عمليات بحث</span></div>
                      </div>
                    );
                  })()}

                  {/* cost */}
                  {(() => {
                    const calls = d.aiCalls || 0;
                    const usd = calls * COST_PER_AI_CALL;
                    const todayKey = new Date().toISOString().slice(0, 10);
                    const todayCalls = (d.daily && d.daily[todayKey] ? d.daily[todayKey].ai : 0) || 0;
                    return (
                      <div style={{ marginBottom: 18, background: "linear-gradient(150deg,#1A2740,#141B25)", border: `1px solid ${C.line}`, borderRadius: 14, padding: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 7 }}><Wallet size={16} color={C.amber} /> التكلفة (الذكاء الاصطناعي)</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                          <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 19 }}>{toAr(calls)}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3 }}>نداء ذكاء</div></div>
                          <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 19, color: C.amber }}>{toAr((usd * USD_TO_SAR).toFixed(0))}﷼</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3 }}>تكلفة تقديرية</div></div>
                          <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 19 }}>${toAr(usd.toFixed(2))}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3 }}>بالدولار</div></div>
                        </div>
                        <p style={{ fontSize: 11, color: C.faint, margin: "10px 0 0", lineHeight: 1.6 }}>اليوم: {toAr(todayCalls)} نداء · التقدير على {COST_PER_AI_CALL}$ للنداء — عدّله من الكود حسب فاتورتك الفعلية.</p>
                      </div>
                    );
                  })()}

                  <div style={{ marginBottom: 18 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>قمع التحويل</h3>
                    <Bars rows={[["بحث", d.searches || 0], ["حفظ", fn.saved || 0], ["تقديم", fn.applied || 0], ["مقابلة", fn.interview || 0], ["عرض", fn.offer || 0]]} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
                    <div><h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>أكثر التخصصات</h3><Bars rows={top(d.byField)} color={C.p2} /></div>
                    <div><h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>أكثر المدن</h3><Bars rows={top(d.byCity)} color={C.mint} /></div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>أكثر المهارات نقصاً في السوق</h3>
                    <Bars rows={top(d.skillGaps, 8)} color={C.amber} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>الجنسية</h3>
                    <div style={{ display: "flex", gap: 9 }}>{(nat.length ? nat : [["—", 0]]).map(([k, v], i) => <div key={i} style={{ flex: 1, background: C.surface2, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}><div style={{ fontWeight: 800, fontSize: 18 }}>{toAr(v)}</div><div style={{ fontSize: 11.5, color: C.sub, marginTop: 3 }}>{k}</div></div>)}</div>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>نشاط أخير</h3>
                    <div style={{ display: "grid", gap: 5, maxHeight: 160, overflowY: "auto" }}>
                      {(Array.isArray(d.recent) ? d.recent : []).slice(0, 20).map((r, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, background: C.surface2, borderRadius: 9, padding: "7px 11px" }}><span style={{ fontWeight: 600 }}>{r.t}{r.f ? ` · ${r.f}` : ""}{r.c ? ` · ${r.c}` : ""}</span><span style={{ color: C.faint }}>{r.ts ? new Date(r.ts).toLocaleDateString("ar") : ""}</span></div>)}
                      {!(d.recent && d.recent.length) && <p style={{ fontSize: 12.5, color: C.faint, margin: 0 }}>لا يوجد نشاط بعد.</p>}
                    </div>
                  </div>
                  {/* users CRM (preview) */}
                  <div style={{ marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 7 }}><Users size={16} color={C.acc} /> قاعدة بيانات المستخدمين</h3>
                    <div style={{ background: "rgba(217,164,65,.1)", border: "1px solid rgba(217,164,65,.3)", borderRadius: 11, padding: "10px 12px", marginBottom: 10 }}>
                      <p style={{ fontSize: 11.5, color: C.amber, margin: 0, lineHeight: 1.7 }}>⚠️ هذي <b>معاينة</b>. جمع الأسماء والجوالات والإيميلات الحقيقية لازم يكون على <b>خادم آمن خاص فيك بعد النشر</b> (مو هنا — التخزين هنا مكشوف ويخالف نظام حماية البيانات). الصف الأول بياناتك أنت، والباقي أمثلة.</p>
                    </div>
                    <div style={{ overflowX: "auto", borderRadius: 11, border: `1px solid ${C.line}` }}>
                      <div style={{ minWidth: 460 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.6fr 1.2fr 1fr", gap: 1, background: C.line }}>
                          {["الاسم", "الإيميل", "الجوال", "التخصص"].map((h, i) => <div key={i} style={{ background: C.surface2, padding: "8px 10px", fontSize: 11.5, fontWeight: 800, color: C.sub }}>{h}</div>)}
                        </div>
                        {[
                          { name: appd.name || "(بياناتك)", email: appd.email || "—", phone: appd.phone || "—", f: field || "—", me: true },
                          { name: "نورة القحطاني", email: "noura@example.com", phone: "05xxxxxxxx", f: "تسويق" },
                          { name: "خالد العتيبي", email: "khaled@example.com", phone: "05xxxxxxxx", f: "محاسبة" },
                        ].map((u, i) => (
                          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.3fr 1.6fr 1.2fr 1fr", gap: 1, background: C.line }}>
                            <div style={{ background: u.me ? "rgba(46,107,240,.08)" : C.surface, padding: "9px 10px", fontSize: 12, fontWeight: u.me ? 700 : 500 }}>{u.name}{u.me ? " ✦" : ""}</div>
                            <div style={{ background: u.me ? "rgba(46,107,240,.08)" : C.surface, padding: "9px 10px", fontSize: 12, color: C.sub, direction: "ltr", textAlign: "right" }}>{u.email}</div>
                            <div style={{ background: u.me ? "rgba(46,107,240,.08)" : C.surface, padding: "9px 10px", fontSize: 12, color: C.sub, direction: "ltr", textAlign: "right" }}>{u.phone}</div>
                            <div style={{ background: u.me ? "rgba(46,107,240,.08)" : C.surface, padding: "9px 10px", fontSize: 12, color: C.sub }}>{u.f}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button onClick={() => copy(JSON.stringify(d), "نسخنا البيانات JSON ✓")} className="gh" style={{ ...ghost, fontSize: 12.5, padding: "9px 14px", marginTop: 8, width: "100%" }}>تصدير البيانات (JSON)</button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <div style={{ position: "fixed", bottom: 78, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 60, pointerEvents: "none" }}>
        {toasts.map((t) => <div key={t.id} style={{ background: C.surfaceHi, color: C.ink, border: `1px solid ${C.line}`, padding: "11px 18px", borderRadius: 99, fontSize: 13.5, fontWeight: 700, boxShadow: "0 14px 40px -12px rgba(0,0,0,.6)", animation: "toastin .25s ease" }}>{t.msg}</div>)}
      </div>
    </div>
  );
}

function JobBody({ job, st, kit, detail, company, refer, scam, city, eligible, nationality, onKit, onSave, onApplied, onDetail, onCompany, onRefer, onScam, onShare, onCopy, mColor }) {
  const compCol = { "منخفضة": C.mint, "متوسطة": C.amber, "عالية": C.rose };
  const rating = +job.rating || 0;
  return (<>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, margin: "10px 0", flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: mColor(job.match || 0), background: C.chip, border: `1px solid ${C.line}`, padding: "5px 12px", borderRadius: 99 }}>{toAr(job.match || 0)}٪ تطابق</span>
        {job.salary && <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, background: C.chip, padding: "5px 11px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 5 }}><Wallet size={13} /> {job.salary}</span>}
      </div>
      {job.board && <span style={{ fontSize: 12, fontWeight: 600, color: C.sub, display: "inline-flex", alignItems: "center", gap: 6 }}>{logoFor(job.board) && <Logo domain={logoFor(job.board)} size={16} />}{job.board}</span>}
    </div>
    {/* eligibility + meta chips */}
    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 4 }}>
      {job.saudiOnly
        ? <span style={{ fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, background: eligible ? "rgba(217,164,65,.14)" : "rgba(224,87,79,.14)", color: eligible ? C.amber : C.rose }}><ShieldCheck size={12} /> {eligible ? "للسعوديين" : "للسعوديين فقط — غير متاحة لك"}</span>
        : <span style={{ fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, background: "rgba(61,245,160,.12)", color: C.mint }}><Check size={12} /> متاحة للمقيمين</span>}
      {job.level && <span style={{ fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, background: C.chip, color: C.sub }}><TrendingUp size={12} /> {job.level}</span>}
      {job.competition && <span style={{ fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, background: C.chip, color: compCol[job.competition] || C.sub }}><Users size={12} /> منافسة {job.competition}</span>}
      {job.posted && <span style={{ fontSize: 11.5, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, background: C.chip, color: C.sub }}><Clock size={12} /> {job.posted}</span>}
      {rating > 0 && <span style={{ fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 99, background: C.chip, color: C.amber }}><Star size={12} fill={C.amber} /> {toAr(rating.toFixed(1))}</span>}
    </div>
    <h3 style={{ fontWeight: 800, fontSize: 18, margin: "6px 0 0", lineHeight: 1.45 }}>{job.title}</h3>
    <p style={{ color: C.sub, fontSize: 14, margin: "4px 0 0", display: "flex", alignItems: "center", gap: 5 }}><Building2 size={14} />{job.company}{job.city ? ` · ${job.city}` : ""}</p>
    {job.why && <p style={{ fontSize: 14, lineHeight: 1.8, margin: "12px 0 0", color: C.ink }}><b style={{ color: C.acc }}>ليش تناسبك — </b>{job.why}</p>}
    {Array.isArray(job.missing) && job.missing.length > 0 && job.missing[0] && (
      <div style={{ marginTop: 10 }}><span style={{ fontSize: 12.5, fontWeight: 700, color: C.amber }}>ضيفها لسيرتك عشان الفرز (ATS):</span><div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 7 }}>{job.missing.map((k, x) => <span key={x} style={{ fontSize: 12.5, fontWeight: 700, background: "rgba(255,194,75,.13)", color: C.amber, padding: "4px 11px", borderRadius: 99 }}>+ {k}</span>)}</div></div>
    )}
    {detail?.text && <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.acc}` }}><p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.9, margin: 0, color: "#E3DAF2" }}>{detail.text}</p></div>}
    {company && <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.amber}` }}><div style={{ fontSize: 12.5, fontWeight: 800, color: C.amber, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}><Star size={14} fill={C.amber} /> عن الشركة</div>{company.loading ? <span style={{ fontSize: 13, color: C.sub }}>نجيب مراجعات الشركة…</span> : <p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.9, margin: 0, color: "#E3DAF2" }}>{company.text}</p>}</div>}
    {refer && <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.mint}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 12.5, fontWeight: 800, color: C.mint, display: "flex", alignItems: "center", gap: 6 }}><Users size={14} /> رسالة ترشيح</span>{refer.text && <button onClick={() => onCopy(refer.text)} className="gh" style={{ ...ghost, fontSize: 11.5, padding: "5px 11px" }}>انسخ</button>}</div>{refer.loading ? <span style={{ fontSize: 13, color: C.sub }}>نكتب لك الرسالة…</span> : <p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.9, margin: 0, color: "#E3DAF2" }}>{refer.text}</p>}</div>}
    {scam && (() => { const r = scam.data?.risk || ""; const col = /مشبوه/.test(r) ? C.rose : /انتبه/.test(r) ? C.amber : C.mint; return (
      <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${col}` }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: col, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}><ShieldCheck size={14} /> التحقّق من الإعلان{scam.data ? ` — ${r}` : ""}</div>
        {scam.loading ? <span style={{ fontSize: 13, color: C.sub }}>نفحص الإعلان…</span> : <>
          {Array.isArray(scam.data?.flags) && scam.data.flags.filter(Boolean).length > 0 && <ul style={{ margin: "0 0 6px", paddingRight: 16 }}>{scam.data.flags.filter(Boolean).map((fl, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "#E3DAF2" }}>{fl}</li>)}</ul>}
          {scam.data?.tip && <p style={{ fontSize: 12.5, color: C.sub, margin: 0 }}>💡 {scam.data.tip}</p>}
        </>}
      </div>
    ); })()}
    <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
      {job.url && <a className="solid" href={job.url} target="_blank" rel="noopener noreferrer" style={{ ...primary, textDecoration: "none", padding: "10px 16px", fontSize: 14, width: "auto", display: "inline-flex", alignItems: "center", gap: 6 }}><ExternalLink size={16} /> افتح وقدّم</a>}
      <button onClick={onKit} className="gh" style={{ ...ghost, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}><Sparkles size={16} /> {kit?.loading ? "نجهّز…" : "جهّزلي كل شي"}</button>
      <button onClick={onDetail} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", color: C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><FileText size={15} /> {detail?.loading ? "…" : "وش الوظيفة"}</button>
      <button onClick={onCompany} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", color: C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><Star size={15} /> {company?.loading ? "…" : "عن الشركة"}</button>
      <button onClick={onRefer} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", color: C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><Users size={15} /> {refer?.loading ? "…" : "رشّحني"}</button>
      <button onClick={onScam} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", color: C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><ShieldCheck size={15} /> {scam?.loading ? "…" : "تحقّق"}</button>
      <button onClick={onShare} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", color: C.sub }}><Share2 size={15} /></button>
      <button onClick={onSave} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 12px", borderColor: st === "saved" ? C.p1 : C.line, color: st === "saved" ? C.p1 : C.sub }}><Heart size={15} fill={st === "saved" ? C.p1 : "none"} /></button>
      <button onClick={onApplied} className="gh" style={{ ...ghost, fontSize: 13, padding: "9px 13px", borderColor: st === "applied" ? C.mint : C.line, color: st === "applied" ? C.mint : C.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><Check size={15} /> {st === "applied" ? "قدّمت" : "قدّمت؟"}</button>
    </div>
    {kit?.loading && <div style={{ marginTop: 12, background: C.surface2, borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 22, height: 22, borderRadius: 99, border: `3px solid ${C.line}`, borderTopColor: C.p1, animation: "spin .85s linear infinite", flexShrink: 0 }} /><span style={{ fontSize: 13.5, color: C.sub }}>نجهّز سيرتك + الرسالة + الإيميل + الفرز + المقابلة…</span></div>}
    {kit?.parts?.length > 0 && (
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 13.5, fontWeight: 800, color: C.mint, display: "inline-flex", alignItems: "center", gap: 6 }}><Check size={16} /> ملفك جاهز</span><button onClick={() => onCopy(kit.parts.map((p) => `▒ ${p.title}\n${p.body}`).join("\n\n\n"), "نسخنا الملف كامل ✓")} className="gh" style={{ ...ghost, fontSize: 12, padding: "6px 14px" }}>انسخ الكل</button></div>
        <div style={{ display: "grid", gap: 10 }}>{kit.parts.map((part, k) => (<div key={k} style={{ background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.p1}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><h5 style={{ fontWeight: 800, fontSize: 14, margin: 0, fontFamily: DISP }}>{part.title}</h5><button onClick={() => onCopy(part.body)} className="gh" style={{ ...ghost, fontSize: 11.5, padding: "5px 11px" }}>انسخ</button></div><p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.95, margin: 0, color: "#E3DAF2" }}>{part.body}</p></div>))}</div>
      </div>
    )}
  </>);
}

function Interview({ field, call, toast, mColor }) {
  const [topic, setTopic] = useState(field || "");
  const [cat, setCat] = useState("سلوكية");
  const [q, setQ] = useState("");
  const [loadingQ, setLoadingQ] = useState(false);
  const [answer, setAnswer] = useState("");
  const [fb, setFb] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [count, setCount] = useState(0);
  const [scores, setScores] = useState([]);
  const cats = ["سلوكية", "تقنية", "عامة", "قيادية"];
  const newQ = async () => {
    if (!topic.trim()) { toast("اكتب تخصصك أول"); return; }
    setLoadingQ(true); setFb(null); setAnswer("");
    try { const t = await call([{ role: "user", content: `أنت محاور توظيف محترف. اطرح سؤال مقابلة واحد فقط من نوع (${cat}) لوظيفة بمجال "${topic}" بالعربية. أعِد نص السؤال فقط بدون مقدمة أو ترقيم.` }], false); setQ(t.trim()); }
    catch { setQ("ما ضبط، جرّب مرة ثانية."); } setLoadingQ(false);
  };
  const evaluate = async () => {
    if (!answer.trim()) { toast("اكتب إجابتك أول"); return; }
    setEvaluating(true);
    try { const raw = await call([{ role: "user", content: `سؤال المقابلة: "${q}". إجابة المرشح: "${answer.slice(0, 1500)}". قيّمها كمحاور خبير. أعِد JSON فقط: {"score":0-100,"good":"وش أحسنت فيه بجملة","improve":"وش تعدّله بجملة","model":"إجابة نموذجية مختصرة ٣-٤ أسطر"}. بالعربية بدون أسوار كود.` }], false); const c = raw.replace(/```json|```/g, "").trim(); const o = JSON.parse(c.slice(c.indexOf("{"), c.lastIndexOf("}") + 1)); setFb(o); setCount((x) => x + 1); setScores((s) => [...s, +o.score || 0]); }
    catch { setFb({ score: 0, good: "", improve: "ما ضبط، جرّب مرة ثانية.", model: "" }); } setEvaluating(false);
  };
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  return (
    <div className="pop">
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "26px 24px", marginBottom: 16, background: "linear-gradient(150deg,#16233D,#0E1726)", border: `1px solid ${C.line}` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: C.lime, background: "rgba(217,164,65,.12)", padding: "6px 13px", borderRadius: 99 }}><Mic size={14} /> تمرّن قبل لا تروح</span>
        <h1 style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.3, margin: "14px 0 6px" }}>بروفة المقابلة</h1>
        <p style={{ color: C.sub, fontSize: 14.5, lineHeight: 1.8, margin: 0, maxWidth: 460 }}>جاوب على أسئلة حقيقية وخذ تقييم فوري بدرجة وملاحظات وإجابة نموذجية.</p>
        {count > 0 && <div style={{ display: "flex", gap: 9, marginTop: 16 }}><Stat n={toAr(count)} l="سؤال" /><Stat n={toAr(avg) + "٪"} l="متوسط درجتك" /></div>}
      </div>
      <div style={card}>
        <Field label="وش مجالك؟"><input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="إدارة مشاريع، تسويق…" style={inp} /></Field>
        <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.ink }}>نوع الأسئلة</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>{cats.map((c) => <button key={c} onClick={() => setCat(c)} style={{ border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 13, fontWeight: 700, padding: "8px 15px", borderRadius: 99, background: cat === c ? GRAD : C.chip, color: cat === c ? "#fff" : C.sub }}>{c}</button>)}</div>
        <button onClick={newQ} className="solid" style={{ ...primary, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Mic size={18} /> {loadingQ ? "نجهّز سؤال…" : q ? "سؤال جديد" : "يلا نبدأ"}</button>
      </div>
      {q && (
        <div style={{ ...card, marginTop: 14 }} className="pop">
          <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}><div style={{ width: 34, height: 34, borderRadius: 10, background: C.surface2, display: "grid", placeItems: "center", flexShrink: 0 }}><Lightbulb size={18} color={C.amber} /></div><p style={{ fontWeight: 700, fontSize: 16.5, lineHeight: 1.6, margin: 0 }}>{q}</p></div>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} placeholder="اكتب إجابتك هنا…" style={{ ...inp, marginTop: 14, resize: "vertical", lineHeight: 1.9 }} />
          <button onClick={evaluate} disabled={evaluating} className="solid" style={{ ...primary, marginTop: 12, opacity: evaluating ? .8 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Send size={17} /> {evaluating ? "نراجع إجابتك…" : "وش رايك بإجابتي؟"}</button>
        </div>
      )}
      {fb && (
        <div style={{ ...card, marginTop: 14 }} className="pop">
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}><Ring value={fb.score || 0} color={mColor(fb.score || 0)} /><div style={{ flex: 1, minWidth: 200 }}>{fb.good && <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}><b style={{ color: C.mint }}>حلو — </b>{fb.good}</p>}{fb.improve && <p style={{ fontSize: 14, lineHeight: 1.7, margin: "6px 0 0" }}><b style={{ color: C.amber }}>عدّل — </b>{fb.improve}</p>}</div></div>
          {fb.model && <div style={{ marginTop: 14, background: C.surface2, borderRadius: 14, padding: 14, borderRight: `3px solid ${C.acc}` }}><div style={{ fontSize: 12.5, fontWeight: 800, color: C.acc, marginBottom: 6 }}>كذا أفضل</div><p style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.9, margin: 0, color: "#E3DAF2" }}>{fb.model}</p></div>}
          <button onClick={newQ} className="gh" style={{ ...ghost, width: "100%", marginTop: 14 }}>السؤال الجاي</button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children, grow }) { return (<div style={{ marginBottom: 18, flex: grow ? "1 1 160px" : "none" }}><label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.ink }}>{label}</label>{children}</div>); }

function Logo({ domain, size = 18 }) {
  const [err, setErr] = useState(false);
  if (err || !domain) return <span style={{ width: size, height: size, borderRadius: 5, background: C.surfaceHi, display: "inline-block", flexShrink: 0 }} />;
  return <span style={{ width: size, height: size, borderRadius: 5, background: "#fff", display: "inline-grid", placeItems: "center", overflow: "hidden", flexShrink: 0 }}><img src={favicon(domain)} alt="" width={size - 2} height={size - 2} style={{ display: "block" }} loading="lazy" onError={() => setErr(true)} /></span>;
}

function cvToText(d) {
  const A = d.ar || d, E = d.en || null;
  const blk = (x, L) => {
    const sec = (h, arr) => (arr && arr.length ? `\n${h}:\n` + arr.map((v) => "• " + v).join("\n") : "");
    return `${x.name || ""}${x.title ? " — " + x.title : ""}\n${x.contact || ""}${x.summary ? `\n\n${L.s}:\n` + x.summary : ""}${sec(L.x, x.experience)}${sec(L.e, x.education)}${sec(L.k, x.skills)}${sec(L.l, x.languages)}${sec(L.c, x.certs)}`.trim();
  };
  const LA = { s: "نبذة", x: "الخبرات", e: "التعليم", k: "المهارات", l: "اللغات", c: "الشهادات" };
  const LE = { s: "Summary", x: "Experience", e: "Education", k: "Skills", l: "Languages", c: "Certifications" };
  return blk(A, LA) + (E ? "\n\n— — — — — —\n\n" + blk(E, LE) : "");
}
function cvHtml(d, tpl) {
  const a = tpl.accent;
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const arr = (x) => (Array.isArray(x) ? x.filter(Boolean) : []);
  const A = d.ar || d, E = d.en || null;
  const LA = { s: "نبذة", x: "الخبرات", e: "التعليم", k: "المهارات", l: "اللغات", c: "الشهادات" };
  const LE = { s: "Summary", x: "Experience", e: "Education", k: "Skills", l: "Languages", c: "Certifications" };
  const inner = (x, L) => {
    const listHtml = (items) => `<ul>${items.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>`;
    const sec = (h, body) => `<div class="sec"><div class="sh">${h}</div>${body}</div>`;
    const head = `<div class="head ${tpl.band ? "band" : "line"}"><div class="name">${esc(x.name || "")}</div>${x.title ? `<div class="title">${esc(x.title)}</div>` : ""}${x.contact ? `<div class="contact">${esc(x.contact)}</div>` : ""}</div>`;
    const skillsHtml = tpl.chips ? `<div class="chips">${arr(x.skills).map((s) => `<span>${esc(s)}</span>`).join("")}</div>` : `<p>${arr(x.skills).map(esc).join(" · ")}</p>`;
    return head +
      (x.summary ? sec(L.s, `<p>${esc(x.summary)}</p>`) : "") +
      (arr(x.experience).length ? sec(L.x, listHtml(arr(x.experience))) : "") +
      (arr(x.education).length ? sec(L.e, listHtml(arr(x.education))) : "") +
      (arr(x.skills).length ? sec(L.k, skillsHtml) : "") +
      (arr(x.languages).length ? sec(L.l, `<p>${arr(x.languages).map(esc).join(" · ")}</p>`) : "") +
      (arr(x.certs).length ? sec(L.c, listHtml(arr(x.certs))) : "");
  };
  const pages = `<div class="page" dir="rtl">${inner(A, LA)}</div>` + (E ? `<div class="page pg2" dir="ltr">${inner(E, LE)}</div>` : `<div class="page pg2" dir="rtl">${inner(A, LA)}</div>`);
  return `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(A.name || "السيرة الذاتية")} — CV</title><style>
@page{size:A4;margin:16mm 15mm}*{box-sizing:border-box}
html,body{background:#e9edf3}
body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#1b2533;margin:0;line-height:1.75;font-size:13px}
.bar{background:#0C1118;padding:13px;text-align:center;position:sticky;top:0}
.bar button{font-family:inherit;font-size:15px;font-weight:700;background:${a};color:#fff;border:0;border-radius:10px;padding:11px 22px;cursor:pointer}
.bar small{display:block;color:#9aa7b8;font-size:11.5px;margin-top:7px}
.page{max-width:800px;margin:16px auto;background:#fff;padding:34px 36px;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.12)}
.pg2{page-break-before:always}
[dir=ltr]{text-align:left}[dir=rtl]{text-align:right}
.head{margin-bottom:6px}.band{background:${a};color:#fff;padding:22px;border-radius:10px}
.line{border-bottom:3px solid ${a};padding-bottom:12px}
.name{font-size:26px;font-weight:800}.band .name{color:#fff}.line .name{color:#101826}
.title{font-size:15px;font-weight:700;margin-top:2px}.line .title{color:${a}}.band .title{opacity:.95}
.contact{font-size:12px;margin-top:8px}.line .contact{color:#5a6577}.band .contact{opacity:.9}
.sec{margin-top:16px}.sh{color:${a};font-weight:800;font-size:14px;border-bottom:2px solid ${a}40;padding-bottom:4px;margin-bottom:8px}
ul{margin:0;padding-inline-start:18px}li{margin:5px 0}p{margin:0}
.chips span{display:inline-block;background:${a}1f;color:${a};padding:4px 11px;border-radius:99px;margin:0 7px 7px 0;font-size:12px;font-weight:700}
@media print{html,body{background:#fff}.noprint{display:none!important}.page{margin:0;max-width:none;padding:0;box-shadow:none;border-radius:0}}
</style></head><body><div class="bar noprint"><button onclick="window.print()">🖨️ احفظ كـ PDF / Save as PDF</button><small>صفحة عربي + صفحة إنجليزي — اختر «حفظ كـ PDF»</small></div>${pages}<script>window.addEventListener("load",function(){setTimeout(function(){try{window.print()}catch(e){}},600)});</script></body></html>`;
}

function CVBuilder({ form, setForm, tpl, setTpl, onBuild, onClose }) {
  const up = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const F = ({ label, k, ph, area }) => area
    ? <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: C.ink }}>{label}</label><textarea value={form[k]} onChange={up(k)} rows={2} placeholder={ph} style={{ ...inp, resize: "vertical", lineHeight: 1.8, fontSize: 14 }} /></div>
    : <div style={{ flex: "1 1 150px", marginBottom: 12 }}><label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: C.ink }}>{label}</label><input value={form[k]} onChange={up(k)} placeholder={ph} style={{ ...inp, fontSize: 14 }} /></div>;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(6,9,14,.78)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 16, zIndex: 80, overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 460, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 22, padding: 20, margin: "12px 0 90px", animation: "pop .3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ fontWeight: 700, fontSize: 19, margin: 0 }}>اصنع سيرتك</h2>
          <button onClick={onClose} style={{ border: "none", background: C.chip, color: C.ink, width: 30, height: 30, borderRadius: 99, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <p style={{ color: C.sub, fontSize: 13, margin: "0 0 14px", lineHeight: 1.7 }}>اختر قالباً واملأ معلوماتك — كل ما زادت التفاصيل، طلعت السيرة أقوى وأدق.</p>
        <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.ink }}>القالب</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
          {CV_TPLS.map((t) => (
            <button key={t.id} onClick={() => setTpl(t.id)} style={{ cursor: "pointer", textAlign: "right", fontFamily: BODY, padding: "11px 13px", borderRadius: 13, background: tpl === t.id ? "rgba(46,107,240,.12)" : C.surface2, border: `1.5px solid ${tpl === t.id ? t.accent : C.line}`, color: C.ink }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: t.accent }} /><span style={{ fontWeight: 700, fontSize: 13.5 }}>{t.name}</span></div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 4, lineHeight: 1.5 }}>{t.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><F label="الاسم الكامل" k="name" ph="إبراهيم العتيبي" /><F label="المسمى المستهدف" k="title" ph="مدير مشاريع" /></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><F label="الإيميل" k="email" ph="name@mail.com" /><F label="الجوال" k="phone" ph="05xxxxxxxx" /></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><F label="لينكدإن" k="linkedin" ph="linkedin.com/in/.." /><F label="المدينة" k="city" ph="الرياض" /></div>
        <F label="نبذة عنك" k="summary" ph="مدير مشاريع بخبرة ٧ سنوات في القطاع العقاري…" area />
        <F label="الخبرات العملية (المسمى، الشركة، المدة، أبرز إنجازاتك)" k="experience" ph="مدير مشاريع — شركة س — ٢٠٢٠ حتى الآن: قدت فريق ١٢…" area />
        <F label="التعليم (الدرجة، الجامعة، السنة)" k="education" ph="بكالوريوس إدارة — جامعة الملك سعود — ٢٠١٧" area />
        <F label="المهارات (افصل بفاصلة)" k="skills" ph="PMP، إدارة المخاطر، Agile، التفاوض" area />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><F label="اللغات" k="languages" ph="العربية، الإنجليزية" /><F label="الشهادات" k="certs" ph="PMP، Scrum" /></div>
        <F label="إنجازات بارزة (اختياري)" k="achievements" ph="خفّضت التكاليف ٢٠٪، جائزة أفضل موظف…" area />
        <button onClick={onBuild} className="solid" style={{ ...primary, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Sparkles size={18} /> ابنِ سيرتي</button>
      </div>
    </div>
  );
}

function CVPreview({ data, tpl }) {
  const a = tpl.accent;
  const A = data.ar || data, E = data.en || null;
  const [lang, setLang] = useState("ar");
  const en = lang === "en" && E;
  const x = en ? E : A;
  const dir = en ? "ltr" : "rtl";
  const L = en ? { s: "Summary", x: "Experience", e: "Education", k: "Skills", l: "Languages", c: "Certifications" } : { s: "نبذة", x: "الخبرات", e: "التعليم", k: "المهارات", l: "اللغات", c: "الشهادات" };
  const arr = (v) => Array.isArray(v) ? v.filter(Boolean) : [];
  const Sec = ({ h, children }) => (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: a, marginBottom: 7, paddingBottom: 4, borderBottom: tpl.band ? "none" : `2px solid ${a}33` }}>{h}</div>
      {children}
    </div>
  );
  const list = (items) => <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>{items.map((v, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.7, paddingInlineStart: 15, position: "relative", color: "#D4DBE6" }}><span style={{ position: "absolute", insetInlineStart: 0, color: a }}>▪</span>{v}</li>)}</ul>;
  return (
    <div dir={dir} style={{ background: "#0F1622", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.line}` }}>
      {E && (
        <div className="noprint" style={{ display: "flex", gap: 6, padding: 8, background: "#0C131C", borderBottom: `1px solid ${C.line}` }} dir="rtl">
          {[["ar", "عربي"], ["en", "English"]].map(([k, lbl]) => (
            <button key={k} onClick={() => setLang(k)} style={{ flex: 1, cursor: "pointer", fontFamily: BODY, fontSize: 12.5, fontWeight: 700, padding: "7px", borderRadius: 9, border: "none", background: lang === k ? a : "transparent", color: lang === k ? "#fff" : C.sub }}>{lbl}</button>
          ))}
        </div>
      )}
      {tpl.band ? (
        <div style={{ background: `linear-gradient(120deg,${a},${a}99)`, padding: "18px 18px 16px", color: "#fff" }}>
          <div style={{ fontWeight: 800, fontSize: 22 }}>{x.name || "—"}</div>
          {x.title && <div style={{ fontSize: 14, fontWeight: 600, opacity: .95, marginTop: 2 }}>{x.title}</div>}
          {x.contact && <div style={{ fontSize: 12, opacity: .9, marginTop: 8 }}>{x.contact}</div>}
        </div>
      ) : (
        <div style={{ padding: "18px 18px 14px", borderBottom: `3px solid ${a}` }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>{x.name || "—"}</div>
          {x.title && <div style={{ fontSize: 14, fontWeight: 700, color: a, marginTop: 2 }}>{x.title}</div>}
          {x.contact && <div style={{ fontSize: 12, color: C.sub, marginTop: 8 }}>{x.contact}</div>}
        </div>
      )}
      <div style={{ padding: "4px 18px 18px" }}>
        {x.summary && <Sec h={L.s}><p style={{ fontSize: 13, lineHeight: 1.8, margin: 0, color: "#D4DBE6" }}>{x.summary}</p></Sec>}
        {arr(x.experience).length > 0 && <Sec h={L.x}>{list(arr(x.experience))}</Sec>}
        {arr(x.education).length > 0 && <Sec h={L.e}>{list(arr(x.education))}</Sec>}
        {arr(x.skills).length > 0 && <Sec h={L.k}>{tpl.chips
          ? <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{arr(x.skills).map((s, i) => <span key={i} style={{ fontSize: 12, fontWeight: 700, background: `${a}1f`, color: a, padding: "5px 11px", borderRadius: 99 }}>{s}</span>)}</div>
          : <p style={{ fontSize: 13, lineHeight: 1.8, margin: 0, color: "#D4DBE6" }}>{arr(x.skills).join(" · ")}</p>}</Sec>}
        {arr(x.languages).length > 0 && <Sec h={L.l}><p style={{ fontSize: 13, margin: 0, color: "#D4DBE6" }}>{arr(x.languages).join(" · ")}</p></Sec>}
        {arr(x.certs).length > 0 && <Sec h={L.c}>{list(arr(x.certs))}</Sec>}
      </div>
    </div>
  );
}

function Brand({ size = 36 }) {
  return <img src={LOGO} width={size} height={size} alt="المنقذ" style={{ borderRadius: 9, display: "block", objectFit: "cover", boxShadow: "0 5px 14px rgba(46,107,240,.45)" }} />;
}

function Intro({ onStart, onBrowse }) {
  const feats = [
    [Search, "بحث ذكي بكل المواقع", "لينكدإن، بيت، إنديد، جدارات وأكثر — دفعة وحدة بضغطة."],
    [ShieldCheck, "مطابقة حسب جنسيتك", "نراعي السعودة ونبيّن لك المتاح فعلاً (سعودي/مقيم)."],
    [FileText, "سيرة احترافية + PDF", "عربي وإنجليزي، قوالب جاهزة، وتصدير بضغطة."],
    [Mic, "نجهّزك للتقديم والمقابلة", "خطاب تقديم، رسالة ترشيح، وبروفة مقابلة بالذكاء."],
  ];
  const steps = ["اكتب تخصصك واضغط بحث", "نجيب لك وظايف مطابقة بثواني", "جهّز سيرتك، قدّم، وتابع طلباتك"];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "radial-gradient(120% 80% at 50% -10%, #1A2A4A 0%, #0C1118 55%)", overflowY: "auto" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "54px 22px 40px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", animation: "pop .5s ease" }}><Brand size={84} /></div>
          <h1 style={{ fontFamily: DISP, fontWeight: 800, fontSize: 40, margin: "18px 0 0", letterSpacing: -0.5 }}>المنقذ</h1>
          <p style={{ fontSize: 17, fontWeight: 700, color: C.acc, margin: "10px 0 0", lineHeight: 1.5 }}>يلقّى لك وظيفتك بالذكاء، ويجهّزك لها.</p>
          <p style={{ fontSize: 14.5, color: C.sub, margin: "10px 0 0", lineHeight: 1.8 }}>أول مكان تفكر فيه لمّا تبي تتوظّف في السعودية — بحث، مطابقة، سيرة، ومقابلة. كله بمكان واحد.</p>
        </div>

        <div style={{ display: "grid", gap: 11, marginTop: 28 }}>
          {feats.map(([Ic, t, d], i) => (
            <div key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start", background: "rgba(255,255,255,.04)", border: `1px solid ${C.line}`, borderRadius: 16, padding: "14px 15px" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: GRAD, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={21} color="#fff" /></div>
              <div><div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3, lineHeight: 1.65 }}>{d}</div></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.sub, marginBottom: 12, textAlign: "center" }}>كيف يشتغل؟</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ width: 30, height: 30, borderRadius: 99, background: i === 0 ? GRAD : C.surface2, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", margin: "0 auto 8px", fontWeight: 800, fontSize: 13, color: "#fff" }}>{toAr(i + 1)}</div>
                <div style={{ fontSize: 11.5, color: C.sub, lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 28 }}>
          <button onClick={onStart} className="solid" style={{ ...primary, fontSize: 16.5, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}><Rocket size={19} /> ابدأ الآن — مجاناً</button>
          <button onClick={onBrowse} style={{ width: "100%", marginTop: 10, border: "none", background: "none", cursor: "pointer", fontFamily: BODY, fontSize: 14, fontWeight: 700, color: C.sub, padding: "8px" }}>تصفّح أول</button>
          <p style={{ textAlign: "center", color: C.faint, fontSize: 11.5, margin: "14px 0 0", lineHeight: 1.7 }}>مجاني بالكامل · بدون تسجيل · مصمّم للسوق السعودي 🇸🇦</p>
        </div>
      </div>
    </div>
  );
}

function AccountSheet({ onPick, onImport, importing, onClose }) {
  const [mode, setMode] = useState("choose");
  const [text, setText] = useState("");
  const provs = [["LinkedIn", "linkedin.com"], ["Google", "google.com"], ["Apple", "apple.com"]];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(6,9,14,.76)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, zIndex: 80 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 24, padding: 22, animation: "pop .3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontWeight: 700, fontSize: 19, margin: 0 }}>{mode === "linkedin" ? "استيراد من لينكدإن" : "اربط حسابك"}</h2>
          <button onClick={onClose} style={{ border: "none", background: C.chip, color: C.ink, width: 30, height: 30, borderRadius: 99, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        {mode === "choose" ? (<>
          <p style={{ color: C.sub, fontSize: 13.5, margin: "6px 0 16px", lineHeight: 1.7 }}>اختر طريقة الربط — نحفظ تقدّمك ونعبّي بياناتك تلقائياً.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {provs.map(([name, domain]) => (
              <button key={name} onClick={() => name === "LinkedIn" ? setMode("linkedin") : onPick(name)} className="gh" style={{ ...ghost, width: "100%", padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-start", fontSize: 15 }}>
                <Logo domain={domain} size={22} /> المتابعة عبر {name}
                {name === "LinkedIn" && <span style={{ marginRight: "auto", fontSize: 11, fontWeight: 700, color: C.mint }}>يعبّي ملفك ✦</span>}
              </button>
            ))}
          </div>
          <p style={{ textAlign: "center", color: C.faint, fontSize: 11, margin: "14px 0 0", lineHeight: 1.6 }}>معاينة تجريبية — الربط الحقيقي (OAuth) يُفعّل بعد النشر</p>
        </>) : (<>
          <p style={{ color: C.sub, fontSize: 13.5, margin: "8px 0 12px", lineHeight: 1.8 }}>الصق «نبذتك» وخبراتك من ملفك في لينكدإن، ونستخرج التخصص والخبرة والمدينة والملخّص ونعبّيها تلقائياً.</p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="مثال: مدير مشاريع بخبرة ٧ سنوات في الرياض… ألصق نبذتك وخبراتك هنا" style={{ ...inp, resize: "vertical", lineHeight: 1.9 }} />
          <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
            <button onClick={() => setMode("choose")} className="gh" style={{ ...ghost, padding: "12px 16px" }}>رجوع</button>
            <button onClick={() => onImport(text)} disabled={importing} className="solid" style={{ ...primary, flex: 1, opacity: importing ? .8 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {importing ? <><span style={{ width: 18, height: 18, borderRadius: 99, border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "#fff", animation: "spin .85s linear infinite" }} /> نستورد ملفك…</> : <><Logo domain="linkedin.com" size={18} /> استورد بياناتي</>}
            </button>
          </div>
        </>)}
      </div>
    </div>
  );
}
function Mini({ label, children }) { return (<div style={{ flex: "1 1 200px", marginBottom: 4 }}><label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6, color: C.sub }}>{label}</label>{children}</div>); }
function Stat({ n, l }) { return (<div style={{ background: "rgba(0,0,0,.16)", borderRadius: 14, padding: "12px 6px", textAlign: "center" }}><div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{n}</div><div style={{ fontSize: 10.5, opacity: .85, marginTop: 5, fontWeight: 700 }}>{l}</div></div>); }
function Section({ title, children, last }) { return (<div style={{ paddingBottom: last ? 0 : 18, marginBottom: last ? 0 : 18, borderBottom: last ? "none" : `1px solid ${C.line}` }}><h4 style={{ fontFamily: DISP, fontWeight: 700, fontSize: 15.5, margin: "0 0 12px", color: C.ink }}>{title}</h4>{children}</div>); }
function Dist({ label, v, total, color }) { const pct = total ? (v / total) * 100 : 0; return (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}><span style={{ fontSize: 12.5, color: C.sub, width: 118, flexShrink: 0 }}>{label}</span><span style={{ flex: 1, height: 8, background: C.surface2, borderRadius: 99, overflow: "hidden", position: "relative" }}><span style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${pct}%`, background: color, borderRadius: 99 }} /></span><span style={{ fontSize: 13, fontWeight: 800, color, width: 18, textAlign: "center" }}>{toAr(v)}</span></div>); }
function Ring({ value, color }) { const r = 30, circ = 2 * Math.PI * r, off = circ - (Math.min(value, 100) / 100) * circ; return (<svg width="78" height="78" viewBox="0 0 78 78" style={{ flexShrink: 0 }}><circle cx="39" cy="39" r={r} fill="none" stroke={C.surface2} strokeWidth="7" /><circle cx="39" cy="39" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 39 39)" /><text x="39" y="45" textAnchor="middle" fontSize="20" fontWeight="800" fill={color} fontFamily="IBM Plex Sans Arabic">{toAr(value)}</text></svg>); }
function Shimmer() { return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{[60, 90, 70].map((w, i) => <span key={i} style={{ width: w, height: 26, borderRadius: 99, background: C.surface2, animation: "pulse 1.2s infinite" }} />)}</div>; }

const card = { background: C.surface, border: `1px solid ${C.line}`, borderRadius: 20, padding: 20 };
const inp = { width: "100%", boxSizing: "border-box", padding: "12px 14px", fontSize: 15, fontFamily: BODY, border: `1.5px solid ${C.line}`, borderRadius: 13, background: C.surface2, color: C.ink, outline: "none" };
const optS = { background: "#241A40", color: C.ink };
const primary = { width: "100%", padding: "14px 22px", fontSize: 16, fontWeight: 800, fontFamily: DISP, color: "#fff", background: GRAD, border: "none", borderRadius: 99, cursor: "pointer", boxShadow: GLOW };
const ghost = { padding: "11px 16px", fontSize: 15, fontWeight: 700, fontFamily: BODY, color: C.ink, background: C.chip, border: `1.5px solid ${C.line}`, borderRadius: 99, cursor: "pointer" };
const xbtn = { border: "none", background: "none", color: C.sub, cursor: "pointer", fontSize: 16, marginRight: 4 };
