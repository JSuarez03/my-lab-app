// src/renderer/src/features/reports/pdf-templates/SerologyPDF.ts

export function buildSerologyPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
  const getParam = (id: string) => {
    const param = exam.parameters.find((p: any) => p.id === id)
    return param?.value !== undefined && param?.value !== null ? String(param.value) : ''
  }

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

  // Organizar parámetros en filas de 3 columnas
  const paramRows = [
    [
      { id: 'vdrl', label: 'VRDL:' },
      { id: 'pcr', label: 'PCR:' },
      { id: 'ra_test', label: 'RA TEST:' },
    ],
    [
      { id: 'toxoplasmosis', label: 'TOXOPLASMOSIS' },
      { id: 'monotest', label: 'MONOTEST:' },
      { id: 'asto', label: 'ASTO:' },
    ],
    [
      { id: 'test_pack_sangre', label: 'TEST PACK EN SANGRE:' },
      { id: 'embarazo_orina', label: 'PRUEBA DE EMBARAZO EN ORINA:' },
      { id: '', label: '' },
    ],
    [
      { id: 'hiv', label: 'HIV:' },
      { id: 'piloriset', label: 'PILORISET:' },
      { id: '', label: '' },
    ],
  ]

  // ✅ Crear la tabla con 4 columnas
  const tableBody: any[] = []

  // ===== FILA 1: Logo + Encabezado institucional (colSpan 3) =====
  tableBody.push([
    {
      colSpan: 3,
      columns: [
        { image: logoDataUrl || '', width: 50, margin: [0, 0, 10, 0] },
        {
          stack: [
            { text: 'MINISTERIO DEL PODER POPULAR PARA EL TRABAJO Y SEGURIDAD SOCIAL', style: 'headerInstitucion' },
            { text: 'INSTITUTO VENEZOLANO DE LOS SEGUROS SOCIALES', style: 'headerInstitucion' },
            { text: 'LABORATORIO CENTRO HOSPITAL CARDÓN "DR. JUVENAL BRACHO"', style: 'headerInstitucion' },
            { text: 'COMUNIDAD CARDÓN', style: 'headerInstitucion' }
          ],
          alignment: 'center'
        }
      ],
      margin: [0, 2, 0, 2]
    } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  // ===== FILA 2: Apellido y Nombre =====
  tableBody.push([
    { text: `APELLIDO Y NOMBRE: ${patient.fullName}`, colSpan: 3, style: 'dato', alignment: 'left' } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  // ===== FILA 3: Cédula, Servicio, Fecha =====
  tableBody.push([
    { text: `CÉDULA: ${patient.identification}`, style: 'dato', alignment: 'left' },
    { text: `SERVICIO: ${exam.type}`, style: 'dato', alignment: 'left' },
    { text: `FECHA: ${formatDate(exam.date)}`, style: 'dato', alignment: 'left' },
  ])

  // ===== FILA 4: Dirección, Edad =====
  tableBody.push([
    { text: `DIRECCIÓN: ${patient.address || ''}`, colSpan: 2, style: 'dato', alignment: 'left' } as any,
    { text: '', colSpan: 0 } as any,
    { text: `EDAD: ${calculateAge(patient.birthDate)}`, style: 'dato', alignment: 'left' },
  ])

  // ===== FILA 5: Título =====
  tableBody.push([
    { text: 'SEROLOGÍA - INMUNOLOGÍA', colSpan: 3, style: 'titulo', alignment: 'center' } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  // ===== FILAS 6-9: Parámetros en 3 columnas =====
  paramRows.forEach((row) => {
    // Crear celdas para las 3 columnas internas
    const cells = row.map((item) => {
      const value = item.id ? getParam(item.id) : ''
      return {
        text: `${item.label} ${value}`,
        style: 'paramCell',
        alignment: 'left',
        margin: [0, 2, 0, 2],
      }
    })
    // Asegurar 3 celdas
    while (cells.length < 3) {
      cells.push({ text: '', style: 'paramCell', alignment: 'left', margin: [0, 2, 0, 2] })
    }
    // Crear una celda con colSpan 3 que contiene las 3 columnas internas
    // y una celda vacía como cuarta columna
    tableBody.push([
      {
        colSpan: 3,
        columns: cells,
        margin: [0, 2, 0, 2],
      } as any,
      { text: '', colSpan: 0 } as any,
      { text: '', colSpan: 0 } as any,
    ])
  })

  // ===== FILA 10: Analista =====
  tableBody.push([
    { text: `ANALISTA: ${doctorName || '_____________________________'}`, colSpan: 3, style: 'dato', alignment: 'left' } as any,
    { text: '', colSpan: 0 } as any,
    { text: '', colSpan: 0 } as any,
  ])

  return {
    content: [
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
          widths: ['*', '*', '*'],
          body: tableBody
        }
      }
    ],
    styles: {
      headerInstitucion: { fontSize: 9, bold: true, alignment: 'center', margin: [0, 1, 0, 1] },
      titulo: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 6, 0, 6] },
      dato: { fontSize: 10, margin: [0, 2, 0, 2] },
      paramCell: { fontSize: 10, alignment: 'left', margin: [0, 2, 0, 2] },
    },
    defaultStyle: { font: 'Roboto' }
  }
}