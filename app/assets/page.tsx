"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  Filter,
  HardDrive,
  Laptop,
  RefreshCw,
  Search,
  Server,
  Shield,
  Smartphone,
  Wifi,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AssetsPage() {
  const [assets, setAssets] = useState<{ id: number; name: string; type: string; ip: string; location: string; status: string; risk: string; lastScan: string; vulnerabilities: number; }[]>([])
  const [assetTypes, setAssetTypes] = useState<{ name: string; count: number; icon: React.ComponentType }[]>([])
  const [assetRisks, setAssetRisks] = useState<{ level: string; count: number; percentage: number; color: string }[]>([])
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {

    const generatedAssets = [
      {
        id: 1,
        name: "Web Server 01",
        type: "Server",
        ip: "192.168.1.10",
        location: "Primary Data Center",
        status: "Protected",
        risk: "Low",
        lastScan: "2 hours ago",
        vulnerabilities: 2,
      },
      {
        id: 2,
        name: "Database Server",
        type: "Server",
        ip: "192.168.1.11",
        location: "Primary Data Center",
        status: "Protected",
        risk: "Medium",
        lastScan: "1 day ago",
        vulnerabilities: 5,
      },
      {
        id: 3,
        name: "CEO Laptop",
        type: "Endpoint",
        ip: "192.168.5.45",
        location: "Executive Office",
        status: "Protected",
        risk: "High",
        lastScan: "3 days ago",
        vulnerabilities: 8,
      },
      {
        id: 4,
        name: "Marketing iPhone",
        type: "Mobile",
        ip: "192.168.10.102",
        location: "Marketing Dept",
        status: "At Risk",
        risk: "High",
        lastScan: "5 days ago",
        vulnerabilities: 7,
      },
      {
        id: 5,
        name: "Guest WiFi",
        type: "Network",
        ip: "10.0.0.1",
        location: "All Offices",
        status: "Protected",
        risk: "Medium",
        lastScan: "12 hours ago",
        vulnerabilities: 4,
      },
      {
        id: 6,
        name: "File Server",
        type: "Server",
        ip: "192.168.1.12",
        location: "Primary Data Center",
        status: "Protected",
        risk: "Low",
        lastScan: "1 hour ago",
        vulnerabilities: 1,
      },
      {
        id: 7,
        name: "HR Workstation",
        type: "Endpoint",
        ip: "192.168.5.22",
        location: "HR Department",
        status: "Protected",
        risk: "Medium",
        lastScan: "2 days ago",
        vulnerabilities: 3,
      },
      {
        id: 8,
        name: "Dev Laptop 03",
        type: "Endpoint",
        ip: "192.168.5.78",
        location: "Development",
        status: "At Risk",
        risk: "Critical",
        lastScan: "7 days ago",
        vulnerabilities: 12,
      },
      {
        id: 9,
        name: "Corporate VPN",
        type: "Network",
        ip: "203.0.113.5",
        location: "Cloud",
        status: "Protected",
        risk: "Low",
        lastScan: "6 hours ago",
        vulnerabilities: 0,
      },
      {
        id: 10,
        name: "Finance Printer",
        type: "IoT",
        ip: "192.168.8.15",
        location: "Finance Dept",
        status: "At Risk",
        risk: "Medium",
        lastScan: "10 days ago",
        vulnerabilities: 6,
      },
    ]


    const typeStats = [
      { name: "Servers", count: 3, icon: Server },
      { name: "Endpoints", count: 3, icon: Laptop },
      { name: "Mobile", count: 1, icon: Smartphone },
      { name: "Network", count: 2, icon: Wifi },
      { name: "IoT", count: 1, icon: HardDrive },
    ]


    const riskStats = [
      { level: "Critical", count: 1, percentage: 10, color: "bg-red-500" },
      { level: "High", count: 2, percentage: 20, color: "bg-orange-500" },
      { level: "Medium", count: 4, percentage: 40, color: "bg-yellow-500" },
      { level: "Low", count: 3, percentage: 30, color: "bg-green-500" },
    ]

    setAssets(generatedAssets)
    setAssetTypes(typeStats)
    setAssetRisks(riskStats)
    setIsDataInitialized(true)
  }, [])

  if (!isDataInitialized) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Protected":
        return <Badge className="bg-green-500">Protected</Badge>
      case "At Risk":
        return <Badge variant="destructive">At Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>
      case "High":
        return <Badge className="bg-orange-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "Server":
        return <Server className="h-4 w-4 text-blue-500" />
      case "Endpoint":
        return <Laptop className="h-4 w-4 text-purple-500" />
      case "Mobile":
        return <Smartphone className="h-4 w-4 text-pink-500" />
      case "Network":
        return <Wifi className="h-4 w-4 text-indigo-500" />
      case "IoT":
        return <HardDrive className="h-4 w-4 text-teal-500" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Asset Inventory</h1>
        <Button className="bg-[#41644A] hover:bg-[#41644A]/90">
          <Shield className="mr-2 h-4 w-4" />
          Scan All Assets
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {assetTypes.map((type, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-[#41644A]">
            <CardHeader className="pb-2 bg-[#41644A]/5">
              <div className="flex items-center justify-between">
                <CardDescription>{type.name}</CardDescription>
                <div className="rounded-full bg-[#41644A]/10 p-1.5">
                  <type.icon className="h-4 w-4 text-[#41644A]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-[#41644A]">{type.count}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span>{Math.floor(Math.random() * 5) + 1} new this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>Asset Risk Distribution</CardTitle>
            <CardDescription>Risk levels across all assets</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {assetRisks.map((risk, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${risk.color}`}></div>
                      <span className="text-sm font-medium">{risk.level}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{risk.count} assets</span>
                  </div>
                  <Progress value={risk.percentage} className={risk.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>Asset Protection Status</CardTitle>
            <CardDescription>Current protection status of all assets</CardDescription>
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
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.7)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">70%</span>
                  <span className="text-sm text-muted-foreground">Protected</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-green-50 p-2">
                <div className="text-xl font-bold text-green-600">7</div>
                <div className="text-xs text-muted-foreground">Protected Assets</div>
              </div>
              <div className="rounded-lg bg-red-50 p-2">
                <div className="text-xl font-bold text-red-600">3</div>
                <div className="text-xs text-muted-foreground">At Risk Assets</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search assets..." className="max-w-sm" />
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
            All Assets
          </TabsTrigger>
          <TabsTrigger value="servers" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Servers
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Network
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Last Scan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getAssetTypeIcon(asset.type)}
                            <span>{asset.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{asset.ip}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>{getStatusBadge(asset.status)}</TableCell>
                        <TableCell>{getRiskBadge(asset.risk)}</TableCell>
                        <TableCell>{asset.vulnerabilities}</TableCell>
                        <TableCell>{asset.lastScan}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="servers" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Last Scan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets
                      .filter((asset) => asset.type === "Server")
                      .map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.ip}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{getStatusBadge(asset.status)}</TableCell>
                          <TableCell>{getRiskBadge(asset.risk)}</TableCell>
                          <TableCell>{asset.vulnerabilities}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="endpoints" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Last Scan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets
                      .filter((asset) => asset.type === "Endpoint")
                      .map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.ip}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{getStatusBadge(asset.status)}</TableCell>
                          <TableCell>{getRiskBadge(asset.risk)}</TableCell>
                          <TableCell>{asset.vulnerabilities}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="network" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Last Scan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets
                      .filter((asset) => asset.type === "Network")
                      .map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.ip}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{getStatusBadge(asset.status)}</TableCell>
                          <TableCell>{getRiskBadge(asset.risk)}</TableCell>
                          <TableCell>{asset.vulnerabilities}</TableCell>
                          <TableCell>{asset.lastScan}</TableCell>
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
