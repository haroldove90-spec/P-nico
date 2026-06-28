import React, { useState, useEffect, useRef } from 'react';
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
