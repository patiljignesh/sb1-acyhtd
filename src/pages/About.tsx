import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Printer, Users, Clock, Shield, ArrowRight, Upload, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1631558986183-9e27f1578d31?w=1200&q=80')`,
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About 3D Print Hub</h1>
              <p className="text-xl opacity-90">
                We're building South Africa's largest community of 3D printer owners and users, making 3D printing accessible to everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Users className="w-12 h-12 text-primary shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Our Community</h3>
                      <p className="text-muted-foreground mb-6">
                        Join thousands of printer owners and users across South Africa who are already part of our growing network. Share knowledge, collaborate on projects, and help others bring their ideas to life.
                      </p>
                      <Link to="/register-printer">
                        <Button variant="outline">
                          Join as Printer Owner
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Printer className="w-12 h-12 text-primary shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Quality Printing</h3>
                      <p className="text-muted-foreground mb-6">
                        Our platform connects you with experienced printer owners who maintain high-quality standards and use professional-grade equipment. Every print is backed by our quality guarantee.
                      </p>
                      <Link to="/gallery">
                        <Button variant="outline">
                          View Print Gallery
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <MapPin className="w-12 h-12 text-primary shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Local Network</h3>
                      <p className="text-muted-foreground mb-6">
                        Get your prints faster by connecting with local printer owners. Our platform helps you find the nearest available printer for your needs across South Africa.
                      </p>
                      <Link to="/request-print">
                        <Button variant="outline">
                          Find Local Printers
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Shield className="w-12 h-12 text-primary shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Secure Platform</h3>
                      <p className="text-muted-foreground mb-6">
                        Your safety is our priority. We verify all printer owners and implement secure payment systems to ensure a trustworthy experience for everyone.
                      </p>
                      <Link to="/contact">
                        <Button variant="outline">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community today and experience the future of 3D printing in South Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-print">
                <Button size="lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Request a Print
                </Button>
              </Link>
              <Link to="/register-printer">
                <Button size="lg" variant="outline">
                  <Printer className="mr-2 h-5 w-5" />
                  Register Your Printer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}