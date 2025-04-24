// backend/index.js

const express = require('express');
const app = express();
const cors = require('cors'); // Import thư viện CORS
const { GoogleGenerativeAI } = require('@google/generative-ai'); // <-- Import thư viện Gemini

// Định nghĩa cổng mà server sẽ lắng nghe
const port = 3001;

// LẤY API KEY CỦA GEMINI
// *** QUAN TRỌNG ***: Trong ứng dụng thực tế, KHÔNG đặt API Key trực tiếp vào code như thế này.
// Hãy sử dụng biến môi trường (environment variables) để giữ API Key an toàn.
// Ví dụ: const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiApiKey = "AIzaSyDTOiD-5vm6JDtHGNwYSoyHTfxf1OC_CuU"; // <-- THAY THẾ BẰNG API KEY THỰC TẾ CỦA BẠN

// Khởi tạo Google Generative AI với API Key
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Chọn model Gemini bạn muốn sử dụng (ví dụ: "gemini-pro")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // <-- Dòng này

// Middleware để xử lý JSON trong request body
app.use(express.json());

// Cấu hình CORS để cho phép frontend (chạy ở cổng khác) gửi request đến backend
// Thay 'http://localhost:5173' bằng địa chỉ frontend thực tế của bạn nếu khác
app.use(cors({
    origin: 'http://localhost:5173'
}));


// ĐỊNH NGHĨA API ENDPOINT ĐỂ NHẬN TIN NHẮN CHAT
app.post('/api/chat', async (req, res) => { // <-- THÊM 'async' vì gọi API Gemini là bất đồng bộ
  const userMessage = req.body.message;

  console.log('Nhận được tin nhắn từ frontend:', userMessage);

  if (!userMessage) {
    return res.status(400).json({ reply: "Không nhận được tin nhắn." });
  }

  try {
    // GỌI API GEMINI
    // Sử dụng model để tạo nội dung dựa trên tin nhắn người dùng
    const result = await model.generateContent(userMessage); // <-- GỬI TIN NHẮN ĐẾN GEMINI
    const response = await result.response;
    const text = response.text(); // <-- LẤY PHẢN HỒI DẠNG TEXT TỪ GEMINI

    console.log('Phản hồi từ Gemini:', text);

    // Gửi phản hồi của Gemini về cho frontend dưới dạng JSON
    res.json({
      reply: text // Gửi phản hồi dạng text của Gemini
    });

  } catch (error) {
    console.error('Lỗi khi gọi API Gemini:', error);
    // Gửi thông báo lỗi về cho frontend nếu gọi API thất bại
    res.status(500).json({ reply: "Rất tiếc, tôi không thể trả lời lúc này." });
  }
});


// KHỞI ĐỘNG SERVER
app.listen(port, () => {
  console.log(`Server backend đang chạy tại http://localhost:${port}`);
  console.log(`Endpoint nhận tin nhắn chat: POST http://localhost:${port}/api/chat`);
});