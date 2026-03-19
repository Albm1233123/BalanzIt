import '../css/SavingsGoal.css';
import { Expense } from '../types';

interface savingsGoalProp {
    savingGoal: number;
    expenses: Expense[];
    budget: number;
    plan: "day" | "week" | "month" | "year";
    setSavingsGoal: React.Dispatch<React.SetStateAction<number>>;
}

function SavingsGoal({ expenses, budget, savingGoal, plan, setSavingsGoal}: savingsGoalProp) {

    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const remaining = budget - totalSpent; 
    const progress = savingGoal > 0 ? Math.min((remaining / savingGoal) * 100, 100) : 0;
    const timeGoal = remaining > 0 ? Math.ceil(savingGoal / remaining) : null;

    return (
        <div className="savingsBox">
        <h3>Savings Goal</h3>
        
        <div>
            
        <label>Goal: </label> 
        <input
            type="number"
            placeholder="Enter saving goal"
            value={savingGoal === 0 ? '' : savingGoal}
            onChange={(e) =>
                setSavingsGoal(e.target.value === '' ? 0 : Number(e.target.value))
            }
        />
        </div>
        <div className=''>Remaining per {plan}: {remaining > 0 ? remaining : 0}</div>

        {timeGoal ? (
            <div>Estimated time: {timeGoal} {plan}</div>
        ) : (
            <div>No savings possible</div>
        )}
            Progress: {progress > 0 ? `${progress.toFixed(1)}%` : 'No progress yet'}
        </div>
    )
}

export default SavingsGoal;