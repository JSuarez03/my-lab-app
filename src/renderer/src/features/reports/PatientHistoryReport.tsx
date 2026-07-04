import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Patient } from '@renderer/features/patients/patient.types'
import { Exam } from '@renderer/features/exams/exam.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  patientInfo: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
  patientInfoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    fontSize: 10,
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableRowHeader: {
    backgroundColor: '#e6f2ff',
    borderBottomWidth: 2,
    borderBottomColor: '#4a90d9',
    fontWeight: 'bold',
  },
  tableCol: {
    flex: 1,
    fontSize: 9,
  },
  tableColDate: {
    flex: 0.8,
    fontSize: 9,
  },
  tableColType: {
    flex: 1,
    fontSize: 9,
  },
  tableColParams: {
    flex: 2,
    fontSize: 9,
  },
  noExams: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 30,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#999',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
})

interface ReportProps {
  patient: Patient
  exams: Exam[]
}

export function PatientHistoryReport({ patient, exams }: ReportProps) {
  // Función para formatear fecha
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy', { locale: es })
    } catch {
      return dateStr
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <Text style={styles.header}>Historial de Exámenes</Text>
        <Text style={styles.subheader}>Laboratorio Clínico IVSS</Text>

        {/* Información del paciente */}
        <View style={styles.patientInfo}>
          <View style={styles.patientInfoRow}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.value}>{patient.fullName}</Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.label}>Cédula:</Text>
            <Text style={styles.value}>{patient.identification}</Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{patient.phone}</Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.label}>Fecha de Nac.:</Text>
            <Text style={styles.value}>{formatDate(patient.birthDate)}</Text>
          </View>
          <View style={styles.patientInfoRow}>
            <Text style={styles.label}>Género:</Text>
            <Text style={styles.value}>
              {patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : 'Otro'}
            </Text>
          </View>
          {patient.address && (
            <View style={styles.patientInfoRow}>
              <Text style={styles.label}>Dirección:</Text>
              <Text style={styles.value}>{patient.address}</Text>
            </View>
          )}
        </View>

        {/* Lista de exámenes */}
        <Text style={styles.sectionTitle}>Exámenes Realizados ({exams.length})</Text>

        {exams.length === 0 ? (
          <Text style={styles.noExams}>No hay exámenes registrados para este paciente.</Text>
        ) : (
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableRowHeader]}>
              <Text style={styles.tableColDate}>Fecha</Text>
              <Text style={styles.tableColType}>Tipo</Text>
              <Text style={styles.tableColParams}>Parámetros</Text>
            </View>

            {/* Filas de la tabla */}
            {exams.map((exam) => (
              <View style={styles.tableRow} key={exam.id}>
                <Text style={styles.tableColDate}>{formatDate(exam.date)}</Text>
                <Text style={styles.tableColType}>{exam.type}</Text>
                <Text style={styles.tableColParams}>
                  {exam.parameters
                    .map((p) => {
                      const value = p.value !== undefined && p.value !== null ? p.value : 'N/A'
                      return `${p.name}: ${value} ${p.unit || ''}`
                    })
                    .join(' | ')}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Pie de página */}
        <Text style={styles.footer}>
          Reporte generado el {format(new Date(), "dd/MM/yyyy 'a las' HH:mm")}
        </Text>
      </Page>
    </Document>
  )
}