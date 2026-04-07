export function AddGradeButtons({ gradesHist, setGradesHist, setWeightHist }) {
  return (
    <>
      <fieldset className="grade-scheme">
        <button
          onClick={() => {
            setGradesHist((prev) => [...prev, NaN]);
            setWeightHist((prev) => [...prev, NaN]);
          }}
        >
          Add new grade
        </button>

        <button
          onClick={() => {
            setGradesHist((prev) =>
              gradesHist.length > 1 ? prev.slice(0, -1) : prev,
            );
          }}
        >
          Delete recent grade
        </button>
      </fieldset>
    </>
  );
}

export function AltWeightButtons({ altWeights, setAltWeights, addAltWeights }) {
  return (
    <>
      <fieldset className="alt-weight-scheme" id="alt-weight-scheme-buttons">
        <button onClick={addAltWeights}>Add alt Weights</button>
        <button
          onClick={() => {
            setAltWeights((prev) =>
              altWeights.length > 1 ? prev.slice(0, -1) : prev,
            );
          }}
        >
          Delete recent alt weight
        </button>
      </fieldset>
    </>
  );
}
