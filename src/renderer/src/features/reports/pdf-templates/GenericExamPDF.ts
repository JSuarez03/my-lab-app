// src/renderer/src/features/reports/pdf-templates/GenericExamPDF.ts

export function buildGenericExamPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
  // Formatear fecha
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch { return dateStr }
  }

  // Calcular edad
  const calculateAge = (birthDate: string) => {
    try {
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
      return String(age)
    } catch { return '' }
  }

  // Obtener valor del parámetro
  const getValue = (param: any) => {
    if (param.value === undefined || param.value === null) return ''
    return String(param.value)
  }

  // Obtener rango de referencia
  const getRefRange = (param: any) => {
    if (param.referenceMin !== undefined && param.referenceMax !== undefined) {
      return `${param.referenceMin} - ${param.referenceMax} ${param.unit || ''}`
    }
    if (param.referenceMax !== undefined) return `HASTA ${param.referenceMax} ${param.unit || ''}`
    if (param.referenceMin !== undefined) return `${param.referenceMin} o más ${param.unit || ''}`
    return ''
  }

  // Construir tabla de parámetros
  const paramRows = exam.parameters.map((param: any) => {
    const value = getValue(param)
    const ref = getRefRange(param)
    const unit = param.unit || ''
    return [
      { text: param.name, style: 'paramName' },
      { text: value ? `${value} ${unit}` : '', style: 'paramValue' },
      { text: ref, style: 'paramRef' },
    ]
  })

  return {
    content: [
      {
        columns: [
          { image: logoDataUrl || '', width: 60, margin: [0, 0, 10, 0] },
          {
            stack: [
              { text: 'MINISTERIO DEL PODER POPULAR PARA EL TRABAJO Y SEGURIDAD SOCIAL', style: 'headerInstitucion' },
              { text: 'INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES', style: 'headerInstitucion' },
              { text: 'CENTRO HOSPITAL CARDÓN "DR. JUVENAL BRACHO"', style: 'headerInstitucion' },
              { text: 'LABORATORIO CENTRO HOSPITAL CARDÓN', style: 'headerInstitucion' }
            ],
            alignment: 'center'
          }
        ]
      },
      { text: '\n' },
      { text: `REPORTE DE ${exam.type.toUpperCase()}`, style: 'titulo' },
      { text: '\n' },
      {
        columns: [
          { text: `NOMBRE Y APELLIDO: ${patient.fullName}`, width: '50%', style: 'dato' },
          { text: `CÉDULA: ${patient.identification}`, width: '25%', style: 'dato' },
          { text: `FECHA: ${formatDate(exam.date)}`, width: '25%', style: 'dato' }
        ]
      },
      {
        columns: [
          { text: `EDAD: ${calculateAge(patient.birthDate)}`, width: '25%', style: 'dato' },
          { text: `SEXO: ${patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : 'Otro'}`, width: '25%', style: 'dato' },
          { text: `TELÉFONO: ${patient.phone || ''}`, width: '25%', style: 'dato' },
          { text: '', width: '25%' }
        ]
      },
      { text: '\n' },
      {
        layout: {
          hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#000',
          vLineColor: () => '#000',
          paddingLeft: () => 4,
          paddingRight: () => 4,
          paddingTop: () => 3,
          paddingBottom: () => 3,
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: [
            [
              { text: 'DESCRIPCIÓN', style: 'headerCell' },
              { text: 'VALOR', style: 'headerCell' },
              { text: 'VALOR DE REFERENCIA', style: 'headerCell' }
            ],
            ...paramRows
          ]
        }
      },
      { text: '\n' },
      { text: `LICENCIADO: ${doctorName || '_____________________________'}`, style: 'dato' }
    ],
    styles: {
      headerInstitucion: { fontSize: 9, bold: true, alignment: 'center', margin: [0, 1, 0, 1] },
      titulo: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 8, 0, 8] },
      dato: { fontSize: 10, margin: [0, 2, 0, 2] },
      headerCell: { fontSize: 9, bold: true, alignment: 'center', fillColor: '#e6e6e6' },
      paramName: { fontSize: 8, alignment: 'left' },
      paramValue: { fontSize: 8, alignment: 'center' },
      paramRef: { fontSize: 7, alignment: 'center' },
    },
    defaultStyle: { font: 'Roboto' }
  }
}