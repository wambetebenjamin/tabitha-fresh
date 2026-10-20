export type ServiceIconKey =
  | "shirt"
  | "shield"
  | "flame"
  | "bed"
  | "footprints"
  | "zap";

export interface ServicePriceRow {
  item: string;
  unit: string;
  priceKes: number;
  notes: string;
}

export interface LaundryServiceItem {
  id: string;
  slug: string;
  name: string;
  shortTagline: string;
  description: string;
  startingPriceKes: number;
  startingPriceLabel: string;
  unitLabel: string;
  defaultQuantity: number;
  turnaround: string;
  isExpress?: boolean;
  iconKey: ServiceIconKey;
  image: string;
  imageAlt: string;
  processSteps: string[];
  priceBreakdown: ServicePriceRow[];
}

export const LAUNDRY_SERVICES: LaundryServiceItem[] = [
  {
    id: "wash-and-fold",
    slug: "wash-and-fold",
    name: "Wash and Fold",
    shortTagline: "Everyday wardrobe sorted, washed, dried, and crisply folded.",
    description:
      "Ideal for everyday t-shirts, jeans, khakis, gym wear, children's clothing, towels, and household linens. Every load is sorted into whites, lights, and darks, washed in gentle pH-balanced detergent at care-label temperature, tumble-dried softly, and folded ready for your wardrobe.",
    startingPriceKes: 350,
    startingPriceLabel: "From KES 350 / kg",
    unitLabel: "kg",
    defaultQuantity: 4,
    turnaround: "24 Hours Standard",
    iconKey: "shirt",
    image: "/images/service-wash-fold.jpg",
    imageAlt: "Neatly stacked fresh clean towels on a bright minimalist stool",
    processSteps: [
      "Doorstep bag collection, weigh-in verification, and digital tag assignment.",
      "Pocket check, stain pre-spotting, and separation of whites, lights, and darks.",
      "Gentle machine wash with fabric-safe detergent and low-heat tumble drying.",
      "Crisp hand folding into breathable protective wraps for next-day return.",
    ],
    priceBreakdown: [
      {
        item: "Everyday Mixed Wash and Fold",
        unit: "Per kg",
        priceKes: 350,
        notes: "Sorted whites and colours, folded crisp",
      },
      {
        item: "Whites Only Bright Care Wash",
        unit: "Per kg",
        priceKes: 420,
        notes: "Optical-safe oxygen whitening with zero harsh bleach",
      },
      {
        item: "Baby and Sensitive Skin Laundry",
        unit: "Per kg",
        priceKes: 450,
        notes: "Fragrance-free hypoallergenic detergent rinse",
      },
      {
        item: "Household Towels and Bathrobes",
        unit: "Per kg",
        priceKes: 380,
        notes: "Extra rinse cycle for soft absorbent fibres",
      },
    ],
  },
  {
    id: "dry-cleaning",
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    shortTagline: "Solvent-safe specialist care for suits, silk, wool, and occasion wear.",
    description:
      "Tailored suits, structured blazers, silk dresses, wool coats, pleated skirts, and ceremonial attire cleaned with gentle eco-solvent technology. Each garment is individually inspected, spot-treated, cleaned according to its care label, hand-finished on steam forms, and returned on a contoured hanger.",
    startingPriceKes: 500,
    startingPriceLabel: "From KES 500 / item",
    unitLabel: "item",
    defaultQuantity: 2,
    turnaround: "24 to 36 Hours",
    iconKey: "shield",
    image: "/images/service-dry-cleaning.jpg",
    imageAlt: "Clean wooden garment hangers arranged on a bright rail",
    processSteps: [
      "Individual barcode tagging, button check, and care-label inspection.",
      "Targeted treatment of collar oils, makeup marks, and food stains.",
      "Gentle non-chlorinated dry cleaning cycle that protects structure and dye.",
      "Hand steam pressing, lint removal, and breathable garment bag packaging.",
    ],
    priceBreakdown: [
      {
        item: "Dress Shirt or Silk Blouse",
        unit: "Per item",
        priceKes: 500,
        notes: "Collar and cuff care, returned on hanger",
      },
      {
        item: "Suit Trousers or Tailored Skirt",
        unit: "Per item",
        priceKes: 550,
        notes: "Crisp crease line without fabric shine",
      },
      {
        item: "Suit Jacket or Structured Blazer",
        unit: "Per item",
        priceKes: 650,
        notes: "Canvas and lapel shape preserved",
      },
      {
        item: "Two-Piece Business Suit",
        unit: "Per set",
        priceKes: 1100,
        notes: "Jacket and trousers cleaned and pressed together",
      },
      {
        item: "Evening Gown, Kitenge Set, or Overcoat",
        unit: "Per item",
        priceKes: 1350,
        notes: "Delicate trim protection and full-length bag",
      },
    ],
  },
  {
    id: "ironing-only",
    slug: "ironing-only",
    name: "Ironing Only",
    shortTagline: "Already washed at home? Send clothes in for crisp steam pressing.",
    description:
      "Save hours every Sunday evening. Hand over freshly washed shirts, school uniforms, trousers, dresses, and linen outfits, and our pressing specialists steam-finish every seam and collar using temperature-calibrated irons, returning garments folded or hung per your preference.",
    startingPriceKes: 120,
    startingPriceLabel: "From KES 120 / piece",
    unitLabel: "piece",
    defaultQuantity: 8,
    turnaround: "24 Hours Standard",
    iconKey: "flame",
    image: "/images/service-ironing.jpg",
    imageAlt: "Freshly ironed crisp white shirts hanging beside an ironing board",
    processSteps: [
      "Piece count verification and sorting by fabric heat tolerance.",
      "Filtered steam pressing with anti-shine shoe plate protection.",
      "Optional light starch finish on cotton collars and cuffs upon request.",
      "Returned neatly hung on hangers or flat-folded to your preference.",
    ],
    priceBreakdown: [
      {
        item: "Office Shirt, Blouse, or T-Shirt",
        unit: "Per piece",
        priceKes: 120,
        notes: "Hung or folded crisp",
      },
      {
        item: "Trousers, Chinos, or School Uniform",
        unit: "Per piece",
        priceKes: 130,
        notes: "Sharp crease or flat-front press",
      },
      {
        item: "Dress, Kanzu, or Linen Outfit",
        unit: "Per piece",
        priceKes: 200,
        notes: "Full-length steam finish",
      },
      {
        item: "Bedsheet Set (Flat, Fitted, 2 Pillowcases)",
        unit: "Per set",
        priceKes: 350,
        notes: "Hotel-grade crisp fold",
      },
    ],
  },
  {
    id: "duvet-and-bedding",
    slug: "duvet-and-bedding",
    name: "Duvet and Bedding",
    shortTagline: "Deep hygienic wash and thorough drying for bulky duvets and blankets.",
    description:
      "Home washing machines struggle with heavy king-size duvets and thick blankets. Our high-capacity commercial drums deep-clean down, microfibre, cotton, and fleece bedding at dust-mite-eliminating cycles, then dry every layer completely so your bedding smells sun-fresh.",
    startingPriceKes: 1200,
    startingPriceLabel: "From KES 1,200 / item",
    unitLabel: "item",
    defaultQuantity: 1,
    turnaround: "24 Hours Standard",
    iconKey: "bed",
    image: "/images/service-duvet-bedding.jpg",
    imageAlt: "Fresh clean white pillows and duvet bedding in a sunlit bedroom",
    processSteps: [
      "Inspection of filling type (feather down, hollowfibre, wool, or cotton quilt).",
      "High-volume antibacterial wash in dedicated large-drum extractors.",
      "Multi-stage moisture-sensor drying for loft restoration with zero dampness.",
      "Packed in a clean zip storage bag ready to place straight onto your bed.",
    ],
    priceBreakdown: [
      {
        item: "Single or Double Duvet (4x6 / 5x6)",
        unit: "Per item",
        priceKes: 1200,
        notes: "Includes zip storage carrier bag",
      },
      {
        item: "Queen or King Duvet (6x6)",
        unit: "Per item",
        priceKes: 1500,
        notes: "Deep hygienic wash and full loft dry",
      },
      {
        item: "Super King or Feather Down Duvet",
        unit: "Per item",
        priceKes: 1850,
        notes: "Gentle down-safe detergent and low-heat dry",
      },
      {
        item: "Heavy Mink Blanket or Throw",
        unit: "Per item",
        priceKes: 1100,
        notes: "Softening rinse included",
      },
      {
        item: "Complete Bedsheet and Duvet Cover Set",
        unit: "Per set",
        priceKes: 650,
        notes: "Washed, pressed, and folded crisp",
      },
    ],
  },
  {
    id: "shoe-cleaning",
    slug: "shoe-cleaning",
    name: "Shoe Cleaning",
    shortTagline: "Hand-brushed sneaker, suede, canvas, and leather footwear restoration.",
    description:
      "Nairobi dust and rainy commutes take a toll on favourite footwear. Our shoe care technicians hand-clean uppers, midsoles, laces, and insoles using material-specific brushes and pH-neutral foams, followed by ozone deodorizing and controlled air drying.",
    startingPriceKes: 600,
    startingPriceLabel: "From KES 600 / pair",
    unitLabel: "pair",
    defaultQuantity: 2,
    turnaround: "24 to 36 Hours",
    iconKey: "footprints",
    image: "/images/service-shoe-cleaning.jpg",
    imageAlt: "Clean white sneakers with specialist footwear cleaner bottle",
    processSteps: [
      "Lace removal, dry dust brushing, and material test on upper panels.",
      "Hand scrub of midsoles, uppers, and removable insoles with gentle foam.",
      "Antibacterial interior deodorizing and room-temperature air drying.",
      "Shoe-tree shaping, lace re-threading, and protective tissue wrap.",
    ],
    priceBreakdown: [
      {
        item: "Canvas Sneakers and Everyday Trainers",
        unit: "Per pair",
        priceKes: 600,
        notes: "Upper, midsole, laces, and insole refresh",
      },
      {
        item: "White Leather or Mesh Running Shoes",
        unit: "Per pair",
        priceKes: 750,
        notes: "Deep midsole brightening and conditioning",
      },
      {
        item: "Suede, Nubuck, or Designer Sneakers",
        unit: "Per pair",
        priceKes: 950,
        notes: "Dry suede eraser, nap brush, and water-repellent mist",
      },
      {
        item: "Formal Leather Shoes or Ankle Boots",
        unit: "Per pair",
        priceKes: 800,
        notes: "Clean, nourishing cream polish, and buff",
      },
    ],
  },
  {
    id: "express-service",
    slug: "express-service",
    name: "Express Service (same day)",
    shortTagline: "Morning pickup, priority cleaning, and doorstep return the very same day.",
    description:
      "Flying out tonight or preparing for an urgent morning meeting? Book Express Service before 11:00 AM anywhere in our Nairobi coverage zones. A dedicated rider collects immediately, your load jumps straight into a priority drum and press line, and fresh clothes return in 6 to 8 hours.",
    startingPriceKes: 550,
    startingPriceLabel: "From KES 550 / kg",
    unitLabel: "kg",
    defaultQuantity: 3,
    turnaround: "Same Day (6 to 8 Hours)",
    isExpress: true,
    iconKey: "zap",
    image: "/images/service-express.jpg",
    imageAlt: "Modern clean front-load washing machine with freshly rolled towels on top",
    processSteps: [
      "Priority rider dispatch within 45 minutes of booking confirmation.",
      "Dedicated single-client wash or dry-clean queue with zero waiting time.",
      "Express steam finishing and quality inspection by our shift lead.",
      "Direct same-day courier return with live WhatsApp arrival alert.",
    ],
    priceBreakdown: [
      {
        item: "Express Same-Day Wash and Fold",
        unit: "Per kg",
        priceKes: 550,
        notes: "Book by 11:00 AM for evening doorstep return",
      },
      {
        item: "Express Same-Day Shirt or Blouse Press",
        unit: "Per piece",
        priceKes: 200,
        notes: "Crisp steam press returned on hanger",
      },
      {
        item: "Express Same-Day Two-Piece Suit Dry Clean",
        unit: "Per set",
        priceKes: 1650,
        notes: "6-hour turnaround for urgent events and travel",
      },
      {
        item: "Express Same-Day Single Dress or Blazer",
        unit: "Per item",
        priceKes: 950,
        notes: "Priority solvent care and hand finish",
      },
    ],
  },
];

