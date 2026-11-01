"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Heart,
  Menu as MenuIcon,
  X,
  CheckCircle2,
  ChevronRight,
  Send,
  Flame,
  Award,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: "all" | "chai" | "brews" | "eats";
  description: string;
  image: string;
  tag?: string;
  rating: number;
  calories?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "karak-chai",
    name: "Karak Chai",
    price: 250,
    category: "chai",
    description:
      "Signature strong black tea slow-simmered with crushed green cardamom, cinnamon quills, and velvety creamy milk.",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    tag: "Bestseller 🔥",
    rating: 5,
    calories: "140 kcal",
  },
  {
    id: "zafrani-chai",
    name: "Zafrani Chai",
    price: 320,
    category: "chai",
    description:
      "Royal Kashmiri saffron threads steeped in rich aromatic tea, garnished with crushed almonds and pistachios.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    tag: "Chef Special ✨",
    rating: 5,
    calories: "165 kcal",
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    price: 350,
    category: "brews",
    description:
      "Creamy, frost-chilled artisanal espresso blend swirled with rich whole milk, vanilla essence, and dark chocolate drizzle.",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    tag: "Chilled Favorite ❄️",
    rating: 5,
    calories: "210 kcal",
  },
  {
    id: "club-sandwich",
    name: "Club Sandwich",
    price: 550,
    category: "eats",
    description:
      "Triple-decker toasted bread filled with shredded seasoned chicken, sharp cheddar cheese, fried egg, lettuce, and secret garlic mayo.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    tag: "Crowd Favorite 🥪",
    rating: 5,
    calories: "480 kcal",
  },
  {
    id: "brownie",
    name: "Brownie",
    price: 400,
    category: "eats",
    description:
      "Decadent warm Belgian fudge brownie with a gooey molten center, finished with warm chocolate ganache and chocolate curls.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    tag: "Sweet Delight 🍫",
    rating: 5,
    calories: "340 kcal",
  },
  {
    id: "fries",
    name: "Fries",
    price: 450,
    category: "eats",
    description:
      "Hand-cut golden russet potato fries tossed in our signature smoky peri-peri spice dust, served hot with herb dip.",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    tag: "Crispy & Hot 🍟",
    rating: 5,
    calories: "320 kcal",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ayesha Khan",
    handle: "@ayesha_eats",
    role: "Regular Chai Enthusiast",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The Karak Chai here took me straight to chai paradise! Perfect balance of cardamom and creaminess. And pairing it with their warm chocolate brownie? Absolutely heavenly.",
    favorite: "Ordered Karak Chai + Brownie",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    handle: "@bilal_designs",
    role: "Digital Nomad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "My absolute favorite spot to relax, work on my laptop, and unwind. The Zafrani Chai is royal, authentic, and rich with saffron aromas. The ambient warm lighting makes it unmatched.",
    favorite: "Ordered Zafrani Chai",
  },
  {
    id: 3,
    name: "Sarah Tariq",
    handle: "@sarahtariq",
    role: "Food & Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The Club Sandwich is legitimately one of the crispiest, juiciest in the city, and the Cold Coffee is perfectly balanced. Friendly staff and gorgeous cozy interior. 10/10 recommend!",
    favorite: "Ordered Club Sandwich + Cold Coffee",
  },
];

