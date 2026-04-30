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
import "./index.css";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// begin with default values inside course, allow course name to be editable, allow new course to be created, have courseHist and setCourseHist

export default function Main() {
  // an array of course objects; courseIndex determines which course is currently being displayed and edited; useLocalStorage hook is used to persist courses data across sessions
  // every change to course is through setCourses
  const [courses, setCourses] = useLocalStorage("courses", [
    {
      name: "My Course",
      labels: ["Grade 1"],
      grades: [null],
      weights: [100],
      altWeights: [[null]],
      answer: null,
    },
  ]);
  const [courseIndex, setCourseIndex] = React.useState(0);
  // gradesHist initialized with NaN to populate input field, true length for average calculation is determined
  // from getter function that checks for NaN values, which are added when "Add new grade" button is clicked
  // const [gradesHist, setGradesHist] = React.useState([NaN]);
  // const [labels, setLabels] = useLocalStorage("labels", ["Grade 1"]);
  // const [gradesHist, setGradesHist] = useLocalStorage("grades", [null]);
  // const [weightHist, setWeightHist] = useLocalStorage("weights", [100]);
  // const [altWeights, setAltWeights] = useLocalStorage("altWeights", [
  //   new Array(gradesHist.length).fill(null),
  // ]);
  // const [answer, setAnswer] = useLocalStorage("altWeightScheme", null);

  const sum = calculateGrade(
    courses[courseIndex].grades,
    courses[courseIndex].weights,
  );

  const updateCourseName = (index, newName) => {
    setCourses((prev) => {
      // create a shallow copy to avoid direct state mutation
      const next = [...prev];
      // update the course at the specified index with new name while keeping other properties unchanged
      next[index] = { ...next[index], name: newName };
      return next;
    });
  };

  const updateCourseLabelAtIndex = (courseIndex, labelIndex, newValue) => {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newLabels = [...currentCourse.labels];
      newLabels[labelIndex] = newValue;

      next[courseIndex] = {
        ...currentCourse,
        labels: newLabels,
      };

      return next;
    });
  };

  const updateCourseGrades = (courseIndex, gradeIndex, newValue) => {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newGrades = [...currentCourse.grades];
      newGrades[gradeIndex] = newValue;

      next[courseIndex] = {
        ...currentCourse,
        grades: newGrades,
      };

      return next;
    });
  };

  const updateCourseWeights = (courseIndex, weightIndex, newWeight) => {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newWeights = [...currentCourse.weights];
      newWeights[weightIndex] = newWeight;

      next[courseIndex] = {
        ...currentCourse,
        weights: newWeights,
      };

      return next;
    });
  };

  const updateCourseAltWeights = (index, newAltWeights) => {
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], altWeights: newAltWeights };
      return next;
    });
  };

  function updateCourseAnswer(index, newAnswer) {
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], answer: newAnswer };
      return next;
    });
  }

  // function updateGradeArray(index, value) {
  //   // prev is the previous state of gradesHist, which is an array; we create a copy of it called next, update the value at the specified index, and return the new array to update the state
  //   setGradesHist((prev) => {
  //     // const arrays are mutable, but its memory is const, so we create a new array to trigger React's state update mechanism
  //     const next = [...prev];
  //     next[index] = Number(value); // update grade in array
  //     return next;
  //   });
  // }

  function addAltWeights() {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newAltWeights = [
        ...currentCourse.altWeights,
        new Array(currentCourse.grades.length).fill(null),
      ];
      next[courseIndex] = { ...currentCourse, altWeights: newAltWeights };
      return next;
    });
  }

  // const addAltWeights = () => {
  //   setAltWeights((prev) => {
  //     const next = [...prev];
  //     // const row = [...(next[gradesHist.length - 1] || [])];
  //     // const row = [[NaN]];
  //     //row.push(NaN); // add new alt weight input
  //     // const newAltWeightRow = Array.fill(NaN)[gradesHist.length - 1];
  //     next[next.length] = new Array(gradesHist.length).fill(null);
  //     //console.log(next);
  //     return next;
  //   });

  // };
  //console.log(weightHist);

  function deleteRecentGrade() {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newGrades =
        currentCourse.grades.length > 1
          ? currentCourse.grades.slice(0, -1)
          : currentCourse.grades;
      next[courseIndex] = { ...currentCourse, grades: newGrades };
      return next;
    });
  }

  function deleteAltWeights() {
    setCourses((prev) => {
      const next = [...prev];
      const currentCourse = next[courseIndex];
      const newAltWeights =
        currentCourse.altWeights.length > 1
          ? currentCourse.altWeights.slice(0, -1)
          : currentCourse.altWeights;
      next[courseIndex] = { ...currentCourse, altWeights: newAltWeights };
      return next;
    });
  }

  const createDefaultCourse = (courseNumber) => ({
    name: `Course ${courseNumber}`,
    labels: ["Grade 1"],
    grades: [null],
    weights: [100],
    altWeights: [[null]],
    answer: null,
  });

  function addCourse() {
    setCourses((prev) => {
      const newCourse = createDefaultCourse(prev.length + 1);
      const next = [...prev, newCourse];

      setCourseIndex(next.length - 1);

      return next;
    });
  }

  function deleteCourse(indexToDelete) {
    setCourses((prev) => {
      if (prev.length === 1) return prev;

      const next = prev.filter((_, i) => i !== indexToDelete);

      setCourseIndex((currentIndex) => {
        if (currentIndex === indexToDelete) {
          return Math.max(0, indexToDelete - 1);
        }

        if (currentIndex > indexToDelete) {
          return currentIndex - 1;
        }

        return currentIndex;
      });

      return next;
    });
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar
          courses={courses}
          courseIndex={courseIndex}
          setCourseIndex={setCourseIndex}
          addCourse={addCourse}
          deleteCourse={deleteCourse}
        />
        <main>
          <SidebarTrigger />
          <h1>
            <EditableLabel
              value={courses[courseIndex].name}
              placeholder="Enter Course Name Here"
              onChangeValue={(newValue) =>
                updateCourseName(courseIndex, newValue)
              }
            />
          </h1>
          <h2 className="greeting">Enter your grades: </h2>
          {/* {Array.from({ length: 10 }).map(() => (<h1>hello world</h1>))} */}
          {courses[courseIndex].grades.map((n, i) => (
            <GradeRow
              index={i}
              label={courses[courseIndex].labels[i]}
              labels={courses[courseIndex].labels}
              courseIndex={courseIndex}
              updateCourseLabelAtIndex={updateCourseLabelAtIndex}
              gradeValue={courses[courseIndex].grades[i]}
              weightValue={courses[courseIndex].weights[i]}
              altWeightValue={courses[courseIndex].altWeights[i]}
              onGradeChange={updateCourseGrades}
              onWeightChange={updateCourseWeights}
              onAltWeightChange={(index, j, value) => {
                // setAltWeights((prev) => {
                //   // !
                //   const next = [...prev];
                //   next[j] = [...next[j]];
                //   next[j][index] = Number(value);
                //   return next;
                // });
                updateCourseAltWeights(courseIndex, (prev) => {
                  const next = [...prev];
                  const currentCourse = next[courseIndex];
                  const newAltWeights = [...currentCourse.altWeights];
                  newAltWeights[j] = [...newAltWeights[j]];
                  newAltWeights[j][index] = Number(value);
                  next[courseIndex] = {
                    ...currentCourse,
                    altWeights: newAltWeights,
                  };
                  return next;
                });
              }}
              altWeights={courses[courseIndex].altWeights}
              answer={courses[courseIndex].answer}
            ></GradeRow>
          ))}
          <AddGradeButtons
            courses={courses}
            gradesHist={courses[courseIndex].grades}
            // setGradesHist={updateCourseGrades}
            // setWeightHist={updateCourseWeights}
            courseIndex={courseIndex}
            grades={courses[courseIndex].grades}
            weights={courses[courseIndex].weights}
            setCourses={setCourses}
            deleteRecentGrade={deleteRecentGrade}
          />

          <YesNoDropdown
            answer={courses[courseIndex].answer}
            updateCourseAnswer={updateCourseAnswer}
            courseIndex={courseIndex}
          />

          {courses[courseIndex].answer === true && (
            <AltWeightButtons
              gradesHist={courses[courseIndex].grades}
              setGradesHist={updateCourseGrades}
              setWeightHist={updateCourseWeights}
              altWeights={courses[courseIndex].altWeights}
              // setAltWeights={updateCourseAltWeights(courseIndex, (prev) => {
              //   const next = [...prev];
              //   const currentCourse = next[courseIndex];
              //   const newAltWeights = [...currentCourse.altWeights];
              //   newAltWeights[j] = [...newAltWeights[j]];
              //   newAltWeights[j][index] = Number(value);
              //   next[courseIndex] = {
              //     ...currentCourse,
              //     altWeights: newAltWeights,
              //   };
              //   return next;
              // })}
              answer={courses[courseIndex].answer}
              updateCourseAnswer={updateCourseAnswer}
              addAltWeights={addAltWeights}
              deleteAltWeights={deleteAltWeights}
            />
          )}
          <div>
            <label>Current Grade: {sum}</label>
          </div>
          <button
            onClick={() => {
              // open new window with graph
              const graphWindow = window.open(
                "",
                "Graph",
                "width=800,height=600",
              );
              graphWindow.document.write("<h1>Grade Progression Graph</h1>");
              graphWindow.document.write("<div id='graph-root'></div>");
              // render chart in new window
              const graphRoot =
                graphWindow.document.getElementById("graph-root");
              const graphRootReact = ReactDOM.createRoot(graphRoot);
              graphRootReact.render(
                <React.StrictMode>
                  <Chart
                    grades={courses[courseIndex].grades}
                    labels={courses[courseIndex].labels}
                  />
                </React.StrictMode>,
              );
            }}
          >
            Show graph
          </button>
        </main>
      </SidebarProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
