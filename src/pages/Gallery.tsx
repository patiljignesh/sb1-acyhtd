import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '@/lib/constants';

const galleryItems = [
  {
    id: 1,
    title: '3D Printed Vase',
    image: `${GALLERY_IMAGES.VASE}?w=800&q=80`,
    description: 'Modern geometric vase design',
    creator: 'John D.',
    location: 'Cape Town',
  },
  {
    id: 2,
    title: 'Mechanical Parts',
    image: `${GALLERY_IMAGES.MECHANICAL}?w=800&q=80`,
    description: 'Custom mechanical components',
    creator: 'Sarah M.',
    location: 'Johannesburg',
  },
  {
    id: 3,
    title: 'Architectural Model',
    image: `${GALLERY_IMAGES.ARCHITECTURAL}?w=800&q=80`,
    description: 'Detailed architectural prototype',
    creator: 'Mike R.',
    location: 'Durban',
  },
  {
    id: 4,
    title: 'Custom Figurine',
    image: `${GALLERY_IMAGES.FIGURINE}?w=800&q=80`,
    description: 'Hand-painted custom figurine',
    creator: 'Emma S.',
    location: 'Pretoria',
  },
  {
    id: 5,
    title: 'Prototype Design',
    image: `${GALLERY_IMAGES.PROTOTYPE}?w=800&q=80`,
    description: 'Rapid prototyping project',
    creator: 'David L.',
    location: 'Port Elizabeth',
  },
  {
    id: 6,
    title: 'Medical Model',
    image: `${GALLERY_IMAGES.MEDICAL}?w=800&q=80`,
    description: 'Educational anatomy model',
    creator: 'Lisa K.',
    location: 'Bloemfontein',
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={`${GALLERY_IMAGES.HERO}?w=1920&q=80`}
          alt="3D Printing Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-950/90" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-white">Print Gallery</h1>
            <p className="text-lg text-white/90 mb-8">
              Explore amazing creations from our community of 3D printer owners across South Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/request-print">
                <Button variant="secondary" size="lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Request Similar Print
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Filter className="mr-2 h-5 w-5" />
                Filter Prints
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={item.image}
                  alt={item.title}
                  aspectRatio={4/3}
                  className="w-full"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-primary">{item.creator}</span>
                    <span className="text-muted-foreground">{item.location}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Own Project?</h2>
          <p className="text-muted-foreground mb-8">
            Get connected with skilled 3D printer owners in your area
          </p>
          <Link to="/request-print">
            <Button size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Start Your Print Request
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}