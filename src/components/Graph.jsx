import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ labels, grades }) {
  const preData = grades.map((grade) => ({
    grade: grade,
  }));
  const preData2 = labels.map((label) => ({
    name: label,
  }));
  // safety access property ?.
  const data = preData.map((obj, i) => ({
    grade: obj.grade ?? 0,
    name: preData2[i]?.name ?? "grade " + i,
  })); // merge two arrays of objects by index
  return (
    <LineChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
      <XAxis dataKey="name" stroke="#333" />
      <YAxis stroke="#333" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="grade"
        stroke="#2563eb"
        dot={{ fill: "#2563eb" }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
