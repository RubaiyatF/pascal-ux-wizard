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

interface MetricsDataPoint {
  date: string;
  activeUsers?: number;
  activation?: number;
  retention?: number;
  featureAdoption?: number;
}

interface TrendsAreaChartProps {
  selectedMetrics: string[];
  metricsData?: MetricsDataPoint[];
}

export function TrendsAreaChart({ selectedMetrics, metricsData = [] }: TrendsAreaChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = metricsData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date() // Use current date
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
            {selectedMetrics.includes("featureAdoption") && (
              <Area
                dataKey="featureAdoption"
                type="monotone"
                fill="url(#fillFeatureAdoption)"
                stroke="var(--color-featureAdoption)"
                strokeWidth={2}
                stackId="a"
              />
            )}
            {selectedMetrics.includes("retention") && (
              <Area
                dataKey="retention"
                type="monotone"
                fill="url(#fillRetention)"
                stroke="var(--color-retention)"
                strokeWidth={2}
                stackId="a"
              />
            )}
            {selectedMetrics.includes("activation") && (
              <Area
                dataKey="activation"
                type="monotone"
                fill="url(#fillActivation)"
                stroke="var(--color-activation)"
                strokeWidth={2}
                stackId="a"
              />
            )}
            {selectedMetrics.includes("activeUsers") && (
              <Area
                dataKey="activeUsers"
                type="monotone"
                fill="url(#fillActiveUsers)"
                stroke="var(--color-activeUsers)"
                strokeWidth={2}
                stackId="a"
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
