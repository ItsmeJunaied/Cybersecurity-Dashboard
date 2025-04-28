"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function SecurityOverviewChart() {
  const [data, setData] = useState([])

  useEffect(() => {

    const storedData = localStorage.getItem("securityOverviewData")
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  return (
    <ChartContainer
      config={{
        date: {
          label: "Date",
        },
        threats: {
          label: "Threats",
          color: "hsl(142, 25%, 33%)",
        },
        vulnerabilities: {
          label: "Vulnerabilities",
          color: "hsl(25, 95%, 53%)",
        },
        mitigations: {
          label: "Mitigations",
          color: "hsl(48, 96%, 53%)",
        },
      }}
      className="aspect-[2/1] w-full h-auto min-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            minTickGap={30}
          />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="threats"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-threats)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-threats)",
              opacity: 0.7,
            }}
          />
          <Line
            type="monotone"
            dataKey="vulnerabilities"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-vulnerabilities)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-vulnerabilities)",
              opacity: 0.7,
            }}
          />
          <Line
            type="monotone"
            dataKey="mitigations"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-mitigations)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-mitigations)",
              opacity: 0.7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
