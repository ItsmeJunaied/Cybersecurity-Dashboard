"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, ArrowRight, Clock, Filter, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SecurityOverviewChart } from "@/components/security-overview-chart"

export default function ActivityPage() {
  const [isDataInitialized, setIsDataInitialized] = useState(false)
  const [activityLogs, setActivityLogs] = useState<{ id: number; action: string; user: string; ip: string; time: string; status: string; }[]>([])

  useEffect(() => {

    if (localStorage.getItem("securityOverviewData")) {
      setIsDataInitialized(true)


      setActivityLogs([
        {
          id: 1,
          action: "User Login",
          user: "admin@example.com",
          ip: "192.168.1.105",
          time: "10 mins ago",
          status: "success",
        },
        {
          id: 2,
          action: "Password Change",
          user: "john.doe@example.com",
          ip: "10.0.0.15",
          time: "25 mins ago",
          status: "success",
        },
        {
          id: 3,
          action: "Failed Login Attempt",
          user: "jane.smith@example.com",
          ip: "45.33.22.156",
          time: "1 hour ago",
          status: "failed",
        },
        {
          id: 4,
          action: "File Download",
          user: "admin@example.com",
          ip: "192.168.1.105",
          time: "2 hours ago",
          status: "success",
        },
        {
          id: 5,
          action: "Permission Change",
          user: "admin@example.com",
          ip: "192.168.1.105",
          time: "3 hours ago",
          status: "warning",
        },
        {
          id: 6,
          action: "System Update",
          user: "system",
          ip: "localhost",
          time: "4 hours ago",
          status: "success",
        },
        {
          id: 7,
          action: "Database Backup",
          user: "system",
          ip: "localhost",
          time: "5 hours ago",
          status: "success",
        },
        {
          id: 8,
          action: "Failed Login Attempt",
          user: "unknown",
          ip: "103.45.67.89",
          time: "6 hours ago",
          status: "failed",
        },
      ])
    }
  }, [])

  if (!isDataInitialized) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Activity Monitoring</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>Last updated: Just now</span>
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-[#41644A]">
          <CardHeader className="pb-2 bg-[#41644A]/5">
            <CardDescription>Total Activities Today</CardDescription>
            <CardTitle className="text-2xl font-bold text-[#41644A]">248</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="mr-1 h-4 w-4 text-[#41644A]" />
              <span>15% more than yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
          <CardHeader className="pb-2 bg-red-50">
            <CardDescription>Failed Login Attempts</CardDescription>
            <CardTitle className="text-2xl font-bold text-red-600">12</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="mr-1 h-4 w-4 text-red-500" />
              <span>3 from suspicious IPs</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
          <CardHeader className="pb-2 bg-blue-50">
            <CardDescription>System Events</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">56</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="mr-1 h-4 w-4 text-blue-500" />
              <span>2 require attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mt-6">
        <CardHeader className="bg-[#41644A]/5 border-b">
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>Security activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <SecurityOverviewChart />
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Input placeholder="Search activity logs..." className="max-w-sm" />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Logs</CardTitle>
          <CardDescription>Latest system and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
