import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, CircleDollarSign, MessageSquare } from 'lucide-react';

const requests = [
  {
    id: 1,
    title: 'Custom Chess Set',
    description: 'Looking for someone to print a custom-designed chess set. All pieces included.',
    location: 'Cape Town',
    budget: 'R850',
    date: '2024-03-15',
    status: 'New',
    client: 'David M.',
    files: ['chess_pieces.stl'],
    image: 'https://picsum.photos/id/145/800/600',
  },
  {
    id: 2,
    title: 'Architectural Model',
    description: 'Need a detailed architectural model printed for client presentation.',
    location: 'Johannesburg',
    budget: 'R1200',
    date: '2024-03-14',
    status: 'New',
    client: 'Sarah K.',
    files: ['building_model.obj', 'specs.pdf'],
    image: 'https://picsum.photos/id/1033/800/600',
  },
  {
    id: 3,
    title: 'Replacement Parts',
    description: 'Various mechanical parts needed for vintage radio restoration.',
    location: 'Durban',
    budget: 'R450',
    date: '2024-03-14',
    status: 'In Discussion',
    client: 'John P.',
    files: ['parts_collection.stl'],
    image: 'https://picsum.photos/id/1065/800/600',
  },
  {
    id: 4,
    title: 'Custom Vase',
    description: 'Modern design vase with geometric patterns.',
    location: 'Pretoria',
    budget: 'R600',
    date: '2024-03-13',
    status: 'New',
    client: 'Emma R.',
    files: ['vase_design.3mf'],
    image: 'https://picsum.photos/id/54/800/600',
  },
];

export default function PrintRequests() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Print Requests</h1>
              <p className="text-muted-foreground">
                Browse and respond to print requests from customers in your area
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                Filter
              </Button>
              <Button variant="outline">
                Sort by Date
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Image Column */}
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={request.image} 
                          alt={request.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      {/* Content Column */}
                      <div className="md:col-span-2">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                            <p className="text-muted-foreground mb-4">{request.description}</p>
                          </div>
                          <Badge variant={request.status === 'New' ? 'default' : 'secondary'}>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm">{request.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CircleDollarSign className="h-4 w-4 text-primary" />
                            <span className="text-sm">{request.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">{request.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span className="text-sm">{request.client}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {request.files.map((file, i) => (
                            <Badge key={i} variant="secondary">
                              {file}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Link to={`/contact-client/${request.id}`} className="flex-1">
                            <Button className="w-full">
                              Contact Client
                            </Button>
                          </Link>
                          <Link to={`/print-requests/${request.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
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