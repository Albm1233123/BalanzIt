import React, { useState, useRef } from 'react';
import BudgetForm from './components/BudgetForm';
import BudgetOverview from './components/BudgetOverview';
import PieChart from './components/PieChart';
import SavingsGoal from './components/SavingsGoal';
import PDFButton from "./components/PDFbutton";
import { Expense } from './types'
import "./App.css"

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [plan, setPlan] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const chartRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className='mainTitle'>Budget Planner</h1>

      <div className='titleUnderLine'/>

      {/* Main app grid style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '1rem',
        }}
      >
        {/* Left column */}
        <div className="flex flex-col gap-1">
          <BudgetForm
            expenses={expenses}
            setExpenses={setExpenses}
            budget={budget}
            setBudget={setBudget}
            plan={plan}
            setPlan={setPlan}
          />

          <SavingsGoal 
            savingGoal={savingsGoal}
            setSavingsGoal={setSavingsGoal}
            expenses={expenses}
            budget={budget}
            plan={plan}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-1">
          <BudgetOverview expenses={expenses}/>

          <div ref={chartRef}>
            <PieChart 
              expenses={expenses} 
              budget={budget}
            />
          </div>

           <div>
                <PDFButton
              expenses={expenses}
              budget={budget}
              savingsGoal={savingsGoal}
              plan={plan}
              chartRef={chartRef}
            />
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
