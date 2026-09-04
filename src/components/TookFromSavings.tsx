import { useState } from "react";

export function TookFromSavings() {
    const [fromSavings, setFromSavings] = useState(() => localStorage.getItem('savingsText') ?? '');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentSavingsText = event.target.value;
        setFromSavings(currentSavingsText);
        localStorage.setItem('fromSavings', currentSavingsText);
    };

    return (
        <div>
            <label>How much taken from savings</label>
            <textarea
                value={fromSavings}
                onChange={handleChange}
                placeholder="Taken from savings..."
            />
        </div>
    );
}