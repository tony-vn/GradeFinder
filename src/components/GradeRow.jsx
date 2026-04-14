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
}) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <EditableLabel
              value={label || `Grade ${index + 1}`}
              placeholder="Enter Assessment Name Here"
              setLabels={setLabels}
              index={index}
            />
          </td>

          <td>
            <input
              type="number"
              min="0"
              max="100"
              value={Number.isNaN(gradeValue) ? "" : gradeValue}
              onChange={(e) => {
                const value = Math.max(
                  0,
                  Math.min(100, Number(e.target.value)),
                );
                onGradeChange(index, value);
              }}
            />
          </td>

          <td>
            <label>Weight {index + 1} (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={Number.isNaN(weightValue) ? "" : weightValue}
              onChange={(e) => {
                const value = Math.max(
                  1,
                  Math.min(100, Number(e.target.value)),
                );
                onWeightChange(index, value);
              }}
            />
          </td>
          {answer === true &&
            altWeights.map((altWeight, j) => (
              <td>
                <label>Alt Weight {j + 1} (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={Number.isNaN(altWeights[index]?.[j]) ? "" : altWeights[index]?.[j]}
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
