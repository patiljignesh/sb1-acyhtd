import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, Upload, Users, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GALLERY_IMAGES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-background z-0" />
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url(${GALLERY_IMAGES.HERO})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                South Africa's Premier 3D Printing Network
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with local 3D printer owners or offer your printing services. Fast, reliable, and community-driven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/request-print">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Upload className="mr-2 h-5 w-5" />
                    Request a Print
                  </Button>
                </Link>
                <Link to="/register-printer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Printer className="mr-2 h-5 w-5" />
                    Register Your Printer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground">Experience the future of 3D printing services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Upload className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Easy Upload</CardTitle>
                <CardDescription>
                  Simply upload your 3D model or take a photo of what you need printed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Multiple file formats supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Instant price estimates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Printer className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Local Printers</CardTitle>
                <CardDescription>
                  Connect with nearby 3D printer owners for faster delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Verified local providers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Quick turnaround times</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Join a growing community of makers and creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Expert advice available</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>Quality assurance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Prints Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Prints</h2>
            <p className="text-lg text-muted-foreground">Check out some of our community's latest creations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: GALLERY_IMAGES.ARCHITECTURAL,
                title: 'Architectural Model',
                creator: 'John D.',
                location: 'Cape Town',
              },
              {
                image: GALLERY_IMAGES.VASE,
                title: 'Custom Vase',
                creator: 'Sarah M.',
                location: 'Johannesburg',
              },
              {
                image: GALLERY_IMAGES.MECHANICAL,
                title: 'Mechanical Parts',
                creator: 'Mike R.',
                location: 'Durban',
              },
            ].map((print, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={print.image}
                      alt={print.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{print.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">by {print.creator}</p>
                      <span className="text-sm text-primary">{print.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/gallery">
              <Button size="lg" variant="outline">
                View Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${GALLERY_IMAGES.PROTOTYPE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Printing?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our community of makers and bring your ideas to life. Get started today and experience the future of 3D printing in South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-print">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/gallery">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  View Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}