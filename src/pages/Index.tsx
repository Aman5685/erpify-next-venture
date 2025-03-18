import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  DollarSign, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import DashboardCard from '@/components/Dashboard/DashboardCard';
import MetricsCard from '@/components/Dashboard/MetricsCard';
import ActivityFeed from '@/components/Dashboard/ActivityFeed';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useToast } from '@/components/ui/use-toast';

// Sample data
const salesData = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 5400 },
  { name: 'Mar', total: 3800 },
  { name: 'Apr', total: 5200 },
  { name: 'May', total: 7800 },
  { name: 'Jun', total: 8200 },
  { name: 'Jul', total: 7000 },
  { name: 'Aug', total: 9500 },
  { name: 'Sep', total: 8700 },
  { name: 'Oct', total: 9600 },
  { name: 'Nov', total: 7500 },
  { name: 'Dec', total: 8900 },
];

const activityData = [
  {
    id: '1',
    user: { name: 'Sarah Johnson' },
    action: 'added a new product',
    target: 'Wireless Headphones',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '2',
    user: { name: 'Michael Chen' },
    action: 'completed order',
    target: '#ORD-7841',
    timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
  },
  {
    id: '3',
    user: { name: 'Jessica Taylor' },
    action: 'updated inventory for',
    target: '12 products',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '4',
    user: { name: 'Robert Wilson' },
    action: 'added a new customer',
    target: 'Acme Inc.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
  },
  {
    id: '5',
    user: { name: 'Emily Davis' },
    action: 'processed refund for',
    target: '#ORD-7839',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
  }
];

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate initial data loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard updated",
        description: "Latest data has been loaded successfully.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back to your ERP dashboard</p>
          </div>
          
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-accent text-xs font-medium">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Last updated 3 mins ago</span>
          </div>
        </div>
      </header>
      
      {/* Grid layout for metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          delay={0}
        />
        <MetricsCard
          title="Orders"
          value="356"
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          delay={1}
        />
        <MetricsCard
          title="Products"
          value="128"
          icon={Package}
          trend={{ value: 4.1, isPositive: true }}
          delay={2}
        />
        <MetricsCard
          title="Customers"
          value="574"
          icon={Users}
          trend={{ value: 2.3, isPositive: false }}
          delay={3}
        />
      </div>
      
      {/* Charts and activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Revenue Overview" 
          className="lg:col-span-2"
          delay={4}
        >
          <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass rounded-lg p-2 shadow-md">
                            <div className="grid grid-cols-2 gap-2">
                              <span className="text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-medium">
                                ${payload[0].value.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="total" 
                    radius={[4, 4, 0, 0]}
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Recent Activity" 
          delay={5}
        >
          <div className="mt-4">
            <ActivityFeed activities={activityData} />
          </div>
        </DashboardCard>
      </div>
      
      {/* Products and performance cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard 
          title="Top Selling Products" 
          delay={6}
        >
          <div className="space-y-4 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Product {i + 1}</p>
                      <p className="text-sm text-muted-foreground">SKU-123{i}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(Math.random() * 1000).toFixed(2)}</p>
                </div>
              ))}
            </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Monthly Performance" 
          delay={7}
        >
          <div className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Revenue</p>
                  <p className="text-2xl font-bold">$24,780</p>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12.5%</span>
                </div>
              </div>
              
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="font-medium">Expenses</p>
                  <p className="text-2xl font-bold">$14,328</p>
                </div>
                <div className="flex items-center text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">3.2%</span>
                </div>
              </div>
              
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '45%' }}></div>
              </div>
            </div>
        </DashboardCard>
      </div>
    </PageTransition>
  );
};

export default Index;