export interface PricingTabDefinition {
  key: string;
  label: string;
  subtitle: string;
  serviceSlug: string;
  rows: ServicePriceRow[];
}

export const PRICING_TABS: PricingTabDefinition[] = [
  {
    key: "wash-and-fold",
    label: "Wash and Fold",
    subtitle: "Priced transparently by weight after dry sorting. Free Nairobi pickup and delivery on orders from KES 1,000.",
    serviceSlug: "wash-and-fold",
    rows: LAUNDRY_SERVICES[0].priceBreakdown,
  },
  {
    key: "dry-cleaning",
    label: "Dry Cleaning",
    subtitle: "Per-garment specialist cleaning, hand steam finishing, and protective hanger bag included.",
    serviceSlug: "dry-cleaning",
    rows: LAUNDRY_SERVICES[1].priceBreakdown,
  },
  {
    key: "ironing",
    label: "Ironing",
    subtitle: "Crisp temperature-controlled steam pressing for clean home-washed garments.",
    serviceSlug: "ironing-only",
    rows: LAUNDRY_SERVICES[2].priceBreakdown,
  },
  {
    key: "bedding",
    label: "Bedding",
    subtitle: "Commercial deep wash and moisture-sensor drying for duvets, quilts, blankets, and sheet sets.",
    serviceSlug: "duvet-and-bedding",
    rows: LAUNDRY_SERVICES[3].priceBreakdown,
  },
  {
    key: "shoes",
    label: "Shoes",
    subtitle: "Hand-cleaned sneakers, suede footwear, leather brogues, and athletic trainers.",
    serviceSlug: "shoe-cleaning",
    rows: LAUNDRY_SERVICES[4].priceBreakdown,
  },
  {
    key: "express",
    label: "Express",
    subtitle: "Same-day 6 to 8 hour turnaround across Nairobi when scheduled before 11:00 AM.",
    serviceSlug: "express-service",
    rows: LAUNDRY_SERVICES[5].priceBreakdown,
  },
];

