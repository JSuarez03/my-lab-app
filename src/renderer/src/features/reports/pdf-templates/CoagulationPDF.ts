// src/renderer/src/features/reports/pdf-templates/CoagulationPDF.ts

export function buildCoagulationPDF(exam: any, patient: any, doctorName: string, logoDataUrl: string | null): any {
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
      { text: 'ESTUDIOS DE COAGULACIÓN', style: 'titulo' },
      { text: '\n' },
      {
        layout: {
          hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0.5,
          vLineWidth: (i: number, node: any) => (i === 0 || i === node.table.widths.length) ? 1 : 0.5,
          hLineColor: () => '#000',
          vLineColor: () => '#000',
          paddingLeft: (_i: number, _node: any) => 5,
          paddingRight: (_i: number, _node: any) => 5,
          paddingTop: (_i: number, _node: any) => 3,
          paddingBottom: (_i: number, _node: any) => 3,
        },
        table: {
          widths: ['*'],
          body: [
            [{ columns: [
              { text: `NOMBRE Y APELLIDO: ${patient.fullName}`, width: '60%' },
              { text: `CÉDULA: ${patient.identification}`, width: '40%' }
            ], style: 'dato' }],
            [{ columns: [
              { text: `SERVICIO: ____________________________`, width: '40%' },
              { text: `EDAD: ${calculateAge(patient.birthDate)}`, width: '20%' },
              { text: `FECHA: ${exam.date}`, width: '40%' }
            ], style: 'dato' }],
            [{ text: '\n', fontSize: 6 }],
            [{
              columns: [
                {
                  width: '50%',
                  stack: [
                    { text: 'TIEMPO DE PROTROMBINA', style: 'subTitulo' },
                    { text: `TIEMPO PACIENTE: ${getParam('tp_paciente')} SEG` },
                    { text: `TIEMPO CONTROL: ${getParam('tp_control')} SEG` },
                    { text: `ACTIVIDAD PROTROMBÍNICA: ${getParam('actividad_protrombinica')} %` },
                    { text: `RAZÓN: ${getParam('razon')}  V.N 0.8 A 1.2` },
                    { text: `INR: ${getParam('inr')}` },
                    { text: `FIBRINÓGENO: ${getParam('fibrinogeno')} mg/%` }
                  ]
                },
                {
                  width: '50%',
                  stack: [
                    { text: 'TIEMPO PARCIAL DE PROTROMBINA', style: 'subTitulo' },
                    { text: `TIEMPO PACIENTE: ${getParam('ttpa_paciente')} SEG` },
                    { text: `TIEMPO CONTROL: ${getParam('ttpa_control')} SEG` },
                    { text: `DIFERENCIA: (P-C) ${getParam('diferencia')} V.N. +/-6` }
                  ]
                }
              ]
            }],
            [{ text: '\n', fontSize: 6 }],
            [{ text: `LICENCIADO: ${doctorName || '_____________________________'}`, style: 'dato' }]
          ]
        }
      }
    ],
    styles: {
      headerInstitucion: { fontSize: 10, bold: true, alignment: 'center', margin: [0, 2, 0, 2] },
      titulo: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 10, 0, 10] },
      subTitulo: { fontSize: 12, bold: true, margin: [0, 5, 0, 5] },
      dato: { fontSize: 11, margin: [0, 3, 0, 3] }
    },
    defaultStyle: { font: 'Roboto' }
  }
}