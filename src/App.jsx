import logoSrc from "./assets/logo.png";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ChevronDown, Star, Target,
  BarChart3, CheckCircle, Phone, Mail, Instagram, MessageCircle,
  Video, Camera, Globe, ShoppingBag, Layout, Menu, X
} from "lucide-react";

const GOLD       = "#B8973E";
const GOLD_LIGHT = "#D4AF6A";
const BLACK      = "#0A0A0A";
const BLACK_CARD = "#111111";
const BLACK_SURF = "#161616";
const WHITE      = "#F5F3EE";
const GRAY       = "#888880";

function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const h = () => setMob(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mob;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function GoldLine({ width = "60px" }) {
  return <div style={{ width, height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: "0 auto" }} />;
}

function Label({ children }) {
  return (
    <span style={{ fontFamily: "'Cormorant Garamond',serif", letterSpacing: "0.28em", fontSize: "11px", color: GOLD, textTransform: "uppercase", fontWeight: 600 }}>
      {children}
    </span>
  );
}

function GoldButton({ children, onClick, large = false, fullWidth = false }) {
  const [hov, setHov] = useState(false);
  const mob = useIsMobile();
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? GOLD_LIGHT : GOLD, color: BLACK, border: "none",
        padding: large ? (mob ? "15px 24px" : "18px 48px") : (mob ? "13px 20px" : "14px 36px"),
        fontSize: large ? (mob ? "13px" : "15px") : (mob ? "12px" : "13px"),
        fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        fontFamily: "'Cormorant Garamond',serif",
        cursor: "pointer", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: "10px",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 32px ${GOLD}44` : "none",
        width: fullWidth ? "100%" : "auto",
        minHeight: "48px",
      }}>
      {children}<ArrowRight size={16} />
    </button>
  );
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const mob = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  const links = [
    { label: "Serviços",    id: "servicos"    },
    { label: "Resultados",  id: "resultados"  },
    { label: "Metodologia", id: "metodologia" },
    { label: "Contato",     id: "cta"         },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || open ? `${BLACK}F2` : "transparent",
        borderBottom: scrolled ? `1px solid ${GOLD}20` : "none",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        padding: mob ? "13px 20px" : "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.35s ease",
      }}>
        <img src={logoSrc} alt="Hawks" style={{ height: mob ? "36px" : "44px", objectFit: "contain", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

        {!mob && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {links.map(l => (
              <span key={l.id} onClick={() => scrollTo(l.id)} style={{
                color: GRAY, fontSize: "13px", letterSpacing: "0.1em", cursor: "pointer",
                fontFamily: "'Cormorant Garamond',serif", fontWeight: 500, transition: "color 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = GRAY}>
                {l.label}
              </span>
            ))}
            <button onClick={() => scrollTo("cta")} style={{
              border: `1px solid ${GOLD}`, background: "transparent", color: GOLD,
              padding: "10px 22px", fontSize: "11px", letterSpacing: "0.13em",
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s", minHeight: "44px",
            }}
              onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BLACK; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>
              FALAR COM ESPECIALISTA
            </button>
          </div>
        )}

        {mob && (
          <button onClick={() => setOpen(o => !o)} style={{
            background: "transparent", border: `1px solid ${GOLD}44`, color: GOLD,
            cursor: "pointer", padding: "8px", display: "flex", alignItems: "center",
            justifyContent: "center", minWidth: "44px", minHeight: "44px",
          }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </nav>

      {mob && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199,
          background: `${BLACK}F8`, backdropFilter: "blur(16px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {links.map((l, i) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: "transparent", border: "none", color: WHITE,
              fontFamily: "'Cormorant Garamond',serif", fontSize: "34px",
              fontWeight: 700, cursor: "pointer", padding: "12px 32px",
              opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.3s ease ${0.1 + i * 0.06}s, transform 0.3s ease ${0.1 + i * 0.06}s`,
            }}>
              {l.label}
            </button>
          ))}
          <div style={{ marginTop: "24px", opacity: open ? 1 : 0, transition: "opacity 0.3s ease 0.38s", width: "260px" }}>
            <GoldButton fullWidth onClick={() => scrollTo("cta")}>Falar com Especialista</GoldButton>
          </div>
        </div>
      )}
    </>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  const mob = useIsMobile();
  return (
    <section id="hero" style={{
      minHeight: "100svh", background: BLACK, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: mob ? "96px 20px 80px" : "120px 24px 80px",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke={GOLD} strokeWidth="0.5" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: "15%", left: mob ? "-8%" : "5%", width: mob ? "200px" : "300px", height: mob ? "200px" : "300px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}18,transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: mob ? "-8%" : "5%", width: mob ? "240px" : "380px", height: mob ? "240px" : "380px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}0E,transparent 70%)`, filter: "blur(70px)", pointerEvents: "none" }} />

      <Reveal delay={0}><Label>Hawks Assessoria Digital — Especialistas em Negócios Locais</Label></Reveal>
      <Reveal delay={0.12}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: mob ? "clamp(40px,11vw,56px)" : "clamp(52px,8vw,94px)",
          fontWeight: 700, color: WHITE, lineHeight: 1.05,
          margin: mob ? "18px 0 0" : "26px 0 0",
        }}>
          Leads Todos os Dias.<br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>Faturamento</span> que<br />
          Não Para de Crescer.
        </h1>
      </Reveal>
      <Reveal delay={0.22}>
        <div style={{ width: "70px", height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: mob ? "18px auto" : "26px auto" }} />
      </Reveal>
      <Reveal delay={0.32}>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: mob ? "16px" : "clamp(18px,2.5vw,22px)",
          color: GRAY, maxWidth: mob ? "100%" : "620px", lineHeight: 1.65,
          margin: "0 auto", marginBottom: mob ? "28px" : "40px",
        }}>
          Somos especialistas em escalar negócios locais. Geramos leads qualificados todos os dias para aumentar seu faturamento e posicionar sua marca no mercado.
        </p>
      </Reveal>
      <Reveal delay={0.42}>
        <GoldButton large fullWidth={mob} onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
          Quero Gerar Leads Todo Dia
        </GoldButton>
      </Reveal>
      <Reveal delay={0.56}>
        <div style={{ display: "flex", gap: mob ? "22px" : "48px", marginTop: mob ? "36px" : "64px", flexWrap: "wrap", justifyContent: "center" }}>
          {[["500+","Negócios escalados"],["+340%","Crescimento médio"],["Diário","Fluxo de leads"]].map(([n,l]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "26px" : "36px", fontWeight: 700, color: GOLD }}>{n}</div>
              <div style={{ fontSize: "11px", color: GRAY, letterSpacing: "0.06em", marginTop: "3px" }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <div style={{ position: "absolute", bottom: "22px", left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <ChevronDown size={18} color={GOLD} style={{ opacity: 0.45 }} />
      </div>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0;overflow-x:hidden}
      `}</style>
    </section>
  );
}

