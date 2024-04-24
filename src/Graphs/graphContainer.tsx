
// import Draggable from 'react-draggable';
// import React, { useState } from 'react';
// import * as d3 from 'd3';
// import './graph.css';
 
// interface Graph {
//   id: number;
//   type: string;
//   position: { x: number; y: number };
// }
 
// function GraphContainer() {
//   const [graphs, setGraphs] = useState<Graph[]>([]);
 
//   const handleAddGraph = (graphType: string) => {
//     const newGraph: Graph = { id: Date.now(), type: graphType, position: { x: 0, y: 0 } };
//     setGraphs([...graphs, newGraph]);
//   };
 
//   const handleGraphDrag = (id: number, deltaX: number, deltaY: number) => {
//     const newGraphs = graphs.map(graph => {
// if (graph.id === id) {
//         return {
//           ...graph,
//           position: {
//             x: graph.position.x + deltaX,
//             y: graph.position.y + deltaY
//           }
//         };
//       }
//       return graph;
//     });
//     setGraphs(newGraphs);
//   };
 
//   return (
//     <div className="graph-container">
//       <div className="left-section">
//         {/* Render graphs in the left section */}
//         {graphs.map(graph => (
//           <Draggable
// key={graph.id}
//             defaultPosition={{ x: graph.position.x, y: graph.position.y }}
// onStop={(e, data) => handleGraphDrag(graph.id, data.deltaX, data.deltaY)}
//           >
//             <div className="graph">
//               {/* Render D3.js graph based on graph type */}
//               {graph.type === 'bar' && <BarChart />}
//               {graph.type === 'pie' && <PieChart />}
//             </div>
//           </Draggable>
//         ))}
//       </div>
//       <div className="right-section">
//         <h2>Graph Widgets</h2>
//         {/* Add graph widgets */}
//         <button onClick={() => handleAddGraph('bar')}>Bar Chart</button>
//         <button onClick={() => handleAddGraph('pie')}>Pie Chart</button>
//         {/* Add more buttons for other graph types */}
//       </div>
//     </div>
//   );
// }
 
// const BarChart: React.FC = () => {
//   const data = [30, 70, 150, 225, 50, 80, 120];
 
//   const svgWidth = 300;
//   const svgHeight = 200;
 
//   const xScale = d3.scaleBand()
//     .domain(data.map((_, index)=>index.toString()))
//     .range([0, svgWidth])
//     .paddingInner(0.1);
 
//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data) as number])
//     .range([svgHeight, 0]);
 
//   return (
//     <svg width={svgWidth} height={svgHeight}>
//       {data.map((value, index) => (
//         <rect
//           key={index}
//           x={xScale(index.toString()) as number}
//           y={yScale(value)}
//           width={xScale.bandwidth()}
//           height={svgHeight - yScale(value)}
//           fill="blue"
//         />
//       ))}
//     </svg>
//   );
// };
 
// const PieChart: React.FC = () => {
//   const data = [30, 70, 150, 225, 50];
 
//   const svgWidth = 200;
//   const svgHeight = 200;
//   const radius = svgWidth / 2;
 
//   const color = d3.scaleOrdinal(d3.schemeCategory10);
//   const pie = d3.pie<any>().value((d: number) => d);
 
//   const arc = d3.arc<any>()
//     .innerRadius(0)
//     .outerRadius(radius);
 
//   const pieData = pie(data);
 
//   return (
//     <svg width={svgWidth} height={svgHeight}>
//       <g transform={`translate(${radius},${radius})`}>
//         {pieData.map((slice, index) => (
//           <path
//             key={index}
//             d={arc(slice) as string}
//             fill={color(index.toString())}
//           />
//         ))}
//       </g>
//     </svg>
//   );
// };
 
// export default GraphContainer;

// import React, { useState } from 'react';
// import * as d3 from 'd3';
// import './graph.css';

// interface Graph {
//   id: number;
//   type: string;
//   position: { x: number; y: number };
// }

// function GraphContainer() {
//   const [graphs, setGraphs] = useState<Graph[]>([]);
//   const [draggingGraph, setDraggingGraph] = useState<string | null>(null);

//   const handleDragStart = (graphType: string) => {
//     setDraggingGraph(graphType);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const xPos = e.clientX - e.currentTarget.getBoundingClientRect().left;
//     const yPos = e.clientY - e.currentTarget.getBoundingClientRect().top;
//     if (draggingGraph) {
//       const newGraph: Graph = {
//         id: Date.now(),
//         type: draggingGraph,
//         position: { x: xPos, y: yPos }
//       };
//       setGraphs([...graphs, newGraph]);
//       setDraggingGraph(null);
//     }
//   };

