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

const { width: screenWidth } = Dimensions.get('window');

type ActiveRole = 'ciudadano' | 'agente' | 'c4';

export default function RolesHubScreen() {
  const [activeRole, setActiveRole] = useState<ActiveRole>('ciudadano');
  
  // ==========================================
  // ESTADOS Y EVENTOS SIMULADOS
  // ==========================================
  // Rol: Ciudadano
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [companionActive, setCompanionActive] = useState(false);
  
  // Rol: Agente
  const [agentActive, setAgentActive] = useState(true);
  const [alertAccepted, setAlertAccepted] = useState(false);
  const [closingReport, setClosingReport] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Animaciones
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const radarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Respiración del botón central
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1400,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Radar constante del indicador GPS
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ).start();
  }, [pulseAnim, radarAnim]);

  // Manejo del contador SOS
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (panicActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [panicActive, countdown]);

  const handlePanicToggle = () => {
    if (panicActive) {
      setPanicActive(false);
      setCountdown(5);
    } else {
      setPanicActive(true);
      setCountdown(5);
    }
  };

  const handleSendReport = () => {
    if (closingReport.trim()) {
      setReportSubmitted(true);
      setTimeout(() => {
        setClosingReport('');
        setReportSubmitted(false);
        setAlertAccepted(false);
      }, 2500);
    }
  };

  // Interpolación radar
  const radarScale = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.3],
  });

  const radarOpacity = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#030712" />
      
      {/* SELECTOR DE ROL SUPERIOR SEGMENTADO */}
      <View style={styles.roleSelectorContainer}>
        <Text style={styles.hubTitle}>HIDALGO ALERTA</Text>
        <Text style={styles.hubSubtitle}>Centro de Control de Enlaces Digitales</Text>
        
        <View style={styles.segmentedControl}>
          <TouchableOpacity 
            style={[styles.segmentButton, activeRole === 'ciudadano' && styles.segmentButtonActive]}
            onPress={() => setActiveRole('ciudadano')}
            activeOpacity={0.85}
          >
            <User size={14} color={activeRole === 'ciudadano' ? '#030712' : '#9CA3AF'} />
            <Text style={[styles.segmentText, activeRole === 'ciudadano' && styles.segmentTextActive]}>
              Ciudadano
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.segmentButton, activeRole === 'agente' && styles.segmentButtonActive]}
            onPress={() => setActiveRole('agente')}
            activeOpacity={0.85}
          >
            <Shield size={14} color={activeRole === 'agente' ? '#030712' : '#9CA3AF'} />
            <Text style={[styles.segmentText, activeRole === 'agente' && styles.segmentTextActive]}>
              Agente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.segmentButton, activeRole === 'c4' && styles.segmentButtonActive]}
            onPress={() => setActiveRole('c4')}
            activeOpacity={0.85}
          >
            <Radio size={14} color={activeRole === 'c4' ? '#030712' : '#9CA3AF'} />
            <Text style={[styles.segmentText, activeRole === 'c4' && styles.segmentTextActive]}>
              C4 Central
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO SCROLLABLE DE CADA ROL */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ==================== VISTA 1: CIUDADANO ==================== */}
        {activeRole === 'ciudadano' && (
          <View style={styles.viewContainer}>
            {/* Indicador GPS Superior */}
            <View style={styles.gpsRow}>
              <View style={styles.gpsBadge}>
                <View style={styles.gpsRadarContainer}>
                  <Animated.View style={[styles.radarCircle, { transform: [{ scale: radarScale }], opacity: radarOpacity }]} />
                  <View style={[styles.gpsDot, panicActive ? styles.gpsDotAlert : styles.gpsDotSafe]} />
                </View>
                <Text style={styles.gpsText}>
                  Estado: <Text style={panicActive ? styles.textRedNeon : styles.textGreenNeon}>{panicActive ? `Alerta Activa (${countdown}s)` : 'Protegido (Pachuca, Hgo)'}</Text>
                </Text>
              </View>
              <Text style={styles.trackingStatus}>{panicActive ? 'GPS Activo' : 'Satelital'}</Text>
            </View>

            {/* Botón de Pánico Central */}
            <View style={styles.panicContainer}>
              <Animated.View style={[
                styles.panicGlowBackdrop,
                panicActive ? styles.panicGlowBackdropActive : styles.panicGlowBackdropNormal,
                { transform: [{ scale: pulseAnim }] }
              ]} />
              
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity 
                  onPress={handlePanicToggle}
                  activeOpacity={0.85}
                  style={[styles.panicButton, panicActive ? styles.panicButtonActive : styles.panicButtonNormal]}
                >
                  <ShieldAlert size={screenWidth * 0.16} color="#FFFFFF" strokeWidth={2.2} />
                  <Text style={styles.panicButtonTextSOS}>S.O.S.</Text>
                  <Text style={styles.panicButtonActionText}>
                    {panicActive ? 'PRESIONA PARA CANCELAR' : 'PRESIONAR'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Tarjeta Inferior Flotante */}
            <View style={styles.cardContainer}>
              {/* Sección Acompáñame */}
              <View style={styles.acompaneHeader}>
                <View style={styles.acompaneIconBox}>
                  <Navigation size={18} color="#F59E0B" />
                </View>
                <View style={styles.acompaneTitleBox}>
                  <Text style={styles.acompaneTitle}>Acompáñame</Text>
                  <Text style={styles.acompaneDesc}>Monitoreo estético de ruta en vivo</Text>
                </View>
                
                {/* Switch interactivo de Acompáñame */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => setCompanionActive(!companionActive)}
                  style={[styles.customSwitch, companionActive ? styles.customSwitchOn : styles.customSwitchOff]}
                >
                  <View style={[styles.customSwitchThumb, companionActive ? styles.customSwitchThumbOn : styles.customSwitchThumbOff]} />
                </TouchableOpacity>
              </View>

              {/* Slider Track Estético */}
              <View style={styles.sliderMockTrack}>
                <View style={[styles.sliderMockProgress, { width: companionActive ? '100%' : '30%' }]} />
                <View style={[styles.sliderMockThumb, { left: companionActive ? '90%' : '26%' }]}>
                  <Navigation size={10} color="#030712" />
                </View>
                <Text style={styles.sliderMockLabel}>
                  {companionActive ? 'Geolocalizando trayecto activo...' : 'Desliza para simular trayecto'}
                </Text>
              </View>

              <View style={styles.divider} />

              {/* Acceso Rápido a Contactos de Confianza */}
              <Text style={styles.sectionTitle}>Contactos de Confianza</Text>
              <View style={styles.contactsGrid}>
                {[
                  { name: 'Mamá', initials: 'MÁ', color: '#EF4444' },
                  { name: 'Papá', initials: 'PA', color: '#10B981' },
                  { name: 'Esposa', initials: 'ES', color: '#3B82F6' },
                ].map((contact, i) => (
                  <View key={i} style={styles.contactCircleWrapper}>
                    <View style={[styles.contactAvatarCircle, { borderColor: contact.color }]}>
                      <Text style={[styles.contactInitials, { color: contact.color }]}>{contact.initials}</Text>
                      <View style={styles.onlineDotIndicator} />
                    </View>
                    <Text style={styles.contactNameLabel} numberOfLines={1}>{contact.name}</Text>
                  </View>
                ))}
                
                <TouchableOpacity style={styles.addContactCircleButton} activeOpacity={0.7}>
                  <Plus size={16} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.addContactLabel}>Añadir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ==================== VISTA 2: AGENTE DE SEGURIDAD ==================== */}
        {activeRole === 'agente' && (
          <View style={styles.viewContainer}>
            {/* Cabecera del Oficial */}
            <View style={styles.officerCard}>
              <View style={styles.officerProfileRow}>
                <View style={styles.officerAvatarWrapper}>
                  <Shield size={18} color="#10B981" />
                </View>
                <View style={styles.officerTextContainer}>
                  <Text style={styles.officerTitle}>Oficial: Unidad 04</Text>
                  <Text style={[styles.officerStatusText, agentActive ? styles.textGreenNeon : styles.textGray]}>
                    {agentActive ? 'Estado: Activo' : 'Estado: Inactivo'}
                  </Text>
                </View>
              </View>
              
              {/* Switch Funcional de Estado */}
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setAgentActive(!agentActive)}
                style={[styles.customSwitch, agentActive ? styles.customSwitchOn : styles.customSwitchOff]}
              >
                <View style={[styles.customSwitchThumb, agentActive ? styles.customSwitchThumbOn : styles.customSwitchThumbOff]} />
              </TouchableOpacity>
            </View>

            {/* Alerta Recibida por Proximidad (Tarjeta Flotante Roja/Naranja Neón) */}
            <View style={[styles.incomingAlertCard, alertAccepted && styles.incomingAlertCardAccepted]}>
              <View style={styles.alertHeader}>
                <View style={styles.alertHeaderBadge}>
                  <AlertTriangle size={12} color="#EF4444" />
                  <Text style={styles.alertHeaderBadgeText}>INCIDENTE EN PROGRESO</Text>
                </View>
                <Text style={styles.alertDistanceText}>A 1.2 km de distancia</Text>
              </View>

              <Text style={styles.alertVictimName}>Víctima: Rosa María Gómez</Text>
              <Text style={styles.alertAddress}>Dirección: Av. Juárez esq. Guerrero, Pachuca Centro</Text>

              {/* Botones Interactivos de la Alerta */}
              {!alertAccepted ? (
                <View style={styles.alertActionsRow}>
                  <TouchableOpacity 
                    style={styles.alertDeclineBtn}
                    onPress={() => alert('Alerta de proximidad delegada al centro C5i.')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.alertDeclineBtnText}>Delegar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.alertAcceptBtn}
                    onPress={() => setAlertAccepted(true)}
                    activeOpacity={0.8}
                  >
                    <CheckCircle2 size={14} color="#030712" />
                    <Text style={styles.alertAcceptBtnText}>Aceptar Servicio</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.acceptedAlertContainer}>
                  <View style={styles.acceptedAlertIndicatorRow}>
                    <View style={styles.alertMiniPulseDot} />
                    <Text style={styles.acceptedAlertIndicatorLabel}>En ruta de atención rápida</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.routeGpsBtn}
                    onPress={() => alert('Calculando ruta satelital guiada hacia Av. Juárez...')}
                    activeOpacity={0.8}
                  >
                    <Navigation size={14} color="#030712" />
                    <Text style={styles.routeGpsBtnText}>Ver Ruta GPS</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Formulario de Reporte de Cierre */}
            <View style={styles.reportFormCard}>
              <View style={styles.formTitleRow}>
                <FileText size={16} color="#10B981" />
                <Text style={styles.formTitleLabel}>Reporte Técnico de Cierre</Text>
              </View>
              
              <Text style={styles.fieldLabel}>Evidencias o Diagnóstico del Reporte:</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="Ej. Riña dispersada, falsa alarma del botón, traslado completado..."
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={closingReport}
                onChangeText={setClosingReport}
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity 
                style={[
                  styles.formSubmitButton, 
                  (!closingReport.trim() || reportSubmitted) && styles.formSubmitButtonDisabled
                ]}
                onPress={handleSendReport}
                disabled={!closingReport.trim() || reportSubmitted}
                activeOpacity={0.8}
              >
                {reportSubmitted ? (
                  <CheckCircle2 size={14} color="#030712" />
                ) : (
                  <Send size={14} color="#030712" />
                )}
                <Text style={styles.formSubmitButtonText}>
                  {reportSubmitted ? 'Reporte Enviado con Éxito' : 'Enviar Reporte al C5i'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ==================== VISTA 3: CENTRAL C4 / C5i ==================== */}
        {activeRole === 'c4' && (
          <View style={styles.viewContainer}>
            {/* Tarjetas de KPIs lado a lado */}
            <View style={styles.kpiGrid}>
              <View style={styles.kpiMiniCard}>
                <Clock size={16} color="#EF4444" />
                <View style={styles.kpiTextCol}>
                  <Text style={styles.kpiValueText}>4.2 min</Text>
                  <Text style={styles.kpiLabelText}>Tiempo Reacción</Text>
                </View>
              </View>

              <View style={styles.kpiMiniCard}>
                <TrendingUp size={16} color="#10B981" />
                <View style={styles.kpiTextCol}>
                  <Text style={styles.kpiValueText}>18</Text>
                  <Text style={styles.kpiLabelText}>Oficiales Activos</Text>
                </View>
              </View>
            </View>

            {/* Simulación del Mapa de Incidentes en Vivo */}
            <View style={styles.mapWidgetContainer}>
              <View style={styles.mapWidgetHeader}>
                <View style={styles.mapWidgetHeaderLeft}>
                  <Activity size={14} color="#EF4444" />
                  <Text style={styles.mapWidgetTitle}>Mapa Operativo C5i</Text>
                </View>
                <View style={styles.liveBadge}>
                  <View style={styles.livePulseDot} />
                  <Text style={styles.liveBadgeLabel}>EN VIVO</Text>
                </View>
              </View>

              <View style={styles.mapVisualCanvas}>
                {/* Cuadrículas abstractas */}
                <View style={styles.mapGridLineH1} />
                <View style={styles.mapGridLineH2} />
                <View style={styles.mapGridLineV1} />
                <View style={styles.mapGridLineV2} />

                {/* Marcador Patrulla 04 */}
                <View style={[styles.mapMarkerPin, { top: '30%', left: '25%' }]}>
                  <View style={styles.patrolPoint} />
                  <Text style={styles.patrolLabel}>U-04</Text>
                </View>

                {/* Marcador Patrulla 12 */}
                <View style={[styles.mapMarkerPin, { top: '70%', left: '72%' }]}>
                  <View style={styles.patrolPoint} />
                  <Text style={styles.patrolLabel}>U-12</Text>
                </View>

                {/* Marcador SOS Crítico Activo */}
                <View style={[styles.mapMarkerPin, { top: '50%', left: '50%' }]}>
                  <View style={styles.sosMarkerRing} />
                  <View style={styles.sosMarkerPoint} />
                  <Text style={styles.sosMarkerLabel}>S.O.S.</Text>
                </View>

                <Text style={styles.mapScaleLabel}>Región Hidalgo Centro • 1.5km</Text>
              </View>
            </View>

            {/* Tabla de Alertas en Tiempo Real */}
            <View style={styles.tableWidgetCard}>
              <Text style={styles.tableWidgetTitle}>Monitoreo General de Alertas</Text>
              
              <View style={styles.tableContainer}>
                {/* Cabecera */}
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.tableHeadCell, { flex: 1.2 }]}>ID/Usuario</Text>
                  <Text style={[styles.tableHeadCell, { flex: 1.6 }]}>Ubicación</Text>
                  <Text style={[styles.tableHeadCell, { flex: 1, textAlign: 'right' }]}>Estado</Text>
                </View>

                {/* Registro 1 */}
                <View style={styles.tableDataRow}>
                  <Text style={[styles.tableBodyCell, { flex: 1.2, color: '#FFFFFF', fontWeight: '700' }]}>R. Gómez</Text>
                  <Text style={[styles.tableBodyCell, { flex: 1.6 }]}>Pachuca Centro</Text>
                  <View style={[styles.badgeContainer, { flex: 1, backgroundColor: 'rgba(239,68,68,0.15)' }]}>
                    <Text style={[styles.badgeLabel, { color: '#EF4444' }]}>Crítico</Text>
                  </View>
                </View>

                {/* Registro 2 */}
                <View style={styles.tableDataRow}>
                  <Text style={[styles.tableBodyCell, { flex: 1.2, color: '#FFFFFF', fontWeight: '700' }]}>J. Ortega</Text>
                  <Text style={[styles.tableBodyCell, { flex: 1.6 }]}>Plaza Q</Text>
                  <View style={[styles.badgeContainer, { flex: 1, backgroundColor: 'rgba(16,185,129,0.15)' }]}>
                    <Text style={[styles.badgeLabel, { color: '#10B981' }]}>Cerrado</Text>
                  </View>
                </View>

                {/* Registro 3 */}
                <View style={styles.tableDataRow}>
                  <Text style={[styles.tableBodyCell, { flex: 1.2, color: '#FFFFFF', fontWeight: '700' }]}>M. Alarcón</Text>
                  <Text style={[styles.tableBodyCell, { flex: 1.6 }]}>Zorros Hgo</Text>
                  <View style={[styles.badgeContainer, { flex: 1, backgroundColor: 'rgba(16,185,129,0.15)' }]}>
                    <Text style={[styles.badgeLabel, { color: '#10B981' }]}>Atendido</Text>
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
// ESTILOS DE INTERFAZ PREMIUM
// ==========================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030712',
  },
  roleSelectorContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#070C1B',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  hubTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.8,
    textAlign: 'center',
  },
  hubSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
    fontWeight: '500',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 9,
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  segmentTextActive: {
    color: '#030712',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  viewContainer: {
    gap: 18,
  },

  // ESTILOS CIUDADANO
  gpsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  gpsRadarContainer: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarCircle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(16,185,129,0.4)',
  },
  gpsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gpsDotSafe: {
    backgroundColor: '#10B981',
  },
  gpsDotAlert: {
    backgroundColor: '#EF4444',
  },
  gpsText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textGreenNeon: {
    color: '#10B981',
    fontWeight: '700',
  },
  textRedNeon: {
    color: '#EF4444',
    fontWeight: '700',
  },
  trackingStatus: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  panicContainer: {
    height: screenWidth * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  panicGlowBackdrop: {
    position: 'absolute',
    width: screenWidth * 0.58,
    height: screenWidth * 0.58,
    borderRadius: (screenWidth * 0.58) / 2,
    opacity: 0.15,
  },
  panicGlowBackdropNormal: {
    backgroundColor: '#EF4444',
  },
  panicGlowBackdropActive: {
    backgroundColor: '#EF4444',
    opacity: 0.35,
  },
  panicButton: {
    width: screenWidth * 0.55,
    height: screenWidth * 0.55,
    borderRadius: (screenWidth * 0.55) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  panicButtonNormal: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 8,
  },
  panicButtonActive: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 10,
  },
  panicButtonTextSOS: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  panicButtonActionText: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 12,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
  },
  acompaneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acompaneIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(245,158,11,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acompaneTitleBox: {
    flex: 1,
    marginLeft: 12,
  },
  acompaneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  acompaneDesc: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 1,
  },
  customSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  customSwitchOn: {
    backgroundColor: '#10B981',
  },
  customSwitchOff: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  customSwitchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  customSwitchThumbOn: {
    alignSelf: 'flex-end',
  },
  customSwitchThumbOff: {
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
    backgroundColor: 'rgba(245,158,11,0.15)',
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
  },
  sliderMockLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    zIndex: -1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  contactsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactCircleWrapper: {
    alignItems: 'center',
    width: 60,
  },
  contactAvatarCircle: {
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
  onlineDotIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#030712',
  },
  contactNameLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    fontWeight: '500',
  },
  addContactCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContactLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 4,
    fontWeight: '600',
  },

  // ESTILOS AGENTE
  officerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  officerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  officerAvatarWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(16,185,129,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  officerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  officerStatusText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  textGray: {
    color: '#9CA3AF',
  },
  incomingAlertCard: {
    backgroundColor: 'rgba(239,68,68,0.06)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(239,68,68,0.25)',
    padding: 16,
    gap: 12,
  },
  incomingAlertCardAccepted: {
    backgroundColor: 'rgba(16,185,129,0.04)',
    borderColor: 'rgba(16,185,129,0.25)',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239,68,68,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  alertHeaderBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#EF4444',
  },
  alertDistanceText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  alertVictimName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  alertAddress: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  alertActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  alertDeclineBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertDeclineBtnText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
  alertAcceptBtn: {
    flex: 2.2,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertAcceptBtnText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  acceptedAlertContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 4,
  },
  acceptedAlertIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertMiniPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  acceptedAlertIndicatorLabel: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '700',
  },
  routeGpsBtn: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeGpsBtnText: {
    fontSize: 12,
    color: '#030712',
    fontWeight: '800',
  },
  reportFormCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
  },
  formTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  formTitleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fieldLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8,
    fontWeight: '600',
  },
  formTextInput: {
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
  formSubmitButton: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSubmitButtonDisabled: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    opacity: 0.6,
  },
  formSubmitButtonText: {
    fontSize: 12,
    color: '#030712',
    fontWeight: '800',
  },

  // ESTILOS CENTRAL C4
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiMiniCard: {
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
  kpiTextCol: {
    flexDirection: 'column',
  },
  kpiValueText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  kpiLabelText: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '600',
  },
  mapWidgetContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  mapWidgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  mapWidgetHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapWidgetTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(239,68,68,0.1)',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  livePulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#EF4444',
  },
  liveBadgeLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#EF4444',
  },
  mapVisualCanvas: {
    height: 180,
    backgroundColor: '#070C1B',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridLineH1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineH2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineV1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineV2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapMarkerPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  patrolPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  patrolLabel: {
    fontSize: 8,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 2,
    backgroundColor: '#030712',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  sosMarkerRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    opacity: 0.6,
  },
  sosMarkerPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  sosMarkerLabel: {
    fontSize: 8,
    color: '#EF4444',
    fontWeight: '900',
    marginTop: 4,
    backgroundColor: '#030712',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  mapScaleLabel: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 8,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '600',
  },
  tableWidgetCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 16,
  },
  tableWidgetTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  tableContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 6,
  },
  tableHeadCell: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  tableBodyCell: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  badgeContainer: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: '800',
  },
});
