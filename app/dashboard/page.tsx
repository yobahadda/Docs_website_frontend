"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { BellIcon, DollarSignIcon, HomeIcon, MenuIcon, MountainIcon, SettingsIcon, UsersIcon, DocumentIcon, DatabaseIcon, CalendarIcon, FileIcon, HardDriveIcon } from 'lucide-react';

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActiveView={setActiveView} fetchUsers={fetchUsers} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && (
              <>
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <UserPlanContent offer={offer} error={error} />
                <StatsGrid />
                <ChartsGrid />
              </>
            )}
            {activeView === 'users' && (
              <>
                <h1 className="text-3xl font-bold mb-6">User Management</h1>
                <UserList users={users} error={error} />
              </>
            )}
            {activeView === 'billing' && (
              <>
                <h1 className="text-3xl font-bold mb-6">Billing Overview</h1>
                <BillingView payments={payments} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

function Sidebar({ setActiveView, fetchUsers }: { setActiveView: (view: 'dashboard' | 'users' | 'billing') => void, fetchUsers: () => void }) {
  return (
    <aside className="hidden w-64 bg-white shadow-md md:flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">DocuVault</span>
        </div>
      </div>
      <nav className="flex-1 p-4">
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
      className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors mb-1"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img src="/api/placeholder/40/40" width={40} height={40} alt="Avatar" className="rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserPlanContent({ offer, error }: { offer: Offer | null; error: string }) {
  if (error) {
    return <div className="text-red-500 bg-red-100 p-4 rounded-md mb-6">{error}</div>;
  }

  if (!offer) {
    return <div className="text-gray-500 bg-gray-100 p-4 rounded-md mb-6">Loading user plan...</div>;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">Your Current Plan</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Plan Name</p>
            <p className="text-lg font-semibold">{offer.nom_offre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Max Documents</p>
            <p className="text-lg font-semibold">{offer.max_doc}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold">${offer.prix_offre}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Documents" value="150" icon={<FileIcon className="h-8 w-8" />} color="bg-blue-500" />
      <StatCard title="Used Storage" value="2.5 GB" icon={<HardDriveIcon className="h-8 w-8" />} color="bg-green-500" />
      <StatCard title="Days Left" value="15" icon={<CalendarIcon className="h-8 w-8" />} color="bg-yellow-500" />
      <StatCard title="Collaborators" value="3" icon={<UsersIcon className="h-8 w-8" />} color="bg-purple-500" />
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className={`${color} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-75">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="rounded-full bg-white bg-opacity-25 p-3">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
    <Card>
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

function BillingView({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return <div className="text-gray-500 bg-gray-100 p-4 rounded-md">No payment data available.</div>;
  }

  const paymentDataByDate = payments.map(payment => ({
    date: payment.date_paiement,
    amount: payment.montant,
  }));

  return (
    <div>
      <BillingCharts paymentDataByDate={paymentDataByDate} />
      <RecentPayments payments={payments} />
    </div>
  );
}

function BillingCharts({ paymentDataByDate }: { paymentDataByDate: { date: string, amount: number }[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
      <ChartCard title="Total Payments Over Time" description="Visualize payments made over time">
        <PaymentsOverTimeChart data={paymentDataByDate} />
      </ChartCard>
      <ChartCard title="Payment Methods" description="Breakdown of payment methods used">
        <PaymentMethodsChart />
      </ChartCard>
    </div>
  );
}

function RecentPayments({ payments }: { payments: Payment[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.slice(0, 5).map((payment) => (
              <TableRow key={payment.id_payment}>
                <TableCell>{new Date(payment.date_paiement).toLocaleDateString()}</TableCell>
                <TableCell>${payment.montant}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment.etat_cout === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.etat_cout}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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

function PaymentMethodsChart() {
  const data = [
    { method: "Credit Card", value: 70 },
    { method: "PayPal", value: 20 },
    { method: "Bank Transfer", value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="method"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function UserList({ users, error }: { users: User[]; error: string }) {
  if (error) {
    return <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>;
  }

  return (
    <Card>
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
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_user}>
                <TableCell>{user.id_user}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UserPlanDashboard;