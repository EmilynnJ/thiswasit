import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Mock Data
  const mockProducts = [
    // Digital
    { id: 'prod_digital_1', name: 'Cosmic Alignment Meditation', description: 'A guided meditation to help you align with cosmic energies.', price: 12.99, product_type: 'DIGITAL', author: 'Mystic Luna' },
    { id: 'prod_digital_2', name: 'Chakra Balancing Guide', description: 'Comprehensive digital guide to balance your chakras.', price: 19.99, product_type: 'DIGITAL', author: 'Celestial Sage' },
    { id: 'prod_digital_3', name: 'Tarot Interpretation Handbook', description: 'Learn to interpret tarot cards with this detailed handbook.', price: 24.99, product_type: 'DIGITAL', author: 'Aura Whisperer' },
    // Physical
    { id: 'prod_physical_1', name: 'Crystal Healing Set', description: 'Set of 7 healing crystals for chakra alignment.', price: 49.99, product_type: 'PHYSICAL' },
    { id: 'prod_physical_2', name: 'Celestial Tarot Deck', description: 'Hand-illustrated tarot deck with cosmic imagery.', price: 34.99, product_type: 'PHYSICAL' },
    { id: 'prod_physical_3', name: 'Aura Cleansing Incense Bundle', description: 'Premium incense sticks for cleansing your space.', price: 18.99, product_type: 'PHYSICAL' },
    // Services
    { id: 'prod_service_1', name: 'Personalized Birth Chart Analysis', description: 'Detailed analysis of your astrological birth chart.', price: 79.99, product_type: 'SERVICE', author: 'Mystic Luna' },
    { id: 'prod_service_2', name: 'Past Life Regression Session', description: 'Guided session to explore your past lives.', price: 129.99, product_type: 'SERVICE', author: 'Cosmic Guide' },
    { id: 'prod_service_3', name: '30-Day Spiritual Development Course', description: 'Structured course to develop your spiritual abilities.', price: 199.99, product_type: 'SERVICE', author: 'Celestial Sage' },
  ];

  return NextResponse.json(mockProducts);
}
