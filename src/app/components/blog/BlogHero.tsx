import { BookOpen } from 'lucide-react'

export function BlogHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 bg-emerald-50 text-primary-dark text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-primary/20">
          <BookOpen className="w-3.5 h-3.5" />
          Blog xe điện
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
          KHÁM PHÁ & <span className="eco-gradient-text">CHIA SẺ</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          Cập nhật tin tức, xu hướng và kiến thức về xe điện — từ mẹo chọn xe, bảo dưỡng pin đến công nghệ mới nhất.
        </p>
      </div>
    </section>
  )
}
