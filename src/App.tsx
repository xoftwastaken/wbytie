import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, Globe, Lock, Monitor, Smartphone, Tv, Laptop,
  ChevronDown, Check, Star, MessageCircle, Send, Clock,
  Server, Wifi, Activity, Eye, EyeOff, Terminal, ToggleLeft, ToggleRight,
  ArrowRight, Users, Download, RefreshCw, Settings, X, Minus, Square,
  Sparkles, Fingerprint, Radio
} from 'lucide-react';

// ============ SECTION WRAPPER ============
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-20 md:py-28 px-4 md:px-8 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

// ============ WINDOW FRAME ============
function WindowFrame({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`window-frame noise-overlay ${className}`}>
      <div className="window-titlebar">
        <div className="window-dot bg-zinc-600" />
        <div className="window-dot bg-zinc-600" />
        <div className="window-dot bg-zinc-600" />
        <span className="ml-3 text-[11px] font-mono text-text-muted tracking-wide">{title}</span>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

// ============ STATUS BADGE ============
function StatusBadge({ label, active = true }: { label: string; active?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wide border ${
      active ? 'border-border-bright bg-white/[0.03] text-accent-dim' : 'border-border-subtle bg-bg-tertiary text-text-muted'
    }`}>
      <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-accent animate-pulse-subtle' : 'bg-text-muted'}`} />
      {label}
    </div>
  );
}

// ============ SECTION LABEL ============
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-border-bright" />
      <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}

