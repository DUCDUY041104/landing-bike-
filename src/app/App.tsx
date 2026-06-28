import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
// @ts-ignore
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import storeImg from "@/imports/z7966254845623_e4ff0bd06df05e58dd727a98a4cafbd9.jpg";
import bgHills from "@/assets/hills.webp";
import bgSky from "@/assets/sky.webp";
import { PartnerSection } from "@/app/components/PartnerSection";
import { WelcomeScreen } from "@/app/components/WelcomeScreen";

const ECO_SECTION_BG = {
  backgroundImage: `url(${bgHills})`,
  backgroundSize: "cover" as const,
  backgroundPosition: "center bottom" as const,
};
import {
  Menu, X, Phone, MapPin, Clock, Zap, Shield, Wrench,
  Plus, Edit2, Trash2, Search, Package, TrendingUp, Users,
  ChevronRight, LayoutDashboard, LogOut, CheckCircle,
  Battery, Gauge, Facebook, Star, Sun, Moon, Calendar,
  MessageSquare, Check, Activity, ChevronDown, Sparkles,
  Settings, QrCode, Eye, Send, ArrowRight, ShieldCheck, Heart
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";

// ─── Design Taste Configuration (tasteskill) ──────────────────────────────
// PRESET: Landing (SaaS, mainstream / premium tech)
// DESIGN_VARIANCE: 7 (Clean layout variation)
// MOTION_INTENSITY: 6 (Restrained physics & transitions)
// VISUAL_DENSITY: 4 (Airy, clean margins)

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "landing" | "admin";
type ProductStatus = "available" | "sold_out" | "incoming";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  status: ProductStatus;
  battery: string;
  range: string;
  speed: string;
  img: string;
  description: string;
  colors: string[];
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  type: "maintenance" | "test_ride";
  date: string;
  time: string;
  target: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: number;
}

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: "unread" | "read";
  createdAt: number;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "VinFast Feliz S 2024",
    brand: "VinFast",
    price: 15990000,
    stock: 5,
    category: "Xe máy điện",
    status: "available",
    battery: "60V 26Ah LFP",
    range: "100 km",
    speed: "50 km/h",
    img: "https://images.unsplash.com/photo-1771402382481-de35db6c4159?w=600&h=420&fit=crop&auto=format",
    description: "Dòng xe máy điện bán chạy nhất của VinFast với công nghệ pin LFP siêu bền bỉ, chống cháy nổ tốt nhất thế giới, thiết kế hiện đại, tinh tế từng chi tiết.",
    colors: ["Đỏ", "Đen Nhám", "Trắng", "Xanh"]
  },
  {
    id: 2,
    name: "Yadea G5 Pro",
    brand: "Yadea",
    price: 22500000,
    stock: 3,
    category: "Xe máy điện",
    status: "available",
    battery: "72V 32Ah Graphene",
    range: "120 km",
    speed: "60 km/h",
    img: "https://images.unsplash.com/photo-1762506938769-5b88695bea15?w=600&h=420&fit=crop&auto=format",
    description: "Xe máy điện phân khúc cao cấp từ Yadea. Động cơ độc quyền mạnh mẽ, màn hình thông minh kết nối GPS chống trộm, phanh đĩa thủy lực trước sau an toàn.",
    colors: ["Xám", "Trắng", "Đen Nhám"]
  },
  {
    id: 3,
    name: "Espero Rosa Sport",
    brand: "Espero",
    price: 18900000,
    stock: 0,
    category: "Xe máy điện",
    status: "sold_out",
    battery: "60V 28Ah Lithium-ion",
    range: "110 km",
    speed: "55 km/h",
    img: "https://images.unsplash.com/photo-1705319718724-301b055c73ce?w=600&h=420&fit=crop&auto=format",
    description: "Mẫu xe ga điện thể thao với những đường nét góc cạnh, hệ thống đèn full LED chiếu sáng vượt trội, tích hợp cổng sạc USB tiện lợi.",
    colors: ["Xanh Cyber", "Đen Nhám", "Đỏ"]
  },
  {
    id: 4,
    name: "Pega HKbike Alpha",
    brand: "Pega",
    price: 12500000,
    stock: 7,
    category: "Xe đạp điện",
    status: "available",
    battery: "48V 20Ah Lithium-ion",
    range: "80 km",
    speed: "45 km/h",
    img: "https://images.unsplash.com/photo-1773294876319-d4de0d59bfb0?w=600&h=420&fit=crop&auto=format",
    description: "Dòng xe đạp điện quốc dân cực bền bỉ của Pega. Khung sườn thép carbon siêu nhẹ cường độ cao, vành đúc hợp kim, phù hợp cho học sinh sinh viên đi học hàng ngày.",
    colors: ["Đỏ", "Xanh Dương", "Trắng"]
  },
  {
    id: 5,
    name: "Aima Premium S",
    brand: "Aima",
    price: 16800000,
    stock: 2,
    category: "Xe đạp điện",
    status: "available",
    battery: "48V 24Ah Lithium-ion",
    range: "90 km",
    speed: "48 km/h",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77894?w=600&h=420&fit=crop&auto=format",
    description: "Xe đạp điện cao cấp thiết kế theo phong cách tối giản của Nhật Bản. Hệ thống truyền động êm ái, yên da êm ái, giảm xóc giảm chấn thủy lực cao cấp.",
    colors: ["Trắng Sữa", "Hồng Pastel", "Xanh Mờ"]
  },
  {
    id: 6,
    name: "Yamaha Grande Hybrid",
    brand: "Yamaha",
    price: 48500000,
    stock: 1,
    category: "Xe máy điện",
    status: "incoming",
    battery: "72V 35Ah Graphene",
    range: "130 km",
    speed: "65 km/h",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=420&fit=crop&auto=format",
    description: "Mẫu xe máy điện công nghệ Hybrid thế hệ mới đến từ thương hiệu Nhật Bản Yamaha, kết hợp hoàn hảo giữa động cơ điện hiệu suất cao và thiết kế xe ga phong cách Châu Âu.",
    colors: ["Xanh Nhám", "Đỏ Cherry", "Đen Bóng"]
  },
  {
    id: 7,
    name: "Honda BENLY e:",
    brand: "Honda",
    price: 35000000,
    stock: 0,
    category: "Xe máy điện",
    status: "incoming",
    battery: "48V 20Ah Mobile Power Pack (x2)",
    range: "87 km",
    speed: "50 km/h",
    img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=420&fit=crop&auto=format",
    description: "Xe máy điện chuyên dụng chở hàng của Honda Nhật Bản, sử dụng 2 khối pin sạc đổi nhanh thế hệ mới. Khung xe siêu chịu lực, giỏ hàng lớn tiện dụng.",
    colors: ["Trắng"]
  },
  {
    id: 8,
    name: "Giant Quick E+ 2024",
    brand: "Giant",
    price: 28000000,
    stock: 4,
    category: "Xe đạp điện",
    status: "available",
    battery: "36V 14Ah EnergyPak",
    range: "95 km",
    speed: "42 km/h",
    img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=420&fit=crop&auto=format",
    description: "Mẫu xe đạp trợ lực điện thể thao cao cấp nhập khẩu của Giant. Động cơ đồng trục êm ái, hỗ trợ lực đạp thông minh, lốp xe chống đâm thủng chuyên dụng.",
    colors: ["Xám Carbon", "Xanh Rêu"]
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  { id: 1, name: "Lê Văn Tám", phone: "0988 123 456", type: "maintenance", date: "2026-06-25", time: "09:30", target: "Tiêu chuẩn", status: "pending", createdAt: Date.now() - 3600000 * 2 },
  { id: 2, name: "Trần Hữu Đạt", phone: "0912 999 888", type: "test_ride", date: "2026-06-24", time: "15:00", target: "VinFast Feliz S", status: "confirmed", createdAt: Date.now() - 3600000 * 20 },
  { id: 3, name: "Nguyễn Minh Hằng", phone: "0972 555 444", type: "test_ride", date: "2026-06-27", time: "10:00", target: "Yadea G5 Pro", status: "pending", createdAt: Date.now() - 3600000 * 4 },
  { id: 4, name: "Phạm Xuân Hùng", phone: "0904 888 777", type: "maintenance", date: "2026-06-23", time: "16:30", target: "Cao cấp", status: "confirmed", createdAt: Date.now() - 3600000 * 48 }
];

const INITIAL_MESSAGES: ContactMessage[] = [
  { id: 1, name: "Vũ Thị Nguyệt", phone: "0982 333 444", message: "Tôi muốn hỏi xe VinFast Feliz S hiện đang có sẵn màu gì tại cửa hàng Ý Yên và có hỗ trợ giao xe tận nơi không?", status: "unread", createdAt: Date.now() - 3600000 * 3 },
  { id: 2, name: "Hoàng Văn Tuấn", phone: "0915 222 111", message: "Cửa hàng có gói nâng cấp độ pin cho xe đạp điện cũ Pega không, giá khoảng bao nhiêu?", status: "read", createdAt: Date.now() - 3600000 * 24 }
];

const SERVICES = [
  { icon: Wrench, title: "Sửa chữa tổng quát", desc: "Kiểm tra và xử lý toàn bộ hệ thống điện, cơ học của xe máy và xe đạp điện." },
  { icon: Battery, title: "Thay pin & ắc quy", desc: "Cung cấp pin lithium, ắc quy chính hãng cao cấp, bảo hành dài hạn đến 18 tháng." },
  { icon: Shield, title: "Bảo dưỡng định kỳ", desc: "Các gói bảo dưỡng định kỳ giúp gia tăng tuổi thọ xe và bảo toàn quyền lợi bảo hành." },
  { icon: Gauge, title: "Nâng cấp hiệu suất", desc: "Căn chỉnh điều tốc, nâng cấp pin giúp xe tăng tốc nhanh hơn và đi được quãng đường xa hơn." },
  { icon: Zap, title: "Cứu hộ khẩn cấp 24/7", desc: "Dịch vụ cứu hộ nhanh tại chỗ, sạc khẩn cấp khi xe gặp sự cố dọc đường trên địa bàn Nam Định." },
  { icon: Star, title: "Tư vấn & Trải nghiệm", desc: "Hỗ trợ khách hàng lái thử miễn phí các dòng xe mới nhất, tư vấn thủ tục trả góp 0%." },
];

