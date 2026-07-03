import { HelpCircle } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface FaqPageProps {
  setView: (view: ServicePageView) => void;
}

export function FaqPage({ setView }: FaqPageProps) {
  return (
    <ServicePageLayout
      setView={setView}
      title="Câu hỏi thường gặp"
      subtitle="Danh sách các câu hỏi phổ biến giúp khách hàng tiết kiệm thời gian tìm hiểu trước khi mua hoặc sử dụng xe."
      icon={HelpCircle}
    >
      <div className="space-y-6 text-sm leading-8 text-gray-600">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
          <h2 className="text-lg font-semibold text-gray-900">SỬ DỤNG XE ĐẠP ĐIỆN THẾ NÀO ĐỂ KHÔNG VI PHẠM PHÁP LUẬT?</h2>
          <p className="mt-3">Theo quy chuẩn kỹ thuật quốc gia về xe điện số hiệu QCVN 68:2013/BGTVT do Cục Đăng kiểm Việt Nam xây dựng, Bộ Khoa học và Công nghệ thẩm định, Bộ trưởng Bộ GTVT ban hành kèm theo Thông tư số 39/2013/TT-BGTVT ngày 01/11/2013, xe điện phải đáp ứng các yêu cầu về chất lượng an toàn kỹ thuật và phương pháp thử nghiệm.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Quy định sử dụng xe điện</h3>
          <p className="mt-3">Quy chuẩn nêu rõ các yêu cầu kỹ thuật của xe như: yêu cầu chung, khối lượng bản thân, động cơ điện, vận tốc lớn nhất, khả năng vận hành, quãng đường đi được liên tục, tiêu hao năng lượng, ắc quy, hệ thống điện, bộ điều khiển, hệ thống phanh, vận hành trên đường và các phương pháp thử đối với từng yêu cầu kỹ thuật.</p>
          <p className="mt-3">Ngoài ra, quy chuẩn cũng quy định về quản lý bao gồm phương thức kiểm tra, thử nghiệm, tài liệu kỹ thuật, mẫu thử, báo cáo thử nghiệm và việc áp dụng quy định.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Những mức xử phạt nhẹ khi sử dụng xe điện sai quy định</h3>
          <ul className="mt-3 space-y-2">
            <li>• Không đi bên phải theo chiều đi của mình, đi không đúng phần đường quy định.</li>
            <li>• Dừng xe đột ngột, chuyển hướng không báo hiệu trước.</li>
            <li>• Không chấp hành hiệu lệnh hoặc tín hiệu chỉ dẫn của đèn báo, biển báo hoặc vạch kẻ đường.</li>
            <li>• Vượt bên phải trong các trường hợp không được phép.</li>
            <li>• Dừng xe trên phần đường dành cho xe chạy trong đô thị tại những nơi có lề đường.</li>
            <li>• Chạy trong hầm đường bộ không có đèn hoặc vật phát sáng báo hiệu.</li>
            <li>• Xe đạp, xe máy đi dàn hàng ngang từ ba xe trở lên; xe thô sơ khác đi dàn hàng ngang từ hai xe trở lên.</li>
            <li>• Người điều khiển sử dụng ô, điện thoại di động trong lúc lái.</li>
            <li>• Xe thô sơ đi ban đêm không có báo hiệu bằng đèn hoặc vật phản quang.</li>
          </ul>
          <p className="mt-4">Theo các quy định này, người điều khiển xe đạp điện, xe máy điện ngoài việc tuân thủ quy chuẩn của xe còn phải đội mũ bảo hiểm và có thể bị xử phạt nếu vi phạm các quy định về an toàn giao thông.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Lưu ý trước khi sử dụng</h3>
          <p className="mt-3">Trước khi sử dụng xe điện, bạn nên tìm hiểu kỹ các quy định liên quan để đảm bảo an toàn, tuân thủ pháp luật và tránh các mức phạt không đáng có.</p>
        </div>
      </div>
    </ServicePageLayout>
  );
}
