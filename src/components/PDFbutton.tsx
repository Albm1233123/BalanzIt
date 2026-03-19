import React from "react";
import { generatePDF } from "../utils/pdf/generatePDF";
import { Expense } from "../types";

interface PDFButtonProps {
  expenses: Expense[];
  budget?: number;
  savingsGoal?: number;
  plan: "day" | "week" | "month" | "year"; 
  chartRef: React.RefObject<HTMLDivElement | null>;
}

const PDFButton: React.FC<PDFButtonProps> = ({ chartRef, expenses, budget, savingsGoal, plan }) => {
  const handleClick = () => {
    generatePDF(chartRef, expenses, budget, savingsGoal, plan);
  };

  return <button className="pdfBtn" onClick={handleClick}>Save as PDF</button>;
};

export default PDFButton;