export const HOME_PRICING_OVERVIEW = [
  {
    category: "Wash and Fold",
    billingBasis: "Per kilogram (kg)",
    rate: "KES 350 / kg",
    includes: "Sorted whites and colours, gentle wash, soft dry, neat fold",
    serviceSlug: "wash-and-fold",
  },
  {
    category: "Dry Cleaning",
    billingBasis: "Per garment item",
    rate: "KES 500 / item",
    includes: "Stain treatment, eco-solvent clean, steam press on hanger",
    serviceSlug: "dry-cleaning",
  },
  {
    category: "Ironing Only",
    billingBasis: "Per garment piece",
    rate: "KES 120 / piece",
    includes: "Steam press, optional collar crispness, hung or folded",
    serviceSlug: "ironing-only",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: "01",
    title: "Schedule Pickup",
    description:
      "Pick your laundry services and choose a convenient doorstep collection slot online in under two minutes.",
  },
  {
    stepNumber: "02",
    title: "We Collect From Your Door",
    description:
      "A uniformed Tabitha Fresh rider arrives at your home or office, bags your items, and logs your tracking reference.",
  },
  {
    stepNumber: "03",
    title: "We Clean and Fold",
    description:
      "Every garment is sorted by colour and care label, washed, pressed, or dry cleaned, then folded crisp.",
  },
  {
    stepNumber: "04",
    title: "We Deliver Back Within 24 Hours",
    description:
      "Fresh, neatly wrapped laundry is delivered back to your door within 24 hours, with smooth M-Pesa payment.",
  },
] as const;

