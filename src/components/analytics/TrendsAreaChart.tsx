"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", activeUsers: 780, activation: 62, retention: 78, featureAdoption: 58 },
  { date: "2024-04-05", activeUsers: 795, activation: 61, retention: 77, featureAdoption: 59 },
  { date: "2024-04-10", activeUsers: 788, activation: 63, retention: 79, featureAdoption: 57 },
  { date: "2024-04-15", activeUsers: 810, activation: 64, retention: 78, featureAdoption: 60 },
  { date: "2024-04-20", activeUsers: 805, activation: 62, retention: 80, featureAdoption: 61 },
  { date: "2024-04-25", activeUsers: 825, activation: 65, retention: 81, featureAdoption: 59 },
  { date: "2024-04-30", activeUsers: 815, activation: 63, retention: 79, featureAdoption: 62 },
  { date: "2024-05-05", activeUsers: 840, activation: 66, retention: 82, featureAdoption: 61 },
  { date: "2024-05-10", activeUsers: 835, activation: 64, retention: 80, featureAdoption: 63 },
  { date: "2024-05-15", activeUsers: 855, activation: 67, retention: 83, featureAdoption: 62 },
  { date: "2024-05-20", activeUsers: 845, activation: 65, retention: 81, featureAdoption: 64 },
  { date: "2024-05-25", activeUsers: 870, activation: 68, retention: 84, featureAdoption: 63 },
  { date: "2024-05-30", activeUsers: 860, activation: 66, retention: 82, featureAdoption: 65 },
  { date: "2024-06-04", activeUsers: 880, activation: 69, retention: 85, featureAdoption: 64 },
  { date: "2024-06-09", activeUsers: 875, activation: 67, retention: 83, featureAdoption: 66 },
  { date: "2024-06-14", activeUsers: 895, activation: 70, retention: 86, featureAdoption: 65 },
  { date: "2024-06-19", activeUsers: 885, activation: 68, retention: 84, featureAdoption: 67 },
  { date: "2024-06-24", activeUsers: 900, activation: 71, retention: 85, featureAdoption: 66 },
  { date: "2024-06-30", activeUsers: 890, activation: 68, retention: 82, featureAdoption: 65 },
]

const chartConfig = {
  activeUsers: {
    label: "Active Users",
    color: "oklch(var(--chart-1))",
  },
  activation: {
    label: "Activation %",
    color: "oklch(var(--chart-2))",
  },
  retention: {
    label: "Retention %",
    color: "oklch(var(--chart-3))",
  },
  featureAdoption: {
    label: "Feature Adoption %",
    color: "oklch(var(--chart-4))",
  },
} satisfies ChartConfig

export function TrendsAreaChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Success Metrics Trends</CardTitle>
          <CardDescription>
            Tracking key metrics over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillActiveUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-activeUsers)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-activeUsers)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillActivation" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-activation)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-activation)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRetention" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-retention)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-retention)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFeatureAdoption" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-featureAdoption)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-featureAdoption)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="featureAdoption"
              type="monotone"
              fill="url(#fillFeatureAdoption)"
              stroke="var(--color-featureAdoption)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="retention"
              type="monotone"
              fill="url(#fillRetention)"
              stroke="var(--color-retention)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="activation"
              type="monotone"
              fill="url(#fillActivation)"
              stroke="var(--color-activation)"
              strokeWidth={2}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
