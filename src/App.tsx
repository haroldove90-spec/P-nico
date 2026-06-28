import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Navigation, 
  Phone, 
  Users, 
  ChevronRight, 
  Eye, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  Plus, 
  X, 
  AlertTriangle, 
  Smartphone, 
  Code, 
  Activity, 
  Map, 
  ArrowRight,
  Battery,
  Wifi,
  Radio,
  FileCode2,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// El código fuente exacto de PanicScreen.tsx para mostrar en el inspector de código
const reactNativeCode = `import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  Easing,
  StatusBar,
  SafeAreaView
} from 'react-native';
// Usamos Lucide para React Native si está disponible, o iconos nativos de Expo
import { ShieldAlert, Navigation, Users } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function PanicScreen() {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCompanionActive, setIsCompanionActive] = useState(false);
  
  // Animaciones para pulsación del botón y radar GPS
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const radarAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de respiración constante para el botón central de pánico
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Animación de onda de radar para el indicador GPS
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ).start();
  }, []);

  // Manejo de la cuenta regresiva al presionar pánico
  useEffect(() => {
    let timer;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  const handlePanicPress = () => {
    if (isActive) {
      // Cancelar alerta
      setIsActive(false);
      setCountdown(5);
    } else {
      setIsActive(true);
    }
  };

  // Interpolación de la escala y opacidad del radar GPS
  const radarScale = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const radarOpacity = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fondo con degradado ambiental premium */}
      <View style={styles.backgroundGradient} />

      {/* HEADER / INDICADOR DE ESTADO EN VERDE NEÓN */}
      <View style={styles.header}>
        <View style={styles.protectedBadge}>
          {/* Icono GPS latiendo / radar */}
          <View style={styles.gpsContainer}>
            <Animated.View 
              style={[
                styles.radarWave, 
                { transform: [{ scale: radarScale }], opacity: radarOpacity }
              ]} 
            />
            <View style={[styles.pulse, isActive && styles.pulseAlert]} />
          </View>
          
          <Text style={[styles.protectedText, isActive && styles.protectedTextAlert]}>
            {isActive ? 'SISTEMA ALERTA ACTIVA (' + countdown + 's)' : 'ESTADO: PROTEGIDO'}
          </Text>
        </View>
        <Text style={styles.locationSubtitle}>Hidalgo, MX • GPS Activo</Text>
      </View>

      {/* BOTÓN DE PÁNICO CENTRAL DE ALTO IMPACTO (SOS) */}
      <View style={styles.panicSection}>
        {/* Glow exterior de respiración */}
        <Animated.View style={[
          styles.panicGlow,
          isActive ? styles.panicGlowAlert : styles.panicGlowNormal,
          { transform: [{ scale: pulseAnim }] }
        ]} />

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={handlePanicPress}
            style={[
              styles.panicButton,
              isActive ? styles.panicButtonAlert : styles.panicButtonNormal
            ]}
          >
            {isActive ? (
              <ShieldAlert size={48} color="#FFFFFF" strokeWidth={2.5} style={{ marginBottom: 4 }} />
            ) : (
              <Text style={styles.panicButtonText}>S.O.S.</Text>
            )}
            
            <Text style={styles.panicButtonSubtext}>
              {isActive ? 'CANCELAR' : 'PRESIONAR'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* TARJETA DE ACCIONES INFERIOR INTEGRADA */}
      <View style={styles.bottomSection}>
        
        {/* Sección "Acompáñame" */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.label}>Acompáñame</Text>
            <Text style={[styles.statusToggleText, isCompanionActive && styles.statusToggleTextActive]}>
              {isCompanionActive ? 'ON' : 'OFF'}
            </Text>
          </View>
          
          {/* Slider Track Deslizable simulado con toggle táctil */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => setIsCompanionActive(!isCompanionActive)}
            style={styles.sliderTrack}
          >
            <Animated.View style={[
              styles.sliderHandle,
              isCompanionActive ? styles.sliderHandleActive : styles.sliderHandleInactive
            ]}>
              <Navigation size={16} color="#000000" />
            </Animated.View>
            <Text style={styles.sliderText}>
              {isCompanionActive ? 'Ruta activa monitoreada' : 'Desliza para monitoreo real'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sección "Contactos Seguros" */}
        <View style={styles.card}>
          <Text style={styles.label}>Contactos Seguros</Text>
          
          <View style={styles.contactsRow}>
            {/* Contacto 1: Mamá Papá */}
            <View style={[styles.contactCircle, { backgroundColor: '#FF9500' }]}>
              <Text style={styles.contactInitials}>MP</Text>
            </View>

            {/* Contacto 2: Rosa Julia */}
            <View style={[styles.contactCircle, { backgroundColor: '#5856D6' }]}>
              <Text style={styles.contactInitials}>RJ</Text>
            </View>

            {/* Contacto 3: Alerta de confianza */}
            <View style={[styles.contactCircle, { backgroundColor: '#FF2D55' }]}>
              <Text style={styles.contactInitials}>AL</Text>
            </View>

            {/* Botón Añadir Contacto */}
            <TouchableOpacity style={styles.addContactCircle} activeOpacity={0.7}>
              <Users size={20} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

// Cálculo del tamaño responsivo del botón central basándose en el ancho de la pantalla
const buttonSize = Math.min(width * 0.55, 220);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#080808',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.03,
    paddingHorizontal: 24,
  },
  protectedBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gpsContainer: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF88',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  pulseAlert: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
  },
  radarWave: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 255, 136, 0.4)',
  },
  protectedText: {
    color: '#00FF88',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  protectedTextAlert: {
    color: '#FF3B30',
  },
  locationSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  panicSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  panicGlow: {
    position: 'absolute',
    width: buttonSize * 1.4,
    height: buttonSize * 1.4,
    borderRadius: (buttonSize * 1.4) / 2,
  },
  panicGlowNormal: {
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
  },
  panicGlowAlert: {
    backgroundColor: 'rgba(255, 59, 48, 0.25)',
  },
  panicButton: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 12,
  },
  panicButtonNormal: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  panicButtonAlert: {
    backgroundColor: '#D0021B',
    shadowColor: '#D0021B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },
  panicButtonText: {
    fontWeight: '900',
    fontSize: 48,
    letterSpacing: -1,
    color: '#FFFFFF',
  },
  panicButtonSubtext: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: -4,
    opacity: 0.8,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomSection: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: height * 0.05,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '700',
  },
  statusToggleText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 11,
    fontWeight: '700',
  },
  statusToggleTextActive: {
    color: '#00FF88',
  },
  sliderTrack: {
    height: 48,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    position: 'relative',
    marginTop: 8,
  },
  sliderHandle: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  sliderHandleActive: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  sliderHandleInactive: {
    alignSelf: 'flex-start',
  },
  sliderText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.4,
    color: '#FFFFFF',
    pointerEvents: 'none',
  },
  contactsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  contactCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactInitials: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  addContactCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});`;

