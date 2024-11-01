import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  MapPin,
  Calendar,
  CircleDollarSign,
  MessageSquare,
  FileText,
  Download,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

// Mock data - In a real app, this would come from an API
const getRequestDetails = (id: string) => ({
  id: parseInt(id),
  title: 'Custom Chess Set',
  description: 'Looking for someone to print a custom-designed chess set. All pieces included. The set features unique modern designs while maintaining the traditional chess piece recognition. Each piece has been carefully designed for optimal printing without supports.',
  location: 'Cape Town',
  budget: 'R850',
  date: '2024-03-15',
  status: 'New',
  client: 'David M.',
  files: ['chess_pieces.stl'],
  image: 'https://picsum.photos/id/145/800/600',
  specifications: {
    material: 'PLA or PETG',
    color: 'Black and White',
    resolution: '0.2mm layer height',
    infill: '20%',
    quantity: '32 pieces (complete set)',
    deadline: '2 weeks',
  },
  additionalImages: [
    'https://picsum.photos/id/146/800/600',
    'https://picsum.photos/id/147/800/600',
    'https://picsum.photos/id/149/800/600',
  ],
  offers: [
    {
      id: 1,
      printer: 'John P.',
      amount: 'R750',
      timeline: '10 days',
      status: 'pending',
    },
    {
      id: 2,
      printer: 'Sarah K.',
      amount: 'R900',
      timeline: '7 days',
      status: 'pending',
    },
  ],
});

export default function PrintRequestDetails() {
  const { id } = useParams();
  const request = getRequestDetails(id || '1');

  const handleAcceptOffer = (offerId: number) => {
    toast.success('Offer accepted! The printer will be notified.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/print-requests">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Requests
              </Button>
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{request.title}</h1>
                <div className="flex items-center gap-4">
                  <Badge variant={request.status === 'New' ? 'default' : 'secondary'}>
                    {request.status}
                  </Badge>
                  <span className="text-muted-foreground">Request #{request.id}</span>
                </div>
              </div>
              <Link to={`/contact-client/${request.id}`}>
                <Button>
                  Make an Offer
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={request.image}
                      alt={request.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Request Info */}
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Request Details</h2>
                  <p className="text-muted-foreground mb-6">{request.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
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
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span>{request.client}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-3">Files</h3>
                  <div className="space-y-2">
                    {request.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span>{file}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                  <div className="space-y-4">
                    {Object.entries(request.specifications).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-sm text-muted-foreground mb-1">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        <div className="font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Offers Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Offers ({request.offers.length})</h2>
                <div className="space-y-4">
                  {request.offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{offer.printer}</div>
                        <div className="text-sm text-muted-foreground">
                          {offer.amount} • {offer.timeline} timeline
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAcceptOffer(offer.id)}
                        variant="outline"
                        className="hover:bg-primary hover:text-white"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept Offer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {request.additionalImages.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Additional view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}