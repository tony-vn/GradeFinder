import React from "react";
import EditableLabel from "./EditableLabel";

export default function GradeRow({
  index,
  label,
  labels,
  setLabels,
  gradeValue,
  weightValue,
  onGradeChange,
  onWeightChange,
  altWeights,
  setAltWeights,
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

          <td>
            {altWeights.map((col) => (
              <td key={col.id}>
                <label>Alt. Weight</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    Number.isNaN(col.values[index]) ? "" : col.values[index]
                  }
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(100, Number(e.target.value)),
                    );

                    setAltWeights((prev) =>
                      prev.map((item) =>
                        item.id === col.id
                          ? {
                              ...item,
                              values: item.values.map((v, i) =>
                                i === index ? value : v,
                              ),
                            }
                          : item,
                      ),
                    );
                  }}
                />
              </td>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