interface Contact {
  id: string;
  name: string;
  phone: string;
  initials: string;
}

interface LogEntry {
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export default function App() {
  // Estados para la Simulación del Teléfono
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [companionActive, setCompanionActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(94);
  const [simulatedLat, setSimulatedLat] = useState(20.1018);
  const [simulatedLng, setSimulatedLng] = useState(-98.7592);
  const [activeTab, setActiveTab] = useState<'code' | 'sim' | 'info'>('code');
  const [copied, setCopied] = useState(false);
  
  // Lista de Contactos de Confianza Editables
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Mamá', phone: '771 123 4567', initials: 'MÁ' },
    { id: '2', name: 'Papá', phone: '771 987 6543', initials: 'PA' },
    { id: '3', name: 'Esposa', phone: '771 555 1212', initials: 'ES' },
  ]);
  
  // Agregar un contacto modal
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // Logs del Centro de Emergencias C4 Hidalgo
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '12:51:33', type: 'info', message: 'Sistema de Enlace Ciudadano Hidalgo C5i en línea.' },
    { time: '12:51:34', type: 'success', message: 'Conectado a nodo satelital Pachuca Centro.' },
  ]);

  // Audio oscilador simulado para sirena en web
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Intervalo de GPS simulado
  useEffect(() => {
    const gpsInterval = setInterval(() => {
      // Pequeño desplazamiento simulando movimiento
      setSimulatedLat(prev => prev + (Math.random() - 0.5) * 0.0002);
      setSimulatedLng(prev => prev + (Math.random() - 0.5) * 0.0002);
    }, 4000);

    return () => clearInterval(gpsInterval);
  }, []);

  // Simulación de cuenta regresiva para el Botón de Pánico
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (panicActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        addLog({
          time: new Date().toLocaleTimeString(),
          type: 'warning',
          message: `Transmitiendo ráfaga de datos en ${countdown - 1}s... GPS: ${simulatedLat.toFixed(5)}°, ${simulatedLng.toFixed(5)}°`
        });
        
        // Efecto de sonido de bip si está activo
        if (soundEnabled) {
          playBeep(880, 0.15);
        }
      }, 1000);
    } else if (panicActive && countdown === 0) {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'error',
        message: '🔴 ALERTA DE IMPACTO CONFIRMADA. Despachando patrullas más cercanas del C5i Hidalgo.'
      });
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: '🚓 Unidad Hidalgo-24 despachada con coordenadas exactas.'
      });
      if (soundEnabled) {
        startSiren();
      }
    }

    return () => {
      clearTimeout(timer);
      if (countdown === 0 && !panicActive) {
        stopSiren();
      }
    };
  }, [panicActive, countdown]);

  const addLog = (log: LogEntry) => {
    setLogs(prev => [log, ...prev].slice(0, 50));
  };

  const handlePanicToggle = () => {
    if (panicActive) {
      setPanicActive(false);
      setCountdown(5);
      stopSiren();
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: 'Alerta cancelada por el usuario. Estado: Protegido restablecido.'
      });
    } else {
      setPanicActive(true);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'warning',
        message: '⚠️ BOTÓN DE PÁNICO PRESIONADO. Iniciando protocolo de emergencia de 5s.'
      });
      if (soundEnabled) {
        playBeep(440, 0.3);
      }
    }
  };

  const handleCompanionToggle = () => {
    const newState = !companionActive;
    setCompanionActive(newState);
    if (newState) {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: `Servicio 'Acompáñame' activado. Monitoreo pasivo iniciado en Pachuca Centro.`
      });
    } else {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: `Servicio 'Acompáñame' desactivado de forma segura.`
      });
    }
  };

  // Sonidos simulados por Web Audio API
  const playBeep = (frequency: number, duration: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio no soportado en este navegador');
    }
  };

  const startSiren = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (oscRef.current) return; // ya sonando

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      
      // Simular modulación de frecuencia de sirena policial
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 2; // 2 veces por segundo
      lfoGain.gain.value = 150; // oscilar entre 350Hz y 650Hz
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      lfo.start();
      osc.start();
      
      oscRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.log('Siren audio error');
    }
  };

  const stopSiren = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e){}
      oscRef.current = null;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reactNativeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    const initials = newContactName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newContactName,
      phone: newContactPhone,
      initials: initials || 'N'
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContact(false);

    addLog({
      time: new Date().toLocaleTimeString(),
      type: 'info',
      message: `Contacto '${newContactName}' registrado como enlace de confianza.`
    });
  };

  const removeContact = (id: string, name: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    addLog({
      time: new Date().toLocaleTimeString(),
      type: 'info',
      message: `Contacto '${name}' removido de tus enlaces.`
    });
  };

  return (
    <div id="panic_app_root" className="min-h-screen bg-[#080808] text-slate-100 font-sans antialiased overflow-x-hidden flex flex-col selection:bg-brand-red selection:text-white">
      
      {/* HEADER DE LA WEB */}
      <header id="web_header" className="border-b border-white/5 bg-[#080808]/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="vibrant-panic-gradient p-2 rounded-xl shadow-neon-red">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Hidalgo Alerta Ciudadana
            </h1>
            <p className="text-xs text-slate-400">Diseño UI/UX e Interfaz Móvil de Alto Impacto para Expo</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Indicadores de sistema simulados en la web */}
          <div className="hidden md:flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-white/5 text-xs text-slate-400 font-mono">
            <Radio className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            <span>NODO: C5i_Pachuca_01</span>
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            title={soundEnabled ? "Silenciar alarmas de prueba" : "Activar sonido de prueba"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
        </div>
      </header>

      {/* DISEÑO PRINCIPAL EN DOS COLUMNAS */}
      <main id="web_main" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: EL TELÉFONO INTERACTIVO */}
        <section id="phone_column" className="lg:col-span-5 flex flex-col items-center justify-center">
          
          <div className="relative mx-auto bg-[#080808] p-3.5 rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border-8 border-[#1F1F1F] ring-1 ring-white/10 max-w-[360px] w-full aspect-[9/19] overflow-hidden flex flex-col select-none">
            
            {/* Isla Dinámica / Parlante superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-[#000000] rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-[#1F1F1F] rounded-full" />
            </div>

            {/* Barra de Estado Nativa (Batería, Wifi, Hora) */}
            <div className="flex justify-between items-center px-6 pt-2 pb-1 text-slate-400 text-[11px] font-mono font-medium z-40">
              <span>12:51</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-300" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px]">{batteryLevel}%</span>
                  <Battery className="w-4.5 h-3 text-slate-300" />
                </div>
              </div>
            </div>

            {/* CONTENIDO DE LA PANTALLA MÓVIL */}
            <div className="flex-1 flex flex-col justify-between relative px-4 pb-6 pt-4 rounded-[36px] vibrant-bg-gradient overflow-hidden">
              
              {/* Degradados ambientales de fondo en el móvil */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03)_0%,transparent_70%)] pointer-events-none" />
              
              {/* SECCIÓN SUPERIOR MINIMALISTA */}
              <div className="z-10 text-center mt-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full vibrant-protected-badge backdrop-blur-md shadow-neon-green/10 transition-colors duration-300">
                  <div className="relative w-2.5 h-2.5 flex items-center justify-center">
                    {/* Radar latiendo */}
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${panicActive ? 'bg-brand-red animate-ping' : 'bg-[#00FF88] animate-ping'}`} />
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${panicActive ? 'bg-brand-red' : 'bg-[#00FF88]'}`} />
                  </div>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Estado: <span className={panicActive ? 'text-brand-red font-bold' : 'text-[#00FF88] font-bold'}>
                      {panicActive ? `ALERTA ENVIADA (${countdown}s)` : 'Protegido'}
                    </span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider mt-2 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500 animate-pulse" />
                  PACHUCA, HGO • {simulatedLat.toFixed(4)}° N, {simulatedLng.toFixed(4)}° W
                </p>
              </div>

              {/* BOTÓN DE PÁNICO CENTRAL */}
              <div className="flex-1 flex flex-col justify-center items-center relative z-10 my-8">
                
                {/* Ondas expansivas de vibración si está activo */}
                {panicActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-48 h-48 rounded-full border-2 border-brand-red/30 animate-pulse-ring" />
                    <div className="absolute w-64 h-64 rounded-full border border-brand-red/10 animate-pulse-ring" style={{ animationDelay: '0.6s' }} />
                  </div>
                )}

                <motion.button
                  id="central_panic_button"
                  whileTap={{ scale: 0.94 }}
                  onClick={handlePanicToggle}
                  className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
                    panicActive 
                      ? 'bg-gradient-to-br from-brand-red to-brand-fire border-4 border-brand-fire shadow-neon-red-lg' 
                      : 'vibrant-panic-gradient border-4 border-[#FF3B30]/40 hover:border-[#FF3B30]/70 shadow-neon-red-lg hover:scale-105'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {panicActive ? (
                      <motion.div
                        key="alert-icon"
                        initial={{ scale: 0.6, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.6 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <ShieldAlert className="w-14 h-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-bounce" />
                        <span className="text-2xl font-black font-display tracking-widest text-white mt-2">
                          {countdown > 0 ? countdown : 'C5i'}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="shield-icon"
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.6 }}
                        className="flex flex-col items-center justify-center text-center px-4"
                      >
                        <Shield className="w-14 h-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]" />
                        <span className="text-2xl font-black font-display tracking-widest text-white mt-2">
                          S.O.S.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="absolute bottom-4 text-[9px] font-bold text-white/70 text-center px-3 tracking-wide">
                    {panicActive ? 'PRESIONA PARA CANCELAR' : 'PRESIONAR'}
                  </span>
                </motion.button>
                
                {/* Glow ambiental detrás del botón */}
                <div className={`absolute w-36 h-36 rounded-full blur-3xl opacity-35 -z-10 transition-colors duration-500 ${panicActive ? 'bg-[#FF3B30]' : 'bg-[#D0021B]'}`} />
              </div>

              {/* TARJETA FLOTANTE INFERIOR */}
              <div className="bg-white/[0.03] backdrop-blur-[10px] border-t border-white/10 shadow-2xl rounded-[32px] p-4 z-10">
                
                {/* Sección Acompáñame */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-[#FF9500]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs font-bold text-white leading-tight font-display">Acompáñame</h3>
                      <p className="text-[9px] text-slate-400 mt-0.5">Monitoreo de ruta en vivo</p>
                    </div>
                  </div>

                  {/* Toggle Slider */}
                  <button 
                    onClick={handleCompanionToggle}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${companionActive ? 'bg-[#00FF88]' : 'bg-white/10'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${companionActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="h-[1px] bg-white/5 my-3" />

                {/* Sección Contactos de Confianza */}
                <div className="text-left">
                  <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2.5 font-display">
                    Contactos Seguros
                  </h4>
                  
                  <div className="flex items-center gap-2.5 justify-between">
                    {contacts.slice(0, 3).map((contact, index) => {
                      const colors = [
                        { bg: 'rgba(255, 149, 0, 0.1)', border: 'rgba(255, 149, 0, 0.3)', text: '#FF9500' },
                        { bg: 'rgba(88, 86, 214, 0.1)', border: 'rgba(88, 86, 214, 0.3)', text: '#5856D6' },
                        { bg: 'rgba(255, 45, 85, 0.1)', border: 'rgba(255, 45, 85, 0.3)', text: '#FF2D55' },
                      ];
                      const color = colors[index % colors.length];

                      return (
                        <div key={contact.id} className="flex flex-col items-center w-12 relative group">
                          <div 
                            style={{ backgroundColor: color.bg, borderColor: color.border }}
                            className="w-10 h-10 rounded-full border flex items-center justify-center relative shadow-sm"
                          >
                            <span style={{ color: color.text }} className="text-xs font-bold">{contact.initials}</span>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00FF88] border-2 border-[#080808]" />
                          </div>
                          <span className="text-[9px] text-slate-400 truncate w-full text-center mt-1.5 font-medium">
                            {contact.name}
                          </span>
                        </div>
                      );
                    })}

                    {/* Botón Gestionar */}
                    <button 
                      onClick={() => setActiveTab('sim')}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-dashed border-white/15 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-[7px] text-slate-500 mt-1 font-bold">Gestionar</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Barra de Home de iOS simulada */}
            <div className="h-4 flex items-end justify-center pb-1">
              <div className="w-28 h-1 bg-white/20 rounded-full" />
            </div>

          </div>

          <div className="mt-6 flex flex-col items-center text-center gap-1 px-4">
            <p className="text-xs text-slate-400">
              💡 <span className="font-semibold text-slate-200">Tip de diseño:</span> El gran botón central facilita presionar con una sola mano en emergencias. El borde circular de pánico tiene un radio extendido para mayor accesibilidad táctil.
            </p>
          </div>

        </section>

        {/* COLUMNA DERECHA: CONFIGURADOR / INSPECTOR DE CÓDIGO */}
        <section id="inspector_column" className="lg:col-span-7 bg-[#0f1115] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
          
          {/* Navegación por pestañas del panel de control */}
          <div className="flex bg-[#0a0c0f] border-b border-white/5 p-2">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'code' 
                  ? 'bg-brand-red/10 text-brand-red' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Código React Native (Expo)</span>
            </button>

            <button
              onClick={() => setActiveTab('sim')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'sim' 
                  ? 'bg-brand-red/10 text-brand-red' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Simulador C5i & Contactos</span>
              {panicActive && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'info' 
                  ? 'bg-brand-red/10 text-brand-red' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Detalles UI/UX</span>
            </button>
          </div>

          {/* CONTENIDO DE PESTAÑAS */}
          <div className="flex-1 overflow-y-auto p-6 text-left">
            
            {/* PESTAÑA 1: CÓDIGO FUENTE DE REACT NATIVE */}
            {activeTab === 'code' && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-5 h-5 text-brand-red" />
                    <div>
                      <span className="text-xs font-mono text-slate-400">Ruta sugerida:</span>
                      <h4 className="text-sm font-bold text-white font-mono">/screens/PanicScreen.tsx</h4>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 rounded-xl text-xs font-bold text-slate-200 transition-all shadow-md cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brand-green" />
                        <span className="text-brand-green">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 bg-[#050608] rounded-2xl p-4 border border-white/5 overflow-auto font-mono text-xs text-slate-300 leading-relaxed shadow-inner max-h-[500px]">
                  <pre>{reactNativeCode}</pre>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3">
                  <div className="p-2 rounded-lg bg-brand-red/10 text-brand-red h-fit">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Este componente está optimizado para Expo y React Native utilizando <strong className="text-slate-200 font-semibold">StyleSheet estándar</strong>, garantizando compatibilidad total con cualquier boilerplate de React Native listo para compilar sin configuraciones extras.
                  </p>
                </div>
              </div>
            )}

            {/* PESTAÑA 2: SIMULADOR DE INCIDENCIAS C5i & CONTACTOS */}
            {activeTab === 'sim' && (
              <div className="space-y-6">
                
                {/* Sección de Gestión de Contactos Seguros */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-red" />
                      Contactos de Confianza (Simulación de Agenda)
                    </h3>
                    <button 
                      onClick={() => setShowAddContact(true)}
                      className="px-2.5 py-1.5 bg-brand-red/10 text-brand-red hover:bg-brand-red/20 border border-brand-red/20 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Contacto</span>
                    </button>
                  </div>

                  {showAddContact && (
                    <form onSubmit={handleAddContact} className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nombre</label>
                        <input 
                          type="text" 
                          value={newContactName} 
                          onChange={(e) => setNewContactName(e.target.value)}
                          placeholder="Ej. Hermano" 
                          required
                          className="w-full bg-[#050608] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Teléfono</label>
                        <input 
                          type="tel" 
                          value={newContactPhone} 
                          onChange={(e) => setNewContactPhone(e.target.value)}
                          placeholder="Ej. 771 999 8888" 
                          required
                          className="w-full bg-[#050608] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddContact(false)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300"
                        >
                          Cancelar
                        </button>
                        <button 
                          type="submit" 
                          className="px-3 py-1.5 bg-brand-green/15 text-brand-green border border-brand-green/20 hover:bg-brand-green/25 rounded-lg text-xs font-bold"
                        >
                          Guardar
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {contacts.map(contact => (
                      <div key={contact.id} className="bg-[#13151a] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{contact.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{contact.phone}</p>
                        </div>
                        <button 
                          onClick={() => removeContact(contact.id, contact.name)}
                          className="text-slate-500 hover:text-brand-red p-1 rounded transition-colors"
                          title="Eliminar contacto"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-white/5" />

                {/* Consola de despachos C5i */}
                <div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-brand-red animate-pulse" />
                    Consola del Operador C4/C5i (Estado de Despacho del Hidalgo)
                  </h3>

                  <div className="bg-[#050608] rounded-2xl p-4 border border-white/5 h-[240px] overflow-y-auto font-mono text-xs space-y-2.5">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-2.5 items-start leading-relaxed border-b border-white/3 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">{log.time}</span>
                        <div className="flex-1">
                          {log.type === 'success' && <span className="text-brand-green font-bold">[ÉXITO] </span>}
                          {log.type === 'warning' && <span className="text-amber-500 font-bold">[SISTEMA] </span>}
                          {log.type === 'error' && <span className="text-brand-red font-bold">[CRÍTICO] </span>}
                          {log.type === 'info' && <span className="text-sky-400 font-bold">[INFO] </span>}
                          <span className="text-slate-300">{log.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* PESTAÑA 3: CRITERIOS DE DISEÑO UI/UX */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Principios de Diseño de Alerta de Alto Impacto</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    En una situación de peligro real, las capacidades cognitivas y motoras del usuario se ven reducidas significativamente por el estrés y la adrenalina. La UI del Botón de Pánico debe centrarse en la <strong className="text-slate-200 font-semibold">ley de Fitts</strong> y la accesibilidad instantánea.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-[#13151a] border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-brand-red">
                      <Shield className="w-5 h-5" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ergonomía de Emergencia</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      El botón de pánico central ocupa el 62% del ancho de la pantalla y se ubica exactamente en la zona de barrido natural del pulgar, asegurando que pueda ser presionado sin estirar la mano.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#13151a] border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-brand-red">
                      <Navigation className="w-5 h-5" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Acompáñame Compartido</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      La ruta segura de Acompáñame monitorea continuamente el GPS del ciudadano sin enviar patrullas de inmediato, permitiendo a familiares vigilar su trayecto con total discreción y paz mental.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#13151a] border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-brand-red">
                      <Radio className="w-5 h-5" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Modo Oscuro Profundo (Oled)</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      La paleta de color oscura (#08090c como base) no solo resalta el rojo neón de emergencia, sino que evita delatar al usuario en entornos de baja luminosidad (evitando iluminar su rostro).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#13151a] border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-brand-red">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Filtro Antierror</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      La cuenta regresiva de 5 segundos permite cancelar toques accidentales rápidamente sin generar falsos positivos ni saturar el centro de comando C5i de Hidalgo.
                    </p>
                  </div>

                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-tr from-brand-red/10 to-brand-fire/10 border border-brand-red/20">
                  <h4 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-brand-red" />
                    Tecnologías sugeridas para Producción
                  </h4>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-white">expo-location:</strong> Para el rastreo preciso de coordenadas de Hidalgo en segundo plano.</li>
                    <li><strong className="text-white">expo-haptics:</strong> Para emitir vibraciones táctiles críticas al activar el botón de pánico.</li>
                    <li><strong className="text-white">react-native-maps:</strong> Para renderizar mapas limpios con estilos oscuros personalizados.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Pie de página del panel de control */}
          <div className="bg-[#0a0c0f] border-t border-white/5 px-6 py-4 flex justify-between items-center text-xs text-slate-400">
            <span>© 2026 Seguridad Hidalgo • Alerta Móvil</span>
            <span className="font-mono text-[10px] text-slate-500">Versión UI 1.4.2</span>
          </div>

        </section>

      </main>

      {/* FOOTER GENERAL */}
      <footer id="web_footer" className="mt-auto border-t border-white/5 py-6 text-center text-xs text-slate-500">
        <p>Diseñado en el Entorno Seguro de Hidalgo. Desarrollado con React Native, Expo y Tailwind CSS para despliegues fluidos de seguridad pública.</p>
      </footer>

    </div>
  );
}
