// src/renderer/src/features/reports/pdf-templates/ChemistryPDF.ts

export function buildChemistryPDF(exam: any, patient: any, logoDataUrl: string | null): any {
  const getParam = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    return param?.value !== undefined && param?.value !== null ? String(param.value) : ''
  }

  const getRef = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    if (!param) return ''
    const min = param.referenceMin !== undefined ? param.referenceMin : ''
    const max = param.referenceMax !== undefined ? param.referenceMax : ''
    if (min !== '' && max !== '') return `${min} - ${max}`
    if (max !== '') return `HASTA ${max}`
    if (min !== '') return `${min} o más`
    return ''
  }

  const getUnit = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    return param?.unit || ''
  }

  const leftParams = [
    { id: 'glucosa', label: 'GLUCOSA OXIDASA' },
    { id: 'bun', label: 'BUN' },
    { id: 'acido_urico', label: 'ÁCIDO ÚRICO' },
    { id: 'colesterol_total', label: 'COLESTEROL TOTAL' },
    { id: 'colesterol_hdl', label: 'COLESTEROL HDL' },
    { id: 'colesterol_ldl', label: 'COLESTEROL LDH' },
    { id: 'trigliceridos', label: 'TRIGLICÉRIDOS' },
    { id: 'proteinas_totales', label: 'PROTEÍNAS TOTALES' },
    { id: 'albumina', label: 'ALBÚMINA' },
    { id: 'globulina', label: 'GLOBULINA' },
    { id: 'relacion_ag', label: 'RELACIÓN A/G' },
    { id: 'calcio', label: 'CALCIO ARSENATO' },
    { id: 'fosforo', label: 'FÓSFORO' },
    { id: 'magnesio', label: 'MAGNESIO' },
  ]

  const rightParams = [
    { id: 'gpt_alt', label: 'Gpt / Alt' },
    { id: 'got_ast', label: 'Got / Ast' },
    { id: 'bilirrubina_total', label: 'BILIRRUBINA TOTAL' },
    { id: 'bilirrubina_directa', label: 'BILIRRUBINA DIRECTA' },
    { id: 'bilirrubina_indirecta', label: 'BILIRRUBINA INDIRECTA' },
    { id: 'fosfatasa_alcalina', label: 'FOSFATASA ALCALINA' },
    { id: 'ldh', label: 'LÁCTIDA DESHIDROGENASA' },
    { id: 'gamma_gt', label: 'GAMMA GT' },
    { id: 'amilasa', label: 'AMILASA' },
    { id: 'creatinquinasa', label: 'CREATINKINASA' },
    { id: 'hierro_total', label: 'HIERRO TOTAL' },
    { id: 'ck_mb', label: 'CK – MB' },
    { id: 'pcr', label: 'PCR' },
    { id: 'creatinina', label: 'CREATININA' },
  ]

  const buildRow = (left: any, right: any) => {
    const leftResult = getParam(left.id)
    const leftUnit = getUnit(left.id)
    const leftRef = getRef(left.id)

    const rightResult = getParam(right.id)
    const rightUnit = getUnit(right.id)
    const rightRef = getRef(right.id)

    return [
      { text: left.label, style: 'cellLabel' },
      { text: leftResult ? `${leftResult} ${leftUnit}` : '', style: 'cellValue' },
      { text: leftRef, style: 'cellRef' },
      { text: right.label, style: 'cellLabel' },
      { text: rightResult ? `${rightResult} ${rightUnit}` : '', style: 'cellValue' },
      { text: rightRef, style: 'cellRef' },
    ]
  }

  const tableBody: any[] = [
    [
      { text: 'DESCRIPCIÓN DEL EXAMEN', style: 'headerCell' },
      { text: 'RESULTADO', style: 'headerCell' },
      { text: 'VALORES DE REFERENCIA', style: 'headerCell' },
      { text: 'DESCRIPCIÓN DEL EXAMEN', style: 'headerCell' },
      { text: 'RESULTADO', style: 'headerCell' },
      { text: 'VALORES DE REFERENCIA', style: 'headerCell' },
    ]
  ]

  for (let i = 0; i < Math.max(leftParams.length, rightParams.length); i++) {
    const left = leftParams[i] || { id: '', label: '' }
    const right = rightParams[i] || { id: '', label: '' }
    if (left.id || right.id) {
      tableBody.push(buildRow(left, right))
    }
  }

  // Fila de observaciones
  tableBody.push([
    { text: 'OBSERVACIONES:', style: 'obsLabel', colSpan: 3, alignment: 'left', margin: [0, 4, 0, 4] } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
    { text: `_____________________________`, colSpan: 3, alignment: 'left', margin: [0, 4, 0, 4] } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  return {
    // ✅ Sin pageOrientation (por defecto es portrait/vertical)
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
      { text: 'REPORTE DE QUÍMICA SANGUÍNEA', style: 'titulo' },
      { text: '\n' },
      {
        columns: [
          { text: `CENTRO ASISTENCIAL: ________________________`, width: '25%', style: 'dato' },
          { text: `SERVICIO: ________________________`, width: '25%', style: 'dato' },
          { text: `Nº DE HISTORIA: ______________________`, width: '25%', style: 'dato' },
          { text: '', width: '25%' }
        ]
      },
      {
        columns: [
          { text: `APELLIDO Y NOMBRE: ${patient.fullName}`, width: '35%', style: 'dato' },
          { text: `EDAD: ${calculateAge(patient.birthDate)}`, width: '15%', style: 'dato' },
          { text: `SEXO: ${patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : 'Otro'}`, width: '20%', style: 'dato' },
          { text: `LUGAR DE NACIMIENTO: ____________________________`, width: '30%', style: 'dato' }
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
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: tableBody
        }
      }
    ],
    styles: {
      headerInstitucion: { fontSize: 8, bold: true, alignment: 'center', margin: [0, 1, 0, 1] },
      titulo: { fontSize: 12, bold: true, alignment: 'center', margin: [0, 8, 0, 8] },
      dato: { fontSize: 9, margin: [0, 2, 0, 2] },
      headerCell: { fontSize: 8, bold: true, alignment: 'center', fillColor: '#e6e6e6' },
      cellLabel: { fontSize: 7, alignment: 'left' },
      cellValue: { fontSize: 7, alignment: 'center' },
      cellRef: { fontSize: 6, alignment: 'center' },
      obsLabel: { fontSize: 8, bold: true, alignment: 'left' },
    },
    defaultStyle: { font: 'Roboto' }
  }
}

function calculateAge(birthDate: string): string {
  try {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return String(age)
  } catch { return '' }
}