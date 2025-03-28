import React from 'react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

export function Column({ children, id, index, currentColumn }) {
    const { ref } = useSortable({id,index,type: 'column',collisionPriority: CollisionPriority.Low,accept: ['item', 'column'],});

    return (
        <div className="Column" ref={ref}>
            <h2 className="text-lg font-semibold mb-2">{currentColumn?.name}</h2>
            {children}
        </div>
    );
}