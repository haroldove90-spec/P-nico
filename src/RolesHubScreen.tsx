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
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
// Iconos de Lucide para React Native
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

// Tipos para el estado del agente y alertas de C4
type ActiveRole = 'ciudadano' | 'agente' | 'c4';

export default function RolesHubScreen() {
  const [activeRole, setActiveRole] = useState<ActiveRole>('ciudadano');
  
  // ==========================================
  // ESTADOS COMUNES / SIMULACIÓN
  // ==========================================
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [companionActive, setCompanionActive] = useState(false);
  const [agentActive, setAgentActive] = useState(true);
  const [alertAccepted, setAlertAccepted] = useState(false);
  const [closingReport, setClosingReport] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  
  // Animaciones de radar y respiración de botón
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const radarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de respiración del botón central S.O.S.
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

    // Animación de onda de radar constante
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ).start();
  }, []);

  // Contador para S.O.S
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
    if (panicActive) {
      setPanicActive(false);
      setCountdown(5);
    } else {
      setPanicActive(true);
      setCountdown(5);
    }
  };

  // Interpolación de ondas del radar
  const radarScale = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.4],
  });

  const radarOpacity = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  // Enviar reporte de agente
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
      
      {/* HEADER SELECTOR DE ROL SUPERIOR */}
      <View style={styles.roleSelectorContainer}>
        <Text style={styles.hubTitle}>HIDALGO ALERTA HUB</Text>
        <Text style={styles.hubSubtitle}>Demostración Interactiva Multi-Rol</Text>
        
        <View style={styles.tabsWrapper}>
          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'ciudadano' && styles.roleTabActive]}
            onPress={() => setActiveRole('ciudadano')}
            activeOpacity={0.8}
          >
            <User size={14} color={activeRole === 'ciudadano' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'ciudadano' && styles.roleTabTextActive]}>
              Ciudadano
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'agente' && styles.roleTabActive]}
            onPress={() => setActiveRole('agente')}
            activeOpacity={0.8}
          >
            <Shield size={14} color={activeRole === 'agente' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'agente' && styles.roleTabTextActive]}>
              Agente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleTab, activeRole === 'c4' && styles.roleTabActive]}
            onPress={() => setActiveRole('c4')}
            activeOpacity={0.8}
          >
            <Radio size={14} color={activeRole === 'c4' ? '#FFFFFF' : 'rgba(255,255,255,0.4)'} />
            <Text style={[styles.roleTabText, activeRole === 'c4' && styles.roleTabTextActive]}>
              C4 Central
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO SEGÚN ROL ACTIVO */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ==========================================
            VISTA 1: CIUDADANO (App Móvil)
            ========================================== */}
        {activeRole === 'ciudadano' && (
          <View style={styles.viewContainer}>
            {/* Indicador de GPS Superior */}
            <View style={styles.gpsIndicatorRow}>
              <View style={styles.protectedBadge}>
                <View style={styles.gpsIconContainer}>
                  <Animated.View style={[styles.radarWave, { transform: [{ scale: radarScale }], opacity: radarOpacity }]} />
                  <View style={[styles.pulseDot, panicActive ? styles.pulseDotAlert : styles.pulseDotNormal]} />
                </View>
                <Text style={styles.protectedText}>
                  Estado: <Text style={panicActive ? styles.textAlert : styles.textSuccess}>{panicActive ? `Alerta Activa (${countdown}s)` : 'Protegido'}</Text>
                </Text>
              </View>
              <Text style={styles.locationLabel}>Pachuca, Hgo</Text>
            </View>

            {/* Gran Botón de Pánico Central */}
            <View style={styles.panicButtonSection}>
              <Animated.View style={[
                styles.glowBackdrop, 
                panicActive ? styles.glowBackdropAlert : styles.glowBackdropNormal,
                { transform: [{ scale: pulseAnim }] }
              ]} />
              
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity 
                  onPress={handlePanicPress}
                  activeOpacity={0.85} 
                  style={[styles.sosButton, panicActive ? styles.sosButtonAlert : styles.sosButtonNormal]}
                >
                  <ShieldAlert size={54} color="#FFFFFF" strokeWidth={2.2} />
                  <Text style={styles.sosText}>S.O.S.</Text>
                  <Text style={styles.sosSubtext}>
                    {panicActive ? 'PRESIONA PARA CANCELAR' : 'MANTÉN PRESIONADO PARA ENVIAR'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Tarjeta Acompáñame */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={styles.cardIconBox}>
                    <Navigation size={18} color="#FF9500" />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Acompáñame</Text>
                    <Text style={styles.cardSubtitle}>Monitoreo estético de ruta en vivo</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.toggleSwitch, companionActive ? styles.toggleSwitchOn : styles.toggleSwitchOff]}
                  onPress={() => setCompanionActive(!companionActive)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.toggleCircle, companionActive ? styles.toggleCircleOn : styles.toggleCircleOff]} />
                </TouchableOpacity>
              </View>

              {/* Slider track visual */}
              <View style={styles.sliderMockTrack}>
                <View style={[styles.sliderMockProgress, { width: companionActive ? '100%' : '35%' }]} />
                <View style={[styles.sliderMockThumb, { left: companionActive ? '92%' : '32%' }]}>
                  <Navigation size={12} color="#080808" />
                </View>
                <Text style={styles.sliderMockText}>
                  {companionActive ? 'Compartiendo ruta en tiempo real...' : 'Desliza para simular trayecto'}
                </Text>
              </View>
            </View>

            {/* Contactos de Confianza */}
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Contactos de Confianza</Text>
              <View style={styles.contactsGrid}>
                {[
                  { initials: 'MÁ', name: 'Mamá', color: '#FF9500' },
                  { initials: 'PA', name: 'Papá', color: '#5856D6' },
                  { initials: 'ES', name: 'Esposa', color: '#FF2D55' }
                ].map((c, i) => (
                  <View key={i} style={styles.contactItem}>
                    <View style={[styles.contactAvatar, { borderColor: c.color }]}>
                      <Text style={[styles.contactInitials, { color: c.color }]}>{c.initials}</Text>
                      <View style={styles.contactOnlineDot} />
                    </View>
                    <Text style={styles.contactName}>{c.name}</Text>
                  </View>
                ))}
                
                <TouchableOpacity style={styles.addContactButton} activeOpacity={0.7}>
                  <Plus size={20} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.addContactText}>Nuevo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ==========================================
            VISTA 2: AGENTE DE SEGURIDAD
            ========================================== */}
        {activeRole === 'agente' && (
          <View style={styles.viewContainer}>
            {/* Cabecera del Oficial */}
            <View style={styles.officerHeader}>
              <View style={styles.officerInfo}>
                <View style={styles.officerAvatarBox}>
                  <Shield size={20} color="#00FF88" />
                </View>
                <View>
                  <Text style={styles.officerName}>Oficial: Unidad 04</Text>
                  <Text style={[styles.officerStatus, agentActive ? styles.textSuccess : styles.textMuted]}>
                    {agentActive ? 'Patrullaje Activo' : 'Fuera de Servicio'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.toggleSwitch, agentActive ? styles.toggleSwitchOn : styles.toggleSwitchOff]}
                onPress={() => setAgentActive(!agentActive)}
                activeOpacity={0.8}
              >
                <View style={[styles.toggleCircle, agentActive ? styles.toggleCircleOn : styles.toggleCircleOff]} />
              </TouchableOpacity>
            </View>

            {/* Alerta Recibida por Proximidad (Tarjeta Flotante Simulada) */}
            <View style={[styles.alertFloatingCard, alertAccepted && styles.alertFloatingCardAccepted]}>
              <View style={styles.alertHeaderRow}>
                <View style={styles.alertBadge}>
                  <AlertTriangle size={14} color="#FF3B30" />
                  <Text style={styles.alertBadgeText}>ALERTA EN PROGRESO</Text>
                </View>
                <Text style={styles.alertDistance}>A 1.2 km de distancia</Text>
              </View>

              <Text style={styles.alertVictimTitle}>Víctima: Rosa María Gómez</Text>
              <Text style={styles.alertLocationText}>Ubicación: Av. Juárez esq. Guerrero, Pachuca Centro</Text>

              {/* Botones de acción */}
              {!alertAccepted ? (
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity 
                    style={styles.declineButton} 
                    onPress={() => alert('Alerta delegada a otra unidad')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.declineButtonText}>Delegar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.acceptButton} 
                    onPress={() => setAlertAccepted(true)}
                    activeOpacity={0.8}
                  >
                    <CheckCircle2 size={16} color="#FFFFFF" />
                    <Text style={styles.acceptButtonText}>Aceptar Servicio</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.acceptedBanner}>
                  <View style={styles.acceptedStatusLeft}>
                    <View style={styles.pulseDotAlert} />
                    <Text style={styles.acceptedStatusText}>Unidad en ruta de respuesta rápida</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.gpsRouteButton}
                    onPress={() => alert('Simulando navegación por GPS guiada al punto de incidente...')}
                    activeOpacity={0.8}
                  >
                    <Navigation size={14} color="#FFFFFF" />
                    <Text style={styles.gpsRouteButtonText}>Ver Ruta GPS</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Reporte de Cierre Rápido */}
            <View style={styles.card}>
              <View style={styles.formHeader}>
                <FileText size={18} color="#00FF88" />
                <Text style={styles.formTitle}>Reporte de Cierre de Alerta</Text>
              </View>
              
              <Text style={styles.formLabel}>Describe brevemente el resultado del servicio:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. Falsa alarma, riña controlada, traslado médico concluido..."
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={closingReport}
                onChangeText={setClosingReport}
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity 
                style={[
                  styles.submitButton, 
                  (!closingReport.trim() || reportSubmitted) && styles.submitButtonDisabled
                ]}
                onPress={handleSubmitReport}
                disabled={!closingReport.trim() || reportSubmitted}
                activeOpacity={0.8}
              >
                {reportSubmitted ? (
                  <CheckCircle2 size={16} color="#080808" />
                ) : (
                  <Send size={16} color="#080808" />
                )}
                <Text style={styles.submitButtonText}>
                  {reportSubmitted ? 'Reporte Enviado Exitosamente' : 'Enviar Evidencia de Cierre'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ==========================================
            VISTA 3: CENTRAL C4 / C5i
            ========================================== */}
        {activeRole === 'c4' && (
          <View style={styles.viewContainer}>
            {/* Métricas Rápidas KPI */}
            <View style={styles.kpiRow}>
              <View style={styles.kpiCard}>
                <Clock size={16} color="#FF3B30" />
                <View style={styles.kpiContent}>
                  <Text style={styles.kpiValue}>4.2 min</Text>
                  <Text style={styles.kpiLabel}>Tiempo de Reacción</Text>
                </View>
              </View>
              
              <View style={styles.kpiCard}>
                <TrendingUp size={16} color="#00FF88" />
                <View style={styles.kpiContent}>
                  <Text style={styles.kpiValue}>18</Text>
                  <Text style={styles.kpiLabel}>Oficiales Activos</Text>
                </View>
              </View>
            </View>

            {/* Mapa de Incidentes Simulado */}
            <View style={styles.mapContainer}>
              <View style={styles.mapHeader}>
                <View style={styles.mapTitleLeft}>
                  <Activity size={14} color="#FF3B30" />
                  <Text style={styles.mapTitle}>Mapa Operativo C5i Pachuca</Text>
                </View>
                <View style={styles.liveIndicator}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>EN VIVO</Text>
                </View>
              </View>

              {/* Lienzo simulación de mapa satelital */}
              <View style={styles.mapCanvas}>
                {/* Cuadrículas e indicadores abstractos */}
                <View style={styles.gridLineH1} />
                <View style={styles.gridLineH2} />
                <View style={styles.gridLineV1} />
                <View style={styles.gridLineV2} />
                
                {/* Patrulla 1 */}
                <View style={[styles.mapMarker, { top: '35%', left: '20%' }]}>
                  <View style={styles.patrolMarkerDot} />
                  <Text style={styles.markerLabel}>U-04</Text>
                </View>

                {/* Patrulla 2 */}
                <View style={[styles.mapMarker, { top: '65%', left: '75%' }]}>
                  <View style={styles.patrolMarkerDot} />
                  <Text style={styles.markerLabel}>U-12</Text>
                </View>

                {/* Alerta Crítica Activa */}
                <View style={[styles.mapMarker, { top: '48%', left: '55%' }]}>
                  <View style={styles.alertMarkerRing} />
                  <View style={styles.alertMarkerDot} />
                  <Text style={styles.alertMarkerLabel}>S.O.S ACTIVO</Text>
                </View>

                <Text style={styles.mapScaleText}>Escala: Pachuca Centro • 500m</Text>
              </View>
            </View>

            {/* Lista de Alertas en Tiempo Real */}
            <View style={styles.card}>
              <Text style={styles.tableTitle}>Monitoreo de Alertas Recientes</Text>
              
              {/* Tabla minimalista simulada */}
              <View style={styles.table}>
                {/* Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCol, { flex: 1.2 }]}>Usuario</Text>
                  <Text style={[styles.tableCol, { flex: 1.5 }]}>Ubicación</Text>
                  <Text style={[styles.tableCol, { flex: 0.9 }]}>Respuesta</Text>
                  <Text style={[styles.tableCol, { flex: 1, textAlign: 'right' }]}>Estado</Text>
                </View>

                {/* Fila 1 */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1.2, fontWeight: '700' }]}>R. María</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>Pachuca Centro</Text>
                  <Text style={[styles.tableCell, { flex: 0.9, color: '#FF9500' }]}>1.5 min</Text>
                  <View style={[styles.tableCellBadge, { flex: 1, backgroundColor: 'rgba(255, 59, 48, 0.15)' }]}>
                    <Text style={[styles.tableBadgeText, { color: '#FF3B30' }]}>Crítico</Text>
                  </View>
                </View>

                {/* Fila 2 */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1.2, fontWeight: '700' }]}>J. Ortega</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>Plaza Q</Text>
                  <Text style={[styles.tableCell, { flex: 0.9, color: '#00FF88' }]}>3.8 min</Text>
                  <View style={[styles.tableCellBadge, { flex: 1, backgroundColor: 'rgba(0, 255, 136, 0.15)' }]}>
                    <Text style={[styles.tableBadgeText, { color: '#00FF88' }]}>Atendido</Text>
                  </View>
                </View>

                {/* Fila 3 */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 1.2, fontWeight: '700' }]}>A. Sánchez</Text>
                  <Text style={[styles.tableCell, { flex: 1.5 }]}>Zorros Hgo</Text>
                  <Text style={[styles.tableCell, { flex: 0.9, color: '#00FF88' }]}>4.1 min</Text>
                  <View style={[styles.tableCellBadge, { flex: 1, backgroundColor: 'rgba(0, 255, 136, 0.15)' }]}>
                    <Text style={[styles.tableBadgeText, { color: '#00FF88' }]}>Atendido</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// ESTILOS DE REACT NATIVE (SHEET)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  roleSelectorContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#0B0C0E',
  },
  hubTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  hubSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '500',
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 11,
  },
  roleTabActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  roleTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  viewContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  
  // VISTA CIUDADANO STYLES
  gpsIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  protectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  gpsIconContainer: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pulseDotNormal: {
    backgroundColor: '#00FF88',
  },
  pulseDotAlert: {
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
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textSuccess: {
    color: '#00FF88',
    fontWeight: '700',
  },
  textAlert: {
    color: '#FF3B30',
    fontWeight: '700',
  },
  locationLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  panicButtonSection: {
    height: height * 0.28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  glowBackdrop: {
    position: 'absolute',
    width: width * 0.52,
    height: width * 0.52,
    borderRadius: (width * 0.52) / 2,
    blurRadius: 40,
  },
  glowBackdropNormal: {
    backgroundColor: 'rgba(255, 59, 48, 0.07)',
  },
  glowBackdropAlert: {
    backgroundColor: 'rgba(255, 59, 48, 0.22)',
  },
  sosButton: {
    width: Math.min(width * 0.48, 190),
    height: Math.min(width * 0.48, 190),
    borderRadius: Math.min(width * 0.48, 190) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sosButtonNormal: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  sosButtonAlert: {
    backgroundColor: '#D0021B',
    shadowColor: '#D0021B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 10,
  },
  sosText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  sosSubtext: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    letterSpacing: 0.8,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 2,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 1,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchOn: {
    backgroundColor: '#00FF88',
  },
  toggleSwitchOff: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleOn: {
    alignSelf: 'flex-end',
  },
  toggleCircleOff: {
    alignSelf: 'flex-start',
  },
  sliderMockTrack: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    marginTop: 14,
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  sliderMockProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 149, 0, 0.15)',
    borderRadius: 20,
  },
  sliderMockThumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sliderMockText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    zIndex: -1,
  },
  sectionLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  contactsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  contactItem: {
    alignItems: 'center',
    width: 60,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    position: 'relative',
  },
  contactInitials: {
    fontSize: 14,
    fontWeight: '700',
  },
  contactOnlineDot: {
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
    color: 'rgba(255,255,255,0.5)',
    marginTop: 6,
    fontWeight: '500',
  },
  addContactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContactText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 6,
    fontWeight: '600',
  },

  // VISTA AGENTE STYLES
  officerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  officerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  officerAvatarBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  officerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  officerStatus: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  textMuted: {
    color: 'rgba(255,255,255,0.4)',
  },
  alertFloatingCard: {
    backgroundColor: 'rgba(255, 59, 48, 0.06)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 59, 48, 0.25)',
    padding: 16,
    gap: 12,
  },
  alertFloatingCardAccepted: {
    backgroundColor: 'rgba(0, 255, 136, 0.04)',
    borderColor: 'rgba(0, 255, 136, 0.25)',
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  alertBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FF3B30',
  },
  alertDistance: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  alertVictimTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  alertLocationText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 16,
  },
  actionButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
  acceptButton: {
    flex: 2.2,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  acceptButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  acceptedBanner: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 4,
  },
  acceptedStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDotAlert: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  acceptedStatusText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '700',
  },
  gpsRouteButton: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#00FF88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsRouteButtonText: {
    fontSize: 12,
    color: '#080808',
    fontWeight: '800',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  formLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 12,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  submitButton: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#00FF88',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 12,
    color: '#080808',
    fontWeight: '800',
  },

  // VISTA CENTRAL C4 STYLES
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 12,
  },
  kpiContent: {
    flexDirection: 'column',
  },
  kpiValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
    fontWeight: '600',
  },
  mapContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  mapTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FF3B30',
  },
  mapCanvas: {
    height: 180,
    backgroundColor: '#0F1012',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineH1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  gridLineV2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  patrolMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF88',
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  markerLabel: {
    fontSize: 8,
    color: '#00FF88',
    fontWeight: '700',
    marginTop: 2,
    backgroundColor: '#000000',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  alertMarkerRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF3B30',
    opacity: 0.6,
  },
  alertMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  alertMarkerLabel: {
    fontSize: 8,
    color: '#FF3B30',
    fontWeight: '900',
    marginTop: 4,
    backgroundColor: '#000000',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  mapScaleText: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 8,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '600',
  },
  tableTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  table: {
    flexDirection: 'column',
    gap: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 6,
  },
  tableCol: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  tableCell: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tableCellBadge: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  tableBadgeText: {
    fontSize: 8,
    fontWeight: '800',
  },
});
