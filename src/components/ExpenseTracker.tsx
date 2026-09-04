import React from "react";
import { loadData, saveData } from "../utils/storage";
import { Expense } from "../types";
import "../css/ExpenseTracker.css";
import { Notes } from './Notes';
import { TookFromSavings } from "./TookFromSavings";
import { generatePDFRealExpense } from "../utils/pdf/realexpensePDF";
//dosent save yet

interface expenseFormProps {
    expensePlan: "day" | "week" | "month" | "year";
    setExpensePlan: React.Dispatch<
        React.SetStateAction<"day" | "week" | "month" | "year">
    >;
}

function ExpenseTracker({
    expensePlan,
    setExpensePlan
}: expenseFormProps) {

    const [budget, setBudget] = React.useState(0);
    const [budgetItems, setBudgetItems] = React.useState<Expense[]>([]);

    const [actualAmounts, setActualAmounts] = React.useState<{
        [key: number]: number;
    }>({});

    const totalActual = budgetItems.reduce((total, item, index) => {
        return total + (actualAmounts[index] || 0);
    }, 0);

    React.useEffect(() => {
        const savedBudget = loadData(`${expensePlan}-budget`);
        const savedItems = loadData(`${expensePlan}-expenses`);
        const savedActualAmounts = loadData(`${expensePlan}-actual-expenses`);

        if (savedBudget !== null) {
            setBudget(Number(savedBudget));
        }

        if (savedItems !== null) {
            setBudgetItems(savedItems);
        } else {
            setBudgetItems([]);
        }

        if (savedActualAmounts !== null) {
            setActualAmounts(savedActualAmounts);
        } else {
            setActualAmounts({});
        }
    }, [expensePlan]);

    return (
        <div>
            <div>
                <button
                    className="timeBtn"
                    type="button"
                    onClick={() => setExpensePlan("day")}
                >
                    Daily
                </button>

                <button
                    className="timeBtn"
                    type="button"
                    onClick={() => setExpensePlan("week")}
                >
                    Weekly
                </button>

                <button
                    className="timeBtn"
                    type="button"
                    onClick={() => setExpensePlan("month")}
                >
                    Monthly
                </button>

                <button
                    className="timeBtn"
                    type="button"
                    onClick={() => setExpensePlan("year")}
                >
                    Yearly
                </button>
            </div>
            <label className="expense-label">Total Budget: ${budget}</label>

            <form className="expenseForm">
                <h2>
                    {expensePlan.charAt(0).toUpperCase() +
                        expensePlan.slice(1)}{" "}
                    Budget
                </h2>
                
                <div className="expenseBox">
                    {budgetItems.map((item, index) => {

                        const actual = actualAmounts[index] || 0;
                        const remaining = item.amount - actual;

                        return (
                            <div key={index} className="expenseItem">

                                <h3>{item.label}</h3>

                                <p>Planned: ${item.amount}</p>

                                <input
                                    type="number"
                                    placeholder="Actual spent"
                                    value={actual === 0 ? "" : actual}
                                    onChange={(e) => {
                                        const value =
                                            e.target.value === ""
                                                ? 0
                                                : Number(e.target.value);
                                                
                                        const updatedAmounts = {
                                            ...actualAmounts,
                                            [index]: value
                                        };

                                        setActualAmounts(updatedAmounts);
                                        saveData(`${expensePlan}-actual-expenses`, updatedAmounts);
                                    }}
                                />

                                <p>Actual: ${actual}</p>

                                <p>Remaining: ${remaining}</p>

                            </div>
                        );
                    })}
                </div>
            </form>

            <label className="expense-label">Total Actual: ${totalActual}</label>
            
            <div>
                <Notes />
            </div>

            <div>
                <TookFromSavings />
            </div>
            
            <button
                className="pdfBtn"
                type="button"
                onClick={() => generatePDFRealExpense(budgetItems, actualAmounts, budget, expensePlan)}
            >
                Generate PDF
            </button>
        </div>
    );
}

export default ExpenseTracker;