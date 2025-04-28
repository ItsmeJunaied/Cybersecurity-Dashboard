"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, RefreshCw, Shield, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecentThreatsTable } from "@/components/recent-threats-table"
import { ThreatActivityChart } from "@/components/threat-activity-chart"
import { VulnerabilityScoreChart } from "@/components/vulnerability-score-chart"
import { Badge } from "@/components/ui/badge"

export default function ThreatsPage() {
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {

    if (localStorage.getItem("recentThreatsData")) {
      setIsDataInitialized(true)
    }
  }, [])

  if (!isDataInitialized) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Threat Management</h1>
        <Button className="bg-[#41644A] hover:bg-[#41644A]/90">
          <Shield className="mr-2 h-4 w-4" />
          Run Security Scan
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-[#41644A]">
          <CardHeader className="pb-3 bg-[#41644A]/5">
            <CardTitle>Active Threats</CardTitle>
            <CardDescription>Currently active security threats</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#41644A]">12</div>
              <div className="mt-2 flex justify-center gap-2">
                <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                  3 critical
                </Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  5 high
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                  4 medium
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
          <CardHeader className="pb-3 bg-green-50">
            <CardTitle>Mitigated Today</CardTitle>
            <CardDescription>Threats mitigated in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-500">8</div>
              <div className="mt-2 flex justify-center gap-2">
                <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                  2 critical
                </Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  3 high
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                  3 medium
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-amber-500">
          <CardHeader className="pb-3 bg-amber-50">
            <CardTitle>Average Response</CardTitle>
            <CardDescription>Average time to mitigate threats</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500">18m</div>
              <p className="mt-2 text-sm text-green-600 font-medium flex items-center justify-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                5m faster than last week
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search threats..." className="max-w-sm" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="mitigated">Mitigated</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-[#41644A]/10 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            All Threats
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Active
          </TabsTrigger>
          <TabsTrigger value="mitigated" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Mitigated
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <RecentThreatsTable />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <RecentThreatsTable />
        </TabsContent>
        <TabsContent value="mitigated" className="space-y-4">
          <RecentThreatsTable />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Threat Activity</CardTitle>
                <CardDescription>Hourly threat detection rate</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ThreatActivityChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
                <CardDescription>Breakdown of threats by category</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <VulnerabilityScoreChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
