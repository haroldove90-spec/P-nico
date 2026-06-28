import React, { useState, useEffect } from 'react';
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
    let timer: NodeJS.Timeout;
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
            {isActive ? `SISTEMA ALERTA ACTIVA (${countdown}s)` : 'ESTADO: PROTEGIDO'}
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
});
