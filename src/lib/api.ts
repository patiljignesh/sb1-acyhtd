import { supabase } from './supabase';
import type { User, Printer, PrintRequest, PrintOffer } from '@/types/database';

// User Management
export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Printer Management
export async function registerPrinter(printerData: Partial<Printer>) {
  const { data, error } = await supabase
    .from('printers')
    .insert([printerData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getPrinters() {
  const { data, error } = await supabase
    .from('printers')
    .select(`
      *,
      users (
        name,
        location
      )
    `);
  
  if (error) throw error;
  return data;
}

// Print Requests
export async function createPrintRequest(requestData: Partial<PrintRequest>) {
  const { data, error } = await supabase
    .from('print_requests')
    .insert([requestData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getPrintRequests() {
  const { data, error } = await supabase
    .from('print_requests')
    .select(`
      *,
      users (
        name,
        location
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getPrintRequestById(id: string) {
  const { data, error } = await supabase
    .from('print_requests')
    .select(`
      *,
      users (
        name,
        location
      ),
      print_offers (
        *,
        printers (
          *,
          users (
            name,
            location
          )
        )
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Print Offers
export async function createPrintOffer(offerData: Partial<PrintOffer>) {
  const { data, error } = await supabase
    .from('print_offers')
    .insert([offerData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateOfferStatus(offerId: string, status: PrintOffer['status']) {
  const { data, error } = await supabase
    .from('print_offers')
    .update({ status })
    .eq('id', offerId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// File Storage
export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase
    .storage
    .from('print-files')
    .upload(path, file);
  
  if (error) throw error;
  return data;
}

export async function getFileUrl(path: string) {
  const { data } = supabase
    .storage
    .from('print-files')
    .getPublicUrl(path);
  
  return data.publicUrl;
}