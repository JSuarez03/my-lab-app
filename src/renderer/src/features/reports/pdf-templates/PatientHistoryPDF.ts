// src/renderer/src/features/reports/pdf-templates/PatientHistoryPDF.ts

export function buildPatientHistoryPDF(patient: any, exams: any[]): any {
  return {
    content: [
      { text: 'HISTORIAL DE EXÁMENES', style: 'header' },
      { text: 'Laboratorio Clínico IVSS', style: 'subheader' },
      { text: `Paciente: ${patient.fullName}`, style: 'subheader' },
      { text: `Cédula: ${patient.identification}`, style: 'subheader' },
      { text: `Fecha de Nac.: ${patient.birthDate}`, style: 'subheader' },
      { text: `Género: ${patient.gender === 'M' ? 'Masculino' : 'Femenino'}`, style: 'subheader' },
      { text: '\n' },
      { text: 'Exámenes Realizados', style: 'sectionHeader' },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', '*'],
          body: [
            ['Fecha', 'Tipo', 'Parámetros'],
            ...exams.map((exam: any) => [
              exam.date,
              exam.type,
              exam.parameters
                .map((p: any) => `${p.name}: ${p.value} ${p.unit || ''}`)
                .join(' | ')
            ])
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      subheader: { fontSize: 12, margin: [0, 0, 0, 4] },
      sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
    },
    defaultStyle: { font: 'Roboto' }
  }
}