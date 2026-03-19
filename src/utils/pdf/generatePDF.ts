import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Expense } from "../../types";

export const generatePDF = async (
  chartRef: React.RefObject<HTMLDivElement | null>,
  data: Expense[],
  budget?: number,
  savingsGoal?: number,
  plan?: "day" | "week" | "month" | "year"
) => {
  if (!chartRef.current) return;

  const doc = new jsPDF();

  // title
  doc.setFontSize(16);
  doc.setFont("DM Serif Display");
  doc.text("Expenses Report", 20, 20);
  doc.line(20, 22, 190, 22);

  // budget info left
  doc.setFontSize(12);
  let infoX = 50;
  let infoY = 55;
  doc.text(`Budget: $${budget}`, infoX, infoY);
  doc.text(`Savings Goal: $${savingsGoal}`, infoX, infoY + 10);
  doc.text(`Plan: per ${plan}`, infoX, infoY + 20);

  // char on right
  const canvas = await html2canvas(chartRef.current);
  const imgData = canvas.toDataURL("image/png");

  const chartWidth = 80; 
  const chartHeight = (canvas.height / canvas.width) * chartWidth; 
  const chartX = 180 - chartWidth; 
  const chartY = 25; 
  doc.addImage(imgData, "PNG", chartX, chartY, chartWidth, chartHeight);

  // table 
  let tableY = Math.max(infoY + 40, chartY + chartHeight + 10); 
  doc.setFontSize(12);

  // table headers
  doc.text("Category", 20, tableY);
  doc.text("Description", 80, tableY);
  doc.text("Amount", 150, tableY);
  doc.line(20, tableY + 2, 190, tableY + 2);
  tableY += 10;

  // table rows
  data.forEach(exp => {
    doc.text(exp.label, 20, tableY);
    doc.text(exp.desc, 80, tableY);
    doc.text(`$${exp.amount}`, 150, tableY);
    tableY += 10;

    // new page
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    if (tableY > pageHeight - margin) {
      doc.addPage();
      tableY = margin;
    }
  });

  window.open(doc.output('bloburl'));
};
