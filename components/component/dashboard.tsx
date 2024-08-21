import React from 'react';
import Link from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BellIcon, DollarSignIcon, HomeIcon, MenuIcon, MountainIcon, SettingsIcon, UsersIcon } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Acme SaaS</span>
        </div>
        <nav className="flex flex-col gap-1">
          <NavItem href="#" icon={HomeIcon} label="Dashboard" />
          <NavItem href="#" icon={UsersIcon} label="Users" />
          <NavItem href="#" icon={DollarSignIcon} label="Billing" />
          <NavItem href="#" icon={SettingsIcon} label="Settings" />
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

function NavItem({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserDropdown />
      </div>
    </header>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
          <img src="/api/placeholder/36/36" width={36} height={36} alt="Avatar" className="rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MainContent() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <StatsGrid />
      <ChartsGrid />
    </main>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <StatCard title="Total Users" description="All registered users" value="1,234" />
      <StatCard title="Active Users" description="Users who logged in this month" value="987" />
      <StatCard title="New Signups" description="Users who signed up this month" value="321" />
      <StatCard title="Revenue" description="Total revenue this month" value="$45,678" />
    </div>
  );
}

function StatCard({ title, description, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ChartsGrid() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ChartCard title="User Growth" description="Monthly user growth">
        <LinechartChart />
      </ChartCard>
      <ChartCard title="Revenue Breakdown" description="Revenue by plan">
        <PiechartCustomChart />
      </ChartCard>
      <ChartCard title="Top Referrers" description="Top sources of new signups">
        <ReferrerTable />
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ReferrerTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Referrer</TableHead>
          <TableHead>Signups</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Google</TableCell>
          <TableCell>120</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Twitter</TableCell>
          <TableCell>80</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Facebook</TableCell>
          <TableCell>60</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>LinkedIn</TableCell>
          <TableCell>40</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function LinechartChart() {
  const data = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="desktop" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function PiechartCustomChart() {
  const data = [
    { browser: "chrome", visitors: 275 },
    { browser: "safari", visitors: 200 },
    { browser: "firefox", visitors: 187 },
    { browser: "edge", visitors: 173 },
    { browser: "other", visitors: 90 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie data={data} dataKey="visitors" nameKey="browser" fill="#8884d8" label />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Dashboard;