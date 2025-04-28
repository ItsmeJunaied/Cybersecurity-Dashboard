"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Filter, Lock, RefreshCw, Search, Shield, User, UserX } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UsersPage() {
  const [users, setUsers] = useState<
    {
      id: number
      name: string
      email: string
      role: string
      department: string
      status: string
      lastLogin: string
      riskLevel: string
      mfa: boolean
      passwordStatus: string
      loginAttempts: number
    }[]
  >([])
  const [userStats, setUserStats] = useState<{
    total: number
    active: number
    inactive: number
    locked: number
    suspended: number
    mfaEnabled: number
    highRisk: number
    weakPasswords: number
  }>({
    total: 0,
    active: 0,
    inactive: 0,
    locked: 0,
    suspended: 0,
    mfaEnabled: 0,
    highRisk: 0,
    weakPasswords: 0,
  })
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  useEffect(() => {

    const generatedUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Administrator",
        department: "IT",
        status: "Active",
        lastLogin: "10 minutes ago",
        riskLevel: "Low",
        mfa: true,
        passwordStatus: "Strong",
        loginAttempts: 0,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Manager",
        department: "Finance",
        status: "Active",
        lastLogin: "2 hours ago",
        riskLevel: "Medium",
        mfa: true,
        passwordStatus: "Medium",
        loginAttempts: 0,
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "User",
        department: "Marketing",
        status: "Active",
        lastLogin: "1 day ago",
        riskLevel: "Low",
        mfa: false,
        passwordStatus: "Medium",
        loginAttempts: 0,
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "User",
        department: "Sales",
        status: "Inactive",
        lastLogin: "30 days ago",
        riskLevel: "High",
        mfa: false,
        passwordStatus: "Expired",
        loginAttempts: 0,
      },
      {
        id: 5,
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
        role: "Manager",
        department: "Operations",
        status: "Active",
        lastLogin: "5 hours ago",
        riskLevel: "Low",
        mfa: true,
        passwordStatus: "Strong",
        loginAttempts: 0,
      },
      {
        id: 6,
        name: "Sarah Brown",
        email: "sarah.brown@example.com",
        role: "User",
        department: "HR",
        status: "Locked",
        lastLogin: "5 days ago",
        riskLevel: "Critical",
        mfa: false,
        passwordStatus: "Weak",
        loginAttempts: 5,
      },
      {
        id: 7,
        name: "David Miller",
        email: "david.miller@example.com",
        role: "User",
        department: "R&D",
        status: "Active",
        lastLogin: "3 hours ago",
        riskLevel: "Medium",
        mfa: true,
        passwordStatus: "Medium",
        loginAttempts: 0,
      },
      {
        id: 8,
        name: "Jennifer Taylor",
        email: "jennifer.taylor@example.com",
        role: "Manager",
        department: "Customer Support",
        status: "Active",
        lastLogin: "1 hour ago",
        riskLevel: "Low",
        mfa: true,
        passwordStatus: "Strong",
        loginAttempts: 0,
      },
      {
        id: 9,
        name: "James Anderson",
        email: "james.anderson@example.com",
        role: "User",
        department: "Legal",
        status: "Active",
        lastLogin: "2 days ago",
        riskLevel: "Low",
        mfa: false,
        passwordStatus: "Medium",
        loginAttempts: 0,
      },
      {
        id: 10,
        name: "Patricia Thomas",
        email: "patricia.thomas@example.com",
        role: "User",
        department: "Accounting",
        status: "Suspended",
        lastLogin: "15 days ago",
        riskLevel: "High",
        mfa: false,
        passwordStatus: "Weak",
        loginAttempts: 2,
      },
    ]


    const stats = {
      total: generatedUsers.length,
      active: generatedUsers.filter((user) => user.status === "Active").length,
      inactive: generatedUsers.filter((user) => user.status === "Inactive").length,
      locked: generatedUsers.filter((user) => user.status === "Locked").length,
      suspended: generatedUsers.filter((user) => user.status === "Suspended").length,
      mfaEnabled: generatedUsers.filter((user) => user.mfa).length,
      highRisk: generatedUsers.filter((user) => user.riskLevel === "High" || user.riskLevel === "Critical").length,
      weakPasswords: generatedUsers.filter(
        (user) => user.passwordStatus === "Weak" || user.passwordStatus === "Expired",
      ).length,
    }

    setUsers(generatedUsers)
    setUserStats(stats)
    setIsDataInitialized(true)
  }, [])

  if (!isDataInitialized) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>
      case "Locked":
        return <Badge variant="destructive">Locked</Badge>
      case "Suspended":
        return <Badge className="bg-orange-500">Suspended</Badge>
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

  const getPasswordBadge = (status: string) => {
    switch (status) {
      case "Strong":
        return <Badge className="bg-green-500">Strong</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Weak":
        return <Badge className="bg-orange-500">Weak</Badge>
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getMfaBadge = (mfa: boolean) => {
    return mfa ? <Badge className="bg-green-500">Enabled</Badge> : <Badge className="bg-gray-500">Disabled</Badge>
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part: string) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Security</h1>
        <Button className="bg-[#41644A] hover:bg-[#41644A]/90">
          <Shield className="mr-2 h-4 w-4" />
          Security Audit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-[#41644A]">
          <CardHeader className="pb-2 bg-[#41644A]/5">
            <CardDescription>Total Users</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#41644A]">{userStats.total}</CardTitle>
              <div className="rounded-full bg-[#41644A]/10 p-2">
                <User className="h-5 w-5 text-[#41644A]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span>{userStats.active} active users</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
          <CardHeader className="pb-2 bg-green-50">
            <CardDescription>MFA Enabled</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-green-600">{userStats.mfaEnabled}</CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <Lock className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{Math.round((userStats.mfaEnabled / userStats.total) * 100)}% of all users</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
          <CardHeader className="pb-2 bg-red-50">
            <CardDescription>High Risk Users</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-red-600">{userStats.highRisk}</CardTitle>
              <div className="rounded-full bg-red-100 p-2">
                <UserX className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Requires immediate attention</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
          <CardHeader className="pb-2 bg-orange-50">
            <CardDescription>Weak Passwords</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-orange-600">{userStats.weakPasswords}</CardTitle>
              <div className="rounded-full bg-orange-100 p-2">
                <Shield className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Password updates required</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>User Status Overview</CardTitle>
            <CardDescription>Current status of all user accounts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{userStats.active} users</span>
                </div>
                <Progress value={(userStats.active / userStats.total) * 100} className="bg-green-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-medium">Inactive</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{userStats.inactive} users</span>
                </div>
                <Progress value={(userStats.inactive / userStats.total) * 100} className="bg-gray-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">Locked</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{userStats.locked} users</span>
                </div>
                <Progress value={(userStats.locked / userStats.total) * 100} className="bg-red-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm font-medium">Suspended</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{userStats.suspended} users</span>
                </div>
                <Progress value={(userStats.suspended / userStats.total) * 100} className="bg-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-[#41644A]/5 border-b">
            <CardTitle>MFA Adoption</CardTitle>
            <CardDescription>Multi-factor authentication status</CardDescription>
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
                    strokeDashoffset={2 * Math.PI * 40 * (1 - userStats.mfaEnabled / userStats.total)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">
                    {Math.round((userStats.mfaEnabled / userStats.total) * 100)}%
                  </span>
                  <span className="text-sm text-muted-foreground">MFA Enabled</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-green-50 p-2">
                <div className="text-xl font-bold text-green-600">{userStats.mfaEnabled}</div>
                <div className="text-xs text-muted-foreground">MFA Enabled</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <div className="text-xl font-bold text-gray-600">{userStats.total - userStats.mfaEnabled}</div>
                <div className="text-xs text-muted-foreground">MFA Disabled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search users..." className="max-w-sm" />
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
            All Users
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger value="mfa" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            MFA Status
          </TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-[#41644A] data-[state=active]:text-white">
            Password Health
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-[#41644A]/20">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                              <AvatarFallback className="bg-[#41644A]/10 text-[#41644A]">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risk" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>MFA Status</TableHead>
                      <TableHead>Password Status</TableHead>
                      <TableHead>Login Attempts</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-[#41644A]/20">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                              <AvatarFallback className="bg-[#41644A]/10 text-[#41644A]">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
                        <TableCell>{getMfaBadge(user.mfa)}</TableCell>
                        <TableCell>{getPasswordBadge(user.passwordStatus)}</TableCell>
                        <TableCell>{user.loginAttempts}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mfa" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>MFA Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-[#41644A]/20">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                              <AvatarFallback className="bg-[#41644A]/10 text-[#41644A]">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getMfaBadge(user.mfa)}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password" className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Password Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-[#41644A]/20">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                              <AvatarFallback className="bg-[#41644A]/10 text-[#41644A]">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPasswordBadge(user.passwordStatus)}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
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
