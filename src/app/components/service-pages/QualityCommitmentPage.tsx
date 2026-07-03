import { Sparkles } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface QualityCommitmentPageProps {
  setView: (view: ServicePageView) => void;
}

export function QualityCommitmentPage({ setView }: QualityCommitmentPageProps) {
  return (
    <ServicePageLayout
      setView={setView}
      title="Cam kết chất lượng"
      subtitle="Tại Xe điện Thế Quỳnh, chúng tôi luôn đặt chất lượng sản phẩm và sự hài lòng của khách hàng lên hàng đầu."
      icon={Sparkles}
    >
      <div className="space-y-8 text-sm leading-7 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">CAM KẾT CHẤT LƯỢNG</h2>
          <p className="mt-3">
            Tại <span className="font-semibold text-emerald-700">Xe điện Thế Quỳnh</span>, chúng tôi luôn đặt chất lượng sản phẩm và sự hài lòng của khách hàng lên hàng đầu. Mỗi sản phẩm được bán ra đều được kiểm tra kỹ lưỡng trước khi bàn giao và đi kèm chính sách bảo hành theo quy định của nhà sản xuất.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900">1. Cam kết về giá bán</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Giá bán được niêm yết công khai, minh bạch.</li>
            <li>Luôn nỗ lực mang đến mức giá cạnh tranh cùng nhiều chương trình ưu đãi hấp dẫn.</li>
            <li>Nếu khách hàng phát hiện cùng một sản phẩm chính hãng, cùng phiên bản và điều kiện bảo hành được bán với mức giá thấp hơn tại đại lý phân phối chính thức khác trong thời gian áp dụng chương trình, Thế Quỳnh sẽ xem xét hỗ trợ điều chỉnh giá theo chính sách bán hàng hiện hành.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900">2. Cam kết về chất lượng sản phẩm</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Tất cả các sản phẩm đều là hàng chính hãng, có nguồn gốc xuất xứ rõ ràng.</li>
            <li>Xe được kiểm tra ngoại quan, hệ thống điện, hệ thống phanh và các chức năng vận hành trước khi bàn giao.</li>
            <li>Linh kiện và phụ tùng đi kèm đúng theo tiêu chuẩn của nhà sản xuất.</li>
            <li>Khách hàng được cung cấp đầy đủ phiếu bảo hành và hướng dẫn sử dụng khi nhận xe.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900">3. Chính sách hỗ trợ sau bán hàng</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Hỗ trợ hướng dẫn sử dụng và bảo quản xe.</li>
            <li>Hỗ trợ kiểm tra kỹ thuật trong quá trình sử dụng.</li>
            <li>Hỗ trợ bảo dưỡng định kỳ theo khuyến nghị của nhà sản xuất.</li>
            <li>Hỗ trợ thay thế linh kiện chính hãng khi khách hàng có nhu cầu.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900">4. Chính sách bảo hành</h3>
          <p className="mt-3">
            Các sản phẩm được bảo hành theo đúng quy định của từng hãng sản xuất. Thời gian bảo hành có thể khác nhau tùy từng dòng xe, tuy nhiên thông thường bao gồm:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Khung xe: bảo hành theo chính sách của nhà sản xuất.</li>
            <li>Động cơ (mô tơ): bảo hành theo chính sách của nhà sản xuất.</li>
            <li>Bộ điều khiển, bộ sạc, pin hoặc ắc quy: bảo hành theo thời gian quy định của từng hãng.</li>
            <li>Các linh kiện khác: áp dụng theo điều kiện ghi trên phiếu bảo hành hoặc sổ bảo hành điện tử.</li>
          </ul>
          <p className="mt-3">
            Khách hàng vui lòng giữ phiếu bảo hành hoặc hóa đơn mua hàng để được hỗ trợ nhanh chóng khi phát sinh nhu cầu bảo hành.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900"># QUY ĐỊNH BẢO HÀNH</h2>

          <section className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Điều kiện được bảo hành</h3>
            <p className="mt-3">Sản phẩm được bảo hành khi đáp ứng đầy đủ các điều kiện sau:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Còn trong thời hạn bảo hành.</li>
              <li>Có hóa đơn mua hàng, phiếu bảo hành hoặc thông tin bảo hành điện tử hợp lệ.</li>
              <li>Tem bảo hành (nếu có) còn nguyên vẹn, không bị rách, tẩy xóa hoặc chỉnh sửa.</li>
              <li>Hư hỏng được xác định là do lỗi kỹ thuật hoặc lỗi từ nhà sản xuất.</li>
              <li>Sản phẩm được sử dụng đúng mục đích và đúng hướng dẫn sử dụng.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Các trường hợp không thuộc phạm vi bảo hành</h3>
            <p className="mt-3">Các trường hợp sau sẽ không được áp dụng bảo hành miễn phí:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Hư hỏng do va chạm, tai nạn, rơi đổ hoặc sử dụng sai cách.</li>
              <li>Xe bị ngập nước hoặc để nước xâm nhập vào động cơ, bộ điều khiển, pin hoặc các linh kiện điện.</li>
              <li>Hư hỏng do thiên tai, hỏa hoạn hoặc nguồn điện không ổn định.</li>
              <li>Tự ý tháo lắp, sửa chữa hoặc thay đổi kết cấu xe khi chưa được sự đồng ý của đơn vị bảo hành.</li>
              <li>Hao mòn tự nhiên trong quá trình sử dụng như lốp xe, má phanh, bóng đèn, cầu chì, cao su, sơn hoặc các chi tiết tiêu hao khác.</li>
              <li>Sử dụng phụ kiện hoặc linh kiện không đúng tiêu chuẩn của nhà sản xuất gây ảnh hưởng đến sản phẩm.</li>
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
            <h3 className="text-lg font-semibold text-gray-900">Lưu ý</h3>
            <p className="mt-3">
              Thế Quỳnh luôn sẵn sàng hỗ trợ khách hàng kiểm tra, tư vấn kỹ thuật và thực hiện bảo hành theo đúng quy định của nhà sản xuất nhằm đảm bảo quyền lợi và mang đến trải nghiệm sử dụng tốt nhất.
            </p>
          </section>
        </section>
      </div>
    </ServicePageLayout>
  );
}
