import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, Globe, Lock, Monitor, Smartphone, Tv, Laptop,
  ChevronDown, Check, Star, MessageCircle, Send, Clock,
  Server, Wifi, Activity, Eye, EyeOff, Terminal, ToggleLeft, ToggleRight,
  ArrowRight, Users, Download, RefreshCw, Settings, X, Minus, Square
} from 'lucide-react';

// ============ UTILITY HOOKS ============
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView || (inView && !started.current)) {
      started.current = true;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress >= 1) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [inView, target, duration, startOnView]);

  return { count, ref };
}

// ============ SECTION WRAPPER ============
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 px-4 md:px-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

// ============ WINDOW FRAME COMPONENT ============
function WindowFrame({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`window-frame ${className}`}>
      <div className="window-titlebar">
        <div className="window-dot bg-red-500/80" />
        <div className="window-dot bg-yellow-500/80" />
        <div className="window-dot bg-green-500/80" />
        <span className="ml-3 text-xs font-mono text-text-secondary">{title}</span>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

// ============ STATUS BADGE ============
function StatusBadge({ label, active = true }: { label: string; active?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${
      active ? 'border-cyan/30 bg-cyan/5 text-cyan' : 'border-border bg-bg-tertiary text-text-muted'
    }`}>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-cyan animate-pulse-glow' : 'bg-text-muted'}`} />
      {label}
    </div>
  );
}

