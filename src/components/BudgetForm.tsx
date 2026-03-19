import React, { useState, useEffect, useRef} from 'react';
import { saveData, loadData } from '../utils/storage';
import '../css/BudgetForm.css';
import { Expense } from '../types';

interface BudgetFormProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  plan: "day" | "week" | "month" | "year";
  setPlan: React.Dispatch<React.SetStateAction<"day" | "week" | "month" | "year">>;
}

function BudgetForm({ expenses, setExpenses, budget, setBudget, plan, setPlan }: BudgetFormProps) {

  // Load budget & expenses for the selected plan
  useEffect(() => {
    const savedBudget = loadData(`${plan}-budget`);
    if (savedBudget !== null) setBudget(savedBudget);

    const savedExpenses = loadData(`${plan}-expenses`); 
    if (savedExpenses) setExpenses(savedExpenses);
  }, [plan]);

  // Save budget whenever it changes
  const isFirstBudgetRender = useRef(true);

  useEffect(() => {
    if (isFirstBudgetRender.current) {
      isFirstBudgetRender.current = false;
      return;
    }
    saveData(`${plan}-budget`, budget);
  }, [budget, plan]);

  // Save expenses whenever they change
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveData(`${plan}-expenses`, expenses);
  }, [expenses, plan]);

  const addExpense = () => {
    setExpenses([...expenses, { label: '', desc: '', amount: 0 }]);
  };
  
  const removeExpense = (indexToRemove: number) => {
    setExpenses(expenses.filter((_, i) => i !== indexToRemove));
  };

  const remaining = budget - expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className='budget-layout'>

      <div className='budget-form'>
        <h1>Set your Budget</h1>

      <div>
        <button className='timeBtn' type="button" onClick={() => setPlan('day')}>Daily</button>
        <button className='timeBtn' type="button" onClick={() => setPlan('week')}>Weekly</button>
        <button className='timeBtn' type="button" onClick={() => setPlan('month')}>Monthly</button>
        <button className='timeBtn' type="button" onClick={() => setPlan('year')}>Yearly</button>
      </div>

        <form>

              <label>{plan.charAt(0).toUpperCase() + plan.slice(1)} Budget: </label>
              <input
                type="number"
                placeholder={`Enter ${plan} amount`}
                value={budget === 0 ? '' : budget}
                onChange={(e) => setBudget(e.target.value === '' ? 0 : Number(e.target.value))}
              />

            {plan === 'day' && (
            <>
            </>)}

              <div>
                  <label>Remaining: {remaining} </label>
              </div>
        </form>
      </div>


      <div className ='expenses-section'>
        {expenses.map((exp, index) => (
            <div key={index}>
                <input 
                    type="text"
                    placeholder="Label"
                    value={exp.label}
                    onChange={(e) => {
                        const newExpenses = [...expenses];
                        newExpenses[index].label = e.target.value;
                        setExpenses(newExpenses);
                    }}
                    />
                <input
                    type="text"
                    placeholder="Description"
                    value={exp.desc}
                    onChange={(e) => {
                        const newExpenses = [...expenses];
                        newExpenses[index].desc = e.target.value;
                        setExpenses(newExpenses);
                    }}
                    />
                <input
                    type="number"
                    placeholder="Amount"
                     value={exp.amount === 0 ? '' : exp.amount}
                    onChange={(e) => {
                        const newExpenses = [...expenses];
                        newExpenses[index].amount = e.target.value === '' ? 0 : Number(e.target.value); 
                        setExpenses(newExpenses);
                    }}
                />
                <button type="button" className='deleteBtn' onClick={() => removeExpense(index)}>Delete</button>
            </div>
        ))}
            <button type="button" className='addBtn' onClick={addExpense}>Add Expense</button>
        </div>

    </div>
  );
}

export default BudgetForm;
