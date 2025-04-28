"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

export function SystemStatusList() {
  interface System {
    id: string
    name: string
    description: string
    status: string
  }

  const [systems, setSystems] = useState<System[]>([])

  useEffect(() => {

    const storedData = localStorage.getItem("systemStatusData")
    if (storedData) {
      setSystems(JSON.parse(storedData))
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {systems.map((system) => (
        <div key={system.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            {getStatusIcon(system.status)}
            <div>
              <div className="font-medium">{system.name}</div>
              <div className="text-xs text-muted-foreground">{system.description}</div>
            </div>
          </div>
          <div className="text-sm">
            {system.status === "operational" ? (
              <span className="text-green-500">Operational</span>
            ) : system.status === "degraded" ? (
              <span className="text-yellow-500">Degraded</span>
            ) : (
              <span className="text-red-500">Outage</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