// ============ HERO ============
function Hero() {
  const [connected, setConnected] = useState(14832);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Subtle radial gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-20">
        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <StatusBadge label={`${connected.toLocaleString()} connected now`} active />
          <StatusBadge label="v3.2.1" active />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-5xl md:text-6xl font-bold tracking-tight text-accent text-glow">
            wbytie
          </span>
          <div className="mt-3 text-[11px] font-mono text-text-muted tracking-[0.3em] uppercase">
            Private Network Protocol
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6 max-w-3xl mx-auto tracking-tight"
        >
          Your internet,{' '}
          <span className="text-accent-dim">encrypted</span>
          {' '}and{' '}
          <span className="text-accent-dim">fast</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Activate in 2 minutes. No hardware. No ceremony.
        </motion.p>

        {/* Toggle demo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-5 bg-bg-secondary/80 backdrop-blur-sm border border-border rounded-2xl px-6 py-4 glow-subtle">
            <span className="text-xs font-mono text-text-muted tracking-wider">STATUS</span>
            <button
              onClick={() => setIsConnected(!isConnected)}
              className="relative cursor-pointer"
            >
              {isConnected ? (
                <ToggleRight className="w-11 h-11 text-accent" strokeWidth={1.5} />
              ) : (
                <ToggleLeft className="w-11 h-11 text-text-muted" strokeWidth={1.5} />
              )}
            </button>
            <AnimatePresence mode="wait">
              {isConnected ? (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
                  <span className="text-xs font-mono text-accent tracking-wider">SECURED</span>
                </motion.div>
              ) : (
                <motion.div
                  key="disconnected"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                  <span className="text-xs font-mono text-text-muted tracking-wider">OFFLINE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <button className="btn-primary px-8 py-3.5 text-[15px]">
            Start 3-Day Free Trial
          </button>
          <span className="text-[11px] text-text-muted font-mono tracking-wide">
            No credit card required · Cancel anytime
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <ChevronDown className="w-5 h-5 text-text-faint mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ SPEED SECTION ============
function SpeedSection() {
  const speedRef = useRef<HTMLDivElement>(null);
  const inView = useInView(speedRef, { once: true });
  const [speed, setSpeed] = useState(0);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    if (inView) {
      const speedInterval = setInterval(() => {
        setSpeed(prev => {
          if (prev >= 847) { clearInterval(speedInterval); return 847; }
          return prev + 12;
        });
      }, 16);
      const pingInterval = setInterval(() => {
        setPing(prev => {
          if (prev >= 12) { clearInterval(pingInterval); return 12; }
          return prev + 1;
        });
      }, 50);
      return () => { clearInterval(speedInterval); clearInterval(pingInterval); };
    }
  }, [inView]);

  return (
    <Section id="speed">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Performance</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">Speed you can measure</h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            Real throughput, real latency, real uptime. No asterisks.
          </p>
        </div>

        <div ref={speedRef} className="grid md:grid-cols-3 gap-4">
          {/* Speed */}
          <WindowFrame title="throughput.test">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-accent tracking-tight">
                {speed}
              </div>
              <div className="text-xs font-mono text-text-muted mt-2 tracking-wider">Mbps download</div>
              <div className="mt-5 h-[3px] bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-zinc-400 to-white rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '85%' } : {}}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="text-[11px] font-mono text-text-faint mt-3">847 / 1000 Mbps</div>
            </div>
          </WindowFrame>

          {/* Ping */}
          <WindowFrame title="latency.ping">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-accent tracking-tight">
                {ping}<span className="text-xl text-text-muted ml-1">ms</span>
              </div>
              <div className="text-xs font-mono text-text-muted mt-2 tracking-wider">round-trip latency</div>
              <div className="mt-5 flex justify-center gap-[3px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-gradient-to-t from-zinc-600 to-accent-dim rounded-full"
                    initial={{ height: 3 }}
                    animate={inView ? { height: i < 9 ? 22 : 6 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <div className="text-[11px] font-mono text-text-faint mt-3">Consistent · No jitter</div>
            </div>
          </WindowFrame>

          {/* Uptime */}
          <WindowFrame title="uptime.status">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-accent tracking-tight">
                99.98<span className="text-xl text-text-muted">%</span>
              </div>
              <div className="text-xs font-mono text-text-muted mt-2 tracking-wider">30-day uptime</div>
              <div className="mt-5 flex gap-[2px] justify-center">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-[5px] h-6 rounded-[2px] ${i === 17 ? 'bg-zinc-600' : 'bg-accent-dim'}`}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: i * 0.025, duration: 0.3 }}
                  />
                ))}
              </div>
              <div className="text-[11px] font-mono text-text-faint mt-3">Last 30 days</div>
            </div>
          </WindowFrame>
        </div>
      </div>
    </Section>
  );
}

// ============ SERVERS SECTION ============
function ServersSection() {
  const [showAll, setShowAll] = useState(false);
  
  const servers = [
    { country: 'United States', flag: '🇺🇸', cities: 12, code: 'US' },
    { country: 'United Kingdom', flag: '🇬🇧', cities: 6, code: 'UK' },
    { country: 'Germany', flag: '🇩🇪', cities: 5, code: 'DE' },
    { country: 'Japan', flag: '🇯🇵', cities: 4, code: 'JP' },
    { country: 'Singapore', flag: '🇸🇬', cities: 3, code: 'SG' },
    { country: 'Netherlands', flag: '🇳🇱', cities: 4, code: 'NL' },
    { country: 'Canada', flag: '🇨🇦', cities: 5, code: 'CA' },
    { country: 'Australia', flag: '🇦🇺', cities: 4, code: 'AU' },
    { country: 'France', flag: '🇫🇷', cities: 3, code: 'FR' },
    { country: 'Sweden', flag: '🇸🇪', cities: 2, code: 'SE' },
    { country: 'Switzerland', flag: '🇨🇭', cities: 2, code: 'CH' },
    { country: 'Brazil', flag: '🇧🇷', cities: 2, code: 'BR' },
    { country: 'South Korea', flag: '🇰🇷', cities: 2, code: 'KR' },
    { country: 'India', flag: '🇮🇳', cities: 3, code: 'IN' },
    { country: 'Italy', flag: '🇮🇹', cities: 2, code: 'IT' },
    { country: 'Spain', flag: '🇪🇸', cities: 2, code: 'ES' },
  ];

  const displayed = showAll ? servers : servers.slice(0, 8);

  return (
    <Section id="servers">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Infrastructure</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
            <span className="font-mono">42</span> countries. <span className="font-mono">120+</span> servers.
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            Bare-metal servers in every major region. Pick your exit node or let us choose the fastest.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayed.map((server, i) => (
            <motion.div
              key={server.code}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="group bg-bg-secondary border border-border rounded-xl p-4 card-hover cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl grayscale-[0.3] opacity-90">{server.flag}</span>
                <div>
                  <div className="text-sm font-medium text-accent-dim">{server.country}</div>
                  <div className="text-[11px] font-mono text-text-muted">{server.cities} servers</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-accent-dim" />
                <span className="text-[10px] font-mono text-text-muted tracking-wider">ONLINE</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-mono text-text-secondary hover:text-accent transition-colors tracking-wide"
          >
            {showAll ? '← Show less' : `Show all ${servers.length} countries →`}
          </button>
        </div>
      </div>
    </Section>
  );
}

// ============ PRIVACY SECTION ============
function PrivacySection() {
  return (
    <Section id="privacy">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Privacy</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
            What we store: <span className="text-text-muted">nothing.</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            No logs. No browsing history. No connection timestamps. No IP addresses. We mean it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <WindowFrame title="privacy_audit.log">
            <div className="space-y-3.5 font-mono text-[13px]">
              {[
                'Browsing history',
                'Traffic logs',
                'Connection timestamps',
                'Bandwidth usage',
                'DNS queries',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <EyeOff className="w-3.5 h-3.5 text-text-faint flex-shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                  <span className="ml-auto text-[11px] text-accent-dim tracking-wider">NONE</span>
                </div>
              ))}
              <div className="border-t border-border-subtle pt-3.5 mt-3.5">
                <div className="flex items-center gap-3">
                  <Eye className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-text-muted">Account email</span>
                  <span className="ml-auto text-[11px] text-text-faint tracking-wider">LOGIN ONLY</span>
                </div>
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title="encryption.spec">
            <div className="space-y-4">
              {[
                { icon: <Lock className="w-4 h-4" />, title: 'AES-256-GCM', detail: 'Military-grade encryption' },
                { icon: <Shield className="w-4 h-4" />, title: 'WireGuard® Protocol', detail: 'Modern, fast, audited' },
                { icon: <Activity className="w-4 h-4" />, title: 'Kill Switch', detail: 'Auto-disconnect on failure' },
                { icon: <Fingerprint className="w-4 h-4" />, title: 'DNS Leak Protection', detail: 'All queries encrypted' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="text-text-muted mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-medium text-sm text-accent-dim">{item.title}</div>
                    <div className="text-[11px] font-mono text-text-muted mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </WindowFrame>
        </div>
      </div>
    </Section>
  );
}

// ============ DEVICES SECTION ============
function DevicesSection() {
  const devices = [
    { icon: <Monitor className="w-7 h-7" />, name: 'Windows', detail: 'Win 10/11' },
    { icon: <Laptop className="w-7 h-7" />, name: 'macOS', detail: '12+' },
    { icon: <Terminal className="w-7 h-7" />, name: 'Linux', detail: 'Ubuntu / Arch' },
    { icon: <Smartphone className="w-7 h-7" />, name: 'Android', detail: '8.0+' },
    { icon: <Smartphone className="w-7 h-7" />, name: 'iOS', detail: '15+' },
    { icon: <Globe className="w-7 h-7" />, name: 'Browsers', detail: 'Extension' },
    { icon: <Tv className="w-7 h-7" />, name: 'Smart TV', detail: 'Via router' },
  ];

  return (
    <Section id="devices">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Compatibility</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
            One account. <span className="font-mono">6</span> devices.
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            Install everywhere. Connect up to 6 devices simultaneously with a single subscription.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {devices.map((device, i) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-bg-secondary border border-border rounded-xl p-4 text-center card-hover group"
            >
              <div className="text-text-muted group-hover:text-accent-dim transition-colors flex justify-center mb-3">
                {device.icon}
              </div>
              <div className="text-sm font-medium text-accent-dim">{device.name}</div>
              <div className="text-[10px] font-mono text-text-muted mt-1">{device.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2.5 bg-bg-secondary border border-border rounded-full px-5 py-2.5">
            <Users className="w-3.5 h-3.5 text-accent-dim" />
            <span className="text-xs font-mono text-text-secondary tracking-wide">
              <span className="text-accent font-medium">6</span> simultaneous connections
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      period: '/mo',
      savings: null,
      features: ['All servers', '6 devices', 'All protocols', 'Kill switch'],
      highlight: false,
    },
    {
      name: 'Annual',
      price: '$4.99',
      period: '/mo',
      savings: 'Save 50%',
      features: ['All servers', '6 devices', 'All protocols', 'Kill switch', 'Priority support'],
      highlight: true,
    },
    {
      name: '2-Year',
      price: '$3.49',
      period: '/mo',
      savings: 'Save 65%',
      features: ['All servers', '6 devices', 'All protocols', 'Kill switch', 'Priority support', 'Dedicated IP'],
      highlight: false,
    },
  ];

  return (
    <Section id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">Simple pricing. No surprises.</h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            All plans include the same features. Longer terms cost less per month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-7 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-white/[0.04] to-bg-secondary border border-white/[0.12] glow-accent'
                  : 'bg-bg-secondary border border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-bg-primary text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                  Best Value
                </div>
              )}
              <div className="text-center mb-7">
                <h3 className="text-sm font-medium text-text-secondary mb-3 tracking-wide">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold font-mono text-accent tracking-tight">{plan.price}</span>
                  <span className="text-text-muted font-mono text-sm">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="mt-2 text-[11px] font-mono text-accent-dim tracking-wider">{plan.savings}</div>
                )}
              </div>
              <ul className="space-y-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="w-3.5 h-3.5 text-accent-dim flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                plan.highlight
                  ? 'btn-primary'
                  : 'bg-bg-tertiary border border-border text-text-secondary hover:border-border-bright hover:text-accent-dim'
              }`}>
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[11px] font-mono text-text-faint tracking-wider">
            30-day money-back guarantee · All plans include 3-day free trial
          </p>
        </div>
      </div>
    </Section>
  );
}

