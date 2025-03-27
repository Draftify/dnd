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
  console.log("Update on column or task position:", items);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;

        if (source.type === 'column') return;

        setItems((items) => move(items, event));
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