import type {RawListing} from "./types"

const MOCK_CATALOG: RawListing[] = [
  {
    title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    price: 298,
    originalPrice: 398,
    url: "https://www.amazon.com/dp/B09XS7JWHH",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXIzomnU8xITB-Ry3V1ZyzmhuqoZiV5zAWriJekJqD64bu0TnEljkc9exzMsY4slDIvkxDhrFqQWSEGCRXFAVpj5Ijh5fm7eLN0Du419Y-OBJFi7Lbzbm3TlFew2WExADT3yg1z6dSI_oMfFGH-iVc9DU2Otyat2cm9lIrtiwlcFi4n95jXGCeMbGzoINNMXOPK823pBu22SRiytmMAYtc-H1CjqQSBF7fXCbjyANjZYdIl7J7_J",
    site: "Amazon",
    description: "Industry-leading noise cancellation with Auto NC Optimizer",
  },
  {
    title: "Bose QuietComfort Ultra Headphones Spatial Audio",
    price: 329,
    originalPrice: 429,
    url: "https://www.ebay.com/itm/bose-qc-ultra-headphones-spatial-audio-123",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXIzomnU8xITB-Ry3V1ZyzmhuqoZiV5zAWriJekJqD64bu0TnEljkc9exzMsY4slDIvkxDhrFqQWSEGCRXFAVpj5Ijh5fm7eLN0Du419Y-OBJFi7Lbzbm3TlFew2WExADT3yg1z6dSI_oMfFGH-iVc9DU2Otyat2cm9lIrtiwlcFi4n95jXGCeMbGzoINNMXOPK823pBu22SRiytmMAYtc-H1CjqQSBF7fXCbjyANjZYdIl7J7_J",
    site: "eBay",
    description: "Immersive spatial audio with custom noise cancellation",
  },
  {
    title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    price: 199,
    originalPrice: 249,
    url: "https://www.walmart.com/ip/apple-airpods-pro-2nd-gen-456",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXIzomnU8xITB-Ry3V1ZyzmhuqoZiV5zAWriJekJqD64bu0TnEljkc9exzMsY4slDIvkxDhrFqQWSEGCRXFAVpj5Ijh5fm7eLN0Du419Y-OBJFi7Lbzbm3TlFew2WExADT3yg1z6dSI_oMfFGH-iVc9DU2Otyat2cm9lIrtiwlcFi4n95jXGCeMbGzoINNMXOPK823pBu22SRiytmMAYtc-H1CjqQSBF7fXCbjyANjZYdIl7J7_J",
    site: "Walmart",
    description: "Active noise cancellation with adaptive transparency",
  },
  {
    title: "Sennheiser Momentum 4 Wireless Headphones",
    price: 259,
    originalPrice: 349,
    url: "https://www.amazon.com/dp/B0BJLHS6XK",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkXIzomnU8xITB-Ry3V1ZyzmhuqoZiV5zAWriJekJqD64bu0TnEljkc9exzMsY4slDIvkxDhrFqQWSEGCRXFAVpj5Ijh5fm7eLN0Du419Y-OBJFi7Lbzbm3TlFew2WExADT3yg1z6dSI_oMfFGH-iVc9DU2Otyat2cm9lIrtiwlcFi4n95jXGCeMbGzoINNMXOPK823pBu22SRiytmMAYtc-H1CjqQSBF7fXCbjyANjZYdIl7J7_J",
    site: "Amazon",
    description: "60-hour battery life with exceptional sound quality",
  },
  {
    title: "Apple MacBook Air M2 13-inch 256GB Midnight",
    price: 999,
    originalPrice: 1199,
    url: "https://www.amazon.com/dp/B0B3C2R8MP",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    site: "Amazon",
    description: "Supercharged by M2 chip with 8-core CPU and 10-core GPU",
  },
  {
    title: "Dell XPS 13 Laptop Intel Core i7 16GB RAM 512GB SSD",
    price: 849,
    originalPrice: 1099,
    url: "https://www.ebay.com/itm/dell-xps-13-i7-16gb-512gb-789",
    thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    site: "eBay",
    description: "Ultra-portable laptop with InfinityEdge display",
  },
  {
    title: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
    price: 1099,
    originalPrice: 1299,
    url: "https://www.walmart.com/ip/samsung-galaxy-s24-ultra-256gb-999",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    site: "Walmart",
    description: "Galaxy AI with 200MP camera and S Pen",
  },
  {
    title: "Apple iPhone 15 Pro 128GB Natural Titanium",
    price: 899,
    originalPrice: 999,
    url: "https://www.amazon.com/dp/B0CM5JV268",
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    site: "Amazon",
    description: "A17 Pro chip with titanium design and Action button",
  },
  {
    title: "Sony PlayStation 5 Console Standard Edition",
    price: 499,
    originalPrice: 499,
    url: "https://www.ebay.com/itm/sony-playstation-5-console-456",
    thumbnail: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    site: "eBay",
    description: "Lightning speed with custom CPU and GPU",
  },
  {
    title: "Nintendo Switch OLED Model White",
    price: 349,
    originalPrice: 349,
    url: "https://www.walmart.com/ip/nintendo-switch-oled-white-123",
    thumbnail: "https://images.unsplash.com/photo-1578303518610-9cc1488066f9?w=400&h=400&fit=crop",
    site: "Walmart",
    description: "Vivid 7-inch OLED screen and wide adjustable stand",
  },
  {
    title: "Apple Watch Series 9 GPS 45mm Midnight",
    price: 329,
    originalPrice: 429,
    url: "https://www.amazon.com/dp/B0CHX9Q19Q",
    thumbnail: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=400&h=400&fit=crop",
    site: "Amazon",
    description: "S9 chip with brighter display and double tap gesture",
  },
  {
    title: "Bose QuietComfort Earbuds II True Wireless",
    price: 179,
    originalPrice: 299,
    url: "https://www.ebay.com/itm/bose-qc-earbuds-ii-true-wireless-789",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    site: "eBay",
    description: "Best-in-class noise cancellation in earbuds form",
  },
]

function scoreTitle(title: string, query: string): number {
  const t = title.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0
  if (t === q) return 100
  if (t.includes(q)) return 80
  const tokens = q.split(/\s+/).filter(Boolean)
  let hits = 0
  for (const tok of tokens) {
    if (tok.length > 2 && t.includes(tok)) hits += 1
  }
  return Math.round((hits / tokens.length) * 60)
}

export function getMockListings(query: string, siteFilter: string[]): RawListing[] {
  const filtered = MOCK_CATALOG.filter(
    (item) => siteFilter.length === 0 || siteFilter.includes(item.site.toLowerCase()),
  )
  if (!query.trim()) return filtered
  const scored = filtered
    .map((item) => ({item, score: scoreTitle(item.title, query)}))
    .sort((a, b) => b.score - a.score)
  const matched = scored.filter((s) => s.score > 0).map((s) => s.item)
  if (matched.length > 0) return matched
  return scored.slice(0, 6).map((s) => s.item)
}