// ── SERVIÇOS ───────────────────────────────────────────────────────────────────
const SERVICOS = [
  { icon: BarChart3, title: "Tráfego Pago — Meta Ads",    desc: "Campanhas cirúrgicas que entregam leads novos todos os dias. Funil completo com custo por lead controlado e ROAS positivo desde o início." },
  { icon: Video,     title: "Criativos em Vídeo",          desc: "Vídeos que capturam atenção em segundos e geram clique. Conteúdo que posiciona sua marca localmente e converte no feed, stories e reels." },
  { icon: Camera,    title: "Criativos em Foto",            desc: "Fotos e artes gráficas que fortalecem o posicionamento da sua marca. Cada peça criada com base em dados reais de conversão." },
  { icon: Layout,    title: "Landing Pages",                desc: "LPs que transformam visitantes em leads quentes todos os dias. Copy persuasiva e estrutura otimizada para capturar clientes novos." },
  { icon: Globe,     title: "Site Completo de Vendas",     desc: "Sites com integração ao WhatsApp e formulários de captura — estruturado para converter visitantes em leads qualificados 24h por dia." },
  { icon: ShoppingBag, title: "Catálogo Digital",          desc: "Apresente seus produtos profissionalmente. Sua equipe fecha mais rápido e sua marca se posiciona com autoridade no mercado local." },
];