// ============ TELEGRAM BOT SECTION ============
function TelegramSection() {
  const messages = [
    { from: 'user', text: '/start' },
    { from: 'bot', text: 'Welcome to wbytie.\nI can help you buy, renew, or manage your subscription.' },
    { from: 'user', text: 'Buy subscription' },
    { from: 'bot', text: 'Choose your plan:\n\n1. Monthly — $9.99/mo\n2. Annual — $4.99/mo\n3. 2-Year — $3.49/mo\n\nReply with the number.' },
    { from: 'user', text: '2' },
    { from: 'bot', text: 'Annual plan selected.\nPayment link generated. Your VPN will be active in ~2 minutes after payment.' },
  ];

  return (
    <Section id="telegram">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Management</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
            Manage everything via <span className="text-accent-dim">Telegram</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-[15px] leading-relaxed">
            Buy, renew, check status, change servers — all from a chat. No dashboards to navigate.
          </p>
        </div>

        <WindowFrame title="@wbytie_bot — Telegram" className="max-w-lg mx-auto">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'user' ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-accent text-bg-primary'
                    : 'bg-bg-tertiary border border-border text-text-secondary'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: messages.length * 0.12 + 0.3 }}
              className="flex items-center gap-2 mt-4 bg-bg-tertiary rounded-xl px-4 py-2.5 border border-border"
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-faint"
                readOnly
              />
              <Send className="w-4 h-4 text-text-muted" />
            </motion.div>
          </div>
        </WindowFrame>
      </div>
    </Section>
  );
}

