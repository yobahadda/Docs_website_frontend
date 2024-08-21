"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { BellIcon, DollarSignIcon, HomeIcon, MenuIcon, MountainIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Offer {
  id_offre: string;
  nom_offre: string;
  description: string;
  max_doc: number;
  prix_offre: number;
}

interface Payment {
  id_payment: number;
  montant: number;
  devise: string;
  transaction_id: string;
  etat_cout: string;
  date_paiement: string;
  id_user: number;
  id_offre: number;
}

interface User {
  id_user: number;
  username: string;
  email: string;
  nom_user: string;
  prenom: string;
  role: string;
}


const UserPlanDashboard = () => {
  const router = useRouter();
  const { userId } = router.query ?? {} as { userId: number } | undefined;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'users' | 'billing'>('dashboard');

  useEffect(() => {
    if (!userId) return;
    const fetchUserPlan = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/users/${userId}/plan`);
        setOffer(response.data);
      } catch (error) {
        console.error('Failed to fetch user plan', error);
        setError('Failed to fetch user plan');
      }
    };

    fetchUserPlan();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/users/?skip=0&limit=1000');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setError('Failed to fetch users');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/payment/payment/?skip=0&limit=100');
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
      setError('Failed to fetch payments');
    }
  };

  useEffect(() => {
    if (activeView === 'billing') {
      fetchPayments();
    }
  }, [activeView]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar setActiveView={setActiveView} fetchUsers={fetchUsers} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {activeView === 'dashboard' && (
            <>
              <UserPlanContent offer={offer} error={error} />
              <StatsGrid />
              <ChartsGrid />
            </>
          )}
          {activeView === 'users' && <UserList users={users} error={error} />}
          {activeView === 'billing' && <BillingView payments={payments} />}
        </main>
      </div>
    </div>
  );
};


function Sidebar({ setActiveView, fetchUsers }: { setActiveView: (view: 'dashboard' | 'users' | 'billing') => void, fetchUsers: () => void }) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-black p-4 md:flex">
      <div className="mb-6 flex items-center gap-2">
        <MountainIcon className="h-6 w-6 text-blue-500" />
        <span className="text-lg font-bold">Admin dashboard</span>
      </div>
      <nav className="flex flex-col gap-1">
        <NavItem href="#" icon={HomeIcon} label="Dashboard" onClick={() => setActiveView('dashboard')} />
        <NavItem href="#" icon={UsersIcon} label="Users" onClick={() => { setActiveView('users'); fetchUsers(); }} />
        <NavItem href="#" icon={DollarSignIcon} label="Billing" onClick={() => setActiveView('billing')} />
        <NavItem href="#" icon={SettingsIcon} label="Settings" />
      </nav>
    </aside>
  );
}


function NavItem({ href, icon: Icon, label, onClick }: { href: string; icon: React.ElementType; label: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-500"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-bold">User Dashboard</h1>
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

function UserPlanContent({ offer, error }: { offer: Offer | null; error: string }) {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!offer) {
    return <div>Loading user plan...</div>;
  }

  return (
    <Card className="mb-6 bg-white">
      <CardHeader>
        <CardTitle>Your Current Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Plan Name:</strong> {offer.nom_offre}</p>
        <p><strong>Description:</strong> {offer.description}</p>
        <p><strong>Max Documents:</strong> {offer.max_doc}</p>
        <p><strong>Price:</strong> ${offer.prix_offre}</p>
      </CardContent>
    </Card>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
      <StatCard title="Total Documents" description="Documents in your account" value="150" color="bg-blue-500" />
      <StatCard title="Used Storage" description="Total storage used" value="2.5 GB" color="bg-green-500" />
      <StatCard title="Days Left" description="Days until plan renewal" value="15" color="bg-yellow-500" />
      <StatCard title="Collaborators" description="Team members with access" value="3" color="bg-purple-500" />
    </div>
  );
}

function StatCard({ title, description, value, color }: { title: string; description: string; value: string; color: string }) {
  return (
    <Card className={`${color} text-white`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-100">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChartCard title="Document Upload History" description="Number of documents uploaded over time">
        <DocumentUploadChart />
      </ChartCard>
      <ChartCard title="Storage Usage" description="Breakdown of storage usage by document type">
        <StorageUsageChart />
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function DocumentUploadChart() {
  const data = [
    { month: "Jan", uploads: 20 },
    { month: "Feb", uploads: 35 },
    { month: "Mar", uploads: 25 },
    { month: "Apr", uploads: 40 },
    { month: "May", uploads: 30 },
    { month: "Jun", uploads: 45 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} stroke="#e0e0e0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uploads" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
function BillingView({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return <div>No payment data available.</div>;
  }

  const paymentDataByDate = payments.map(payment => ({
    date: payment.date_paiement,
    amount: payment.montant,
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Billing Overview</h2>
      <BillingCharts paymentDataByDate={paymentDataByDate} />
    </div>
  );
}

function BillingCharts({ paymentDataByDate }: { paymentDataByDate: { date: string, amount: number }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChartCard title="Total Payments Over Time" description="Visualize payments made over time">
        <PaymentsOverTimeChart data={paymentDataByDate} />
      </ChartCard>
      {/* Add more charts as needed */
      // <ChartCard title="Payment Methods" description="Breakdown of payment methods used">


      }

    </div>
  );
}

function PaymentsOverTimeChart({ data }: { data: { date: string, amount: number }[] }) {
  const formattedData = data.map(d => ({
    date: new Date(d.date).toLocaleDateString(),
    amount: d.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} stroke="#e0e0e0" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
function StorageUsageChart() {
  const data = [
    { type: "PDF", usage: 1.2 },
    { type: "Images", usage: 0.8 },
    { type: "Word Docs", usage: 0.3 },
    { type: "Other", usage: 0.2 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          dataKey="usage"
          nameKey="type"
          label
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

function UserList({ users, error }: { users: User[]; error: string }) {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>User List</CardTitle>
        <CardDescription>All registered users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_user}>
                <TableCell>{user.id_user}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UserPlanDashboard;