export const WHY_TABITHA_FRESH = [
  {
    title: "Free Pickup and Delivery",
    description:
      "Door-to-door collection and return at zero extra rider charge across all listed Nairobi neighbourhoods on standard orders.",
  },
  {
    title: "24-Hour Standard Turnaround",
    description:
      "Picked up today, delivered fresh tomorrow as standard, with 6 to 8 hour Same-Day Express available whenever urgency strikes.",
  },
  {
    title: "Item Tracking",
    description:
      "Follow every stage live online from Pickup Scheduled and Collected right through to Being Cleaned and Out for Delivery.",
  },
  {
    title: "Care Label Respected",
    description:
      "Our garment team checks every care label before washing so wool, linen, silk, and structured tailoring stay looking new.",
  },
  {
    title: "Satisfaction Guarantee",
    description:
      "Not 100% pleased with any garment? Tell us within 48 hours of delivery and we will re-clean and press it free of charge.",
  },
] as const;

export const COVERAGE_ZONES: string[] = [
  "Westlands",
  "Kilimani",
  "Kileleshwa",
  "Lavington",
  "Karen",
  "Langata",
  "South B",
  "South C",
  "Upper Hill",
  "Parklands",
  "Riverside",
  "Hurlingham",
  "Ngong Road",
  "Runda",
  "Gigiri",
  "Muthaiga",
  "Kasarani",
  "Roysambu",
  "Ruaka",
  "Syokimau",
  "Embakasi",
  "Nairobi CBD",
];

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  roleAndArea: string;
  avatar: string;
  avatarAlt: string;
}