const TESTIMONIALS = [
  { name: "Nguyễn Thị Hoa", note: "Tôi mua Feliz S ở đây, cửa hàng tư vấn vô cùng nhiệt tình, phục vụ chu đáo và hỗ trợ trả góp duyệt nhanh chóng.", rating: 5, time: "2 tuần trước" },
  { name: "Trần Văn Minh", note: "Dịch vụ cứu hộ xe điện của tiệm rất nhanh. Xe hết điện giữa đường tối, gọi 15 phút là các bạn đã hỗ trợ xong.", rating: 5, time: "1 tháng trước" },
  { name: "Phạm Thị Lan", note: "Bảo dưỡng xe cực kỳ kỹ càng từng con ốc vít. Xe sau khi bảo dưỡng đi êm ái hẳn, giá cả lại rất minh bạch.", rating: 5, time: "3 tuần trước" },
];

const CUSTOMIZER_COLORS = [
  {
    name: "Emerald Green",
    hex: "#10b981",
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
    range: "105 km",
    speed: "55 km/h",
    battery: "92% LFP Lithium",
    price: 15990000,
  },
  {
    name: "Forest Green",
    hex: "#047857",
    img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80",
    range: "100 km",
    speed: "60 km/h",
    battery: "90% Graphene Duo",
    price: 16800000,
  },
  {
    name: "Stealth Gray",
    hex: "#18181b",
    img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80",
    range: "120 km",
    speed: "50 km/h",
    battery: "100% Carbon-Cell",
    price: 18900000,
  },
  {
    name: "Arctic White",
    hex: "#f4f4f5",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77894?w=800&auto=format&fit=crop&q=80",
    range: "95 km",
    speed: "58 km/h",
    battery: "88% Smart Lithium",
    price: 14500000,
  },
];

const HOTSPOTS = [
  {
    id: 1,
    top: "42%",
    left: "58%",
    title: "Pin Lithium LFP Siêu Bền",
    desc: "Công nghệ LFP tiên tiến chống cháy nổ tuyệt đối. Tuổi thọ hơn 2000 chu kỳ sạc, đạt chuẩn kháng nước chuẩn quân đội IP67."
  },
  {
    id: 2,
    top: "68%",
    left: "64%",
    title: "Động Cơ Brushless 3000W",
    desc: "Động cơ thông minh đồng bộ nam châm vĩnh cửu. Hiệu suất chuyển đổi năng lượng 94%, tiết kiệm điện, chống ngập nước vượt trội."
  },
  {
    id: 3,
    top: "20%",
    left: "40%",
    title: "Màn Hình LCD Smart 7-inch",
    desc: "Hiển thị thông số sắc nét dưới ánh nắng. Tích hợp bluetooth kết nối điện thoại, hiển thị bản đồ dẫn đường và định vị GPS."
  },
  {
    id: 4,
    top: "70%",
    left: "26%",
    title: "Phanh Đĩa Thủy Lực Đôi",
    desc: "Hệ thống phanh dầu cao cấp trước sau. Phân bổ lực phanh đồng đều giúp dừng xe an toàn tuyệt đối ngay cả khi phanh khẩn cấp."
  }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === "available")
    return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Còn hàng</span>;
  if (status === "sold_out")
    return <span className="bg-rose-500/10 text-rose-450 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Hết hàng</span>;
  return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">Sắp về</span>;
}

