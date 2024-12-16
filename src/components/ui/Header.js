import React from 'react';
import InputWrapper from './InputWrapper';

export default function Header(props) {
    const { addNew, mode, query, setSearchQuery, handleSort } = props;

    // Handle change in sorting option
    const handleSortingChange = (event) => {
        handleSort(event.target.value); // Call the passed function to change the sort state
    };

    return (
        <header>
            <h1>Things To Do</h1>

            {/* Sorting Dropdown */}
            <div className="sorting-options">
                <label htmlFor="sorting">Sort by:</label>
                <select id="sorting" onChange={handleSortingChange}>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            {/* Pass props to InputWrapper */}
            <InputWrapper {...{ addNew, mode, query, setSearchQuery }} />
        </header>
    );
}

