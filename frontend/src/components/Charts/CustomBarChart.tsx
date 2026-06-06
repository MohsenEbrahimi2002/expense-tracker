import type { ChartDataType } from "../Dashboard/Last30DaysExpenses";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { IncomeChartDataType } from "../Income/IncomeOverview";

type CustomBarChartProps = {
  data: ChartDataType[] | IncomeChartDataType[];
};

function CustomBarChart({ data }: CustomBarChartProps) {
  const getBarColor = (index: number) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: ReadonlyArray<{
      payload: {
        category: string;
        amount: number;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0]?.payload?.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0]?.payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  const getDataKey = () => {
    if (data && data.length > 0) {
      return Object.prototype.hasOwnProperty.call(data[0], "source") ? "source" : "category";
    }
    return "category";
  };
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={getDataKey()}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            activeBar={{
              fill: "green",
              stroke: "yellow",
              strokeWidth: 1,
            }}
            radius={[10, 10, 0, 0]}
          >
            {data.map((_entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