const FEATURES = [
  {
    icon: Flame,
    title: "Slow-Simmered Brews",
    desc: "Every kettle is brewed the traditional way with whole spices, never rushed, for that deep velvety flavor.",
  },
  {
    icon: Award,
    title: "Artisanal Ingredients",
    desc: "Farm-fresh dairy, hand-picked saffron filaments, and organic spice blends sourced directly from origin.",
  },
  {
    icon: Coffee,
    title: "Cozy Aesthetic Vibes",
    desc: "Warm ambient lights, calming acoustic tunes, plush seating, and books to make you feel right at home.",
  },
  {
    icon: ShieldCheck,
    title: "Crafted Fresh Everyday",
    desc: "From crispy hand-cut peri fries to our molten fudge brownies, baked fresh every single morning.",
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Items" },
  { id: "chai", label: "Chai Specials" },
  { id: "brews", label: "Brews & Coffee" },
  { id: "eats", label: "Bites & Treats" },
] as const;

const SOCIAL_LINKS = [
  { name: "Instagram", label: "IG" },
  { name: "Facebook", label: "FB" },
  { name: "Twitter", label: "TW" },
  { name: "WhatsApp", label: "WA" },
];

export default function ChaiAndChillCafe() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "chai" | "brews" | "eats">("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    message: "",
  });

  const menuList = Array.isArray(MENU_ITEMS) ? MENU_ITEMS : [];
  const reviewsList = Array.isArray(REVIEWS) ? REVIEWS : [];
  const featuresList = Array.isArray(FEATURES) ? FEATURES : [];
  const tabsList = Array.isArray(CATEGORY_TABS) ? CATEGORY_TABS : [];
  const socialsList = Array.isArray(SOCIAL_LINKS) ? SOCIAL_LINKS : [];

  const filteredItems =
    activeCategory === "all"
      ? menuList
      : menuList.filter((item) => item?.category === activeCategory);

  const safeFilteredItems = Array.isArray(filteredItems) ? filteredItems : [];

  const cartValues = Object.values(cart || {});
  const totalCartCount = cartValues.length > 0 ? cartValues.reduce((a, b) => (a || 0) + (b || 0), 0) : 0;
  
  const totalCartPrice = Object.entries(cart || {}).reduce((sum, [id, qty]) => {
    const item = menuList.find((m) => m?.id === id);
    return sum + (item ? (item.price || 0) * (qty || 0) : 0);
  }, 0);

  const addToCart = (item: MenuItem) => {
    if (!item?.id) return;
    setCart((prev) => ({
      ...(prev || {}),
      [item.id]: ((prev && prev[item.id]) || 0) + 1,
    }));
    triggerToast(`Added ${item.name} to order!`);
  };

  const removeFromCart = (itemId: string) => {
    if (!itemId) return;
    setCart((prev) => {
      const copy = { ...(prev || {}) };
      if ((copy[itemId] || 0) > 1) {
        copy[itemId] -= 1;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    triggerToast("Thank you! Your reservation has been received.");
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "2",
        message: "",
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2F1E14] selection:bg-[#9E6F45]/20 selection:text-[#492E1E]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-5 z-50 flex items-center gap-3 bg-[#492E1E] text-[#FFFDF9] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4B99D]/30 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#BC9671] flex items-center justify-center text-white font-bold text-sm">
              ✓
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#D4B99D] font-semibold">Chai & Chill</p>
              <p className="text-sm font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER & NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFFDF9]/90 border-b border-[#E6D6C3]/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#805434] to-[#492E1E] flex items-center justify-center text-white shadow-md shadow-[#805434]/20 group-hover:scale-105 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-[#FAF7F2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#492E1E] leading-none group-hover:text-[#805434] transition-colors">
                Chai & Chill
              </span>
              <span className="text-[11px] font-medium tracking-widest text-[#9E6F45] uppercase">
                Artisanal Cafe
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-sm font-medium text-[#492E1E] hover:text-[#9E6F45] transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-sm font-medium text-[#492E1E] hover:text-[#9E6F45] transition-colors"
            >
              Menu
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#492E1E] hover:text-[#9E6F45] transition-colors"
            >
              About Us
            </a>
            <a
              href="#reviews"
              className="text-sm font-medium text-[#492E1E] hover:text-[#9E6F45] transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[#492E1E] hover:text-[#9E6F45] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Button & Cart Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#menu"
              className="relative flex items-center gap-2 p-2.5 rounded-xl text-[#492E1E] hover:bg-[#F3ECE1] transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#805434]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#805434] text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[#492E1E] text-[#FFFDF9] hover:bg-[#633F28] shadow-md shadow-[#492E1E]/15 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#menu"
              className="relative p-2 rounded-xl text-[#492E1E] hover:bg-[#F3ECE1]"
            >
              <ShoppingBag className="w-6 h-6 text-[#805434]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#805434] text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#492E1E] hover:bg-[#F3ECE1] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-[#E6D6C3] bg-[#FFFDF9] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-base font-medium">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#492E1E] hover:text-[#9E6F45]"
                >
                  Home
                </a>
                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#492E1E] hover:text-[#9E6F45]"
                >
                  Menu
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#492E1E] hover:text-[#9E6F45]"
                >
                  About Us
                </a>
                <a
                  href="#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#492E1E] hover:text-[#9E6F45]"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#492E1E] hover:text-[#9E6F45]"
                >
                  Contact
                </a>
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#492E1E] text-white font-medium shadow-md"
                  >
                    Book a Table
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#F3ECE1]/80 to-[#FAF7F2]/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#D4B99D]/20 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3ECE1] border border-[#E6D6C3] text-[#805434] text-xs sm:text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-[#BC9671]" />
                <span>Brewed to Perfection Daily • 100% Whole Spices</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#2F1E14] tracking-tight leading-[1.1] mb-6">
                Best Chai <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#805434] via-[#9E6F45] to-[#D97706]">
                  in Town.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#633F28] mb-8 max-w-xl font-normal leading-relaxed">
                Step into <span className="font-semibold text-[#492E1E]">Chai & Chill</span> — where slow-simmered Karak tea meets warm ambient conversations. Sip our aromatic zafrani blends, savor freshly toasted snacks, and take a moment to unwind.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#492E1E] text-[#FFFDF9] font-semibold text-base shadow-xl shadow-[#492E1E]/20 hover:bg-[#633F28] transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FAF7F2] text-[#492E1E] border border-[#D4B99D] font-semibold text-base hover:bg-[#F3ECE1] transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <span>Reserve a Table</span>
                </a>
              </div>

              {/* Trust & Social Proof Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E6D6C3] w-full max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#492E1E]">15k+</p>
                  <p className="text-xs sm:text-sm text-[#805434] font-medium">Happy Chai Drinkers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#492E1E]">4.9 ★</p>
                  <p className="text-xs sm:text-sm text-[#805434] font-medium">1,200+ Reviews</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#492E1E]">100%</p>
                  <p className="text-xs sm:text-sm text-[#805434] font-medium">Pure Dairy & Spices</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Steaming Chai */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center items-center"
            >
              {/* Outer Glow Ring */}
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] ring-1 ring-[#D4B99D]/50 group">
                <Image
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85"
                  alt="Aromatic hot Karak Chai served in authentic tea glass"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F1E14]/70 via-transparent to-transparent" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md bg-[#FFFDF9]/90 border border-[#E6D6C3] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E6F45]">Signature Brew</span>
                    <h4 className="text-base font-bold text-[#492E1E]">Authentic Karak Chai</h4>
                    <p className="text-xs text-[#633F28]">Slow-boiled with cardamom</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#805434] block">Only</span>
                    <span className="text-lg font-black text-[#492E1E]">Rs 250</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Badge Top Right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-[#FAF7F2] border border-[#D4B99D] shadow-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#9E6F45] text-white flex items-center justify-center font-bold text-lg">
                  ☕
                </div>
                <div>
                  <div className="flex items-center text-amber-500 text-xs">
                    {"★★★★★"}
                  </div>
                  <p className="text-xs font-bold text-[#492E1E]">Lahore's #1 Spiced Chai</p>
                </div>
              </motion.div>

              {/* Floating Pill Badge Bottom Left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#492E1E] text-white rounded-2xl p-4 shadow-xl items-center gap-3 border border-[#805434]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#805434] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs text-[#D4B99D] font-medium">Freshly Brewed</p>
                  <p className="text-sm font-bold">Every 20 Minutes</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MENU SECTION */}
      <section id="menu" className="py-20 bg-[#FAF7F2]/60 border-y border-[#E6D6C3]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] text-[#805434] text-xs font-bold uppercase tracking-wider mb-3">
              Handcrafted Menu
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#2F1E14] tracking-tight mb-4">
              Explore Our Signature Delights
            </h2>
            <p className="text-base sm:text-lg text-[#633F28]">
              From rich saffron-infused chai to crunchy gourmet bites, every item is crafted with premium ingredients and unmatched passion.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === tab.id
                      ? "bg-[#492E1E] text-[#FFFDF9] shadow-md shadow-[#492E1E]/20 scale-105"
                      : "bg-[#FFFDF9] text-[#633F28] hover:bg-[#F3ECE1] border border-[#E6D6C3]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Menu Items Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {safeFilteredItems.map((item, index) => {
                const quantity = (cart && cart[item.id]) || 0;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    key={item.id}
                    className="group bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#E6D6C3] shadow-sm hover:shadow-xl hover:border-[#BC9671]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative h-60 w-full overflow-hidden bg-[#F3ECE1]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        
                        {/* Tag */}
                        {item.tag && (
                          <div className="absolute top-4 left-4 bg-[#FFFDF9]/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#492E1E] shadow-sm border border-[#E6D6C3]">
                            {item.tag}
                          </div>
                        )}

                        {/* Rating pill */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{item.rating || 5}</span>
                        </div>

                        {/* Calories info */}
                        {item.calories && (
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white/90 text-[11px] px-2.5 py-1 rounded-full">
                            {item.calories}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#2F1E14] group-hover:text-[#805434] transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xl font-extrabold text-[#805434] whitespace-nowrap">
                            Rs {item.price}
                          </span>
                        </div>
                        <p className="text-sm text-[#633F28] leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer / Add to Order Button */}
                    <div className="p-6 pt-0">
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-[#FAF7F2] text-[#492E1E] border border-[#D4B99D] hover:bg-[#492E1E] hover:text-[#FFFDF9] hover:border-[#492E1E] transition-all active:scale-[0.98]"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Order</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-[#F3ECE1] rounded-xl p-1.5 border border-[#D4B99D]">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#492E1E] shadow-sm hover:bg-[#FAF7F2] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="font-bold text-sm text-[#492E1E]">
                            {quantity} in Order (Rs {item.price * quantity})
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-9 h-9 rounded-lg bg-[#492E1E] text-white flex items-center justify-center shadow-sm hover:bg-[#633F28] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Cart Bottom Summary Bar when items selected */}
          {totalCartCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 bg-gradient-to-r from-[#492E1E] to-[#633F28] text-white p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#D4B99D]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#D4B99D]">Your Order Summary</p>
                  <p className="text-lg font-bold">
                    {totalCartCount} {totalCartCount === 1 ? "Item" : "Items"} • Total: Rs {totalCartPrice}
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FAF7F2] text-[#492E1E] font-bold text-sm hover:bg-white transition-all shadow-md"
              >
                <span>Proceed with Order</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. ABOUT US SECTION */}
      <section id="about" className="py-24 bg-[#FFFDF9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual collage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] ring-1 ring-[#D4B99D]/40">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
                  alt="Chai & Chill Cafe interior warm cozy aesthetic"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Inset overlay card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#492E1E] text-white p-6 rounded-3xl shadow-2xl max-w-xs border border-[#805434] hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#805434] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-300" />
                  </div>
                  <span className="font-bold text-sm">Brewed with Love</span>
                </div>
                <p className="text-xs text-[#D4B99D] leading-relaxed">
                  "Chai is not just tea; it’s an emotion, a conversation, and a warm hug in a cup."
                </p>
              </div>
            </motion.div>

            {/* Right Column: Narrative & Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] text-[#805434] text-xs font-bold uppercase tracking-wider mb-4">
                Our Story
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-[#2F1E14] tracking-tight leading-tight mb-6">
                Where Tradition Meets Modern Chill.
              </h2>

              <p className="text-base text-[#633F28] leading-relaxed mb-6">
                Founded with a simple devotion to the art of the perfect brew,{" "}
                <strong className="text-[#492E1E]">Chai & Chill Cafe</strong> began as a dream to revive authentic slow-cooked tea traditions in a modern, serene aesthetic sanctuary.
              </p>

              <p className="text-base text-[#633F28] leading-relaxed mb-8">
                Whether you’re catching up with old friends, diving into your favorite novel, or taking a much-needed break from the bustling city rush, our warm ambient spaces and rich aroma of cardamom and roasted beans provide the perfect haven.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {featuresList.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6D6C3] hover:border-[#BC9671] transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#F3ECE1] text-[#805434] flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#492E1E] mb-1">{feat.title}</h4>
                      <p className="text-xs text-[#633F28] leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-[#FAF7F2] border-y border-[#E6D6C3]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] text-[#805434] text-xs font-bold uppercase tracking-wider mb-3">
              Words From Our Guests
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#2F1E14] tracking-tight mb-4">
              Loved by Chai Lovers
            </h2>
            <p className="text-base text-[#633F28]">
              Hear what our community has to say about their cozy evenings, hot sips, and delicious bites at Chai & Chill.
            </p>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsList.map((rev, i) => (
              <motion.div
                key={rev?.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E6D6C3] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: rev?.rating || 5 }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-[#492E1E] leading-relaxed italic mb-6">
                    "{rev?.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6D6C3]/70">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#BC9671]">
                      <Image
                        src={rev?.avatar || ""}
                        alt={rev?.name || "Customer"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2F1E14]">{rev?.name}</h4>
                      <p className="text-xs text-[#9E6F45] font-medium">{rev?.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-[#805434] bg-[#F3ECE1] py-1 px-3 rounded-lg inline-block">
                    {rev?.favorite}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION & TABLE RESERVATION FORM */}
      <section id="contact" className="py-24 bg-[#FFFDF9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Contact details & Cafe info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] text-[#805434] text-xs font-bold uppercase tracking-wider mb-4">
                  Visit & Connect
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#2F1E14] tracking-tight mb-6">
                  Come Chill With Us.
                </h2>
                <p className="text-base text-[#633F28] leading-relaxed mb-8">
                  Whether you’re planning a cozy tea date, booking a table for your crew, or hosting an intimate get-together, we'd love to welcome you.
                </p>

                {/* Info Cards */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6D6C3]">
                    <div className="w-10 h-10 rounded-xl bg-[#805434] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#492E1E]">Our Location</h4>
                      <p className="text-xs sm:text-sm text-[#633F28]">
                        42 Gulberg Avenue, Near Main Boulevard, Lahore
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6D6C3]">
                    <div className="w-10 h-10 rounded-xl bg-[#805434] text-white flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#492E1E]">Cafe Hours</h4>
                      <p className="text-xs sm:text-sm text-[#633F28]">
                        Monday – Sunday: 10:00 AM – 1:00 AM (Midnight Chai)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6D6C3]">
                    <div className="w-10 h-10 rounded-xl bg-[#805434] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#492E1E]">Direct Line & WhatsApp</h4>
                      <p className="text-xs sm:text-sm text-[#633F28]">+92 300 1234567 / +92 42 35789000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6D6C3]">
                    <div className="w-10 h-10 rounded-xl bg-[#805434] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#492E1E]">Email Address</h4>
                      <p className="text-xs sm:text-sm text-[#633F28]">salam@chaiandchill.cafe</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact & Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#E6D6C3] shadow-lg">
                <h3 className="text-2xl font-bold text-[#2F1E14] mb-2">
                  Drop a Message or Reserve
                </h3>
                <p className="text-sm text-[#633F28] mb-8">
                  Fill in your details below and we will confirm your table and order right away.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-[#FFFDF9] border border-[#BC9671] text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#805434] text-white flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#FAF7F2]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#492E1E] mb-2">
                      Table Request Received!
                    </h4>
                    <p className="text-sm text-[#633F28] max-w-sm mx-auto">
                      Thank you, {formData.name || "friend"}! We have reserved your request and will reach out via WhatsApp/SMS shortly. See you for a fresh cup!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#492E1E] uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Daniyal Khan"
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E6D6C3] text-sm text-[#2F1E14] focus:outline-none focus:ring-2 focus:ring-[#805434] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#492E1E] uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="daniyal@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E6D6C3] text-sm text-[#2F1E14] focus:outline-none focus:ring-2 focus:ring-[#805434] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#492E1E] uppercase tracking-wider mb-2">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+92 300 0000000"
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E6D6C3] text-sm text-[#2F1E14] focus:outline-none focus:ring-2 focus:ring-[#805434] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#492E1E] uppercase tracking-wider mb-2">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({ ...formData, guests: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E6D6C3] text-sm text-[#2F1E14] focus:outline-none focus:ring-2 focus:ring-[#805434] transition-all"
                        >
                          <option value="1">1 Person (Quiet corner)</option>
                          <option value="2">2 Persons (Chai date)</option>
                          <option value="4">3 - 4 Persons (Friends table)</option>
                          <option value="6">5 - 8 Persons (Family gathering)</option>
                          <option value="10">8+ Persons (Event inquiry)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#492E1E] uppercase tracking-wider mb-2">
                        Message / Special Request
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us if you want outdoor seating, extra cardamom, or birthday decor..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E6D6C3] text-sm text-[#2F1E14] focus:outline-none focus:ring-2 focus:ring-[#805434] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base bg-[#492E1E] text-[#FFFDF9] hover:bg-[#633F28] shadow-lg shadow-[#492E1E]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Send Reservation & Message</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#2F1E14] text-[#FAF7F2] pt-16 pb-12 border-t border-[#492E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#492E1E]/80">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#805434] flex items-center justify-center text-white">
                  <Coffee className="w-5 h-5 text-[#FAF7F2]" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Chai & Chill
                </span>
              </div>
              <p className="text-sm text-[#D4B99D] leading-relaxed max-w-sm mb-6">
                Your neighborhood sanctuary for aromatic Karak Chai, rich Zafrani sips, chilled coffees, and cozy conversations.
              </p>
              <div className="flex items-center gap-3">
                {socialsList.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    title={social.name}
                    className="w-9 h-9 rounded-xl bg-[#492E1E] hover:bg-[#805434] flex items-center justify-center text-xs font-bold text-[#D4B99D] hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#BC9671] mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-sm text-[#D4B99D]">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Table Booking</a></li>
              </ul>
            </div>

            {/* Col 3: Popular Menu items */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#BC9671] mb-4">
                Popular Menu
              </h4>
              <ul className="space-y-2.5 text-sm text-[#D4B99D]">
                <li>Karak Chai (Rs 250)</li>
                <li>Zafrani Chai (Rs 320)</li>
                <li>Cold Coffee (Rs 350)</li>
                <li>Club Sandwich (Rs 550)</li>
                <li>Belgian Brownie (Rs 400)</li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#BC9671] mb-4">
                Chai Club Newsletter
              </h4>
              <p className="text-xs text-[#D4B99D] mb-3">
                Subscribe for weekend special discounts and secret off-menu items.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerToast("Subscribed to Chai Club!");
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A0F0A] border border-[#492E1E] text-xs text-white placeholder-[#805434] focus:outline-none focus:border-[#BC9671]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#805434] hover:bg-[#9E6F45] text-xs font-bold text-white transition-colors"
                >
                  Join the Club
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#805434] gap-4">
            <p>© {new Date().getFullYear()} Chai & Chill Cafe. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Chai Lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
