import React, { useState, useEffect, useCallback } from 'react';
import {
    Brain, Clock, Award, TrendingUp, ChevronRight, ChevronLeft,
    RotateCcw, CheckCircle, XCircle, Target, Zap, Star,
    AlertCircle, Play, Trophy, BarChart2, Lightbulb, Eye, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './IQTestComp.scss';

const calcIQ = (score, total, avgTime) => {
    const pct = score / total;
    const base = 85 + Math.round(pct * 55);
    const timeBonus = avgTime < 60 ? 8 : avgTime < 90 ? 4 : 0;
    return Math.min(160, base + timeBonus);
};

// ─── Phase: INTRO ────────────────────────────────────────────────────────────
const IntroScreen = ({ onStart, questions, settings }) => (
    <div className="iqt-intro">
        <div className="iqt-intro-blur b1" /><div className="iqt-intro-blur b2" />
        <div className="iqt-intro-content">
            <div className="iqt-intro-icon"><Brain size={48} /></div>
            <h1 className="iqt-intro-title">VoyKe IQ Test</h1>
            <p className="iqt-intro-sub">Bilim darajangizni va IQ ballingizni aniqlang</p>

            <div className="iqt-intro-stats">
                <div className="iqt-istat"><Target size={20}/><span>10 savol</span></div>
                <div className="iqt-istat"><Clock  size={20}/><span>120s / savol</span></div>
                <div className="iqt-istat"><Award  size={20}/><span>0.1g Oltin yutish imkoni</span></div>
            </div>

            <div className="iqt-intro-rules">
                {[
                    'Test davomida kamera va ko\'z harakati nazorat qilinadi (AI)',
                    '8 tadan ko\'p to\'g\'ri javob uchun 0.1 gramm oltin beriladi',
                    '7 ta va undan kam javob bo\'lsa, oltin muzlatiladi',
                    'Har bir savol uchun 2 daqiqa vaqt ajratiladi',
                ].map((r, i) => (
                    <div className="iqt-rule" key={i}>
                        <CheckCircle size={15} color="#FFD700" /><span>{r}</span>
                    </div>
                ))}
            </div>

            <button className="iqt-start-btn" onClick={onStart}>
                <Play size={20} /> Testni boshlash
            </button>
        </div>
    </div>
);

// ─── Phase: QUIZ ─────────────────────────────────────────────────────────────
const QuizScreen = ({ question, idx, total, timeLeft, selected, onSelect, onNext, onPrev, categoryColors }) => {
    const cat = question.category;
    const colour = categoryColors[cat] || 'blue';
    const progress = ((idx) / total) * 100;
    const timerPct = (timeLeft / 120) * 100;

    return (
        <div className="iqt-quiz">
            {/* AI Monitoring Overlay */}
            <div className="ai-monitor-overlay">
                <div className="monitor-item">
                    <Video size={14} className="pulse-red" />
                    <span>Kamera yoqildi</span>
                </div>
                <div className="monitor-item">
                    <Eye size={14} />
                    <span>Ko'z harakati kuzatilmoqda...</span>
                </div>
            </div>

            {/* Top bar */}
            <div className="iqt-quiz-topbar">
                <div className="iqt-progress-wrap">
                    <div className="iqt-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="iqt-topbar-info">
                    <span className={`iqt-cat iqt-cat-${colour}`}>{cat}</span>
                    <span className="iqt-qnum">{idx + 1} / {total}</span>
                    <div className={`iqt-timer ${timeLeft <= 30 ? 'urgent' : ''}`}>
                        <Clock size={14} />
                        <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                        <div className="iqt-timer-ring">
                            <svg viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5"/>
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5"
                                    strokeDasharray={`${timerPct} 100`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 18 18)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Question card */}
            <div className="iqt-q-card">
                <div className="iqt-q-num">Savol {idx + 1}</div>
                <h2 className="iqt-q-text">{question.question}</h2>
            </div>

            {/* Options */}
            <div className="iqt-options">
                {question.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(i)}
                        className={`iqt-option ${selected === i ? 'selected' : ''}`}
                    >
                        <span className="iqt-opt-letter">{String.fromCharCode(65 + i)}</span>
                        <span className="iqt-opt-text">{opt}</span>
                        {selected === i && <CheckCircle size={18} className="iqt-opt-check" />}
                    </button>
                ))}
            </div>

            {/* Navigation */}
            <div className="iqt-nav">
                <button className="iqt-nav-btn secondary" onClick={onPrev} disabled={idx === 0}>
                    <ChevronLeft size={18}/> Orqaga
                </button>
                <button className="iqt-nav-btn primary" onClick={onNext}>
                    {idx === total - 1 ? 'Tugatish' : 'Keyingi'} <ChevronRight size={18}/>
                </button>
            </div>
        </div>
    );
};

