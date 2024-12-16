import React, { useState } from 'react';

import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
    const { list, filter, mode, query } = props.data;
    const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery } = props.actions;
    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    const items = search(applyFilter(list, filter), query);

    // New State for sorting and additional features
    const [sortBy, setSortBy] = useState('dueDate');  // Default sorting by Due Date


    // Handle sorting logic
    const handleSort = (sortType) => {
        setSortBy(sortType);
    };

    // Sort items by Due Date or Priority (High > Medium > Low)
    const sortedItems = items.sort((a, b) => {
        if (sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);  // Ascending order of Due Date
        } else if (sortBy === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];  // High > Medium > Low
        }
        return 0;
    });

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header
                        {...{ addNew, mode, query, setSearchQuery, handleSort }}  // Pass sorting method to Header
                    />
                    <FilteredList {...{ items: sortedItems, changeStatus }} />  {/* Display sorted items */}
                    <Footer
                        {...{ activeItemCount, filter, changeFilter, mode, changeMode }}
                    />
                    <Info {...{ mode }} />
                </div>
            </div>
        </div>
    );
}
