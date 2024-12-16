import React, { useState } from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const {data, changeStatus, setPriority, setDueDate } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempChecked, setTempChecked] = useState(data.completed);
    const [priority, setTaskPriority] = useState(data.priority);
    const [dueDate, setTaskDueDate] = useState(data.dueDate);

    const handleChange = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        changeStatus(data.id, !tempChecked);
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setTempChecked(data.completed);
        setIsDialogOpen(false);
    };

    const handlePriorityChange = (event) => {
        setTaskPriority(event.target.value);
        setPriority(data.id, event.target.value); // Notify parent to update the priority
    };

    const handleDueDateChange = (event) => {
        setTaskDueDate(event.target.value);
        setDueDate(data.id, event.target.value); // Notify parent to update the due date
    };

    const className = 'todo-item ui-state-default ' + (data.completed ? 'completed' : 'pending');


    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={tempChecked} onChange={handleChange} />
                    {data.text}
                </label>
            </div>

            {/* Display Priority */}
            <div className="priority">
                <span>Priority: {priority}</span>
                <select value={priority} onChange={handlePriorityChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Display Due Date */}
            <div className="due-date">
                <span>Due Date: {dueDate}</span>
                <input
                    type="date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                />
            </div>

            {/* Confirmation Dialog */}
            {isDialogOpen && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to mark this task as completed?</p>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </li>
    );
}