// ─── Main App Component ──────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("landing");

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("ltp_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("ltp_messages");
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Dark mode active first as per Stripe/Vercel SaaS aesthetics
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [customizerIdx, setCustomizerIdx] = useState<number>(0);
  const selectedCustomizerColor = CUSTOMIZER_COLORS[customizerIdx];
  const [activeHotspotId, setActiveHotspotId] = useState<number | null>(null);

  // Welcome screen — shown once per session
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !sessionStorage.getItem("tq_welcomed");
  });
  const handleWelcomeComplete = () => {
    sessionStorage.setItem("tq_welcomed", "1");
    setShowWelcome(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });
        if (error) {
          console.error("Lỗi khi tải danh sách xe từ Supabase:", error.message);
        } else if (data) {
          setProducts(data as Product[]);
        }
      } catch (err) {
        console.error("Lỗi kết nối Supabase:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("ltp_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("ltp_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Dark mode is default locked to true for premium dark aesthetic
    document.documentElement.classList.remove("dark");
  }, []);

  if (view === "admin") {
    return (
      <AdminPanel
        products={products}
        setProducts={setProducts}
        bookings={bookings}
        setBookings={setBookings}
        messages={messages}
        setMessages={setMessages}
        setView={setView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen key="welcome" onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-sky-mist via-[#f0fdf4] to-white text-gray-800 font-sans relative overflow-hidden selection:bg-primary/20 selection:text-gray-900">
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-sky-200/30 via-sky-100/15 to-transparent pointer-events-none z-0" />

        <Navbar setView={setView} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Hero
          selectedColor={selectedCustomizerColor}
          customizerIdx={customizerIdx}
          setCustomizerIdx={setCustomizerIdx}
          activeHotspotId={activeHotspotId}
          setActiveHotspotId={setActiveHotspotId}
        />
        <FeatureCommitments />
        <BikeQuiz products={products} />
        <ProductsCatalog products={products} setBookings={setBookings} bookings={bookings} />
        <DashboardPreview />
        <Services />
        <Pricing setBookings={setBookings} bookings={bookings} />
        <Testimonials />
        <PartnerSection />
        <BookingSection products={products} bookings={bookings} setBookings={setBookings} />
        <Contact messages={messages} setMessages={setMessages} />
        <MapSection />
        <Footer />
        <ChatWidget />

        {/* Floating Left Side Quick Contacts */}
        <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://zalo.me/0979740443"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#0068ff] text-gray-800 flex items-center justify-center shadow-lg shadow-green-500/10 hover:shadow-green-500/20 border border-gray-200"
            title="Zalo"
          >
            <MessageSquare className="w-5 h-5 fill-white text-transparent" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="tel:0979740443"
            className="w-11 h-11 rounded-full bg-gradient-to-r from-primary-dark to-primary text-gray-800 flex items-center justify-center shadow-lg shadow-green-500/10 hover:shadow-green-500/20 border border-gray-200"
            title="Hotline"
          >
            <Phone className="w-5 h-5 fill-white" />
          </motion.a>
        </div>
      </div>
    </>
  );
}

// ─── Navbar Component ────────────────────────────────────────────────────────

interface NavbarProps {
  setView: (v: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (d: boolean) => void;
}

function Navbar({ setView, isDarkMode, setIsDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Sản phẩm", href: "#products" },
    { label: "Kết nối", href: "#dashboard-preview" },
    { label: "Trắc nghiệm", href: "#bike-quiz" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Bảng giá", href: "#pricing" },
    { label: "Đối tác", href: "#partner" },
    { label: "Đặt lịch", href: "#booking" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm" : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary-dark to-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-green-500/20">
            <Zap className="w-4 h-4" />
          </div>
          <div className="leading-none">
            <span className="font-bold text-gray-900 text-sm tracking-wider uppercase block font-mono">THẾ QUỲNH</span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5 block">XE ĐIỆN NAM ĐỊNH</span>
          </div>
        </a>

        {/* Central Menu Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-gray-600 hover:text-primary-dark transition-colors tracking-wide font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setView("admin")}
            className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:border-primary-dark/30 hover:text-primary-dark transition-all cursor-pointer bg-white shadow-sm"
          >
            Quản lý
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-dark cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur-md px-6 py-6 space-y-3.5 shadow-lg absolute top-full left-0 right-0"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-gray-600 py-2.5 font-medium border-b border-gray-100 last:border-0 hover:text-primary-dark"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

interface HeroProps {
  selectedColor: typeof CUSTOMIZER_COLORS[0];
  customizerIdx: number;
  setCustomizerIdx: (idx: number) => void;
  activeHotspotId: number | null;
  setActiveHotspotId: (id: number | null) => void;
}

function Hero({ selectedColor, customizerIdx, setCustomizerIdx, activeHotspotId, setActiveHotspotId }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden z-10" style={{ backgroundImage: `url(${bgSky})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-transparent to-white pointer-events-none z-10" />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Info */}
          <div className="lg:col-span-5 text-left space-y-6">
            {/* EYEBROW: Maximum 1 eyebrow per 3 sections across page */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-primary/35 text-primary-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 animate-pulse" /> KỶ NGUYÊN DI CHUYỂN MỚI
            </div>

            {/* HEADLINE: Max 2 lines on desktop */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tighter leading-tight text-gray-900">
              XE ĐIỆN THẾ HỆ <br />
              <span className="text-primary-dark">
                THÔNG MINH
              </span>
            </h1>

            {/* SUBTEXT: Max 20 words */}
            <p className="text-gray-600 text-sm leading-relaxed max-w-[45ch]">
              Phân phối xe điện chính hãng DiBao & LTP Bike tại Nam Định — giá tốt, bảo hành tận tâm, dịch vụ tại nhà.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold text-xs tracking-wide px-7 py-3.5 rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Khám phá ngay
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs tracking-wide px-7 py-3.5 rounded-xl border border-gray-250 hover:border-gray-300 shadow-sm active:scale-[0.98] transition-all"
              >
                Đăng ký lái thử
              </a>
            </div>
          </div>

          {/* Hero Right: Premium Tech Customizer */}
          <div className="lg:col-span-7">
            <div className="eco-card rounded-2xl overflow-hidden relative">
              {/* Window Header */}
              <div className="bg-white/90 px-5 py-3 border-b border-gray-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-gray-500 font-mono tracking-widest ml-2.5">LTP_CORE_LAB // v2.3</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-primary-dark text-[9px] font-bold px-2 py-0.5 rounded border border-primary/20">
                  <Activity className="w-3 h-3 animate-pulse" /> LIVE PREVIEW
                </div>
              </div>

              {/* Window Canvas */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-sky-50 to-green-50/30 overflow-hidden flex items-center justify-center p-6">
                {/* Image Display */}
                <div className="relative w-full h-full max-w-[400px] z-10 flex items-center justify-center">
                  <img
                    src={selectedColor.img}
                    alt={selectedColor.name}
                    className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(34, 197, 94, 0.15)] transition-transform duration-500 hover:scale-[1.02]"
                  />

                  {/* Hotspots */}
                  {HOTSPOTS.map((spot) => (
                    <div
                      key={spot.id}
                      className="absolute group z-20 cursor-pointer"
                      style={{ top: spot.top, left: spot.left }}
                      onClick={() => setActiveHotspotId(activeHotspotId === spot.id ? null : spot.id)}
                    >
                      <span className="absolute inline-flex h-5 w-5 rounded-full bg-emerald-500 opacity-60 animate-ping"></span>
                      <div className="relative w-5 h-5 bg-gradient-to-br from-primary-dark to-primary rounded-full flex items-center justify-center border border-white/20 shadow-md">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      </div>

                      {/* Tooltip */}
                      <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-100 p-3.5 rounded-xl shadow-xl transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:scale-100 ${activeHotspotId === spot.id
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95"
                        }`}>
                        <div className="font-bold text-xs text-primary-dark flex items-center gap-1.5 mb-1">
                          <Zap className="w-3.5 h-3.5" />
                          {spot.title}
                        </div>
                        <p className="text-[10px] text-gray-600 leading-relaxed">{spot.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-4 left-4 text-[9px] font-mono text-gray-600 tracking-wider">
                  GRID_SCALE: 50PX
                </div>
              </div>

              {/* Window Controls */}
              <div className="bg-white/90 px-5 py-4 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Color palette:</span>
                  <div className="flex gap-2">
                    {CUSTOMIZER_COLORS.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setCustomizerIdx(idx);
                          setActiveHotspotId(null);
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-115 cursor-pointer ${customizerIdx === idx
                          ? "border-green-500 scale-110 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                          : "border-gray-200"
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 text-right">
                  <div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Hệ Pin</div>
                    <div className="text-xs font-semibold text-gray-700 mt-0.5">{selectedColor.battery}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Mức giá</div>
                    <div className="text-xs font-bold text-green-650 mt-0.5">{formatPrice(selectedColor.price)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Feature Commitments Component ───────────────────────────────────────────

function FeatureCommitments() {
  const commitments = [
    {
      icon: ShieldCheck,
      title: "Miễn phí vận chuyển",
      desc: "Đơn hàng từ 50 triệu trở lên",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: TrendingUp,
      title: "Tiết kiệm chi phí",
      desc: "Cam kết mức giá tốt nhất khu vực",
      color: "from-emerald-500 to-teal-400"
    },
    {
      icon: Clock,
      title: "Hoàn trả 100%",
      desc: "Nếu có lỗi từ nhà sản xuất",
      color: "from-teal-500 to-green-400"
    },
    {
      icon: Phone,
      title: "Hỗ trợ 24/7",
      desc: "Liên hệ hotline kỹ thuật mọi lúc",
      color: "from-primary-dark to-primary"
    }
  ];

  return (
    <div className="py-12 bg-white border-y border-gray-100 relative z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-6 rounded-xl eco-card eco-card-hover"
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-snug font-medium">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Quiz Component ─────────────────────────────────────────────

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; desc: string }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Bạn dự kiến di chuyển quãng đường bao xa mỗi ngày?",
    options: [
      { label: "Dưới 20 km", value: "short", desc: "Chủ yếu đi chợ, đưa đón con đi học gần nhà." },
      { label: "Từ 20 - 50 km", value: "medium", desc: "Đi học, đi làm hàng ngày trong huyện/thị xã." },
      { label: "Trên 50 km", value: "long", desc: "Di chuyển chặng đường dài liên xã, liên huyện." },
    ]
  },
  {
    id: 2,
    question: "Tốc độ tối đa bạn mong muốn xe đạt được là bao nhiêu?",
    options: [
      { label: "Dưới 40 km/h", value: "safe", desc: "Ưu tiên độ an toàn tuyệt đối, dễ kiểm soát." },
      { label: "40 - 50 km/h", value: "normal", desc: "Vừa phải, di chuyển thoải mái trên đường quê." },
      { label: "Trên 50 km/h", value: "fast", desc: "Cảm giác lái thể thao, tăng tốc nhanh." },
    ]
  },
  {
    id: 3,
    question: "Ai là người sử dụng chiếc xe này nhiều nhất?",
    options: [
      { label: "Học sinh / Sinh viên", value: "student", desc: "Xe nhẹ, trẻ trung, dễ dắt, không cần bằng lái." },
      { label: "Nhân viên văn phòng", value: "worker", desc: "Xe cốp rộng, sạc pin nhanh, kiểu dáng hiện đại." },
      { label: "Người lớn tuổi", value: "elder", desc: "Xe nhỏ gọn, an toàn, có giỏ xe tiện lợi." },
    ]
  },
  {
    id: 4,
    question: "Ngân sách tối đa bạn dự kiến đầu tư là bao nhiêu?",
    options: [
      { label: "Dưới 15 triệu", value: "budget", desc: "Tiết kiệm chi phí, đáp ứng nhu cầu cơ bản." },
      { label: "Từ 15 - 25 triệu", value: "standard", desc: "Cân bằng giữa thông số, thiết kế và độ bền." },
      { label: "Trên 25 triệu", value: "premium", desc: "Dòng xe cao cấp nhất, nhiều trang bị thông minh." },
    ]
  }
];

function BikeQuiz({ products }: { products: Product[] }) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendedBike, setRecommendedBike] = useState<Product | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleSelect = (val: string) => {
    const updated = { ...answers, [currentStep]: val };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendation(updated);
    }
  };

  const calculateRecommendation = (finalAnswers: Record<number, string>) => {
    const budget = finalAnswers[3];
    const speed = finalAnswers[1];
    const distance = finalAnswers[0];
    const userType = finalAnswers[2];

    let bike: Product | undefined;

    if (budget === "premium" || speed === "fast" || distance === "long") {
      bike = products.find(p => p.brand === "VinFast" || p.brand === "Yadea");
    } else if (userType === "student") {
      bike = products.find(p => p.brand === "Pega" || p.name.includes("Alpha"));
    } else if (userType === "elder" || budget === "budget") {
      bike = products.find(p => p.category === "Xe đạp điện");
    }

    if (!bike) {
      bike = products[0];
    }

    setRecommendedBike(bike);
    setQuizFinished(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        colors: ["#10b981", "#34d399", "#86efac", "#ffffff"],
        origin: { y: 0.8 }
      });
    } catch (e) { }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedBike(null);
    setQuizFinished(false);
  };

  const activeQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="bike-quiz" className="py-24 relative border-t border-gray-100" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            TÌM XE PHÙ HỢP <span className="eco-gradient-text">TRONG 30 GIÂY</span>
          </h2>
          <p className="text-gray-450 mt-3 text-sm max-w-md mx-auto">Hệ thống phân tích thông minh giúp bạn chọn mẫu xe ưng ý nhất dựa theo nhu cầu thực tế.</p>
        </div>

        <div className="eco-card rounded-2xl p-6 sm:p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-8 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  <span>CÂU HỎI {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
                  <span className="text-primary-dark font-bold">SYSTEM_QUIZ_READY</span>
                </div>

                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-gradient-to-r from-primary-dark to-primary transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-6 leading-snug">
                  {activeQuestion.question}
                </h3>

                <div className="space-y-3">
                  {activeQuestion.options.map((opt) => (
                    <motion.button
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left p-4.5 rounded-xl border border-gray-150 bg-white hover:bg-emerald-50/20 hover:border-primary/30 transition-all group flex items-start justify-between cursor-pointer shadow-sm"
                    >
                      <div>
                        <div className="font-bold text-xs text-gray-800 group-hover:text-primary-dark transition-colors">{opt.label}</div>
                        <div className="text-[11px] text-gray-500 mt-1">{opt.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-dark transition-colors group-hover:translate-x-0.5 mt-0.5" />
                    </motion.button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary-dark mt-6 underline cursor-pointer"
                  >
                    Quay lại
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6 w-full py-4"
              >
                <div className="w-12 h-12 bg-primary-glow border border-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">XE KHUYẾN NGHỊ CHO BẠN</h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-mono">DỰA TRÊN THUẬT TOÁN PHÂN TÍCH NHU CẦU</p>
                </div>

                {recommendedBike && (
                  <div className="eco-card rounded-2xl p-5 max-w-md mx-auto grid sm:grid-cols-12 gap-5 items-center text-left">
                    <div className="sm:col-span-5 aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <img
                        src={recommendedBike.img}
                        alt={recommendedBike.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <span className="text-[9px] bg-primary-glow border border-primary/20 text-primary-dark font-bold px-2 py-0.5 rounded-full uppercase font-mono">
                        {recommendedBike.brand}
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 leading-tight">{recommendedBike.name}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{recommendedBike.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-150">
                        <span className="text-xs font-bold text-primary-dark">{formatPrice(recommendedBike.price)}</span>
                        <a
                          href="#booking"
                          className="bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-md hover:from-blue-550 hover:to-purple-550 transition-colors"
                        >
                          Đăng ký
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center pt-4">
                  <button
                    onClick={resetQuiz}
                    className="border border-gray-200 bg-white text-gray-600 hover:text-gray-900 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Làm lại
                  </button>
                  <a
                    href="#products"
                    className="bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg"
                  >
                    Xem thêm xe khác
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── Products Catalog Component ──────────────────────────────────────────────

interface ProductsCatalogProps {
  products: Product[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  bookings: Booking[];
}

function ProductsCatalog({ products, setBookings, bookings }: ProductsCatalogProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const brands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
        const matchCat = selectedCategory === "All" || p.category === selectedCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchBrand && matchCat && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return 0;
      });
  }, [products, selectedBrand, selectedCategory, searchQuery, sortBy]);

  const motorbikes = useMemo(() => {
    return filteredProducts.filter(p => p.category === "Xe máy điện");
  }, [filteredProducts]);

  const bicycles = useMemo(() => {
    return filteredProducts.filter(p => p.category === "Xe đạp điện");
  }, [filteredProducts]);

  return (
    <section id="products" className="py-24 border-t border-gray-100 relative" style={{ backgroundImage: `url(${bgHills})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
      <div className="absolute inset-0 eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header: EYEBROW (Exactly 1 of 3 eyebrows) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="inline-block bg-emerald-50 text-primary-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3.5 border border-primary/20">
              COLLECTION // 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              SẢN PHẨM NỔI BẬT
            </h2>
            <p className="text-gray-500 mt-2.5 text-sm max-w-sm">Mẫu mã phong phú, đa dạng tải trọng, cam kết chất lượng tốt nhất khu vực.</p>
          </div>

          {/* Search bar & Sort */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Tìm dòng xe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 bg-white rounded-xl text-xs text-gray-800 focus:border-primary/40 outline-none w-48 sm:w-56 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 border border-gray-200 bg-white text-xs text-gray-700 outline-none rounded-xl focus:border-primary/40 cursor-pointer shadow-sm"
            >
              <option value="default">Sắp xếp</option>
              <option value="price_asc">Giá: Thấp - Cao</option>
              <option value="price_desc">Giá: Cao - Thấp</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-250 pb-6 items-center">
          {[
            { id: "All", label: "Tất cả loại xe" },
            { id: "Xe máy điện", label: "Xe máy điện" },
            { id: "Xe đạp điện", label: "Xe đạp điện" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer z-10"
            >
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary rounded-xl -z-10 shadow-md shadow-green-500/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={selectedCategory === cat.id ? "text-white" : "text-gray-650 hover:text-gray-900"}>
                {cat.label}
              </span>
            </button>
          ))}

          <div className="w-[1px] h-6 bg-gray-200 hidden sm:block mx-2"></div>

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className="relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer z-10"
            >
              {selectedBrand === brand && (
                <motion.div
                  layoutId="activeBrandTab"
                  className="absolute inset-0 bg-emerald-50 border border-primary/20 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={selectedBrand === brand ? "text-primary-dark" : "text-gray-650 hover:text-gray-900"}>
                {brand === "All" ? "Tất cả hãng" : brand}
              </span>
            </button>
          ))}
        </div>

        {/* Thick Border Bento-Style Container */}
        <div className="eco-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Background image landscape placed absolute under grid */}
          <div
            className="absolute bottom-0 left-0 right-0 h-44 bg-bottom bg-repeat-x z-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: `url(${bgHills})`, backgroundSize: '100% 100%' }}
          />

          <div className="space-y-12 relative z-10">
            {/* 1. XE MÁY ĐIỆN Section */}
            {(selectedCategory === "All" || selectedCategory === "Xe máy điện") && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-l-2 border-green-500 pl-3">
                  <h3 className="text-sm font-bold uppercase text-gray-900 tracking-wider">
                    XE MÁY ĐIỆN NỔI BẬT
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">({motorbikes.length})</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {motorbikes.map((p) => (
                    <ProductCard key={p.id} p={p} setQuickViewProduct={setQuickViewProduct} />
                  ))}
                  {motorbikes.length === 0 && (
                    <div className="col-span-full py-8 text-center text-gray-500 text-xs">
                      Không tìm thấy mẫu xe máy điện nào.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. XE ĐẠP ĐIỆN Section */}
            {(selectedCategory === "All" || selectedCategory === "Xe đạp điện") && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-l-2 border-green-400 pl-3">
                  <h3 className="text-sm font-bold uppercase text-gray-900 tracking-wider">
                    XE ĐẠP ĐIỆN BÁN CHẠY
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">({bicycles.length})</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bicycles.map((p) => (
                    <ProductCard key={p.id} p={p} setQuickViewProduct={setQuickViewProduct} />
                  ))}
                  {bicycles.length === 0 && (
                    <div className="col-span-full py-8 text-center text-gray-550 text-xs">
                      Không tìm thấy mẫu xe đạp điện nào.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="eco-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 bg-white"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-gray-405 hover:text-gray-800 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-12 gap-6 p-6 sm:p-8">
                <div className="md:col-span-5 aspect-square bg-gray-50 rounded-xl overflow-hidden self-start border border-gray-100 shadow-sm">
                  <img
                    src={quickViewProduct.img}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-primary-glow border border-primary/20 text-primary-dark font-bold px-2 py-0.5 rounded uppercase font-mono">
                      {quickViewProduct.brand}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{quickViewProduct.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <StatusBadge status={quickViewProduct.status} />
                      <span className="text-[10px] text-gray-500 font-bold bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">{quickViewProduct.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{quickViewProduct.description}</p>

                  <div className="grid grid-cols-2 gap-3 bg-gray-50 border border-gray-150 p-4 rounded-xl text-xs font-medium">
                    <div>
                      <div className="text-gray-450 text-[10px] uppercase font-bold tracking-wider">Tốc độ tối đa</div>
                      <div className="font-bold text-gray-850 mt-0.5 flex items-center gap-1">{quickViewProduct.speed}</div>
                    </div>
                    <div>
                      <div className="text-gray-450 text-[10px] uppercase font-bold tracking-wider">Quãng đường / Sạc</div>
                      <div className="font-bold text-gray-850 mt-0.5 flex items-center gap-1">{quickViewProduct.range}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-450 text-[10px] uppercase font-bold tracking-wider">Hệ thống Pin/Ắc quy</div>
                      <div className="font-bold text-gray-850 mt-0.5 flex items-center gap-1">{quickViewProduct.battery}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-150">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Giá trọn gói</div>
                      <div className="text-lg font-extrabold text-rose-500">{formatPrice(quickViewProduct.price)}</div>
                    </div>
                    <a
                      href="#booking"
                      onClick={() => setQuickViewProduct(null)}
                      className="bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white shadow-md shadow-green-500/10 font-bold text-xs px-6 py-3 rounded-xl transition-all"
                    >
                      Liên hệ đặt ngay
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProductCardProps {
  p: Product;
  setQuickViewProduct: (p: Product) => void;
}

function ProductCard({ p, setQuickViewProduct }: ProductCardProps) {
  return (
    <div className="group eco-card eco-card-hover rounded-2xl overflow-hidden flex flex-col h-full relative">
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 border-b border-gray-200">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
        <span className="absolute top-4 left-4 bg-primary-dark text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono">
          {p.brand}
        </span>
        {p.stock === 0 ? (
          <span className="absolute bottom-4 right-4 bg-rose-500/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">Hết hàng</span>
        ) : p.stock <= 2 ? (
          <span className="absolute bottom-4 right-4 bg-amber-500/80 text-black text-[9px] font-bold px-2 py-0.5 rounded">Chỉ còn {p.stock} xe</span>
        ) : null}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{p.category}</span>
          <h3 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-primary transition-colors uppercase line-clamp-1">
            {p.name}
          </h3>
          <div className="flex gap-2 text-[10px] text-gray-500 pt-1.5">
            <span className="flex items-center gap-1">
              <Battery className="w-3 h-3 text-primary" /> {p.battery.split(" ")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-primary" /> {p.range}
            </span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-150">
          <div className="flex items-baseline justify-between mb-3.5">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Giá bán:</span>
            <span className="text-sm font-bold text-rose-500">{formatPrice(p.price)}</span>
          </div>
          <button
            onClick={() => setQuickViewProduct(p)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold uppercase text-[10px] tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> MUA NGAY
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── Dashboard Preview Component (tasteskill) ───────────────────────────────

function DashboardPreview() {
  const [engineOn, setEngineOn] = useState<boolean>(true);
  const [gpsOn, setGpsOn] = useState<boolean>(true);
  const [sportMode, setSportMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const predictedRange = useMemo(() => {
    let base = 95;
    if (sportMode) base -= 25;
    if (!engineOn) return 0;
    return base;
  }, [sportMode, engineOn]);

  const batteryStatus = useMemo(() => {
    return engineOn ? "Đang xả pin (Normal)" : "Đang chờ (Standby)";
  }, [engineOn]);

  const chartData = useMemo(() => {
    if (!engineOn) {
      return [
        { time: "0s", speed: 0, power: 0 },
        { time: "10s", speed: 0, power: 0 },
        { time: "20s", speed: 0, power: 0 },
        { time: "30s", speed: 0, power: 0 },
        { time: "40s", speed: 0, power: 0 },
        { time: "50s", speed: 0, power: 0 },
      ];
    }
    const speedMult = sportMode ? 1.4 : 1.0;
    return [
      { time: "0s", speed: 0, power: 10 },
      { time: "10s", speed: Math.round(22 * speedMult), power: 180 },
      { time: "20s", speed: Math.round(38 * speedMult), power: 450 },
      { time: "30s", speed: Math.round(45 * speedMult), power: 550 },
      { time: "40s", speed: Math.round(42 * speedMult), power: 380 },
      { time: "50s", speed: Math.round(48 * speedMult), power: 600 },
    ];
  }, [engineOn, sportMode]);

  return (
    <section id="dashboard-preview" className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-50 text-primary-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3.5 border border-primary/20">
            HỆ THỐNG QUẢN LÝ // THẾ QUỲNH SMART CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            QUẢN LÝ XE TRÊN <span className="eco-gradient-text">BẢNG ĐIỀU KHIỂN</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-2.5">
            Trải nghiệm quản lý cửa hàng thông minh. Theo dõi kho hàng, đặt lịch khách hàng và điều phối dịch vụ theo thời gian thực.
          </p>
        </div>

        {/* Dashboard Mockup Frame */}
        <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="bg-white/90 px-6 py-4 border-b border-gray-150 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
              <span className="text-xs font-semibold text-gray-800 tracking-wide flex items-center gap-2">
                <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                THẾ QUỲNH Manager v1.0.4
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Đã kết nối BLE</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Sidebar Mockup */}
            <div className="lg:col-span-3 border-r border-gray-150 p-5 bg-gray-50/90 space-y-6">
              <div className="space-y-1.5">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider px-2">Bảng điều khiển</div>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "overview" ? "bg-emerald-50 text-primary-dark font-semibold" : "text-emerald-900/40 hover:bg-gray-100"
                    }`}
                >
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  Trực quan hành trình
                </button>
                <button
                  onClick={() => setActiveTab("battery")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "battery" ? "bg-emerald-50 text-primary-dark font-semibold" : "text-emerald-900/40 hover:bg-gray-100"
                    }`}
                >
                  <Battery className="w-3.5 h-3.5 text-primary" />
                  Tình trạng pin
                </button>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-150">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider px-2">Điều khiển nhanh</div>

                {/* Engine toggle */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-gray-700">Bật động cơ</span>
                  <button
                    onClick={() => setEngineOn(!engineOn)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer ${engineOn ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${engineOn ? "translate-x-4" : "translate-x-0"}`}></div>
                  </button>
                </div>

                {/* GPS lock */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-gray-700">Khóa định vị GPS</span>
                  <button
                    onClick={() => setGpsOn(!gpsOn)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer ${gpsOn ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${gpsOn ? "translate-x-4" : "translate-x-0"}`}></div>
                  </button>
                </div>

                {/* Sport mode */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-gray-700">Chế độ Thể thao (Sport)</span>
                  <button
                    onClick={() => {
                      if (engineOn) setSportMode(!sportMode);
                    }}
                    disabled={!engineOn}
                    className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer ${!engineOn ? "opacity-50 cursor-not-allowed" : ""} ${sportMode ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${sportMode ? "translate-x-4" : "translate-x-0"}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 p-6.5 space-y-6">
              {/* Metrics row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 border border-gray-200 p-4.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Dung lượng Pin</span>
                    <Battery className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800 font-mono">88%</div>
                    <div className="text-[10px] text-gray-400 mt-1">{batteryStatus}</div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-200 p-4.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Dự kiến Quãng đường</span>
                    <Gauge className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800 font-mono">{predictedRange} km</div>
                    <div className="text-[10px] text-gray-400 mt-1">{sportMode ? "Chế độ hiệu năng" : "Chế độ Tiết kiệm"}</div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-200 p-4.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Vị trí GPS</span>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">
                      {gpsOn ? "Ý Yên" : "Ngoại tuyến"}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">{gpsOn ? "Nam Định, Việt Nam" : "Đã ngắt định vị"}</div>
                  </div>
                </div>

                <div className="bg-gray-100 border border-gray-200 p-4.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide font-mono">Tiết kiệm CO2</span>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800 font-mono">248.5 kg</div>
                    <div className="text-[10px] text-primary mt-1">~ 12 cây xanh trồng</div>
                  </div>
                </div>
              </div>

              {/* Chart & Diagnostics row */}
              <div className="grid md:grid-cols-12 gap-5">
                {/* Recharts container */}
                <div className="md:col-span-8 bg-gray-100 border border-gray-200 rounded-2xl p-5.5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Biểu Đồ Hành Trình (Tốc độ & Công suất)</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Thời gian thực mô phỏng trên xe điện LTP</p>
                    </div>
                    <div className="flex gap-3 text-[10px]">
                      <span className="flex items-center gap-1 text-primary font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Tốc độ (km/h)</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Công suất (W)</span>
                    </div>
                  </div>

                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="time" stroke="rgba(107, 114, 128, 0.4)" fontSize={9} />
                        <YAxis stroke="rgba(107, 114, 128, 0.4)" fontSize={9} />
                        <ChartTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px" }}
                          labelStyle={{ color: "#374151", fontSize: "10px", fontWeight: "bold" }}
                          itemStyle={{ fontSize: "10px" }}
                        />
                        <Bar dataKey="speed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                        <Bar dataKey="power" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Side diagnostics info */}
                <div className="md:col-span-4 bg-gray-100 border border-gray-200 rounded-2xl p-5.5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Chẩn đoán hệ thống</h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-[10px] text-gray-500">Tình trạng Pin</span>
                        <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                          <Check className="w-3 h-3" /> Bình thường
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-[10px] text-gray-500">Nhiệt độ Pin</span>
                        <span className="text-[10px] font-bold text-gray-700 font-mono">34.2 °C</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span className="text-[10px] text-gray-500">Sức khỏe Pin (SOH)</span>
                        <span className="text-[10px] font-bold text-primary font-mono">99.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">Động cơ cơ học</span>
                        <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                          <Check className="w-3 h-3" /> Khỏe mạnh
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#booking"
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold uppercase text-[9px] tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center"
                  >
                    Bảo dưỡng định kỳ ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Component ──────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            DỊCH VỤ <span className="eco-gradient-text">CHUYÊN NGHIỆP</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mt-2.5">Đội ngũ kỹ thuật viên lành nghề cùng hệ thống trang thiết bị chẩn đoán hiện đại.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group eco-card eco-card-hover p-8 rounded-xl"
            >
              <div className="w-11 h-11 bg-emerald-50 group-hover:bg-gradient-to-tr group-hover:from-primary-dark group-hover:to-primary rounded-xl flex items-center justify-center mb-5 border border-green-100 group-hover:border-transparent transition-colors duration-300">
                <s.icon className="w-5.5 h-5.5 text-primary-dark group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-primary-dark transition-colors mb-3 text-sm uppercase">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Component ────────────────────────────────────────────────────────

interface PricingProps {
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  bookings: Booking[];
}

function Pricing({ setBookings, bookings }: PricingProps) {
  const plans = [
    {
      name: "Cơ bản", price: 150000, period: "/ lần", highlight: false,
      features: ["Kiểm tra tổng thể khung sườn", "Tra dầu nhớt bôi trơn xích", "Rửa và vệ sinh bụi bẩn xe", "Cân chỉnh hệ thống phanh"],
    },
    {
      name: "Tiêu chuẩn", price: 350000, period: "/ 6 tháng", highlight: true,
      features: ["Tất cả gói Cơ bản", "Chẩn đoán đo đạc ắc quy/pin", "Kiểm tra hệ mạch điện IC", "Siết ốc và cân bánh trước sau", "Ưu đãi 10% khi thay thế phụ tùng"],
    },
    {
      name: "Cao cấp", price: 650000, period: "/ năm", highlight: false,
      features: ["Tất cả gói Tiêu chuẩn", "Bảo dưỡng 4 lần miễn phí/năm", "Ưu đãi 20% linh kiện phụ tùng", "Cứu hộ khẩn cấp miễn phí 2 lần", "Tiếp nhận bảo dưỡng ưu tiên"],
    },
  ];

  return (
    <section id="pricing" className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            GÓI BẢO DƯỠNG <span className="eco-gradient-text">ĐỊNH KỲ</span>
          </h2>
          <p className="text-gray-500 mt-2.5 text-sm">Chăm sóc chu đáo để chiến mã của bạn luôn hoạt động ở hiệu suất tối đa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl p-6.5 border transition-all flex flex-col justify-between eco-card ${plan.highlight
                ? "border-primary/40 shadow-xl ring-1 ring-primary/10 relative"
                : "border-gray-100 hover:border-primary-dark/20"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 fill-white" /> Phổ biến
                </div>
              )}

              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-primary" : "text-gray-500"}`}>
                  {plan.name}
                </div>
                <div className="mb-6 flex items-baseline">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-xs ml-1.5 text-gray-500">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs text-gray-650 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#booking"
                className={`block w-full text-center text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer ${plan.highlight
                  ? "bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 hover:opacity-90"
                  : "bg-gray-50 hover:bg-emerald-50 text-emerald-900 border border-gray-200"
                  }`}
              >
                Đăng ký ngay
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Component ──────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ĐÁNH GIÁ THỰC TẾ
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="eco-card eco-card-hover rounded-xl p-6.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                {/* Max 3 lines of quote text */}
                <p className="text-gray-600 text-xs leading-relaxed mb-6 italic line-clamp-3">"{t.note}"</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-150 pt-4">
                <div>
                  <div className="font-bold text-gray-900 text-xs">{t.name}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">{t.time}</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-tr from-primary-dark to-primary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {t.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Booking Section ─────────────────────────────────────────────────────────

interface BookingSectionProps {
  products: Product[];
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

function BookingSection({ products, bookings, setBookings }: BookingSectionProps) {
  const [form, setForm] = useState({ name: "", phone: "", type: "test_ride" as Booking["type"], date: "", time: "08:00", target: "" });
  const [ticketDetails, setTicketDetails] = useState<Booking | null>(null);

  useEffect(() => {
    if (form.type === "test_ride") {
      setForm(f => ({ ...f, target: products[0]?.name || "" }));
    } else {
      setForm(f => ({ ...f, target: "Tiêu chuẩn" }));
    }
  }, [form.type, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      type: form.type,
      date: form.date,
      time: form.time,
      target: form.target,
      status: "pending",
      createdAt: Date.now(),
    };

    setBookings([newBooking, ...bookings]);
    setTicketDetails(newBooking);

    setForm({
      name: "",
      phone: "",
      type: "test_ride",
      date: "",
      time: "08:00",
      target: products[0]?.name || ""
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ["#10b981", "#34d399", "#ffffff"],
        origin: { y: 0.7 }
      });
    } catch (err) { }
  };

  return (
    <section id="booking" className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Booking Info: EYEBROW (Exactly 1 of 3 eyebrows) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-block bg-emerald-50 border border-primary/35 text-primary-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              SECURE BOOKING SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              ĐĂNG KÝ <span className="eco-gradient-text">TRỰC TUYẾN</span>
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed font-medium">
              Bạn có thể dễ dàng đặt lịch lái thử dòng xe điện mới nhất hoàn toàn miễn phí hoặc đăng ký bảo dưỡng để tiết kiệm thời gian chờ đợi.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl border border-green-100 flex items-center justify-center text-primary-dark">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-900">Xác thực tức thì</div>
                  <p className="text-[10px] text-gray-500">Hệ thống tạo mã vé điện tử QR Code xác minh ngay lập tức.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl border border-green-100 flex items-center justify-center text-primary-dark">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-900">Tiết kiệm thời gian</div>
                  <p className="text-[10px] text-gray-500">Được kỹ thuật tiếp nhận ngay khi đến tiệm, không phải xếp hàng.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form / Ticket output */}
          <div className="lg:col-span-7">
            {!ticketDetails ? (
              <div className="eco-card rounded-2xl p-6 sm:p-8 relative">
                <h3 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">
                  NHẬP THÔNG TIN ĐĂNG KÝ
                </h3>
                <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider">Hệ thống quản lý lịch hẹn tự động</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Họ và tên</label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Số điện thoại</label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="09xx xxx xxx"
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Yêu cầu đăng ký</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as Booking["type"] })}
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                      >
                        <option value="test_ride">Đăng ký Lái thử xe</option>
                        <option value="maintenance">Đặt lịch Bảo dưỡng/Sửa chữa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                        {form.type === "test_ride" ? "Chọn dòng xe lái thử" : "Chọn gói dịch vụ"}
                      </label>
                      {form.type === "test_ride" ? (
                        <select
                          value={form.target}
                          onChange={(e) => setForm({ ...form, target: e.target.value })}
                          className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.name}>{p.name} ({p.brand})</option>
                          ))}
                        </select>
                      ) : (
                        <select
                          value={form.target}
                          onChange={(e) => setForm({ ...form, target: e.target.value })}
                          className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                        >
                          <option value="Cơ bản">Bảo dưỡng Cơ bản (150.000đ)</option>
                          <option value="Tiêu chuẩn">Bảo dưỡng Tiêu chuẩn (350.000đ)</option>
                          <option value="Cao cấp">Bảo dưỡng Cao cấp (650.000đ)</option>
                          <option value="Khác">Sửa chữa hỏng hóc khác</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Chọn ngày hẹn</label>
                      <input
                        type="date" required value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-gray-250 bg-white rounded-xl px-4 py-2 text-xs text-gray-700 outline-none focus:border-green-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Chọn khung giờ</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                      >
                        <option value="08:00">08:00 - Sáng</option>
                        <option value="09:30">09:30 - Sáng</option>
                        <option value="11:00">11:00 - Trưa</option>
                        <option value="13:30">13:30 - Chiều</option>
                        <option value="15:00">15:00 - Chiều</option>
                        <option value="16:30">16:30 - Chiều</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md shadow-green-500/10 cursor-pointer mt-4"
                  >
                    Gửi yêu cầu & Tạo vé điện tử
                  </button>
                </form>
              </div>
            ) : (
              /* Apple Wallet Pass Styled Ticket */
              <div className="max-w-md mx-auto animate-fade-in space-y-6">
                <div className="eco-card rounded-2xl overflow-hidden relative">

                  <div className="h-1.5 w-full bg-gradient-to-r from-primary-dark to-primary"></div>

                  <div className="p-5 border-b border-dashed border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary animate-pulse" />
                      <span className="font-bold text-gray-700 text-xs tracking-wider font-mono">LTP WALLET PASS</span>
                    </div>
                    <span className="text-[9px] text-primary font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20 uppercase font-mono">
                      XÁC NHẬN
                    </span>
                  </div>

                  <div className="p-6 space-y-5 relative">
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-r border-gray-200 rounded-full -translate-y-1/2 shadow-sm"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-l border-gray-200 rounded-full -translate-y-1/2 shadow-sm"></div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Khách hàng</div>
                        <div className="text-xs font-bold text-gray-900 mt-1">{ticketDetails.name}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Điện thoại</div>
                        <div className="text-xs font-bold text-gray-900 mt-1">{ticketDetails.phone}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Loại lịch hẹn</div>
                        <div className="text-xs font-bold text-primary mt-1 uppercase tracking-wider font-mono">
                          {ticketDetails.type === "test_ride" ? "LÁI THỬ XE" : "BẢO DƯỠNG"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Đăng ký cho</div>
                        <div className="text-xs font-bold text-gray-900 mt-1 truncate">{ticketDetails.target}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Thời gian</div>
                        <div className="text-xs font-bold text-gray-900 mt-1 flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {ticketDetails.date}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest">Giờ hẹn</div>
                        <div className="text-xs font-bold text-gray-900 mt-1 flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          {ticketDetails.time}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-150 text-left">
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest">Địa điểm</div>
                      <div className="text-xs font-semibold text-gray-450 mt-1">Showroom Thế Giới Xe Điện Thế Quỳnh, Nam Định</div>
                    </div>
                  </div>

                  <div className="bg-[#121218] p-5 flex flex-col items-center justify-center border-t border-dashed border-gray-200">
                    <div className="bg-white p-3 rounded-xl shadow-lg mb-3">
                      <QrCode className="w-24 h-24 text-black" />
                    </div>
                    <div className="text-[10px] text-gray-550 font-mono tracking-widest uppercase">
                      TICKET_ID: TQ-{ticketDetails.id.toString().slice(-6)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setTicketDetails(null)}
                    className="flex-1 bg-white/5 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl border border-gray-200 transition-all cursor-pointer text-center"
                  >
                    Đặt lịch khác
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-green-500/10 cursor-pointer text-center"
                  >
                    In / Lưu vé
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Contact Component ────────────────────────────────────────────────────────

interface ContactProps {
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}

function Contact({ messages, setMessages }: ContactProps) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Lưu cục bộ để hiển thị trong Admin panel nếu cần
        const newMsg: ContactMessage = {
          id: Date.now(),
          name: form.name,
          phone: form.phone,
          message: form.message,
          status: "unread",
          createdAt: Date.now()
        };
        setMessages([newMsg, ...messages]);

        setSent(true);
        setForm({ name: "", phone: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      } else {
        alert("Gửi email thất bại: " + data.message);
      }
    } catch (err: any) {
      console.error(err);
      alert("Lỗi kết nối đến server gửi mail: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-gray-100 relative" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              LIÊN HỆ VỚI <span className="eco-gradient-text">CHÚNG TÔI</span>
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed font-medium">
              Hãy đến showroom của chúng tôi để được tư vấn tận tình, trực tiếp trải nghiệm cảm giác lái thử các dòng xe thông minh tiên tiến nhất hiện nay.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { icon: MapPin, label: "Địa chỉ Showroom", value: "Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định" },
                { icon: Phone, label: "Hotline hỗ trợ", value: "0979 740 443" },
                { icon: Clock, label: "Thời gian làm việc", value: "7:30 — 18:30 (Cả tuần)" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl border border-green-100 flex items-center justify-center flex-shrink-0 text-primary-dark">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="font-bold text-gray-900 text-xs mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="eco-card rounded-2xl p-6 sm:p-8">
            <h3 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">
              GỬI TIN NHẮN TƯ VẤN
            </h3>
            <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider">Phản hồi siêu tốc trong vòng 30 phút</p>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-primary">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Gửi tin nhắn thành công!</p>
                  <p className="text-[11px] text-gray-550 mt-1 max-w-xs mx-auto">Chúng tôi đã nhận thông tin và sẽ liên hệ ngay cho bạn trong thời gian sớm nhất.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Họ và tên</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Số điện thoại</label>
                  <input
                    type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="09xx xxx xxx"
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Nội dung câu hỏi</label>
                  <textarea
                    required rows={4} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tôi cần tư vấn..."
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all resize-none placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Đang gửi..." : "Gửi lời nhắn"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Map Section Component ────────────────────────────────────────────────────

function MapSection() {
  return (
    <section id="map" className="py-16 bg-gradient-to-b from-white to-emerald-50/40 border-t border-gray-100 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-primary/25 text-primary-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
            <MapPin className="w-3 h-3" />
            Tìm chúng tôi
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* 2-col layout */}
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">

          {/* Left: info card */}
          <div className="lg:col-span-2 eco-card rounded-2xl p-7 flex flex-col justify-between gap-6">
            {/* Store identity */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-primary/20 text-primary-dark text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                Đang mở cửa
              </div>
              <h3 className="font-extrabold text-gray-900 text-base leading-snug tracking-tight mt-2">
                Thế Giới Xe Máy Điện<br />
                <span className="text-primary-dark">Thế Quỳnh</span>
              </h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Cửa hàng xe điện nhập khẩu uy tín, chuyên bán &amp; sửa chữa xe máy điện tại Nam Định.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                {
                  icon: MapPin,
                  label: "Địa chỉ",
                  value: "Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định",
                  href: "https://maps.google.com/?q=Yên+Nghĩa,+Ý+Yên,+Nam+Định",
                  linkLabel: "Xem trên Maps →"
                },
                {
                  icon: Phone,
                  label: "Hotline",
                  value: "0979 740 443",
                  href: "tel:0979740443",
                  linkLabel: null
                },
                {
                  icon: Clock,
                  label: "Giờ mở cửa",
                  value: "7:30 — 18:30 (Tất cả các ngày)",
                  href: null,
                  linkLabel: null
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-primary/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-primary-dark" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-gray-800 font-semibold text-xs hover:text-primary-dark transition-colors leading-snug block mt-0.5"
                      >
                        {item.value}
                        {item.linkLabel && (
                          <span className="block text-[10px] text-primary font-medium mt-0.5">{item.linkLabel}</span>
                        )}
                      </a>
                    ) : (
                      <div className="text-gray-800 font-semibold text-xs leading-snug mt-0.5">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=Yên+Nghĩa,+Ý+Yên,+Nam+Định"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold text-xs tracking-wide py-2.5 rounded-xl shadow-md shadow-green-500/15 hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              Chỉ đường Google Maps
            </a>
          </div>

          {/* Right: embedded map */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(15,23,42,0.06),0_1px_4px_rgba(0,0,0,0.03)] border border-gray-100 min-h-[280px] bg-gray-50 relative">
            {/* Decorative top bar matching card style */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-dark via-primary to-primary-light z-10 pointer-events-none" />
            <iframe
              title="Vị trí Thế Giới Xe Máy Điện Thế Quỳnh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.4!2d106.22!3d20.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31360b4e9a1b7c3f%3A0x0!2sY%C3%AAn+Ngh%C4%A9a%2C+%C3%9D+Y%C3%AAn%2C+Nam+%C4%90%E1%BB%8Bnh!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn&q=Yên+Nghĩa,+Ý+Yên,+Nam+Định,+Việt+Nam"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "280px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Bản đồ vị trí cửa hàng Thế Giới Xe Máy Điện Thế Quỳnh"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Footer Component ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-green-50/50 border-t border-gray-100 relative z-10" style={ECO_SECTION_BG}>
      <div className="eco-section-overlay opacity-50" />
      <div className="max-w-7xl mx-auto px-6 py-14 relative z-20">
        <div className="grid sm:grid-cols-3 gap-10 mb-10 text-left">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-dark to-primary rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-800 text-sm tracking-wider font-mono">THẾ QUỲNH</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              Đại lý chuyên phân phối các thương hiệu xe điện chính hãng uy tín hàng đầu Việt Nam. Cam kết dịch vụ chất lượng, tận tâm vì môi trường xanh.
            </p>
          </div>

          <div className="space-y-4">
            <div className="font-bold text-gray-700 text-xs uppercase tracking-wide">Đường dẫn nhanh</div>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li><a href="#products" className="hover:text-primary transition-colors">Danh sách sản phẩm</a></li>
              <li><a href="#bike-quiz" className="hover:text-primary transition-colors">Trắc nghiệm chọn xe</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Dịch vụ sửa chữa</a></li>
              <li><a href="#partner" className="hover:text-primary transition-colors">Đối tác Thế Quỳnh</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">Đặt lịch trực tuyến</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="font-bold text-gray-700 text-xs uppercase tracking-wide">Hệ thống showroom</div>
            <ul className="space-y-3 text-xs text-gray-550">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                0979 740 443
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                Mở cửa: 7:30 — 18:30 hàng ngày
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-150 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600">
          <div>
            © 2026 Thế Giới Xe Máy Điện Thế Quỳnh. Bảo lưu mọi quyền.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Chat Widget (AI Assistant Simulator) ───────────────────────────────────

const CHAT_SCRIPTS = [
  {
    q: "Có hỗ trợ mua trả góp không?",
    a: "Dạ có! Thế Giới Xe Điện Thế Quỳnh hỗ trợ khách hàng trả góp 0% lãi suất thông qua thẻ tín dụng hoặc hỗ trợ duyệt hồ sơ trả góp thủ tục nhanh gọn chỉ cần CCCD (duyệt trong 15 phút)."
  },
  {
    q: "Địa chỉ showroom nằm ở đâu?",
    a: "Dạ showroom Thế Giới Xe Điện Thế Quỳnh tọa lạc tại: Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định. Bạn có thể ghé showroom từ 7:30 sáng đến 18:30 tối hàng ngày để lái thử xe ạ!"
  },
  {
    q: "Chính sách bảo hành xe thế nào?",
    a: "Dạ tất cả xe mua tại cửa hàng đều được bảo hành chính hãng từ 2 đến 3 năm đối với khung sườn và động cơ xe. Đối với pin lithium hoặc ắc quy sẽ được bảo hành từ 12 đến 18 tháng."
  },
  {
    q: "Tôi muốn liên hệ cứu hộ khẩn cấp?",
    a: "Dạ nếu xe gặp trục trặc dọc đường, bạn vui lòng gọi ngay hotline cứu hộ của chúng tôi: 0979 740 443. Kỹ thuật viên sẽ lập tức xuất phát hỗ trợ bạn."
  }
];

function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatList, setChatList] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Xin chào! Tôi là trợ lý ảo của Thế Giới Xe Điện Thế Quỳnh. Bạn cần hỗ trợ thông tin gì về xe điện ạ?" }
  ]);
  const [typing, setTyping] = useState(false);

  const handleAsk = (item: typeof CHAT_SCRIPTS[0]) => {
    const updated = [...chatList, { sender: "user" as const, text: item.q }];
    setChatList(updated);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setChatList([...updated, { sender: "bot" as const, text: item.a }]);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-dark to-primary text-gray-800 flex items-center justify-center shadow-2xl cursor-pointer relative border border-gray-200"
      >
        {chatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5 animate-pulse" />}
        {!chatOpen && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full animate-pulse"></span>
        )}
      </motion.button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-15 right-0 w-80 max-w-[90vw] eco-card rounded-2xl overflow-hidden flex flex-col max-h-[400px]"
          >
            {/* Header */}
            <div className="bg-emerald-50 px-4 py-3.5 border-b border-green-100 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-800 font-mono uppercase tracking-wider">TQ Assistant</div>
                <div className="text-[8px] text-gray-500 uppercase tracking-widest">AUTO_REPLY_ACTIVE</div>
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-[11px] max-h-[220px]">
              {chatList.map((chat, i) => (
                <div key={i} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${chat.sender === "user"
                    ? "bg-gradient-to-r from-primary-dark to-primary text-white rounded-br-none"
                    : "bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm"
                    }`}>
                    {chat.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none text-gray-600 flex gap-1.5 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-primary-dark/60 rounded-full" style={{ animation: 'chatDot 1.2s ease-out infinite' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary-dark/60 rounded-full" style={{ animation: 'chatDot 1.2s ease-out 0.2s infinite' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary-dark/60 rounded-full" style={{ animation: 'chatDot 1.2s ease-out 0.4s infinite' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat options */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 space-y-1.5 max-h-[140px] overflow-y-auto">
              <div className="text-[8px] text-gray-550 font-bold uppercase tracking-wider px-1 text-left">Chọn chủ đề hỏi nhanh:</div>
              <div className="flex flex-col gap-1">
                {CHAT_SCRIPTS.map((script) => (
                  <button
                    key={script.q}
                    onClick={() => handleAsk(script)}
                    disabled={typing}
                    className="w-full text-left py-1.5 px-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-primary-dark text-[10px] text-emerald-900/70 border border-gray-100 transition-colors cursor-pointer truncate shadow-sm"
                  >
                    {script.q}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SaaS Admin Panel Component ─────────────────────────────────────

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
  setView: (v: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (d: boolean) => void;
}

type AdminTab = "dashboard" | "products" | "bookings";

function AdminPanel({
  products,
  setProducts,
  bookings,
  setBookings,
  messages,
  setMessages,
  setView,
  isDarkMode,
  setIsDarkMode
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, "id">>({
    name: "", brand: "", price: 0, stock: 0, category: "Xe máy điện", status: "available",
    battery: "", range: "", speed: "", img: "", description: "", colors: []
  });

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "", brand: "", price: 0, stock: 0, category: "Xe máy điện", status: "available",
      battery: "60V LFP", range: "100 km", speed: "50 km/h",
      img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
      description: "Dòng xe chất lượng cao...", colors: ["Đỏ", "Đen"]
    });
    setShowProductForm(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name, brand: p.brand, price: p.price, stock: p.stock, category: p.category, status: p.status,
      battery: p.battery, range: p.range, speed: p.speed, img: p.img, description: p.description, colors: p.colors
    });
    setShowProductForm(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        const { data, error } = await supabase
          .from("products")
          .update(productForm)
          .eq("id", editingProduct.id)
          .select();

        if (error) throw error;
        if (data) {
          setProducts(products.map(p => p.id === editingProduct.id ? data[0] as Product : p));
        }
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert([productForm])
          .select();

        if (error) throw error;
        if (data) {
          setProducts([data[0] as Product, ...products]);
        }
      }
      setShowProductForm(false);
    } catch (error: any) {
      alert("Lỗi khi lưu sản phẩm: " + error.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá dòng xe này khỏi kho hàng?")) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);

        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (error: any) {
        alert("Lỗi khi xoá sản phẩm: " + error.message);
      }
    }
  };

  const handleUpdateBookingStatus = (id: number, newStatus: Booking["status"]) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBooking = (id: number) => {
    if (window.confirm("Xóa lịch hẹn này?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleMarkMessageRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: "read" } : m));
  };

  const handleDeleteMessage = (id: number) => {
    if (window.confirm("Xóa tin nhắn này?")) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  const stats = useMemo(() => {
    return {
      totalProd: products.length,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      pendingBookings: bookings.filter(b => b.status === "pending").length,
      unreadMsgs: messages.filter(m => m.status === "unread").length
    };
  }, [products, bookings, messages]);

  const chartRevenueData = useMemo(() => {
    const brandMap: Record<string, number> = {};
    products.forEach(p => {
      brandMap[p.brand] = (brandMap[p.brand] || 0) + (p.price * p.stock);
    });
    return Object.entries(brandMap).map(([brand, value]) => ({
      name: brand,
      value: Math.round(value / 1000000)
    }));
  }, [products]);

  const chartCategoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    products.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + p.stock;
    });
    return Object.entries(categories).map(([cat, stock]) => ({
      name: cat,
      value: stock
    }));
  }, [products]);

  const COLORS = ["#10b981", "#10b981", "#14b8a6", "#84cc16", "#a3e635"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-mist via-[#f0fdf4] to-white text-gray-800 font-sans flex flex-col relative overflow-hidden">

      {/* SaaS Admin Header */}
      <header className="sticky top-0 z-40 border-b bg-white/90 border-gray-100 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary-dark to-primary rounded-lg flex items-center justify-center text-white">
                <Settings className="w-4 h-4 animate-spin" />
              </div>
              <div className="text-left">
                <span className="font-bold text-gray-900 text-sm font-mono tracking-wider block">TQ CONTROL</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest block">QUẢN LÝ CỬA HÀNG</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("landing")}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 hover:text-primary-dark bg-white px-4.5 py-2 rounded-xl border border-gray-200 hover:border-primary-dark/30 transition-all cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> Thoát Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b bg-white border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex gap-6">
          {[
            { id: "dashboard" as const, label: "Tổng quan", icon: LayoutDashboard },
            { id: "products" as const, label: "Kho xe & Phân phối", icon: Package },
            { id: "bookings" as const, label: "Yêu cầu đặt lịch", icon: Calendar },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest py-4.5 border-b-2 transition-all cursor-pointer ${activeTab === t.id
                ? "border-primary-dark text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
              {t.id === "bookings" && stats.pendingBookings + stats.unreadMsgs > 0 && (
                <span className="w-4 h-4 bg-rose-600 text-white rounded-full flex items-center justify-center text-[9px] font-mono">
                  {stats.pendingBookings + stats.unreadMsgs}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Admin content body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full relative z-10">

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in text-left">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Mã sản phẩm", val: stats.totalProd, sub: "Dòng sản phẩm", color: "text-primary", icon: Package },
                { label: "Tổng tồn kho", val: stats.totalStock, sub: "Chiếc xe điện", color: "text-primary", icon: TrendingUp },
                { label: "Giá trị kho", val: `${(stats.totalValue / 1000000).toFixed(1)}M`, sub: "Triệu VNĐ", color: "text-emerald-500", icon: Activity },
                { label: "Hồ sơ chờ duyệt", val: stats.pendingBookings, sub: "Đăng ký đặt lịch", color: "text-amber-500", icon: Calendar },
                { label: "Thư tư vấn", val: stats.unreadMsgs, sub: "Chưa xử lý", color: "text-rose-500", icon: MessageSquare },
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl eco-card text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-mono">{kpi.label}</span>
                    <kpi.icon className={`w-4.5 h-4.5 ${kpi.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 font-mono">{kpi.val}</div>
                  <span className="text-[10px] text-gray-600 font-semibold">{kpi.sub}</span>
                </div>
              ))}
            </div>

            {/* Visual Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="p-6 rounded-xl eco-card text-left">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2 font-mono">
                  <TrendingUp className="w-4 h-4 text-primary" /> THỐNG KÊ GIÁ TRỊ THEO HÃNG (Triệu VNĐ)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#121218" />
                      <XAxis dataKey="name" stroke="#888888" fontSize={10} />
                      <YAxis stroke="#888888" fontSize={10} />
                      <ChartTooltip
                        contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#374151" }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="p-6 rounded-xl eco-card text-left">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2 font-mono">
                  <Package className="w-4 h-4 text-primary" /> TỒN KHO THEO DANH MỤC
                </h3>
                <div className="h-64 flex flex-col sm:flex-row items-center justify-around">
                  <div className="w-full sm:w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#374151" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 text-left">
                    {chartCategoryData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-xs">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="font-semibold text-gray-700">{entry.name}:</span>
                        <span className="text-gray-500 font-mono font-bold">{entry.value} xe</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activities */}
            <div className="rounded-xl eco-card overflow-hidden text-left">
              <div className="flex justify-between items-center px-6 py-4.5 border-b border-gray-200">
                <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Lịch hẹn gần đây</h3>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  Xem tất cả →
                </button>
              </div>
              <div className="overflow-x-auto text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/[0.01]">
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Họ tên</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Điện thoại</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Loại hẹn</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Mục tiêu</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Thời gian</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} className="border-t border-gray-150 hover:bg-white/[0.01]">
                        <td className="p-4 font-bold text-gray-700">{b.name}</td>
                        <td className="p-4 text-gray-500 font-mono">{b.phone}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase border ${b.type === "test_ride"
                            ? "bg-emerald-500/10 text-primary border-primary/20"
                            : "bg-green-400/10 text-primary border-green-400/20"
                            }`}>
                            {b.type === "test_ride" ? "Lái thử" : "Sửa chữa"}
                          </span>
                        </td>
                        <td className="p-4 text-gray-700 font-medium">{b.target}</td>
                        <td className="p-4 text-gray-550 font-mono">{b.date} · {b.time}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${b.status === "confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : b.status === "cancelled"
                              ? "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                            {b.status === "confirmed" ? "Đã duyệt" : b.status === "cancelled" ? "Đã huỷ" : "Chờ duyệt"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-base font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2 font-mono">
                <Package className="w-5 h-5 text-primary" /> Quản lý sản phẩm kho xe
              </h1>

              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm kho..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:border-primary/40 outline-none w-full sm:w-56 shadow-sm"
                  />
                </div>
                <button
                  onClick={openAddProduct}
                  className="bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 text-xs font-bold px-4.5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" /> Thêm mẫu xe
                </button>
              </div>
            </div>

            <div className="rounded-xl eco-card overflow-hidden">
              <div className="overflow-x-auto text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/[0.01]">
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Sản phẩm</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Phân loại</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Giá bán lẻ</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Tồn kho</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Thông số</th>
                      <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Trạng thái</th>
                      <th className="p-4 w-20"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="border-t border-gray-150 hover:bg-white/[0.01]">
                        <td className="p-4 flex items-center gap-3">
                          <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-white/5" />
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{p.name}</div>
                            <div className="text-[9px] text-gray-500 uppercase font-mono">{p.brand}</div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 font-medium">{p.category}</td>
                        <td className="p-4 font-bold text-primary font-mono">{formatPrice(p.price)}</td>
                        <td className="p-4 font-mono font-bold">
                          <span className={p.stock === 0 ? "text-rose-500" : p.stock <= 2 ? "text-amber-500" : "text-gray-700"}>
                            {p.stock} xe
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 space-y-0.5 max-w-xs truncate">
                          <div>Pin: {p.battery}</div>
                          <div className="text-[10px] text-gray-600">Tốc độ: {p.speed} · Quãng đường: {p.range}</div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => openEditProduct(p)}
                              className="p-2 text-gray-500 hover:text-primary-dark rounded-lg bg-gray-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 text-gray-500 hover:text-rose-500 rounded-lg bg-white/5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-base font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2 font-mono">
                <Calendar className="w-5 h-5 text-primary" /> Yêu cầu hẹn từ khách hàng
              </h1>

              <div className="rounded-xl eco-card overflow-hidden">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/[0.01]">
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Họ tên</th>
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Điện thoại</th>
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Loại đăng ký</th>
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Chi tiết</th>
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Thời gian</th>
                        <th className="text-left p-4 font-bold text-gray-500 uppercase tracking-widest text-[9px]">Trạng thái</th>
                        <th className="p-4 w-40 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} className="border-t border-gray-150 hover:bg-white/[0.01]">
                          <td className="p-4 font-bold text-gray-900">{b.name}</td>
                          <td className="p-4 text-gray-500 font-mono">{b.phone}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase border ${b.type === "test_ride"
                              ? "bg-emerald-500/10 text-primary border-primary/20"
                              : "bg-green-400/10 text-primary border-green-400/20"
                              }`}>
                              {b.type === "test_ride" ? "Lái thử" : "Sửa chữa"}
                            </span>
                          </td>
                          <td className="p-4 text-gray-900 font-semibold">{b.target}</td>
                          <td className="p-4 text-gray-500 font-mono">{b.date} · {b.time}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${b.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : b.status === "cancelled"
                                ? "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                              {b.status === "confirmed" ? "Đã duyệt" : b.status === "cancelled" ? "Đã huỷ" : "Chờ duyệt"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1.5 justify-end">
                              {b.status === "pending" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                                  className="px-2.5 py-1.5 bg-gradient-to-r from-primary-dark to-primary hover:opacity-90 text-white rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
                                >
                                  Duyệt
                                </button>
                              )}
                              {b.status !== "cancelled" && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, "cancelled")}
                                  className="px-2.5 py-1.5 bg-white/5 hover:bg-rose-500/10 text-rose-700/60 hover:text-rose-600 rounded text-[9px] font-bold uppercase border border-rose-200/60 hover:border-rose-500/20 transition-all cursor-pointer"
                                >
                                  Huỷ
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 text-gray-500 hover:text-rose-500 rounded bg-white/5 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Messages list */}
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2 font-mono">
                <MessageSquare className="w-5 h-5 text-primary" /> Tin nhắn từ khách hàng
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${m.status === "unread"
                      ? "border-green-500/30 bg-emerald-500/[0.02] relative"
                      : "border-gray-100 bg-white"
                      }`}
                  >
                    {m.status === "unread" && (
                      <span className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="font-bold text-gray-900 text-xs">{m.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono font-bold mt-0.5">{m.phone}</div>
                        </div>
                        <span className="text-[9px] text-gray-550 font-mono">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                        "{m.message}"
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-150">
                      {m.status === "unread" && (
                        <button
                          onClick={() => handleMarkMessageRead(m.id)}
                          className="px-3.5 py-1.5 bg-white/5 hover:bg-gray-200 text-gray-700 text-[9px] font-bold uppercase rounded-lg border border-gray-200 transition-colors cursor-pointer"
                        >
                          Đã đọc
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 text-gray-500 hover:text-rose-500 rounded bg-white/5 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Product form modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="eco-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative p-6 text-left">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                {editingProduct ? "Cập Nhật Thông Tin Xe" : "Thêm Dòng Xe Mới"}
              </h3>
              <button
                onClick={() => setShowProductForm(false)}
                className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Tên xe</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    placeholder="Ví dụ: VinFast Feliz S"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Thương hiệu</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    placeholder="Ví dụ: VinFast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Giá bán lẻ (đđ)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Phân loại xe</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                  >
                    <option>Xe máy điện</option>
                    <option>Xe đạp điện</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Trạng thái kho hàng</label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.value as ProductStatus })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                  >
                    <option value="available">Còn hàng</option>
                    <option value="sold_out">Hết hàng</option>
                    <option value="incoming">Sắp về</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Dung lượng Pin</label>
                  <input
                    type="text"
                    value={productForm.battery}
                    onChange={(e) => setProductForm({ ...productForm, battery: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    placeholder="Ví dụ: 60V 30Ah LFP"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Tốc độ tối đa</label>
                  <input
                    type="text"
                    value={productForm.speed}
                    onChange={(e) => setProductForm({ ...productForm, speed: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    placeholder="Ví dụ: 50 km/h"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Quãng đường</label>
                  <input
                    type="text"
                    value={productForm.range}
                    onChange={(e) => setProductForm({ ...productForm, range: e.target.value })}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    placeholder="Ví dụ: 100 km"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Link ảnh sản phẩm (URL)</label>
                <input
                  type="text"
                  value={productForm.img}
                  onChange={(e) => setProductForm({ ...productForm, img: e.target.value })}
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Mô tả sản phẩm</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 resize-none"
                  placeholder="Mô tả tóm tắt..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-150">
              <button
                onClick={() => setShowProductForm(false)}
                className="flex-1 border border-gray-200 hover:bg-white/5 text-gray-450 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer text-center"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-gradient-to-r from-primary-dark to-primary text-white shadow-md shadow-green-500/10 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer text-center"
              >
                {editingProduct ? "Lưu thay đổi" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
