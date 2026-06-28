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
  Cpu,
  CheckCircle2,
  Send,
  User,
  FileText,
  TrendingUp,
  LogOut,
  Camera,
  Mic,
  Lock,
  Unlock,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// React Native production code strings removed as requested to clean up the interface and focus 100% on the live responsive web application.
const reactNativeCode = `
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

const rolesHubCode = `import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  Easing,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
import { 
  ShieldAlert, 
  Navigation, 
  Users, 
  Activity, 
  Shield, 
  User, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Clock, 
  TrendingUp, 
  Radio, 
  FileText, 
  Send 
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type ActiveRole = 'ciudadano' | 'agente' | 'c4';

export default function RolesHubScreen() {
  const [activeRole, setActiveRole] = useState<ActiveRole>('ciudadano');
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [companionActive, setCompanionActive] = useState(false);
  const [agentActive, setAgentActive] = useState(true);
  const [alertAccepted, setAlertAccepted] = useState(false);
  const [closingReport, setClosingReport] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const radarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ).start();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (panicActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [panicActive, countdown]);

  const handlePanicPress = () => {
    setPanicActive(!panicActive);
    setCountdown(5);
  };

  const radarScale = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.4],
  });

  const radarOpacity = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const handleSubmitReport = () => {
    if (closingReport.trim()) {
      setReportSubmitted(true);
      setTimeout(() => {
        setClosingReport('');
        setReportSubmitted(false);
        setAlertAccepted(false);
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      
      <View style={styles.roleSelectorContainer}>
        <Text style={styles.hubTitle}>HIDALGO ALERTA HUB</Text>
        <Text style={styles.hubSubtitle}>Demostración Interactiva Multi-Rol</Text>
        
        <View style={styles.tabsWrapper}>
          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'ciudadano' && styles.roleTabActive]}
            onPress={() => setActiveRole('ciudadano')}
          >
            <User size={14} color={activeRole === 'ciudadano' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'ciudadano' && styles.roleTabTextActive]}>
              Ciudadano
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'agente' && styles.roleTabActive]}
            onPress={() => setActiveRole('agente')}
          >
            <Shield size={14} color={activeRole === 'agente' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'agente' && styles.roleTabTextActive]}>
              Agente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'c4' && styles.roleTabActive]}
            onPress={() => setActiveRole('c4')}
          >
            <Radio size={14} color={activeRole === 'c4' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'c4' && styles.roleTabTextActive]}>
              C4 Central
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeRole === 'ciudadano' && (
          <View style={styles.viewContainer}>
            <View style={styles.gpsIndicatorRow}>
              <View style={styles.protectedBadge}>
                <View style={styles.gpsIconContainer}>
                  <Animated.View style={[styles.radarWave, { transform: [{ scale: radarScale }], opacity: radarOpacity }]} />
                  <View style={[styles.pulseDot, panicActive ? styles.pulseDotAlert : styles.pulseDotNormal]} />
                </View>
                <Text style={styles.protectedText}>
                  Estado: <Text style={panicActive ? styles.textAlert : styles.textSuccess}>{panicActive ? 'Alerta Activa' : 'Protegido'}</Text>
                </Text>
              </View>
              <Text style={styles.locationLabel}>Pachuca, Hgo</Text>
            </View>

            <View style={styles.panicButtonSection}>
              <Animated.View style={[
                styles.glowBackdrop, 
                panicActive ? styles.glowBackdropAlert : styles.glowBackdropNormal,
                { transform: [{ scale: pulseAnim }] }
              ]} />
              
              <TouchableOpacity onPress={handlePanicPress} style={[styles.sosButton, panicActive ? styles.sosButtonAlert : styles.sosButtonNormal]}>
                <ShieldAlert size={54} color="#FFFFFF" />
                <Text style={styles.sosText}>S.O.S.</Text>
                <Text style={styles.sosSubtext}>
                  {panicActive ? 'PRESIONA PARA CANCELAR' : 'MANTÉN PRESIONADO PARA ENVIAR'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  roleSelectorContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#0B0C0E' },
  hubTitle: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1.5, textAlign: 'center' },
  hubSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 14 },
  tabsWrapper: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  roleTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 11 },
  roleTabActive: { backgroundColor: 'rgba(255, 59, 48, 0.15)', borderWidth: 1, borderColor: 'rgba(255, 59, 48, 0.3)' },
  roleTabText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.4)' },
  roleTabTextActive: { color: '#FFFFFF', fontWeight: '700' },
  scrollContent: { padding: 16 },
  viewContainer: { flexDirection: 'column', gap: 16 },
  gpsIndicatorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  protectedBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0, 255, 136, 0.08)', borderWidth: 1, borderColor: 'rgba(0, 255, 136, 0.2)', borderRadius: 99, paddingVertical: 6, paddingHorizontal: 12 },
  gpsIconContainer: { width: 10, height: 10, justifyContent: 'center', alignItems: 'center' },
  pulseDot: { width: 6, height: 6, borderRadius: 3 },
  pulseDotNormal: { backgroundColor: '#00FF88' },
  pulseDotAlert: { backgroundColor: '#FF3B30' },
  radarWave: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(0, 255, 136, 0.4)' },
  protectedText: { fontSize: 11, color: '#FFFFFF', fontWeight: '600' },
  textSuccess: { color: '#00FF88', fontWeight: '700' },
  textAlert: { color: '#FF3B30', fontWeight: '700' },
  locationLabel: { fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: '600' },
  panicButtonSection: { height: 200, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  glowBackdrop: { position: 'absolute', width: 180, height: 180, borderRadius: 90 },
  glowBackdropNormal: { backgroundColor: 'rgba(255, 59, 48, 0.07)' },
  glowBackdropAlert: { backgroundColor: 'rgba(255, 59, 48, 0.22)' },
  sosButton: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justify: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.1)' },
  sosButtonNormal: { backgroundColor: '#FF3B30' },
  sosButtonAlert: { backgroundColor: '#D0021B' },
  sosText: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  sosSubtext: { fontSize: 8, color: 'rgba(255,255,255,0.75)', textAlign: 'center', paddingHorizontal: 16 },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255, 149, 0, 0.1)', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  cardSubtitle: { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 },
  toggleSwitch: { width: 44, height: 24, borderRadius: 12, padding: 2, justifyContent: 'center' },
  toggleSwitchOn: { backgroundColor: '#00FF88' },
  toggleSwitchOff: { backgroundColor: 'rgba(255,255,255,0.1)' },
  toggleCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFFFFF' },
  toggleCircleOn: { alignSelf: 'flex-end' },
  toggleCircleOff: { alignSelf: 'flex-start' }
});`;

const panicScreenCorrigidoCode = `import React, { useState, useEffect, useRef } from 'react';
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
import { Shield, ShieldAlert, Navigation, Users } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const BUTTON_SIZE = screenWidth * 0.6;
const BUTTON_RADIUS = BUTTON_SIZE / 2;

