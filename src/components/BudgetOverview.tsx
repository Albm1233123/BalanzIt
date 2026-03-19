import '../css/BudgetOverview.css';
import { Expense } from '../types';

interface BudetOverviewForm {
    expenses: Expense[];
}

function BudgetOverview({ expenses } :BudetOverviewForm) {

    return (

        <div className="overviewBox">
            <label>Budget Overview</label>
            
            <div>              
            {expenses.map((expense, index) => (
                <div className="expenseBox" key={index}>
                    {expense.label} - {expense.desc} - {expense.amount} 
                </div>
            ))} 
            </div>
        </div>
    )
}

export default BudgetOverview;