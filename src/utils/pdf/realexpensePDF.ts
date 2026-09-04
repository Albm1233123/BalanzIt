import { jsPDF } from "jspdf";
import { Expense } from "../../types";

export const generatePDFRealExpense = async (
  data: Expense[],
  actualAmounts: { [key: number]: number },
  budget: number,
  plan?: "day" | "week" | "month" | "year"
) => {
  const doc = new jsPDF();

  // title
  doc.setFontSize(16);
  doc.setFont("DM Serif Display");
  doc.text("Real Expenses Report", 20, 20);
  doc.line(20, 22, 190, 22);

  // plan info
  doc.setFontSize(12);
  let infoX = 40;
  let infoY = 40;

  doc.text(`Plan: per ${plan}`, infoX, infoY);
  doc.text(`Total planned expense: $${budget}`, infoX, infoY + 5);

  // table
  let tableY = 65;
  doc.setFontSize(12);

  // table headers
  doc.text("Category", 20, tableY);
  doc.text("Description", 65, tableY);
  doc.text("Planned", 110, tableY);
  doc.text("Actual", 145, tableY);
  doc.text("Remaining", 170, tableY);

  doc.line(20, tableY + 2, 190, tableY + 2);

  tableY += 10;

  let totalActual = 0;
  // table rows
  data.forEach((exp, index) => {
    const actual = actualAmounts[index] || 0;
    const remaining = exp.amount - actual;
    totalActual += actual;

    doc.text(exp.label, 20, tableY);
    doc.text(exp.desc, 65, tableY);
    doc.text(`$${exp.amount}`, 110, tableY);
    doc.text(`$${actual}`, 145, tableY);
    doc.text(`$${remaining}`, 170, tableY);

    tableY += 10;

    // new page
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    if (tableY > pageHeight - margin) {
      doc.addPage();
      tableY = margin;
    }
  });

  // top totals
  const remaining = Math.max(0, budget - totalActual);
  doc.text(`Total of actual expense: $${totalActual}`, infoX, infoY + 10);
  doc.text(`Total of Remaining expense: $${remaining}`, infoX, infoY + 15);

  let takenSavings = budget - totalActual;

  if(takenSavings > 0) {
    takenSavings = 0;
  } 

  doc.text(`Total taken from savings: $${takenSavings}`, infoX + 70, infoY + 15)
  
  const notes = localStorage.getItem("savedText") ?? "";
  
  // extra notes
  doc.setFont("helvetica", "bold");
  doc.text("Extra Notes:", 20, tableY);
  tableY += 7;
  doc.setFont("helvetica", "normal");
  doc.text(notes || "No notes", 20, tableY);




  window.open(doc.output("bloburl"));
};