//   return (
//     <div className="graph-container" onDragOver={handleDragOver} onDrop={handleDrop}>
//       <div className="left-section">
//         {/* Render graphs in the left section */}
//         {graphs.map(graph => (
//           <div key={graph.id} className="graph" style={{ top: graph.position.y, left: graph.position.x }}>
//             {/* Render D3.js graph based on graph type */}
//             {graph.type === 'bar' && <BarChart />}
//             {graph.type === 'pie' && <PieChart />}
//           </div>
//         ))}
//       </div>
//       <div className="right-section">
//         <h2>Graph Widgets</h2>
//         {/* Add graph widgets */}
//         <div draggable onDragStart={() => handleDragStart('bar')} className="graph-widget">
//           <p>Bar Chart</p>
//         </div>
//         <div draggable onDragStart={() => handleDragStart('pie')} className="graph-widget">
//           <p>Pie Chart</p>
//         </div>
//         {/* Add more draggable graph widgets for other graph types */}
//       </div>
//     </div>
//   );
// }

// const BarChart: React.FC = () => {
//   const data = [30, 70, 150, 225, 50, 80, 120];

//   const svgWidth = 300;
//   const svgHeight = 200;

//   const xScale = d3.scaleBand()
//     .domain(data.map((_, index) => index.toString()))
//     .range([0, svgWidth])
//     .paddingInner(0.1);

//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data) as number])
//     .range([svgHeight, 0]);

//   return (
//     <svg width={svgWidth} height={svgHeight}>
//       {data.map((value, index) => (
//         <rect
//           key={index}
//           x={xScale(index.toString()) as number}
//           y={yScale(value)}
//           width={xScale.bandwidth()}
//           height={svgHeight - yScale(value)}
//           fill="blue"
//         />
//       ))}
//     </svg>
//   );
// };

// const PieChart: React.FC = () => {
//   const data = [30, 70, 150, 225, 50];

//   const svgWidth = 200;
//   const svgHeight = 200;
//   const radius = svgWidth / 2;

//   const color = d3.scaleOrdinal(d3.schemeCategory10);
//   const pie = d3.pie<any>().value((d: number) => d);

//   const arc = d3.arc<any>()
//     .innerRadius(0)
//     .outerRadius(radius);

//   const pieData = pie(data);

//   return (
//     <svg width={svgWidth} height={svgHeight}>
//       <g transform={`translate(${radius},${radius})`}>
//         {pieData.map((slice, index) => (
//           <path
//             key={index}
//             d={arc(slice) as string}
//             fill={color(index.toString())}
//           />
//         ))}
//       </g>
//     </svg>
//   );
// };

// export default GraphContainer;


import React, { useState } from 'react';
import * as d3 from 'd3';
import GridLayout from 'react-grid-layout'; // Import GridLayout component
import './graph.css';

interface Graph {
  id: string;
  type: string;
}

function GraphContainer() {
  const [graphs, setGraphs] = useState<Graph[]>([]);

  const handleAddGraph = (graphType: string) => {
    const newGraph: Graph = { id: graphType + Date.now(), type: graphType };
    setGraphs([...graphs, newGraph]);
  };

  const handleRemoveGraph = (id: string) => {
    const updatedGraphs = graphs.filter(graph => graph.id !== id);
    setGraphs(updatedGraphs);
  };

  return (
    <div className="graph-container">
      <div className="left-section">
        {/* Render graphs in the left section */}
        <GridLayout className="layout" cols={4} rowHeight={100} width={800}>
          {graphs.map(graph => (
            <div key={graph.id}>
              {/* Render D3.js graph based on graph type */}
              {graph.type === 'bar' && <BarChart />}
              {graph.type === 'pie' && <PieChart />}
              <button onClick={() => handleRemoveGraph(graph.id)}>Remove</button>
            </div>
          ))}
        </GridLayout>
      </div>
      <div className="right-section">
        <h2>Graph Widgets</h2>
        {/* Add graph widgets */}
        <button onClick={() => handleAddGraph('bar')}>Add Bar Chart</button>
        <button onClick={() => handleAddGraph('pie')}>Add Pie Chart</button>
        {/* Add more buttons for other graph types */}
      </div>
    </div>
  );
}

const BarChart: React.FC = () => {
  const data = [30, 70, 150, 225, 50, 80, 120];

  const svgWidth = 300;
  const svgHeight = 200;

  const xScale = d3.scaleBand()
    .domain(data.map((_, index) => index.toString()))
    .range([0, svgWidth])
    .paddingInner(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data) as number])
    .range([svgHeight, 0]);

  return (
    <svg width={svgWidth} height={svgHeight}>
      {data.map((value, index) => (
        <rect
          key={index}
          x={xScale(index.toString()) as number}
          y={yScale(value)}
          width={xScale.bandwidth()}
          height={svgHeight - yScale(value)}
          fill="blue"
        />
      ))}
    </svg>
  );
};

const PieChart: React.FC = () => {
  const data = [30, 70, 150, 225, 50];

  const svgWidth = 200;
  const svgHeight = 200;
  const radius = svgWidth / 2;

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const pie = d3.pie<any>().value((d: number) => d);

  const arc = d3.arc<any>()
    .innerRadius(0)
    .outerRadius(radius);

  const pieData = pie(data);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${radius},${radius})`}>
        {pieData.map((slice, index) => (
          <path
            key={index}
            d={arc(slice) as string}
            fill={color(index.toString())}
          />
        ))}
      </g>
    </svg>
  );
};

export default GraphContainer;
