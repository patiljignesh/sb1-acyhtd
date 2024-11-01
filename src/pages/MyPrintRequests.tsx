import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  MapPin,
  Calendar,
  CircleDollarSign,
  MessageSquare,
  FileText,
  CheckCircle,
  X,
  Eye,
} from 'lucide-react';

// Mock data - In a real app, this would come from an API
const myRequests = [
  {
    id: 1,
    title: 'Custom Chess Set',
    description: 'Looking for someone to print a custom-designed chess set. All pieces included.',
    location: 'Cape Town',
    budget: 'R850',
    date: '2024-03-15',
    status: 'Active',
    files: ['chess_pieces.stl'],
    image: 'https://picsum.photos/id/145/800/600',
    offers: [
      {
        id: 1,
        printer: {
          name: 'John P.',
          rating: 4.8,
          completedPrints: 124,
        },
        amount: 'R750',
        timeline: '10 days',
        message: 'I have experience with chess pieces and can ensure high quality prints.',
      },
      {
        id: 2,
        printer: {
          name: 'Sarah K.',
          rating: 4.9,
          completedPrints: 89,
        },
        amount: 'R900',
        timeline: '7 days',
        message: 'Can start immediately and deliver high-quality prints with premium materials.',
      },
    ],
  },
  {
    id: 2,
    title: 'Architectural Model',
    description: 'Need a detailed architectural model printed for client presentation.',
    location: 'Johannesburg',
    budget: 'R1200',
    date: '2024-03-14',
    status: 'Active',
    files: ['building_model.obj', 'specs.pdf'],
    image: 'https://picsum.photos/id/1033/800/600',
    offers: [
      {
        id: 3,
        printer: {
          name: 'Mike R.',
          rating: 4.7,
          completedPrints: 56,
        },
        amount: 'R1100',
        timeline: '14 days',
        message: 'Specialized in architectural models with great attention to detail.',
      },
    ],
  },
];

export default function MyPrintRequests() {
  const handleAcceptOffer = (requestId: number, offerId: number) => {
    toast.success('Offer accepted! The printer will be notified to begin work.');
  };

  const handleDeclineOffer = (requestId: number, offerId: number) => {
    toast.success('Offer declined.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Print Requests</h1>
              <p className="text-muted-foreground">
                Manage your print requests and review offers from printers
              </p>
            </div>
            <Link to="/request-print">
              <Button>
                New Print Request
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            {myRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    {/* Request Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">{request.title}</h2>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{request.status}</Badge>
                          <span className="text-sm text-muted-foreground">Request #{request.id}</span>
                        </div>
                      </div>
                      <Link to={`/print-requests/${request.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </div>

                    {/* Request Details */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={request.image}
                          alt={request.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-muted-foreground mb-4">{request.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CircleDollarSign className="h-4 w-4 text-primary" />
                            <span>{request.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{request.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{request.files.length} files</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Offers Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Offers ({request.offers.length})
                      </h3>
                      <div className="space-y-4">
                        {request.offers.map((offer) => (
                          <div
                            key={offer.id}
                            className="bg-secondary rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="font-medium mb-1">{offer.printer.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  ⭐️ {offer.printer.rating} • {offer.printer.completedPrints} prints completed
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg mb-1">{offer.amount}</div>
                                <div className="text-sm text-muted-foreground">
                                  Timeline: {offer.timeline}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {offer.message}
                            </p>
                            <div className="flex gap-4">
                              <Button
                                onClick={() => handleAcceptOffer(request.id, offer.id)}
                                className="flex-1"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept Offer
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleDeclineOffer(request.id, offer.id)}
                                className="flex-1"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}