import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';

export function Item({ id, index, column, tasks }) {
    const { ref, isDragging } = useSortable({
        id,
        index,
        type: 'item',
        accept: 'item',
        group: column
    });
    const task = tasks.find(task => task.id === Number(id));
    const taskName = task ? task.name : 'Unnamed Task';
    return (
        <button className="Item" ref={ref} data-dragging={isDragging}>
            {taskName}
        </button>
    );
}