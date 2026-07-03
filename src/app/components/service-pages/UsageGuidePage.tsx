import { BookOpen } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import type { ServicePageView } from "./types";

interface UsageGuidePageProps {
    setView: (view: ServicePageView) => void;
}

export function UsageGuidePage({ setView }: UsageGuidePageProps) {
    return (
        <ServicePageLayout
            setView={setView}
            title="Hướng dẫn sử dụng xe điện"
            subtitle="Tài liệu cơ bản giúp khách hàng sử dụng xe điện an toàn, bền lâu và hiệu quả hơn mỗi ngày."
            icon={BookOpen}
        >

            <div className="space-y-6 text-sm leading-8 text-gray-600">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">1. Các chỉ dẫn an toàn khi lái xe</h3>

                    <p className="mt-3"></p>
                    <ul className="mt-3 space-y-2">
                        <li>• Không đi bên phải theo chiều đi của mình, đi không đúng phần đường quy định.</li>
                        <li>• Dừng xe đột ngột, chuyển hướng không báo hiệu trước.</li>
                        <li>• Không chấp hành hiệu lệnh hoặc tín hiệu chỉ dẫn của đèn báo, biển báo hoặc vạch kẻ đường.</li>
                        <li>• Vượt bên phải trong các trường hợp không được phép.</li>
                        <li>• Dừng xe trên phần đường dành cho xe chạy trong đô thị tại những nơi có lề đường.</li>
                        <li>• Chạy trong hầm đường bộ không có đèn hoặc vật phát sáng báo hiệu.</li>
                        <li>• Xe đạp, xe máy đi dàn hàng ngang từ ba xe trở lên; xe thô sơ khác đi dàn hàng ngang từ hai xe trở lên.</li>
                    </ul>
                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">2. Kiểm tra xe trước khi vận hành</h3>
                    <p className="mt-3">Trước mỗi lần sử dụng, cần kiểm tra:</p>
                    <ul className="mt-3 space-y-2">
                        <li>• Áp suất và tình trạng lốp xe.</li>
                        <li>• Hệ thống phanh trước và sau.</li>
                        <li>• Mức pin hoặc điện năng còn lại.</li>
                        <li>• Đèn chiếu sáng, đèn tín hiệu và còi.</li>
                        <li>• Tay ga hoạt động bình thường.</li>
                        <li>• Các bu lông, đai ốc và các vị trí lắp ghép quan trọng.</li>
                        <li>• Gương chiếu hậu và các thiết bị an toàn khác.</li>
                    </ul>
                    <p className="mt-3">Nếu phát hiện bất thường, không nên tiếp tục sử dụng xe cho đến khi được kiểm tra và sửa chữa.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">3. Khởi động xe</h3>
                    <ol className="mt-3 space-y-2 list-decimal list-inside">
                        <li>Cắm chìa khóa hoặc kích hoạt hệ thống khóa điện theo hướng dẫn của nhà sản xuất.</li>
                        <li>Ngồi lên xe đúng tư thế.</li>
                        <li>Giữ xe cân bằng.</li>
                        <li>Bật nguồn.</li>
                        <li>Kiểm tra màn hình hiển thị và các đèn báo.</li>
                        <li>Nếu xe có chế độ khóa động cơ hoặc chế độ Parking (P), hãy tắt chế độ này trước khi tăng ga.</li>
                    </ol>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">4. Vận hành xe</h3>
                    <ul className="mt-3 space-y-2">
                        <li>• Khởi động từ từ bằng cách tăng ga nhẹ.</li>
                        <li>• Luôn quan sát phía trước và xung quanh.</li>
                        <li>• Điều chỉnh tốc độ phù hợp với điều kiện giao thông.</li>
                        <li>• Hạn chế tăng ga đột ngột hoặc phanh gấp.</li>
                        <li>• Không chở quá tải trọng và số người theo quy định của nhà sản xuất.</li>
                        <li>• Sử dụng còi, đèn và đèn báo rẽ đúng quy định.</li>
                        <li>• Khi chở trẻ em, luôn để trẻ ngồi phía sau và đảm bảo trẻ không thể với tới tay ga hoặc khóa điện.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">5. Dừng và đỗ xe</h3>
                    <ul className="mt-3 space-y-2">
                        <li>• Giảm tốc độ từ từ trước khi dừng.</li>
                        <li>• Tắt nguồn điện sau khi xe dừng hẳn.</li>
                        <li>• Rút chìa khóa (nếu có).</li>
                        <li>• Khóa xe khi rời khỏi phương tiện.</li>
                        <li>• Đỗ xe đúng nơi quy định.</li>
                        <li>• Không đỗ xe ở nơi có nhiệt độ cao hoặc gần nguồn cháy nổ.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">6. Bảo dưỡng và chăm sóc xe</h3>
                    <p className="mt-3">Thường xuyên:</p>
                    <ul className="mt-3 space-y-2">
                        <li>• Kiểm tra hệ thống phanh.</li>
                        <li>• Kiểm tra lốp xe.</li>
                        <li>• Kiểm tra hệ thống truyền động.</li>
                        <li>• Kiểm tra mức pin hoặc ắc quy.</li>
                        <li>• Vệ sinh xe sạch sẽ.</li>
                        <li>• Kiểm tra các đầu nối điện và dây điện.</li>
                        <li>• Bôi trơn các bộ phận cơ khí theo khuyến nghị của nhà sản xuất.</li>
                    </ul>
                    <p className="mt-4">Nếu xe có các dấu hiệu như tiếng động bất thường, pin tụt nhanh, quãng đường giảm đáng kể, báo lỗi trên màn hình hoặc xe mất công suất, hãy đưa xe đến trung tâm bảo hành hoặc cơ sở sửa chữa được ủy quyền để kiểm tra. Nên bảo dưỡng định kỳ theo khuyến cáo của nhà sản xuất.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">7. Hướng dẫn sạc pin/ắc quy</h3>
                    <h4 className="mt-4 font-semibold text-gray-900">Quy trình sạc</h4>
                    <ol className="mt-3 space-y-2 list-decimal list-inside">
                        <li>Đưa xe đến nơi khô ráo, thông thoáng.</li>
                        <li>Tắt nguồn xe.</li>
                        <li>Cắm đầu sạc vào cổng sạc của xe.</li>
                        <li>Cắm bộ sạc vào nguồn điện.</li>
                        <li>Sau khi sạc đầy hoặc kết thúc quá trình sạc, rút phích cắm điện trước rồi rút đầu sạc khỏi xe.</li>
                    </ol>
                    <h4 className="mt-4 font-semibold text-gray-900">Lưu ý khi sạc</h4>
                    <ul className="mt-3 space-y-2">
                        <li>• Chỉ sử dụng bộ sạc chính hãng hoặc bộ sạc có thông số kỹ thuật phù hợp.</li>
                        <li>• Không sử dụng bộ sạc bị hỏng hoặc không rõ nguồn gốc.</li>
                        <li>• Không sạc xe ở nơi ẩm ướt hoặc gần vật liệu dễ cháy.</li>
                        <li>• Không che phủ bộ sạc trong quá trình hoạt động.</li>
                        <li>• Nếu phát hiện bộ sạc hoặc pin nóng bất thường, có mùi khét hoặc bốc khói, ngừng sạc ngay và liên hệ trung tâm bảo hành.</li>
                        <li>• Không nên để pin cạn hoàn toàn mới sạc.</li>
                        <li>• Hạn chế sạc liên tục trong thời gian quá dài nếu không cần thiết.</li>
                        <li>• Tuân thủ thời gian sạc theo hướng dẫn của nhà sản xuất.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">8. Bảo vệ môi trường và phòng cháy chữa cháy</h3>
                    <ul className="mt-3 space-y-2">
                        <li>• Không tự ý tháo rời pin, ắc quy hoặc động cơ.</li>
                        <li>• Không ngâm pin hoặc các linh kiện điện trong nước.</li>
                        <li>• Không sử dụng xe khi hệ thống điện hoặc hệ thống phanh có dấu hiệu hỏng.</li>
                        <li>• Không đặt vật liệu dễ cháy gần bộ sạc hoặc pin trong quá trình sạc.</li>
                        <li>• Chỉ sử dụng nguồn điện đúng tiêu chuẩn.</li>
                        <li>• Khi pin hoặc ắc quy hết tuổi thọ, cần bàn giao cho đơn vị thu gom hoặc tái chế theo quy định, không vứt cùng rác sinh hoạt.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">9. Lưu ý đối với pin hoặc ắc quy</h3>
                    <ul className="mt-3 space-y-2">
                        <li>• Sử dụng đúng loại pin hoặc ắc quy theo khuyến nghị của nhà sản xuất.</li>
                        <li>• Không tự ý thay đổi điện áp hoặc cấu hình pin.</li>
                        <li>• Đảm bảo các đầu nối được lắp chắc chắn.</li>
                        <li>• Không để dây điện bị chèn ép hoặc cọ sát trong quá trình vận hành.</li>
                        <li>• Nếu phát hiện pin bị phồng, rò rỉ hoặc biến dạng, ngừng sử dụng ngay.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">10. Các trường hợp cần lưu ý đặc biệt</h3>
                    <p className="mt-3">Nếu xe gặp một trong các hiện tượng sau: bánh xe bị khóa bất thường, động cơ không quay, xe không thể di chuyển, xe bị ngập nước hoặc màn hình báo lỗi nghiêm trọng, không nên cố tiếp tục vận hành hoặc đẩy xe khi động cơ đang bị kẹt.</p>
                    <p className="mt-3">Thực hiện:</p>
                    <ul className="mt-3 space-y-2">
                        <li>• Tắt nguồn xe.</li>
                        <li>• Liên hệ trung tâm bảo hành hoặc đơn vị cứu hộ.</li>
                        <li>• Không tự ý tháo động cơ hoặc hệ thống điều khiển nếu không có chuyên môn.</li>
                    </ul>
                    <p className="mt-4">Sau khi xe bị ngập nước, không bật nguồn ngay. Hãy đưa xe đến trung tâm kỹ thuật để kiểm tra và làm khô các bộ phận điện trước khi sử dụng lại.</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">11. Bảo hành và sửa chữa</h3>
                    <ul className="mt-3 space-y-2">
                        <li>• Chỉ sửa chữa tại các trung tâm bảo hành hoặc cơ sở được nhà sản xuất ủy quyền.</li>
                        <li>• Không tự ý tháo rời các bộ phận điện, pin hoặc động cơ nếu không có chuyên môn.</li>
                        <li>• Việc sửa chữa không đúng kỹ thuật có thể làm mất quyền bảo hành.</li>
                        <li>• Khi cần bảo hành, người sử dụng nên cung cấp đầy đủ thông tin về tình trạng xe và các giấy tờ liên quan theo yêu cầu của đơn vị bảo hành.</li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-900">12. Khuyến nghị chung</h3>
                    <p className="mt-3">Để xe hoạt động bền bỉ, an toàn và đạt hiệu suất cao:</p>
                    <ul className="mt-3 space-y-2">
                        <li>• Thực hiện đầy đủ các hướng dẫn sử dụng.</li>
                        <li>• Bảo dưỡng định kỳ theo khuyến cáo của nhà sản xuất.</li>
                        <li>• Sử dụng phụ tùng và phụ kiện chính hãng hoặc đạt tiêu chuẩn kỹ thuật tương đương.</li>
                        <li>• Tuân thủ các quy định về an toàn giao thông và an toàn điện trong suốt quá trình sử dụng.</li>
                    </ul>
                </div>
            </div>
        </ServicePageLayout>
    );
}
