import { memo, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Platform, StatHistoryItem } from "@/types";
import { formatCompactNumber } from "@/lib/formatters";

interface FollowerChartProps {
  data: StatHistoryItem[];
  platform: Platform;
}

const colors: Record<Platform, { stroke: string; fillStart: string; fillEnd: string }> = {
  instagram: {
    stroke: "#ee2a7b",
    fillStart: "rgba(238, 42, 123, 0.3)",
    fillEnd: "rgba(98, 40, 215, 0)",
  },
  youtube: {
    stroke: "#ff0000",
    fillStart: "rgba(255, 0, 0, 0.3)",
    fillEnd: "rgba(255, 0, 0, 0)",
  },
  tiktok: {
    stroke: "#00f2fe",
    fillStart: "rgba(0, 242, 254, 0.3)",
    fillEnd: "rgba(254, 9, 121, 0)",
  },
};

export const FollowerChart = memo(function FollowerChart({
  data,
  platform,
}: FollowerChartProps) {
  const chartColor = useMemo(() => colors[platform], [platform]);

  // Format month labels (e.g. "2023-07" -> "Jul 23")
  const formattedData = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return data.map((item) => {
      const parts = item.month.split("-");
      if (parts.length === 2) {
        const year = parts[0].substring(2);
        const monthIdx = parseInt(parts[1], 10) - 1;
        const monthName = monthNames[monthIdx] || parts[1];
        return {
          ...item,
          displayName: `${monthName} '${year}`,
        };
      }
      return {
        ...item,
        displayName: item.month,
      };
    });
  }, [data]);

  return (
    <div className="follower-chart-wrapper">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`colorFollowers-${platform}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor.stroke} stopOpacity={0.4} />
              <stop offset="95%" stopColor={chartColor.stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="displayName"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCompactNumber(val)}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(17, 24, 39, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.1)",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              fontFamily: "Inter, sans-serif",
            }}
            itemStyle={{ color: "#f1f5f9", fontSize: "13px" }}
            labelStyle={{ color: "#94a3b8", fontSize: "11px", fontWeight: 600, marginBottom: "4px" }}
            formatter={(value: any) => [formatCompactNumber(Number(value)), "Followers"]}
          />
          <Area
            type="monotone"
            dataKey="followers"
            stroke={chartColor.stroke}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorFollowers-${platform})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
