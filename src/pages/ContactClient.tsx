import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, CircleDollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - In a real app, this would come from an API
const getRequestDetails = (id: string) => ({
  id: parseInt(id),
  title: 'Custom Chess Set',
  client: 'David M.',
  image: 'https://picsum.photos/id/145/800/600',
  budget: 'R850',
});

export default function ContactClient() {
  const { id } = useParams();
  const request = getRequestDetails(id || '1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your offer has been submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/print-requests">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Requests
              </Button>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Make an Offer</h1>
            <p className="text-muted-foreground">
              Submit your offer for: {request.title}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={request.image}
                      alt={request.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">{request.title}</h2>
                    <p className="text-muted-foreground mb-4">Client: {request.client}</p>
                    <div className="p-3 bg-secondary rounded-lg inline-block">
                      <div className="flex items-center gap-2 text-sm">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                        <span>Client's Budget: {request.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Your Offer Amount (ZAR)</Label>
                      <div className="relative">
                        <CircleDollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="amount"
                          type="number"
                          className="pl-10"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Estimated Timeline (days)</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="timeline"
                          type="number"
                          className="pl-10"
                          placeholder="Number of days"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Client</Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain why you're the best person for this job. Include details about your experience with similar prints..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Offer
                    </Button>
                    <Link to={`/print-requests/${id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Request Details
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}