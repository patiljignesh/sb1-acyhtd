import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Printer,
  FileText,
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, signOut } = useAdminAuth();
  const [printerRequests, setPrinterRequests] = useState([]);
  const [printRequests, setPrintRequests] = useState([]);
  const [stats, setStats] = useState({
    totalPrinters: 0,
    totalRequests: 0,
    pendingApprovals: 0,
    activeJobs: 0,
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      // Load printer registration requests
      const { data: printers } = await supabase
        .from('printers')
        .select('*')
        .order('created_at', { ascending: false });

      // Load print requests
      const { data: requests } = await supabase
        .from('print_requests')
        .select('*')
        .order('created_at', { ascending: false });

      setPrinterRequests(printers || []);
      setPrintRequests(requests || []);

      // Update stats
      setStats({
        totalPrinters: printers?.length || 0,
        totalRequests: requests?.length || 0,
        pendingApprovals: printers?.filter(p => !p.approved).length || 0,
        activeJobs: requests?.filter(r => r.status === 'in_progress').length || 0,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    }
  };

  const handleApprove = async (id: string, type: 'printer' | 'request') => {
    try {
      if (type === 'printer') {
        await supabase
          .from('printers')
          .update({ approved: true })
          .eq('id', id);
      } else {
        await supabase
          .from('print_requests')
          .update({ status: 'approved' })
          .eq('id', id);
      }
      toast.success('Item approved successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to approve item');
    }
  };

  const handleReject = async (id: string, type: 'printer' | 'request') => {
    try {
      if (type === 'printer') {
        await supabase
          .from('printers')
          .update({ approved: false })
          .eq('id', id);
      } else {
        await supabase
          .from('print_requests')
          .update({ status: 'rejected' })
          .eq('id', id);
      }
      toast.success('Item rejected successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to reject item');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Printers</CardTitle>
              <Printer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPrinters}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Print Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeJobs}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="printers">
          <TabsList>
            <TabsTrigger value="printers">Printer Registrations</TabsTrigger>
            <TabsTrigger value="requests">Print Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="printers">
            <Card>
              <CardHeader>
                <CardTitle>Printer Registration Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {printerRequests.map((printer: any) => (
                    <div
                      key={printer.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{printer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Model: {printer.model} | Experience: {printer.experience}
                        </p>
                        <Badge variant={printer.approved ? 'success' : 'secondary'}>
                          {printer.approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(printer.id, 'printer')}
                          disabled={printer.approved}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(printer.id, 'printer')}
                          disabled={printer.approved === false}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Print Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {printRequests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{request.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Budget: {request.budget} | Location: {request.location}
                        </p>
                        <Badge variant={request.status === 'approved' ? 'success' : 'secondary'}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id, 'request')}
                          disabled={request.status === 'approved'}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id, 'request')}
                          disabled={request.status === 'rejected'}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}