// ============ SUPPORT SECTION ============
function SupportSection() {
  const reviews = [
    { name: 'Alex K.', text: 'Set up in under 2 minutes. Speed is incredible on the EU servers.', stars: 5 },
    { name: 'Maria S.', text: 'Finally a VPN that doesn\'t feel like it\'s from 2010. Clean, fast, reliable.', stars: 5 },
    { name: 'James L.', text: 'The Telegram bot is genius. Renewed my sub in 10 seconds.', stars: 5 },
    { name: 'Yuki T.', text: 'Tested on 4 devices simultaneously. Zero issues. Latency is barely noticeable.', stars: 5 },
  ];

  return (
    <Section id="support">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Support</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">Real humans. Fast replies.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <Clock className="w-5 h-5" />, value: '< 5 min', label: 'Average response time' },
            { icon: <MessageCircle className="w-5 h-5" />, value: '24/7', label: 'Support availability' },
            { icon: <RefreshCw className="w-5 h-5" />, value: '98%', label: 'Resolved first contact' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-bg-secondary border border-border rounded-xl p-6 text-center"
            >
              <div className="text-text-muted mx-auto mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold font-mono text-accent tracking-tight">{stat.value}</div>
              <div className="text-xs text-text-muted mt-1.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-bg-secondary border border-border rounded-xl p-5"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-accent-dim fill-accent-dim" />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">"{review.text}"</p>
              <div className="text-[11px] font-mono text-text-faint tracking-wider">— {review.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============ FAQ SECTION ============
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  
  const faqs = [
    {
      q: 'How fast can I start?',
      a: 'Download the app, sign in, and connect in under 2 minutes. The 3-day trial is instant — no credit card needed.',
    },
    {
      q: 'Is this a physical product?',
      a: 'No. wbytie is purely digital — software you install on your devices that routes your traffic through our encrypted servers. Nothing is shipped.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'Credit cards, crypto (BTC, ETH, USDT), and select regional methods. All managed through our Telegram bot or web dashboard.',
    },
    {
      q: 'Can I use it on my router?',
      a: 'Yes. We provide configuration files for popular router firmware. This covers all devices on your network.',
    },
    {
      q: 'What if I\'m not satisfied?',
      a: '30-day money-back guarantee on all paid plans. No questions asked. Contact us via Telegram or email.',
    },
    {
      q: 'Do you keep any logs?',
      a: 'No. We do not store browsing history, connection timestamps, traffic logs, DNS queries, or IP addresses. Our infrastructure is designed so that we technically cannot log this data.',
    },
  ];

  return (
    <Section id="faq">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Questions, answered.</h2>
        </div>

        <div className="space-y-1.5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-bg-secondary border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-[15px] text-accent-dim pr-4">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ============ FINAL CTA ============
function FinalCTA() {
  return (
    <Section id="cta">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] rounded-3xl p-12 md:p-16 glow-subtle overflow-hidden">
          {/* Subtle top light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/[0.03] blur-3xl rounded-full" />
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to go private?
            </h2>
            <p className="text-text-secondary mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
              Start your 3-day free trial now. Full access, all servers, no credit card.
            </p>
            <button className="btn-primary px-8 py-3.5 text-[15px]">
              Start Free Trial
            </button>
            <div className="mt-8 flex items-center justify-center gap-5 text-[11px] font-mono text-text-faint tracking-wider">
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-accent-dim" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-accent-dim" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-accent-dim" /> 30-day guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle' : ''
    }`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-accent tracking-tight">wbytie</span>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-text-muted">
          <a href="#speed" className="hover:text-accent-dim transition-colors duration-200">Speed</a>
          <a href="#servers" className="hover:text-accent-dim transition-colors duration-200">Servers</a>
          <a href="#privacy" className="hover:text-accent-dim transition-colors duration-200">Privacy</a>
          <a href="#pricing" className="hover:text-accent-dim transition-colors duration-200">Pricing</a>
          <a href="#faq" className="hover:text-accent-dim transition-colors duration-200">FAQ</a>
        </div>
        <button className="px-4 py-2 bg-white/[0.04] border border-border text-accent-dim text-[13px] font-medium rounded-lg hover:bg-white/[0.07] hover:border-border-bright transition-all duration-200">
          Try Free
        </button>
      </div>
    </nav>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="border-t border-border-subtle py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-accent tracking-tight">wbytie</span>
          <span className="text-[10px] font-mono text-text-faint tracking-wider">v3.2.1</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono text-text-faint tracking-wider">
          <span className="hover:text-text-muted transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-text-muted transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-text-muted transition-colors cursor-pointer">Canary</span>
          <span className="hover:text-text-muted transition-colors cursor-pointer">Contact</span>
        </div>
        <div className="text-[11px] font-mono text-text-faint tracking-wider">
          © 2026 wbytie
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <Hero />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <SpeedSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <ServersSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <PrivacySection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <DevicesSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <PricingSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <TelegramSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <SupportSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <FAQSection />
      <div className="divider-gradient max-w-5xl mx-auto" />
      <FinalCTA />
      <Footer />
    </div>
  );
}