// ─── Phase: RESULT ───────────────────────────────────────────────────────────
const ResultScreen = ({ answers, questions, timings, onRetry, categoryColors }) => {
    const score   = answers.filter((a, i) => a === questions[i].answer).length;
    const total   = questions.length;
    const avgTime = timings.reduce((s, t) => s + t, 0) / timings.length;
    const iq      = calcIQ(score, total, avgTime);
    
    const earnedGold = score >= 8;
    const iqLabel = iq >= 130 ? 'Daho' : iq >= 115 ? 'Yuqori' : iq >= 100 ? 'O\'rtacha yuqori' : iq >= 85 ? 'O\'rtacha' : 'Past';
    const iqColor = iq >= 130 ? 'amber' : iq >= 115 ? 'green' : iq >= 100 ? 'blue' : iq >= 85 ? 'purple' : 'red';

    useEffect(() => {
        if (earnedGold) {
            const currentGold = parseFloat(localStorage.getItem('gold_balance') || '0');
            localStorage.setItem('gold_balance', (currentGold + 0.1).toFixed(2));
        }
    }, [earnedGold]);

    return (
        <div className="iqt-result">
            <motion.div 
                className={`iqt-score-hero hero-${iqColor}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="iqt-score-blur b1"/><div className="iqt-score-blur b2"/>
                <div className="iqt-score-content">
                    {earnedGold ? <Award size={40} className="iqt-trophy gold-animate" /> : <Trophy size={36} className="iqt-trophy" />}
                    <div className="iqt-score-label">Sizning IQ ballingiz</div>
                    <div className="iqt-score-num">{iq}</div>
                    <div className={`iqt-score-badge badge-${iqColor}`}>{iqLabel}</div>
                    
                    <div className="result-gold-info">
                        {earnedGold ? (
                            <div className="gold-success">
                                <Zap size={20} fill="#FFD700" color="#FFD700" />
                                <span>Tabriklaymiz! +0.1 gramm oltin yutdingiz!</span>
                            </div>
                        ) : (
                            <div className="gold-frozen">
                                <AlertCircle size={20} />
                                <span>Oltin yutish uchun 8 tadan ko'p to'g'ri toping. Oltin muzlatildi.</span>
                            </div>
                        )}
                    </div>

                    <div className="iqt-score-sub">{score} / {total} to'g'ri · O'rtacha vaqt: {avgTime.toFixed(1)}s</div>
                </div>
            </motion.div>

            <div className="iqt-result-grid">
                <div className="iqt-res-card">
                    <h3 className="iqt-res-card-title"><CheckCircle size={18}/> Natija statistikasi</h3>
                    <div className="stats-mini-grid">
                        <div className="s-mini">
                            <span>To'g'ri</span>
                            <strong>{score}</strong>
                        </div>
                        <div className="s-mini">
                            <span>Noto'g'ri</span>
                            <strong>{total - score}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="iqt-result-actions">
                <button className="iqt-retry-btn" onClick={onRetry}>
                    <RotateCcw size={18}/> Qayta urinish
                </button>
            </div>
        </div>
    );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const IQTestComp = () => {
    const [phase, setPhase] = useState('intro');
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [timeLeft, setTimeLeft] = useState(120);
    const [timings, setTimings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const loadIQTestData = async () => {
            try {
                // Fallback questions if backend fails
                const fallbackQuestions = [
                    { id: 1, question: "Qaysi biri mantiqiy ketma-ketlikni to'ldiradi: 2, 4, 8, 16, ...?", options: ["20", "24", "32", "64"], answer: 2, category: "Mantiq" },
                    { id: 2, question: "Agar hamma A-lar B bo'lsa, va hamma B-lar C bo'lsa, unda hamma A-lar C-mi?", options: ["Ha", "Yo'q", "Balki", "Ma'lumot yetarli emas"], answer: 0, category: "Mantiq" },
                    { id: 3, question: "Dunyoning eng katta okeani qaysi?", options: ["Atlantika", "Hind", "Tinch", "Shimoliy Muz"], answer: 2, category: "Umumiy" },
                    { id: 4, question: "Qaysi sayyora 'Qizil sayyora' deb ataladi?", options: ["Venera", "Mars", "Yupiter", "Saturn"], answer: 1, category: "Kosmos" },
                    { id: 5, question: "O'zbekiston mustaqillikka erishgan yil?", options: ["1990", "1991", "1992", "1993"], answer: 1, category: "Tarix" },
                    { id: 6, question: "3^3 + 4^2 nimaga teng?", options: ["43", "33", "25", "27"], answer: 0, category: "Matematika" },
                    { id: 7, question: "Qaysi element kimyoviy belgisi 'Au'?", options: ["Kumush", "Mis", "Oltin", "Temir"], answer: 2, category: "Kimyo" },
                    { id: 8, question: "Shaxmatda eng kuchli figura qaysi?", options: ["Ruh", "Fil", "Farzin", "Ot"], answer: 2, category: "Sport" },
                    { id: 9, question: "Eng baland cho'qqi qaysi?", options: ["K2", "Everest", "Monblan", "Elbrus"], answer: 1, category: "Geografiya" },
                    { id: 10, question: "Yurak o'rtacha bir daqiqada necha marta uradi?", options: ["40-50", "60-80", "90-110", "120-140"], answer: 1, category: "Biologiya" },
                    { id: 11, question: "Inson tanasidagi eng katta organ?", options: ["Jigar", "Yurak", "Teri", "O'pka"], answer: 2, category: "Biologiya" },
                    { id: 12, question: "Yorug'lik tezligi qancha?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "340 m/s"], answer: 0, category: "Fizika" },
                ];

                let data;
                try {
                    const response = await fetch('http://localhost:3000/iqTest');
                    data = await response.json();
                } catch (e) {
                    data = { questions: fallbackQuestions, settings: { timePerQuestion: 120 } };
                }
                
                // Randomly select 10 questions
                const shuffled = [...(data.questions || fallbackQuestions)].sort(() => 0.5 - Math.random());
                const selectedQs = shuffled.slice(0, 10);
                
                setQuestions(selectedQs);
                setSettings(data.settings || { timePerQuestion: 120 });
                setAnswers(Array(10).fill(null));
                setTimeLeft(120);
            } catch (error) {
                console.error('Failed to load IQ test data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadIQTestData();
    }, []);

    useEffect(() => {
        if (phase !== 'quiz') return;
        if (timeLeft === 0) { 
            handleNext();
            return; 
        }
        const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(t);
    }, [phase, timeLeft]);

    const handleNext = useCallback(() => {
        const used = 120 - timeLeft;
        setTimings(prev => [...prev, used]);

        if (idx < questions.length - 1) {
            setIdx(idx + 1);
            setSelected(answers[idx + 1]);
            setTimeLeft(120);
        } else {
            setPhase('result');
        }
    }, [idx, timeLeft, answers, questions.length]);

    const startTest = () => {
        setPhase('quiz');
        setIdx(0);
        setAnswers(Array(questions.length).fill(null));
        setSelected(null);
        setTimeLeft(120);
        setTimings([]);
    };

    const handleSelect = (i) => {
        setSelected(i);
        const updated = [...answers];
        updated[idx] = i;
        setAnswers(updated);
    };

    const handlePrev = () => {
        if (idx === 0) return;
        setIdx(idx - 1);
        setSelected(answers[idx - 1]);
        setTimeLeft(120);
    };

    if (loading) return <div className="iqt-loading">Yuklanmoqda...</div>;

    return (
        <div className="iqt-page">
            <div className="iqt-container">
                {phase === 'intro'  && <IntroScreen onStart={startTest} questions={questions} settings={settings} />}
                {phase === 'quiz'   && (
                    <QuizScreen
                        question={questions[idx]}
                        idx={idx}
                        total={questions.length}
                        timeLeft={timeLeft}
                        selected={selected}
                        onSelect={handleSelect}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        categoryColors={{}}
                    />
                )}
                {phase === 'result' && (
                    <ResultScreen
                        questions={questions}
                        answers={answers}
                        timings={timings}
                        onRetry={startTest}
                        categoryColors={{}}
                    />
                )}
            </div>
        </div>
    );
};

export default IQTestComp;