// ============ HERO SECTION ============
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
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <StatusBadge label={`${connected.toLocaleString()} connected now`} active />
          <StatusBadge label="v3.2.1 stable" active />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-cyan text-glow-cyan">wbytie</span>
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto"
        >
          Your internet,{' '}
          <span className="text-cyan">encrypted</span>{' '}
          and{' '}
          <span className="text-lime">fast</span>.
          <br />
          <span className="text-text-secondary text-2xl md:text-3xl lg:text-4xl font-semibold">
            Activate in 2 minutes. No hardware. No ceremony.
          </span>
        </motion.h1>

        {/* Toggle demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-4 bg-bg-secondary border border-border rounded-2xl px-6 py-4">
            <span className="text-sm font-mono text-text-secondary">CONNECTION</span>
            <button
              onClick={() => setIsConnected(!isConnected)}
              className="relative cursor-pointer"
            >
              {isConnected ? (
                <ToggleRight className="w-12 h-12 text-cyan" strokeWidth={1.5} />
              ) : (
                <ToggleLeft className="w-12 h-12 text-text-muted" strokeWidth={1.5} />
              )}
            </button>
            <AnimatePresence mode="wait">
              {isConnected ? (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-lime animate-pulse-glow" />
                  <span className="text-sm font-mono text-lime">SECURED</span>
                </motion.div>
              ) : (
                <motion.div
                  key="disconnected"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-text-muted" />
                  <span className="text-sm font-mono text-text-muted">OFFLINE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative px-8 py-4 bg-cyan text-bg-primary font-bold rounded-xl text-lg hover:bg-cyan/90 transition-all glow-cyan-strong hover:scale-105 active:scale-95">
            Start 3-Day Free Trial
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-sm text-text-secondary font-mono">
            No credit card required · Cancel anytime
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <ChevronDown className="w-6 h-6 text-text-muted mx-auto animate-bounce" />
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Performance</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Speed you can measure</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Real throughput, real latency, real uptime. No asterisks.
          </p>
        </div>

        <div ref={speedRef} className="grid md:grid-cols-3 gap-4">
          {/* Speed gauge */}
          <WindowFrame title="throughput.test">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-cyan text-glow-cyan">
                {speed}
              </div>
              <div className="text-sm font-mono text-text-secondary mt-1">Mbps download</div>
              <div className="mt-4 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan to-lime rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '85%' } : {}}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>
              <div className="text-xs font-mono text-text-muted mt-2">847 / 1000 Mbps capacity</div>
            </div>
          </WindowFrame>

          {/* Ping */}
          <WindowFrame title="latency.ping">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-lime">
                {ping}<span className="text-2xl text-text-secondary">ms</span>
              </div>
              <div className="text-sm font-mono text-text-secondary mt-1">round-trip latency</div>
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-lime rounded-full"
                    initial={{ height: 4 }}
                    animate={inView ? { height: i < 8 ? 24 : 8 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
              <div className="text-xs font-mono text-text-muted mt-2">Consistent · No jitter</div>
            </div>
          </WindowFrame>

          {/* Uptime */}
          <WindowFrame title="uptime.status">
            <div className="text-center py-4">
              <div className="text-5xl md:text-6xl font-bold font-mono text-violet">
                99.98<span className="text-2xl text-text-secondary">%</span>
              </div>
              <div className="text-sm font-mono text-text-secondary mt-1">30-day uptime</div>
              <div className="mt-4 flex gap-0.5 justify-center">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 h-6 rounded-sm ${i === 17 ? 'bg-yellow-500/60' : 'bg-lime'}`}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: i * 0.03 }}
                  />
                ))}
              </div>
              <div className="text-xs font-mono text-text-muted mt-2">Last 30 days · 1 minor incident</div>
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Infrastructure</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            <span className="font-mono text-cyan">42</span> countries. <span className="font-mono text-cyan">120+</span> servers.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Bare-metal servers in every major region. Pick your exit node or let us choose the fastest.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayed.map((server, i) => (
            <motion.div
              key={server.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-bg-secondary border border-border rounded-xl p-4 hover:border-cyan/40 hover:bg-bg-tertiary transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{server.flag}</span>
                <div>
                  <div className="text-sm font-semibold">{server.country}</div>
                  <div className="text-xs font-mono text-text-muted">{server.cities} servers</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="text-xs font-mono text-lime/80">online</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-mono text-cyan hover:text-cyan/80 transition-colors"
          >
            {showAll ? 'Show less' : `Show all ${servers.length} countries →`}
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
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Privacy</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">What we store: <span className="text-cyan">nothing.</span></h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            No logs. No browsing history. No connection timestamps. No IP addresses. We mean it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <WindowFrame title="privacy_audit.log">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3">
                <EyeOff className="w-4 h-4 text-text-muted" />
                <span className="text-text-secondary">Browsing history</span>
                <span className="ml-auto text-lime">NOT STORED</span>
              </div>
              <div className="flex items-center gap-3">
                <EyeOff className="w-4 h-4 text-text-muted" />
                <span className="text-text-secondary">Traffic logs</span>
                <span className="ml-auto text-lime">NOT STORED</span>
              </div>
              <div className="flex items-center gap-3">
                <EyeOff className="w-4 h-4 text-text-muted" />
                <span className="text-text-secondary">Connection timestamps</span>
                <span className="ml-auto text-lime">NOT STORED</span>
              </div>
              <div className="flex items-center gap-3">
                <EyeOff className="w-4 h-4 text-text-muted" />
                <span className="text-text-secondary">Bandwidth usage</span>
                <span className="ml-auto text-lime">NOT STORED</span>
              </div>
              <div className="flex items-center gap-3">
                <EyeOff className="w-4 h-4 text-text-muted" />
                <span className="text-text-secondary">DNS queries</span>
                <span className="ml-auto text-lime">NOT STORED</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-cyan" />
                  <span className="text-text-secondary">Account email</span>
                  <span className="ml-auto text-text-muted">for login only</span>
                </div>
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title="encryption.spec">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-cyan mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">AES-256-GCM</div>
                  <div className="text-xs font-mono text-text-muted">Military-grade encryption</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">WireGuard® Protocol</div>
                  <div className="text-xs font-mono text-text-muted">Modern, fast, audited</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-cyan mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">Kill Switch</div>
                  <div className="text-xs font-mono text-text-muted">Auto-disconnect on failure</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan mt-0.5" />
                <div>
                  <div className="font-semibold text-sm">DNS Leak Protection</div>
                  <div className="text-xs font-mono text-text-muted">All queries encrypted</div>
                </div>
              </div>
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
    { icon: <Monitor className="w-8 h-8" />, name: 'Windows', detail: 'Win 10/11' },
    { icon: <Laptop className="w-8 h-8" />, name: 'macOS', detail: '12+' },
    { icon: <Terminal className="w-8 h-8" />, name: 'Linux', detail: 'Ubuntu/Fedora/Arch' },
    { icon: <Smartphone className="w-8 h-8" />, name: 'Android', detail: '8.0+' },
    { icon: <Smartphone className="w-8 h-8" />, name: 'iOS', detail: '15+' },
    { icon: <Globe className="w-8 h-8" />, name: 'Browsers', detail: 'Chrome/Firefox/Edge' },
    { icon: <Tv className="w-8 h-8" />, name: 'Smart TV', detail: 'via router' },
  ];

  return (
    <Section id="devices">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Compatibility</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            One account. <span className="font-mono text-cyan">6</span> devices.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Install everywhere. Connect up to 6 devices simultaneously with a single subscription.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {devices.map((device, i) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-bg-secondary border border-border rounded-xl p-4 text-center hover:border-cyan/40 transition-all group"
            >
              <div className="text-text-secondary group-hover:text-cyan transition-colors flex justify-center mb-2">
                {device.icon}
              </div>
              <div className="text-sm font-semibold">{device.name}</div>
              <div className="text-xs font-mono text-text-muted">{device.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-bg-secondary border border-border rounded-full px-5 py-2.5">
            <Users className="w-4 h-4 text-cyan" />
            <span className="text-sm font-mono">
              <span className="text-cyan font-bold">6</span> simultaneous connections
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
      features: ['All servers', '6 devices', 'All protocols', 'Kill switch', 'Priority support', 'Dedicated IP option'],
      highlight: false,
    },
  ];

  return (
    <Section id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Simple pricing. No surprises.</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            All plans include the same features. Longer terms cost less per month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-cyan/10 to-bg-secondary border-2 border-cyan/50 glow-cyan'
                  : 'bg-bg-secondary border border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan text-bg-primary text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold font-mono">{plan.price}</span>
                  <span className="text-text-secondary font-mono text-sm">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="mt-2 text-xs font-mono text-lime">{plan.savings}</div>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                plan.highlight
                  ? 'bg-cyan text-bg-primary hover:bg-cyan/90 glow-cyan'
                  : 'bg-bg-tertiary border border-border text-text-primary hover:border-cyan/40'
              }`}>
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-text-muted">
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
    { from: 'bot', text: 'Welcome to wbytie! 👋\nI can help you buy, renew, or manage your VPN subscription.' },
    { from: 'user', text: 'Buy subscription' },
    { from: 'bot', text: 'Choose your plan:\n\n1️⃣ Monthly — $9.99/mo\n2️⃣ Annual — $4.99/mo (save 50%)\n3️⃣ 2-Year — $3.49/mo (save 65%)\n\nReply with the number.' },
    { from: 'user', text: '2' },
    { from: 'bot', text: '✅ Annual plan selected.\nPayment link generated. Your VPN will be active in ~2 minutes after payment.' },
  ];

  return (
    <Section id="telegram">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Management</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Manage everything via <span className="text-cyan">Telegram</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Buy, renew, check status, change servers — all from a chat. No dashboards to navigate.
          </p>
        </div>

        <WindowFrame title="@wbytie_bot — Telegram" className="max-w-lg mx-auto">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                  msg.from === 'user'
                    ? 'bg-cyan/20 border border-cyan/30 text-text-primary'
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
              transition={{ delay: messages.length * 0.15 + 0.3 }}
              className="flex items-center gap-2 mt-4 bg-bg-tertiary rounded-xl px-4 py-2.5 border border-border"
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                readOnly
              />
              <Send className="w-4 h-4 text-cyan" />
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
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Support</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Real humans. Fast replies.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
            <Clock className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono text-cyan">&lt; 5 min</div>
            <div className="text-sm text-text-secondary mt-1">Average response time</div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
            <MessageCircle className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono text-cyan">24/7</div>
            <div className="text-sm text-text-secondary mt-1">Support availability</div>
          </div>
          <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
            <RefreshCw className="w-6 h-6 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono text-cyan">98%</div>
            <div className="text-sm text-text-secondary mt-1">Issues resolved first contact</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-secondary border border-border rounded-xl p-5"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-text-secondary mb-3">"{review.text}"</p>
              <div className="text-xs font-mono text-text-muted">— {review.name}</div>
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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Questions, answered.</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-bg-secondary border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-tertiary transition-colors"
              >
                <span className="font-semibold text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 text-sm text-text-secondary">
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
        <div className="bg-gradient-to-b from-cyan/5 to-transparent border border-cyan/20 rounded-3xl p-10 md:p-16 glow-cyan">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to go private?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Start your 3-day free trial now. Full access, all servers, no credit card.
          </p>
          <button className="group px-8 py-4 bg-cyan text-bg-primary font-bold rounded-xl text-lg hover:bg-cyan/90 transition-all glow-cyan-strong hover:scale-105 active:scale-95">
            Start Free Trial
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-lime" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-lime" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-lime" /> 30-day guarantee</span>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-cyan text-glow-cyan">wbytie</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          <a href="#speed" className="hover:text-cyan transition-colors">Speed</a>
          <a href="#servers" className="hover:text-cyan transition-colors">Servers</a>
          <a href="#privacy" className="hover:text-cyan transition-colors">Privacy</a>
          <a href="#pricing" className="hover:text-cyan transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-cyan transition-colors">FAQ</a>
        </div>
        <button className="px-4 py-2 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-semibold rounded-lg hover:bg-cyan/20 transition-all">
          Try Free
        </button>
      </div>
    </nav>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-cyan">wbytie</span>
          <span className="text-xs font-mono text-text-muted">v3.2.1</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-text-muted">
          <span>Terms</span>
          <span>Privacy Policy</span>
          <span>Warrant Canary</span>
          <span>Contact</span>
        </div>
        <div className="text-xs font-mono text-text-muted">
          © 2026 wbytie. All rights reserved.
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
      <SpeedSection />
      <ServersSection />
      <PrivacySection />
      <DevicesSection />
      <PricingSection />
      <TelegramSection />
      <SupportSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
