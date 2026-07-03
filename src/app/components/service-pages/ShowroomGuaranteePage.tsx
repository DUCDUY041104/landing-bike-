import { Store } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface ShowroomGuaranteePageProps {
  setView: (view: ServicePageView) => void;
}

export function ShowroomGuaranteePage({ setView }: ShowroomGuaranteePageProps) {
  return (
    <ServicePageLayout
      setView={setView}
      title="Gian hàng đảm bảo"
      subtitle="Showroom được thiết kế chuyên nghiệp, đáp ứng tiêu chuẩn trải nghiệm và hỗ trợ khách hàng tốt nhất tại Nam Định."
      icon={Store}
    >
      <div className="space-y-6 text-sm leading-8 text-gray-600">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
          <h2 className="text-lg font-semibold text-gray-900">GIAN HÀNG CAM KẾT CHÍNH HÃNG</h2>
          <p className="mt-3">Với mong muốn mang đến cho khách hàng những sản phẩm chất lượng cùng dịch vụ uy tín, Cửa hàng Xe điện Thế Quỳnh cam kết thực hiện các chính sách sau:</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">1. Cam kết sản phẩm chính hãng</h3>
          <ul className="mt-3 space-y-2">
            <li>• Tất cả các sản phẩm xe điện do Thế Quỳnh phân phối đều là hàng chính hãng, có nguồn gốc xuất xứ rõ ràng.</li>
            <li>• Sản phẩm được cung cấp đầy đủ giấy tờ, tem nhãn và chính sách bảo hành theo quy định của nhà sản xuất.</li>
            <li>• Tuyệt đối không kinh doanh hàng giả, hàng nhái, hàng kém chất lượng hoặc sản phẩm không rõ nguồn gốc.</li>
          </ul>
          <p className="mt-3">Nếu khách hàng phát hiện sản phẩm mua tại Thế Quỳnh không đúng như cam kết về nguồn gốc hoặc là hàng giả, hàng nhái, cửa hàng sẽ tiếp nhận xác minh và có phương án giải quyết theo quy định của pháp luật cùng chính sách bảo vệ quyền lợi khách hàng.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">2. Cam kết tư vấn trung thực</h3>
          <ul className="mt-3 space-y-2">
            <li>• Mọi thông tin về sản phẩm như xuất xứ, thông số kỹ thuật, tính năng, trang bị và chính sách bảo hành đều được cung cấp đầy đủ, minh bạch.</li>
            <li>• Giá bán được niêm yết rõ ràng, không phát sinh chi phí ngoài thỏa thuận.</li>
            <li>• Đội ngũ tư vấn luôn hỗ trợ khách hàng lựa chọn sản phẩm phù hợp với nhu cầu và ngân sách, không cung cấp thông tin sai lệch hoặc gây hiểu nhầm.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">3. Cam kết giá bán hợp lý</h3>
          <p className="mt-3">Thế Quỳnh luôn nỗ lực mang đến mức giá cạnh tranh cùng nhiều chương trình ưu đãi hấp dẫn.</p>
          <p className="mt-3">Nếu trong thời gian quy định của chương trình, khách hàng tìm thấy cùng một sản phẩm chính hãng, cùng phiên bản và điều kiện bảo hành được bán với mức giá thấp hơn tại đại lý phân phối chính thức khác, cửa hàng sẽ xem xét hỗ trợ điều chỉnh giá hoặc hoàn phần chênh lệch theo chính sách bán hàng hiện hành.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">4. Cam kết dịch vụ sau bán hàng</h3>
          <ul className="mt-3 space-y-2">
            <li>• Hỗ trợ hướng dẫn sử dụng xe trước khi bàn giao.</li>
            <li>• Thực hiện bảo hành theo đúng chính sách của nhà sản xuất.</li>
            <li>• Hỗ trợ bảo dưỡng, kiểm tra định kỳ và tư vấn kỹ thuật trong quá trình sử dụng.</li>
            <li>• Sẵn sàng hỗ trợ khách hàng khi xe gặp sự cố hoặc cần thay thế linh kiện chính hãng.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">5. Cam kết phục vụ khách hàng</h3>
          <p className="mt-3">Sự hài lòng của khách hàng là ưu tiên hàng đầu của Thế Quỳnh. Chúng tôi luôn lắng nghe mọi ý kiến đóng góp, phản hồi và không ngừng nâng cao chất lượng sản phẩm cũng như dịch vụ để mang đến trải nghiệm mua sắm tốt nhất.</p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
