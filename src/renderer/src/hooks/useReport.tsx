// src/renderer/src/hooks/useReport.tsx
import pdfMake from 'pdfmake/build/pdfmake'
import { Patient } from '@renderer/features/patients/patient.types'
import { Exam } from '@renderer/features/exams/exam.types'
import { buildCoagulationPDF, buildPatientHistoryPDF, buildChemistryPDF, buildHematologyPDF, buildSerologyPDF  } from '@renderer/features/reports/pdf-templates'
import { buildHecesPDF } from '@renderer/features/reports/pdf-templates'
import { buildOrinaPDF } from '@renderer/features/reports/pdf-templates'
import { buildGenericExamPDF } from '@renderer/features/reports/pdf-templates/GenericExamPDF'
// ===== Configurar pdfmake con fuentes Roboto =====
import * as vfsFonts from 'pdfmake/build/vfs_fonts'

try {
  const vf: any = vfsFonts as any
  const vfs = vf?.pdfMake?.vfs ?? vf?.vfs ?? vf ?? undefined
  if (vfs) {
    ;(pdfMake as any).vfs = vfs
  } else {
    console.warn('pdfmake vfs not found in imported vfs_fonts')
  }
} catch (err) {
  console.warn('Failed to assign pdfmake vfs from vfs_fonts import', err)
}

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

// ===== Funciones auxiliares =====
const downloadPdf = (pdfDoc: any, filename: string) => {
  pdfDoc.download(filename)
}

const previewPdf = (pdfDoc: any) => {
  pdfDoc.getBlob((blob: Blob) => {
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  })
}

// ===== Cargar logo como dataURL =====
async function loadLogoAsDataUrl(): Promise<string | null> {
  try {
    const response = await fetch('/src/assets/impresion.png')
    if (!response.ok) throw new Error('Failed to fetch logo')
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error loading logo:', error)
    return null
  }
}

// ===== Reporte de Coagulación =====
export async function generateCoagulationReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition = buildCoagulationPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Coagulacion_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewCoagulationReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition = buildCoagulationPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

// ===== Reporte de historial =====
export async function generatePatientHistoryReport(patient: Patient, exams: Exam[]) {
  const docDefinition = buildPatientHistoryPDF(patient, exams)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Historial_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

// ===== Reporte de Química Sanguínea =====
export async function generateChemistryReport(exam: Exam, patient: Patient) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildChemistryPDF(exam, patient, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Quimica_Sanguinea_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewChemistryReport(exam: Exam, patient: Patient) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildChemistryPDF(exam, patient, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

export async function generateExamReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildGenericExamPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `${exam.type.replace(/\s/g, '_')}_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewExamReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildGenericExamPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

// ===== Reporte de Hematología =====
export async function generateHematologyReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildHematologyPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Hematologia_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewHematologyReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildHematologyPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

// ===== Reporte de Serología =====
export async function generateSerologyReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildSerologyPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Serologia_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewSerologyReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildSerologyPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

// ===== Reporte de Heces =====
export async function generateHecesReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildHecesPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Heces_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewHecesReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildHecesPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}

// ===== Reporte de Orina =====
export async function generateOrinaReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildOrinaPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  downloadPdf(pdfDoc, `Orina_${patient.fullName.replace(/\s/g, '_')}.pdf`)
}

export async function previewOrinaReport(exam: Exam, patient: Patient, doctorName: string) {
  const logoDataUrl = await loadLogoAsDataUrl()
  const docDefinition: any = buildOrinaPDF(exam, patient, doctorName, logoDataUrl)
  const pdfDoc = pdfMake.createPdf(docDefinition)
  previewPdf(pdfDoc)
}