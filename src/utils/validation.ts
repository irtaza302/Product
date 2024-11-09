import { ShippingDetails } from "../types";

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateShippingDetails = (details: ShippingDetails): string[] => {
  const errors: string[] = [];
  if (!details.fullName.trim()) errors.push('Full name is required');
  if (!details.address.trim()) errors.push('Address is required');
  if (!details.city.trim()) errors.push('City is required');
  if (!details.postalCode.trim()) errors.push('Postal code is required');
  if (!details.country.trim()) errors.push('Country is required');
  return errors;
}; 