export const CUSTOMER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "wambui-kilimani",
    quote:
      "Tabitha Fresh completely reclaimed my weekends. Their rider collects from my apartment in Kilimani every Friday morning and my work blazers, shirts, and duvets come back crisp by Saturday morning.",
    name: "Wambui Njoroge",
    roleAndArea: "Product Manager, Kilimani",
    avatar: "/images/customer-nairobi-1.jpg",
    avatarAlt: "Portrait of Wambui Njoroge smiling in Nairobi",
  },
  {
    id: "achieng-westlands",
    quote:
      "Running three short-stay apartments in Westlands requires spotless white sheets every single day. Their 24-hour turnaround, bulk discount, and live tracking keep every guest check-in stress free.",
    name: "Mercy Achieng",
    roleAndArea: "Hospitality Host, Westlands",
    avatar: "/images/customer-nairobi-2.jpg",
    avatarAlt: "Portrait of Mercy Achieng smiling outdoors",
  },
  {
    id: "kamau-upperhill",
    quote:
      "I booked Express Service at 9 AM before an evening flight to Kigali. My two suits and four cotton shirts were cleaned, pressed, and back at my Upper Hill office by 4 PM, paid via M-Pesa.",
    name: "Daniel Kamau",
    roleAndArea: "Legal Counsel, Upper Hill",
    avatar: "/images/customer-nairobi-3.jpg",
    avatarAlt: "Portrait of Daniel Kamau smiling",
  },
];

export const MINIMUM_ORDER_NOTE =
  "Minimum order for free Nairobi doorstep pickup and delivery is KES 1,000 (approximately 3 kg of Wash and Fold). Smaller loads are welcome and billed at the KES 1,000 minimum.";

export const BULK_DISCOUNT_NOTE =
  "Bulk and recurring discounts: save 10% automatically on single laundry loads above 15 kg, and 15% on monthly household, Airbnb, salon, clinic, or corporate plans exceeding 50 kg.";
