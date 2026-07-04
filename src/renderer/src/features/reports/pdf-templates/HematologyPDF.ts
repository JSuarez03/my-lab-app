// src/renderer/src/features/reports/pdf-templates/HematologyPDF.ts

export function buildHematologyPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
  // Mapeo de IDs a etiquetas según la imagen
  const leftParams = [
    { id: 'hemoglobina', label: 'HEMOGLOBINA', unit: 'grs' },
    { id: 'hematocrito', label: 'HEMATOCRITO', unit: '%' },
    { id: 'cuenta_blanca', label: 'CUENTA BLANCA', unit: 'mm' },
    { id: 'seg_neutrofilos', label: 'SEG. NEUTROFILOS', unit: '%' },
    { id: 'linfocitos', label: 'LINFOCITOS', unit: '%' },
    { id: 'globulos_rojos', label: 'GLÓBULOS ROJOS', unit: '%' },
    { id: 'mcv', label: 'MCV', unit: '%' },
    { id: 'mch', label: 'MCH', unit: '%' },
    { id: 'mchc', label: 'MCHC', unit: '%' },
  ]

  const rightParams = [
    { id: 'plaquetas', label: 'PLAQUETAS', unit: 'mm3%' },
    { id: 'vsg', label: 'VSG', unit: 'mm/h' },
    { id: 'tpo_sangria', label: 'TPO. DE SANGRÍA', unit: 'min' },
    { id: 'tpo_protombina', label: 'TPO. PROTOMBINA', unit: 'SEG' },
    { id: 'tpo_control', label: 'TPO. CONTROL', unit: 'SEG' },
    { id: 'relacion_pc', label: 'RELACIÓN p/c', unit: 'P/C' },
    { id: 'ptt', label: 'P.T.T.', unit: 'SEG' },
    { id: 'ptt_control', label: 'T. CONTROL', unit: 'SEG' },
    { id: 'diferencia', label: 'DIFERENCIA', unit: 'SEG' },
  ]

  const getParam = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    return param?.value !== undefined && param?.value !== null ? String(param.value) : ''
  }

  const getRef = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    if (!param) return ''
    const min = param.referenceMin !== undefined ? param.referenceMin : ''
    const max = param.referenceMax !== undefined ? param.referenceMax : ''
    if (min !== '' && max !== '') return `${min} – ${max}`
    if (max !== '') return `HASTA ${max}`
    if (min !== '') return `${min} o más`
    return ''
  }

  const buildRow = (left: any, right: any) => {
    const leftValue = getParam(left.id)
    const leftRef = getRef(left.id)
    const rightValue = getParam(right.id)
    const rightRef = getRef(right.id)

    return [
      { text: left.label, style: 'cellLabel' },
      { text: leftValue ? `${leftValue} ${left.unit}` : '', style: 'cellValue' },
      { text: leftRef, style: 'cellRef' },
      { text: right.label, style: 'cellLabel' },
      { text: rightValue ? `${rightValue} ${right.unit}` : '', style: 'cellValue' },
      { text: rightRef, style: 'cellRef' },
    ]
  }

  const tableBody: any[] = [
    [
      { text: 'ANÁLISIS', style: 'headerCell' },
      { text: 'RESULTADOS', style: 'headerCell' },
      { text: 'VALOR NORMAL', style: 'headerCell' },
      { text: 'ANÁLISIS', style: 'headerCell' },
      { text: 'RESULTADOS', style: 'headerCell' },
      { text: 'VALOR NORMAL', style: 'headerCell' },
    ]
  ]

  for (let i = 0; i < Math.max(leftParams.length, rightParams.length); i++) {
    const left = leftParams[i] || { id: '', label: '', unit: '' }
    const right = rightParams[i] || { id: '', label: '', unit: '' }
    if (left.id || right.id) {
      tableBody.push(buildRow(left, right))
    }
  }

  // Fila de OTROS ANÁLISIS
  tableBody.push([
    { text: 'OTROS ANÁLISIS:', style: 'obsLabel', colSpan: 6, alignment: 'left', margin: [0, 4, 0, 4] } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  // Fila de línea para observaciones
  tableBody.push([
    { text: `_____________________________`, colSpan: 6, alignment: 'left', margin: [0, 2, 0, 2] } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

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

  return {
    pageMargins: [40, 40, 40, 40],
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
      { text: 'HEMATOLOGÍA', style: 'titulo' },
      { text: '\n' },
      {
        columns: [
          { text: `APELLIDO Y NOMBRE: ${patient.fullName}`, width: '40%', style: 'dato' },
          { text: `FECHA: ${formatDate(exam.date)}`, width: '20%', style: 'dato' },
          { text: `CÉDULA: ${patient.identification}`, width: '20%', style: 'dato' },
          { text: `EDAD: ${calculateAge(patient.birthDate)}`, width: '20%', style: 'dato' },
        ]
      },
      { text: '\n' },
      {
        layout: {
          hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#000',
          vLineColor: () => '#000',
          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 2,
          paddingBottom: () => 2,
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', '*', 'auto', 'auto'],
          body: tableBody
        }
      },
      { text: '\n' },
      { text: `LICENCIADO: ${doctorName || '_____________________________'}`, style: 'dato' }
    ],
    styles: {
      headerInstitucion: { fontSize: 9, bold: true, alignment: 'center', margin: [0, 1, 0, 1] },
      titulo: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 8, 0, 8] },
      dato: { fontSize: 10, margin: [0, 2, 0, 2] },
      headerCell: { fontSize: 8, bold: true, alignment: 'center', fillColor: '#e6e6e6' },
      cellLabel: { fontSize: 8, alignment: 'left' },
      cellValue: { fontSize: 8, alignment: 'center' },
      cellRef: { fontSize: 7, alignment: 'center' },
      obsLabel: { fontSize: 8, bold: true, alignment: 'left' },
    },
    defaultStyle: { font: 'Roboto' }
  }
}