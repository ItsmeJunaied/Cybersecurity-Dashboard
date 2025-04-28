"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentThreatsTable() {
  interface Threat {
    id: string
    name: string
    source: string
    severity: string
    status: string
    time: string
  }

  const [threats, setThreats] = useState<Threat[]>([])

  useEffect(() => {

    const storedData = localStorage.getItem("recentThreatsData")
    if (storedData) {
      setThreats(JSON.parse(storedData))
    }
  }, [])

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "investigating":
        return <Badge className="bg-blue-500">Investigating</Badge>
      case "mitigated":
        return <Badge className="bg-green-500">Mitigated</Badge>
      case "resolved":
        return (
          <Badge variant="outline" className="bg-gray-200 text-gray-800">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Threat</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {threats.map((threat) => (
            <TableRow key={threat.id}>
              <TableCell className="font-medium">{threat.name}</TableCell>
              <TableCell>{threat.source}</TableCell>
              <TableCell>{getSeverityBadge(threat.severity)}</TableCell>
              <TableCell>{getStatusBadge(threat.status)}</TableCell>
              <TableCell className="text-right">{threat.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
