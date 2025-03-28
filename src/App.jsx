import React, { useEffect, useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { Item } from './Item';
import { Column } from './Column';

export default function App() {

  const [columns, setColumns] = useState([
    { id: 101, name: "Todo" },
    { id: 202, name: "In Progress" },
    { id: 303, name: "Done" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1010, name: "Design landing page" },
    { id: 1011, name: "Create wireframes" },
    { id: 1012, name: "Review user stories" },
    { id: 2020, name: "Develop API endpoints" },
    { id: 2021, name: "Write unit tests" },
  ]);

  const [items, setItems] = useState({
    101: [1010, 1011, 1012],
    202: [2020, 2021],
    303: [],
  });

  const [columnOrder, setColumnOrder] = useState(() => Object.keys(items));

  const prevItemsRef = useRef(items);
  const prevColumnOrderRef = useRef(columnOrder);

  useEffect(() => {
    if (JSON.stringify(prevColumnOrderRef.current) !== JSON.stringify(columnOrder)) {
      console.log("📊 New column order:", columnOrder);
      prevColumnOrderRef.current = columnOrder;
    }
  }, [columnOrder]);

  useEffect(() => {
    const prevItems = prevItemsRef.current;

    const getMovedItem = (prevItems, newItems) => {
      for (const columnId in prevItems) {
        const prev = prevItems[columnId];
        const curr = newItems[columnId];

        const prevSet = new Set(prev);
        const currSet = new Set(curr);

        // Detect cross-column move
        for (const item of prevSet) {
          if (!currSet.has(item)) {
            for (const destColumnId in newItems) {
              if (destColumnId === columnId) continue;
              if (newItems[destColumnId].includes(item)) {
                return {
                  itemId: item,
                  to: destColumnId,
                };
              }
            }
          }
        }

        // Detect reorder in same column
        if (prev.length === curr.length && prev.some((id, i) => id !== curr[i])) {
          const movedItem = curr.find((id, i) => id !== prev[i]);
          return {
            itemId: movedItem,
            to: columnId,
          };
        }
      }

      return null;
    };

    const moved = getMovedItem(prevItems, items);
    if (moved) {
      console.log("📦 Moved item:", moved);
      const movedGroupData = items[moved.to];
      let position = -1;
      for (let i = 0; i < movedGroupData?.length; i++) {
        if (movedGroupData[i] === moved.itemId) {
          position = i;
          break;
        }
      }

      if (position !== -1) {
        console.log(`Moved item is at position ${position} in the group.`);
      } else {
        console.log("Moved item not found in the group.");
      }
    }
    prevItemsRef.current = items;
  }, [items]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
        if (source.type === 'column') return;
        setItems((items) => move(items, event));
      }}
      onDragEnd={(event) => {
        const { source, target } = event.operation;
        if (event.canceled || source.type !== 'column') return;
        setColumnOrder((columns) => move(columns, event));
      }}
    >
      <div className="Root">
        {Object.entries(items).map(([column, items], index) => (
          <Column columns={columns} key={column} id={column} index={index}>
            {items.map((id, index) => (
              <Item tasks={tasks} key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}