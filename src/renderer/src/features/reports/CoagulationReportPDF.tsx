// src/renderer/src/features/reports/CoagulationReportPDF.tsx
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import logo from '@renderer/assets/impresion.png'

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  // Encabezado: logo + texto del ministerio
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 8,
  },
  logoContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTextContainer: {
    width: '80%',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subHeaderText: {
    fontSize: 8,
    marginBottom: 2,
  },
  // Título principal
  titleContainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  // Datos del paciente
  patientInfoContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
  },
  patientRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  patientRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 9,
    marginRight: 5,
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 80,
    paddingBottom: 2,
    fontSize: 9,
  },
  fieldLarge: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 200,
    paddingBottom: 2,
    fontSize: 9,
  },
  fieldSmall: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 40,
    paddingBottom: 2,
    fontSize: 9,
  },
  // Resultados (dos columnas)
  resultsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  column: {
    width: '50%',
    paddingRight: 10,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultLabel: {
    fontWeight: 'bold',
    fontSize: 9,
    marginRight: 5,
    minWidth: 80,
  },
  resultValue: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 60,
    paddingBottom: 2,
    fontSize: 9,
    textAlign: 'center',
  },
  resultValueSmall: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 40,
    paddingBottom: 2,
    fontSize: 9,
    textAlign: 'center',
  },
  // Pie de página
  footerContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  footerText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  footerField: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minWidth: 200,
    paddingBottom: 2,
    fontSize: 11,
    marginLeft: 10,
  },
})

interface CoagulationReportProps {
  patientName: string
  cedula: string
  service: string
  edad: string
  fecha: string
  tpPaciente: string
  tpControl: string
  actividadProtrombinica: string
  razon: string
  inr: string
  fibrinogeno: string
  ttpaPaciente: string
  ttpaControl: string
  diferencia: string
  licenciado: string
}

export function CoagulationReportPDF({
  patientName,
  cedula,
  service,
  edad,
  fecha,
  tpPaciente,
  tpControl,
  actividadProtrombinica,
  razon,
  inr,
  fibrinogeno,
  ttpaPaciente,
  ttpaControl,
  diferencia,
  licenciado,
}: CoagulationReportProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== ENCABEZADO: Logo + Texto del Ministerio ===== */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              MINISTERIO DEL PODER POPULAR PARA EL TRABAJO Y SEGURIDAD SOCIAL
            </Text>
            <Text style={styles.headerText}>
              INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES
            </Text>
            <Text style={styles.headerText}>
              CENTRO HOSPITAL CARDÓN "DR. JUVENAL BRACHO"
            </Text>
            <Text style={styles.subHeaderText}>
              LABORATORIO CENTRO HOSPITAL CARDÓN
            </Text>
          </View>
        </View>

        {/* ===== TÍTULO ===== */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ESTUDIOS DE COAGULACIÓN</Text>
        </View>

        {/* ===== DATOS DEL PACIENTE ===== */}
        <View style={styles.patientInfoContainer}>
          <View style={styles.patientRow}>
            <Text style={styles.label}>NOMBRE Y APELLIDO:</Text>
            <Text style={[styles.fieldLarge, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 200, paddingBottom: 2 }]}>
              {patientName}
            </Text>
            <Text style={[styles.label, { marginLeft: 20 }]}>CÉDULA:</Text>
            <Text style={[styles.field, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 80, paddingBottom: 2 }]}>
              {cedula}
            </Text>
          </View>
          <View style={styles.patientRowSpaceBetween}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>SERVICIO:</Text>
              <Text style={[styles.field, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 80, paddingBottom: 2 }]}>
                {service}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>EDAD:</Text>
              <Text style={[styles.fieldSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2 }]}>
                {edad}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>FECHA:</Text>
              <Text style={[styles.field, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 80, paddingBottom: 2 }]}>
                {fecha}
              </Text>
            </View>
          </View>
        </View>

        {/* ===== RESULTADOS ===== */}
        <View style={styles.resultsContainer}>
          {/* Columna izquierda: TIEMPO DE PROTROMBINA */}
          <View style={styles.column}>
            <Text style={[styles.label, { fontSize: 11, marginBottom: 8, textDecoration: 'underline' }]}>
              TIEMPO DE PROTROMBINA
            </Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>TIEMPO PACIENTE:</Text>
              <Text style={[styles.resultValueSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2, textAlign: 'center' }]}>
                {tpPaciente}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>SEG</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>TIEMPO CONTROL:</Text>
              <Text style={[styles.resultValueSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2, textAlign: 'center' }]}>
                {tpControl}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>SEG</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>ACTIVIDAD PROTROMBÍNICA</Text>
              <Text style={[styles.resultValueSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2, textAlign: 'center' }]}>
                {actividadProtrombinica}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>%</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>RAZÓN:</Text>
              <Text style={[styles.resultValue, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 60, paddingBottom: 2, textAlign: 'center' }]}>
                {razon}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>V.N 0.8 A 1.2</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>INR:</Text>
              <Text style={[styles.resultValue, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 60, paddingBottom: 2, textAlign: 'center' }]}>
                {inr}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>FIBRINÓGENO:</Text>
              <Text style={[styles.resultValue, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 60, paddingBottom: 2, textAlign: 'center' }]}>
                {fibrinogeno}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>mg/%</Text>
            </View>
          </View>

          {/* Columna derecha: TIEMPO PARCIAL DE PROTROMBINA */}
          <View style={styles.column}>
            <Text style={[styles.label, { fontSize: 11, marginBottom: 8, textDecoration: 'underline' }]}>
              TIEMPO PARCIAL DE PROTROMBINA
            </Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>TIEMPO PACIENTE:</Text>
              <Text style={[styles.resultValueSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2, textAlign: 'center' }]}>
                {ttpaPaciente}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>SEG</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>TIEMPO CONTROL:</Text>
              <Text style={[styles.resultValueSmall, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 40, paddingBottom: 2, textAlign: 'center' }]}>
                {ttpaControl}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>SEG</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>DIFERENCIA: (P-C)</Text>
              <Text style={[styles.resultValue, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 60, paddingBottom: 2, textAlign: 'center' }]}>
                {diferencia}
              </Text>
              <Text style={{ fontSize: 9, marginLeft: 2 }}>V.N. +/-6</Text>
            </View>
          </View>
        </View>

        {/* ===== PIE DE PÁGINA ===== */}
        <View style={styles.footerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.footerText}>LICENCIADO:</Text>
            <Text style={[styles.footerField, { borderBottomWidth: 1, borderBottomColor: '#000', minWidth: 200, paddingBottom: 2, marginLeft: 10 }]}>
              {licenciado}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}