function Servicos() {
  const mob = useIsMobile();
  return (
    <section id="servicos" style={{ background: BLACK_SURF, padding: mob ? "64px 20px" : "120px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "36px" : "60px" }}>
            <Label>Nossas Soluções</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(30px,8vw,42px)" : "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Estratégias que<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Geram Leads Todo Dia</span>
            </h2>
            <GoldLine width="70px" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fit,minmax(320px,1fr))", gap: mob ? "12px" : "18px" }}>
          {SERVICOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.06}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD}22`,
                  padding: mob ? "20px 18px" : "30px 26px",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.background = `${GOLD}07`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}22`; e.currentTarget.style.background = BLACK_CARD; }}>
                  <div style={{ width: "44px", height: "44px", minWidth: "44px", border: `1px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "17px" : "19px", fontWeight: 700, color: WHITE, marginBottom: "7px" }}>{s.title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: GRAY, lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CASE INFINITE ──────────────────────────────────────────────────────────────
function CaseInfinite() {
  const mob = useIsMobile();
  const metricas = [
    { value: "R$ 1M+", label: "Lucro gerado" },
    { value: "R$ 40k", label: "Investimento" },
    { value: "13",     label: "Vendedores"   },
    { value: "25x",    label: "Retorno"      },
  ];
  return (
    <section id="resultados" style={{ background: BLACK, padding: mob ? "64px 20px" : "120px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}08,transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "28px" : "48px" }}>
            <Label>Case Real — Infinite Móveis</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,40px)" : "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "14px 0 0", lineHeight: 1.1 }}>
              Como a <span style={{ color: GOLD, fontStyle: "italic" }}>Infinite</span> saiu do zero<br />para R$ 1 Milhão de lucro
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: mob ? "10px" : "14px", marginBottom: mob ? "16px" : "24px" }}>
            {metricas.map((m, i) => (
              <div key={i} style={{ background: BLACK_CARD, border: `1px solid ${GOLD}33`, padding: mob ? "18px 12px" : "26px 22px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "26px" : "38px", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: mob ? "10px" : "11px", color: GRAY, letterSpacing: "0.07em", marginTop: "5px", textTransform: "uppercase" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "12px" : "20px" }}>
          <Reveal>
            <div style={{ border: `1px solid ${GOLD}33`, padding: mob ? "20px 16px" : "26px", background: BLACK_CARD }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>O Desafio</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "16px", color: WHITE, lineHeight: 1.7, margin: 0 }}>
                A Infinite precisava gerar leads todos os dias para alimentar sua equipe comercial — sem depender de indicação ou porta a porta.
              </p>
            </div>
          </Reveal>
          <Reveal delay={mob ? 0 : 0.1}>
            <div style={{ border: `1px solid ${GOLD}33`, padding: mob ? "20px 16px" : "26px", background: BLACK_CARD }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>A Solução Hawks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {["Meta Ads gerando leads qualificados diariamente","Criativos em foto e vídeo posicionando a marca","Landing page de alta conversão para leads quentes","13 vendedores nutridos com leads todo dia"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                    <CheckCircle size={14} color={GOLD} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: GRAY, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div style={{ marginTop: mob ? "14px" : "20px", border: `1px solid ${GOLD}22`, padding: mob ? "20px 16px" : "26px 30px", background: `${GOLD}0A` }}>
            <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
              {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill={GOLD} color={GOLD} />)}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "17px", color: WHITE, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
              "A Hawks resolveu nosso maior problema: a falta de leads novos todo dia. Em poucos meses, nossa equipe estava trabalhando no limite. Resultado real, não promessa."
            </p>
            <div style={{ marginTop: "12px", fontSize: "13px", color: GOLD, fontFamily: "'Cormorant Garamond',serif", fontWeight: 600 }}>
              Equipe Infinite — Móveis Modulados
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── NÚMEROS ────────────────────────────────────────────────────────────────────
function Numeros() {
  const mob = useIsMobile();
  const stats = [
    { value: "500+",     label: "Negócios escalados"    },
    { value: "+340%",    label: "Crescimento médio"     },
    { value: "Diário",   label: "Fluxo de leads"        },
    { value: "3 Pilares",label: "Leads·Marca·Conversão" },
  ];
  return (
    <section style={{ background: BLACK, borderTop: `1px solid ${GOLD}20`, borderBottom: `1px solid ${GOLD}20`, padding: mob ? "48px 20px" : "72px 48px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: mob ? "24px 16px" : "32px" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(24px,7vw,34px)" : "clamp(34px,4vw,50px)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.value}</div>
              <GoldLine width="34px" />
              <div style={{ fontSize: mob ? "10px" : "12px", color: GRAY, letterSpacing: "0.07em", marginTop: "9px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── PROVAS SOCIAIS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Ricardo Almeida",  role: "CEO – Móveis Almeida",          tag: "Tráfego Pago",  text: "Em 4 meses, saímos de R$80k para R$340k/mês. Os leads chegavam todo dia — minha equipe nunca ficou parada esperando cliente.", metric: "+325%", metricLabel: "faturamento"       },
  { name: "Carla Duarte",     role: "Sócia – Duarte Home Office",     tag: "Criativos",     text: "Os criativos deles mudaram como o mercado nos enxerga. Não somos mais só mais um negócio local — somos referência.",           metric: "4x",    metricLabel: "conversão"          },
  { name: "Fábio Monteiro",   role: "Dir. Comercial – Monteiro",      tag: "Meta Ads",      text: "Antes dependíamos de indicação. Hoje temos leads novos todo dia. Em 90 dias o custo por lead caiu pela metade.",              metric: "6.4x",  metricLabel: "ROAS"               },
  { name: "Juliana Ferro",    role: "Fundadora – Ferro & Espaço",     tag: "Landing Page",  text: "A landing page converteu desde o primeiro dia. Chegamos a 80 leads qualificados por semana com o mesmo investimento.",        metric: "R$1.8M",metricLabel: "em 12 meses"        },
  { name: "Paulo Serrano",    role: "CEO – Serranos Modulados",       tag: "Site+Catálogo", text: "Com o site profissional, nossa marca ganhou autoridade local. Os leads chegam prontos — o ciclo de venda caiu 70%.",          metric: "73%",   metricLabel: "↓ ciclo de venda"   },
  { name: "Ana Becker",       role: "Proprietária – Becker Estética", tag: "Tráfego Pago",  text: "Meu negócio precisava de clientes novos todo dia. A Hawks montou uma máquina de leads que funciona sete dias por semana.",    metric: "R$600k",metricLabel: "receita incremental" },
];

function ProvasSociais() {
  const mob = useIsMobile();
  return (
    <section id="depoimentos" style={{ background: BLACK_SURF, padding: mob ? "64px 20px" : "120px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "32px" : "56px" }}>
            <Label>Negócios Locais que Escalaram</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(30px,8vw,42px)" : "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Leads Reais.<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Negócios que Cresceram</span>
            </h2>
            <GoldLine width="70px" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fit,minmax(320px,1fr))", gap: mob ? "12px" : "18px" }}>
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={i} delay={mob ? 0 : i * 0.06}>
              <div style={{
                background: BLACK_CARD, border: `1px solid ${GOLD}28`,
                padding: mob ? "20px 16px" : "26px",
                height: "100%", display: "flex", flexDirection: "column", gap: "14px",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}60`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}28`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill={GOLD} color={GOLD} />)}
                  </div>
                  <span style={{ fontSize: "10px", color: GOLD, border: `1px solid ${GOLD}44`, padding: "2px 9px", letterSpacing: "0.07em" }}>{item.tag}</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "16px", color: WHITE, lineHeight: 1.65, flex: 1, margin: 0 }}>
                  "{item.text}"
                </p>
                <div style={{ borderTop: `1px solid ${GOLD}20`, paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: WHITE }}>{item.name}</div>
                    <div style={{ fontSize: "11px", color: GRAY, marginTop: "2px" }}>{item.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "24px" : "28px", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{item.metric}</div>
                    <div style={{ fontSize: "10px", color: GRAY, letterSpacing: "0.05em" }}>{item.metricLabel}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── METODOLOGIA ────────────────────────────────────────────────────────────────
const METODO = [
  { step:"01", icon: Target,    title: "Diagnóstico Estratégico",  desc: "Mapeamos faturamento, custo por lead e posicionamento. Identificamos os gargalos que impedem você de receber mais clientes todo dia." },
  { step:"02", icon: Camera,    title: "Produção de Criativos",     desc: "Vídeos e fotos estratégicos que posicionam sua marca localmente e geram clique. Conteúdo para converter — não apenas aparecer." },
  { step:"03", icon: BarChart3, title: "Ativação de Leads Diários", desc: "Campanhas no Meta Ads com funil completo que entregam contatos qualificados todos os dias — com custo controlado e escalável." },
  { step:"04", icon: Globe,     title: "Sites e LPs que Convertem", desc: "LPs e sites que transformam tráfego pago em leads quentes, entregando visitantes prontos para sua equipe fechar." },
];

function MetodologiaHawks() {
  const mob = useIsMobile();
  return (
    <section id="metodologia" style={{ background: BLACK, padding: mob ? "64px 20px" : "120px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "36px" : "64px" }}>
            <Label>Nossa Metodologia</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(30px,8vw,42px)" : "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Como Geramos<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Leads Todos os Dias</span>
            </h2>
            <GoldLine width="70px" />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "17px", color: GRAY, marginTop: "14px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Não somos uma agência genérica. Somos especialistas em escalar negócios locais.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: mob ? "12px" : "16px", marginBottom: mob ? "28px" : "48px" }}>
          {METODO.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.09}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD}22`,
                  padding: mob ? "20px 18px" : "30px",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  position: "relative", overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}55`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}22`}>
                  <div style={{ position: "absolute", top: "6px", right: "14px", fontFamily: "'Cormorant Garamond',serif", fontSize: "52px", fontWeight: 700, color: `${GOLD}10`, lineHeight: 1, pointerEvents: "none" }}>{item.step}</div>
                  <div style={{ width: "46px", height: "46px", minWidth: "46px", border: `1px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "17px" : "19px", fontWeight: 700, color: WHITE, marginBottom: "7px" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: GRAY, lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div style={{ border: `1px solid ${GOLD}33`, padding: mob ? "22px 18px" : "40px 44px", background: BLACK_CARD }}>
            <Label>Por que somos diferentes</Label>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "22px" : "28px", fontWeight: 700, color: WHITE, margin: "12px 0 16px", lineHeight: 1.2 }}>
              100% Focados em<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Escalar Negócios Locais</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "10px" : "12px" }}>
              {["Diagnóstico gratuito na primeira reunião","Leads qualificados chegando todo dia","Criativos que posicionam sua marca localmente","Relatório de performance semanal e transparente","Sites e LPs que convertem tráfego em clientes","Resultados documentados e 100% mensuráveis"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle size={14} color={GOLD} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: WHITE }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CTA FINAL ──────────────────────────────────────────────────────────────────
function CTAFinal() {
  const mob = useIsMobile();
  const WA  = "https://wa.me/5511999990000";
  return (
    <section id="cta" style={{ background: BLACK_SURF, padding: mob ? "64px 20px 110px" : "120px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}10,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <img src={logoSrc} alt="Hawks" style={{ height: mob ? "44px" : "56px", objectFit: "contain", marginBottom: mob ? "24px" : "36px" }} />
          <Label>Próximo Passo</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(32px,9vw,48px)" : "clamp(40px,6vw,68px)", fontWeight: 700, color: WHITE, margin: "16px 0 0", lineHeight: 1.05 }}>
            Pronto Para Receber<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Leads Todos os Dias</span>?
          </h2>
          <div style={{ width: "70px", height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: mob ? "20px auto" : "26px auto" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "16px" : "18px", color: GRAY, lineHeight: 1.65, marginBottom: mob ? "28px" : "40px" }}>
            Agende um diagnóstico gratuito. Em 60 minutos, você terá um mapa claro de como gerar leads qualificados todos os dias e aumentar seu faturamento.
          </p>
          <GoldButton large fullWidth={mob} onClick={() => window.open(WA,"_blank")}>
            Quero Gerar Leads Todo Dia
          </GoldButton>
          <div style={{ marginTop: "16px", fontSize: "12px", color: GRAY, letterSpacing: "0.05em" }}>
            Diagnóstico gratuito • Sem compromisso • Resposta em até 24h
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────────
function Footer() {
  const mob = useIsMobile();
  return (
    <footer style={{ background: BLACK, borderTop: `1px solid ${GOLD}20`, padding: mob ? "44px 20px 90px" : "56px 48px 36px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {mob ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <img src={logoSrc} alt="Hawks" style={{ height: "40px", objectFit: "contain", marginBottom: "12px" }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "14px", color: GRAY, lineHeight: 1.7, margin: 0 }}>
                Especialistas em escalar negócios locais com tráfego pago, criativos e sites de alta conversão.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {[Instagram, MessageCircle, Phone].map((Icon, i) => (
                  <div key={i} style={{ width: "44px", height: "44px", border: `1px solid ${GOLD}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} color={GOLD} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Serviços</div>
                {["Meta Ads","Criativos","Landing Pages","Sites","Catálogo"].map(item => (
                  <div key={item} style={{ fontSize: "13px", color: GRAY, marginBottom: "8px", fontFamily: "'Cormorant Garamond',serif" }}>{item}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Contato</div>
                {[[Mail,"contato@hawksdigital.com.br"],[Phone,"(11) 99999-0000"],[Instagram,"@hawksassessoria"]].map(([Icon,text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "7px", marginBottom: "9px" }}>
                    <Icon size={12} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: GRAY, fontFamily: "'Cormorant Garamond',serif", wordBreak: "break-all" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "52px", marginBottom: "36px" }}>
            <div>
              <img src={logoSrc} alt="Hawks" style={{ height: "46px", objectFit: "contain", marginBottom: "14px" }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", color: GRAY, lineHeight: 1.7, maxWidth: "290px" }}>
                Especialistas em escalar negócios locais com tráfego pago, criativos e sites de alta conversão.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                {[Instagram, MessageCircle, Phone].map((Icon, i) => (
                  <div key={i} style={{ width: "40px", height: "40px", border: `1px solid ${GOLD}33`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `${GOLD}11`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}33`; e.currentTarget.style.background = "transparent"; }}>
                    <Icon size={14} color={GOLD} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Serviços</div>
              {["Meta Ads","Criativos em Vídeo","Criativos em Foto","Landing Pages","Sites de Vendas","Catálogo Digital"].map(item => (
                <div key={item} style={{ fontSize: "13px", color: GRAY, marginBottom: "8px", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Cormorant Garamond',serif" }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = GRAY}>{item}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Contato</div>
              {[[Mail,"contato@hawksdigital.com.br"],[Phone,"+55 (11) 99999-0000"],[Instagram,"@hawksassessoria"]].map(([Icon,text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Icon size={12} color={GOLD} />
                  <span style={{ fontSize: "13px", color: GRAY, fontFamily: "'Cormorant Garamond',serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ borderTop: `1px solid ${GOLD}15`, paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginTop: mob ? "24px" : "0" }}>
          <span style={{ fontSize: "11px", color: GRAY }}>© 2025 Hawks Assessoria Digital. Todos os direitos reservados.</span>
          <span style={{ fontSize: "11px", color: `${GOLD}77` }}>Especialistas em Escalar Negócios Locais</span>
        </div>
      </div>
    </footer>
  );
}

// ── FLOATING WHATSAPP ──────────────────────────────────────────────────────────
function FloatingWA() {
  const mob  = useIsMobile();
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2200); return () => clearTimeout(t); }, []);
  if (!mob) return null;
  return (
    <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: "88px", right: "20px", zIndex: 300,
        width: "54px", height: "54px", borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 18px rgba(37,211,102,.45)",
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        textDecoration: "none",
      }}>
      <MessageCircle size={24} fill="white" color="white" />
    </a>
  );
}

// ── STICKY BOTTOM CTA ──────────────────────────────────────────────────────────
function StickyBottomCTA() {
  const mob  = useIsMobile();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 350);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!mob) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 299,
      padding: "10px 20px",
      background: `${BLACK}EE`, borderTop: `1px solid ${GOLD}25`,
      backdropFilter: "blur(12px)",
      transform: show ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <GoldButton fullWidth large onClick={() => window.open("https://wa.me/5511999990000","_blank")}>
        Quero Gerar Leads Todo Dia
      </GoldButton>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function HawksLanding() {
  useEffect(() => {
    const link  = document.createElement("link");
    link.rel    = "stylesheet";
    link.href   = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap";
    document.head.appendChild(link);
    document.body.style.cssText = "margin:0;padding:0;background:#0A0A0A;overflow-x:hidden";
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond',serif", background: "#0A0A0A", color: "#F5F3EE", margin: 0, padding: 0, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Servicos />
      <CaseInfinite />
      <Numeros />
      <ProvasSociais />
      <MetodologiaHawks />
      <CTAFinal />
      <Footer />
      <FloatingWA />
      <StickyBottomCTA />
    </div>
  );
}
