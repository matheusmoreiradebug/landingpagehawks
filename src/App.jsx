import logoSrc from "./assets/logo.png";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ChevronDown, Star, Target, Zap, Shield, Eye,
  BarChart3, CheckCircle, Phone, Mail, Instagram, MessageCircle,
  Video, Camera, Globe, ShoppingBag, Layout, Menu, X,
  TrendingUp, Database, Cpu, Lock, Activity, Users
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
// Dourado aplicado APENAS em elementos de destaque (ícones, bordas, CTAs).
// Texto de leitura: sempre WHITE (#FAFAFA) para clareza máxima.
const GOLD        = "#C4973A";   // tom mais quente — menos amarelo, mais cobre
const GOLD_DIM    = "#C4973A44"; // bordas sutis
const GOLD_GLOW   = "#C4973A22"; // fundos de hover
const BLACK       = "#080808";
const BLACK_CARD  = "#101010";
const BLACK_SURF  = "#141414";
const WHITE       = "#FAFAFA";   // branco puro para leitura
const GRAY        = "#7A7A78";
const GRAY_L      = "#B0B0AE";   // cinza claro para subtítulos
const WA_URL      = "https://wa.me/5511999990000";

// ─── Hooks ────────────────────────────────────────────────────────────────────
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
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0 }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

// ─── UI primitives ────────────────────────────────────────────────────────────
function GoldLine({ width = "56px" }) {
  return (
    <div style={{
      width, height: "1px",
      background: `linear-gradient(90deg,transparent,${GOLD},transparent)`,
      margin: "0 auto"
    }} />
  );
}

// Eyebrow label — dourado APENAS aqui (elemento de destaque)
function Label({ children }) {
  return (
    <span style={{
      fontFamily: "'Cormorant Garamond',serif",
      letterSpacing: "0.3em", fontSize: "11px",
      color: GOLD, textTransform: "uppercase", fontWeight: 600
    }}>
      {children}
    </span>
  );
}

// CTA primário — fundo dourado, texto preto. Único lugar com fundo gold.
function GoldButton({ children, onClick, large = false, fullWidth = false }) {
  const [hov, setHov] = useState(false);
  const mob = useIsMobile();
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#D4A84A" : GOLD,
        color: "#080808",
        border: "none",
        padding: large
          ? (mob ? "15px 22px" : "18px 52px")
          : (mob ? "13px 20px" : "13px 36px"),
        fontSize: large ? (mob ? "13px" : "14px") : (mob ? "12px" : "13px"),
        fontWeight: 800,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontFamily: "'Cormorant Garamond',serif",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "all 0.28s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 6px 28px ${GOLD}55` : `0 2px 12px ${GOLD}30`,
        width: fullWidth ? "100%" : "auto",
        minHeight: "50px",
        borderRadius: "1px",
      }}>
      {children}
      <ArrowRight size={15} />
    </button>
  );
}

