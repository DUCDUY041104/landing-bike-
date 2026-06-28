import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Kiểm tra sức khỏe hệ thống (Health Check)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Email server is running." });
});

// Endpoint nhận thông tin liên hệ và gửi Email
app.post("/api/send-email", async (req: Request, res: Response): Promise<any> => {
  const { name, phone, message } = req.body;

  // Validate đầu vào
  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin: name, phone, message.",
    });
  }

  try {
    // 1. Tạo transporter cấu hình SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true cho port 465, false cho các port khác như 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Mật khẩu ứng dụng (App Password)
      },
    });

    // 2. Nội dung Email gửi về cho quản trị viên
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Đứng dưới tên khách gửi
      to: process.env.RECEIVER_EMAIL,
      replyTo: phone, // Cho phép bấm trả lời qua số điện thoại hoặc email khách hàng
      subject: `[Xe điện Thế Quỳnh] Tin nhắn liên hệ mới từ ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Khách Hàng Liên Hệ Mới</h2>
          </div>
          <div style="padding: 20px; color: #333333;">
            <p>Xin chào,</p>
            <p>Hệ thống vừa ghi nhận một tin nhắn liên hệ mới:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 120px; border-bottom: 1px solid #f0f0f0;">Họ tên:</td>
                <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Số điện thoại:</td>
                <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Thời gian:</td>
                <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${new Date().toLocaleString("vi-VN")}</td>
              </tr>
            </table>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981; margin-top: 10px;">
              <p style="margin: 0; font-weight: bold; margin-bottom: 5px;">Nội dung tin nhắn:</p>
              <p style="margin: 0; font-style: italic; color: #555555;">"${message}"</p>
            </div>
          </div>
          <div style="background-color: #f4f4f5; text-align: center; padding: 12px; font-size: 11px; color: #71717a; border-top: 1px solid #e4e4e7;">
            Email từ Website Xe điện Thế Quỳnh.
          </div>
        </div>
      `,
    };

    // 3. Thực hiện gửi Email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: %s", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Tin nhắn đã được gửi thành công đến email quản trị viên!",
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("Lỗi gửi Email qua Nodemailer:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi gửi email: " + error.message,
    });
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`[Server] Email backend running at: http://localhost:${PORT}`);
});
