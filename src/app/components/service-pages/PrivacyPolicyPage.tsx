import { Lock } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface PrivacyPolicyPageProps {
  setView: (view: ServicePageView) => void;
}

export function PrivacyPolicyPage({ setView }: PrivacyPolicyPageProps) {
  return (
    <ServicePageLayout
      setView={setView}
      title="Chính sách bảo mật"
      subtitle="Chúng tôi cam kết bảo vệ dữ liệu cá nhân của khách hàng và chỉ sử dụng thông tin cho mục đích hỗ trợ mua bán, chăm sóc và bảo hành."
      icon={Lock}
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm leading-7 text-gray-600">
            Xe điện Thế Quỳnh cam kết tôn trọng và bảo vệ quyền riêng tư của khách hàng. Chính sách này nhằm giúp khách hàng hiểu rõ cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân khi truy cập hoặc mua sắm tại website.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">1. Mục đích và phạm vi thu thập thông tin</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Xe điện Thế Quỳnh chỉ thu thập những thông tin cần thiết để phục vụ quá trình tư vấn, bán hàng và chăm sóc khách hàng.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Các thông tin có thể được thu thập bao gồm: họ và tên, số điện thoại, địa chỉ nhận hàng, địa chỉ email, nội dung yêu cầu tư vấn hoặc hỗ trợ, thông tin về sản phẩm khách hàng quan tâm hoặc đặt mua, thông tin giao nhận và thanh toán (nếu có).
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Xe điện Thế Quỳnh không bán, trao đổi hoặc chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại khi chưa có sự đồng ý của khách hàng, trừ các trường hợp theo quy định của pháp luật.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">2. Phạm vi sử dụng thông tin</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600">
              <li>• Tiếp nhận và xử lý đơn đặt hàng.</li>
              <li>• Tư vấn, giải đáp thắc mắc của khách hàng.</li>
              <li>• Giao hàng và thực hiện các dịch vụ sau bán hàng.</li>
              <li>• Thực hiện bảo hành, bảo dưỡng và hỗ trợ kỹ thuật.</li>
              <li>• Thông báo về chương trình khuyến mại, ưu đãi hoặc sản phẩm mới khi khách hàng đồng ý nhận thông tin.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">3. Thời gian lưu trữ thông tin</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Thông tin cá nhân của khách hàng được lưu trữ trong thời gian cần thiết để phục vụ mục đích thu thập hoặc cho đến khi khách hàng có yêu cầu chỉnh sửa hoặc xóa thông tin, trừ trường hợp pháp luật có quy định khác.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">4. Đối tượng có thể được tiếp cận thông tin</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Thông tin cá nhân của khách hàng chỉ được tiếp cận bởi ban quản lý, nhân viên có trách nhiệm của Xe điện Thế Quỳnh, đơn vị vận chuyển, đơn vị cung cấp dịch vụ thanh toán, trung tâm bảo hành hoặc nhà sản xuất khi cần xử lý yêu cầu bảo hành, và cơ quan nhà nước có thẩm quyền theo quy định của pháp luật.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">5. Đơn vị thu thập và quản lý thông tin</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Cửa hàng Xe điện Thế Quỳnh
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Địa chỉ: Cống Ông Cơn, Yên Nghĩa, Ý Yên, Nam Định </li>
            <li>• Hotline: 0979 740 443</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">6. Quyền của khách hàng đối với thông tin cá nhân</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600">
            <li>• Yêu cầu xem lại thông tin cá nhân đã cung cấp.</li>
            <li>• Yêu cầu cập nhật, chỉnh sửa hoặc bổ sung thông tin.</li>
            <li>• Yêu cầu xóa thông tin cá nhân khi không còn nhu cầu sử dụng dịch vụ.</li>
            <li>• Khiếu nại nếu phát hiện thông tin cá nhân bị sử dụng sai mục đích.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">7. Cam kết bảo mật thông tin</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Xe điện Thế Quỳnh áp dụng các biện pháp kỹ thuật và quản lý phù hợp nhằm bảo vệ thông tin cá nhân của khách hàng khỏi việc truy cập trái phép, mất mát, tiết lộ hoặc sử dụng sai mục đích.
          </p>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Chúng tôi cam kết không bán, cho thuê hoặc chia sẻ thông tin cá nhân cho bên thứ ba ngoài phạm vi đã nêu trong chính sách này nếu chưa có sự đồng ý của khách hàng.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">8. Tiếp nhận và giải quyết khiếu nại</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Nếu khách hàng phát hiện thông tin cá nhân bị sử dụng không đúng mục đích hoặc có dấu hiệu bị lộ lọt, vui lòng liên hệ với Xe điện Thế Quỳnh qua hotline, email hoặc trực tiếp tại cửa hàng.
          </p>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Chúng tôi sẽ tiếp nhận, xác minh và phản hồi trong thời gian sớm nhất nhằm đảm bảo quyền và lợi ích hợp pháp của khách hàng theo quy định của pháp luật.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
