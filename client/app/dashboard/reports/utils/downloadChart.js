import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function downloadChartAsPDF(chartRef, title) {
  if (!chartRef.current) return

  try {
    const canvas = await html2canvas(chartRef.current)
    const imageData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    })

    pdf.setFontSize(16)
    pdf.setTextColor(44, 51, 51) // #2C3333
    pdf.text(title, 20, 20)

    pdf.addImage(
      imageData,
      'PNG',
      0,
      30,
      canvas.width,
      canvas.height
    )

    pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}

