import React from 'react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

export function Column({ children, id, index, columns }) {
    const { ref } = useSortable({
        id,
        index,
        type: 'column',
        collisionPriority: CollisionPriority.Low,
        accept: ['item', 'column'],
    });
    const column = columns.find(col => col.id === Number(id));
    const columnName = column?.name || 'Unknown';
    return (
        <div className="Column" ref={ref}>
            <h2 className="text-lg font-semibold mb-2">{columnName}</h2>
            {children}
        </div>
    );
}