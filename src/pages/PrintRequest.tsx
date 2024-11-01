import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function PrintRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    budget: '',
    description: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Print request submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      budget: '',
      description: '',
      file: null,
    });
  };

  return (
    <div className="section-padding min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Upload className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-950">Request a Print</h1>
          <p className="text-xl text-primary-800 max-w-2xl mx-auto">
            Upload your 3D model or describe what you need printed, and we'll connect you with the perfect printer in your area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-primary-900">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-primary-900">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-primary-900">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+27"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="location" className="text-primary-900">Delivery Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 h-4 w-4 text-primary-500" />
                  <Input
                    id="location"
                    className="pl-10 h-12"
                    placeholder="City, Province"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="budget" className="text-primary-900">Budget Range</Label>
              <div className="relative">
                <CircleDollarSign className="absolute left-3 top-4 h-4 w-4 text-primary-500" />
                <Input
                  id="budget"
                  className="pl-10 h-12"
                  placeholder="Budget in ZAR"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">Approximate budget in South African Rand (ZAR)</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-primary-900">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you need printed, including any specific requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[120px] resize-none"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="file" className="text-primary-900">Upload 3D Model or Reference Image</Label>
              <div className="border-2 border-dashed border-primary-200 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <Input
                  id="file"
                  type="file"
                  accept=".stl,.obj,.3mf,.jpg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-primary-500" />
                  <span className="text-primary-900 font-medium">Click to upload or drag and drop</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supported formats: STL, OBJ, 3MF, JPG, PNG
                  </p>
                </label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-lg bg-primary-600 hover:bg-primary-700">
              <Upload className="mr-2 h-5 w-5" />
              Submit Print Request
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}