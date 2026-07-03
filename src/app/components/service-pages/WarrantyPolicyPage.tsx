import { ShieldCheck } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface WarrantyPolicyPageProps {
  setView: (view: ServicePageView) => void;
}

export function WarrantyPolicyPage({ setView }: WarrantyPolicyPageProps) {
  return (
    <ServicePageLayout
      setView={setView}
      title="Chính sách bảo hành"
      subtitle="Thông tin rõ ràng về thời hạn bảo hành, điều kiện áp dụng và quy trình xử lý khi xe phát sinh sự cố."
      icon={ShieldCheck}
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm leading-7 text-gray-600">
            Xe điện Thế Quỳnh luôn mong muốn mang đến cho khách hàng những sản phẩm chất lượng cùng dịch vụ hậu mãi tận tâm. Với phương châm “Uy tín – Chất lượng – Khách hàng là trọng tâm”, chúng tôi áp dụng chính sách bảo hành nhằm đảm bảo quyền lợi của khách hàng trong suốt quá trình sử dụng sản phẩm.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">1. Chính sách bảo hành theo hãng sản xuất</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Xe điện Thế Quỳnh là đại lý phân phối nhiều thương hiệu xe điện uy tín. Mỗi hãng sẽ có chính sách bảo hành riêng đối với từng dòng xe và từng bộ phận.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Thời gian và phạm vi bảo hành được áp dụng theo quy định của nhà sản xuất và được ghi rõ trong phiếu bảo hành hoặc tài liệu đi kèm sản phẩm.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">2. Chính sách bảo hành chung</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600">
              <li>• Khung xe: bảo hành theo chính sách của nhà sản xuất.</li>
              <li>• Động cơ (mô tơ): bảo hành theo chính sách của nhà sản xuất.</li>
              <li>• Pin hoặc ắc quy: bảo hành theo thời gian quy định của từng hãng.</li>
              <li>• Bộ sạc điện, bộ điều khiển và các linh kiện điện: bảo hành đối với lỗi kỹ thuật do nhà sản xuất.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. Cam kết về chất lượng sản phẩm</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Tất cả sản phẩm do Xe điện Thế Quỳnh cung cấp đều là hàng chính hãng, có nguồn gốc xuất xứ rõ ràng.</li>
            <li>• Xe được kiểm tra kỹ thuật trước khi bàn giao cho khách hàng.</li>
            <li>• Trường hợp phát hiện lỗi kỹ thuật do nhà sản xuất, khách hàng sẽ được hỗ trợ bảo hành, sửa chữa hoặc thay thế theo đúng chính sách của hãng.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">4. Chính sách hỗ trợ sau bán hàng</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Kiểm tra tình trạng xe.</li>
            <li>• Tư vấn kỹ thuật và hướng dẫn sử dụng.</li>
            <li>• Bảo dưỡng định kỳ theo nhu cầu.</li>
            <li>• Cung cấp và thay thế linh kiện chính hãng.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Điều kiện được bảo hành</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Còn trong thời hạn bảo hành.</li>
            <li>• Có hóa đơn mua hàng, phiếu bảo hành hoặc thông tin bảo hành điện tử hợp lệ.</li>
            <li>• Hư hỏng được xác định là do lỗi kỹ thuật hoặc lỗi từ nhà sản xuất.</li>
            <li>• Tem bảo hành còn nguyên vẹn và sản phẩm được sử dụng đúng hướng dẫn của nhà sản xuất.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">6. Các trường hợp không áp dụng bảo hành</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Hư hỏng do tai nạn, va chạm, rơi đổ hoặc sử dụng sai mục đích.</li>
            <li>• Xe hoặc linh kiện điện bị ngập nước, cháy nổ hoặc hư hỏng do thiên tai.</li>
            <li>• Pin hoặc ắc quy bị biến dạng, phồng, nứt vỡ hoặc hư hỏng do sử dụng không đúng hướng dẫn.</li>
            <li>• Tự ý tháo lắp, sửa chữa hoặc thay đổi kết cấu xe khi chưa được sự đồng ý của đơn vị bảo hành.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Hỗ trợ khách hàng</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Trong quá trình sử dụng, nếu phát sinh sự cố hoặc cần hỗ trợ kỹ thuật, khách hàng vui lòng liên hệ trực tiếp với Xe điện Thế Quỳnh để được hướng dẫn, kiểm tra và xử lý theo đúng quy trình bảo hành của nhà sản xuất.
          </p>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Chúng tôi luôn sẵn sàng đồng hành cùng khách hàng nhằm mang đến trải nghiệm sử dụng xe điện an toàn, bền bỉ và thuận tiện nhất.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
