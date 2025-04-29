"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, Server, CheckCircle, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { SecurityOverviewChart } from "@/components/security-overview-chart"
import { ThreatActivityChart } from "@/components/threat-activity-chart"
import { RecentThreatsTable } from "@/components/recent-threats-table"
import { VulnerabilityScoreChart } from "@/components/vulnerability-score-chart"
import { SystemStatusList } from "@/components/system-status-list"
import { initializeData } from "@/lib/data-utils"

export default function DashboardPage() {
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {

    initializeData()
    setIsDataInitialized(true)
  }, [])

  if (!isDataInitialized) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-3 w-3" />
            <span>System Secure</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#41644A] shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Threat Level</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#41644A]">Medium</CardTitle>
              <div className="rounded-full bg-[#41644A]/10 p-2">
                <Shield className="h-5 w-5 text-[#41644A]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
              <span>12% decrease from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Active Threats</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-amber-600">12</CardTitle>
              <div className="rounded-full bg-amber-100 p-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-red-500" />
              <span>3 new threats detected</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Protected Assets</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-blue-600">128</CardTitle>
              <div className="rounded-full bg-blue-100 p-2">
                <Server className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span>5 new assets added</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Vulnerability Score</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-purple-600">72/100</CardTitle>
              <div className="rounded-full bg-purple-100 p-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-purple-500 text-xs font-bold text-purple-500">
                  B
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span>8 points improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#41644A]/10 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          {/* <TabsTrigger value="threats" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Threats
          </TabsTrigger>
          <TabsTrigger
            value="vulnerabilities"
            className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white"
          >
            Vulnerabilities
          </TabsTrigger> */}
          <TabsTrigger value="systems" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Systems
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 shadow-md">
              <CardHeader className="bg-[#41644A]/5 border-b">
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Security metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <SecurityOverviewChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 shadow-md">
              <CardHeader className="bg-[#41644A]/5 border-b">
                <CardTitle>Threat Activity</CardTitle>
                <CardDescription>Hourly threat detection rate</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <ThreatActivityChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 shadow-md">
              <CardHeader className="bg-[#41644A]/5 border-b">
                <CardTitle>Recent Threats</CardTitle>
                <CardDescription>Latest security incidents detected</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <RecentThreatsTable />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 shadow-md">
              <CardHeader className="bg-[#41644A]/5 border-b">
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of security systems</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <SystemStatusList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
              <CardDescription>Breakdown of threats by category</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <VulnerabilityScoreChart data={[]} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Assessment</CardTitle>
              <CardDescription>System vulnerability scores</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <VulnerabilityScoreChart data={[]} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="systems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Overall system health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemStatusList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
