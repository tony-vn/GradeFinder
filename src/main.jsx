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
  const [gradesHist, setGradesHist] = useLocalStorage("grades", [NaN]);
  const [weightHist, setWeightHist] = useLocalStorage("weights", [100]);
  const sum = calculateGrade(gradesHist, weightHist);
  const [labels, setLabels] = useLocalStorage("labels", ["Grade 1"]);
  const [altWeights, setAltWeights] = useLocalStorage("altWeights", []); // array of objects with id and values properties, where values is an array of td elements with input fields for weights, indexed by i to match corresponding grade input field
  const [answer, setAnswer] = useLocalStorage("altWeightScheme", null);

  const [totalGradesHist, setTotalGradesHist] = React.useState([[]]);
  const [totalWeightsHist, setTotalWeightsHist] = React.useState([[[]]]);

  // prev is built into react framework as a known keyword for state variables
  // const arrays are mutable, but its memory is const
  function updateGradeArray(index, value) {
    setGradesHist((prev) => {
      const next = [...prev];
      next[index] = Number(value); // update grade in array
      return next;
    });
  }

  // event handler for "Add alt Weights" button, adds new column of weight inputs with same length as gradesHist, stored in altWeights state variable as array of objects with id and values properties, where values is an array of td elements with input fields for weights, indexed by i to match corresponding grade input field
  const addAltWeights = () => {
    setAltWeights((prev) => [
      ...prev,
      {
        id: window.crypto.randomUUID(),
        values: gradesHist.map(() => NaN),
      },
    ]);
  };

  return (
    <div>
      <h1 className="greeting">Enter your grades: </h1>
      {gradesHist.map((n, i) => (
        <GradeRow
          index={i}
          label={labels[i]}
          labels={labels}
          setLabels={setLabels}
          gradeValue={gradesHist[i]}
          weightValue={weightHist[i]}
          onGradeChange={updateGradeArray}
          onWeightChange={(index, value) => {
            setWeightHist((prev) => {
              const next = [...prev];
              next[index] = Number(value); // update grade in array
              return next;
            });
          }}
          altWeights={altWeights}
          setaltWeights={setAltWeights}
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
