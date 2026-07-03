import { useEffect, type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import type { ServicePageView } from "./types";

interface ServicePageLayoutProps {
  setView: (view: ServicePageView) => void;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: ReactNode;
}

export function ServicePageLayout({ title, subtitle, icon: Icon, children }: ServicePageLayoutProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(scrollToTop);
    const timeout = window.setTimeout(scrollToTop, 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [title]);

  return (
    <div className="w-full bg-gradient-to-b from-sky-mist via-[#f0fdf4] to-white text-gray-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-0 py-2 sm:px-0 lg:px-0">
        <section className="overflow-hidden rounded-[32px] border border-emerald-100 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-8 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Dịch vụ hậu mãi</p>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">{subtitle}</p>
          </div>

          <div className="px-6 py-8 sm:px-10">{children}</div>
        </section>
      </div>
    </div>
  );
}
