import { ExamDefinition, ExamType } from './exam.types'

export const EXAM_DEFINITIONS: ExamDefinition[] = [
  {
    type: 'Coagulación',
    label: 'Coagulación',
    parameters: [
      // ====== TIEMPO DE PROTOMBINA ======
      {
        id: 'tp_paciente',
        name: 'T. Protrombina – Paciente',
        unit: 'seg',
        referenceMin: 11.0,
        referenceMax: 14.0,
        type: 'number',
        lowThreshold: 11.0,
        lowCriticalThreshold: 9.0,
        highThreshold: 14.0,
        highCriticalThreshold: 30.0,
        group: 'Tiempo de Protrombina'
      },
      {
        id: 'tp_control',
        name: 'T. Protrombina – Control',
        unit: 'seg',
        referenceMin: 11.0,
        referenceMax: 13.0,
        type: 'number',
        lowThreshold: 10.0,
        highThreshold: 13.0,
        group: 'Tiempo de Protrombina'
      },
      {
        id: 'actividad_protrombinica',
        name: 'Actividad Protrombínica',
        unit: '%',
        referenceMin: 70,
        referenceMax: 100,
        type: 'number',
        lowThreshold: 70,
        lowCriticalThreshold: 40,
        highThreshold: 100,
        group: 'Tiempo de Protrombina'
      },
      {
        id: 'razon',
        name: 'RAZÓN (V.N.)',
        unit: '',
        referenceMin: 0.8,
        referenceMax: 1.2,
        type: 'number',
        lowThreshold: 0.8,
        highThreshold: 1.2,
        highCriticalThreshold: 5.0,
        group: 'Tiempo de Protrombina'
      },
      {
        id: 'inr',
        name: 'INR',
        unit: '',
        referenceMin: 0.8,
        referenceMax: 1.2,
        type: 'number',
        lowThreshold: 0.8,
        highThreshold: 1.2,
        highCriticalThreshold: 5.0,
        group: 'Tiempo de Protrombina'
      },
      {
        id: 'fibrinogeno',
        name: 'FIBRINÓGENO',
        unit: 'mg/%',
        referenceMin: 200,
        referenceMax: 400,
        type: 'number',
        lowThreshold: 200,
        lowCriticalThreshold: 100,
        highThreshold: 400,
        highCriticalThreshold: 700,
        group: 'Tiempo de Protrombina'
      },
      // ====== TIEMPO PARCIAL DE PROTOMBINA (TTPa) ======
      {
        id: 'ttpa_paciente',
        name: 'TTPa – Paciente',
        unit: 'seg',
        referenceMin: 25,
        referenceMax: 35,
        type: 'number',
        lowThreshold: 25,
        lowCriticalThreshold: 20,
        highThreshold: 35,
        highCriticalThreshold: 70,
        group: 'Tiempo Parcial de Protrombina (TTPa)'
      },
      {
        id: 'ttpa_control',
        name: 'TTPa – Control',
        unit: 'seg',
        referenceMin: 25,
        referenceMax: 35,
        type: 'number',
        lowThreshold: 22,
        highThreshold: 38,
        group: 'Tiempo Parcial de Protrombina (TTPa)'
      },
      {
        id: 'diferencia',
        name: 'DIFERENCIA (P – C)',
        unit: 'seg',
        referenceMin: -6.0,
        referenceMax: 6.0,
        type: 'number',
        lowThreshold: -10.0,
        lowCriticalThreshold: -10.0, // <-- para que muestre crítico si es menor a -10
        highThreshold: 6.0,
        highCriticalThreshold: 15.0,
        group: 'Tiempo Parcial de Protrombina (TTPa)'
      }
    ]
  },
  {
    type: 'Heces',
    label: 'Heces',
    parameters: [
      // ====== CARACTERÍSTICAS GENERALES ======
      {
        id: 'aspecto',
        name: 'ASPECTO',
        type: 'select',
        options: ['Normal', 'Pastoso', 'Líquido', 'Duro', 'Mucoso'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      {
        id: 'color',
        name: 'COLOR',
        type: 'select',
        options: ['Amarillo', 'Marrón', 'Verde', 'Negro', 'Rojo', 'Blanco'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      {
        id: 'consistencia',
        name: 'CONSISTENCIA',
        type: 'select',
        options: ['Pastosa', 'Líquida', 'Dura', 'Blanda'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      {
        id: 'olor',
        name: 'OLOR',
        type: 'select',
        options: ['Normal', 'Fétido', 'Ácido', 'Pútrido'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      {
        id: 'moco',
        name: 'MOCO',
        type: 'select',
        options: ['Ausente', 'Presente'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      {
        id: 'sangre',
        name: 'SANGRE',
        type: 'select',
        options: ['Ausente', 'Presente'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      // ====== REACCIÓN ======
      {
        id: 'reaccion',
        name: 'REACCIÓN',
        type: 'select',
        options: ['Ácida', 'Alcalina', 'Anfótera', 'Neutra'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Reacción'
      },
      // ====== ANÁLISIS MICROSCÓPICO - PROTOZOARIOS ======
      {
        id: 'endolimax_trofozoitos',
        name: 'Endolimax nana - Trofozoitos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'endolimax_quistes',
        name: 'Endolimax nana - Quistes',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'entamoeba_histolytica_trofozoitos',
        name: 'Entamoeba histolytica - Trofozoitos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'entamoeba_histolytica_quistes',
        name: 'Entamoeba histolytica - Quistes',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'entamoeba_coli_trofozoitos',
        name: 'Entamoeba coli - Trofozoitos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'entamoeba_coli_quistes',
        name: 'Entamoeba coli - Quistes',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'giardia_trofozoitos',
        name: 'Giardia duodenalis - Trofozoitos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'giardia_quistes',
        name: 'Giardia duodenalis - Quistes',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'tricomonas',
        name: 'Tricomonas sp',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      {
        id: 'blastocystis',
        name: 'Blastocystis hominis',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Protozoarios'
      },
      // ====== ANÁLISIS MICROSCÓPICO - HELMINTOS ======
      {
        id: 'ascaris_huevos',
        name: 'Ascaris lumbricoides - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'trichiuris_huevos',
        name: 'Trichiuris trichiura - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'strongiloides_huevos',
        name: 'Strongiloides stercoralis - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'enterobius_huevos',
        name: 'Enterobius vermicularis - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'enterobius_larvas',
        name: 'Enterobius vermicularis - Larvas',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'taenia_huevos',
        name: 'Taenia sp - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      {
        id: 'ancilostomideo_huevos',
        name: 'Ancilostomideo - Huevos',
        type: 'select',
        options: ['No observado', 'Observado'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      // ====== OTROS ======
      {
        id: 'otros',
        name: 'OTROS',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Microscópico - Helmintos'
      },
      // ====== ANÁLISIS QUÍMICO ======
      {
        id: 'azucares_reductores',
        name: 'Azucares Reductores',
        type: 'select',
        options: ['Negativo', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Químico'
      },
      {
        id: 'sangre_oculta',
        name: 'Sangre Oculta',
        type: 'select',
        options: ['Negativo', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Análisis Químico'
      }
    ]
  },
  {
    type: 'Hematología',
    label: 'Hematología',
    parameters: [
      {
        id: 'hemoglobina',
        name: 'Hemoglobina',
        unit: 'grs',
        referenceMin: 11.0,
        referenceMax: 14.0,
        type: 'number',
        lowThreshold: 11.0,
        lowCriticalThreshold: 7.0,
        highThreshold: 14.0,
        highCriticalThreshold: 18.0
      },
      {
        id: 'hematocrito',
        name: 'Hematocrito',
        unit: '%',
        referenceMin: 37.0,
        referenceMax: 48.0,
        type: 'number',
        lowThreshold: 37.0,
        lowCriticalThreshold: 25.0,
        highThreshold: 48.0,
        highCriticalThreshold: 60.0
      },
      {
        id: 'cuenta_blanca',
        name: 'Cuenta Blanca',
        unit: 'mm',
        referenceMin: 5000,
        referenceMax: 10000,
        type: 'number',
        lowThreshold: 5000,
        lowCriticalThreshold: 2000,
        highThreshold: 10000,
        highCriticalThreshold: 50000
      },
      {
        id: 'seg_neutrofilos',
        name: 'Seg. Neutrófilos',
        unit: '%',
        referenceMin: 50,
        referenceMax: 70,
        type: 'number',
        lowThreshold: 50,
        lowCriticalThreshold: 20,
        highThreshold: 70,
        highCriticalThreshold: 90
      },
      {
        id: 'linfocitos',
        name: 'Linfocitos',
        unit: '%',
        referenceMin: 20,
        referenceMax: 40,
        type: 'number',
        lowThreshold: 20,
        lowCriticalThreshold: 5,
        highThreshold: 40,
        highCriticalThreshold: 60
      },
      {
        id: 'globulos_rojos',
        name: 'Glóbulos Rojos',
        unit: 'millones',
        referenceMin: 3.50,
        referenceMax: 5.50,
        type: 'number',
        lowThreshold: 3.50,
        lowCriticalThreshold: 2.00,
        highThreshold: 5.50,
        highCriticalThreshold: 6.50
      },
      {
        id: 'mcv',
        name: 'MCV',
        unit: 'fL',
        referenceMin: 80,
        referenceMax: 100,
        type: 'number',
        lowThreshold: 80,
        lowCriticalThreshold: 65,
        highThreshold: 100,
        highCriticalThreshold: 120
      },
      {
        id: 'mch',
        name: 'MCH',
        unit: 'pg',
        referenceMin: 27,
        referenceMax: 34,
        type: 'number',
        lowThreshold: 27,
        lowCriticalThreshold: 20,
        highThreshold: 34,
        highCriticalThreshold: 38
      },
      {
        id: 'mchc',
        name: 'MCHC',
        unit: 'g/dL',
        referenceMin: 31,
        referenceMax: 36,
        type: 'number',
        lowThreshold: 31,
        lowCriticalThreshold: 25,
        highThreshold: 36,
        highCriticalThreshold: 38
      },
      {
        id: 'plaquetas',
        name: 'Plaquetas',
        unit: 'mm³%',
        referenceMin: 140000,
        referenceMax: 440000,
        type: 'number',
        lowThreshold: 140000,
        lowCriticalThreshold: 20000,
        highThreshold: 440000,
        highCriticalThreshold: 1000000
      },
      {
        id: 'vsg',
        name: 'VSG',
        unit: 'mm/h',
        referenceMin: 0,
        referenceMax: 20,
        type: 'number',
        highThreshold: 20,
        highCriticalThreshold: 100
      },
      {
        id: 'tpo_sangria',
        name: 'Tpo. de Sangría',
        unit: 'min',
        referenceMin: 1,
        referenceMax: 4,
        type: 'number',
        highThreshold: 4,
        highCriticalThreshold: 10
      },
      {
        id: 'tpo_protombina',
        name: 'Tpo. Protrombina',
        unit: 'seg',
        referenceMin: 11.0,
        referenceMax: 14.0,
        type: 'number',
        lowThreshold: 11.0,
        lowCriticalThreshold: 9.0,
        highThreshold: 14.0,
        highCriticalThreshold: 30.0
      },
      {
        id: 'tpo_control',
        name: 'Tpo. Control',
        unit: 'seg',
        referenceMin: 11.0,
        referenceMax: 13.0,
        type: 'number',
        lowThreshold: 10.0,
        highThreshold: 13.0
      },
      {
        id: 'relacion_pc',
        name: 'Relación P/C',
        unit: '',
        referenceMin: 0.8,
        referenceMax: 1.2,
        type: 'number',
        lowThreshold: 0.8,
        highThreshold: 1.2,
        highCriticalThreshold: 5.0
      },
      {
        id: 'ptt',
        name: 'P.T.T.',
        unit: 'seg',
        referenceMin: 25,
        referenceMax: 35,
        type: 'number',
        lowThreshold: 25,
        lowCriticalThreshold: 20,
        highThreshold: 35,
        highCriticalThreshold: 70
      },
      {
        id: 'ptt_control',
        name: 'T. Control (PTT)',
        unit: 'seg',
        referenceMin: 25,
        referenceMax: 35,
        type: 'number',
        lowThreshold: 22,
        highThreshold: 38
      },
      {
        id: 'diferencia',
        name: 'Diferencia',
        unit: 'seg',
        referenceMin: -6.0,
        referenceMax: 6.0,
        type: 'number',
        lowThreshold: -10.0,
        lowCriticalThreshold: -10.0,
        highThreshold: 6.0,
        highCriticalThreshold: 15.0
    }
  ]
},
  {
    type: 'Orina',
    label: 'Orina',
    parameters: [
      // ====== ASPECTO ======
      {
        id: 'aspecto',
        name: 'ASPECTO',
        type: 'select',
        options: ['Claro', 'Lig. Turbio', 'Turbio', 'Muy Turbio'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      // ====== COLOR ======
      {
        id: 'color',
        name: 'COLOR',
        type: 'select',
        options: ['Amarillo Pálido', 'Amarillo', 'Amarillo Intenso', 'Ámbar', 'Verdoso', 'Rojizo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      // ====== CANTIDAD ======
      {
        id: 'cantidad',
        name: 'CANTIDAD',
        type: 'select',
        options: ['Muestra Parcial', 'Muestra Insuficiente', 'Muestra Contaminada'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      // ====== pH ======
      {
        id: 'ph',
        name: 'pH',
        type: 'select',
        options: ['5.0', '5.5', '6.0', '6.5', '7.0'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Características Generales'
      },
      // ====== DENSIDAD (con umbrales) ======
      {
        id: 'densidad',
        name: 'DENSIDAD',
        unit: '',
        referenceMin: 1.005,
        referenceMax: 1.030,
        type: 'number',
        lowThreshold: 1.005,
        lowCriticalThreshold: 1.001,
        highThreshold: 1.030,
        highCriticalThreshold: 1.040,
        group: 'Características Generales'
      },
      // ====== CETONAS ======
      {
        id: 'cetonas',
        name: 'CETONAS',
        type: 'select',
        options: ['Negativo', 'Trazas', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== BILIRRUBINA ======
      {
        id: 'bilirrubina',
        name: 'BILIRRUBINA',
        type: 'select',
        options: ['Negativo', 'Trazas', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== GLUCOSA ======
      {
        id: 'glucosa',
        name: 'GLUCOSA',
        type: 'select',
        options: ['Negativo', 'Trazas', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== HEMOGLOBINA ======
      {
        id: 'hemoglobina',
        name: 'HEMOGLOBINA',
        type: 'select',
        options: ['Negativo', 'Trazas', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== PROTEÍNAS ======
      {
        id: 'proteinas',
        name: 'PROTEÍNAS',
        type: 'select',
        options: ['Negativo', 'Trazas', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== UROBILINA ======
      {
        id: 'urobilina',
        name: 'UROBILINA',
        type: 'select',
        options: ['Normal', 'Negativo', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== NITRITOS ======
      {
        id: 'nitritos',
        name: 'NITRITOS',
        type: 'select',
        options: ['Negativo', 'Positivo'],
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Química'
      },
      // ====== SEDIMENTO (microscopía) ======
      {
        id: 'bacterias',
        name: 'Bacterias',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'hematies_eumorficos',
        name: 'Hematíes Eumórficos',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'hematies_dismorficos',
        name: 'Hematíes Dismórficos',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'leucocitos',
        name: 'Leucocitos',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'mucina',
        name: 'Mucina',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'blastoconidias',
        name: 'Blastoconidias Aisladas y Gemantes',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'hifas',
        name: 'Hifas',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'seudohifas',
        name: 'Seudohifas',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'celulas_epiteliales_planas',
        name: 'Células Epiteliales Planas',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'celulas_epiteliales_redondas',
        name: 'Células Epiteliales Redondas',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      {
        id: 'celulas_epiteliales_caudadas',
        name: 'Células Epiteliales Caudadas',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      },
      // ====== CILINDROS ======
      {
        id: 'cilindro_hialino',
        name: 'Cilindro Hialino',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cilindros'
      },
      {
        id: 'cilindro_granuloso',
        name: 'Cilindro Granuloso',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cilindros'
      },
      {
        id: 'cilindro_leucocitario',
        name: 'Cilindro Leucocitario',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cilindros'
      },
      {
        id: 'cilindro_hematico',
        name: 'Cilindro Hemático',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cilindros'
      },
      {
        id: 'cilindro_cereo',
        name: 'Cilindro Céreo',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cilindros'
      },
      // ====== CRISTALES ======
      {
        id: 'cristal_oxalato_calcio',
        name: 'Cristales de Oxalato de Calcio',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cristales'
      },
      {
        id: 'cristal_acido_urico',
        name: 'Cristales de Ácido Úrico',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cristales'
      },
      {
        id: 'cristal_urato_amorfo',
        name: 'Cristales de Urato Amorfo',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cristales'
      },
      {
        id: 'cristal_fosfato_amorfo',
        name: 'Cristales de Fosfato Amorfo',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cristales'
      },
      {
        id: 'cristal_fosfato_triple',
        name: 'Cristales de Fosfato Triple',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento - Cristales'
      },
      // ====== OTROS ======
      {
        id: 'otros',
        name: 'Otros',
        type: 'text',
        unit: '',
        referenceMin: 0,
        referenceMax: 0,
        group: 'Sedimento'
      }
    ]
  },
  {
    type: 'Serología',
    label: 'Serología',
    parameters: [
      { id: 'vdrl', name: 'VRDL', type: 'select', options: ['Reactivo', 'No Reactivo'] },
      { id: 'pcr', name: 'PCR', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'ra_test', name: 'RA TEST', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'toxoplasmosis', name: 'TOXOPLASMOSIS', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'monotest', name: 'MONOTEST', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'asto', name: 'ASTO', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'test_pack_sangre', name: 'TEST PACK EN SANGRE', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'embarazo_orina', name: 'PRUEBA DE EMBARAZO EN ORINA', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'hiv', name: 'HIV', type: 'select', options: ['Positivo', 'Negativo'] },
      { id: 'piloriset', name: 'PILORISET', type: 'select', options: ['Positivo', 'Negativo'] },
    ]
  },
  {
    type: 'Química Sanguínea',
    label: 'Química Sanguínea',
    parameters: [
      {
        id: 'glucosa',
        name: 'Glucosa Oxidasa',
        unit: 'mg/dL',
        referenceMin: 70,
        referenceMax: 105,
        type: 'number',
        lowThreshold: 70,
        lowCriticalThreshold: 50,
        highThreshold: 105,
        highCriticalThreshold: 400
      },
      {
        id: 'bun',
        name: 'BUN',
        unit: 'mg/dL',
        referenceMin: 7,
        referenceMax: 18,
        type: 'number',
        lowThreshold: 7,
        highThreshold: 18,
        highCriticalThreshold: 60
      },
      {
        id: 'acido_urico',
        name: 'Ácido Úrico',
        unit: 'mg/dL',
        referenceMin: 2.5,
        referenceMax: 7.0,
        type: 'number',
        lowThreshold: 2.0,
        highThreshold: 7.0,
        highCriticalThreshold: 10.0
      },
      {
        id: 'colesterol_total',
        name: 'Colesterol Total',
        unit: 'mg/dL',
        referenceMin: 0,
        referenceMax: 200,
        type: 'number',
        lowThreshold: 120,
        highThreshold: 200,
        highCriticalThreshold: 300
      },
      {
        id: 'colesterol_hdl',
        name: 'Colesterol HDL',
        unit: 'mg/dL',
        referenceMin: 30,
        referenceMax: 85,
        type: 'number',
        lowThreshold: 30,
        lowCriticalThreshold: 15,
        highThreshold: 85
      },
      {
        id: 'colesterol_ldl',
        name: 'Colesterol LDL',
        unit: 'mg/dL',
        referenceMin: 0,
        referenceMax: 150,
        type: 'number',
        lowThreshold: 50,
        highThreshold: 150,
        highCriticalThreshold: 190
      },
      {
        id: 'trigliceridos',
        name: 'Triglicéridos',
        unit: 'mg/dL',
        referenceMin: 44,
        referenceMax: 148,
        type: 'number',
        lowThreshold: 44,
        highThreshold: 148,
        highCriticalThreshold: 500
      },
      {
        id: 'proteinas_totales',
        name: 'Proteínas Totales',
        unit: 'g/dL',
        referenceMin: 6.0,
        referenceMax: 8.2,
        type: 'number',
        lowThreshold: 6.0,
        lowCriticalThreshold: 4.0,
        highThreshold: 8.2,
        highCriticalThreshold: 10.0
      },
      {
        id: 'albumina',
        name: 'Albúmina',
        unit: 'g/dL',
        referenceMin: 3.5,
        referenceMax: 5.3,
        type: 'number',
        lowThreshold: 3.5,
        lowCriticalThreshold: 2.0,
        highThreshold: 5.3
      },
      {
        id: 'globulina',
        name: 'Globulina',
        unit: 'g/dL',
        referenceMin: 2.5,
        referenceMax: 3.5,
        type: 'number',
        lowThreshold: 2.5,
        lowCriticalThreshold: 1.5,
        highThreshold: 3.5,
        highCriticalThreshold: 5.0
      },
      {
        id: 'relacion_ag',
        name: 'Relación A/G',
        unit: '',
        referenceMin: 1.0,
        referenceMax: 1.8,
        type: 'number',
        lowThreshold: 1.0,
        lowCriticalThreshold: 0.5,
        highThreshold: 1.8
      },
      {
        id: 'calcio',
        name: 'Calcio Arsenato',
        unit: 'mg/dL',
        referenceMin: 8.5,
        referenceMax: 10.4,
        type: 'number',
        lowThreshold: 8.5,
        lowCriticalThreshold: 7.0,
        highThreshold: 10.4,
        highCriticalThreshold: 12.0
      },
      {
        id: 'fosforo',
        name: 'Fósforo',
        unit: 'mg/dL',
        referenceMin: 2.5,
        referenceMax: 4.8,
        type: 'number',
        lowThreshold: 2.5,
        lowCriticalThreshold: 1.0,
        highThreshold: 4.8,
        highCriticalThreshold: 6.5
      },
      {
        id: 'magnesio',
        name: 'Magnesio',
        unit: 'mg/dL',
        referenceMin: 1.6,
        referenceMax: 3.0,
        type: 'number',
        lowThreshold: 1.6,
        lowCriticalThreshold: 1.0,
        highThreshold: 3.0,
        highCriticalThreshold: 5.0
      },
      {
        id: 'gpt_alt',
        name: 'GPT/ALT',
        unit: 'U/L',
        referenceMin: 4,
        referenceMax: 36,
        type: 'number',
        lowThreshold: 4,
        highThreshold: 36,
        highCriticalThreshold: 300
      },
      {
        id: 'got_ast',
        name: 'GOT/AST',
        unit: 'U/L',
        referenceMin: 5,
        referenceMax: 34,
        type: 'number',
        lowThreshold: 5,
        highThreshold: 34,
        highCriticalThreshold: 300
      },
      {
        id: 'bilirrubina_total',
        name: 'Bilirrubina Total',
        unit: 'mg/dL',
        referenceMin: 0.2,
        referenceMax: 1.2,
        type: 'number',
        lowThreshold: 0.2,
        highThreshold: 1.2,
        highCriticalThreshold: 20.0
      },
      {
        id: 'bilirrubina_directa',
        name: 'Bilirrubina Directa',
        unit: 'mg/dL',
        referenceMin: 0.0,
        referenceMax: 0.2,
        type: 'number',
        highThreshold: 0.2,
        highCriticalThreshold: 5.0
      },
      {
        id: 'bilirrubina_indirecta',
        name: 'Bilirrubina Indirecta',
        unit: 'mg/dL',
        referenceMin: 0.0,
        referenceMax: 1.0,
        type: 'number',
        highThreshold: 1.0,
        highCriticalThreshold: 10.0
      },
      {
        id: 'fosfatasa_alcalina',
        name: 'Fosfatasa Alcalina',
        unit: 'U/L',
        referenceMin: 25,
        referenceMax: 180,
        type: 'number',
        lowThreshold: 25,
        highThreshold: 180,
        highCriticalThreshold: 500
      },
      {
        id: 'ldh',
        name: 'Láctido Deshidrogenasa (LDH)',
        unit: 'U/L',
        referenceMin: 80,
        referenceMax: 285,
        type: 'number',
        lowThreshold: 80,
        highThreshold: 285,
        highCriticalThreshold: 600
      },
      {
        id: 'gamma_gt',
        name: 'Gamma GT',
        unit: 'U/L',
        referenceMin: 6,
        referenceMax: 37,
        type: 'number',
        lowThreshold: 6,
        highThreshold: 37,
        highCriticalThreshold: 200
      },
      {
        id: 'amilasa',
        name: 'Amilasa',
        unit: 'U/L',
        referenceMin: 25,
        referenceMax: 125,
        type: 'number',
        lowThreshold: 25,
        highThreshold: 125,
        highCriticalThreshold: 500
      },
      {
        id: 'creatinquinasa',
        name: 'Creatinquinasa (CK Total)',
        unit: 'U/L',
        referenceMin: 0,
        referenceMax: 160,
        type: 'number',
        highThreshold: 160,
        highCriticalThreshold: 1000
      },
      {
        id: 'hierro_total',
        name: 'Hierro Total',
        unit: 'µg/dL',
        referenceMin: 60,
        referenceMax: 150,
        type: 'number',
        lowThreshold: 60,
        lowCriticalThreshold: 30,
        highThreshold: 150,
        highCriticalThreshold: 300
      },
      {
        id: 'ck_mb',
        name: 'CK-MB',
        unit: 'U/L',
        referenceMin: 0,
        referenceMax: 24,
        type: 'number',
        highThreshold: 24,
        highCriticalThreshold: 100
      },
      {
        id: 'pcr',
        name: 'PCR',
        unit: 'mg/L',
        referenceMin: 0,
        referenceMax: 3,
        type: 'number',
        highThreshold: 3,
        highCriticalThreshold: 50
      },
      {
        id: 'creatinina',
        name: 'Creatinina',
        unit: 'mg/dL',
        referenceMin: 0.4,
        referenceMax: 1.4,
        type: 'number',
        lowThreshold: 0.4,
        highThreshold: 1.4,
        highCriticalThreshold: 4.0
      }
    ]
  },
]

export const getExamDefinition = (type: ExamType): ExamDefinition | undefined => {
  return EXAM_DEFINITIONS.find(def => def.type === type)
}