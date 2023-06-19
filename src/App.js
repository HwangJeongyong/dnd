import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function App() {

  const data = [
    {
      id: '1',
      Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
      // Assigned_To: 'Beltran',
      // Assignee: 'Romona',
      // Status: 'To-do',
      // Priority: 'Low',
      Due_Date: '25-May-2020',
    },
    {
      id: '2',
      Task: 'Fix Styling',
      // Assigned_To: 'Dave',
      // Assignee: 'Romona',
      // Status: 'To-do',
      // Priority: 'Low',
      Due_Date: '26-May-2020',
    },
    {
      id: '3',
      Task: 'Handle Door Specs',
      // Assigned_To: 'Roman',
      // Assignee: 'Romona',
      // Status: 'To-do',
      // Priority: 'Low',
      Due_Date: '27-May-2020',
    },
    {
      id: '4',
      Task: 'morbi',
      // Assigned_To: 'Gawen',
      // Assignee: 'Kai',
      // Status: 'Done',
      // Priority: 'High',
      Due_Date: '23-Aug-2020',
    },
    {
      id: '5',
      Task: 'proin',
      // Assigned_To: 'Bondon',
      // Assignee: 'Antoinette',
      // Status: 'In Progress',
      // Priority: 'Medium',
      Due_Date: '05-Jan-2021',
    },
  ];
  let columnsFromBackend = {
    [uuidv4()]: {
      title: 'To-do',
      items: data,
    },
    [uuidv4()]: {
      title: 'In Progress',
      items: [],
    },
    [uuidv4()]: {
      title: 'Done',
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  console.log(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result)=> onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <span>{column.title}</span>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                        {item.Task}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          );
        })
        }
      </DragDropContext>
    </div>
  );
}

export default App;
