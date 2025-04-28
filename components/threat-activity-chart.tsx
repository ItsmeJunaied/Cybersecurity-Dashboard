"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function ThreatActivityChart() {
  const [data, setData] = useState([])

  useEffect(() => {

    const storedData = localStorage.getItem("threatActivityData")
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  return (
    <ChartContainer
      config={{
        hour: {
          label: "Hour",
        },
        threats: {
          label: "Threats",
          color: "hsl(142, 25%, 33%)",
        },
      }}
      className="aspect-[2/1] w-full h-auto min-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis dataKey="hour" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}:00`} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="threats"
            radius={[4, 4, 0, 0]}
            style={{
              fill: "#41644A",
              opacity: 0.8,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
