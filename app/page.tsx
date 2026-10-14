"use client";

import { useState } from "react";
import {
  ArrowDownRight, ArrowRight, AudioLines, BookOpen, Brain, Check,
  ChevronRight, CircleHelp, Clock3, Flame, Headphones, Home, Menu,
  MessageCircle, Mic2, NotebookPen, Play, Sparkles, Target, Trophy,
  X, Zap
} from "lucide-react";

const tasks = [
  { title: "Reading practice", detail: "Matnni tushunish", icon: BookOpen, tone: "lavender", time: "15 daqiqa" },
  { title: "Listening practice", detail: "Eshitib tushunish", icon: Headphones, tone: "mint", time: "12 daqiqa" },
  { title: "Writing practice", detail: "Yozish mahorati", icon: NotebookPen, tone: "peach", time: "20 daqiqa" },
  { title: "Speaking practice", detail: "Gapirish mahorati", icon: Mic2, tone: "blue", time: "10 daqiqa" },
];

const questions = [
  { q: "Choose the correct sentence.", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."], answer: 1, note: "Present Simple’da he/she/it bilan fe’lga odatda -s qo‘shiladi." },
  { q: "What does “essential” mean?", options: ["Unnecessary", "Very expensive", "Absolutely necessary", "Unusual"], answer: 2, note: "Essential — juda muhim yoki zarur degani." },
  { q: "Complete the sentence: If I had more time, I ___ another language.", options: ["will learn", "would learn", "learned", "have learned"], answer: 1, note: "Second Conditional: If + Past Simple, would + verb." },
];

const navItems = [
  { label: "Bosh sahifa", icon: Home },
  { label: "O‘rganish", icon: BookOpen },
  { label: "Mock testlar", icon: Target },
  { label: "AI ustoz", icon: Sparkles },
  { label: "Lug‘at", icon: NotebookPen },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Bosh sahifa");
  const [quizOpen, setQuizOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");

  const current = questions[questionIndex];
  const score = answers.filter(Boolean).length;

  function beginQuiz() {
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setQuizOpen(true);
    setNotice("");
  }

  function nextQuestion() {
    if (selected === null) return;
    const nextAnswers = [...answers, selected === current.answer];
    setAnswers(nextAnswers);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
    } else {
      setQuizOpen(false);
      setNotice(`Mini test yakunlandi: ${nextAnswers.filter(Boolean).length}/${questions.length} ta to‘g‘ri javob!`);
    }
  }

  function chooseNav(label: string) {
    setActiveNav(label);
    setMobileNav(false);
    if (label !== "Bosh sahifa") {
      setNotice(label === "AI ustoz"
        ? "AI ustoz bo‘limi keyingi bosqichda AI xizmatiga ulanadi."
        : `“${label}” bo‘limi uchun poydevor tayyor. Keyingi bosqichda funksiyalar qo‘shiladi.`);
    } else setNotice("");
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><AudioLines size={23} strokeWidth={2.5} /></div><span>CEFR<span className="brand-dot">.</span>AI</span></div>
        <div className="workspace-label">MENING MAYDONIM</div>
        <nav className="nav-list" aria-label="Asosiy navigatsiya">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => chooseNav(label)} className={`nav-item ${activeNav === label ? "nav-active" : ""}`}>
              <Icon size={19} strokeWidth={1.9} /><span>{label}</span>{label === "AI ustoz" && <span className="new-pill">YANGI</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={19} /></div>
            <h3>Katta maqsadlar sari!</h3>
            <p>Har kuni ozgina mashq — katta natija.</p>
            <button onClick={() => { setNotice("Kunlik maqsad: 20 daqiqa ingliz tili bilan shug‘ullanish."); setActiveNav("Bosh sahifa"); }} className="upgrade-link">Maqsadimni ko‘r <ArrowRight size={15} /></button>
            <div className="upgrade-orb orb-one" /><div className="upgrade-orb orb-two" />
          </div>
          <div className="sidebar-foot"><span className="status-dot" /> O‘rganishga tayyormisiz?</div>
        </div>
      </aside>

      {mobileNav && <button aria-label="Menyuni yopish" className="mobile-backdrop" onClick={() => setMobileNav(false)} />}
      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label="Menyuni ochish" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={21} /> : <Menu size={21} />}</button>
          <div className="breadcrumb">Mening maydonim <ChevronRight size={15} /> <strong>{activeNav}</strong></div>
          <div className="topbar-right">
            <div className="streak"><Flame size={17} fill="#FFAD5C" color="#FFAD5C" /><span>3 kunlik seriya</span></div>
            <button className="avatar" aria-label="Profil">K</button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div><div className="eyebrow"><Sparkles size={14} /> BUGUN YANGI IMKONIYAT</div><h1>Salom! O‘rganishni <span>davom ettiramiz.</span></h1><p className="subheading">Maqsadingizga bir qadam yaqinroqsiz. Bugun nimadan boshlaymiz?</p></div>
            <div className="date-chip"><span className="date-icon">☀</span><div><strong>Yangi kun, yangi bilim</strong><small>Har bir qadam muhim</small></div></div>
          </section>

          {notice && <div className="notice"><div><Check size={18} /> {notice}</div><button onClick={() => setNotice("")} aria-label="Xabarni yopish"><X size={17} /></button></div>}

          <section className="hero-card">
            <div className="hero-copy"><div className="hero-label"><span className="hero-label-dot" /> SIZNING SHAXSIY REJANGIZ</div><h2>Ingliz tilingizni<br />yangi bosqichga olib chiqing.</h2><p>Har kuni mashq qiling, o‘sishingizni kuzating va CEFR maqsadingizga ishonch bilan boring.</p><button className="primary-button" onClick={beginQuiz}><Play size={17} fill="currentColor" /> Mini testni boshlash <ArrowRight size={17} /></button><div className="hero-social"><div className="mini-avatars"><span>K</span><span>A</span><span>M</span></div><span>O‘zingizga ishoning — uddalaysiz!</span></div></div>
            <div className="hero-art" aria-hidden="true"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-orbit"><span className="orbit-star">✦</span></div><div className="art-book"><div className="book-spine" /><div className="book-page"><span>EN</span><i /><i /><i /><i /></div><div className="book-page page-back"><span>ABC</span><i /><i /><i /></div></div><div className="floating-note note-one"><Brain size={20} /><span>Think<br />in English</span></div><div className="floating-note note-two"><span className="note-check"><Check size={14} /></span><span>Keep going!</span></div><div className="art-spark spark-a">✦</div><div className="art-spark spark-b">✧</div></div>
          </section>

          <section className="stats-grid" aria-label="O‘rganish statistikasi">
            <article className="stat-card"><div className="stat-top"><span className="stat-icon purple"><Target size={19} /></span><span className="stat-trend"><ArrowDownRight size={14} /> Reja</span></div><div className="stat-number">B1 <span className="stat-slash">/ B2</span></div><div className="stat-label">Maqsadli daraja</div><div className="level-track"><span /></div><div className="stat-foot">Keyingi bekat — B2!</div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon green"><Zap size={19} /></span><span className="stat-caption">Bu hafta</span></div><div className="stat-number">85 <span className="stat-unit">daqiqa</span></div><div className="stat-label">O‘rganishga sarflandi</div><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="stat-foot">Haftalik maqsad: 120 daqiqa</div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-icon orange"><Flame size={19} /></span><span className="stat-caption">Ajoyib odat!</span></div><div className="stat-number">3 <span className="stat-unit">kun</span></div><div className="stat-label">Ketma-ket o‘qish</div><div className="week-dots"><i className="done">D</i><i className="done">S</i><i className="done">C</i><i>P</i><i>J</i><i>S</i><i>Y</i></div><div className="stat-foot">Bugun ham davom eting</div></article>
          </section>

          <section className="section-block">
            <div className="section-heading"><div><h2>Bugungi mashg‘ulotlar</h2><p>Ko‘nikmalaringizni birma-bir rivojlantiring.</p></div><button className="text-link" onClick={() => chooseNav("O‘rganish")}>Barchasini ko‘r <ArrowRight size={16} /></button></div>
            <div className="tasks-grid">{tasks.map(({ title, detail, icon: Icon, tone, time }) => <button className="task-card" key={title} onClick={() => { setNotice(`${title}: ${time}. Ushbu modul keyingi bosqichda to‘liq ishlab chiqiladi.`); setActiveNav("O‘rganish"); }}><div className={`task-icon ${tone}`}><Icon size={21} /></div><div className="task-copy"><strong>{title}</strong><span>{detail}</span></div><span className="task-time"><Clock3 size={13} /> {time}</span><span className="task-arrow"><ArrowRight size={17} /></span></button>)}</div>
          </section>

          <section className="bottom-grid">
            <article className="progress-card"><div className="section-heading compact"><div><h2>Ko‘nikmalar xaritasi</h2><p>Har bir ko‘nikma — muvaffaqiyat kaliti.</p></div><button className="round-link" aria-label="Ko‘nikmalar haqida" onClick={() => setNotice("Ko‘nikmalar ko‘rsatkichlari hozircha namuna. Haqiqiy natijalar testlardan keyin saqlanadi.")}><CircleHelp size={18} /></button></div><div className="skill-list"><div className="skill-row"><div className="skill-name"><span className="skill-dot skill-purple" />Reading</div><div className="skill-track"><span style={{width:"72%"}} /></div><strong>72%</strong></div><div className="skill-row"><div className="skill-name"><span className="skill-dot skill-green" />Listening</div><div className="skill-track"><span className="green-fill" style={{width:"58%"}} /></div><strong>58%</strong></div><div className="skill-row"><div className="skill-name"><span className="skill-dot skill-orange" />Writing</div><div className="skill-track"><span className="orange-fill" style={{width:"44%"}} /></div><strong>44%</strong></div><div className="skill-row"><div className="skill-name"><span className="skill-dot skill-blue" />Speaking</div><div className="skill-track"><span className="blue-fill" style={{width:"35%"}} /></div><strong>35%</strong></div></div><div className="progress-note"><Sparkles size={16} /><span>Maslahat: <strong>Speaking</strong> mashqlariga ko‘proq vaqt ajrating.</span></div></article>
            <article className="goal-card"><div className="goal-head"><span className="goal-icon"><Trophy size={20} /></span><span className="goal-tag">HAFTALIK MAQSAD</span></div><h2>Izchillik — kuchingiz!</h2><p>Kichik qadamlar sizni katta natijaga olib boradi.</p><div className="goal-progress-head"><span>Haftalik faollik</span><strong>4/7 kun</strong></div><div className="goal-track"><span /></div><div className="goal-bottom"><div className="goal-emoji">🌱</div><span>Har kuni ozgina — katta o‘zgarish.</span></div></article>
          </section>
          <footer className="footer"><div className="footer-brand"><AudioLines size={16} /> CEFR.AI</div><span>Bilim sari har kuni bir qadam.</span><span>Made for your next level <span className="footer-heart">♥</span></span></footer>
        </div>
      </section>

      {quizOpen && <div className="modal-backdrop" role="presentation"><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><div className="quiz-top"><span className="quiz-mark"><Brain size={20} /></span><button className="icon-button" onClick={() => setQuizOpen(false)} aria-label="Testni yopish"><X size={20} /></button></div><div className="quiz-progress-label"><span>MINI TEST · INGLIZ TILI</span><strong>{questionIndex + 1}/{questions.length}</strong></div><div className="quiz-track"><span style={{width:`${((questionIndex + 1) / questions.length) * 100}%`}} /></div><h2 id="quiz-title">{current.q}</h2><p className="quiz-hint">Eng to‘g‘ri javobni tanlang.</p><div className="answer-list">{current.options.map((option, index) => <button key={option} onClick={() => setSelected(index)} className={`answer-option ${selected === index ? "answer-selected" : ""}`}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{selected === index && <Check size={17} />}</button>)}</div><button className="primary-button quiz-submit" disabled={selected === null} onClick={nextQuestion}>{questionIndex === questions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol"} <ArrowRight size={17} /></button><p className="quiz-foot">Bu boshlang‘ich demo test. Natijalar hozircha sessiya davomida saqlanadi.</p></section></div>}
    </main>
  );
}