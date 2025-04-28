"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Database,
  Filter,
  RefreshCw,
  Search,
  Shield,
  XCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DatabasesPage() {
  interface Database {
    id: number
    name: string
    type: string
    version: string
    size: string
    status: string
    health: string
    backupStatus: string
    lastBackup: string
    location: string
    vulnerabilities: number
  }
  
  const [databases, setDatabases] = useState<Database[]>([])
  interface DbStats {
    total: number
    online: number
    offline: number
    healthy: number
    warning: number
    critical: number
    totalSize: string
    backupSuccess: number
    backupFailed: number
    vulnerabilities: number
  }

  const [dbStats, setDbStats] = useState<DbStats>({
    total: 0,
    online: 0,
    offline: 0,
    healthy: 0,
    warning: 0,
    critical: 0,
    totalSize: "0 TB",
    backupSuccess: 0,
    backupFailed: 0,
    vulnerabilities: 0,
  })
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {
    const generatedDatabases = [
      {
        id: 1,
        name: "Production MySQL",
        type: "MySQL",
        version: "8.0.28",
        size: "1.2 TB",
        status: "Online",
        health: "Healthy",
        backupStatus: "Success",
        lastBackup: "2 hours ago",
        location: "Primary Data Center",
        vulnerabilities: 0,
      },
      {
        id: 2,
        name: "Analytics PostgreSQL",
        type: "PostgreSQL",
        version: "14.2",
        size: "3.5 TB",
        status: "Online",
        health: "Warning",
        backupStatus: "Success",
        lastBackup: "6 hours ago",
        location: "Primary Data Center",
        vulnerabilities: 2,
      },
      {
        id: 3,
        name: "User MongoDB",
        type: "MongoDB",
        version: "5.0.6",
        size: "850 GB",
        status: "Online",
        health: "Healthy",
        backupStatus: "Success",
        lastBackup: "1 day ago",
        location: "Cloud",
        vulnerabilities: 1,
      },
      {
        id: 4,
        name: "Legacy Oracle DB",
        type: "Oracle",
        version: "19c",
        size: "4.2 TB",
        status: "Online",
        health: "Critical",
        backupStatus: "Failed",
        lastBackup: "3 days ago",
        location: "Secondary Data Center",
        vulnerabilities: 5,
      },
      {
        id: 5,
        name: "Redis Cache",
        type: "Redis",
        version: "6.2.6",
        size: "120 GB",
        status: "Online",
        health: "Healthy",
        backupStatus: "Success",
        lastBackup: "12 hours ago",
        location: "Primary Data Center",
        vulnerabilities: 0,
      },
      {
        id: 6,
        name: "Dev SQL Server",
        type: "SQL Server",
        version: "2019",
        size: "750 GB",
        status: "Offline",
        health: "Unknown",
        backupStatus: "N/A",
        lastBackup: "N/A",
        location: "Development",
        vulnerabilities: 3,
      },
      {
        id: 7,
        name: "Elasticsearch",
        type: "Elasticsearch",
        version: "7.17.0",
        size: "2.1 TB",
        status: "Online",
        health: "Warning",
        backupStatus: "Success",
        lastBackup: "1 day ago",
        location: "Cloud",
        vulnerabilities: 2,
      },
    ]


    const stats = {
      total: generatedDatabases.length,
      online: generatedDatabases.filter((db) => db.status === "Online").length,
      offline: generatedDatabases.filter((db) => db.status === "Offline").length,
      healthy: generatedDatabases.filter((db) => db.health === "Healthy").length,
      warning: generatedDatabases.filter((db) => db.health === "Warning").length,
      critical: generatedDatabases.filter((db) => db.health === "Critical").length,
      totalSize: "12.7 TB",
      backupSuccess: generatedDatabases.filter((db) => db.backupStatus === "Success").length,
      backupFailed: generatedDatabases.filter((db) => db.backupStatus === "Failed").length,
      vulnerabilities: generatedDatabases.reduce((sum, db) => sum + db.vulnerabilities, 0),
    }

    setDatabases(generatedDatabases)
    setDbStats(stats)
    setIsDataInitialized(true)
  }, [])

  if (!isDataInitialized) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Online":
        return <Badge className="bg-green-500">Online</Badge>
      case "Offline":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getHealthBadge = (health: any) => {
    switch (health) {
      case "Healthy":
        return <Badge className="bg-green-500">Healthy</Badge>
      case "Warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getBackupBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-green-500">Success</Badge>
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">N/A</Badge>
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "Healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "Critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Database Security</h1>
        <Button className="bg-[#41644A] hover:bg-[#41644A]/90">
          <Shield className="mr-2 h-4 w-4" />
          Scan All Databases
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-[#41644A]">
          <CardHeader className="pb-2 bg-[#41644A]/5">
            <CardDescription>Total Databases</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#41644A]">{dbStats.total}</CardTitle>
              <div className="rounded-full bg-[#41644A]/10 p-2">
                <Database className="h-5 w-5 text-[#41644A]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span>
                {dbStats.online} online, {dbStats.offline} offline
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
          <CardHeader className="pb-2 bg-green-50">
            <CardDescription>Healthy Databases</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-green-600">{dbStats.healthy}</CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{Math.round((dbStats.healthy / dbStats.total) * 100)}% of total databases</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-yellow-500">
          <CardHeader className="pb-2 bg-yellow-50">
            <CardDescription>Warning Status</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-yellow-600">{dbStats.warning}</CardTitle>
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Requires attention</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
          <CardHeader className="pb-2 bg-red-50">
            <CardDescription>Critical Issues</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-red-600">{dbStats.critical}</CardTitle>
              <div className="rounded-full bg-red-100 p-2">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Immediate action required</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>Database Health Overview</CardTitle>
            <CardDescription>Current health status of all databases</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Healthy</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{dbStats.healthy} databases</span>
                </div>
                <Progress value={(dbStats.healthy / dbStats.total) * 100} className="bg-green-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium">Warning</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{dbStats.warning} databases</span>
                </div>
                <Progress value={(dbStats.warning / dbStats.total) * 100} className="bg-yellow-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">Critical</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{dbStats.critical} databases</span>
                </div>
                <Progress value={(dbStats.critical / dbStats.total) * 100} className="bg-red-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm font-medium">Unknown</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {dbStats.total - dbStats.healthy - dbStats.warning - dbStats.critical} databases
                  </span>
                </div>
                <Progress
                  value={((dbStats.total - dbStats.healthy - dbStats.warning - dbStats.critical) / dbStats.total) * 100}
                  className="bg-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>Backup Status</CardTitle>
            <CardDescription>Database backup status and statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-[180px] items-center justify-center">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-[#41644A] stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 * (1 - dbStats.backupSuccess / (dbStats.backupSuccess + dbStats.backupFailed))
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">
                    {Math.round((dbStats.backupSuccess / (dbStats.backupSuccess + dbStats.backupFailed)) * 100)}%
                  </span>
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-green-50 p-2">
                <div className="text-xl font-bold text-green-600">{dbStats.backupSuccess}</div>
                <div className="text-xs text-muted-foreground">Successful Backups</div>
              </div>
              <div className="rounded-lg bg-red-50 p-2">
                <div className="text-xl font-bold text-red-600">{dbStats.backupFailed}</div>
                <div className="text-xs text-muted-foreground">Failed Backups</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search databases..." className="max-w-sm" />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
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
            All Databases
          </TabsTrigger>
          <TabsTrigger value="healthy" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Healthy
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Issues
          </TabsTrigger>
          <TabsTrigger value="backups" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Backups
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Backup Status</TableHead>
                      <TableHead>Last Backup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow key={db.id}>
                        <TableCell className="font-medium">{db.name}</TableCell>
                        <TableCell>{db.type}</TableCell>
                        <TableCell>{db.version}</TableCell>
                        <TableCell>{db.size}</TableCell>
                        <TableCell>{getStatusBadge(db.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getHealthIcon(db.health)}
                            <span>{db.health}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getBackupBadge(db.backupStatus)}</TableCell>
                        <TableCell>{db.lastBackup}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="healthy" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Backup Status</TableHead>
                      <TableHead>Last Backup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases
                      .filter((db) => db.health === "Healthy")
                      .map((db) => (
                        <TableRow key={db.id}>
                          <TableCell className="font-medium">{db.name}</TableCell>
                          <TableCell>{db.type}</TableCell>
                          <TableCell>{db.version}</TableCell>
                          <TableCell>{db.size}</TableCell>
                          <TableCell>{getStatusBadge(db.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getHealthIcon(db.health)}
                              <span>{db.health}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getBackupBadge(db.backupStatus)}</TableCell>
                          <TableCell>{db.lastBackup}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="issues" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Backup Status</TableHead>
                      <TableHead>Last Backup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases
                      .filter((db) => db.health === "Warning" || db.health === "Critical")
                      .map((db) => (
                        <TableRow key={db.id}>
                          <TableCell className="font-medium">{db.name}</TableCell>
                          <TableCell>{db.type}</TableCell>
                          <TableCell>{db.version}</TableCell>
                          <TableCell>{db.size}</TableCell>
                          <TableCell>{getStatusBadge(db.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getHealthIcon(db.health)}
                              <span>{db.health}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getBackupBadge(db.backupStatus)}</TableCell>
                          <TableCell>{db.lastBackup}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="backups" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Backup Status</TableHead>
                      <TableHead>Last Backup</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow key={db.id}>
                        <TableCell className="font-medium">{db.name}</TableCell>
                        <TableCell>{db.type}</TableCell>
                        <TableCell>{db.size}</TableCell>
                        <TableCell>{getBackupBadge(db.backupStatus)}</TableCell>
                        <TableCell>{db.lastBackup}</TableCell>
                        <TableCell>{db.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
