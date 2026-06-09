"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

// Content from previous bento
const bentoItems = [
  {
    title: "Built Exactly for You",
    description: "We understand your challenge first. Then we build — no templates, no compromises.",
    layout: "large",
    type: "wired-connections",
    tone: "teal" as const
  },
  {
    title: "Modular Architecture",
    description: "Independent, proven modules. Plug together what you need.",
    layout: "small",
    type: "rotating-globe",
    tone: "blue" as const
  },
  {
    title: "AI Built In",
    description: "Predictive analytics, automated alerts, intelligent workflows.",
    layout: "small",
    type: "analytics-dashboard",
    tone: "purple" as const
  },
  {
    title: "Weeks, Not Months",
    description: "Fully customized platforms — deployed fast without cutting corners.",
    layout: "large",
    type: "metrics-dashboard",
    tone: "green" as const
  }
];

const toneRgb = {
  teal: "2,161,147",
  blue: "59,130,246",
  purple: "139,92,246",
  green: "52,211,153",
  amber: "245,158,11"
};

// Enhanced device connection animation with sophisticated network visualization
function WiredConnections({ tone }: { tone: keyof typeof toneRgb }) {
  const [activeDevice, setActiveDevice] = useState(0);
  const [dataTransfers, setDataTransfers] = useState<Array<{id: number, from: number, to: number, progress: number, active: boolean}>>([]);
  const [signalPulses, setSignalPulses] = useState<Array<{id: number, deviceId: number, radius: number, opacity: number}>>([]);
  const rgb = toneRgb[tone];

  // Devices positioned in a network layout with clearer hierarchy
  const devices = [
    { id: 0, name: "Hub", x: 50, y: 50, icon: "", type: "hub", size: 10, isLogo: true },
    { id: 1, name: "Mobile", x: 20, y: 35, icon: "📱", type: "client", size: 5 },
    { id: 2, name: "Desktop", x: 80, y: 30, icon: "🖥️", type: "client", size: 5 },
    { id: 3, name: "Tablet", x: 15, y: 75, icon: "📟", type: "client", size: 5 },
    { id: 4, name: "Laptop", x: 85, y: 70, icon: "💻", type: "client", size: 5 },
    { id: 5, name: "IoT", x: 35, y: 85, icon: "🔌", type: "sensor", size: 4 },
    { id: 6, name: "Watch", x: 65, y: 82, icon: "⌚", type: "wearable", size: 4 },
    { id: 7, name: "Cam", x: 50, y: 12, icon: "📹", type: "sensor", size: 4 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDevice(prev => (prev + 1) % devices.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Simulate data transfers between devices - hub-centric for clearer network flow
  useEffect(() => {
    const interval = setInterval(() => {
      if (dataTransfers.length < 2) {
        const fromDevice = Math.floor(Math.random() * devices.length);
        let toDevice = 0; // Always to/from hub for clearer network flow

        if (fromDevice === 0) {
          toDevice = Math.floor(Math.random() * (devices.length - 1)) + 1;
        } else {
          toDevice = 0;
        }

        const newTransfer = {
          id: Date.now() + Math.random(),
          from: fromDevice,
          to: toDevice,
          progress: 0,
          active: true
        };

        setDataTransfers(prev => [...prev, newTransfer]);

        // Animate transfer progress
        const animateTransfer = () => {
          setDataTransfers(prev => prev.map(t =>
            t.id === newTransfer.id ? { ...t, progress: Math.min(t.progress + 0.025, 1) } : t
          ));
        };

        const animationInterval = setInterval(animateTransfer, 40);

        setTimeout(() => {
          clearInterval(animationInterval);
          setDataTransfers(prev => prev.filter(t => t.id !== newTransfer.id));
        }, 2000);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [dataTransfers.length]);

  // Signal pulses from devices for connection activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDevice = Math.floor(Math.random() * devices.length);
      const newPulse = {
        id: Date.now() + Math.random(),
        deviceId: randomDevice,
        radius: devices[randomDevice].size,
        opacity: 1
      };

      setSignalPulses(prev => [...prev, newPulse]);

      setTimeout(() => {
        setSignalPulses(prev => prev.filter(p => p.id !== newPulse.id));
      }, 3000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multi-layer animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, rgba(${rgb}, 0.25) 0%, transparent 70%)` }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 30% 70%, rgba(${rgb}, 0.2) 0%, transparent 60%)` }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Network topology visualization */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          {/* Gradient for connection lines */}
          <linearGradient id={`connectionGradient_${rgb}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgba(${rgb}, 0.3)`} />
            <stop offset="50%" stopColor={`rgba(${rgb}, 0.6)`} />
            <stop offset="100%" stopColor={`rgba(${rgb}, 0.3)`} />
          </linearGradient>

          {/* Glow filter for enhanced visual effects */}
          <filter id={`glow_${rgb}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines with animated data flow */}
        {devices.map((device, fromIdx) => {
          if (device.type === "hub") return null;

          const hub = devices[0];
          const isActive = activeDevice === fromIdx || activeDevice === 0;
          const hasTransfer = dataTransfers.some(t =>
            (t.from === fromIdx && t.to === 0) || (t.from === 0 && t.to === fromIdx)
          );

          return (
            <g key={`connection-${fromIdx}`}>
              {/* Base connection line */}
              <line
                x1={device.x}
                y1={device.y}
                x2={hub.x}
                y2={hub.y}
                stroke={isActive ? `rgba(${rgb}, 0.4)` : "rgba(255, 255, 255, 0.06)"}
                strokeWidth={hasTransfer ? "2" : "1"}
                strokeLinecap="round"
              />

              {/* Animated data flow particles on connection */}
              {isActive && [...Array(2)].map((_, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r={hasTransfer ? "2.5" : "1.5"}
                  fill={hasTransfer ? `rgba(${rgb}, 1)` : `rgba(${rgb}, 0.7)`}
                  filter={`url(#glow_${rgb})`}
                  animate={{
                    cx: [device.x, hub.x],
                    cy: [device.y, hub.y],
                    opacity: [0, 1, 0],
                    scale: [1, hasTransfer ? 1.5 : 1.2, 1],
                  }}
                  transition={{
                    duration: hasTransfer ? 1.5 : 3,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Connection strength indicator */}
              <motion.circle
                cx={(device.x + hub.x) / 2}
                cy={(device.y + hub.y) / 2}
                r="1.5"
                fill={`rgba(${rgb}, ${hasTransfer ? 0.9 : 0.5})`}
                animate={{
                  scale: [1, hasTransfer ? 1.8 : 1.3, 1],
                  opacity: [hasTransfer ? 0.8 : 0.4, hasTransfer ? 1 : 0.6, hasTransfer ? 0.8 : 0.4],
                }}
                transition={{
                  duration: hasTransfer ? 0.8 : 2,
                  repeat: Infinity,
                  delay: fromIdx * 0.15
                }}
              />
            </g>
          );
        })}

        {/* Active data transfer visualization */}
        {dataTransfers.map((transfer) => {
          const fromDevice = devices[transfer.from];
          const toDevice = devices[transfer.to];

          if (!fromDevice || !toDevice) return null;

          return (
            <g key={transfer.id}>
              {/* Transfer path glow */}
              <motion.line
                x1={fromDevice.x}
                y1={fromDevice.y}
                x2={toDevice.x}
                y2={toDevice.y}
                stroke={`rgba(${rgb}, 0.3)`}
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Animated data packet */}
              <motion.circle
                cx={fromDevice.x + (toDevice.x - fromDevice.x) * transfer.progress}
                cy={fromDevice.y + (toDevice.y - fromDevice.y) * transfer.progress}
                r="4"
                fill={`rgba(${rgb}, 1)`}
                filter={`url(#glow_${rgb})`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />

              {/* Trailing glow effect */}
              <circle
                cx={fromDevice.x + (toDevice.x - fromDevice.x) * transfer.progress}
                cy={fromDevice.y + (toDevice.y - fromDevice.y) * transfer.progress}
                r="8"
                fill="none"
                stroke={`rgba(${rgb}, 0.5)`}
                strokeWidth="2"
                opacity="0.6"
              >
                <animate attributeName="r" values="4;10;4" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Device nodes with enhanced visualization */}
        {devices.map((device, idx) => {
          const isActive = activeDevice === idx;
          const hasTransfer = dataTransfers.some(t => t.from === idx || t.to === idx);

          return (
            <g key={device.id}>
              {/* Device connection point */}
              <circle
                cx={device.x}
                cy={device.y}
                r={device.size}
                fill={device.type === "hub" ? `rgba(${rgb}, 0.9)` : "rgba(255, 255, 255, 0.15)"}
                stroke={device.type === "hub" ? `rgba(${rgb}, 1)` : `rgba(${rgb}, 0.5)`}
                strokeWidth="2"
                filter={isActive ? `url(#glow_${rgb})` : undefined}
              />

              {/* Active device pulse effect */}
              {isActive && (
                <>
                  <circle
                    cx={device.x}
                    cy={device.y}
                    r={device.size + 4}
                    fill="none"
                    stroke={`rgba(${rgb}, 0.6)`}
                    strokeWidth="1.5"
                  >
                    <animate attributeName="r" values={`${device.size + 2};${device.size + 8};${device.size + 2}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle
                    cx={device.x}
                    cy={device.y}
                    r={device.size + 2}
                    fill="none"
                    stroke={`rgba(${rgb}, 0.4)`}
                    strokeWidth="1"
                  >
                    <animate attributeName="r" values={`${device.size + 1};${device.size + 5};${device.size + 1}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Signal pulses */}
              {signalPulses.filter(p => p.deviceId === idx).map(pulse => (
                <circle
                  key={pulse.id}
                  cx={device.x}
                  cy={device.y}
                  r={pulse.radius}
                  fill="none"
                  stroke={`rgba(${rgb}, ${pulse.opacity * 0.4})`}
                  strokeWidth="1"
                >
                  <animate attributeName="r" values={`${device.size};${device.size + 12};${device.size}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values={`${pulse.opacity};0;${pulse.opacity}`} dur="3s" repeatCount="indefinite" />
                </circle>
              ))}

              {/* Device icon or logo */}
              {device.isLogo ? (
                <motion.image
                  href="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/de91e6ec-9fc3-420d-8ad7-b4611d07df18/11d2e8bb29ffd87b97acaf91062127ec.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1780481283&Signature=9cX0hdhlwdtSxf81ssQjeeJhMFI="
                  x={device.x - 6}
                  y={device.y - 6}
                  width="12"
                  height="12"
                  animate={{
                    scale: isActive ? [1, 1.15, 1] : [1, 1.08, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  style={{ filter: isActive ? `url(#glow_${rgb})` : undefined }}
                />
              ) : (
                <motion.text
                  x={device.x}
                  y={device.y}
                  textAnchor="middle"
                  dy="6"
                  fontSize="12"
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  {device.icon}
                </motion.text>
              )}

              {/* Device label for active devices */}
              {isActive && (
                <motion.text
                  x={device.x}
                  y={device.y}
                  textAnchor="middle"
                  dy={device.type === "hub" ? "-10" : "-8"}
                  fontSize="5"
                  fill={`rgba(${rgb}, 0.9)`}
                  className="font-mono font-bold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {device.name.toUpperCase()}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Network statistics */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
        <motion.div
          className="font-mono text-[9px] tracking-wider flex items-center gap-2"
          style={{ color: `rgba(${rgb}, 0.9)` }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: `rgba(${rgb}, 0.9)` }}
            animate={{
              scale: [1, 1.4, 1],
              boxShadow: [
                `0 0 0px rgba(${rgb}, 0)`,
                `0 0 12px rgba(${rgb}, 0.5)`,
                `0 0 0px rgba(${rgb}, 0)`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          ACTIVE NETWORK
        </motion.div>
        <motion.div
          className="font-mono text-[8px] tracking-wider opacity-80"
          style={{ color: `rgba(${rgb}, 0.85)` }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {devices.length} NODES
        </motion.div>
      </div>

      {/* Active connection indicator */}
      <motion.div
        className="absolute top-5 left-5 font-mono text-[8px] tracking-wider flex items-center gap-2"
        style={{ color: `rgba(${rgb}, 0.85)` }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: `rgba(${rgb}, 0.9)` }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {dataTransfers.length} DATA STREAMS
      </motion.div>

      {/* Device types indicator */}
      <motion.div
        className="absolute top-5 right-5 font-mono text-[7px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.8)` }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        SENSORS • CLIENTS • HUB
      </motion.div>

      {/* Data throughput indicator */}
      <motion.div
        className="absolute bottom-5 right-5 font-mono text-[7px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.8)` }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          animate={{
            textShadow: [
              `0 0 6px rgba(${rgb}, 0.3)`,
              `0 0 12px rgba(${rgb}, 0.5)`,
              `0 0 6px rgba(${rgb}, 0.3)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          847 MB/s
        </motion.span>
        {' '}THROUGHPUT
      </motion.div>
    </div>
  );
}

// Enhanced rotating globe with more dynamic effects
function RotatingGlobe({ tone }: { tone: keyof typeof toneRgb }) {
  const [rotationPhase, setRotationPhase] = useState(0);
  const rgb = toneRgb[tone];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multi-layer animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(${rgb}, 0.25) 0%, rgba(${rgb}, 0.08) 40%, transparent 75%)` }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Outer rotating dots layer */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * 360;
          const radius = 26 + Math.random() * 12;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: `rgba(${rgb}, ${0.4 + Math.random() * 0.3})`,
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          );
        })}
      </motion.div>

      {/* Counter-rotating middle layer */}
      <motion.div
        className="absolute inset-4"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(14)].map((_, i) => {
          const angle = (i / 14) * 360;
          const radius = 16 + Math.random() * 8;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: `rgba(${rgb}, 0.7)`,
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          );
        })}
      </motion.div>

      {/* Inner rotating layer */}
      <motion.div
        className="absolute inset-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * 360;
          const radius = 8 + Math.random() * 4;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                backgroundColor: `rgba(${rgb}, 0.9)`,
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                scale: [1, 3, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </motion.div>

      {/* Enhanced center pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-28 h-28 rounded-full"
          style={{ background: `rgba(${rgb}, 0.4)` }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ background: `rgba(${rgb}, 0.6)` }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.7, 0.95, 0.7],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 10 }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-full"
          style={{ background: `rgba(${rgb}, 0.8)` }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Enhanced center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-6xl font-bold text-foreground mb-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            100K+
          </motion.div>
          <motion.div
            className="text-base text-muted-foreground font-semibold tracking-wide"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            DEVICES
          </motion.div>
          <motion.div
            className="text-xs text-muted-foreground mt-2 font-mono tracking-wider"
            style={{ color: `rgba(${rgb}, 0.9)` }}
            animate={{ opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            GLOBALLY CONNECTED
          </motion.div>
        </div>
      </div>

      {/* Enhanced orbital rings */}
      <motion.div
        className="absolute inset-0 border-2 border-dashed rounded-full"
        style={{ borderColor: `rgba(${rgb}, 0.3)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-3 border border-dashed rounded-full"
        style={{ borderColor: `rgba(${rgb}, 0.2)` }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 border border-dotted rounded-full opacity-60"
        style={{ borderColor: `rgba(${rgb}, 0.15)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Connection lines */}
      <motion.div
        className="absolute top-8 right-8 font-mono text-[8px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.8)` }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        WORLDWIDE
      </motion.div>
    </div>
  );
}

// Enhanced analytics dashboard with dynamic data
function AnalyticsDashboard({ tone }: { tone: keyof typeof toneRgb }) {
  const [activeMetric, setActiveMetric] = useState(0);
  const [liveData, setLiveData] = useState([60, 60, 99]);
  const rgb = toneRgb[tone];

  const metrics = [
    { label: "Predictive", value: "60%", icon: "📈", color: "rgba(59, 130, 246, 0.9)" },
    { label: "Automated", value: "60%", icon: "⚡", color: "rgba(139, 92, 246, 0.9)" },
    { label: "Real-time", value: "99%", icon: "🔄", color: "rgba(16, 185, 129, 0.9)" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live data changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map((val, i) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(0, Math.min(100, val + change));
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multi-layer animated background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 70% 30%, rgba(${rgb}, 0.18) 0%, transparent 65%)` }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 30% 80%, rgba(${rgb}, 0.12) 0%, transparent 60%)` }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
      />

      {/* Enhanced animated waveform */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`waveGradient_${tone}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`rgba(${rgb}, 0.3)`} />
            <stop offset="100%" stopColor={`rgba(${rgb}, 0)`} />
          </linearGradient>
        </defs>

        {/* Multiple flowing waves - reduced intensity */}
        {[0, 1, 2].map((wave) => (
          <motion.path
            key={wave}
            d={`M0 ${72 + wave * 4} Q25 ${57 + wave * 2} 50 ${47 + wave * 1} T100 ${32 + wave * 3} L100 100 L0 100 Z`}
            fill={`rgba(${rgb}, ${0.18 - wave * 0.03})`}
            animate={{
              d: [
                `M0 ${72 + wave * 4} Q25 ${57 + wave * 2} 50 ${47 + wave * 1} T100 ${32 + wave * 3} L100 100 L0 100 Z`,
                `M0 ${67 + wave * 4} Q25 ${52 + wave * 2} 50 ${42 + wave * 1} T100 ${27 + wave * 3} L100 100 L0 100 Z`,
                `M0 ${72 + wave * 4} Q25 ${57 + wave * 2} 50 ${47 + wave * 1} T100 ${32 + wave * 3} L100 100 L0 100 Z`
              ]
            }}
            transition={{ duration: 8 + wave * 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Floating metrics display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-7xl font-bold text-foreground mb-3"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {metrics[activeMetric].value}
          </motion.div>
          <motion.div
            className="text-lg text-muted-foreground font-semibold tracking-wide"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {metrics[activeMetric].label}
          </motion.div>
          <motion.div
            className="text-5xl mt-4"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {metrics[activeMetric].icon}
          </motion.div>
        </div>
      </div>

      {/* Enhanced data flow indicators */}
      <div className="absolute bottom-10 left-8 right-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            {metrics.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-2 rounded-full relative"
                animate={{ scale: idx === activeMetric ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: idx === activeMetric ? `rgba(${rgb}, 0.95)` : `rgba(${rgb}, 0.25)`
                  }}
                  animate={{
                    width: idx === activeMetric ? ["100%", "100%"] : "30%"
                  }}
                  transition={{ duration: 0.8 }}
                />
                {idx === activeMetric && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: `rgba(${rgb}, 0.3)` }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="font-mono text-[9px] tracking-wider font-semibold"
            style={{ color: `rgba(${rgb}, 0.9)` }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE ANALYTICS
          </motion.div>
        </div>

        {/* Live data simulation */}
        <div className="flex justify-between items-center">
          <motion.div
            className="font-mono text-[8px] tracking-wider"
            style={{ color: `rgba(${rgb}, 0.7)` }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            UPDATING REAL-TIME
          </motion.div>
          <motion.div
            className="font-mono text-[8px] tracking-wider"
            style={{ color: `rgba(${rgb}, 0.8)` }}
          >
            {liveData[activeMetric]}% ACCURACY
          </motion.div>
        </div>
      </div>

      {/* Top indicator */}
      <motion.div
        className="absolute top-8 left-8 font-mono text-[8px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.8)` }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        AI POWERED
      </motion.div>
    </div>
  );
}

// Enhanced metrics dashboard with live monitoring
function MetricsDashboard({ tone }: { tone: keyof typeof toneRgb }) {
  const [systemStatus, setSystemStatus] = useState("OPTIMAL");
  const rgb = toneRgb[tone];

  const stats = [
    { label: "Devices", value: "100K+", icon: "📡", status: "+12%" },
    { label: "Uptime", value: "99.99%", icon: "⏱️", status: "+0.1%" },
    { label: "Response", value: "<50ms", icon: "🚀", status: "-15%" }
  ];

  useEffect(() => {
    const statuses = ["OPTIMAL", "EXCELLENT", "PERFECT"];
    const interval = setInterval(() => {
      setSystemStatus(prev => {
        const currentIndex = statuses.indexOf(prev);
        return statuses[(currentIndex + 1) % statuses.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multi-layer background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 30% 70%, rgba(${rgb}, 0.18) 0%, transparent 65%)` }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 70% 30%, rgba(${rgb}, 0.12) 0%, transparent 60%)` }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      {/* Enhanced animated progress rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {stats.map((stat, i) => {
          const angle = (i * 120 + 45) * (Math.PI / 180);
          const x = 50 + 26 * Math.cos(angle);
          const y = 50 + 26 * Math.sin(angle);
          const progress = [87, 94, 62][i];

          return (
            <g key={i}>
              {/* Background circle */}
              <circle
                cx={x}
                cy={y}
                r="16"
                fill="none"
                stroke={`rgba(${rgb}, 0.15)`}
                strokeWidth="3"
              />
              {/* Progress circle with glow */}
              <motion.circle
                cx={x}
                cy={y}
                r="16"
                fill="none"
                stroke={`rgba(${rgb}, 0.8)`}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: progress / 100 }}
                transition={{ duration: 2, delay: i * 0.2 }}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  transform: `rotate(-90deg)`,
                }}
              />
              {/* Progress ring glow */}
              <motion.circle
                cx={x}
                cy={y}
                r="16"
                fill="none"
                stroke={`rgba(${rgb}, 0.4)`}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: progress / 100 }}
                transition={{ duration: 2, delay: i * 0.2 }}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  transform: `rotate(-90deg)`,
                  opacity: 0.3
                }}
              />
              {/* Icon */}
              <motion.text
                x={x}
                y={y}
                textAnchor="middle"
                dy="6"
                fontSize="12"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              >
                {stat.icon}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Enhanced center stats display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl font-bold text-foreground mb-3"
            animate={{
              textShadow: [
                `0 0 30px rgba(${rgb}, 0.5)`,
                `0 0 60px rgba(${rgb}, 0.8)`,
                `0 0 30px rgba(${rgb}, 0.5)`
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            99.99%
          </motion.div>
          <motion.div
            className="text-base text-muted-foreground font-semibold tracking-wide"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            System Health
          </motion.div>
          <motion.div
            className="text-sm font-mono mt-2 tracking-wider"
            style={{ color: `rgba(${rgb}, 0.9)` }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {systemStatus}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating stat labels */}
      {stats.map((stat, i) => {
        const angle = (i * 120 + 45) * (Math.PI / 180);
        const x = 50 + 26 * Math.cos(angle);
        const y = 50 + 26 * Math.sin(angle);
        const labelX = 50 + 46 * Math.cos(angle);
        const labelY = 50 + 46 * Math.sin(angle);

        return (
          <motion.div
            key={i}
            className="absolute font-mono text-[9px] tracking-wider font-semibold"
            style={{
              left: `${labelX}%`,
              top: `${labelY}%`,
              color: `rgba(${rgb}, 0.95)`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: [0.75, 1, 0.75],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6
            }}
          >
            {stat.label.toUpperCase()}
          </motion.div>
        );
      })}

      {/* Enhanced status indicators */}
      <motion.div
        className="absolute bottom-8 right-8 font-mono text-[9px] tracking-wider font-semibold"
        style={{ color: `rgba(${rgb}, 0.9)` }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚡
        </motion.span>
        {' '}OPTIMIZED
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 flex items-center gap-2 font-mono text-[9px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.85)` }}
        animate={{ opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: `rgba(${rgb}, 0.9)` }}
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              `0 0 0px rgba(${rgb}, 0)`,
              `0 0 12px rgba(${rgb}, 0.5)`,
              `0 0 0px rgba(${rgb}, 0)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        ALL SYSTEMS GO
      </motion.div>

      {/* Performance indicator */}
      <motion.div
        className="absolute top-8 left-8 font-mono text-[8px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.8)` }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        MONITORING ACTIVE
      </motion.div>

      {/* Stats changes */}
      <motion.div
        className="absolute top-8 right-8 font-mono text-[8px] tracking-wider"
        style={{ color: `rgba(${rgb}, 0.75)` }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        24/7 UPTIME
      </motion.div>
    </div>
  );
}

// Individual Bento Card Component
function BentoCard({
  title,
  description,
  layout,
  type,
  tone
}: {
  title: string;
  description: string;
  layout: "large" | "small";
  type: string;
  tone: keyof typeof toneRgb;
}) {
  const rgb = toneRgb[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden h-full",
        "bg-surface border border-border shadow-lg",
        "hover:shadow-2xl transition-all duration-500",
        "hover:border-border-strong"
      )}
      style={{
        boxShadow: `0 4px 24px -4px rgba(${rgb}, 0.15), 0 0 0 1px rgba(${rgb}, 0.05)`
      }}
    >
      {/* Enhanced animated background effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, rgba(${rgb}, 0.15) 0%, transparent 75%)`,
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full p-6 gap-4">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
              style={{ background: `rgba(${rgb}, 0.15)` }}
            >
              <svg className="w-5 h-5" style={{ color: `rgba(${rgb}, 0.9)` }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground leading-tight">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Seamless animated content */}
        <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden border border-border/50">
          {type === "wired-connections" && <WiredConnections tone={tone} />}
          {type === "rotating-globe" && <RotatingGlobe tone={tone} />}
          {type === "analytics-dashboard" && <AnalyticsDashboard tone={tone} />}
          {type === "metrics-dashboard" && <MetricsDashboard tone={tone} />}
        </div>
      </div>
    </motion.div>
  );
}

// Main Bento Grid Component
export function BentoShowcaseAlt() {
  return (
    <section className="py-24 px-4 bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-grid-strong opacity-30" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built For Scale. Designed for You.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Advanced IoT infrastructure that grows with your business
          </p>
        </motion.div>

        {/* Bento Grid - First Row: 65% + 35%, Second Row: 35% + 65% */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[360px]">
          {/* First Row: 65% (2 cols) + 35% (1 col) */}
          <div className="md:col-span-2">
            <BentoCard {...bentoItems[0]} />
          </div>
          <div className="md:col-span-1">
            <BentoCard {...bentoItems[1]} />
          </div>

          {/* Second Row: 35% (1 col) + 65% (2 cols) */}
          <div className="md:col-span-1">
            <BentoCard {...bentoItems[2]} />
          </div>
          <div className="md:col-span-2">
            <BentoCard {...bentoItems[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}