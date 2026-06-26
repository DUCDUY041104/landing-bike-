import { motion } from "motion/react";
import {
  ShoppingBag,
  Wrench,
  Package,
  Home,
  Battery,
  ShoppingCart,
  MapPin,
  Phone,
  Gift,
  RefreshCcw,
  Helmet,
  BadgeDollarSign,
  Star,
  CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: ShoppingBag,
    title: "Bán xe máy điện",
    desc: "Đại lý phân phối chính hãng DiBao & LTP Bike tại Nam Định. Giá tốt nhất, đa dạng màu sắc và mẫu mã.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Wrench,
    title: "Sửa chữa & bảo dưỡng",
    desc: "Bảo dưỡng xe máy xăng và xe điện. Kỹ thuật viên lành nghề, trang thiết bị hiện đại, xử lý nhanh chóng.",
    color: "from-sky-500 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: Package,
    title: "Thay thế phụ tùng chính hãng",
    desc: "Linh kiện và phụ tùng 100% chính hãng, đảm bảo chất lượng, tương thích hoàn hảo với xe của bạn.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: Home,
    title: "Sửa chữa tại nhà",
    desc: "Dịch vụ cứu hộ và sửa chữa tận nhà 24/7. Gọi là có kỹ thuật viên đến tận nơi hỗ trợ bạn ngay.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Battery,
    title: "Thay pin tận nhà",
    desc: "Dịch vụ thay pin xe điện tại nhà tiện lợi. Không cần di chuyển — chúng tôi đến tận nơi phục vụ bạn.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: ShoppingCart,
    title: "Thu mua xe cũ",
    desc: "Định giá xe cũ minh bạch, công bằng. Thu mua tất cả dòng xe máy điện và xe máy xăng với giá hợp lý.",
    color: "from-lime-500 to-green-500",
    bg: "bg-lime-50",
    border: "border-lime-100",
  },
];

const BENEFITS = [
  {
    icon: CheckCircle,
    title: "Bảo dưỡng miễn phí 2 năm",
    desc: "Cam kết bảo dưỡng xe hoàn toàn miễn phí trong suốt 2 năm sau mua.",
  },
  {
    icon: Battery,
    title: "Kiểm tra pin định kỳ",
    desc: "Kiểm tra tình trạng pin định kỳ, đảm bảo hiệu suất và tuổi thọ pin luôn tối ưu.",
  },
  {
    icon: Gift,
    title: "Tặng mũ bảo hiểm khi mua xe",
    desc: "Mỗi xe xuất xưởng đều kèm theo mũ bảo hiểm chính hãng chất lượng cao.",
  },
  {
    icon: BadgeDollarSign,
    title: "Giá cạnh tranh nhất",
    desc: "Cam kết giá tốt nhất thị trường. Hoàn tiền chênh lệch nếu bạn tìm được giá rẻ hơn.",
  },
  {
    icon: RefreshCcw,
    title: "Hỗ trợ đổi xe linh hoạt",
    desc: "Chính sách đổi xe trong 7 ngày nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.",
  },
  {
    icon: Star,
    title: "Nhập khẩu chính ngạch",
    desc: "Xe nhập khẩu đầy đủ hồ sơ, chứng từ, bảo hành dài hạn từ hãng.",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnerSection() {
  return (
    <section
      id="partner"
      className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-emerald-100/40 via-transparent to-transparent opacity-60 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-primary/30 text-primary-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Star className="w-3 h-3 fill-primary text-primary" />
            ĐỐI TÁC UY TÍN
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tighter text-gray-900 leading-tight">
            THẾ GIỚI XE MÁY ĐIỆN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-primary to-primary-dark">
              THẾ QUỲNH
            </span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
            Cửa hàng xe điện nhập khẩu uy tín — chuyên bán và sửa chữa xe máy điện với giá cả hợp lý, chế độ bảo hành lâu dài và dịch vụ tận tâm nhất khu vực Nam Định.
          </p>

          {/* Contact badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:0979740443"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary-dark text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all hover:shadow-md group"
            >
              <span className="w-6 h-6 rounded-lg bg-emerald-50 border border-primary/20 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary-dark" />
              </span>
              0979 740 443
            </a>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm">
              <span className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
              </span>
              Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định
            </div>
          </div>
        </motion.div>

        {/* ── Services Grid ── */}
        <div className="space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center"
          >
            <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">
              Dịch vụ nổi bật
            </h3>
            <p className="text-gray-500 text-xs mt-1.5">Đa dạng — chuyên nghiệp — tận tâm</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SERVICES.map((svc) => (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className={`eco-card-hover rounded-2xl p-6 flex flex-col gap-4 cursor-default ${svc.bg} border ${svc.border}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-md`}
                >
                  <svc.icon className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">{svc.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Benefits strip ── */}
        <div className="space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center"
          >
            <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">
              Quyền lợi khách hàng
            </h3>
            <p className="text-gray-500 text-xs mt-1.5">Cam kết đi kèm mỗi sản phẩm & dịch vụ</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                variants={cardVariants}
                className="eco-card rounded-2xl p-5 flex gap-4 items-start group hover:shadow-[0_8px_24px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <b.icon className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs leading-tight">{b.title}</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Trust Banner ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-dark via-primary to-primary-light p-px shadow-xl shadow-green-500/15"
        >
          <div className="rounded-[calc(1.5rem-1px)] bg-white/95 backdrop-blur-sm px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-emerald-50/80 blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-sky-50/80 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-2 text-center sm:text-left">
              <p className="text-[10px] text-primary-dark font-bold uppercase tracking-widest">
                Đối tác tin cậy
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Hãy đến trải nghiệm trực tiếp!
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-md">
                Showroom luôn mở cửa để đón tiếp bạn. Đội ngũ tư vấn nhiệt tình sẽ giúp bạn chọn được chiếc xe ưng ý nhất.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:0979740443"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                Gọi ngay
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-gray-700 hover:text-primary-dark font-bold text-xs tracking-wide px-6 py-3 rounded-xl border border-gray-200 hover:border-primary/30 shadow-sm transition-all"
              >
                Gửi yêu cầu
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
