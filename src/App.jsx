import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, animate, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport, EASE } from './motion'
import logoSvg from './logo_zen_cw.svg'
import svcShield from './assets/svc-shield.svg'
import svcAgent from './assets/svc-agent.svg'
import svcCloud from './assets/svc-cloud.svg'
import svcData from './assets/svc-data.svg'
import featCube from './assets/feat-cube.svg'
import featCycle from './assets/feat-cycle.svg'
import featShield from './assets/feat-shield.svg'
import featCloud from './assets/feat-cloud.svg'

/* ===================== primitives ===================== */

function Reveal({ children, variants = fadeUp, className, as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </M>
  )
}

function Group({ children, className, gap = 0.08, as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </M>
  )
}

function Counter({ to, suffix = '', decimals = 0, prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: v => setVal(v) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/* ===================== icons ===================== */

const I = {
  bolt: p => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>,
  arrow: p => <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M2 2h10v10M2 12L12 2" /></svg>,
  arrowRight: p => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  shield: p => <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>,
  agent: p => <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><rect x="5" y="7" width="14" height="11" rx="2" /><path d="M12 7V4M9 12h.01M15 12h.01M9 21h6" /></svg>,
  cloud: p => <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 17 18H7Z" /></svg>,
  data: p => <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>,
  cube: p => <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" /><path d="m3 7 9 5 9-5M12 12v10" /></svg>,
  eye: p => <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
  cycle: p => <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" /></svg>,
  q: p => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17h.01" /></svg>,
  star: (filled) => <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? '#060606' : 'rgba(6,6,6,0.15)'}><path d="M7 1l1.5 4.5H14L9.5 8.5 11 13 7 10.5 3 13l1.5-4.5L0 5.5h5.5z" /></svg>,
  plus: p => (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <line x1="6" y1="0" x2="6" y2="12" />
      <line x1="0" y1="6" x2="12" y2="6" />
    </svg>
  ),
}

/* //// section label */
function SectionLabel({ children, light = false }) {
  return (
    <div className="section-label">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        {[0, 5, 10, 15].map((x, i) => (
          <line key={i} x1={x} y1="14" x2={x + 5} y2="0" stroke={light ? '#060606' : '#ffffff'} strokeWidth="1.5" opacity={0.5 + i * 0.12} />
        ))}
      </svg>
      <span>{children}</span>
    </div>
  )
}

/* CTA button with icon box */
function CTAButton({ href, children, dark = false, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`btn-cta${dark ? ' btn-cta--dark' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="btn-cta__icon">
        <I.arrow />
      </span>
      <span className="btn-cta__label">{children}</span>
    </motion.a>
  )
}

/* Scroll-driven word reveal */
function RevealWord({ children, progress, threshold }) {
  const [active, setActive] = useState(false)
  useMotionValueEvent(progress, 'change', v => {
    const on = v >= threshold
    setActive(prev => (prev === on ? prev : on))
  })
  return (
    <motion.span
      className="reveal-word"
      animate={active ? 'on' : 'off'}
      variants={{
        off: { opacity: 0.35, y: 0 },
        on: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

function ScrollReveal({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <RevealWord key={i} progress={scrollYProgress} threshold={(i + 1) / (words.length + 1)}>
          {word}
        </RevealWord>
      ))}
    </p>
  )
}

/* ===================== NAV ===================== */

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = ['Home', 'Pricing', 'Projects', 'Articles']
  return (
    <motion.header
      className={'nav' + (scrolled ? ' nav--scrolled' : '')}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="nav__inner container">
        <a href="#home" className="brand"><img src={logoSvg} alt="aizzentec" className="brand__logo" /></a>
        <nav className="nav__links">
          {links.map(l => <a key={l} href={'#' + l.toLowerCase()}>{l}</a>)}
        </nav>
        <div className="nav__right">
          <CTAButton href="#cta">Book A Call</CTAButton>
        </div>
      </div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-start px-8"
            style={{ background: '#060606' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {['Home', 'Pricing', 'About', 'Projects', 'Articles', 'Contact Us'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#fff',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  width: '100%',
                  fontFamily: 'var(--font)',
                  fontSize: 'clamp(28px, 5vw, 42px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ===================== HERO ===================== */

function ServiceTicker() {
  const items = ['Threat Strategy', 'Defense Agents', 'Attack Simulation', 'Security Intelligence', 'Cloud Hardening', 'Incident Response']
  const doubled = [...items, ...items]
  return (
    <div className="ticker">
      <div className="ticker__track">
        {doubled.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const cats = ['Threat Strategy', 'Defense Agents', 'Attack Simulation', 'Security Intelligence']
  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero__grid" style={{ y: gridY }} />
      <div className="hero__vignette" />
      <div className="hero__glow" />
      <div className="container hero__inner">
        <Group className="hero__left" gap={0.1}>
          <Reveal>
            <ServiceTicker />
          </Reveal>
          <Reveal as="h1" className="hero__title">Secure your future with AI</Reveal>
          <Reveal as="p" className="hero__sub">
            Deploy autonomous defense agents and neutralize threats in real time. Fortify your enterprise with Aizzentec today.
          </Reveal>
          <Reveal className="hero__cta">
            <CTAButton href="#cta">Get a assessment</CTAButton>
          </Reveal>
        </Group>
        <Group className="hero__right" gap={0.09}>
          <div className="hero__cats">
            {cats.map(c => <Reveal as="span" key={c}>{c}</Reveal>)}
          </div>
          <Reveal className="hero__clients">
            <span className="client">UnitedHealthcare</span>
            <span className="client">aetna</span>
          </Reveal>
        </Group>
      </div>
    </section>
  )
}

/* ===================== SERVICES ===================== */

function Services() {
  const cards = [
    [svcShield, 'Disaster Recovery', 'We build resilient recovery frameworks that safeguard operations, reduce downtime, and enable rapid restoration of critical business systems.'],
    [svcAgent, 'Business Continuity', 'Keep critical operations running with proactive continuity strategies that minimize disruption and strengthen organizational resilience.'],
    [svcCloud, 'Data Protection', 'Secure and scalable backup solutions that safeguard critical data, ensure rapid restoration, and keep business operations running without interruption.'],
    [svcData, 'Resilience Engineering', 'Transform incident insights into stronger defenses with continuous improvement strategies that enhance resilience and reduce future risks.'],
  ]
  const stats = [
    ['12', 'ms', 'Average latency for real-time threat detection.'],
    ['10', 'x', 'Increase in incident response speed.'],
    ['99', '%', 'Uptime for critical defense infrastructure.'],
  ]
  return (
    <section className="section section--dark" id="services">
      <div className="container">
        <ScrollReveal
          className="services__intro"
          text="Recover from breaches faster. Protect critical data with precision. Build resilience into every layer of your infrastructure. Restore systems, confidence, and continuity in the shortest possible time."
        />
        <Reveal as="p" className="services__sub">
          Unlock the full potential of autonomous defense workflows. Our infrastructure ensures low latency and high-fidelity detection for every event.
        </Reveal>

        <Group className="services__grid" gap={0.07}>
          {cards.map(([icon, t, d]) => (
            <Reveal className="svc" key={t} variants={scaleIn}>
              <div className="svc__illust">
                <img src={icon} alt={t} />
              </div>
              <div className="svc__text">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </Group>

        {/* Stats row with counters */}
        <Reveal className="stats-row" variants={scaleIn}>
          {stats.map(([v, s, label]) => (
            <div className="stat-cell" key={label}>
              <div className="stat-cell__corner" />
              <span className="stat-cell__value">
                <Counter to={parseFloat(v)} suffix={s} decimals={0} />
              </span>
              <p className="stat-cell__label">{label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="glowstrip" variants={scaleIn}>
          <span className="badge"><I.bolt width="14" height="14" /> 2 Minutes Watch</span>
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== CASE STUDIES ===================== */

function Cases() {
  const rows = [
    ['Cigna', '//2026', 'Cigna Zero-Trust Health Systems', 'Revolutionizing patient data protection through predictive threat analytics and seamless security integration tools.'],
    ['aetna', '//2026', 'Aetna Secure Data Ecosystem', 'We hardened Aetna\u2019s member data infrastructure using autonomous AI to detect breaches and deliver continuous compliance.'],
    ['Anthem', '//2026', 'Anthem Defense Care Network', 'We deployed a custom engine to automate Anthem\u2019s threat response, reducing breach dwell time by eighty-five percent.'],
  ]
  return (
    <section className="section section--light on-light" id="projects">
      <div className="container">
        <Group className="section__head">
          <Reveal><SectionLabel light>Case Studies</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Proven security solutions</Reveal>
          <Reveal as="p" className="lead">We partner with industry leaders to deploy bespoke defense agents that neutralize complex threats and drive measurable resilience.</Reveal>
        </Group>
        <Group className="cases__list" gap={0.08}>
          {rows.map(([client, year, t, d]) => (
            <Reveal className="case-row" key={t}>
              <div className="case-row__client">{client}</div>
              <div className="case-row__year">{year}</div>
              <div className="case-row__body"><h3>{t}</h3><p>{d}</p></div>
              <div className="case-row__arrow"><I.arrowRight /></div>
            </Reveal>
          ))}
        </Group>
        <Reveal className="cases__foot">
          <CTAButton href="#projects" dark>More Projects</CTAButton>
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== PRODUCT (canvas) ===================== */

function Product() {
  const nodes = [
    ['Threat Trigger', '14%', '20%'],
    ['Defense Agent', '40%', '14%'],
    ['Scan Agent', '64%', '20%'],
    ['Enrich Fields', '24%', '58%'],
    ['Send Alert', '52%', '64%'],
    ['SOC Notify', '76%', '58%'],
  ]
  const feats = [
    [featCube, 'Infinite Visual Canvas', 'Map out multi-step defense playbooks on a high-precision grid. Drag and drop triggers, logic gates, and actions to craft custom response paths.'],
    [featCycle, 'Autonomous Execution', 'Run complex response trees without manual intervention. Our engine handles conditional branching and threat containment automatically.'],
    [featShield, 'End-to-End Encryption', 'Every node and data transfer is shielded by industrial-grade security. Maintain total control over your organizational data flow.'],
    [featCloud, 'Production-Ready Stack', 'Connect core security platforms and internal services through secure, ready integrations that scale with your volume.'],
  ]
  return (
    <section className="section section--dark" id="product">
      <div className="container">
        <Group className="section__head">
          <Reveal><SectionLabel>Our Product</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Build defense at scale</Reveal>
          <Reveal as="p" className="lead">Design, deploy, and manage sophisticated security workflows through an intuitive visual interface. No complex coding\u2014just pure defense.</Reveal>
        </Group>
        <Reveal className="product__canvas" variants={scaleIn}>
          {nodes.map(([t, left, top], i) => (
            <motion.div
              key={t} className="node" style={{ left, top }}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: EASE }}
            >
              <span className="dot"><I.bolt width="12" height="12" /></span>
              <span>{t}<small>1 item</small></span>
            </motion.div>
          ))}
        </Reveal>
        <Group className="product__feats" gap={0.07}>
          {feats.map(([icon, t, d]) => (
            <Reveal className="pfeat" key={t} variants={scaleIn}>
              <div className="pfeat__icon">
                <img src={icon} alt={t} />
              </div>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </Group>
      </div>
    </section>
  )
}

/* ===================== STATISTICS (dashboard) ===================== */

function Gauge({ value = 345 }) {
  return (
    <svg className="gauge" width="150" height="100" viewBox="0 0 150 100">
      <path d="M15 90 A60 60 0 0 1 135 90" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="4" />
      <motion.path d="M15 90 A60 60 0 0 1 135 90" fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.62 }} viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE }} />
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4ade80" /><stop offset="1" stopColor="#22c55e" /></linearGradient></defs>
      <text x="75" y="78" textAnchor="middle" fill="#fff" fontFamily="var(--font)" fontSize="28" fontWeight="400" letterSpacing="-0.03em">{value}</text>
    </svg>
  )
}

function Spark() {
  return (
    <svg className="sparkline" viewBox="0 0 600 160" preserveAspectRatio="none">
      <motion.path
        d="M0,120 C60,110 90,70 140,80 C190,90 210,40 260,55 C320,72 340,30 400,45 C460,60 500,20 560,30 L600,25"
        fill="none" stroke="url(#sg)" strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }} />
      <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4ade80" /><stop offset="1" stopColor="#22c55e" /></linearGradient></defs>
    </svg>
  )
}

function Statistics() {
  return (
    <section className="section section--dark" id="statistics">
      <div className="container">
        <Group className="section__head">
          <Reveal><SectionLabel>Product Statistics</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Optimized for performance</Reveal>
          <Reveal as="p" className="lead">Monitor every threat signal in real-time. Aizzentec provides deep telemetry into detection accuracy, response latency, and coverage efficiency.</Reveal>
        </Group>
        <Group className="stats__grid" gap={0.08}>
          <Reveal className="stat-card" variants={scaleIn}>
            <div className="stat-card__label"><span>System Load</span><span>98.7%</span></div>
            <div className="bars">
              {[98, 86, 72, 90].map((p, i) => (
                <div className="bar" key={i}><motion.i initial={{ width: 0 }} whileInView={{ width: p + '%' }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.1 * i }} /></div>
              ))}
            </div>
            <p className="stat-card__cap">Active threat monitoring</p>
          </Reveal>
          <Reveal className="stat-card" variants={scaleIn}>
            <div className="stat-card__label"><span>Core Systems</span><span>99%</span></div>
            <Gauge value={345} />
            <p className="stat-card__cap">Total scans &middot; 152 active sensors</p>
          </Reveal>
          <Reveal className="stat-card" variants={scaleIn}>
            <div className="stat-card__label"><span>SLA Response</span><span>99.99%</span></div>
            <div className="stat-card__big"><Counter to={99.99} decimals={2} suffix="%" /></div>
            <p className="stat-card__cap">Global threat monitoring &middot; 8.4M events analyzed</p>
          </Reveal>
          <Reveal className="stat-wide" variants={scaleIn}>
            <div className="stat-wide__left">
              <div className="stat-card__label"><span>Growth Vector</span></div>
              <div className="stat-card__big"><Counter to={82} suffix="%" /></div>
              <p className="stat-card__cap">Threats blocked &middot; coverage gains over 30 days. Optimizing detection models for accuracy.</p>
              <a className="btn-ghost" href="#cta" style={{ marginTop: 18 }}>Request Demo</a>
            </div>
            <Spark />
          </Reveal>
        </Group>
      </div>
    </section>
  )
}

/* ===================== APPROACH (split) ===================== */

function Approach() {
  const items = [
    [I.cube, 'Prime Logic', 'We prioritize high-fidelity detection tuning to ensure your agents deliver consistent results.'],
    [I.eye, 'Total Clarity', 'Gain full observability into how every threat is detected, triaged, and neutralized by your defenses.'],
    [I.cycle, 'Fast Cycles', 'Transition from prototype to production in weeks, not months, with our pre-built frameworks.'],
  ]
  return (
    <section className="approach on-light" id="approach">
      <div className="approach__media" />
      <Group className="approach__body" gap={0.08}>
        <Reveal><SectionLabel light>Our Approach</SectionLabel></Reveal>
        <Reveal as="h2" className="text-section">Built for the long term</Reveal>
        <Reveal as="p" className="lead">We don't just ship code; we architect resilient defenses. Our approach combines rigorous testing with rapid deployment cycles.</Reveal>
        <div className="approach__grid">
          {items.map(([Ic, t, d]) => (
            <Reveal className="feat3" key={t} variants={scaleIn}>
              <Ic /><h4>{t}</h4><p>{d}</p>
            </Reveal>
          ))}
        </div>
      </Group>
    </section>
  )
}

/* ===================== FEATURES (dark) ===================== */

function Features() {
  const integ = 'Aizzentec bridges the gap between your data and your tools. Deploy agents that live where you work, from Slack to Splunk and beyond.'
  return (
    <section className="section section--dark" id="features">
      <div className="container">
        <Group className="features__top">
          <div>
            <Reveal><SectionLabel>Product Features</SectionLabel></Reveal>
            <Reveal as="h2" className="text-section" style={{ marginTop: 16 }}>Engineered for autonomy</Reveal>
          </div>
          <Reveal as="p" className="lead">Go beyond simple alert dashboards. Aizzentec provides the underlying architecture to build, test, and scale enterprise-grade defenses.</Reveal>
        </Group>

        <div className="features__panel">
          <Reveal className="dash" variants={scaleIn}>
            <div className="dash__bar"><i /><i /><i /></div>
            <div className="dash__tabs">
              {['Detect', 'Analyze', 'Contain', 'Deploy'].map((t, i) => (
                <span key={t} className={i === 0 ? 'active' : ''}>{t}</span>
              ))}
            </div>
            <div className="dash__body">
              <div className="dash__chat">
                <span className="q">Ask your SOC anything...</span>
                <div className="input"><span>Tools</span><span>&crarr;</span></div>
              </div>
            </div>
          </Reveal>
          <Reveal className="features__copy" variants={fadeUp}>
            <h3>Push your defenses to production with a single click.</h3>
            <p>Our secure edge infrastructure ensures sub-50ms latency globally. Deploy to any cloud provider or on-premise.</p>
            <CTAButton href="#cta">Go Live Now</CTAButton>
          </Reveal>
        </div>

        <div className="integrations">
          <Reveal><SectionLabel>Integrations</SectionLabel></Reveal>
          <Reveal as="p" className="big">
            {integ.split(' ').map((w, i) => (
              <span key={i} style={{ color: ['Slack', 'Splunk'].includes(w.replace(',', '')) ? '#4ade80' : undefined }}>{w} </span>
            ))}
          </Reveal>
          <Group className="intlogos" gap={0.05}>
            {['Splunk', 'CrowdStrike', 'Slack', 'Okta', 'Datadog', 'AWS'].map(n => (
              <Reveal as="span" key={n} style={{ fontFamily: 'var(--mono)', color: 'var(--w-55)', fontSize: 18, letterSpacing: '0.02em' }}>{n}</Reveal>
            ))}
          </Group>
        </div>
      </div>
    </section>
  )
}

/* ===================== TESTIMONIALS ===================== */

function Testimonials() {
  const data = [
    [I.cloud, 'Infrastructure that finally scales', 'Vertex Labs', 'The reliability of Aizzentec is unmatched. We\u2019ve migrated our entire detection pipeline to their edge nodes with zero downtime for our users.'],
    [I.cycle, 'Saved us months of R&D', 'FlowState AI', 'Instead of building our own detection logic from scratch, we used Aizzentec. We went from a prototype to a global production launch in weeks.'],
    [I.eye, 'Precision in every alert', 'Neural Sync', 'The observability tools allow us to monitor detection accuracy in real-time. It has become a vital part of our threat evaluation workflow.'],
    [I.cube, 'Enterprise-grade by default', 'Sentinel Ops', 'The node-based builder is a game changer for our team. Even our non-technical stakeholders can now help map out complex response playbooks.'],
  ]
  return (
    <section className="section section--light on-light" id="testimonials">
      <div className="container">
        <Group className="section__head">
          <Reveal><SectionLabel light>Testimonials</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Trusted by the pioneers</Reveal>
          <Reveal as="p" className="lead">From high-growth startups to enterprise security teams, Aizzentec is the chosen infrastructure for teams defending the next era of data.</Reveal>
        </Group>
        <Group className="tcards" gap={0.07}>
          {data.map(([Ic, t, n, comment]) => (
            <Reveal className="tcard" key={t} variants={scaleIn}>
              <div className="tcard__icon">
                <span>{n[0]}</span>
              </div>
              <h3>{t}</h3>
              <div className="tcard__meta">Rating</div>
              <div className="tcard__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{I.star(true)}</span>
                ))}
              </div>
              <div className="tcard__meta">Comment</div>
              <p>{comment}</p>
              <div className="tcard__foot">{n}</div>
            </Reveal>
          ))}
        </Group>
      </div>
    </section>
  )
}

/* ===================== ARTICLES ===================== */

function Articles() {
  return (
    <section className="section section--light on-light" id="articles">
      <div className="container">
        <Group className="section__head">
          <Reveal><SectionLabel light>Articles</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Insights on cyber defense</Reveal>
          <Reveal as="p" className="lead">Deep dives into security architecture, defense automation, and the future of enterprise resilience. Stay ahead of the threat curve.</Reveal>
        </Group>
        <div className="articles__grid">
          <Reveal className="post post--feat" variants={scaleIn}>
            <div className="post__media">
              <div className="post__overlay">
                <h3>What It Takes to Turn Security Into a Business Asset</h3>
                <div className="post__meta"><span>Apr 29, 2026</span><span>2 mins read</span></div>
              </div>
            </div>
            <div className="post__body">
              <p className="lead" style={{ marginTop: 14 }}>Buying security tools is easy. Turning them into something that drives real resilience across your business requires structure.</p>
            </div>
          </Reveal>
          <Group className="articles__side" gap={0.1}>
            {[
              ['post__media--2', 'Why Your Threat Alerts Feel Inconsistent', 'Apr 29, 2026', '3 mins read'],
              ['post__media--3', 'From Alerting to Systems: The Real Shift in Security', 'Apr 29, 2026', '2 mins read'],
            ].map(([m, t, d, r]) => (
              <Reveal className="post post--mini" key={t} variants={fadeUp}>
                <div className={'post__media ' + m} />
                <div className="post__body">
                  <h3>{t}</h3>
                  <div className="post__meta"><span>{d}</span><span>{r}</span></div>
                </div>
              </Reveal>
            ))}
          </Group>
        </div>
        <Reveal className="articles__foot">
          <CTAButton href="#articles" dark>View Articles</CTAButton>
          <p>Access all our articles in one place.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== FAQ ===================== */

function FAQ() {
  const tabs = ['Overview', 'Security', 'Protocols', 'Licensing']
  const data = [
    ['What is the Aizzentec platform?', 'Aizzentec is a specialized infrastructure for building and deploying custom defense agents. We provide the detection logic and edge nodes required to run autonomous response at enterprise scale.'],
    ['Who is this template designed for?', 'Teams that need production-grade security \u2014 from high-growth startups to enterprise healthcare and finance organizations.'],
    ['Does Aizzentec provide pre-built agents?', 'Yes. Start from a library of playbook templates or build your own from scratch on the visual canvas.'],
    ['How does it differ from a standard SIEM?', 'Agents take real actions across your tools autonomously \u2014 they don\u2019t just alert, they execute response playbooks.'],
    ['Can I use my own custom domain?', 'Absolutely. Deploy agents on your own domain with full branding control.'],
    ['Is there a limit to how many agents I can build?', 'Limits depend on your plan. Enterprise tiers offer unlimited agents and dedicated edge nodes.'],
  ]
  const [open, setOpen] = useState(0)
  const [tab, setTab] = useState(0)
  return (
    <section className="section section--light on-light" id="faq">
      <div className="container faq">
        <Group className="faq__left">
          <Reveal><SectionLabel light>FAQ</SectionLabel></Reveal>
          <Reveal as="h2" className="text-section">Common inquiries</Reveal>
          <Reveal as="p">Everything you need to know about deploying, scaling, and securing your defense agents with Aizzentec. Can't find an answer?</Reveal>
          <Reveal><CTAButton href="#cta" dark>Contact Us</CTAButton></Reveal>
        </Group>
        <Reveal className="faq__right" variants={scaleIn}>
          <div className="faq__tabs">
            {tabs.map((t, i) => (
              <button key={t} className={i === tab ? 'active' : ''} onClick={() => setTab(i)}>{t}</button>
            ))}
          </div>
          {data.map(([q, a], i) => (
            <div className="faq__item" key={q}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <I.q className="qi" />{q}
                <motion.span
                  className="chev"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <I.plus />
                </motion.span>
              </button>
              <motion.div className="faq__a" initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.32, ease: EASE }}>
                <p>{a}</p>
              </motion.div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== CTA ===================== */

function CTA() {
  return (
    <section className="cta" id="cta">
      <div className="cta__bg" />
      <Reveal className="container cta__inner" variants={scaleIn}>
        <SectionLabel>Get Started</SectionLabel>
        <h2 className="text-section">Get smarter about cyber defense</h2>
        <p>Weekly insights on automation, defense workflows, and real builds. No fluff, just what works.</p>
        <form className="cta__form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="jane@company.com" />
          <CTAButton href="#" onClick={e => e.preventDefault()}>Subscribe</CTAButton>
        </form>
      </Reveal>
    </section>
  )
}

/* ===================== FOOTER ===================== */

function Footer() {
  const cols = [
    ['Quick Links', ['Home', 'Pricing', 'Projects', 'Articles']],
    ['Company', ['About Us', 'Contact Us', 'Book A Call', 'More Templates']],
    ['Policies', ['Terms & Conditions', 'Privacy Policy']],
  ]
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__cols">
          <div className="footer__brand">
            <a href="#home" className="brand"><img src={logoSvg} alt="aizzentec" className="brand__logo" /></a>
            <div className="footer__social">
              {['in', 'X', '\u25CE', '\u25B6'].map(s => <a href="#" key={s}>{s}</a>)}
            </div>
          </div>
          {cols.map(([h, links]) => (
            <div className="footer__col" key={h}>
              <h4>{h}</h4>
              {links.map(l => <a href="#" key={l}>{l}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer__word">aizzentec</div>
      <div className="container">
        <div className="footer__legal">
          <span>&copy;2026 Aizzentec. All rights reserved.</span>
          <span>Built with the Aizzentec template</span>
        </div>
      </div>
    </footer>
  )
}

/* ===================== APP ===================== */

export default function App() {
  return (
    <>
      {/* 4-column grid lines overlay */}
      <div className="grid-overlay" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Cases />
        <Product />
        <Statistics />
        <Approach />
        <Features />
        <Testimonials />
        <Articles />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
