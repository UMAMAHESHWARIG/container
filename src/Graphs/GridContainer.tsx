
// import React from 'react';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import Widget from './widget';

// import LineChart from "./line";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// export default function Content(graph:string) {
//   const layouts = {
//     lg: [
//       { i: 'a', x: 0, y: 0, w: 1, h: 2 },
//       { i: 'b', x: 1, y: 0, w: 3, h: 2 },
//       { i: 'c', x: 4, y: 0, w: 1, h: 2 },
//       { i: 'd', x: 0, y: 2, w: 2, h: 2 },
//     ],
//   };
//   return (
//     <ResponsiveGridLayout
//       className="layout"
//       layouts={layouts}
//       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//       rowHeight={60}
//     >
//       <div key="a">
//         <Widget id="a" backgroundColor="#867ae9" component={LineChart}  />
//       </div>
//       <div key="b">
//         <Widget id="b" backgroundColor="#fff5ab" component={LineChart} />
//       </div>
//       <div key="c">
//         <Widget id="c" backgroundColor="#ffcead" component={LineChart} />
//       </div>
//       <div key="d">
//         <Widget id="d" backgroundColor="#c449c2"   component={LineChart}/>
//       </div>
//     </ResponsiveGridLayout>
//   );
// }

// export interface Iwidget{
//     backgroundColor:string;
//     id:string;
// }

// // function Widget({ id , backgroundColor }:Iwidget) {
// //   return (
// //     <div style={{ width: '100%', height: '100%', backgroundColor }}>{id}</div>
// //   );
// // }

import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Widget from './widget';
import LineChart from "./line";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Content: React.FC<{ graphs: string[] }> = ({ graphs }) => {
  const layouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
      { i: 'd', x: 0, y: 2, w: 2, h: 2 },
    ],
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={60}
    >
      {graphs.map((graphType, index) => (
        <div key={graphType}>
          <Widget id={graphType} backgroundColor={getColor(index)} component={getComponent(graphType)} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

function getColor(index: number): string {
  const colors = ["#867ae9", "#fff5ab", "#ffcead", "#c449c2"];
  return colors[index % colors.length];
}

function getComponent(graphType: string): React.ComponentType {
  switch (graphType) {
    case "line":
      return LineChart;
    // Add cases for other graph types as needed
    default:
      return () => null; // Return a dummy component if no match
  }
}

export default Content;
