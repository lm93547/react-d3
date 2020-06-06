import React, { createContext } from "react";
import "./App.css";
import { pack, hierarchy, tree } from "d3-hierarchy";


const data = {
  name: "Servers",
  children: [
    {
      name: "amazon",
      children: [{ name: "aws" }, { name: "ahs" }],
    },
    {
      name: "microsoft",
      children: [{ name: "azure" }, { name: "windows server" }],
    },
    {
      name: "Self Hosted",
      children: [{ name: "Custom hardware" }, { name: "Self hosted server" }],
    },
    {
      name: "Self Hosted",
      children: [{ name: "Custom hardware", children: [{name: "VPS Box"}, {name: "Headless PC"}]}, { name: "Self hosted server" }],
    }
  ],
};

const serverHigh = () => hierarchy(data).sum(() => 1);
const createPack = pack().size([500, 480]).padding(20);
const serverPack = createPack(serverHigh()).descendants();

const createTree = tree().size([500, 480]);
const serverTree = createTree(serverHigh());

const prepareData = () => {

  //console.log(serverTree.descendants());
  return serverPack.map((packItem, i) => ({
    packItem,
    treeItem: serverTree.descendants()[i],
  }));
};

const colors = ['#F2B950', '#F29441', '#D9753B', '#D9501E']

const Tooltip = () => {
    console.log("hover")
    return <div className="tooltip-text">Test</div>
}

function App() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="App">
      <svg width="500" height="500">
        {serverTree
          .links()
          .map(({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }) => (
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" style={{opacity: toggle ? 1 : 0, transition: 'opacity 3s'}}  />
          ))}
        {prepareData().map(
          ({
            treeItem: {
              x,
              y,
              data: { name },
              depth
            },
            packItem: { x: cx, y: cy, r },
          }) => (
            <circle
              style={{ transition: "all 5s" }}
              key={name}
              cx={toggle ? x : cx}
              cy={toggle ? y : cy}
              r={toggle ? 10 : r}
              fill="transparent"
                stroke="black"
                fill={colors[depth]}
                onClick={() => setToggle(!toggle)}
            />
          )
        )}
      </svg>
    </div>
  );
}

export default App;