export default function PanicScreenCorrigido() {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCompanionActive, setIsCompanionActive] = useState(false);
  
  // Animaciones para pulsación del botón y radar GPS
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const radarAnim = useRef(new Animated.Value(0)).current;

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

    // Animación de onda de radar para el indicador de protección superior
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ).start();
  }, [pulseAnim, radarAnim]);

  // Manejo de la cuenta regresiva al presionar pánico
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  const handlePanicPress = () => {
    if (isActive) {
      setIsActive(false);
      setCountdown(5);
    } else {
      setIsActive(true);
    }
  };

  // Interpolación de la escala y opacidad del radar del indicador superior
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
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      
      {/* Fondo con degradado ambiental premium */}
      <View style={styles.backgroundGradient}>
        <View style={styles.radialGlow} />
      </View>

      {/* SECCIÓN SUPERIOR: INDICADOR DE ESTADO EN VERDE NEÓN */}
      <View style={styles.header}>
        <View style={styles.protectedBadge}>
          <View style={styles.gpsContainer}>
            <Animated.View 
              style={[
                styles.radarWave, 
                { 
                  transform: [{ scale: radarScale }], 
                  opacity: radarOpacity 
                }
              ]} 
            />
            <View style={[styles.pulseDot, isActive && styles.pulseDotActive]} />
          </View>
          <Text style={styles.protectedText}>
            Estado: <Text style={isActive ? styles.statusAlert : styles.statusSecure}>{isActive ? 'Alerta Activa' : 'Protegido'}</Text>
          </Text>
        </View>
      </View>

      {/* SECCIÓN CENTRAL: BOTÓN DE PÁNICO FLEXIBLE Y RESPONSIVO */}
      <View style={styles.centerContainer}>
        {isActive && (
          <View style={styles.rippleOverlay}>
            <View style={styles.rippleCircle1} />
            <View style={styles.rippleCircle2} />
          </View>
        )}

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={handlePanicPress} 
            style={[
              styles.sosButton, 
              isActive ? styles.sosButtonActive : styles.sosButtonNormal
            ]}
          >
            {isActive ? (
              <View style={styles.buttonContent}>
                <ShieldAlert size={BUTTON_SIZE * 0.35} color="#FFFFFF" style={styles.bounceIcon} />
                <Text style={styles.sosText}>{countdown > 0 ? countdown : 'C5i'}</Text>
                <Text style={styles.subText}>PRESIONA PARA CANCELAR</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Shield size={BUTTON_SIZE * 0.35} color="#FFFFFF" />
                <Text style={styles.sosText}>S.O.S.</Text>
                <Text style={styles.subText}>MANTÉN PRESIONADO</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* GLOW DE FONDO DETRÁS DEL BOTÓN */}
        <View style={[styles.buttonGlow, isActive ? styles.buttonGlowActive : styles.buttonGlowNormal]} />
      </View>

      {/* SECCIÓN INFERIOR: UBICACIÓN Y TARJETA COMPLEMENTARIA */}
      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Ubicación Compartida: <Text style={isActive ? styles.locationActive : styles.locationWait}>{isActive ? 'Transmitiendo en Vivo' : 'En Espera'}</Text>
          </Text>
        </View>

        {/* Tarjeta de Monitoreo "Acompáñame" y Contactos */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardIconBox}>
              <Navigation size={18} color="#FF9500" />
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.cardTitle}>Acompáñame</Text>
              <Text style={styles.cardSubtitle}>Monitoreo en vivo de trayecto</Text>
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setIsCompanionActive(!isCompanionActive)}
              style={[styles.toggleContainer, isCompanionActive ? styles.toggleOn : styles.toggleOff]}
            >
              <View style={[styles.toggleCircle, isCompanionActive ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.contactsSection}>
            <Text style={styles.contactsTitle}>CONTACTOS SEGUROS DE CONFIANZA</Text>
            <View style={styles.contactsRow}>
              <View style={styles.contactItem}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>MP</Text>
                  <View style={styles.avatarStatus} />
                </View>
                <Text style={styles.contactName} numberOfLines={1}>Mamá</Text>
              </View>
              
              <View style={styles.contactItem}>
                <View style={[styles.avatarContainer, { borderColor: 'rgba(88, 86, 214, 0.3)' }]}>
                  <Text style={[styles.avatarText, { color: '#5856D6' }]}>PO</Text>
                  <View style={styles.avatarStatus} />
                </View>
                <Text style={styles.contactName} numberOfLines={1}>Papá</Text>
              </View>

              <View style={styles.contactItem}>
                <View style={[styles.avatarContainer, { borderColor: 'rgba(255, 45, 85, 0.3)' }]}>
                  <Text style={[styles.avatarText, { color: '#FF2D55' }]}>HE</Text>
                  <View style={styles.avatarStatus} />
                </View>
                <Text style={styles.contactName} numberOfLines={1}>Hermano</Text>
              </View>

              <TouchableOpacity style={styles.addButton}>
                <Users size={16} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  radialGlow: {
    position: 'absolute',
    width: screenWidth * 1.5,
    height: screenWidth * 1.5,
    borderRadius: (screenWidth * 1.5) / 2,
    backgroundColor: 'rgba(255, 59, 48, 0.02)',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  protectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  gpsContainer: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF88',
  },
  pulseDotActive: {
    backgroundColor: '#FF3B30',
  },
  radarWave: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 255, 136, 0.4)',
  },
  protectedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusSecure: {
    color: '#00FF88',
    fontWeight: '700',
  },
  statusAlert: {
    color: '#FF3B30',
    fontWeight: '700',
  },
  centerContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  rippleOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  rippleCircle1: {
    position: 'absolute',
    width: BUTTON_SIZE * 1.3,
    height: BUTTON_SIZE * 1.3,
    borderRadius: (BUTTON_SIZE * 1.3) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  rippleCircle2: {
    position: 'absolute',
    width: BUTTON_SIZE * 1.6,
    height: BUTTON_SIZE * 1.6,
    borderRadius: (BUTTON_SIZE * 1.6) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.08)',
  },
  sosButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  sosButtonNormal: {
    backgroundColor: '#1C0606',
    borderColor: 'rgba(255, 59, 48, 0.3)',
    shadowColor: 'rgba(255, 59, 48, 0.4)',
  },
  sosButtonActive: {
    backgroundColor: '#FF3B30',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(255, 59, 48, 0.8)',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  bounceIcon: {
    marginBottom: 4,
  },
  sosText: {
    fontSize: BUTTON_SIZE * 0.16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: 2,
  },
  subText: {
    fontSize: BUTTON_SIZE * 0.05,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  buttonGlow: {
    position: 'absolute',
    width: BUTTON_SIZE * 0.9,
    height: BUTTON_SIZE * 0.9,
    borderRadius: (BUTTON_SIZE * 0.9) / 2,
    filter: 'blur(30px)',
    zIndex: -1,
    opacity: 0.15,
  },
  buttonGlowNormal: {
    backgroundColor: '#FF3B30',
  },
  buttonGlowActive: {
    backgroundColor: '#FF3B30',
    opacity: 0.4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 24,
    width: '100%',
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  locationWait: {
    color: '#FF9500',
    fontWeight: '700',
  },
  locationActive: {
    color: '#00FF88',
    fontWeight: '700',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 24,
    padding: 18,
    width: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 2,
  },
  toggleContainer: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOff: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  toggleOn: {
    backgroundColor: '#00FF88',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
  },
  circleOn: {
    alignSelf: 'flex-end',
  },
  circleOff: {
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 16,
  },
  contactsSection: {
    width: '100%',
  },
  contactsTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.35)',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  contactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactItem: {
    alignItems: 'center',
    width: 52,
  },
  avatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 149, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF9500',
  },
  avatarStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF88',
    borderWidth: 2,
    borderColor: '#080808',
  },
  contactName: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
    width: '100%',
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
`;

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
  // Estados para el Prototype Hub y Cambio de Rol
  const [phoneMode, setPhoneMode] = useState<'sos' | 'hub'>('hub');
  const [hubRole, setHubRole] = useState<'ciudadano' | 'agente' | 'c4'>('ciudadano');
  const [sessionActive, setSessionActive] = useState<boolean>(true);
  const [hubAgentActive, setHubAgentActive] = useState(true);
  const [hubAlertAccepted, setHubAlertAccepted] = useState(false);
  const [hubClosingReport, setHubClosingReport] = useState('');
  const [hubReportSubmitted, setHubReportSubmitted] = useState(false);
  const [inspectedFile, setInspectedFile] = useState<'hub' | 'panic' | 'corrigido'>('hub');

  // Estados para la Simulación del Teléfono
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [companionActive, setCompanionActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(94);
  const [simulatedLat, setSimulatedLat] = useState(20.1018);
  const [simulatedLng, setSimulatedLng] = useState(-98.7592);
  const [activeTab, setActiveTab] = useState<'code' | 'sim' | 'info'>('sim');
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

  // --- NUEVOS ESTADOS DE SEGURIDAD CIUDADANA ---
  // 1. Registro e Identidad Segura
  const [curp, setCurp] = useState(() => localStorage.getItem('hidalgo_curp') || '');
  const [phone, setPhone] = useState(() => localStorage.getItem('hidalgo_phone') || '');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(() => localStorage.getItem('hidalgo_otp_verified') === 'true');
  const [medicalName, setMedicalName] = useState(() => localStorage.getItem('hidalgo_med_name') || '');
  const [medicalAge, setMedicalAge] = useState(() => localStorage.getItem('hidalgo_med_age') || '');
  const [medicalBlood, setMedicalBlood] = useState(() => localStorage.getItem('hidalgo_med_blood') || 'O+');
  const [medicalAllergies, setMedicalAllergies] = useState(() => localStorage.getItem('hidalgo_med_allergies') || 'Ninguna');
  const [identitySaved, setIdentitySaved] = useState(() => localStorage.getItem('hidalgo_identity_saved') === 'true');

  // 2. Acompáñame Preventivo con Temporizador
  const [escortTimerMinutes, setEscortTimerMinutes] = useState(15);
  const [escortTimeLeft, setEscortTimeLeft] = useState(0); // en segundos
  const [escortTimerActive, setEscortTimerActive] = useState(false);
  const [escortPin, setEscortPin] = useState(() => localStorage.getItem('hidalgo_escort_pin') || '1234');
  const [escortPinInput, setEscortPinInput] = useState('');
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [pinError, setPinError] = useState(false);

  // 3. Caja Negra
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const [cameraShots, setCameraShots] = useState<string[]>([]);

  // 6. Activación Discreta (Física)
  const [discreteEnabled, setDiscreteEnabled] = useState(() => localStorage.getItem('hidalgo_discrete_enabled') === 'true');
  const [powerClicks, setPowerClicks] = useState(0);
  const [lastPowerClickTime, setLastPowerClickTime] = useState(0);

  // --- ESTADOS EXCLUSIVOS ROL 2 AGENTE OPERATIVO / POLICÍA ---
  const [agentCoverageRadius, setAgentCoverageRadius] = useState<number>(5); // X km para geocerca
  const [victimDistance, setVictimDistance] = useState<number>(3.2); // Distancia a la víctima
  const [victimLat, setVictimLat] = useState<number>(20.10123);
  const [victimLng, setVictimLng] = useState<number>(-98.75945);
  const [patrolLat, setPatrolLat] = useState<number>(20.09841);
  const [patrolLng, setPatrolLng] = useState<number>(-98.76123);
  const [proximityAlertActive, setProximityAlertActive] = useState<boolean>(false);
  const [acceptedAlertTime, setAcceptedAlertTime] = useState<string | null>(null);
  const [lastTelemetryTx, setLastTelemetryTx] = useState<string | null>(null);
  const [victimMoving, setVictimMoving] = useState<boolean>(true);
  const [reportClassification, setReportClassification] = useState<string>('Incidente Controlado');
  const [reportPhoto, setReportPhoto] = useState<string | null>(null);
  const [isTakingReportPhoto, setIsTakingReportPhoto] = useState<boolean>(false);

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

  // Vibración háptica simulada
  const vibrateDevice = (pattern: number[]) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch (e) {
      console.log("Haptic feedback error: ", e);
    }
  };

  // Simulación de cuenta regresiva para el Botón de Pánico
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (panicActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        
        // Transmisión de geolocalización vía WebSocket de bajo consumo (simulada)
        addLog({
          time: new Date().toLocaleTimeString(),
          type: 'warning',
          message: `📡 [WEBSOCKET] Tx Telemetría: {"lat": ${simulatedLat.toFixed(5)}, "lng": ${simulatedLng.toFixed(5)}, "battery": ${batteryLevel}%, "precision": "2m", "audio_active": true, "event": "LIVE_PANIC_PING"}`
        });

        // Simulación de ráfagas de cámara en segundo plano (Caja Negra)
        if (countdown === 4) {
          setCameraShots(prev => [...prev, '📸 Ráfaga frontal (13:45:01): Ángulo amplio - Rostro detectado y encriptado en AES-256']);
          addLog({
            time: new Date().toLocaleTimeString(),
            type: 'info',
            message: '🔒 [CAJA NEGRA] Ráfaga #1 enviada y encriptada directo al servidor C5i en la nube.'
          });
        } else if (countdown === 2) {
          setCameraShots(prev => [...prev, '📸 Ráfaga trasera (13:45:03): Entorno oscuro - Captura ruidosa pero legible subida sin registro local']);
          addLog({
            time: new Date().toLocaleTimeString(),
            type: 'info',
            message: '🔒 [CAJA NEGRA] Ráfaga #2 cargada exitosamente. Sin residuos en la galería del dispositivo.'
          });
        }
        
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
  }, [panicActive, countdown, simulatedLat, simulatedLng, batteryLevel]);

  // Temporizador de Acompáñame Preventivo
  useEffect(() => {
    let escortInterval: NodeJS.Timeout;
    if (escortTimerActive && escortTimeLeft > 0) {
      escortInterval = setInterval(() => {
        setEscortTimeLeft(prev => {
          if (prev <= 1) {
            setEscortTimerActive(false);
            // TRIGGER EMERGENCY S.O.S. AUTOMATICALLY!
            setPanicActive(true);
            setCountdown(5);
            setIsRecordingAudio(true);
            setIsTakingPhotos(true);
            
            addLog({
              time: new Date().toLocaleTimeString(),
              type: 'error',
              message: '🚨 [ACOMPÁÑAME] ALERTA CRÍTICA: Temporizador expirado sin PIN de desactivación. S.O.S automático emitido al C5i.'
            });

            // Enviar SMS en paralelo a todos los contactos de la red de confianza
            contacts.forEach(c => {
              addLog({
                time: new Date().toLocaleTimeString(),
                type: 'warning',
                message: `💬 [SMS AUTOMÁTICO] Enviado a ${c.name} (${c.phone}): "¡ALERTA EN RUTA! Mi trayecto preventivo expiró y no ingresé mi PIN. Auxilio. GPS: https://maps.google.com/?q=${simulatedLat.toFixed(5)},${simulatedLng.toFixed(5)}"`
              });
            });

            vibrateDevice([1000, 500, 1000]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(escortInterval);
  }, [escortTimerActive, escortTimeLeft, contacts, simulatedLat, simulatedLng]);

  // --- EFECTOS DE CONTROL OPERATIVO & TELEMETRÍA (ROL 2 AGENTE) ---
  useEffect(() => {
    let telemetryInterval: NodeJS.Timeout;
    if (hubAgentActive && hubRole === 'agente') {
      telemetryInterval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        setLastTelemetryTx(timestamp);
        
        // Simular pequeño desplazamiento de patrullaje
        setPatrolLat(prev => prev + (Math.random() - 0.5) * 0.0001);
        setPatrolLng(prev => prev + (Math.random() - 0.5) * 0.0001);

        addLog({
          time: timestamp,
          type: 'info',
          message: `📡 [TELEMETRÍA PATRULLA] Tx ubicación Unidad Hidalgo 04: {"lat": ${patrolLat.toFixed(5)}, "lng": ${patrolLng.toFixed(5)}, "status": "Activo", "signal": "Excelente"}`
        });
      }, 5000);
    }
    return () => clearInterval(telemetryInterval);
  }, [hubAgentActive, hubRole, patrolLat, patrolLng]);

  // --- EFECTO DE SEGUIMIENTO EN VIVO & RECALCULACIÓN DE RUTA ---
  useEffect(() => {
    let trackingInterval: NodeJS.Timeout;
    if (hubAlertAccepted && victimMoving && hubRole === 'agente') {
      trackingInterval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        
        // Simular que la víctima se desplaza (ej. corriendo o en auto)
        const dLat = (Math.random() - 0.5) * 0.00015;
        const dLng = (Math.random() - 0.5) * 0.00015;
        setVictimLat(prev => prev + dLat);
        setVictimLng(prev => prev + dLng);

        // Recalcular la distancia Euclidiana simplificada (en km aprox, 1 grado ~ 111 km)
        setVictimDistance(() => {
          const latDiff = (patrolLat - (victimLat + dLat)) * 111;
          const lngDiff = (patrolLng - (victimLng + dLng)) * 111;
          const newDist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
          return parseFloat(newDist.toFixed(2));
        });

        addLog({
          time: timestamp,
          type: 'warning',
          message: `🛰️ [SEGUIMIENTO GPS] Desplazamiento en vivo de la víctima detectado. Recalculando ruta óptima hacia nuevas coordenadas en tiempo real...`
        });
      }, 6000);
    }
    return () => clearInterval(trackingInterval);
  }, [hubAlertAccepted, victimMoving, hubRole, patrolLat, patrolLng, victimLat, victimLng]);

  const addLog = (log: LogEntry) => {
    setLogs(prev => [log, ...prev].slice(0, 50));
  };

  const handlePanicToggle = () => {
    // Feedback háptico fuerte
    vibrateDevice([500, 100, 500]);

    if (panicActive) {
      setPanicActive(false);
      setCountdown(5);
      stopSiren();
      setIsRecordingAudio(false);
      setIsTakingPhotos(false);
      setCameraShots([]);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: 'Alerta cancelada por el usuario. Estado: Protegido restablecido. Grabación de Caja Negra detenida.'
      });
    } else {
      setPanicActive(true);
      setIsRecordingAudio(true);
      setIsTakingPhotos(true);
      setCameraShots(['📸 Ráfaga de Activación (13:45:00): Foto de ráfaga inicial subida encriptada.']);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'warning',
        message: '⚠️ BOTÓN DE PÁNICO PRESIONADO. Iniciando protocolo de emergencia de 5s.'
      });
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: '🎙️ [CAJA NEGRA] Activación de audio ambiente en segundo plano iniciada. Grabando de forma silenciosa...'
      });

      // Enviar SMS inmediato en paralelo con la alerta C4
      contacts.forEach(c => {
        addLog({
          time: new Date().toLocaleTimeString(),
          type: 'warning',
          message: `💬 [SMS AUTOMÁTICO] Alerta enviada a ${c.name} (${c.phone}): "¡AUXILIO S.O.S! He presionado mi botón de emergencia Hidalgo Alerta. Mi ubicación actual: https://maps.google.com/?q=${simulatedLat.toFixed(5)},${simulatedLng.toFixed(5)}"`
        });
      });

      if (soundEnabled) {
        playBeep(440, 0.3);
      }
    }
  };

  const handleCompanionToggle = () => {
    if (escortTimerActive) {
      // Prompt for PIN to deactivate
      setShowPinVerification(true);
    } else {
      // Activate with defined minutes
      setEscortTimeLeft(escortTimerMinutes * 60);
      setEscortTimerActive(true);
      setCompanionActive(true);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: `Servicio 'Acompáñame' iniciado. Ruta protegida activa por ${escortTimerMinutes} min. Monitoreo satelital C5i activo.`
      });
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (escortPinInput === escortPin) {
      setEscortTimerActive(false);
      setCompanionActive(false);
      setShowPinVerification(false);
      setEscortPinInput('');
      setPinError(false);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: `Servicio 'Acompáñame' desactivado exitosamente mediante PIN de seguridad.`
      });
    } else {
      setPinError(true);
      vibrateDevice([100, 50, 100]);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'error',
        message: `⚠️ [ACOMPÁÑAME] Código PIN incorrecto. Intento de desactivación denegado.`
      });
    }
  };

  // --- NUEVOS CONTROLADORES DE SEGURIDAD CIUDADANA ---
  const handlePhysicalPowerClick = () => {
    if (!discreteEnabled) {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'warning',
        message: '⚠️ [ACTIVACIÓN FÍSICA] El modo discreto está desactivado. Habilítalo arriba para simular.'
      });
      return;
    }

    const now = Date.now();
    let clicks = powerClicks;

    // Si pasó más de 3 segundos desde el último clic, reiniciar contador
    if (now - lastPowerClickTime > 3000) {
      clicks = 1;
    } else {
      clicks += 1;
    }

    setPowerClicks(clicks);
    setLastPowerClickTime(now);

    addLog({
      time: new Date().toLocaleTimeString(),
      type: 'info',
      message: `🔌 [BOTÓN FÍSICO] Clic detectado (${clicks}/3).`
    });

    if (clicks >= 3) {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'error',
        message: '🚨 [ACTIVACIÓN FÍSICA] ¡Triple clic detectado! Activando S.O.S de emergencia silencioso.'
      });
      setPowerClicks(0);
      if (!panicActive) {
        handlePanicToggle();
      }
    } else {
      vibrateDevice([80]);
    }
  };

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) {
      alert("Por favor, introduce un número de teléfono válido a 10 dígitos.");
      return;
    }
    setOtpSent(true);
    addLog({
      time: new Date().toLocaleTimeString(),
      type: 'info',
      message: `💬 [SMS OTP] Enviando código de validación de 4 dígitos al número ${phone}...`
    });
    // Simular recepción automática en log
    setTimeout(() => {
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: `📲 [SMS RECIBIDO] Tu código de verificación de Hidalgo Alerta es: 1910`
      });
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otpCode === '1910') {
      setOtpVerified(true);
      localStorage.setItem('hidalgo_phone', phone);
      localStorage.setItem('hidalgo_otp_verified', 'true');
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: `✓ [REGISTRO] Teléfono móvil verificado correctamente mediante OTP.`
      });
    } else {
      vibrateDevice([100, 50, 100]);
      addLog({
        time: new Date().toLocaleTimeString(),
        type: 'error',
        message: `⚠️ [REGISTRO] Código OTP incorrecto. Intenta con "1910" (simulado).`
      });
    }
  };

  const handleSaveIdentity = () => {
    if (!curp || curp.length < 18) {
      alert("Por favor, introduce una CURP válida de 18 caracteres.");
      return;
    }
    if (!otpVerified) {
      alert("Debes verificar tu número de teléfono con el código OTP antes de guardar.");
      return;
    }
    localStorage.setItem('hidalgo_curp', curp);
    localStorage.setItem('hidalgo_med_name', medicalName);
    localStorage.setItem('hidalgo_med_age', medicalAge);
    localStorage.setItem('hidalgo_med_blood', medicalBlood);
    localStorage.setItem('hidalgo_med_allergies', medicalAllergies);
    localStorage.setItem('hidalgo_identity_saved', 'true');
    setIdentitySaved(true);
    addLog({
      time: new Date().toLocaleTimeString(),
      type: 'success',
      message: `🔒 [REGISTRO] Ficha médica y CURP enlazadas con éxito al C5i. Identidad Segura Activada.`
    });
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
    navigator.clipboard.writeText(
      inspectedFile === 'hub' 
        ? rolesHubCode 
        : inspectedFile === 'panic' 
          ? reactNativeCode 
          : panicScreenCorrigidoCode
    );
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
    <div id="panic_app_root" className="min-h-screen w-full bg-[#000000] text-slate-100 font-sans antialiased relative overflow-x-hidden selection:bg-red-500 selection:text-white flex flex-col justify-between">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-[#000000] z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.035)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.02)_0%,transparent_70%)]" />
        <AnimatePresence>
          {panicActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_60%)]"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main navigation / title bar */}
      <header className="relative z-10 w-full border-b border-white/[0.05] bg-slate-950/40 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-lg shrink-0">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-widest text-white uppercase">Hidalgo Alerta</h1>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-black tracking-wider flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <span>C5i CONECTADO</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Aplicación de Enlace Directo con Seguridad Pública</p>
          </div>
        </div>

        {/* Global tab switches to test different app perspectives (NO SIMULATOR WRAPPER) */}
        {sessionActive && (
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] p-1 rounded-xl">
            <button
              onClick={() => setHubRole('ciudadano')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${hubRole === 'ciudadano' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ciudadano</span>
            </button>
            <button
              onClick={() => setHubRole('agente')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${hubRole === 'agente' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Agente Operativo</span>
            </button>
            <button
              onClick={() => setHubRole('c4')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${hubRole === 'c4' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Consola C5i</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {/* Sound Toggle Button */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${soundEnabled ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-slate-900 border-white/[0.04] text-slate-500'}`}
            title={soundEnabled ? "Silenciar sirena de alerta" : "Activar sirena de alerta"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {sessionActive && (
            <button
              onClick={() => setSessionActive(false)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col justify-start">
        {!sessionActive ? (
          /* PORTAL ACCESS / GATEWAY LOGIN SCREEN */
          <div className="my-auto py-12 flex flex-col items-center justify-center max-w-md w-full mx-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-[#000000]/60 border border-white/[0.08] backdrop-blur-xl p-8 rounded-[28px] shadow-[0_24px_50px_rgba(0,0,0,0.6)] space-y-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 mb-2">
                <Shield className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-2xl font-black tracking-tight text-white uppercase">Acceso al Sistema</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Selecciona tu módulo de seguridad pública para ingresar de forma encriptada al C5i del Estado de Hidalgo.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Ciudadano */}
                <button
                  onClick={() => {
                    setHubRole('ciudadano');
                    setSessionActive(true);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-red-500/30 transition-all duration-300 group flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">Enlace Ciudadano</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">S.O.S de pánico, acompañamiento y contactos.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform self-center" />
                </button>

                {/* Agente */}
                <button
                  onClick={() => {
                    setHubRole('agente');
                    setSessionActive(true);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 group flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Agente Operativo</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Alertas de proximidad, GPS y reportes de cierre.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform self-center" />
                </button>

                {/* C4 Central */}
                <button
                  onClick={() => {
                    setHubRole('c4');
                    setSessionActive(true);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 transition-all duration-300 group flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Consola de Control C5i</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">KPIs de reacción, mapa de calor y log de incidentes.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform self-center" />
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ACTIVE PERSPECTIVE WORKSPACE - FULLSCREEN RESPONSIVE GRID */
          <div className="w-full h-full flex flex-col justify-start">
            
            {/* ROLEPERSPECTIVE 1: CIUDADANO (Citizen Interface) */}
            {hubRole === 'ciudadano' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full font-sans text-slate-200"
              >
                {/* LEFT COLUMN: SOS AND LIVE SYSTEM EMERGENCIES (6 columns wide) */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* LEFT CORE: SOS BUTTON TRIGGER */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-xl flex flex-col items-center justify-between min-h-[440px] relative overflow-hidden">
                    
                    {/* Realtime GPS Satelital telemetry */}
                    <div className="w-full flex items-center justify-between z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${panicActive ? 'bg-red-500' : 'bg-red-400'}`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${panicActive ? 'bg-red-500' : 'bg-red-500'}`} />
                        </span>
                        <span className="text-[10px] font-black tracking-wider text-red-400">
                          {panicActive ? `ALERTA ACTIVA (${countdown}s)` : 'ENLACE DE EMERGENCIA C5i'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold border border-emerald-500/20">GPS: EN LÍNEA</span>
                      </div>
                    </div>

                    {/* Concentric Pulsing shockwaves and Giant SOS Button */}
                    <div className="flex-1 flex flex-col justify-center items-center py-6 relative w-full z-10">
                      <AnimatePresence>
                        {panicActive && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0.6 }}
                              animate={{ scale: 2.2, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                              className="absolute w-52 aspect-square rounded-full border-2 border-red-500 bg-red-500/[0.03] shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            />
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0.4 }}
                              animate={{ scale: 2.8, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.3 }}
                              className="absolute w-52 aspect-square rounded-full border border-red-500/40"
                            />
                          </div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePanicToggle}
                        className={`relative w-44 aspect-square rounded-full flex flex-col items-center justify-center border-4 shadow-3xl cursor-pointer transition-all duration-300 ${
                          panicActive 
                            ? 'bg-gradient-to-br from-red-600 to-red-500 border-white/20 shadow-[0_0_50px_rgba(239,68,68,0.7)] animate-pulse' 
                            : 'bg-[#1e0707] border-red-500/40 hover:border-red-500 hover:bg-[#2e0909] shadow-[0_0_35px_rgba(239,68,68,0.3)]'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center p-4 text-center select-none">
                          {panicActive ? (
                            <>
                              <ShieldAlert className="w-12 h-12 text-white animate-bounce" />
                              <span className="text-3xl font-black text-white mt-1">
                                {countdown > 0 ? countdown : 'C5i'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-12 h-12 text-red-500" />
                              <span className="text-3xl font-black text-white mt-1">S.O.S.</span>
                            </>
                          )}
                          <span className="text-[9px] font-black tracking-widest text-white/90 uppercase mt-2">
                            {panicActive ? 'PRESIONA PARA CANCELAR' : 'PRESIONAR 3 SEGUNDOS'}
                          </span>
                        </div>
                      </motion.button>
                    </div>

                    {/* Satellite Coordinates and telemetry status */}
                    <div className="w-full text-center space-y-1.5 pt-4 border-t border-white/[0.04] z-10">
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>Lat: {simulatedLat.toFixed(6)}°, Lng: {simulatedLng.toFixed(6)}° (Hidalgo)</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 text-[9px] text-slate-400">
                        <span>BATERÍA: {batteryLevel}%</span>
                        <span>•</span>
                        <span>PRECISIÓN GPS: 1.8 metros</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          📡 WEBSOCKET: ACTIVO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. CAJA NEGRA DE EVIDENCIA (Grabación Silenciosa & Ráfagas) */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-5 rounded-[24px] backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white">Caja Negra de Evidencia (Grabación Silenciosa)</h4>
                          <p className="text-[10px] text-slate-400">Ráfagas multimedia y audio ambiente cifrados en la nube</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${panicActive ? 'bg-red-500/10 text-red-400 animate-pulse border border-red-500/20' : 'bg-slate-900 text-slate-500'}`}>
                        {panicActive ? 'CAPTURA EN CURSO' : 'ESPERANDO SOS'}
                      </span>
                    </div>

                    {panicActive ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3 pt-1"
                      >
                        {/* Audio Waveform simulator */}
                        <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px] text-red-400 font-bold">
                            <span className="flex items-center gap-1.5">
                              <Mic className="w-3.5 h-3.5 animate-pulse" />
                              Grabación de Audio Ambiente Activa
                            </span>
                            <span>Cifrado: AES-256</span>
                          </div>
                          <div className="h-8 flex items-center justify-center gap-1 px-4">
                            {[0.4, 0.9, 0.5, 0.7, 0.3, 0.8, 0.6, 0.95, 0.5, 0.8, 0.35, 0.75, 0.5, 0.9, 0.4].map((h, i) => (
                              <motion.div 
                                key={i}
                                animate={{ height: [`${h * 20}%`, `${h * 100}%`, `${h * 20}%`] }}
                                transition={{ repeat: Infinity, duration: 0.6 + (i % 3) * 0.2, ease: "easeInOut" }}
                                className="w-1 bg-red-500 rounded-full"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Sequenced encrypted camera bursts logs */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">RÁFAGAS EN SEGUNDO PLANO (CÁMARA DEL DISPOSITIVO)</span>
                          <div className="space-y-1.5">
                            {cameraShots.map((shot, idx) => (
                              <div key={idx} className="bg-slate-950/60 border border-white/[0.04] p-2.5 rounded-lg flex items-center justify-between text-[10px]">
                                <div className="flex items-center gap-2 text-slate-300">
                                  <Lock className="w-3 h-3 text-emerald-400" />
                                  <span>{shot}</span>
                                </div>
                                <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">ENCRIPTADO & SUBIDO</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center py-4 text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-white/[0.02]">
                        Al activarse la alerta SOS, se encenderá el micrófono y se capturarán fotografías secuenciales sin encender la pantalla. Nada se guardará en la galería local para proteger tu seguridad física.
                      </div>
                    )}
                  </div>

                  {/* 6. ACTIVACIÓN DISCRETA (Physical triple press click simulation) */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-5 rounded-[24px] backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white">Activación Física Discreta</h4>
                          <p className="text-[10px] text-slate-400">Activa el S.O.S presionando 3 veces el botón físico</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const val = !discreteEnabled;
                          setDiscreteEnabled(val);
                          localStorage.setItem('hidalgo_discrete_enabled', String(val));
                        }}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${discreteEnabled ? 'bg-[#00FF88]' : 'bg-white/10'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-slate-950 shadow transform transition-transform duration-300 ${discreteEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/[0.03] space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Simulador de Botón de Encendido Físico:</span>
                        <div className="flex gap-1.5 items-center">
                          <span className={`w-2 h-2 rounded-full ${powerClicks >= 1 ? 'bg-red-500 animate-ping' : 'bg-slate-800'}`} />
                          <span className={`w-2 h-2 rounded-full ${powerClicks >= 2 ? 'bg-red-500 animate-ping' : 'bg-slate-800'}`} />
                          <span className={`w-2 h-2 rounded-full ${powerClicks >= 3 ? 'bg-red-500 animate-ping' : 'bg-slate-800'}`} />
                          <span className="text-slate-400 text-[10px] ml-1">({powerClicks}/3 clics)</span>
                        </div>
                      </div>

                      <div className="flex gap-3 items-center">
                        <button
                          type="button"
                          onClick={handlePhysicalPowerClick}
                          className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-black tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-white"
                        >
                          <Key className="w-3.5 h-3.5 text-red-400" />
                          <span>PULSAR BOTÓN FÍSICO</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setPowerClicks(0)}
                          className="px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/[0.04] text-[10px] text-slate-500 transition-all cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal">
                        *En condiciones reales de estrés, el usuario puede presionar el botón de encendido físico del teléfono móvil tres veces consecutivas en su bolsillo para activar silenciosamente la alarma en el C5i Hidalgo.
                      </p>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: PREVENTIVE AND REGISTER TOOLS (6 columns wide) */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* 1. REGISTRO E IDENTIDAD SEGURA (CURP, OTP, Ficha Médica) */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                          <User className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-white">1. Registro de Identidad Segura</h3>
                          <p className="text-[10px] text-slate-400">Validación CURP y SMS OTP para prevención de fraude</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black border ${identitySaved && otpVerified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {identitySaved && otpVerified ? 'VERIFICADO & ENLAZADO' : 'INCOMPLETO'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* CURP Real-time validation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white flex items-center gap-1">CURP (México)</span>
                          {curp.length > 0 && (
                            <span className={`text-[9px] font-black ${/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(curp.toUpperCase()) ? 'text-emerald-400' : 'text-red-400'}`}>
                              {/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(curp.toUpperCase()) ? '✓ FORMATO EXCELENTE' : '✗ PATRÓN INCORRECTO (18 CARACT.)'}
                            </span>
                          )}
                        </div>
                        <input 
                          type="text"
                          maxLength={18}
                          value={curp}
                          onChange={(e) => setCurp(e.target.value.toUpperCase())}
                          placeholder="Introduce tu CURP de 18 caracteres"
                          className="w-full bg-slate-950 border border-white/[0.08] focus:border-red-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all uppercase font-mono"
                        />
                      </div>

                      {/* Phone SMS OTP verify block */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-white block">Teléfono Móvil & Validación SMS OTP</span>
                        <div className="flex gap-2">
                          <input 
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="Número móvil a 10 dígitos"
                            disabled={otpVerified}
                            className="flex-1 bg-slate-950 border border-white/[0.08] focus:border-red-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all font-mono disabled:opacity-50"
                          />
                          
                          {!otpVerified ? (
                            <button
                              type="button"
                              onClick={handleSendOTP}
                              className="px-4 bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                            >
                              {otpSent ? 'Reenviar' : 'Enviar OTP'}
                            </button>
                          ) : (
                            <span className="px-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-center">
                              Verificado
                            </span>
                          )}
                        </div>

                        {/* OTP verification input code (shown when sent) */}
                        {otpSent && !otpVerified && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-950 border border-white/[0.04] p-3 rounded-xl flex gap-2.5 items-center justify-between"
                          >
                            <div className="space-y-1 flex-1">
                              <span className="text-[10px] text-slate-400 font-bold block">Código SMS Recibido (Simulación: 1910)</span>
                              <input 
                                type="text"
                                maxLength={4}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="Escribe el PIN de 4 dígitos"
                                className="w-full bg-slate-900 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-600 outline-none font-mono"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleVerifyOTP}
                              className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-xs font-black transition-all cursor-pointer mt-4"
                            >
                              Validar
                            </button>
                          </motion.div>
                        )}
                      </div>

                      {/* Personal medical details */}
                      <div className="bg-slate-950/50 border border-white/[0.03] p-4 rounded-xl space-y-3.5">
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">DATOS BIOMÉDICOS PARA EMERGENCIAS (ENLACE C5i)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold">Nombre Completo:</span>
                            <input 
                              type="text"
                              value={medicalName}
                              onChange={(e) => setMedicalName(e.target.value)}
                              placeholder="Ej. Sofía Ramos"
                              className="w-full bg-slate-900 border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white placeholder-slate-600 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold">Edad:</span>
                            <input 
                              type="number"
                              value={medicalAge}
                              onChange={(e) => setMedicalAge(e.target.value)}
                              placeholder="Ej. 28"
                              className="w-full bg-slate-900 border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white placeholder-slate-600 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold">Grupo Sanguíneo:</span>
                            <select 
                              value={medicalBlood}
                              onChange={(e) => setMedicalBlood(e.target.value)}
                              className="w-full bg-slate-900 border border-white/[0.08] rounded-lg px-2 py-2 text-xs text-white outline-none"
                            >
                              {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                                <option key={type} value={type} className="bg-slate-950">{type}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold">Alergias o Enfermedades:</span>
                            <input 
                              type="text"
                              value={medicalAllergies}
                              onChange={(e) => setMedicalAllergies(e.target.value)}
                              placeholder="Ej. Penicilina"
                              className="w-full bg-slate-900 border border-white/[0.08] rounded-lg px-2.5 py-2 text-xs text-white placeholder-slate-600 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save Identity Button */}
                      <button
                        type="button"
                        onClick={handleSaveIdentity}
                        className="w-full py-2.5 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>GUARDAR FICHA E INICIAR REGISTRO</span>
                      </button>
                    </div>
                  </div>

                  {/* 5. MÓDULO AVANZADO "ACOMPÁÑAME" (Preventivo con PIN) */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                          <Navigation className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">5. Módulo Preventivo "Acompáñame"</h3>
                          <p className="text-[10px] text-slate-400">Ruta bajo temporizador y desactivación obligatoria por PIN</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleCompanionToggle}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${escortTimerActive ? 'bg-[#00FF88]' : 'bg-white/10'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${escortTimerActive ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Temporizador Interactivo */}
                    <div className="space-y-4">
                      {!escortTimerActive ? (
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-slate-300">
                            <span>Duración del Trayecto de Riesgo:</span>
                            <span className="text-amber-400 font-black">{escortTimerMinutes} minutos</span>
                          </div>
                          
                          <input 
                            type="range"
                            min={1}
                            max={60}
                            value={escortTimerMinutes}
                            onChange={(e) => setEscortTimerMinutes(Number(e.target.value))}
                            className="w-full accent-amber-500 bg-slate-900 rounded-lg h-2"
                          />

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-400 font-bold block">PIN de Desactivación:</span>
                              <input 
                                type="text"
                                maxLength={4}
                                value={escortPin}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  setEscortPin(val);
                                  localStorage.setItem('hidalgo_escort_pin', val);
                                }}
                                className="w-full bg-slate-950 border border-white/[0.08] focus:border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white text-center font-mono font-bold"
                              />
                            </div>
                            <div className="text-[9px] text-slate-500 flex items-center pt-3">
                              *Si el temporizador expira y no ingresas este PIN, el C5i enviará un S.O.S de emergencia automáticamente.
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleCompanionToggle}
                            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                          >
                            <Clock className="w-4 h-4" />
                            <span>INICIAR TRAYECTO PROTEGIDO ({escortTimerMinutes} MIN)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="bg-amber-500/[0.02] border border-amber-500/20 p-4.5 rounded-2xl space-y-4 text-center">
                          <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold border-b border-amber-500/10 pb-2">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                              Trayecto en Curso (Monitoreo C5i)
                            </span>
                            <span>PIN CONFIGURADO: ****</span>
                          </div>

                          {/* Countdown display */}
                          <div className="py-2">
                            <span className="text-4xl font-black text-amber-400 tracking-widest font-mono">
                              {Math.floor(escortTimeLeft / 60)}:{(escortTimeLeft % 60).toString().padStart(2, '0')}
                            </span>
                            <span className="text-[9px] text-slate-400 block mt-1 uppercase tracking-widest">TIEMPO PARA DESACTIVACIÓN SEGURA</span>
                          </div>

                          {/* Linear progress bar */}
                          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-amber-500 h-1.5 rounded-full transition-all duration-1000" 
                              style={{ width: `${(escortTimeLeft / (escortTimerMinutes * 60)) * 100}%` }}
                            />
                          </div>

                          {/* Pin validation to stop the timer */}
                          {!showPinVerification ? (
                            <button
                              type="button"
                              onClick={() => setShowPinVerification(true)}
                              className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 text-xs font-black transition-all cursor-pointer"
                            >
                              PARAR Y DESACTIVAR CON PIN
                            </button>
                          ) : (
                            <motion.form 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              onSubmit={handlePinSubmit}
                              className="space-y-3.5 border-t border-white/[0.05] pt-4 text-left"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-300 uppercase">INGRESA TU PIN DE SEGURIDAD</span>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setShowPinVerification(false);
                                    setEscortPinInput('');
                                  }}
                                  className="text-[10px] text-slate-500 hover:text-white"
                                >
                                  Cancelar
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <input 
                                  type="password"
                                  maxLength={4}
                                  value={escortPinInput}
                                  readOnly
                                  placeholder="PIN ****"
                                  className="flex-1 bg-slate-950 border border-white/[0.08] focus:border-red-500/30 rounded-xl px-4 py-2.5 text-center text-lg text-white font-mono font-bold outline-none"
                                />
                              </div>

                              {/* Tactile Keypad */}
                              <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto mt-2.5">
                                {[1,2,3,4,5,6,7,8,9].map(num => (
                                  <button
                                    key={num}
                                    type="button"
                                    onClick={() => setEscortPinInput(p => (p + num).slice(0, 4))}
                                    className="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                                  >
                                    {num}
                                  </button>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => setEscortPinInput('')}
                                  className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[10px] flex items-center justify-center cursor-pointer"
                                >
                                  Borrar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEscortPinInput(p => (p + '0').slice(0, 4))}
                                  className="w-10 h-10 rounded-lg bg-slate-900 border border-white/5 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                                >
                                  0
                                </button>
                                <button
                                  type="submit"
                                  className="w-10 h-10 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[10px] flex items-center justify-center cursor-pointer"
                                >
                                  OK
                                </button>
                              </div>

                              {pinError && (
                                <p className="text-[10px] text-red-400 text-center font-bold">PIN incorrecto. Inténtalo de nuevo.</p>
                              )}
                            </motion.form>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. RED DE CONFIANZA (Contactos Seguros, límite de 5) */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                      <div>
                        <h3 className="text-sm font-black text-white">4. Red de Confianza (Contactos de Alerta)</h3>
                        <p className="text-[10px] text-slate-400">Hasta 5 contactos autorizados para envío de SMS en paralelo</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          if (!showAddContact && contacts.length >= 5) {
                            alert("Has alcanzado el límite máximo de 5 contactos permitidos en tu red de confianza para evitar saturación de la pasarela SMS.");
                            return;
                          }
                          setShowAddContact(!showAddContact);
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${showAddContact ? 'bg-white/15 border-white/20 text-white' : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/25'}`}
                      >
                        {showAddContact ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{showAddContact ? 'Cancelar' : 'Añadir Enlace'}</span>
                      </button>
                    </div>

                    {/* Inline form to add contacts with limit validation */}
                    <AnimatePresence>
                      {showAddContact && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={(e) => {
                            if (contacts.length >= 5) {
                              e.preventDefault();
                              alert("Límite máximo de 5 contactos alcanzado.");
                              setShowAddContact(false);
                              return;
                            }
                            handleAddContact(e);
                          }}
                          className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl space-y-3 overflow-hidden"
                        >
                          <h4 className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Nuevo Enlace de Seguridad</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text"
                              value={newContactName}
                              onChange={(e) => setNewContactName(e.target.value)}
                              placeholder="Nombre (ej. Hermana)"
                              className="bg-slate-950 border border-white/[0.08] focus:border-red-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                              required
                            />
                            <input 
                              type="tel"
                              value={newContactPhone}
                              onChange={(e) => setNewContactPhone(e.target.value)}
                              placeholder="Teléfono (ej. 771 123 4567)"
                              className="bg-slate-950 border border-white/[0.08] focus:border-red-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                              required
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full py-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Registrar Contacto ({contacts.length}/5)</span>
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    {/* Contacts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="bg-slate-950/40 border border-white/[0.04] rounded-2xl p-3 flex sm:flex-col items-center justify-between sm:justify-center gap-3 relative group">
                          
                          {/* Close/Remove icon button */}
                          <button 
                            onClick={() => removeContact(contact.id, contact.name)}
                            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/[0.02] border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center text-slate-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Eliminar enlace"
                          >
                            <X className="w-3 h-3" />
                          </button>

                          <div className="flex sm:flex-col items-center gap-2.5 text-left sm:text-center">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center relative">
                              <span className="text-xs font-black text-red-400">{contact.initials}</span>
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#000000]" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{contact.name}</div>
                              <div className="text-[9px] text-slate-500 mt-0.5">{contact.phone}</div>
                            </div>
                          </div>

                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-black font-sans">
                            VINCULADO
                          </span>
                        </div>
                      ))}

                      {/* Empty state slots up to 5 */}
                      {Array.from({ length: Math.max(0, 5 - contacts.length) }).map((_, i) => (
                        <div 
                          key={`empty-${i}`}
                          onClick={() => {
                            if (!showAddContact) {
                              setShowAddContact(true);
                            }
                          }}
                          className="bg-slate-950/10 border border-white/[0.04] border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-slate-600 hover:text-slate-400 hover:border-white/10 transition-all cursor-pointer select-none"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-[9px] font-black">SLOT DISPONIBLE</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ROLEPERSPECTIVE 2: AGENTE (Response Officer Interface) */}
            {hubRole === 'agente' && (
              <div className="space-y-6 w-full font-sans text-slate-200 relative">
                
                {/* INTRUSIVE HIGH-URGENCY PROXIMITY ALERT OVERLAY */}
                <AnimatePresence>
                  {proximityAlertActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-[#0c0303]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 max-w-lg w-full text-center space-y-5 shadow-[0_0_60px_rgba(239,68,68,0.5)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-red-400 to-red-600 animate-pulse" />
                        
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 animate-bounce">
                            <ShieldAlert className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-black text-white uppercase tracking-wider">🚨 DESPACHO DE EMERGENCIA POR GEOCERCA</h3>
                          <p className="text-xs text-slate-400">El C5i ha detectado un incidente crítico dentro de tu radio operativo de cobertura.</p>
                        </div>

                        {/* Coverage verification stats */}
                        <div className="bg-slate-950/80 border border-white/[0.04] p-4 rounded-xl text-left space-y-3">
                          <div className="flex justify-between items-center border-b border-white/[0.05] pb-2 text-[10px] font-bold">
                            <span className="text-slate-400">CRITERIO DE GEOCERCA SATISFECHO:</span>
                            <span className="text-emerald-400 font-mono">D ({victimDistance} km) ≤ X ({agentCoverageRadius} km)</span>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-500 uppercase font-black block">Ciudadana en peligro:</span>
                            <span className="text-sm font-bold text-white">Sofía Ramos (S.O.S Activo)</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase font-black block">Ubicación del reporte:</span>
                              <span className="font-semibold text-slate-200">Plaza Juárez, Pachuca Centro</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-slate-500 uppercase font-black block">Distancia de Cobertura:</span>
                              <span className="font-black text-red-400">{victimDistance} km</span>
                            </div>
                          </div>
                        </div>

                        {/* Persistent siren pulsing feedback */}
                        <div className="flex items-center justify-center gap-2 text-xs text-red-400 font-bold animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <span>SIRENA ACÚSTICA DE ALTA URGENCIA SONANDO...</span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setProximityAlertActive(false);
                              stopSiren();
                              addLog({
                                time: new Date().toLocaleTimeString(),
                                type: 'info',
                                message: '⚠️ [DESPACHO] El oficial pospuso la alerta de proximidad. Reasignando patrulla.'
                              });
                            }}
                            className="flex-1 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-bold transition-all border border-white/[0.06] cursor-pointer"
                          >
                            Rechazar / Reasignar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProximityAlertActive(false);
                              stopSiren();
                              setHubAlertAccepted(true);
                              const timestamp = new Date().toLocaleTimeString();
                              setAcceptedAlertTime(timestamp);
                              addLog({
                                time: timestamp,
                                type: 'success',
                                message: `🚓 [DESPACHO PROXIMIDAD] Alerta aceptada por Unidad Hidalgo-04 a las ${timestamp}. Distancia: ${victimDistance} km. Iniciando ruta GPS.`
                              });
                            }}
                            className="flex-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-500/20"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Aceptar Alerta</span>
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full"
                >
                  {/* LEFT COLUMN: DISPATCH NOTIFICATION & GPS GPS NAVEGADOR */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* 1. Control de Estado Operativo (Estatus del Oficial) */}
                    <div className="bg-[#000000]/80 border border-white/[0.08] p-5 rounded-[24px] backdrop-blur-md space-y-4">
                      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Shield className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">1. Control de Estado Operativo</h3>
                            <p className="text-[10px] text-slate-400">Disponibilidad en tiempo real para el despacho del C5i</p>
                          </div>
                        </div>

                        {/* Interactive toggle switch styled beautifully */}
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black tracking-wider uppercase ${hubAgentActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {hubAgentActive ? 'ACTIVO' : 'INACTIVO'}
                          </span>
                          <button 
                            type="button"
                            onClick={() => {
                              const nextState = !hubAgentActive;
                              setHubAgentActive(nextState);
                              addLog({
                                time: new Date().toLocaleTimeString(),
                                type: nextState ? 'success' : 'info',
                                message: `🚓 [ESTADO OPERATIVO] Oficial cambió su estatus a: ${nextState ? 'Activo (Disponible para despachar)' : 'Inactivo (Fuera de servicio / reporte / descanso)'}`
                              });
                            }}
                            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${hubAgentActive ? 'bg-emerald-400' : 'bg-slate-800 border border-white/10'}`}
                          >
                            <div className={`w-5.5 h-5.5 rounded-full shadow transform transition-transform duration-300 ${hubAgentActive ? 'translate-x-5.5 bg-slate-950' : 'translate-x-0 bg-slate-400'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Automated location sending feedback */}
                      {hubAgentActive ? (
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl text-xs space-y-1.5">
                          <div className="flex justify-between items-center text-emerald-400 font-bold">
                            <span className="flex items-center gap-1.5 text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              Transmisión de Ubicación de Patrulla en Tiempo Real
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono">Tx: {lastTelemetryTx || 'Conectando...'}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-normal">
                            Tu posición está siendo sincronizada activamente con la central del C5i Hidalgo. 
                            Coordenadas GPS actuales: <span className="font-mono text-white font-bold">{patrolLat.toFixed(5)}°, {patrolLng.toFixed(5)}°</span>
                          </p>
                        </div>
                      ) : (
                        <div className="bg-slate-950/40 border border-white/[0.02] p-3.5 rounded-xl text-xs text-slate-500 text-center">
                          ⚠️ Transmisión de ubicación pausada por estatus inactivo (fuera de servicio o descanso).
                        </div>
                      )}
                    </div>

                    {/* 2. Recepción de Servicios por Proximidad (Geocercas) */}
                    <div className="bg-[#000000]/80 border border-white/[0.08] p-5 rounded-[24px] backdrop-blur-md space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Radio className="w-4 h-4 text-red-500" />
                          <span>2. Recepción de Servicios por Proximidad (Geocercas)</span>
                        </h3>
                        <p className="text-[10px] text-slate-400">Algoritmo de cobertura basado en geofencing matemático</p>
                      </div>

                      {/* Simulator controls for math validation */}
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-white/[0.03] space-y-4">
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block">SIMULADOR DE RANGO OPERATIVO (C5i DISPATCH)</span>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300">Radio de Cobertura de Patrulla (X):</span>
                            <span className="text-emerald-400 font-black">{agentCoverageRadius} km</span>
                          </div>
                          <input 
                            type="range" 
                            min={1} 
                            max={15} 
                            value={agentCoverageRadius} 
                            onChange={(e) => setAgentCoverageRadius(Number(e.target.value))}
                            className="w-full accent-emerald-500 bg-slate-900 rounded-lg h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300">Distancia Estimada a la Víctima (D):</span>
                            <span className="text-red-400 font-black">{victimDistance} km</span>
                          </div>
                          <input 
                            type="range" 
                            min={1} 
                            max={20} 
                            step={0.5}
                            value={victimDistance} 
                            onChange={(e) => setVictimDistance(Number(e.target.value))}
                            className="w-full accent-red-500 bg-slate-900 rounded-lg h-2"
                          />
                        </div>

                        <div className="border-t border-white/[0.04] pt-3 space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Fórmula de evaluación de proximidad:</span>
                            <span className="font-mono text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-white/[0.04]">D_víctima ≤ X_cobertura</span>
                          </div>

                          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-white/[0.02]">
                            <span className="text-slate-300">Estado del algoritmo:</span>
                            <div className="flex items-center gap-1.5 font-bold">
                              <span className={`w-2 h-2 rounded-full ${victimDistance <= agentCoverageRadius ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                              <span className={victimDistance <= agentCoverageRadius ? 'text-emerald-400' : 'text-amber-400'}>
                                {victimDistance <= agentCoverageRadius ? '✓ Dentro de Rango' : '✗ Fuera de Geocerca'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={!hubAgentActive}
                          onClick={() => {
                            if (!hubAgentActive) return;
                            if (victimDistance <= agentCoverageRadius) {
                              setProximityAlertActive(true);
                              if (soundEnabled) {
                                startSiren();
                              }
                              addLog({
                                time: new Date().toLocaleTimeString(),
                                type: 'warning',
                                message: `🚨 [GEOCERCA DETECTADA] ¡Incidente emitido dentro del perímetro de respuesta! Distancia: ${victimDistance} km. Sirena de despacho iniciada.`
                              });
                            } else {
                              alert(`El reporte actual se encuentra a ${victimDistance} km, excediendo tu radio de cobertura asignado de ${agentCoverageRadius} km. El C5i canalizará a otra patrulla.`);
                            }
                          }}
                          className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            !hubAgentActive 
                              ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-white/5' 
                              : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white shadow-lg shadow-red-500/10'
                          }`}
                        >
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>SIMULAR INCIDENTE EN GEOCERCA</span>
                        </button>
                        
                        {!hubAgentActive && (
                          <p className="text-[10px] text-red-400 text-center font-bold animate-pulse">
                            * Cambia tu estado operativo a "ACTIVO" para poder simular e interceptar alertas por geocerca.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 3. Enrutamiento y Navegación GPS (Visible si se acepta una alerta) */}
                    {hubAlertAccepted && (
                      <div className="bg-[#000000]/80 border border-white/[0.08] p-5 rounded-[24px] backdrop-blur-md space-y-4">
                        <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                              <Navigation className="w-4.5 h-4.5 transform -rotate-45" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">3. Enrutamiento y Navegación GPS</h3>
                              <p className="text-[10px] text-slate-400">Canalización satelital y recalculación dinámica de trayecto</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-bold text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>GPS EN VIVO</span>
                          </div>
                        </div>

                        {/* Interactive dynamic map simulation (SVG Canvas-like drawing) */}
                        <div className="relative h-44 bg-slate-950 rounded-2xl border border-white/[0.05] overflow-hidden flex items-center justify-center">
                          {/* Grid background */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                          
                          {/* SVG path mapping patrol to victim */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <defs>
                              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#10b981" />
                              </linearGradient>
                            </defs>
                            {/* Route Line */}
                            <motion.path 
                              d="M 50 140 Q 150 40 280 60" 
                              fill="none" 
                              stroke="url(#routeGradient)" 
                              strokeWidth="3" 
                              strokeDasharray="6 4"
                              animate={{ strokeDashoffset: [0, -20] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          </svg>

                          {/* Patrol Car Marker */}
                          <div className="absolute bottom-6 left-12 flex flex-col items-center">
                            <span className="text-[8px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-1 py-0.5 rounded font-black mb-1 font-mono uppercase">PATRULLA U-04</span>
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
                              <Shield className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Victim Marker */}
                          <div className="absolute top-8 right-16 flex flex-col items-center">
                            <span className="text-[8px] bg-red-500/20 border border-red-500/30 text-red-400 px-1 py-0.5 rounded font-black mb-1 font-mono uppercase">VÍCTIMA (S.O.S)</span>
                            <div className="w-8 h-8 rounded-full bg-red-500/15 border-2 border-red-500 flex items-center justify-center text-red-500 animate-pulse">
                              <MapPin className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Float coordinate HUD */}
                          <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-white/[0.08] px-2.5 py-1.5 rounded-lg text-[9px] font-mono space-y-0.5 max-w-[170px]">
                            <div className="text-slate-400">Patrulla: {patrolLat.toFixed(5)}°, {patrolLng.toFixed(5)}°</div>
                            <div className="text-red-400">Víctima: {victimLat.toFixed(5)}°, {victimLng.toFixed(5)}°</div>
                          </div>
                        </div>

                        {/* Real-time drift status trigger */}
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-white/[0.03] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span>La víctima está en movimiento (Desplazamiento real)</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setVictimMoving(!victimMoving)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                              victimMoving 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                : 'bg-slate-900 border-white/5 text-slate-500'
                            }`}
                          >
                            {victimMoving ? 'MOVIMIENTO: ACTIVO' : 'PAUSADO'}
                          </button>
                        </div>

                        {/* Direct GPS integration buttons with maps */}
                        <div className="grid grid-cols-2 gap-3.5">
                          <a 
                            href={`https://maps.google.com/?q=${victimLat},${victimLng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-white text-xs font-black flex items-center justify-center gap-2 transition-all hover:scale-101 shadow"
                          >
                            <Map className="w-4 h-4 text-emerald-400" />
                            <span>Abrir en Google Maps</span>
                          </a>

                          <a 
                            href={`https://waze.com/ul?ll=${victimLat},${victimLng}&navigate=yes`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-white text-xs font-black flex items-center justify-center gap-2 transition-all hover:scale-101 shadow"
                          >
                            <Navigation className="w-4 h-4 text-amber-500 transform rotate-45" />
                            <span>Abrir en Waze GPS</span>
                          </a>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="text-slate-400 uppercase text-[9px] font-bold block">Distancia Recalculada</span>
                            <span className="text-sm font-black text-white">{victimDistance} kilómetros</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 uppercase text-[9px] font-bold block">ETA Estimado de Llegada</span>
                            <span className="text-sm font-black text-emerald-400">~{(victimDistance * 1.5).toFixed(1)} minutos</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: CASE RESOLUTION & TECHNICAL REPORTS (Auditoría Municipal) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* 4. Reporte de Cierre Obligatorio (Auditoría Municipal) */}
                    <div className="bg-[#000000]/80 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-xl space-y-5">
                      <div className="space-y-1 border-b border-white/[0.05] pb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4.5 h-4.5 text-emerald-400" />
                          <h3 className="text-sm font-black text-white uppercase tracking-wider">4. Reporte Oficial de Cierre</h3>
                        </div>
                        <p className="text-[10px] text-slate-400">Exigencia de auditoría para el histórico de incidentes municipales</p>
                      </div>

                      {/* Locked State if no alert is active */}
                      {!hubAlertAccepted ? (
                        <div className="py-8 px-4 text-center space-y-3 bg-slate-950/40 rounded-2xl border border-white/[0.03]">
                          <Lock className="w-7 h-7 text-slate-600 mx-auto" />
                          <div className="text-xs font-bold text-slate-400">Reporte Bloqueado</div>
                          <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                            Este reporte se desbloqueará automáticamente una vez que la patrulla acepte un despacho de emergencia y complete la llegada in situ.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          
                          {/* Incident Classification Dropdown */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Clasificación Final del Incidente
                            </label>
                            <select
                              value={reportClassification}
                              onChange={(e) => setReportClassification(e.target.value)}
                              className="w-full bg-slate-950 border border-white/[0.08] text-white text-xs rounded-xl px-3 py-2.5 outline-none font-medium focus:border-emerald-500/30"
                            >
                              <option value="Incidente Controlado" className="bg-slate-900">Incidente Controlado / Neutralizado</option>
                              <option value="Falsa Alarma" className="bg-slate-900">Falsa Alarma / Sin Suceso Real</option>
                              <option value="Detención de Sospechoso" className="bg-slate-900">Detención Directa de Sospechoso</option>
                              <option value="Traslado Médico / Apoyo" className="bg-slate-900">Traslado Médico / Apoyo de Ambulancia</option>
                              <option value="Sin Novedad / Conciliación" className="bg-slate-900">Sin Novedad / Conciliación Mutua</option>
                            </select>
                          </div>

                          {/* Descriptive text input (Novedades) */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Relato Descriptivo ("Novedades")
                              </label>
                              <span className={`text-[9px] font-bold ${hubClosingReport.trim().length >= 10 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {hubClosingReport.trim().length}/10 caracteres mín.
                              </span>
                            </div>
                            <textarea 
                              value={hubClosingReport}
                              onChange={(e) => setHubClosingReport(e.target.value)}
                              placeholder="Relata detalladamente los sucesos acontecidos en el lugar, indicando el estado final de la víctima y la resolución del percance..."
                              className="w-full bg-slate-950 border border-white/[0.08] focus:border-emerald-500/30 rounded-xl p-3 text-xs text-white placeholder-slate-600 outline-none h-24 resize-none transition-all leading-relaxed"
                            />
                          </div>

                          {/* Mandatory scene photo capture */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Fotografía de Evidencia In Situ (Obligatoria)
                            </label>

                            {reportPhoto ? (
                              <div className="relative rounded-xl overflow-hidden border border-emerald-500/35 bg-slate-950">
                                {/* Simulated image with watermarked HUD */}
                                <img 
                                  src={reportPhoto} 
                                  alt="Evidencia policial" 
                                  className="w-full h-36 object-cover opacity-85" 
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                                
                                {/* Watermark over image */}
                                <div className="absolute inset-x-2 bottom-2 text-[8px] font-mono text-white/90 bg-slate-950/80 p-2 rounded-lg space-y-0.5">
                                  <div className="font-bold text-emerald-400">🛡️ [EVIDENCIA MUNICIPAL C5i HIDALGO]</div>
                                  <div>UNIDAD: HIDALGO-04 | COORDS: {patrolLat.toFixed(5)}°, {patrolLng.toFixed(5)}°</div>
                                  <div>FECHA: {new Date().toLocaleDateString()} | CLASE: {reportClassification}</div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setReportPhoto(null)}
                                  className="absolute top-2 right-2 bg-red-600 text-white rounded-lg p-1 hover:bg-red-700 transition-all text-[10px] font-bold px-2.5 cursor-pointer"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ) : (
                              <div className="border border-white/[0.06] border-dashed rounded-xl p-6 text-center space-y-3 bg-slate-950/20">
                                <Camera className="w-6 h-6 text-slate-600 mx-auto" />
                                <div className="text-[11px] text-slate-400">Sin fotografía adjunta. Se requiere prueba de auditoría in situ.</div>
                                
                                <button
                                  type="button"
                                  disabled={isTakingReportPhoto}
                                  onClick={() => {
                                    setIsTakingReportPhoto(true);
                                    setTimeout(() => {
                                      // Simulated capture image with patrol scene
                                      setReportPhoto('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80');
                                      setIsTakingReportPhoto(false);
                                      addLog({
                                        time: new Date().toLocaleTimeString(),
                                        type: 'success',
                                        message: '📸 [EVIDENCIA] Captura fotográfica procesada e indexada con metadatos GPS para auditoría.'
                                      });
                                    }, 1200);
                                  }}
                                  className="mx-auto py-1.5 px-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.08] rounded-xl text-[10px] font-black transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  {isTakingReportPhoto ? (
                                    <>
                                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                                      <span>Capturando Evidencia...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Capturar Fotografía de Escena</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Validator flags display */}
                          <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/[0.02] text-[10px] space-y-1 font-semibold">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${hubClosingReport.trim().length >= 10 ? 'bg-emerald-400' : 'bg-red-400'}`} />
                              <span className={hubClosingReport.trim().length >= 10 ? 'text-emerald-400' : 'text-slate-400'}>
                                {hubClosingReport.trim().length >= 10 ? '✓ Relato descriptivo completo' : '✗ Se requiere relato del suceso (mínimo 10 caracteres)'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${reportPhoto ? 'bg-emerald-400' : 'bg-red-400'}`} />
                              <span className={reportPhoto ? 'text-emerald-400' : 'text-slate-400'}>
                                {reportPhoto ? '✓ Fotografía de evidencia in situ adjuntada' : '✗ Se requiere capturar la fotografía obligatoria de evidencia'}
                              </span>
                            </div>
                          </div>

                          {/* Submit Report Button */}
                          <button 
                            type="button"
                            disabled={!hubClosingReport.trim() || hubClosingReport.trim().length < 10 || !reportPhoto || hubReportSubmitted}
                            onClick={() => {
                              setHubReportSubmitted(true);
                              addLog({
                                time: new Date().toLocaleTimeString(),
                                type: 'success',
                                message: `📝 [AUDITORÍA] Reporte municipal guardado bajo código PRI-2026-94. Clasificación: ${reportClassification}.`
                              });
                              
                              setTimeout(() => {
                                setHubClosingReport('');
                                setReportPhoto(null);
                                setHubReportSubmitted(false);
                                setHubAlertAccepted(false);
                                setAcceptedAlertTime(null);
                                addLog({
                                  time: new Date().toLocaleTimeString(),
                                  type: 'info',
                                  message: '🚓 Unidad Hidalgo-04 completó el servicio y regresa a estatus de patrullaje preventivo.'
                                });
                              }, 3000);
                            }}
                            className={`w-full py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              (!hubClosingReport.trim() || hubClosingReport.trim().length < 10 || !reportPhoto || hubReportSubmitted) 
                                ? 'bg-white/[0.03] text-slate-500 cursor-not-allowed border border-white/[0.05]' 
                                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98'
                            }`}
                          >
                            {hubReportSubmitted ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-slate-950 animate-bounce" />
                                <span>Reporte Enviado & Sincronizado en C5i</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Enviar Reporte Oficial de Cierre</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              </div>
            )}

            {/* ROLEPERSPECTIVE 3: C4 CENTRAL & C5i DESPACHADOR (Control Center Interface) */}
            {hubRole === 'c4' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 w-full"
              >
                {/* TOP METRICS KPI BAR */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* KPI 1 */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">3.8 minutos</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Tiempo de Reacción (Promedio)</div>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">18 Unidades</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Patrullas Activas en Turno</div>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="bg-[#000000]/80 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">47 Alarmas</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Siniestros Atendidos Hoy</div>
                    </div>
                  </div>
                </div>

                {/* MAIN SPLIT: TAC-MAP & LOGS CONSOLE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* COLA 1: LIVE TACTICAL SITUATION MAP */}
                  <div className="lg:col-span-8 bg-[#000000]/80 border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col min-h-[420px]">
                    
                    {/* Header bar of map */}
                    <div className="bg-slate-900/60 border-b border-white/[0.05] px-5 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Centro de Control de Enlace Satelital • C5i</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black animate-pulse">
                        SITUACIÓN EN VIVO
                      </span>
                    </div>

                    {/* Styled Tacti-Map Area */}
                    <div className="flex-1 h-80 relative bg-[#000000] flex flex-col justify-between p-4 border-b border-white/[0.02]">
                      {/* Grid Radar overlay lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                      
                      {/* Map concentric rings representing Pachuca radar ranges */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-white/[0.02] pointer-events-none" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/[0.01] pointer-events-none" />

                      {/* PATROL UNIT 04 MARKER */}
                      <div className="absolute top-[30%] left-[28%] flex items-center gap-2 select-none">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                        </span>
                        <div className="bg-slate-950/90 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-black text-emerald-400 uppercase">
                          Patrulla U-04 (Ruta)
                        </div>
                      </div>

                      {/* PATROL UNIT 12 MARKER */}
                      <div className="absolute top-[65%] left-[75%] flex items-center gap-2 select-none">
                        <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                        </span>
                        <div className="bg-slate-950/90 border border-blue-500/20 px-1.5 py-0.5 rounded text-[8px] font-black text-blue-400 uppercase">
                          Patrulla U-12 (Vigilancia)
                        </div>
                      </div>

                      {/* CITIZEN SOS CRITICAL TRIGGER MARKER */}
                      <div className="absolute top-[52%] left-[48%] flex flex-col items-center select-none">
                        <span className="absolute w-12 h-12 rounded-full border-2 border-red-500 animate-ping opacity-65 pointer-events-none" />
                        <span className="absolute w-20 h-20 rounded-full border border-red-500/20 animate-ping opacity-40 pointer-events-none" />
                        
                        <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shadow-lg transition-all ${panicActive ? 'bg-red-500 animate-bounce' : 'bg-[#1C0606] border border-red-500/30'}`}>
                          <ShieldAlert className={`w-4 h-4 ${panicActive ? 'text-white' : 'text-red-500'}`} />
                        </div>
                        
                        <div className="bg-slate-950/90 border border-red-500/30 px-2 py-0.5 rounded mt-1 text-[8px] font-black text-red-400 text-center uppercase tracking-wide">
                          {panicActive ? 'SOS ACTIVO (R. Gómez)' : 'PUNTO DE MONITOREO'}
                        </div>
                      </div>

                      {/* Map info bar overlay */}
                      <div className="mt-auto w-full flex items-end justify-between z-10 pointer-events-none">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">PACHUCA DE SOTO • COBERTURA 100% C5i</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Sincronización Satelital GPS: En Linea</span>
                      </div>
                    </div>

                    {/* Quick map layers filters */}
                    <div className="bg-slate-950/40 p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.04]">
                      <div className="flex items-center gap-3.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capas de Monitoreo:</span>
                        <div className="flex items-center gap-2.5">
                          <label className="flex items-center gap-1.5 text-xs text-slate-300 font-medium select-none">
                            <input type="checkbox" defaultChecked className="rounded accent-emerald-500 cursor-pointer" />
                            <span>Patrullas</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-slate-300 font-medium select-none">
                            <input type="checkbox" defaultChecked className="rounded accent-red-500 cursor-pointer" />
                            <span>Alarmas S.O.S</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-slate-300 font-medium select-none">
                            <input type="checkbox" defaultChecked className="rounded accent-blue-500 cursor-pointer" />
                            <span>Cámaras Viales</span>
                          </label>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold font-sans">
                        Ubicación Central: Plaza Juárez, Hgo
                      </div>
                    </div>
                  </div>

                  {/* COLA 2: SYSTEM LOGS TERMINAL FEED */}
                  <div className="lg:col-span-4 bg-[#000000]/80 border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md shadow-xl flex flex-col h-[420px]">
                    <div className="border-b border-white/[0.05] pb-3 mb-3.5 flex items-center justify-between">
                      <h4 className="text-[10px] font-black tracking-wider text-slate-400 uppercase">TELEMETRÍA EN VIVO (C5i)</h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Console system streams */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[10px] leading-relaxed select-text scrollbar-thin scrollbar-thumb-white/10">
                      {logs.map((log, index) => (
                        <div key={index} className="flex items-start gap-2 text-slate-300">
                          <span className="text-slate-500 font-bold shrink-0">{log.time}</span>
                          
                          {/* Severity log badge */}
                          <span className={`shrink-0 px-1 rounded text-[7.5px] font-black uppercase ${
                            log.type === 'error' 
                              ? 'bg-red-500/10 text-red-400' 
                              : log.type === 'warning' 
                                ? 'bg-amber-500/10 text-amber-400' 
                                : log.type === 'success' 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {log.type === 'error' ? 'ALERTA' : log.type === 'warning' ? 'GPS' : log.type === 'success' ? 'ÉXITO' : 'INFO'}
                          </span>
                          
                          <span className="text-slate-200">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        )}
      </main>

      {/* SYSTEM LOGS & METRICS FOOTER */}
      <footer className="relative z-10 w-full bg-slate-950/60 border-t border-white/[0.05] p-5 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
          <div>ENTORNO SEGURO DE SEGURIDAD PÚBLICA • COBERTURA GUBERNAMENTAL • ESTADO DE HIDALGO, MÉXICO</div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SISTEMA AUDITADO</span>
            </span>
            <span>BATERÍA GLOBAL: {batteryLevel}%</span>
            <span>LICENCIA DE BASE: C5i-HIDALGO-PROD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
