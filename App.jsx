import logoSrc from "./assets/logo.png";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ChevronDown, Star, TrendingUp, Target, Zap,
  BarChart3, CheckCircle, Phone, Mail, Instagram, MessageCircle,
  Video, Camera, Globe, ShoppingBag, Layout, Users, Award
} from "lucide-react";

// ─── Logo (real PNG base64) ───────────────────────────────────────────────────

// ─── Design Tokens ────────────────────────────────────────────────────────────
const GOLD = "#B8973E";
const GOLD_LIGHT = "#D4AF6A";
const BLACK = "#0A0A0A";
const BLACK_CARD = "#111111";
const BLACK_SURFACE = "#161616";
const WHITE = "#F5F3EE";
const GRAY = "#888880";

// ─── Hook: scroll reveal ──────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function GoldLine({ width = "60px" }) {
  return <div style={{ width, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "0 auto" }} />;
}

function Label({ children }) {
  return (
    <span style={{
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "0.32em", fontSize: "11px",
      color: GOLD, textTransform: "uppercase", fontWeight: 600
    }}>{children}</span>
  );
}

function GoldButton({ children, onClick, large = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? GOLD_LIGHT : GOLD, color: BLACK, border: "none",
        padding: large ? "18px 48px" : "14px 36px",
        fontSize: large ? "15px" : "13px", fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        fontFamily: "'Cormorant Garamond', serif",
        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 8px 32px ${GOLD}44` : "none",
      }}>
      {children}<ArrowRight size={16} />
    </button>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? `${BLACK}EE` : "transparent",
      borderBottom: scrolled ? `1px solid ${GOLD}22` : "none",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      padding: "18px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease",
    }}>
      <img src={logoSrc} alt="Hawks Assessoria Digital" style={{ height: "48px", objectFit: "contain" }} />
      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {["Serviços", "Resultados", "Metodologia", "Contato"].map(item => (
          <span key={item} style={{
            color: GRAY, fontSize: "13px", letterSpacing: "0.1em", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, transition: "color 0.2s"
          }}
            onMouseEnter={e => e.target.style.color = GOLD}
            onMouseLeave={e => e.target.style.color = GRAY}>
            {item}
          </span>
        ))}
        <button style={{
          border: `1px solid ${GOLD}`, background: "transparent", color: GOLD,
          padding: "10px 24px", fontSize: "12px", letterSpacing: "0.12em",
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
        }}
          onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BLACK; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>
          FALAR COM ESPECIALISTA
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", background: BLACK,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "120px 24px 80px", textAlign: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={GOLD} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div style={{ position: "absolute", top: "20%", left: "8%", width: "320px", height: "320px", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}18, transparent 70%)`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "8%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}0C, transparent 70%)`, filter: "blur(80px)" }} />
      </div>

      <Reveal delay={0}><Label>Hawks Assessoria Digital — Especialistas em Negócios Locais</Label></Reveal>

      <Reveal delay={0.15}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, color: WHITE,
          lineHeight: 1.05, margin: "32px 0 0", maxWidth: "940px",
        }}>
          Leads Todos os Dias.<br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>Faturamento</span> que<br />
          Não Para de Crescer.
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "32px auto" }} />
      </Reveal>

      <Reveal delay={0.4}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 2.5vw, 24px)", color: GRAY,
          maxWidth: "660px", lineHeight: 1.65, margin: "0 auto 48px", fontWeight: 400,
        }}>
          Somos especialistas em escalar negócios locais. Geramos leads qualificados todos os dias para aumentar seu faturamento e posicionar sua marca no mercado através de estratégias digitais de alta performance.
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <GoldButton large onClick={() => {}}>Quero Gerar Leads Todos os Dias</GoldButton>
      </Reveal>

      <Reveal delay={0.65}>
        <div style={{ display: "flex", gap: "48px", marginTop: "80px", flexWrap: "wrap", justifyContent: "center" }}>
          {[["500+", "Negócios locais escalados"], ["+340%", "Crescimento médio de faturamento"], ["Leads Diários", "Fluxo constante de clientes novos"]].map(([num, label]) => (
            <div key={num} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 700, color: GOLD }}>{num}</div>
              <div style={{ fontSize: "12px", color: GRAY, letterSpacing: "0.08em", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <ChevronDown size={20} color={GOLD} style={{ opacity: 0.6 }} />
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}`}</style>
    </section>
  );
}

// ─── SERVIÇOS ─────────────────────────────────────────────────────────────────
const servicos = [
  { icon: BarChart3, title: "Tráfego Pago — Meta Ads", desc: "Campanhas cirúrgicas no Meta Ads que entregam leads novos todos os dias para o seu negócio local. Funil completo com controle de custo por lead e ROAS positivo desde o início." },
  { icon: Video, title: "Criativos em Vídeo", desc: "Produção de vídeos que capturam atenção em segundos e geram clique. Conteúdo que posiciona sua marca localmente e converte no feed, stories e reels — todos os dias." },
  { icon: Camera, title: "Criativos em Foto", desc: "Fotos profissionais e artes gráficas que fortalecem o posicionamento da sua marca no mercado local. Cada peça é criada com base em dados reais de conversão." },
  { icon: Layout, title: "Landing Pages", desc: "LPs de alta conversão que transformam visitantes em leads quentes — todos os dias. Copy persuasiva, design premium e estrutura otimizada para o seu negócio local capturar clientes novos." },
  { icon: Globe, title: "Site Completo de Vendas", desc: "Sites profissionais com integração ao WhatsApp, formulários de captura e estrutura pensada para posicionar sua marca e converter visitantes em leads qualificados 24h por dia." },
  { icon: ShoppingBag, title: "Catálogo Digital", desc: "Apresente seus produtos ou serviços com um catálogo digital profissional. Sua equipe de vendas fecha mais rápido e sua marca se posiciona com autoridade no mercado local." },
];

function Servicos() {
  return (
    <section style={{ background: BLACK_SURFACE, padding: "120px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label>Nossas Soluções</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "20px 0 16px", lineHeight: 1.1 }}>
              Estratégias que<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Geram Leads Todo Dia</span>
            </h2>
            <GoldLine width="80px" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: GRAY, marginTop: "20px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
              Cada solução é pensada para gerar leads qualificados, aumentar seu faturamento e posicionar sua marca no mercado local
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          {servicos.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD}22`,
                  padding: "36px 32px", height: "100%",
                  transition: "all 0.3s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.background = `${GOLD}07`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}22`; e.currentTarget.style.background = BLACK_CARD; }}>
                  <div style={{ width: "48px", height: "48px", border: `1px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <Icon size={22} color={GOLD} />
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: WHITE, marginBottom: "12px" }}>{s.title}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: GRAY, lineHeight: 1.7 }}>{s.desc}</div>
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
  const metricas = [
    { value: "R$ 1M+", label: "Lucro gerado" },
    { value: "R$ 40k", label: "Investimento mensal" },
    { value: "13", label: "Vendedores na operação" },
    { value: "25x", label: "Retorno sobre investimento" },
  ];
  return (
    <section style={{ background: BLACK, padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}08, transparent 65%)` }} />
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label>Case Real — Infinite Móveis</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "20px 0 0", lineHeight: 1.1 }}>
              Como a <span style={{ color: GOLD, fontStyle: "italic" }}>Infinite</span> saiu do zero<br />para R$ 1 Milhão de lucro
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ border: `1px solid ${GOLD}33`, padding: "32px", background: BLACK_CARD, marginBottom: "24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>O Desafio</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: WHITE, lineHeight: 1.7 }}>
                  A Infinite precisava gerar leads todos os dias para alimentar sua equipe comercial e escalar o faturamento — sem depender de indicação ou porta a porta. Um negócio local com grande potencial, mas sem presença digital.
                </p>
              </div>
              <div style={{ border: `1px solid ${GOLD}33`, padding: "32px", background: BLACK_CARD }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>A Solução Hawks</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    "Meta Ads com foco em geração de leads qualificados diariamente",
                    "Criativos em foto e vídeo que posicionaram a marca localmente",
                    "Landing page de alta conversão transformando tráfego em leads quentes",
                    "13 vendedores nutridos com leads novos todos os dias",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle size={16} color={GOLD} style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GRAY, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                {metricas.map((m, i) => (
                  <div key={i} style={{ background: BLACK_CARD, border: `1px solid ${GOLD}33`, padding: "28px 24px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3vw,40px)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{m.value}</div>
                    <div style={{ fontSize: "12px", color: GRAY, letterSpacing: "0.08em", marginTop: "8px", textTransform: "uppercase" }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ border: `1px solid ${GOLD}22`, padding: "28px 32px", background: `${GOLD}0A` }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill={GOLD} color={GOLD} />)}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: WHITE, lineHeight: 1.65, fontStyle: "italic" }}>
                  "A Hawks resolveu nosso maior problema: a falta de leads novos todo dia. Em poucos meses, nossa equipe comercial estava trabalhando no limite. Resultado real, não promessa."
                </p>
                <div style={{ marginTop: "16px", fontSize: "13px", color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                  Equipe Infinite — Móveis Modulados
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── PROVAS SOCIAIS ───────────────────────────────────────────────────────────
const testimonials = [
  { name: "Ricardo Almeida", role: "CEO – Móveis Almeida", tag: "Tráfego Pago", text: "Em 4 meses, saímos de R$80k para R$340k/mês. Os leads chegavam todo dia — minha equipe nunca ficou parada esperando cliente. Isso muda tudo num negócio local.", metric: "+325%", metricLabel: "faturamento" },
  { name: "Carla Duarte", role: "Sócia – Duarte Home Office", tag: "Criativos", text: "Os criativos deles mudaram como o mercado nos enxerga. Não somos mais só mais um negócio local — somos referência. E os leads que chegam já sabem quem somos.", metric: "4x", metricLabel: "conversão" },
  { name: "Fábio Monteiro", role: "Dir. Comercial – Monteiro Design", tag: "Meta Ads", text: "Antes dependíamos de indicação. Hoje temos leads novos chegando todo dia pelo Meta Ads. Em 90 dias o custo por lead caiu pela metade e o volume dobrou.", metric: "6.4x", metricLabel: "ROAS" },
  { name: "Juliana Ferro", role: "Fundadora – Ferro & Espaço", tag: "Landing Page", text: "A landing page deles converteu desde o primeiro dia de campanha. Chegamos a gerar 80 leads qualificados por semana com o mesmo investimento de antes.", metric: "R$1.8M", metricLabel: "em 12 meses" },
  { name: "Paulo Serrano", role: "CEO – Serranos Modulados", tag: "Site + Catálogo", text: "Com o site profissional e o catálogo digital, nossa marca ganhou autoridade no mercado local. Os leads que chegam já chegam prontos — o ciclo de venda caiu mais de 70%.", metric: "73%", metricLabel: "redução no ciclo de venda" },
  { name: "Ana Becker", role: "Proprietária – Becker Estética", tag: "Tráfego Pago", text: "Meu negócio local precisava de clientes novos todo dia, não só nas datas comemorativas. A Hawks montou uma máquina de leads que funciona de segunda a domingo.", metric: "R$600k", metricLabel: "receita incremental" },
];

function TestimonialCard({ item, delay }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: BLACK_CARD, border: `1px solid ${GOLD}28`, padding: "32px",
        height: "100%", display: "flex", flexDirection: "column", gap: "20px",
        transition: "border-color 0.3s",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}66`}
        onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}28`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {Array(5).fill(0).map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}
          </div>
          <span style={{ fontSize: "11px", color: GOLD, border: `1px solid ${GOLD}44`, padding: "2px 10px", letterSpacing: "0.08em" }}>{item.tag}</span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: WHITE, lineHeight: 1.65, fontWeight: 400, flex: 1 }}>
          "{item.text}"
        </p>
        <div style={{ borderTop: `1px solid ${GOLD}20`, paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: WHITE }}>{item.name}</div>
            <div style={{ fontSize: "12px", color: GRAY, marginTop: "2px" }}>{item.role}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{item.metric}</div>
            <div style={{ fontSize: "11px", color: GRAY, letterSpacing: "0.06em" }}>{item.metricLabel}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProvasSociais() {
  return (
    <section style={{ background: BLACK_SURFACE, padding: "120px 48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label>Negócios Locais que Escalaram</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "20px 0 16px", lineHeight: 1.1 }}>
              Leads Reais.<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Negócios que Cresceram</span>
            </h2>
            <GoldLine width="80px" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          {testimonials.map((item, i) => <TestimonialCard key={i} item={item} delay={i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}

// ─── NÚMEROS ──────────────────────────────────────────────────────────────────
function Numeros() {
  const stats = [
    { value: "500+", label: "Negócios locais escalados" },
    { value: "+340%", label: "Crescimento médio de faturamento" },
    { value: "Diário", label: "Fluxo de leads para seus clientes" },
    { value: "3 Pilares", label: "Leads • Marca • Conversão" },
  ];
  return (
    <section style={{ background: BLACK, borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22`, padding: "72px 48px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "48px" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.value}</div>
              <GoldLine width="40px" />
              <div style={{ fontSize: "13px", color: GRAY, letterSpacing: "0.08em", marginTop: "12px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── METODOLOGIA HAWKS ────────────────────────────────────────────────────────
const metodologia = [
  { step: "01", icon: Target, title: "Diagnóstico Estratégico", desc: "Mapeamos seu negócio local: faturamento, posicionamento, custo por lead e ticket médio. Identificamos os gargalos que impedem você de receber mais clientes novos todo dia." },
  { step: "02", icon: Camera, title: "Produção de Criativos", desc: "Desenvolvemos vídeos e fotos estratégicos que posicionam sua marca localmente e geram clique. Conteúdo criado para converter — não apenas para aparecer." },
  { step: "03", icon: BarChart3, title: "Ativação de Leads Diários", desc: "Ligamos a máquina de leads: campanhas no Meta Ads com funil completo que entregam contatos qualificados todos os dias — com custo por lead controlado e escalável." },
  { step: "04", icon: Globe, title: "Sites e LPs que Convertem", desc: "Desenvolvemos LPs e sites que transformam o tráfego pago em leads quentes. Cada página é construída para capturar o visitante e entregá-lo pronto para sua equipe fechar." },
];

function MetodologiaHawks() {
  return (
    <section style={{ background: BLACK, padding: "120px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <Label>Nossa Metodologia</Label>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: WHITE, margin: "20px 0 16px", lineHeight: 1.1 }}>
              Como Geramos<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Leads Todos os Dias</span>
            </h2>
            <GoldLine width="80px" />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: GRAY, marginTop: "20px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
              Não somos uma agência genérica. Somos especialistas em escalar negócios locais — gerando leads qualificados todos os dias e posicionando sua marca no mercado digital.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {metodologia.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  background: BLACK_CARD, border: `1px solid ${GOLD}22`,
                  padding: "40px 32px", position: "relative",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}22`; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "72px", fontWeight: 700, color: `${GOLD}12`, lineHeight: 1, position: "absolute", top: "16px", right: "20px" }}>{item.step}</div>
                  <Icon size={24} color={GOLD} style={{ marginBottom: "20px" }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: WHITE, marginBottom: "12px" }}>{item.title}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GRAY, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: "64px", border: `1px solid ${GOLD}33`, padding: "48px", background: BLACK_CARD, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <Label>Por que somos diferentes</Label>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 700, color: WHITE, margin: "16px 0 20px", lineHeight: 1.2 }}>
                100% Focados em<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Escalar Negócios Locais</span>
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: GRAY, lineHeight: 1.7 }}>
                Entendemos o que todo negócio local precisa: clientes novos chegando todo dia. Nossa metodologia combina tráfego pago, criativos de posicionamento e sites de alta conversão para gerar leads qualificados de forma consistente.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Diagnóstico gratuito na primeira reunião",
                "Leads qualificados chegando todo dia",
                "Criativos que posicionam sua marca localmente",
                "Relatório de performance semanal e transparente",
                "Sites e LPs que convertem tráfego em clientes",
                "Resultados documentados e 100% mensuráveis",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle size={15} color={GOLD} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: WHITE }}>{item}</span>
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
function CTAFinal() {
  return (
    <section style={{ background: BLACK_SURFACE, padding: "120px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}10, transparent 70%)` }} />
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        <Reveal>
          <img src={logoSrc} alt="Hawks" style={{ height: "64px", objectFit: "contain", marginBottom: "40px" }} />
          <Label>Próximo Passo</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, color: WHITE, margin: "24px 0 0", lineHeight: 1.05 }}>
            Pronto Para Receber<br /><span style={{ color: GOLD, fontStyle: "italic" }}>Leads Todos os Dias</span>?
          </h2>
          <div style={{ width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "32px auto" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: GRAY, lineHeight: 1.65, marginBottom: "48px" }}>
            Agende um diagnóstico gratuito. Em 60 minutos, você terá um mapa claro de como gerar leads qualificados todos os dias, aumentar seu faturamento e posicionar sua marca no mercado local de forma consistente.
          </p>
          <GoldButton large onClick={() => {}}>Quero Gerar Leads Todos os Dias</GoldButton>
          <div style={{ marginTop: "24px", fontSize: "13px", color: GRAY }}>Diagnóstico gratuito • Sem compromisso • Resposta em até 24h</div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: BLACK, borderTop: `1px solid ${GOLD}22`, padding: "60px 48px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "64px", marginBottom: "48px" }}>
          <div>
            <img src={logoSrc} alt="Hawks Assessoria Digital" style={{ height: "52px", objectFit: "contain", marginBottom: "20px" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: GRAY, lineHeight: 1.7, maxWidth: "320px" }}>
              Cada solução é pensada para gerar leads qualificados, aumentar seu faturamento e posicionar sua marca no mercado local corporativos.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {[Instagram, MessageCircle, Phone].map((Icon, i) => (
                <div key={i} style={{ width: "40px", height: "40px", border: `1px solid ${GOLD}33`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `${GOLD}11`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${GOLD}33`; e.currentTarget.style.background = "transparent"; }}>
                  <Icon size={15} color={GOLD} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>Serviços</div>
            {["Meta Ads", "Criativos em Vídeo", "Criativos em Foto", "Landing Pages", "Sites de Vendas", "Catálogo Digital"].map(item => (
              <div key={item} style={{ fontSize: "14px", color: GRAY, marginBottom: "10px", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Cormorant Garamond', serif" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = GRAY}>{item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: 600, color: WHITE, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>Contato</div>
            {[[Mail, "contato@hawksdigital.com.br"], [Phone, "+55 (11) 99999-0000"], [Instagram, "@hawksassessoria"]].map(([Icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <Icon size={13} color={GOLD} /><span style={{ fontSize: "14px", color: GRAY, fontFamily: "'Cormorant Garamond', serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${GOLD}18`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: GRAY }}>© 2025 Hawks Assessoria Digital. Todos os direitos reservados.</span>
          <span style={{ fontSize: "13px", color: `${GOLD}88` }}>Especialistas em Escalar Negócios Locais</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function HawksLanding() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#0A0A0A";
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#0A0A0A", color: "#F5F3EE", margin: 0, padding: 0 }}>
      <Nav />
      <Hero />
      <Servicos />
      <CaseInfinite />
      <Numeros />
      <ProvasSociais />
      <MetodologiaHawks />
      <CTAFinal />
      <Footer />
    </div>
  );
}