import React, { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize, SizeMeProps } from "react-sizeme";
import TopBar from "./topBar";
import Widget from "./widget";
import LineChart from "./line";
import AreaChart from "./area";
import BarChart from "./bar";
import ScatterChart from "./scatter";

interface LayoutItem {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  moved: boolean;
  static: boolean;
}

const originalItems: string[] = ["a", "b", "c", "d"];

const initialLayouts: { lg: LayoutItem[] } = {
  lg: [
    { w: 6, h: 6, x: 0, y: 0, i: "a", moved: false, static: false },
    { w: 3, h: 6, x: 9, y: 0, i: "b", moved: false, static: false },
    { w: 3, h: 6, x: 6, y: 0, i: "c", moved: false, static: false },
    { w: 12, h: 4, x: 0, y: 6, i: "d", moved: false, static: false }
  ]
};

const componentList: { [key: string]: React.ComponentType } = {
  a: LineChart,
  b: AreaChart,
  c: BarChart,
  d: ScatterChart
};

interface ContentProps {
  size: SizeMeProps["size"];
}

const Content: React.FC<ContentProps> = ({ size: { width } }) => {
  const [items, setItems] = useState<string[]>(originalItems);
  const [layouts, setLayouts] = useState(initialLayouts);

  const onLayoutChange = (asd : any, allLayouts: { lg: LayoutItem[] }) => {
    setLayouts(allLayouts);
  };

  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
  };

  const onRemoveItem = (itemId: string) => {
    setItems(items.filter((i) => i !== itemId));
  };

  const onAddItem = (itemId: string) => {
    setItems([...items, itemId]);
  };

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        width={width!}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            <Widget
            backgroundColor=""
              id={key}
              onRemoveItem={onRemoveItem}
              component={componentList[key]}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
};

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);

function getFromLS(key: string) {
  let ls: { [key: string]: unknown } = {};
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8") || "{}");
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key: string, value: unknown) {
  if (window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
