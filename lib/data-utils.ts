export function initializeData() {
  // Initialize security overview data if not present
  if (!localStorage.getItem("securityOverviewData")) {
    const securityOverviewData = generateSecurityOverviewData()
    localStorage.setItem("securityOverviewData", JSON.stringify(securityOverviewData))
  }

  // Initialize threat activity data if not present
  if (!localStorage.getItem("threatActivityData")) {
    const threatActivityData = generateThreatActivityData()
    localStorage.setItem("threatActivityData", JSON.stringify(threatActivityData))
  }

  // Initialize vulnerability data if not present
  if (!localStorage.getItem("vulnerabilityData")) {
    const vulnerabilityData = generateVulnerabilityData()
    localStorage.setItem("vulnerabilityData", JSON.stringify(vulnerabilityData))
  }

  // Initialize recent threats data if not present
  if (!localStorage.getItem("recentThreatsData")) {
    const recentThreatsData = generateRecentThreatsData()
    localStorage.setItem("recentThreatsData", JSON.stringify(recentThreatsData))
  }

  // Initialize system status data if not present
  if (!localStorage.getItem("systemStatusData")) {
    const systemStatusData = generateSystemStatusData()
    localStorage.setItem("systemStatusData", JSON.stringify(systemStatusData))
  }
}

// Generate 30 days of security overview data
function generateSecurityOverviewData() {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      threats: Math.floor(Math.random() * 20) + 5,
      vulnerabilities: Math.floor(Math.random() * 15) + 10,
      mitigations: Math.floor(Math.random() * 25) + 15,
    })
  }

  return data
}

// Generate hourly threat activity data
function generateThreatActivityData() {
  const data = []

  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour,
      threats: Math.floor(Math.random() * 10) + 1,
    })
  }

  return data
}

// Generate vulnerability distribution data
function generateVulnerabilityData() {
  return [
    { name: "Network", value: 35 },
    { name: "Application", value: 25 },
    { name: "Endpoint", value: 20 },
    { name: "Cloud", value: 15 },
    { name: "IoT", value: 5 },
  ]
}

// Generate recent threats data
function generateRecentThreatsData() {
  const threats = [
    {
      id: 1,
      name: "SQL Injection Attempt",
      source: "192.168.1.105",
      severity: "Critical",
      status: "Active",
      time: "10 mins ago",
    },
    {
      id: 2,
      name: "Brute Force Attack",
      source: "45.33.22.156",
      severity: "High",
      status: "Investigating",
      time: "25 mins ago",
    },
    {
      id: 3,
      name: "Suspicious Login",
      source: "10.0.0.15",
      severity: "Medium",
      status: "Mitigated",
      time: "1 hour ago",
    },
    {
      id: 4,
      name: "Malware Detected",
      source: "Endpoint #45",
      severity: "High",
      status: "Resolved",
      time: "2 hours ago",
    },
    {
      id: 5,
      name: "DDoS Attempt",
      source: "Multiple",
      severity: "Critical",
      status: "Mitigated",
      time: "3 hours ago",
    },
    {
      id: 6,
      name: "Data Exfiltration",
      source: "Internal",
      severity: "Critical",
      status: "Investigating",
      time: "4 hours ago",
    },
  ]

  return threats
}

// Generate system status data
function generateSystemStatusData() {
  return [
    {
      id: 1,
      name: "Firewall",
      description: "Edge network protection",
      status: "operational",
    },
    {
      id: 2,
      name: "Intrusion Detection",
      description: "Network monitoring system",
      status: "operational",
    },
    {
      id: 3,
      name: "Endpoint Protection",
      description: "Device security system",
      status: "degraded",
    },
    {
      id: 4,
      name: "Cloud Security",
      description: "AWS/Azure security controls",
      status: "operational",
    },
    {
      id: 5,
      name: "Email Security",
      description: "Anti-phishing and spam protection",
      status: "outage",
    },
  ]
}
