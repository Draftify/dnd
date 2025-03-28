import React, { useState } from 'react';
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

  // This determines the sequence in which columns are displayed.
  // Ensure 'columnOrder' is updated whenever 'items' change or fetched.

  const [columnOrder, setColumnOrder] = useState(() => Object.keys(items));


  // Debugging logs to verify the current state of 'items' and 'columnOrder'. 
  console.log(items);
  console.log(columnOrder);


  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
        if (source.type === 'column') return;
        setItems((items) => move(items, event));
      }}
      onDragEnd={(event) => {
        const { source, _ } = event.operation;
        if (event.canceled || source.type !== 'column') return;
        setColumnOrder((columns) => move(columns, event));
      }}

    >
      <div className="Root">
        {Object.entries(items).map(([columnId, itemIds], index) => {
          const currentColumn = columns.find(col => col.id.toString() === columnId);
          const columnTasks = tasks.filter(task => itemIds.includes(task.id));
          return (
            <Column currentColumn={currentColumn} columns={columns} key={columnId} id={columnId} index={index}>
              {itemIds.map((id, index) => {
                const currentTask = columnTasks.find(task => task.id === id);
                return (
                  <Item tasks={columnTasks} key={id} id={id} index={index} task={currentTask} />
                );
              })}
            </Column>
          );
        })}
      </div>
    </DragDropProvider>
  );
}