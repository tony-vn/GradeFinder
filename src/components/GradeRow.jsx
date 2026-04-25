import React from "react";
import EditableLabel from "./EditableLabel";

export default function GradeRow({
  index,
  label,
  setLabels,
  gradeValue,
  weightValue,
  altWeightValue,
  onGradeChange,
  onWeightChange,
  onAltWeightChange,
  altWeights,
  answer,
  updateCourseLabelAtIndex,
  courseIndex,
}) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <EditableLabel
              value={label || `Grade ${index + 1}`}
              placeholder="Enter Assessment Name Here"
              onChangeValue={(newValue) =>
                updateCourseLabelAtIndex(courseIndex, index, newValue)
              }
            />
          </td>

          <td>
            <input
              type="number"
              min="0"
              max="100"
              value={
                gradeValue == null || Number.isNaN(gradeValue) ? "" : gradeValue
              }
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === "") {
                  onGradeChange(courseIndex, index, null);
                  return;
                }

                const value = Math.max(0, Math.min(100, Number(raw)));
                onGradeChange(courseIndex, index, value);
              }}
            />
          </td>

          <td>
            <label>Weight {index + 1} (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={
                weightValue == null || Number.isNaN(weightValue)
                  ? ""
                  : weightValue
              }
              onChange={(e) => {
                const value = Math.max(
                  0,
                  Math.min(100, Number(e.target.value)),
                );
                onWeightChange(courseIndex, index, value);
              }}
            />
          </td>
          {/* ! */}
          {answer === true &&
            altWeights.map((altWeight, j) => (
              <td>
                <label>Alt Weight {j + 1} (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    Number.isNaN(altWeights[j]?.[index])
                      ? ""
                      : altWeights[j]?.[index]
                  }
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(100, Number(e.target.value)),
                    );
                    onAltWeightChange(index, j, value);
                  }}
                />
              </td>
            ))}
          {/* {answer === true &&
            altWeights[index]?.map((altWeight, j) => (
              <td key={j}>
                <label>Alt Weight {j + 1} (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    Number.isNaN(altWeights[index]?.[j])
                      ? ""
                      : altWeights[index][j]
                  }
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(100, Number(e.target.value)),
                    );
                    onAltWeightChange(index, j, value);
                  }}
                />
              </td>
            ))} */}
        </tr>
      </tbody>
    </table>
  );
}
