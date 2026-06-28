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
import { Shield, ShieldAlert, Navigation, Phone, Users, ChevronRight, Eye } from 'lucide-react-native';

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
    } else if (isActive && countdown === 0) {
      // Alerta enviada con éxito al C4 Hidalgo
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
      
      {/* Fondo con degradado simulado */}
      <View style={styles.backgroundGradient} />

      {/* HEADER / INDICADOR DE ESTADO MINIMALISTA */}
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          {/* Icono GPS latiendo / radar */}
          <View style={styles.gpsContainer}>
            <Animated.View 
              style={[
                styles.radarWave, 
                { transform: [{ scale: radarScale }], opacity: radarOpacity }
              ]} 
            />
            <View style={[styles.gpsDot, isActive && styles.gpsDotAlert]} />
          </View>
          
          <Text style={styles.statusText}>
            Estado: <Text style={isActive ? styles.statusAlertHighlight : styles.statusSuccessHighlight}>
              {isActive ? `ALERTA ENVIADA (${countdown}s)` : 'Protegido'}
            </Text>
          </Text>
        </View>
        <Text style={styles.locationSubtitle}>Pachuca de Soto, Hidalgo</Text>
      </View>

      {/* BOTÓN DE PÁNICO CENTRAL */}
      <View style={styles.centerContainer}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={handlePanicPress}
            style={[
              styles.panicButtonOuter,
              isActive ? styles.panicButtonAlertOuter : styles.panicButtonNormalOuter
            ]}
          >
            <View style={[
              styles.panicButtonInner,
              isActive ? styles.panicButtonAlertInner : styles.panicButtonNormalInner
            ]}>
              {isActive ? (
                <ShieldAlert size={56} color="#FFFFFF" strokeWidth={2} />
              ) : (
                <Shield size={56} color="#FFFFFF" strokeWidth={2} />
              )}
              
              <Text style={styles.panicButtonText}>
                {isActive ? 'CANCELAR' : 'PÁNICO'}
              </Text>
              
              <Text style={styles.panicButtonSubtext}>
                {isActive ? 'Mantén presionado' : 'Presiona 3 seg o doble toque'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Glow exterior dinámico */}
        <View style={[
          styles.glowShadow,
          isActive ? styles.glowShadowAlert : styles.glowShadowNormal
        ]} />
      </View>

      {/* TARJETA FLOTANTE INFERIOR */}
      <View style={styles.bottomCard}>
        {/* Sección "Acompáñame" */}
        <View style={styles.companionSection}>
          <View style={styles.companionHeader}>
            <View style={styles.companionTitleContainer}>
              <View style={styles.companionIconBox}>
                <Navigation size={20} color="#ff2a5f" />
              </View>
              <View>
                <Text style={styles.companionTitle}>Acompáñame</Text>
                <Text style={styles.companionSubtitle}>Monitoreo en tiempo real de tu ruta</Text>
              </View>
            </View>
            
            {/* Toggle Switch Moderno */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setIsCompanionActive(!isCompanionActive)}
              style={[
                styles.toggleContainer, 
                isCompanionActive ? styles.toggleActive : styles.toggleInactive
              ]}
            >
              <View style={[
                styles.toggleCircle,
                isCompanionActive ? styles.toggleCircleActive : styles.toggleCircleInactive
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sección "Contactos Seguros" */}
        <View style={styles.contactsSection}>
          <Text style={styles.sectionTitle}>Contactos de Confianza</Text>
          <View style={styles.contactsRow}>
            {/* Contacto 1 */}
            <View style={styles.contactItem}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>MÁ</Text>
                <View style={styles.activeContactDot} />
              </View>
              <Text style={styles.contactName} numberOfLines={1}>Mamá</Text>
            </View>

            {/* Contacto 2 */}
            <View style={styles.contactItem}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>PA</Text>
                <View style={styles.activeContactDot} />
              </View>
              <Text style={styles.contactName} numberOfLines={1}>Papá</Text>
            </View>

            {/* Contacto 3 */}
            <View style={styles.contactItem}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>ES</Text>
                <View style={styles.activeContactDot} />
              </View>
              <Text style={styles.contactName} numberOfLines={1}>Esposa</Text>
            </View>

            {/* Botón Añadir Contacto */}
            <TouchableOpacity style={styles.addContactButton} activeOpacity={0.7}>
              <Users size={20} color="#9ca3af" />
              <Text style={styles.addContactText}>Gestionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090c',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#08090c',
    // En un proyecto real de RN, usarías <LinearGradient> de expo-linear-gradient
    // Simulado aquí con un color de fondo base oscuro y un overlay estilizado
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.05,
    paddingHorizontal: 24,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 21, 26, 0.75)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  gpsContainer: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  gpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981', // Verde de protección
  },
  gpsDotAlert: {
    backgroundColor: '#ff2a5f', // Rojo de alerta
  },
  radarWave: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(16, 185, 129, 0.4)',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  statusSuccessHighlight: {
    color: '#10b981',
    fontWeight: '700',
  },
  statusAlertHighlight: {
    color: '#ff2a5f',
    fontWeight: '700',
  },
  locationSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  panicButtonOuter: {
    width: width * 0.62,
    height: width * 0.62,
    borderRadius: (width * 0.62) / 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  panicButtonNormalOuter: {
    backgroundColor: 'rgba(255, 42, 95, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 42, 95, 0.25)',
  },
  panicButtonAlertOuter: {
    backgroundColor: 'rgba(255, 94, 58, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 94, 58, 0.4)',
  },
  panicButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.57) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  panicButtonNormalInner: {
    backgroundColor: '#ff2a5f', // Rojo neón vibrante base
  },
  panicButtonAlertInner: {
    backgroundColor: '#ff3a30', // Rojo de alerta activa continuo
  },
  panicButtonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 12,
  },
  panicButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 6,
  },
  glowShadow: {
    position: 'absolute',
    width: width * 0.58,
    height: width * 0.58,
    borderRadius: (width * 0.58) / 2,
    zIndex: 1,
    opacity: 0.5,
  },
  glowShadowNormal: {
    backgroundColor: '#ff2a5f',
    shadowColor: '#ff2a5f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },
  glowShadowAlert: {
    backgroundColor: '#ff5e3a',
    shadowColor: '#ff5e3a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 50,
  },
  bottomCard: {
    backgroundColor: 'rgba(19, 21, 26, 0.85)', // Glassmorphism oscuro
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: height * 0.04,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  companionSection: {
    paddingBottom: 4,
  },
  companionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 42, 95, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  companionSubtitle: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 2,
  },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#10b981',
  },
  toggleInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  toggleCircleInactive: {
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 16,
  },
  contactsSection: {},
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactItem: {
    alignItems: 'center',
    width: 60,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  activeContactDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
    borderWidth: 1.5,
    borderColor: '#13151a',
  },
  contactName: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  addContactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderStyle: 'dashed',
  },
  addContactText: {
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});
