import { IMarketDetail } from '@/interfaces/market';
import React from 'react'

const TourOverview = ({ data }: { data: IMarketDetail }) => {
    return (
        <>
            <div className='detail_content_overview'>
                <div className='detail_content_overview_tour'>
                    <h2 className='font-bold pb-3'>Thông tin chuyến đi</h2>
                    <div className='detail_content_card'>
                        <div className='py-4'>
                            <div dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}></div>
                            {/* {data.description} */}
                            {/* Ngày 1 - TP HỒ CHÍ MINH – NGHI XƯƠNG (Ăn tối nhẹ trên máy bay)
                            Trưởng Đoàn Vietravel đón Quý khách tại sân bay Tân Sơn Nhất đáp chuyến bay đến Nghi Xương. Đến sân bay Tam Hiệp, xe đưa đoàn về khách sạn 4* theo chuẩn địa phương nhận phòng và nghỉ đêm tại Nghi Xương.
                            <br />
                            <br />
                            Ngày 2 - NGHI XƯƠNG (Ăn ba bữa)
                            Đoàn ăn sáng và làm thủ tục trả phòng, đoàn lên du thuyền tham quan công trình thủy lợi Khu du lịch Đập Tam Hiệp Nghi Xương - đây là công trình thủy lợi lớn nhất thế giới. Sự pha trộn vô cùng độc đáo giữa kiến trúc hiện đại, phong cảnh tự nhiên hoang sơ và văn hóa con người sẽ mang lại nhiều trải nghiệm thú vị và sự mới lạ đến cho Quý khách khi đến tham quan nơi đây. Sau khi ăn trưa, đoàn tiếp tục đến với Cổ Hương của nhà thơ Khuất Nguyên - khu tưởng niệm nhà thơ Khuất Nguyên, nơi đây là sự kết hợp của khu dân cư cổ xưa và nghệ thuật điêu khắc đá cổ. Chiêm ngưỡng phong cảnh sông nước vô cùng hữu tình sẽ mang lại cho Quý khách một chuyến đi nhiều trải nghiệm thú vị. Đoàn ngoạn cảnh Thế Ngoại Đào Nguyên – với vị trí nằm ở hẻm núi Tây Lăng, Thế Ngoại Đào Nguyên là sự hợp nhất của vẻ đẹp của sông Trường Giang, sự kỳ lạ của những hang động và vẻ huyền bí của các bộ lạc hòa trộn vào nhau tạo lên một nơi tuyệt vời . xe đưa đoàn di chuyển dùng bữa tối, sau đó về khách sạn 4* theo chuẩn địa phương nhận phòng và nghỉ đêm tại Nghi Xương
                            <br />
                            <br />
                            Ngày 3 - NGHI XƯƠNG - TRƯƠNG GIA GIỚI - PHƯỢNG HOÀNG CỔ TRẤN (Ăn ba bữa)
                            Sau bữa sáng, xe đón đoàn khởi hành đến với Trương Gia Giới.  Quý khách mua sắm tại cửa hàng thuốc. Quý khách có thể tự túc chi phí tham quan Hồ Bảo Phong, Sau đó đoàn khởi hành đi Phượng Hoàng Cổ Trấn - được nhà văn Tân Tây Lan Alley Rewi khen ngợi là nơi đẹp nhất Trung Quốc, là một thành cổ nhỏ bé nằm ở tỉnh Hồ Nam -  Trung Quốc, với những ngôi nhà cổ  áp sát vào núi và soi mình xuống dòng Đà Giang.
                            <br />
                            <br />
                            Lầu Phong Thúy Hồng Kiều – chính là điểm nhấn nổi bật nhất trong tổng thể của Phượng Hoàng cổ trấn. Cầu vắt ngang dòng Đà Giang, nối liền đôi bờ trấn cổ, không chỉ mang ý nghĩa về giao thông mà còn là biểu tượng của nơi đây – giống như cầu Nhật Bản tại Hội An.
                            <br />
                            <br />
                            Thành lầu Đông Môn – Khu tường thành cổ nằm hướng đông của cổ trấn.
                            <br />
                            <br />
                            Điếu Cước Lầu Quần, Thác Vạn Danh, Phố Thạch Bản
                            <br />
                            <br />
                            Đặc biệt Quý khách trải nghiệm đi thuyền ngắm cảnh hai bên dòng sông Đà Giang ngắm nhìn hình ảnh Phượng Hoàng Cổ Trấn soi bóng bên dòng Đà Giang, chiêm ngưỡng cảnh sắc hai bên bờ sông, tạo nên cảm giác thanh bình và tự tại. (không bao gồm phí ngồi thuyền).  đoàn dùng cơm tối và nghỉ đêm tại Phượng Hoàng .
                            <br />
                            <br />
                            Ngày 4 - PHƯỢNG HOÀNG CỔ TRẤN – TRƯƠNG GIA GIỚI – THƯỜNG ĐỨC (Ăn ba bữa)
                            Đoàn ăn sáng, đoàn làm thủ tục trả phòng và tiếp tục tham quan Phượng Hoàng Cổ Trấn,  sau đó di chuyển về Trương Gia Giới tham quan Thiên Môn Sơn nằm trong vườn quốc gia Núi Thiên Môn, Điểm đặc biệt ở đây là cung đường với 99 khúc cua ngoạn mục. Từ đó, vượt qua 999 bậc thang, du khách sẽ đặt chân đến “Cổng trời”, nơi được cho là điểm trung chuyển giữa thiên đường và hạ giới. Cổng cao 130 m, rộng 57 m, hình thành sau một cơn đại hồng thủy khiến núi đá vôi sụp xuống tạo thành mái vòm. Tên Thiên Môn cũng ra đời từ đó. Hệ thống cáp treo tại Thiên Môn được tuyên bố trong các ấn phẩm du lịch là "cáp treo dài nhất tại một ngọn núi cao nhất trên thế giới” với 98 cabin cáp treo và tổng chiều dài lên tới hơn 7.400 mét ga chênh lệch của tuyến cáp treo là 1.279 mét. Chương trình đã bao gồm chi phí cáp treo – xe điện trung chuyển – thang máy trong khu thắng cảnh. Trải nghiệm hành lang kính men theo dãy núi trong công viên quốc gia Trương Gia Giới thu hút hàng nghìn du khách từ ngày mở cửa (đã bao gồm bọc giày khi tham quan). Đoàn tự do tham quan và mua sắm tại của hàng trà và cửa hàng ngọc.  Sau đó đoàn tiếp tục di chuyển đến với Thường Đức , đoàn nghỉ đêm tại khách sạn 4* tiêu chuẩn địa phương ở Thường Đức .
                            <br />
                            <br />
                            Ngày 5 - THƯỜNG ĐỨC - NGHI XƯƠNG – TP HỒ CHÍ MINH (Ăn sáng, ăn trưa nhẹ trên chuyến bay)
                            Đoàn ăn sáng và làm thủ tục trả phòng tạm biệt Nghi Xương xinh đẹp xe đưa đoàn di chuyển ra sân bay đón chuyến bay về Việt Nam (chuyến bay có phục vụ ăn nhẹ). Về đến sân bay Tân Sơn Nhất, kết thúc chương trình tham quan. Hẹn gặp lại Quý khách trong những chương trình sắp tới cùng Vietravel. */}
                        </div>
                    </div>
                </div>
                <div className='detail_content_overview_note'>
                    <h2 className='font-bold pb-3 pt-2'>Lưu ý</h2>
                    <div className='detail_content_card sgt-tab'>
                        <div className="sgt-tab-links-wrap">
                            <button id="#tab-1" className="sgt-tab-links active">Giá bao gồm</button>
                            <button id="#tab-2" className="sgt-tab-links">Giá không bao gồm</button>
                            <button id="#tab-3" className="sgt-tab-links">Phụ thu</button>
                            <button id="#tab-4" className="sgt-tab-links">Hủy/Đổi</button>
                            <button id="#tab-5" className="sgt-tab-links">Visa</button>
                            <button id="#tab-6" className="sgt-tab-links">Khác</button>
                        </div>
                        <div className='sgt-tab-content-wrap'>
                            <div id="tab-1" className="sgt-tab-content active">
                                {data?.price_inclusive_of_info}
                                - Vé máy bay khứ hồi.
                                <br />
                                - Thuế phi trường hai nước, phụ phí xăng dầu, an ninh hàng không.
                                <br />
                                - Visa ĐOÀN Trung Quốc.
                                <br />
                                - Khách sạn 4 sao theo tiêu chuẩn địa phương (phòng hai người).
                                <br />
                                - Ăn uống, tham quan và vận chuyển như chương trình.
                                <br />
                                - Hướng dẫn viên suốt tuyến.
                                <br />
                                - Bảo hiểm du lịch.
                                <br />
                                Đặc biệt, Vietravel tặng cho tất cả du khách (đến dưới 80 tuổi) phí Bảo hiểm du lịch với mức bồi thường tối đa lên đến 460.000.000 VND cho nhân mạng và lên đến 30.000.000 VND cho hành lý.
                            </div>
                            <div id="tab-2" className="sgt-tab-content">
                                {data?.price_exclusive_of}
                                - Phụ thu visa DÁN đối với khách quốc tịch Việt Nam: 1,900,000vnd/visa
                                <br />
                                - Phụ thu visa DÁN đối với khách mang quốc tịch Mỹ là 4,100,000vnd/visa, quốc tịch Canada là 2,300,000vnd/visa. Quốc tịch Brazil là 3,700,000vnd và các quốc tịch khác là 1,900,000vnd//visa.
                                (Phí visa dán áp dụng từ 11/12/2023 - 31/12/2024 hoặc cho đến khi có thông báo mới.)
                                <br />
                                - Chi phí dời ngày, đổi chặng, nâng hạng vé máy bay. Trường hợp Quý khách không sử dụng chặng đi của vé đoàn theo tour, các chặng nội địa (nếu có) và quốc tế còn lại sẽ bị hủy do điều kiện của hãng hàng không.
                                <br />
                                - Trong trường hợp Quý khách chỉ mua land tour và có giờ bay không trùng với giờ bay của đoàn: Quý khách vui lòng tự túc để nhập đoàn ngày đến và tự túc ra sân bay ngày về.
                                <br />
                                - Nước uống (bia rượu trong bữa ăn), điện thoại, giặt ủi, hành lý quá cước theo quy định của hàng không.
                                <br />
                                - Thuốc men, bệnh viện… và chi phí cá nhân của khách ngoài chương trình.
                                <br />
                                - Tiền bồi dưỡng cho hướng dẫn viên và tài xế địa phương tương đương 125.000vnd/khách/ ngày
                                <br />
                                - Các bữa ăn trên máy bay.
                            </div>
                            <div id="tab-3" className="sgt-tab-content">
                                {data?.additional_charge_info}
                            </div>
                            <div id="tab-4" className="sgt-tab-content">
                                {data?.cancel_or_change_info}
                            </div>
                            <div id="tab-5" className="sgt-tab-content">
                                {data?.visa_info}
                            </div>
                            <div id="tab-6" className="sgt-tab-content">
                                {data?.other_info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TourOverview