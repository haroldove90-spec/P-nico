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
  LogOut
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
    <div id="panic_app_root" className="min-h-screen w-full bg-[#030712] text-slate-100 font-sans antialiased relative overflow-x-hidden selection:bg-red-500 selection:text-white flex flex-col justify-between">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-[#030712] z-0 overflow-hidden pointer-events-none">
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
              className="w-full bg-[#070c1b]/60 border border-white/[0.08] backdrop-blur-xl p-8 rounded-[28px] shadow-[0_24px_50px_rgba(0,0,0,0.6)] space-y-6 text-center"
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
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full"
              >
                {/* LEFT CORE: SOS BUTTON TRIGGER */}
                <div className="md:col-span-6 bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-8 rounded-[28px] backdrop-blur-md shadow-xl flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
                  
                  {/* Realtime GPS Satelital telemetry */}
                  <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${panicActive ? 'bg-red-500' : 'bg-emerald-400'}`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${panicActive ? 'bg-red-500' : 'bg-emerald-400'}`} />
                      </span>
                      <span className="text-[10px] font-bold text-slate-200">
                        {panicActive ? `ALERTA ACTIVA (${countdown}s)` : 'Enlace Conectado'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider">SATELLITE GPS ACTIVE</span>
                  </div>

                  {/* Concentric Pulsing shockwaves */}
                  <div className="flex-1 flex flex-col justify-center items-center py-12 relative w-full">
                    <AnimatePresence>
                      {panicActive && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                            className="absolute w-56 aspect-square rounded-full border-2 border-red-500/30 bg-red-500/[0.02]"
                          />
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.4 }}
                            animate={{ scale: 2.3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 0.5 }}
                            className="absolute w-56 aspect-square rounded-full border border-red-500/10"
                          />
                        </div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePanicToggle}
                      className={`relative w-48 aspect-square rounded-full flex flex-col items-center justify-center border-4 shadow-3xl cursor-pointer transition-all duration-300 ${
                        panicActive 
                          ? 'bg-gradient-to-br from-red-600 to-red-500 border-white/20 shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-pulse' 
                          : 'bg-[#1e0707] border-red-500/30 hover:border-red-500/50 hover:bg-[#2e0909] shadow-[0_0_35px_rgba(239,68,68,0.15)]'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center p-4 text-center select-none">
                        {panicActive ? (
                          <>
                            <ShieldAlert className="w-14 h-14 text-white animate-bounce" />
                            <span className="text-3xl font-black text-white mt-1">
                              {countdown > 0 ? countdown : 'C5i'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-14 h-14 text-red-500" />
                            <span className="text-3xl font-black text-white mt-1">S.O.S.</span>
                          </>
                        )}
                        <span className="text-[10px] font-black tracking-widest text-white/80 uppercase mt-3">
                          {panicActive ? 'Presiona para Cancelar' : 'PRESIONAR ENLACE'}
                        </span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Satellite Coordinates and telemetry logs */}
                  <div className="w-full text-center space-y-1 mt-auto pt-4 border-t border-white/[0.04]">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Ubicación actual: {simulatedLat.toFixed(5)}°, {simulatedLng.toFixed(5)}° (Pachuca Centro)</span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium">Batería del dispositivo: {batteryLevel}% • Precisión: 2 metros</p>
                  </div>
                </div>

                {/* RIGHT CORE: LIVE SERVICES (ACOMPAÑAME & CONTACTS) */}
                <div className="md:col-span-6 space-y-6">
                  
                  {/* service 1: Acompáñame Live escort */}
                  <div className="bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                          <Navigation className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">Servicio de Escolta "Acompáñame"</h3>
                          <p className="text-[10px] text-slate-400">Monitoreo activo y continuo de ruta en C5i</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleCompanionToggle}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${companionActive ? 'bg-[#00FF88]' : 'bg-white/10'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${companionActive ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Interactive Escort visual timeline tracker */}
                    <div className="space-y-3.5">
                      <div 
                        onClick={handleCompanionToggle}
                        className="relative h-12 bg-white/[0.04] hover:bg-white/[0.07] rounded-xl flex items-center px-2 cursor-pointer overflow-hidden transition-all border border-white/[0.04]"
                      >
                        <div className={`absolute top-0 bottom-0 left-0 bg-amber-500/10 rounded-xl transition-all duration-500 ${companionActive ? 'w-full' : 'w-[15%]'}`} />
                        <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-900 shadow-md transition-all duration-500 ${companionActive ? 'translate-x-[260px] sm:translate-x-[360px] md:translate-x-[400px] lg:translate-x-[480px]' : 'translate-x-0'}`}>
                          <Navigation className="w-4 h-4 text-slate-900 transform rotate-45" />
                        </div>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400 select-none pointer-events-none">
                          {companionActive ? 'Geolocalizando trayecto en tiempo real...' : 'Desliza o activa para simular trayecto'}
                        </span>
                      </div>

                      {companionActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-white/[0.02] border border-[#00FF88]/10 p-3 rounded-xl space-y-2 text-[11px] text-emerald-400 font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Vigilancia de ruta activa por cámaras C5i</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                            Ruta simulada: <span className="text-white font-bold">Plaza Independencia (Pachuca) → Blvd. Colosio</span>. Tu dispositivo enviará paquetes telemétricos cada 3 segundos.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* service 2: Trusted Circles & Contacts Manager */}
                  <div className="bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-lg space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white">Contactos de Confianza (Enlaces)</h3>
                        <p className="text-[10px] text-slate-400">Familiares alertados inmediatamente al activar S.O.S.</p>
                      </div>
                      
                      <button 
                        onClick={() => setShowAddContact(!showAddContact)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${showAddContact ? 'bg-white/15 border-white/20 text-white' : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/25'}`}
                      >
                        {showAddContact ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{showAddContact ? 'Cancelar' : 'Añadir Enlace'}</span>
                      </button>
                    </div>

                    {/* Inline form to add contacts */}
                    <AnimatePresence>
                      {showAddContact && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleAddContact}
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
                            <span>Registrar Contacto</span>
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
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#030712]" />
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
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ROLEPERSPECTIVE 2: AGENTE (Response Officer Interface) */}
            {hubRole === 'agente' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full"
              >
                {/* LEFT CORE: DISPATCH NOTIFICATION & GPS GPS NAVEGADOR */}
                <div className="md:col-span-7 bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-xl space-y-6">
                  
                  {/* Officer active duty status header */}
                  <div className="bg-slate-900/40 border border-white/[0.05] p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Shield className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Unidad Hidalgo 04</h3>
                        <p className="text-[10px] text-slate-400">Patrulla de Respuesta Inmediata Pachuca Centro</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setHubAgentActive(!hubAgentActive)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${hubAgentActive ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-white/5 border border-white/10 text-slate-500'}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${hubAgentActive ? 'bg-slate-950' : 'bg-slate-600'}`} />
                      <span>{hubAgentActive ? 'DISPONIBLE' : 'INACTIVO'}</span>
                    </button>
                  </div>

                  {/* Active Incident Dispatch Alert Card */}
                  <div className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${hubAlertAccepted ? 'bg-emerald-500/[0.02] border-emerald-500/15' : 'bg-red-500/[0.02] border-red-500/25 animate-pulse'}`}>
                    <div className="flex justify-between items-start">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black tracking-widest ${hubAlertAccepted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                        {hubAlertAccepted ? 'INCIDENTE ATENDIDO POR U-04' : 'C5i DISPATCH: CÓDIGO ROJO'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>a 1.2 km</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-white">Ciudadano: Rosa María Gómez (S.O.S.)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Ubicación: <span className="text-white font-bold">Av. Juárez esq. Guerrero, Pachuca Centro</span> (Referencia: Frente a Reloj Monumental)
                      </p>
                    </div>

                    {!hubAlertAccepted ? (
                      <div className="flex gap-3 pt-2">
                        <button 
                          onClick={() => alert('Coordinando con central C5i para redistribuir patrulla...')}
                          className="flex-1 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-bold transition-all cursor-pointer border border-white/[0.06]"
                        >
                          Rechazar/Delegar
                        </button>
                        <button 
                          onClick={() => {
                            setHubAlertAccepted(true);
                            addLog({
                              time: new Date().toLocaleTimeString(),
                              type: 'success',
                              message: '🚓 Unidad Hidalgo-04 aceptó la alerta de pánico. Trazando ruta crítica hacia Av. Juárez.'
                            });
                          }}
                          className="flex-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Aceptar Despacho</span>
                        </button>
                      </div>
                    ) : (
                      /* Active response route telemetry */
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-slate-950/80 border border-emerald-500/20 p-4 rounded-xl space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>EN RUTA CRÍTICA HACIA OBJETIVO</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">VEL: 54 km/h</span>
                        </div>

                        {/* Interactive compass & navigator panel */}
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 animate-pulse">
                              <Navigation className="w-4 h-4 transform -rotate-45" />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-white">Continuar por Av. Juárez</div>
                              <div className="text-[9px] text-slate-500">Da vuelta a la izquierda en 150m</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-mono font-black text-emerald-400">950 m</div>
                            <div className="text-[9px] text-slate-500">Tiempo: 1.5 min</div>
                          </div>
                        </div>

                        <button 
                          onClick={() => alert('Simulador GPS: Ruta sincronizada activamente con despacho de C5i.')}
                          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Map className="w-4 h-4" />
                          <span>Ver Mapa Táctico GPS</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* RIGHT CORE: CASE RESOLUTION & TECHNICAL REPORTS */}
                <div className="md:col-span-5 bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-6 rounded-[28px] backdrop-blur-md shadow-xl space-y-5">
                  <div className="space-y-1.5 border-b border-white/[0.05] pb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Informe Técnico Operativo</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">Envío de evidencias y comentarios de resolución de alerta para base de datos de seguridad.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Diagnóstico / Resolución de Alerta
                      </label>
                      <textarea 
                        value={hubClosingReport}
                        onChange={(e) => setHubClosingReport(e.target.value)}
                        placeholder="Ingresa la bitácora o resolución del incidente (ej. Alerta atendida. Ciudadano se encuentra seguro. Sin lesionados. Unidad Hidalgo-04 retorna a patrullaje)..."
                        className="w-full bg-slate-950 border border-white/[0.08] focus:border-emerald-500/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none h-28 resize-none transition-all leading-relaxed"
                      />
                    </div>

                    <button 
                      disabled={!hubClosingReport.trim() || hubReportSubmitted}
                      onClick={() => {
                        setHubReportSubmitted(true);
                        addLog({
                          time: new Date().toLocaleTimeString(),
                          type: 'success',
                          message: `📝 Reporte de Cierre Oficial (U-04): "${hubClosingReport.slice(0, 45)}..." guardado en histórico C5i.`
                        });
                        setTimeout(() => {
                          setHubClosingReport('');
                          setHubReportSubmitted(false);
                          setHubAlertAccepted(false);
                        }, 3000);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        (!hubClosingReport.trim() || hubReportSubmitted) 
                          ? 'bg-white/[0.03] text-slate-500 cursor-not-allowed border border-white/[0.05]' 
                          : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98'
                      }`}
                    >
                      {hubReportSubmitted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                          <span>Reporte Enviado Correctamente</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Reporte Oficial</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
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
                  <div className="bg-gradient-to-r from-[#0d152a]/60 to-[#070c1b]/60 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">3.8 minutos</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Tiempo de Reacción (Promedio)</div>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="bg-gradient-to-r from-[#0d152a]/60 to-[#070c1b]/60 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white">18 Unidades</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Patrullas Activas en Turno</div>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="bg-gradient-to-r from-[#0d152a]/60 to-[#070c1b]/60 border border-white/[0.08] p-4.5 rounded-2xl flex items-center gap-4.5 backdrop-blur-md">
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
                  <div className="lg:col-span-8 bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col min-h-[420px]">
                    
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
                    <div className="flex-1 h-80 relative bg-[#050914] flex flex-col justify-between p-4 border-b border-white/[0.02]">
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
                  <div className="lg:col-span-4 bg-gradient-to-b from-[#0e1630]/60 to-[#070c1b]/60 border border-white/[0.08] p-5 rounded-3xl backdrop-blur-md shadow-xl flex flex-col h-[420px]">
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
