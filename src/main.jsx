import React from "react";
import ReactDOM from "react-dom/client";
// import "crypto";
import EditableLabel from "./components/EditableLabel.jsx";
import Chart from "./components/Graph.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { calculateGrade } from "./utils/gradeCalculations.js";
import GradeRow from "./components/GradeRow.jsx";
import YesNoDropdown from "./components/YesNoDropdown.jsx";
import { AddGradeButtons, AltWeightButtons } from "./components/Buttons.jsx";

export default function Main() {
  // gradesHist initialized with NaN to populate input field, true length for average calculation is determined
  // from getter function that checks for NaN values, which are added when "Add new grade" button is clicked
  // const [gradesHist, setGradesHist] = React.useState([NaN]);
  const [gradesHist, setGradesHist] = useLocalStorage("grades", [null]);
  const [weightHist, setWeightHist] = useLocalStorage("weights", [100]);
  const sum = calculateGrade(gradesHist, weightHist);
  const [labels, setLabels] = useLocalStorage("labels", ["Grade 1"]);
  const [altWeights, setAltWeights] = useLocalStorage("altWeights", [
    new Array(gradesHist.length).fill(null),
  ]);
  const [answer, setAnswer] = useLocalStorage("altWeightScheme", null);

  function updateGradeArray(index, value) {
    // prev is the previous state of gradesHist, which is an array; we create a copy of it called next, update the value at the specified index, and return the new array to update the state
    setGradesHist((prev) => {
      // const arrays are mutable, but its memory is const, so we create a new array to trigger React's state update mechanism
      const next = [...prev];
      next[index] = Number(value); // update grade in array
      return next;
    });
  }

  const addAltWeights = () => {
    setAltWeights((prev) => {
      const next = [...prev];
      // const row = [...(next[gradesHist.length - 1] || [])];
      // const row = [[NaN]];
      //row.push(NaN); // add new alt weight input
      // const newAltWeightRow = Array.fill(NaN)[gradesHist.length - 1];
      next[next.length] = new Array(gradesHist.length).fill(null);
      //console.log(next);
      return next;
    });

    // setAltWeights((prev) => prev.map((row) => [...row, NaN]));

    // setAltWeights((prev) =>
    //   gradesHist.map((_, rowIndex) => {
    //     const existingRow = Array.isArray(prev[rowIndex]) ? prev[rowIndex] : [];
    //     return [...existingRow, ""];
    //   }),
    // );
  };
  //console.log(weightHist);
  console.log(altWeights);
  return (
    <div>
      <h1 className="greeting">Enter your grades: </h1>
      {/* {Array.from({ length: 10 }).map(() => (
        <h1>hello world</h1>
      ))} */}
      {gradesHist.map((n, i) => (
        <GradeRow
          index={i}
          label={labels[i]}
          labels={labels}
          setLabels={setLabels}
          gradeValue={gradesHist[i]}
          weightValue={weightHist[i]}
          altWeightValue={altWeights[i]}
          onGradeChange={updateGradeArray}
          onWeightChange={(index, value) => {
            setWeightHist((prev) => {
              const next = [...prev];
              next[index] = Number(value); // update grade in array
              return next;
            });
          }}
          onAltWeightChange={(index, j, value) => {
            setAltWeights((prev) => {
              const next = [...prev];
              next[j] = [...next[j]];
              next[j][index] = Number(value);
              return next;
            });
          }}
          altWeights={altWeights}
          answer={answer}
        ></GradeRow>
      ))}
      <AddGradeButtons
        gradesHist={gradesHist}
        setGradesHist={setGradesHist}
        setWeightHist={setWeightHist}
      />

      <YesNoDropdown answer={answer} setAnswer={setAnswer} />

      {answer === true && (
        <AltWeightButtons
          gradesHist={gradesHist}
          setGradesHist={setGradesHist}
          setWeightHist={setWeightHist}
          altWeights={altWeights}
          setAltWeights={setAltWeights}
          answer={answer}
          setAnswer={setAnswer}
          addAltWeights={addAltWeights}
        />
      )}
      <div>
        <label>Current Grade: {sum}</label>
      </div>
      <button
        onClick={() => {
          // open new window with graph
          const graphWindow = window.open("", "Graph", "width=800,height=600");
          graphWindow.document.write("<h1>Grade Progression Graph</h1>");
          graphWindow.document.write("<div id='graph-root'></div>");
          // render chart in new window
          const graphRoot = graphWindow.document.getElementById("graph-root");
          const graphRootReact = ReactDOM.createRoot(graphRoot);
          graphRootReact.render(
            <React.StrictMode>
              <Chart grades={gradesHist} labels={labels} />
            </React.StrictMode>,
          );
        }}
      >
        Show graph
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
