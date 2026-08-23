import { useState } from "react";
// The CSS file is loaded by the bundler; TypeScript does not have a declaration for it.
// @ts-expect-error -- side-effect CSS import
import '../css/Notes.css';

export function Notes() {
    const [text, setText] = useState(() => localStorage.getItem('savedText') ?? '');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentText = event.target.value;
        setText(currentText);
        localStorage.setItem('savedText', currentText);
    };

    return (
        <div className="notes-container">
            <label className="notes-label">Extra Notes</label>
            <textarea  
                className="notes-textarea"
                value={text} 
                onChange={handleChange}
                rows={3}
                placeholder="Type your notes here..."
            />
        </div>
    );
}