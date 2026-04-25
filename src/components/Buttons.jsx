export function AddGradeButtons({
  courses,
  gradesHist,
  setGradesHist,
  setWeightHist,
  courseIndex,
  grades,
  weights,
  setCourses,
  deleteRecentGrade,
}) {
  return (
    <>
      <fieldset className="grade-scheme">
        <button
          onClick={() => {
            const next = [...courses[courseIndex].grades];
            next[next.length] = new Array(next.length).fill(null);
            setCourses((prev) => {
              const nextCourses = [...prev];
              nextCourses[courseIndex] = {
                ...nextCourses[courseIndex],
                grades: next,
              };
              return nextCourses;
            });
          }}
        >
          Add new grade
        </button>

        <button
          onClick={deleteRecentGrade}
        >
          Delete recent grade
        </button>
      </fieldset>
    </>
  );
}

export function AltWeightButtons({ altWeights, setAltWeights, addAltWeights, updateCourseAnswer, answer, deleteAltWeights }) {
  return (
    <>
      <fieldset className="alt-weight-scheme" id="alt-weight-scheme-buttons">
        <button onClick={addAltWeights}>Add alt Weights</button>
        <button
          onClick={deleteAltWeights}
        >
          Delete recent alt weight
        </button>
      </fieldset>
    </>
  );
}
