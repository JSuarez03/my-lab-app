// src/renderer/src/features/reports/pdf-templates/OrinaPDF.ts

export function buildOrinaPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
  const getParam = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    return param?.value !== undefined && param?.value !== null ? String(param.value) : ''
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch { return '' }
  }

  // Obtener valores
  const aspecto = getParam('aspecto')
  const color = getParam('color')
  const cantidad = getParam('cantidad')
  const ph = getParam('ph')
  const densidad = getParam('densidad')

  const cetonas = getParam('cetonas')
  const bilirrubina = getParam('bilirrubina')
  const glucosa = getParam('glucosa')
  const hemoglobina = getParam('hemoglobina')
  const proteinas = getParam('proteinas')
  const urobilina = getParam('urobilina')
  const nitritos = getParam('nitritos')

  const bacterias = getParam('bacterias')
  const hematies_eumorficos = getParam('hematies_eumorficos')
  const hematies_dismorficos = getParam('hematies_dismorficos')
  const leucocitos = getParam('leucocitos')
  const mucina = getParam('mucina')
  const blastoconidias = getParam('blastoconidias')
  const hifas = getParam('hifas')
  const seudohifas = getParam('seudohifas')
  const celulas_epiteliales_planas = getParam('celulas_epiteliales_planas')
  const celulas_epiteliales_redondas = getParam('celulas_epiteliales_redondas')
  const celulas_epiteliales_caudadas = getParam('celulas_epiteliales_caudadas')
  const cilindro_hialino = getParam('cilindro_hialino')
  const cilindro_granuloso = getParam('cilindro_granuloso')
  const cilindro_leucocitario = getParam('cilindro_leucocitario')
  const cilindro_hematico = getParam('cilindro_hematico')
  const cilindro_cereo = getParam('cilindro_cereo')
  const cristal_oxalato_calcio = getParam('cristal_oxalato_calcio')
  const cristal_acido_urico = getParam('cristal_acido_urico')
  const cristal_urato_amorfo = getParam('cristal_urato_amorfo')
  const cristal_fosfato_amorfo = getParam('cristal_fosfato_amorfo')
  const cristal_fosfato_triple = getParam('cristal_fosfato_triple')
  const otros = getParam('otros')

  const tableBody: any[] = []

  // ===== FILA 1: N° DE ANÁLISIS y FECHA =====
  tableBody.push([
    { text: 'N° DE ANÁLISIS:', style: 'dato', alignment: 'left' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: 'FECHA:', style: 'dato', alignment: 'right' },
    { text: formatDate(exam.date), style: 'dato', alignment: 'right' },
  ])

  // ===== FILA 2: Logo + Encabezado =====
  tableBody.push([
    {
      colSpan: 6,
      columns: [
        { image: logoDataUrl || '', width: 50, margin: [0, 0, 10, 0] },
        {
          stack: [
            { text: 'INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES', style: 'headerInstitucion' },
            { text: 'DIRECCIÓN GENERAL DE SALUD', style: 'headerInstitucion' },
            { text: 'SERVICIO DE BIOANÁLISIS', style: 'headerInstitucion' },
          ],
          alignment: 'center'
        }
      ],
      margin: [0, 2, 0, 2]
    } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 3: Título =====
  tableBody.push([
    { text: 'ANÁLISIS DE ORINA', colSpan: 6, style: 'titulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 4: Datos del paciente =====
  tableBody.push([
    { text: `CENTRO ASISTENCIAL: ________________________`, style: 'dato' },
    { text: `SERVICIO: Orina`, style: 'dato' },
    { text: `APELLIDO Y NOMBRE: ${patient.fullName}`, style: 'dato' },
    { text: `N° DE HISTORIA: ______________________`, style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== SECCIÓN 1: ASPECTO, COLOR, CANTIDAD, PH, DENSIDAD =====
  tableBody.push([
    { text: 'ASPECTO', style: 'subtitulo', alignment: 'center' },
    { text: 'COLOR', style: 'subtitulo', alignment: 'center' },
    { text: 'CANTIDAD', style: 'subtitulo', alignment: 'center' },
    { text: '', style: 'dato' },
    { text: 'PH', style: 'subtitulo', alignment: 'center' },
    { text: 'DENSIDAD', style: 'subtitulo', alignment: 'center' },
  ])

  // Fila de opciones de Aspecto, Color, Cantidad
  const aspectoOpts = ['Claro', 'Lig. Turbio', 'Turbio', 'Muy Turbio']
  const colorOpts = ['Amarillo Pálido', 'Amarillo', 'Amarillo Intenso', 'Ámbar', 'Verdoso', 'Rojizo']
  const cantidadOpts = ['Muestra Parcial', 'Muestra Insuficiente', 'Muestra Contaminada']

  // Mostrar opciones de Aspecto (hasta 4 líneas)
  const aspectoRows = Math.max(aspectoOpts.length, colorOpts.length, cantidadOpts.length)
  for (let i = 0; i < aspectoRows; i++) {
    const asp = i < aspectoOpts.length ? aspectoOpts[i] : ''
    const col = i < colorOpts.length ? colorOpts[i] : ''
    const cant = i < cantidadOpts.length ? cantidadOpts[i] : ''
    tableBody.push([
      { text: asp ? `${asp} ${aspecto === asp ? '(X)' : ' '}` : '', style: 'dato' },
      { text: col ? `${col} ${color === col ? '(X)' : ' '}` : '', style: 'dato' },
      { text: cant ? `${cant} ${cantidad === cant ? '(X)' : ' '}` : '', style: 'dato' },
      { text: '', style: 'dato' },
      { text: i === 0 ? ph : '', style: 'dato' },
      { text: i === 0 ? densidad : '', style: 'dato' },
    ])
  }

  // ===== SECCIÓN 2: QUÍMICA =====
  tableBody.push([
    { text: 'CETONAS', style: 'subtitulo', alignment: 'center' },
    { text: 'BILIRRUBINA', style: 'subtitulo', alignment: 'center' },
    { text: 'GLUCOSA', style: 'subtitulo', alignment: 'center' },
    { text: 'HEMOGLOBINA', style: 'subtitulo', alignment: 'center' },
    { text: 'PROTEÍNAS', style: 'subtitulo', alignment: 'center' },
    { text: 'UROBILINA', style: 'subtitulo', alignment: 'center' },
    // Nota: NITRITOS irá en la fila siguiente porque son 7 campos, usamos colspan o una fila extra.
  ])

  // Fila de opciones (Negativo, Trazas, Positivo) para los 6 primeros
  const quimicaOpts = ['Negativo', 'Trazas', 'Positivo']

  // También necesitamos Nitritos, que solo tiene Negativo/Positivo, lo pondremos en una fila aparte con colspan.

  // Fila con opciones para los 6 primeros
  for (let i = 0; i < quimicaOpts.length; i++) {
    const opt = quimicaOpts[i]
    tableBody.push([
      { text: `${opt} ${cetonas === opt ? '(X)' : ' '}`, style: 'dato' },
      { text: `${opt} ${bilirrubina === opt ? '(X)' : ' '}`, style: 'dato' },
      { text: `${opt} ${glucosa === opt ? '(X)' : ' '}`, style: 'dato' },
      { text: `${opt} ${hemoglobina === opt ? '(X)' : ' '}`, style: 'dato' },
      { text: `${opt} ${proteinas === opt ? '(X)' : ' '}`, style: 'dato' },
      { text: `${opt} ${urobilina === opt ? '(X)' : ' '}`, style: 'dato' },
    ])
  }

  // Fila para Nitritos (colspan 6)
  tableBody.push([
    { text: `NITRITOS: NEGATIVO ${nitritos === 'Negativo' ? '(X)' : ' '}   POSITIVO ${nitritos === 'Positivo' ? '(X)' : ' '}`, colSpan: 6, style: 'dato', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== SECCIÓN 3: SEDIMENTO (3 columnas) =====
  tableBody.push([
    { text: 'SEDIMENTO', colSpan: 6, style: 'subtitulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // Agrupar en filas de 3 columnas (usamos 6 columnas, cada grupo ocupa 2 columnas)
  const sedimentItems = [
    { label: 'Bacterias:', value: bacterias },
    { label: 'Células Epiteliales Planas:', value: celulas_epiteliales_planas },
    { label: 'Cristales de Oxalato de Calcio:', value: cristal_oxalato_calcio },
    { label: 'Hematíes Eumórficos:', value: hematies_eumorficos },
    { label: 'Células Epiteliales Redondas:', value: celulas_epiteliales_redondas },
    { label: 'Cristales de Ácido Úrico:', value: cristal_acido_urico },
    { label: 'Hematíes Dismórficos:', value: hematies_dismorficos },
    { label: 'Células Epiteliales Caudadas:', value: celulas_epiteliales_caudadas },
    { label: 'Cristales de Urato Amorfo:', value: cristal_urato_amorfo },
    { label: 'Leucocitos:', value: leucocitos },
    { label: 'Cilindro Hialino', value: cilindro_hialino },
    { label: 'Cristales de Fosfato Amorfo:', value: cristal_fosfato_amorfo },
    { label: 'Mucina:', value: mucina },
    { label: 'Cilindro Granuloso:', value: cilindro_granuloso },
    { label: 'Cristales de Fosfato Triple:', value: cristal_fosfato_triple },
    { label: 'Blastoconidias Aisladas y Gemantes:', value: blastoconidias },
    { label: 'Cilindro Leucocitario:', value: cilindro_leucocitario },
    { label: '', value: '' }, // espacio
    { label: 'Hifas', value: hifas },
    { label: 'Cilindro Hemático:', value: cilindro_hematico },
    { label: '', value: '' },
    { label: 'Seudohifas:', value: seudohifas },
    { label: 'Cilindro Céreo:', value: cilindro_cereo },
    { label: '', value: '' },
  ]

  // Agrupar de a 3 items por fila (cada item ocupa 2 columnas)
  for (let i = 0; i < sedimentItems.length; i += 3) {
    const row = [
      { text: `${sedimentItems[i]?.label || ''} ${sedimentItems[i]?.value || ''}`, style: 'dato' },
      { text: '', style: 'dato' },
      { text: `${sedimentItems[i+1]?.label || ''} ${sedimentItems[i+1]?.value || ''}`, style: 'dato' },
      { text: '', style: 'dato' },
      { text: `${sedimentItems[i+2]?.label || ''} ${sedimentItems[i+2]?.value || ''}`, style: 'dato' },
      { text: '', style: 'dato' },
    ]
    tableBody.push(row)
  }

  // ===== OTROS =====
  tableBody.push([
    { text: `OTROS: ${otros || ''}`, colSpan: 6, style: 'dato', alignment: 'left' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== BIOANALISTA, FIRMA, REGISTRO =====
  tableBody.push([
    { text: `NOMBRE DEL BIOANALISTA: ${doctorName || '_____________________________'}`, style: 'dato' },
    { text: `FIRMA: _____________________________`, style: 'dato' },
    { text: `REGISTRO MPPS: ______________________`, style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== CONFIGURACIÓN FINAL =====
  return {
    pageMargins: [20, 25, 20, 25],
    content: [
      {
        layout: {
          hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#000',
          vLineColor: () => '#000',
          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 1,
          paddingBottom: () => 1,
        },
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: tableBody
        }
      }
    ],
    styles: {
      headerInstitucion: { fontSize: 9, bold: true, alignment: 'center', margin: [0, 1, 0, 1] },
      titulo: { fontSize: 13, bold: true, alignment: 'center', margin: [0, 4, 0, 4] },
      subtitulo: { fontSize: 10, bold: true, alignment: 'center', margin: [0, 3, 0, 3], fillColor: '#e6e6e6' },
      dato: { fontSize: 8, margin: [0, 1, 0, 1] },
    },
    defaultStyle: { font: 'Roboto' }
  }
}