// CTA secundário — borda dourada, fundo transparente
function OutlineButton({ children, onClick, fullWidth = false }) {
  const [hov, setHov] = useState(false);
  const mob = useIsMobile();
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? GOLD_GLOW : "transparent",
        color: WHITE,
        border: `1px solid ${GOLD}`,
        padding: mob ? "13px 20px" : "13px 32px",
        fontSize: mob ? "12px" : "13px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: "'Cormorant Garamond',serif",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "all 0.25s",
        width: fullWidth ? "100%" : "auto",
        minHeight: "50px",
      }}>
      {children}
    </button>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
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

  const go = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 280);
  };

  const links = [
    { label: "Serviços",     id: "servicos"    },
    { label: "Pegasus",      id: "pegasus"     },
    { label: "Resultados",   id: "resultados"  },
    { label: "Metodologia",  id: "metodologia" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || open ? `${BLACK}F4` : "transparent",
        borderBottom: scrolled ? `1px solid ${GOLD_DIM}` : "none",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
        padding: mob ? "13px 20px" : "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.35s ease",
      }}>
        <img
          src={logoSrc} alt="Hawks Assessoria Digital"
          style={{ height: mob ? "34px" : "42px", objectFit: "contain", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {!mob && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {links.map(l => (
              <span key={l.id} onClick={() => go(l.id)} style={{
                color: GRAY_L, fontSize: "12px", letterSpacing: "0.12em",
                cursor: "pointer", fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 500, transition: "color 0.2s", textTransform: "uppercase",
              }}
                onMouseEnter={e => e.target.style.color = WHITE}
                onMouseLeave={e => e.target.style.color = GRAY_L}>
                {l.label}
              </span>
            ))}
            <button onClick={() => go("cta")} style={{
              border: `1px solid ${GOLD}`, background: "transparent", color: GOLD,
              padding: "9px 22px", fontSize: "11px", letterSpacing: "0.15em",
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 700,
              cursor: "pointer", transition: "all 0.22s", minHeight: "42px",
              textTransform: "uppercase",
            }}
              onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BLACK; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>
              Diagnóstico Gratuito
            </button>
          </div>
        )}

        {mob && (
          <button onClick={() => setOpen(o => !o)} style={{
            background: "transparent", border: `1px solid ${GOLD_DIM}`, color: GOLD,
            cursor: "pointer", padding: "9px", display: "flex",
            alignItems: "center", justifyContent: "center",
            minWidth: "44px", minHeight: "44px",
          }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </nav>

      {mob && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199,
          background: `${BLACK}F9`, backdropFilter: "blur(18px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "4px",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {links.map((l, i) => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: "transparent", border: "none", color: WHITE,
              fontFamily: "'Cormorant Garamond',serif", fontSize: "32px",
              fontWeight: 700, cursor: "pointer", padding: "10px 32px",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.28s ease ${0.08 + i * 0.06}s, transform 0.28s ease ${0.08 + i * 0.06}s`,
            }}>
              {l.label}
            </button>
          ))}
          <div style={{ marginTop: "28px", width: "260px", opacity: open ? 1 : 0, transition: "opacity 0.28s ease 0.34s" }}>
            <GoldButton fullWidth onClick={() => go("cta")}>Diagnóstico Gratuito</GoldButton>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
// Correção 1: Headline ataca o RESULTADO (faturamento de marcenaria de alto ticket)
// Correção 5: CTA ativo "Solicitar Diagnóstico de Vendas"
// Correção 2: Dourado APENAS nos números e na linha divisória — texto em WHITE puro
function Hero() {
  const mob = useIsMobile();
  return (
    <section id="hero" style={{
      minHeight: "100svh", background: BLACK, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: mob ? "92px 20px 76px" : "120px 32px 80px",
    }}>
      {/* Grid bg */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
        <defs><pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 0 0 56" fill="none" stroke={GOLD} strokeWidth="0.6" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
      {/* Glows — dourado APENAS como atmosfera, não como texto */}
      <div style={{ position: "absolute", top: "12%", left: mob ? "-12%" : "3%", width: mob ? "220px" : "340px", height: mob ? "220px" : "340px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}14,transparent 70%)`, filter: "blur(55px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "12%", right: mob ? "-12%" : "3%", width: mob ? "260px" : "420px", height: mob ? "260px" : "420px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}0C,transparent 70%)`, filter: "blur(75px)", pointerEvents: "none" }} />

      <Reveal><Label>Hawks Assessoria Digital — Setor Moveleiro &amp; Marcenaria</Label></Reveal>

      <Reveal delay={0.1}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: mob ? "clamp(38px,10.5vw,54px)" : "clamp(54px,7.5vw,88px)",
          fontWeight: 700, color: WHITE,  /* WHITE puro — não dourado */
          lineHeight: 1.04,
          margin: mob ? "16px 0 0" : "24px 0 0",
          maxWidth: mob ? "100%" : "900px",
        }}>
          Aceleramos o Faturamento<br />
          de Marcenarias de<br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>Alto Padrão.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{ width: "64px", height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: mob ? "16px auto" : "22px auto" }} />
      </Reveal>

      <Reveal delay={0.3}>
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: mob ? "16px" : "clamp(17px,2vw,21px)",
          color: GRAY_L, /* cinza claro, não dourado — leitura confortável */
          maxWidth: mob ? "100%" : "640px",
          lineHeight: 1.7, margin: "0 auto",
          marginBottom: mob ? "28px" : "40px",
        }}>
          Inteligência de dados + tráfego qualificado no Meta Ads para marcenarias, fábricas de móveis planejados e showrooms que precisam de leads de alto ticket todos os dias.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <GoldButton large fullWidth={mob} onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
          Solicitar Diagnóstico de Vendas
        </GoldButton>
      </Reveal>

      {/* Prova social rápida — números em dourado, labels em cinza */}
      <Reveal delay={0.54}>
        <div style={{ display: "flex", gap: mob ? "20px" : "52px", marginTop: mob ? "36px" : "64px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            ["R$1M+",   "Lucro gerado — Infinite"],
            ["+340%",   "Crescimento médio de faturamento"],
            ["25x",     "ROI comprovado em clientes do setor"],
          ].map(([n, l]) => (
            <div key={n} style={{ textAlign: "center", minWidth: mob ? "90px" : "auto" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "28px" : "38px", fontWeight: 700, color: GOLD }}>{n}</div>
              <div style={{ fontSize: "10px", color: GRAY, letterSpacing: "0.06em", marginTop: "3px", maxWidth: "120px", lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", animation: "bob 2s infinite" }}>
        <ChevronDown size={16} color={GOLD} style={{ opacity: 0.4 }} />
      </div>

      <style>{`
        @keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(7px)}}
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0;overflow-x:hidden}
      `}</style>
    </section>
  );
}

// ─── AUTORIDADE DE NICHO ──────────────────────────────────────────────────────
// Correção 3: Seção exclusiva "Por que somos especialistas no setor moveleiro?"
// com métricas reais do nicho e linguagem de dono de marcenaria
function AutoridadeNicho() {
  const mob = useIsMobile();
  const metricas = [
    { val: "R$120–R$380", label: "Custo por lead qualificado em cozinha planejada" },
    { val: "18–45 dias",  label: "Ciclo médio de venda em móveis planejados"       },
    { val: "R$8k–R$40k",  label: "Ticket médio de projetos que geramos leads"      },
    { val: "3–7%",        label: "Taxa de conversão lead → contrato no setor"      },
  ];
  const diferenciais = [
    { icon: Target,    text: "Segmentação por CEP e renda para atingir clientes de alto ticket no raio da sua marcenaria" },
    { icon: Camera,    text: "Criativos com ambientes planejados reais — não mockup genérico — que geram identificação imediata" },
    { icon: BarChart3, text: "Campanhas com CPL (custo por lead) compatível com a margem real de projetos de móveis planejados" },
    { icon: Users,     text: "Experiência com toda a cadeia: fábrica, showroom, representante, marceneiro e loja de móveis" },
  ];
  return (
    <section id="nicho" style={{ background: BLACK_SURF, padding: mob ? "64px 20px" : "110px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "36px" : "60px" }}>
            <Label>Especialidade Comprovada</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,40px)" : "clamp(34px,4.5vw,52px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Por Que Somos Especialistas<br /><span style={{ color: GOLD, fontStyle: "italic" }}>no Setor Moveleiro?</span>
            </h2>
            <GoldLine width="70px" />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "17px", color: GRAY_L, marginTop: "16px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
              Um gestor de tráfego genérico não sabe o que é "metragem de um projeto" ou "CPL compatível com margem de cozinha planejada". A Hawks sabe.
            </p>
          </div>
        </Reveal>

        {/* Métricas do nicho */}
        <Reveal delay={0.08}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: mob ? "10px" : "14px", marginBottom: mob ? "28px" : "44px" }}>
            {metricas.map((m, i) => (
              <div key={i} style={{
                background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                padding: mob ? "18px 12px" : "24px 20px", textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "18px" : "24px", fontWeight: 700, color: GOLD, lineHeight: 1.1 }}>{m.val}</div>
                <div style={{ fontSize: mob ? "10px" : "11px", color: GRAY_L, marginTop: "6px", lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Diferenciais do nicho */}
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "10px" : "14px" }}>
          {diferenciais.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.07}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                  padding: mob ? "18px 16px" : "24px 26px",
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  transition: "border-color 0.28s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}66`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = GOLD_DIM}>
                  <div style={{ width: "40px", height: "40px", minWidth: "40px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={GOLD} />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "16px", color: WHITE, lineHeight: 1.65, margin: 0 }}>{d.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PEGASUS — DIFERENCIAL TECNOLÓGICO ────────────────────────────────────────
// Correção 4: O sistema Pegasus como vantagem competitiva exclusiva
// Vende TECNOLOGIA, não mão de obra commodity
function Pegasus() {
  const mob = useIsMobile();
  const pilares = [
    { icon: Database, title: "Inteligência de Dados",    desc: "Pegasus cruza dados de comportamento, intenção de compra e perfil socioeconômico para identificar quem está pronto para comprar um projeto de móveis — antes mesmo de pesquisar." },
    { icon: Activity, title: "Otimização em Tempo Real", desc: "O sistema monitora CPL, ROAS e qualidade dos leads hora a hora. Quando uma campanha perde eficiência, o Pegasus realoca o budget automaticamente para os conjuntos que convertem." },
    { icon: Eye,      title: "Creative Intelligence",    desc: "Análise contínua de qual criativo, copy e formato gera o lead de maior ticket. Não testamos no achismo — testamos com dados do setor moveleiro acumulados em meses de operação." },
    { icon: Lock,     title: "Exclusivo Hawks",          desc: "Nenhuma outra agência tem o Pegasus. É nossa propriedade intelectual — desenvolvida especificamente para o ciclo de venda longo e alto ticket do mercado de móveis planejados." },
  ];
  return (
    <section id="pegasus" style={{ background: BLACK, padding: mob ? "64px 20px" : "110px 48px", position: "relative", overflow: "hidden" }}>
      {/* Glow decorativo */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}07,transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "36px" : "60px" }}>
            <Label>Tecnologia Exclusiva Hawks</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,42px)" : "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "14px 0 0", lineHeight: 1.1 }}>
              Conheça o <span style={{ color: GOLD, fontStyle: "italic" }}>Pegasus</span>
            </h2>
            <div style={{ width: "64px", height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: "16px auto 20px" }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "18px", color: GRAY_L, maxWidth: "640px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
              Enquanto outras agências gerenciam anúncios manualmente, a Hawks opera com um sistema proprietário de inteligência de dados que garante que cada real investido em Meta Ads gere o lead de maior potencial para o seu negócio.
            </p>
          </div>
        </Reveal>

        {/* Destaque central */}
        <Reveal delay={0.08}>
          <div style={{
            border: `1px solid ${GOLD}55`,
            background: `linear-gradient(135deg,${BLACK_CARD},${BLACK})`,
            padding: mob ? "28px 20px" : "44px 52px",
            textAlign: "center",
            marginBottom: mob ? "20px" : "32px",
            position: "relative",
          }}>
            {/* Badge exclusivo */}
            <div style={{
              position: "absolute", top: mob ? "-12px" : "-14px", left: "50%", transform: "translateX(-50%)",
              background: GOLD, color: BLACK,
              padding: "4px 20px", fontSize: "10px", letterSpacing: "0.2em",
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 800, textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Propriedade Intelectual Hawks
            </div>
            <Cpu size={mob ? 32 : 44} color={GOLD} style={{ marginBottom: "16px" }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "20px" : "28px", fontWeight: 700, color: WHITE, margin: "0 0 12px" }}>
              O Pegasus não é uma ferramenta.<br />É a diferença entre anúncio e resultado.
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "17px", color: GRAY_L, lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
              Agências manuais desperdiçam entre 30% e 60% do investimento em cliques que nunca vão comprar. O Pegasus elimina esse desperdício usando inteligência de dados específica para o mercado de móveis planejados — onde o ciclo de compra é longo, o ticket é alto e cada lead conta.
            </p>
          </div>
        </Reveal>

        {/* 4 pilares */}
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2,1fr)", gap: mob ? "10px" : "14px" }}>
          {pilares.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.08}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                  padding: mob ? "20px 16px" : "28px",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  transition: "border-color 0.28s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}60`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = GOLD_DIM}>
                  <div style={{ width: "44px", height: "44px", minWidth: "44px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "17px" : "18px", fontWeight: 700, color: WHITE, marginBottom: "7px" }}>{p.title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: GRAY_L, lineHeight: 1.65 }}>{p.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div style={{ textAlign: "center", marginTop: mob ? "28px" : "44px" }}>
            <GoldButton large fullWidth={mob} onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
              Consultar Viabilidade para Minha Marcenaria
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SERVIÇOS ─────────────────────────────────────────────────────────────────
// Correção 1: Textos focados em resultado de marcenaria/alto ticket, não em processo
const SERVICOS = [
  { icon: BarChart3,   title: "Meta Ads — Alto Ticket",      desc: "Campanhas para marcenarias e showrooms com segmentação por renda e CEP. Funil do awareness ao agendamento de visita — com CPL compatível com a margem real do seu projeto." },
  { icon: Video,       title: "Criativos em Vídeo",           desc: "Vídeos com ambientes planejados reais que geram identificação imediata. Conteúdo que mostra o projeto pronto — e faz o lead visualizar o próprio espaço transformado." },
  { icon: Camera,      title: "Criativos em Foto",             desc: "Fotos de produto e ambiente com direção de arte voltada para o alto padrão. Cada imagem comunica sofisticação e eleva a percepção de valor antes do primeiro contato." },
  { icon: Layout,      title: "Landing Page de Conversão",    desc: "LP focada no agendamento de visita ao showroom ou orçamento de projeto. Copy com prova social do setor e CTA que gera ação — não curiosidade." },
  { icon: Globe,       title: "Site para Marcenaria",         desc: "Site institucional com catálogo de projetos, integração ao WhatsApp e formulário de orçamento. Autoridade digital que justifica o alto ticket antes da reunião." },
  { icon: ShoppingBag, title: "Catálogo Digital de Projetos", desc: "Catálogo interativo por linha (cozinha, dormitório, home office) para seus consultores apresentarem em visita ou enviar por WhatsApp — fechando o projeto mais rápido." },
];

function Servicos() {
  const mob = useIsMobile();
  return (
    <section id="servicos" style={{ background: BLACK_SURF, padding: mob ? "64px 20px" : "110px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "32px" : "56px" }}>
            <Label>O Que Entregamos</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,40px)" : "clamp(34px,5vw,52px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Soluções para Quem Vende<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Móveis de Alto Padrão</span>
            </h2>
            <GoldLine width="70px" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fit,minmax(320px,1fr))", gap: mob ? "10px" : "16px" }}>
          {SERVICOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.06}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                  padding: mob ? "18px 16px" : "28px 24px",
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  transition: "border-color 0.28s, background 0.28s",
                  height: "100%",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.background = GOLD_GLOW; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.background = BLACK_CARD; }}>
                  <div style={{ width: "42px", height: "42px", minWidth: "42px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "17px" : "18px", fontWeight: 700, color: WHITE, marginBottom: "7px" }}>{s.title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "13px" : "15px", color: GRAY_L, lineHeight: 1.65 }}>{s.desc}</div>
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

// ─── CASE INFINITE ────────────────────────────────────────────────────────────
function CaseInfinite() {
  const mob = useIsMobile();
  const metricas = [
    { value: "R$1M+",  label: "Lucro operacional" },
    { value: "R$40k",  label: "Invest. mensal Ads" },
    { value: "13",     label: "Consultores ativos" },
    { value: "25x",    label: "ROI documentado"    },
  ];
  return (
    <section id="resultados" style={{ background: BLACK, padding: mob ? "64px 20px" : "110px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "550px", height: "550px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}07,transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "24px" : "44px" }}>
            <Label>Case — Infinite Móveis Modulados</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(26px,7.5vw,38px)" : "clamp(34px,4.5vw,52px)", fontWeight: 700, color: WHITE, margin: "14px 0 0", lineHeight: 1.1 }}>
              De R$0 em digital para<br /><span style={{ color: GOLD, fontStyle: "italic" }}>R$1 Milhão de Lucro</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: mob ? "8px" : "12px", marginBottom: mob ? "14px" : "20px" }}>
            {metricas.map((m, i) => (
              <div key={i} style={{ background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`, padding: mob ? "16px 10px" : "22px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "26px" : "36px", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: mob ? "9px" : "11px", color: GRAY_L, letterSpacing: "0.06em", marginTop: "5px", textTransform: "uppercase" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "10px" : "18px" }}>
          <Reveal>
            <div style={{ border: `1px solid ${GOLD_DIM}`, padding: mob ? "18px 14px" : "24px", background: BLACK_CARD }}>
              <div style={{ fontSize: "10px", color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Cormorant Garamond',serif" }}>O Desafio</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "16px", color: WHITE, lineHeight: 1.7, margin: 0 }}>
                A Infinite vendia móveis modulados para empresas iniciais e emergentes sem nenhuma estrutura digital. Dependia 100% de indicação, sem previsibilidade de receita e com equipe de 13 consultores ociosos.
              </p>
            </div>
          </Reveal>
          <Reveal delay={mob ? 0 : 0.1}>
            <div style={{ border: `1px solid ${GOLD_DIM}`, padding: mob ? "18px 14px" : "24px", background: BLACK_CARD }}>
              <div style={{ fontSize: "10px", color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Cormorant Garamond',serif" }}>A Solução Hawks + Pegasus</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Pegasus mapeou o perfil de empresa com maior taxa de fechamento",
                  "Meta Ads segmentado por CNAE e porte de empresa",
                  "Criativos mostrando ambientes de trabalho transformados",
                  "LP com proposta de valor específica para empresas emergentes",
                  "13 consultores nutridos com leads qualificados todos os dias",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <CheckCircle size={13} color={GOLD} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "13px" : "14px", color: GRAY_L, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div style={{ marginTop: mob ? "12px" : "18px", border: `1px solid ${GOLD_DIM}`, padding: mob ? "18px 14px" : "24px 28px", background: GOLD_GLOW }}>
            <div style={{ display: "flex", gap: "3px", marginBottom: "9px" }}>
              {Array(5).fill(0).map((_, i) => <Star key={i} size={11} fill={GOLD} color={GOLD} />)}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "17px", color: WHITE, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
              "A Hawks entendeu que vender móvel para empresa é diferente de vender para pessoa física. As campanhas foram certeiras — e o Pegasus fez nossos consultores trabalharem com os leads certos."
            </p>
            <div style={{ marginTop: "10px", fontSize: "12px", color: GOLD, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700 }}>
              Equipe Comercial — Infinite Móveis Modulados
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── NÚMEROS ──────────────────────────────────────────────────────────────────
function Numeros() {
  const mob = useIsMobile();
  const stats = [
    { value: "R$1M+",    label: "Lucro gerado no setor moveleiro" },
    { value: "+340%",    label: "Crescimento médio de faturamento" },
    { value: "25x",      label: "ROI documentado — Infinite"       },
    { value: "Pegasus",  label: "Sistema exclusivo de inteligência" },
  ];
  return (
    <section style={{ background: BLACK_SURF, borderTop: `1px solid ${GOLD_DIM}`, borderBottom: `1px solid ${GOLD_DIM}`, padding: mob ? "48px 20px" : "72px 48px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: mob ? "22px 14px" : "28px" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(22px,6.5vw,30px)" : "clamp(32px,3.5vw,46px)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.value}</div>
              <GoldLine width="32px" />
              <div style={{ fontSize: mob ? "9px" : "11px", color: GRAY_L, letterSpacing: "0.07em", marginTop: "8px", textTransform: "uppercase", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── PROVAS SOCIAIS ───────────────────────────────────────────────────────────
// Correção 1: Todos os depoimentos do setor moveleiro/marcenaria
const TESTIMONIALS = [
  { name: "Ricardo Almeida",  role: "Sócio – Almeida Cozinhas Planejadas", tag: "Meta Ads",      text: "Em 4 meses saímos de R$80k para R$340k/mês. A segmentação por CEP e renda que a Hawks montou trouxe leads que já chegam sabendo o ticket. Zero curiosos.", metric: "+325%",  metricLabel: "faturamento"        },
  { name: "Carla Duarte",     role: "Gerente – Duarte Planejados",          tag: "Criativos",     text: "Os vídeos com ambientes reais mudaram tudo. Antes o lead chegava sem referência de preço. Agora chega querendo saber prazo — já sabe que vai comprar.",   metric: "4x",     metricLabel: "taxa de conversão"  },
  { name: "Fábio Monteiro",   role: "Dir. Comercial – Monteiro Marcenaria", tag: "Pegasus",       text: "O sistema deles identificou que nosso melhor lead mora em condomínio de 3 quartos. Antes eu gastava igual para todo mundo. O CPL caiu 52% em 90 dias.",    metric: "52%",    metricLabel: "↓ custo por lead"   },
  { name: "Juliana Ferro",    role: "Fundadora – Ferro Ambientes",          tag: "Landing Page",  text: "A LP focada em 'projeto de home office' converteu desde o primeiro dia. 80 leads em uma semana — com o mesmo investimento que antes gerava 18.",           metric: "80",     metricLabel: "leads/semana"       },
  { name: "Paulo Serrano",    role: "CEO – Serranos Planejados",            tag: "Site+Catálogo", text: "O catálogo digital por linha (cozinha, quarto, home office) fez meus consultores fecharem 30% mais rápido. O lead já vem com a referência de ambiente.", metric: "30%",    metricLabel: "↑ velocidade venda" },
  { name: "Guilherme Rios",   role: "Proprietário – Rios Marcenaria",       tag: "Tráfego Pago",  text: "Trabalhava 100% com indicação. Em 60 dias a Hawks montou uma máquina que gera leads de R$15k+ de ticket. Nunca imaginei que o digital funcionaria assim.", metric: "R$15k+", metricLabel: "ticket médio dos leads" },
];

function ProvasSociais() {
  const mob = useIsMobile();
  return (
    <section id="depoimentos" style={{ background: BLACK, padding: mob ? "64px 20px" : "110px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "28px" : "52px" }}>
            <Label>Marcenarias que Escalaram com a Hawks</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,40px)" : "clamp(34px,5vw,52px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Resultados Reais.<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Setor Moveleiro.</span>
            </h2>
            <GoldLine width="70px" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fit,minmax(320px,1fr))", gap: mob ? "10px" : "16px" }}>
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={i} delay={mob ? 0 : i * 0.06}>
              <div style={{
                background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                padding: mob ? "18px 14px" : "24px",
                height: "100%", display: "flex", flexDirection: "column", gap: "12px",
                transition: "border-color 0.28s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = GOLD_DIM}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array(5).fill(0).map((_, i) => <Star key={i} size={11} fill={GOLD} color={GOLD} />)}
                  </div>
                  <span style={{ fontSize: "10px", color: GOLD, border: `1px solid ${GOLD_DIM}`, padding: "2px 9px", letterSpacing: "0.07em", fontFamily: "'Cormorant Garamond',serif" }}>{item.tag}</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "14px" : "15px", color: WHITE, lineHeight: 1.65, flex: 1, margin: 0 }}>
                  "{item.text}"
                </p>
                <div style={{ borderTop: `1px solid ${GOLD_DIM}`, paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: WHITE }}>{item.name}</div>
                    <div style={{ fontSize: "10px", color: GRAY_L, marginTop: "2px" }}>{item.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{item.metric}</div>
                    <div style={{ fontSize: "9px", color: GRAY_L, letterSpacing: "0.04em", maxWidth: "80px", textAlign: "right" }}>{item.metricLabel}</div>
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

// ─── METODOLOGIA ──────────────────────────────────────────────────────────────
const METODO = [
  { step:"01", icon: Target,    title: "Diagnóstico de Vendas",       desc: "Mapeamos CPL atual, ticket médio, perfil do lead ideal e funil do setor. Encontramos onde o dinheiro está sendo desperdiçado e qual ajuste gera mais faturamento imediato." },
  { step:"02", icon: Database,  title: "Ativação do Pegasus",          desc: "O sistema analisa dados do seu mercado e define segmentação, horários e criativos com maior probabilidade de atrair leads de alto ticket para móveis planejados." },
  { step:"03", icon: Camera,    title: "Produção de Criativos",        desc: "Desenvolvemos vídeos e fotos com ambientes reais do seu showroom. Materiais que elevam percepção de valor antes do primeiro contato do consultor." },
  { step:"04", icon: BarChart3, title: "Lançamento e Escala",          desc: "Campanhas no ar com monitoramento hora a hora. O Pegasus realoca budget automaticamente para os conjuntos que geram os leads de maior ticket." },
];

function MetodologiaHawks() {
  const mob = useIsMobile();
  return (
    <section id="metodologia" style={{ background: BLACK_SURF, padding: mob ? "64px 20px" : "110px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? "32px" : "56px" }}>
            <Label>Como Trabalhamos</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(28px,8vw,40px)" : "clamp(34px,5vw,52px)", fontWeight: 700, color: WHITE, margin: "14px 0 12px", lineHeight: 1.1 }}>
              Da Primeira Reunião ao<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Lead de Alto Ticket</span>
            </h2>
            <GoldLine width="70px" />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: mob ? "10px" : "14px", marginBottom: mob ? "24px" : "40px" }}>
          {METODO.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={mob ? 0 : i * 0.08}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD_DIM}`,
                  padding: mob ? "18px 16px" : "26px",
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  position: "relative", overflow: "hidden",
                  transition: "border-color 0.28s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}55`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = GOLD_DIM}>
                  <div style={{ position: "absolute", top: "4px", right: "12px", fontFamily: "'Cormorant Garamond',serif", fontSize: "48px", fontWeight: 700, color: `${GOLD}0D`, lineHeight: 1, pointerEvents: "none" }}>{item.step}</div>
                  <div style={{ width: "44px", height: "44px", minWidth: "44px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={19} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "17px" : "18px", fontWeight: 700, color: WHITE, marginBottom: "6px" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "13px" : "15px", color: GRAY_L, lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div style={{ border: `1px solid ${GOLD_DIM}`, padding: mob ? "20px 16px" : "36px 40px", background: BLACK_CARD }}>
            <Label>Por que não somos commodity</Label>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "20px" : "26px", fontWeight: 700, color: WHITE, margin: "12px 0 14px", lineHeight: 1.2 }}>
              Gestor de tráfego vende hora.<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Hawks vende resultado no setor moveleiro.</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "9px" : "11px" }}>
              {[
                "Diagnóstico de vendas gratuito na primeira reunião",
                "CPL calculado com base na margem real do seu projeto",
                "Criativos com ambientes planejados reais do seu showroom",
                "Pegasus: inteligência de dados exclusiva — não tem em outra agência",
                "Relatório semanal com CAC, CPL e ROAS por campanha",
                "Experiência em fábrica, showroom, representante e marceneiro",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <CheckCircle size={13} color={GOLD} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "13px" : "14px", color: WHITE, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────
// Correção 5: CTA ativo e específico — "Solicitar Diagnóstico de Vendas"
function CTAFinal() {
  const mob = useIsMobile();
  return (
    <section id="cta" style={{ background: BLACK, padding: mob ? "64px 20px 110px" : "110px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,${GOLD}0C,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <img src={logoSrc} alt="Hawks" style={{ height: mob ? "42px" : "52px", objectFit: "contain", marginBottom: mob ? "22px" : "32px" }} />
          <Label>Próximo Passo</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "clamp(30px,8.5vw,46px)" : "clamp(38px,5.5vw,64px)", fontWeight: 700, color: WHITE, margin: "14px 0 0", lineHeight: 1.05 }}>
            Solicite Agora seu<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Diagnóstico de Vendas</span>
          </h2>
          <div style={{ width: "64px", height: "1px", background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, margin: mob ? "18px auto" : "24px auto" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mob ? "15px" : "18px", color: GRAY_L, lineHeight: 1.7, marginBottom: mob ? "26px" : "38px" }}>
            Em 60 minutos analisamos seu CPL atual, seu ticket médio e sua operação. Você sai com um plano claro de como aumentar o faturamento da sua marcenaria ou showroom com inteligência de dados e Meta Ads de alto ticket.
          </p>
          <GoldButton large fullWidth={mob} onClick={() => window.open(WA_URL, "_blank")}>
            Solicitar Diagnóstico de Vendas
          </GoldButton>
          <div style={{ marginTop: "14px", fontSize: "11px", color: GRAY, letterSpacing: "0.06em" }}>
            Gratuito • Sem compromisso • Exclusivo para o setor moveleiro
          </div>

          {/* Segunda opção de CTA */}
          <div style={{ marginTop: mob ? "16px" : "20px" }}>
            <OutlineButton fullWidth={mob} onClick={() => document.getElementById("pegasus")?.scrollIntoView({ behavior: "smooth" })}>
              Conhecer o Sistema Pegasus
            </OutlineButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const mob = useIsMobile();
  return (
    <footer style={{ background: BLACK_SURF, borderTop: `1px solid ${GOLD_DIM}`, padding: mob ? "40px 20px 88px" : "52px 48px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {mob ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            <div>
              <img src={logoSrc} alt="Hawks" style={{ height: "38px", objectFit: "contain", marginBottom: "10px" }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "13px", color: GRAY_L, lineHeight: 1.7, margin: 0 }}>
                Especialistas em crescimento para marcenarias e indústria moveleira — Meta Ads, Pegasus e criativos de alto padrão.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                {[Instagram, MessageCircle, Phone].map((Icon, i) => (
                  <div key={i} style={{ width: "44px", height: "44px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color={GOLD} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: WHITE, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Cormorant Garamond',serif" }}>Soluções</div>
                {["Meta Ads Alto Ticket","Pegasus — IA","Criativos","Landing Pages","Sites","Catálogo Digital"].map(item => (
                  <div key={item} style={{ fontSize: "12px", color: GRAY_L, marginBottom: "7px", fontFamily: "'Cormorant Garamond',serif" }}>{item}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: WHITE, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Cormorant Garamond',serif" }}>Contato</div>
                {[[Mail,"contato@hawksdigital.com.br"],[Phone,"(11) 99999-0000"],[Instagram,"@hawksassessoria"]].map(([Icon,text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "7px", marginBottom: "8px" }}>
                    <Icon size={11} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", color: GRAY_L, fontFamily: "'Cormorant Garamond',serif", wordBreak: "break-all" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "32px" }}>
            <div>
              <img src={logoSrc} alt="Hawks" style={{ height: "44px", objectFit: "contain", marginBottom: "12px" }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", color: GRAY_L, lineHeight: 1.7, maxWidth: "280px" }}>
                Especialistas em crescimento para marcenarias e indústria moveleira — Meta Ads, Pegasus e criativos de alto padrão.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {[Instagram, MessageCircle, Phone].map((Icon, i) => (
                  <div key={i} style={{ width: "38px", height: "38px", border: `1px solid ${GOLD_DIM}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = GOLD_GLOW; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.background = "transparent"; }}>
                    <Icon size={13} color={GOLD} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: WHITE, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "'Cormorant Garamond',serif" }}>Soluções</div>
              {["Meta Ads Alto Ticket","Pegasus — IA Exclusiva","Criativos em Vídeo","Criativos em Foto","Landing Pages","Sites","Catálogo Digital"].map(item => (
                <div key={item} style={{ fontSize: "12px", color: GRAY_L, marginBottom: "7px", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Cormorant Garamond',serif" }}
                  onMouseEnter={e => e.target.style.color = WHITE}
                  onMouseLeave={e => e.target.style.color = GRAY_L}>{item}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: WHITE, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "'Cormorant Garamond',serif" }}>Contato</div>
              {[[Mail,"contato@hawksdigital.com.br"],[Phone,"+55 (11) 99999-0000"],[Instagram,"@hawksassessoria"]].map(([Icon,text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "9px" }}>
                  <Icon size={11} color={GOLD} />
                  <span style={{ fontSize: "12px", color: GRAY_L, fontFamily: "'Cormorant Garamond',serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ borderTop: `1px solid ${GOLD_DIM}`, paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginTop: mob ? "20px" : "0" }}>
          <span style={{ fontSize: "11px", color: GRAY }}>© 2025 Hawks Assessoria Digital. Todos os direitos reservados.</span>
          <span style={{ fontSize: "11px", color: `${GOLD}66` }}>Pegasus — Tecnologia Exclusiva Hawks</span>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WA ──────────────────────────────────────────────────────────────
function FloatingWA() {
  const mob = useIsMobile();
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2000); return () => clearTimeout(t); }, []);
  if (!mob) return null;
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: "86px", right: "18px", zIndex: 300,
        width: "52px", height: "52px", borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 18px rgba(37,211,102,.5)",
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.4)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        textDecoration: "none",
      }}>
      <MessageCircle size={22} fill="white" color="white" />
    </a>
  );
}

// ─── STICKY CTA ───────────────────────────────────────────────────────────────
function StickyCTA() {
  const mob = useIsMobile();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!mob) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 299,
      padding: "10px 18px",
      background: `${BLACK}F0`, borderTop: `1px solid ${GOLD_DIM}`,
      backdropFilter: "blur(14px)",
      transform: show ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <GoldButton fullWidth large onClick={() => window.open(WA_URL, "_blank")}>
        Solicitar Diagnóstico de Vendas
      </GoldButton>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function HawksLanding() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap";
    document.head.appendChild(link);
    document.body.style.cssText = "margin:0;padding:0;background:#080808;overflow-x:hidden";
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond',serif", background: "#080808", color: "#FAFAFA", margin: 0, padding: 0, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <AutoridadeNicho />
      <Pegasus />
      <Servicos />
      <CaseInfinite />
      <Numeros />
      <ProvasSociais />
      <MetodologiaHawks />
      <CTAFinal />
      <Footer />
      <FloatingWA />
      <StickyCTA />
    </div>
  );
}
