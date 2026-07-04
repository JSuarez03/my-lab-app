// src/renderer/src/features/reports/pdf-templates/HecesPDF.ts

export function buildHecesPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
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
  const consistencia = getParam('consistencia')
  const olor = getParam('olor')
  const moco = getParam('moco')
  const sangre = getParam('sangre')
  const reaccion = getParam('reaccion')

  const endolimax_trofo = getParam('endolimax_trofozoitos')
  const endolimax_quistes = getParam('endolimax_quistes')
  const entamoeba_histolytica_trofo = getParam('entamoeba_histolytica_trofozoitos')
  const entamoeba_histolytica_quistes = getParam('entamoeba_histolytica_quistes')
  const entamoeba_coli_trofo = getParam('entamoeba_coli_trofozoitos')
  const entamoeba_coli_quistes = getParam('entamoeba_coli_quistes')
  const giardia_trofo = getParam('giardia_trofozoitos')
  const giardia_quistes = getParam('giardia_quistes')
  const tricomonas = getParam('tricomonas')
  const blastocystis = getParam('blastocystis')

  const ascaris_huevos = getParam('ascaris_huevos')
  const trichiuris_huevos = getParam('trichiuris_huevos')
  const strongiloides_huevos = getParam('strongiloides_huevos')
  const enterobius_huevos = getParam('enterobius_huevos')
  const enterobius_larvas = getParam('enterobius_larvas')
  const taenia_huevos = getParam('taenia_huevos')
  const ancilostomideo_huevos = getParam('ancilostomideo_huevos')
  const otros = getParam('otros')

  const azucares = getParam('azucares_reductores')
  const sangre_oculta = getParam('sangre_oculta')

  // Determinar si se observó algo
  const hayProtozoarios = [endolimax_trofo, endolimax_quistes, entamoeba_histolytica_trofo, entamoeba_histolytica_quistes, entamoeba_coli_trofo, entamoeba_coli_quistes, giardia_trofo, giardia_quistes, tricomonas, blastocystis].some(v => v === 'Observado')
  const hayHelmintos = [ascaris_huevos, trichiuris_huevos, strongiloides_huevos, enterobius_huevos, enterobius_larvas, taenia_huevos, ancilostomideo_huevos].some(v => v === 'Observado')
  const noObservado = (!hayProtozoarios && !hayHelmintos) ? '☑' : '☐'

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
    { text: 'ANÁLISIS DE HECES', colSpan: 6, style: 'titulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 4: Datos del paciente =====
  tableBody.push([
    { text: `CENTRO ASISTENCIAL: ________________________`, style: 'dato' },
    { text: `SERVICIO: Heces`, style: 'dato' },
    { text: `APELLIDO Y NOMBRE: ${patient.fullName}`, style: 'dato' },
    { text: `N° DE HISTORIA: ______________________`, style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 5: Características Generales =====
  tableBody.push([
    { text: 'CARACTERÍSTICAS GENERALES', colSpan: 6, style: 'subtitulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 6: Aspecto, Color, Consistencia, Olor, Moco, Sangre =====
  tableBody.push([
    { text: `ASPECTO: ${aspecto}`, style: 'dato' },
    { text: `COLOR: ${color}`, style: 'dato' },
    { text: `CONSISTENCIA: ${consistencia}`, style: 'dato' },
    { text: `OLOR: ${olor}`, style: 'dato' },
    { text: `MOCO: ${moco}`, style: 'dato' },
    { text: `SANGRE: ${sangre}`, style: 'dato' },
  ])

  // ===== FILA 7: Reacción =====
  tableBody.push([
    { text: `REACCIÓN:`, style: 'dato' },
    { text: `ÁCIDA: ${reaccion === 'Ácida' ? '(X)' : ' '}`, style: 'dato' },
    { text: `ALCALINA: ${reaccion === 'Alcalina' ? '(X)' : ' '}`, style: 'dato' },
    { text: `ANTÓFERA: ${reaccion === 'Anfótera' ? '(X)' : ' '}`, style: 'dato' },
    { text: `NEUTRA: ${reaccion === 'Neutra' ? '(X)' : ' '}`, style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 8: Análisis Microscópico =====
  tableBody.push([
    { text: 'ANÁLISIS MICROSCÓPICO', colSpan: 6, style: 'subtitulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 9: Protozoarios vs Helmintos (cabecera) =====
  tableBody.push([
    { text: 'PROTOZOARIOS', style: 'subtitulo', alignment: 'center' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: 'HELMINTOS', style: 'subtitulo', alignment: 'center' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILAS 10-15: Protozoarios y Helmintos (campos separados) =====
  const pairs = [
    {
      proto: { label: 'Endolimax nana', trofo: endolimax_trofo, quistes: endolimax_quistes },
      helminth: { label: 'Ascaris lumbricoides', huevos: ascaris_huevos }
    },
    {
      proto: { label: 'Entamoeba histolytica', trofo: entamoeba_histolytica_trofo, quistes: entamoeba_histolytica_quistes },
      helminth: { label: 'Trichiuris trichiura', huevos: trichiuris_huevos }
    },
    {
      proto: { label: 'Entamoeba coli', trofo: entamoeba_coli_trofo, quistes: entamoeba_coli_quistes },
      helminth: { label: 'Strongiloides stercoralis', huevos: strongiloides_huevos }
    },
    {
      proto: { label: 'Giardia duodenalis', trofo: giardia_trofo, quistes: giardia_quistes },
      helminth: { label: 'Enterobius vermicularis', huevos: enterobius_huevos, larvas: enterobius_larvas }
    },
    {
      proto: { label: 'Tricomonas sp', value: tricomonas },
      helminth: { label: 'Taenia sp', huevos: taenia_huevos }
    },
    {
      proto: { label: 'Blastocystis hominis', value: blastocystis },
      helminth: { label: 'Ancilostomideo S.sp', huevos: ancilostomideo_huevos }
    },
  ]

  pairs.forEach((pair) => {
    // Protozoarios: 3 celdas (nombre, trofozoitos, quistes)
    let protoCell1 = ''
    let protoCell2 = ''
    let protoCell3 = ''
    if (pair.proto.trofo !== undefined) {
      protoCell1 = pair.proto.label
      protoCell2 = `TROFOZOITOS ${pair.proto.trofo === 'Observado' ? '(X)' : ' '}`
      protoCell3 = `QUISTES ${pair.proto.quistes === 'Observado' ? '(X)' : ' '}`
    } else {
      protoCell1 = pair.proto.label
      protoCell2 = pair.proto.value === 'Observado' ? '(X)' : ' '
      protoCell3 = ''
    }

    // Helmintos: 3 celdas (nombre, huevos, larvas)
    let helminthCell1 = ''
    let helminthCell2 = ''
    let helminthCell3 = ''
    if (pair.helminth.larvas !== undefined) {
      helminthCell1 = pair.helminth.label
      helminthCell2 = `HUEVOS ${pair.helminth.huevos === 'Observado' ? '(X)' : ' '}`
      helminthCell3 = `LARVAS ${pair.helminth.larvas === 'Observado' ? '(X)' : ' '}`
    } else {
      helminthCell1 = pair.helminth.label
      helminthCell2 = `HUEVOS ${pair.helminth.huevos === 'Observado' ? '(X)' : ' '}`
      helminthCell3 = ''
    }

    tableBody.push([
      { text: protoCell1, style: 'dato' },
      { text: protoCell2, style: 'dato' },
      { text: protoCell3, style: 'dato' },
      { text: helminthCell1, style: 'dato' },
      { text: helminthCell2, style: 'dato' },
      { text: helminthCell3, style: 'dato' },
    ])
  })

  // ===== FILA 16: OTROS =====
  tableBody.push([
    { text: `OTROS: ${otros || ''}`, colSpan: 6, style: 'dato', alignment: 'left' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 17: No se observaron =====
  tableBody.push([
    { text: `NO SE OBSERVARON QUISTES, NI TROFOZOITOS DE PROTOZOARIOS, NI HUEVOS Y LARVAS DE HELMINTOS ${noObservado}`, colSpan: 6, style: 'dato', alignment: 'left' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 18: Análisis Químico =====
  tableBody.push([
    { text: 'ANÁLISIS QUÍMICO', colSpan: 6, style: 'subtitulo', alignment: 'center' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 19: Azúcares Reductores y Sangre Oculta =====
  tableBody.push([
    { text: `AZUCARES REDUCTORES:`, style: 'dato' },
    { text: `NEGATIVO ${azucares === 'Negativo' ? '(X)' : ' '}`, style: 'dato' },
    { text: `POSITIVO ${azucares === 'Positivo' ? '(X)' : ' '}`, style: 'dato' },
    { text: `SANGRE OCULTA:`, style: 'dato' },
    { text: `NEGATIVO ${sangre_oculta === 'Negativo' ? '(X)' : ' '}`, style: 'dato' },
    { text: `POSITIVO ${sangre_oculta === 'Positivo' ? '(X)' : ' '}`, style: 'dato' },
  ])

  // ===== FILA 20: Observaciones =====
  tableBody.push([
    { text: `OBSERVACIONES: _____________________________`, colSpan: 6, style: 'dato', alignment: 'left' } as any,
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
    { text: '', style: 'dato' },
  ])

  // ===== FILA 21: Bioanalista y Registro =====
  tableBody.push([
    { text: `NOMBRE DEL BIOANALISTA: ${doctorName || '_____________________________'}`, style: 'dato' },
    { text: `REGISTRO MPPS: ______________________`, style: 'dato' },
    { text: '', style: 'dato' },
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
      subtitulo: { fontSize: 10, bold: true, alignment: 'center', margin: [0, 3, 0, 3] },
      dato: { fontSize: 8, margin: [0, 1, 0, 1] },
    },
    defaultStyle: { font: 'Roboto' }
  }
}