// backend/index.js

const express = require('express');
const app = express();
const cors = require('cors'); // Import thư viện CORS
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sqlite3 = require('sqlite3').verbose();

// Định nghĩa cổng mà server sẽ lắng nghe
const port = 3001;

const geminiApiKey = "AIzaSyDTOiD-5vm6JDtHGNwYSoyHTfxf1OC_CuU"; // <-- THAY THẾ BẰNG API KEY THỰC TẾ CỦA BẠN

// Khởi tạo Google Generative AI với API Key
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Chọn model Gemini bạn muốn sử dụng (ví dụ: "gemini-pro")
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `
        Bạn là chatbot hỗ trợ khách hàng và nhân viên của Nhà hàng ABC.
        Nhiệm vụ của bạn là cung cấp thông tin và hướng dẫn người dùng về các chức năng của trang web Nhà hàng ABC.
        Các chức năng chính của web bao gồm:
        - Trang Giới thiệu (Trang chủ): Cung cấp thông tin về nhà hàng.
        - Trang Menu (Menu): Hiển thị danh sách nhân viên và các món ăn và thức uống.
        - Trang Đặt Bàn (Đặt bàn): Cho phép khách hàng đặt bàn trực tuyến.
        - Trang Chatbot (Chatbot): Là trang hiện tại bạn đang hoạt động.

        Chỉ trả lời các câu hỏi liên quan đến Nhà hàng ABC, menu, đặt bàn, giờ mở cửa, dịch vụ, nhân viên, hoặc hướng dẫn sử dụng trang web.
        Nếu người dùng hỏi về menu, hãy nhắc họ truy cập trang Menu.
        Nếu người dùng muốn đặt bàn, hãy hướng dẫn họ vào trang Đặt Bàn.
        Nếu câu hỏi không liên quan đến nhà hàng hoặc các chức năng của web, hãy lịch sự từ chối trả lời và nhắc nhở người dùng tập trung vào chủ đề nhà hàng.
        Đảm bảo phản hồi thân thiện, chuyên nghiệp và rõ ràng.
    `
});

const db = new sqlite3.Database('./database.sqlite', (err) => { // <-- File database sẽ là database.sqlite trong thư mục backend
  if (err) {
    console.error('Lỗi kết nối Database:', err.message);
  } else {
    console.log('Kết nối Database SQLite thành công.');
    // Bật chế độ FOREIGN KEYS (tùy chọn, tốt cho quan hệ giữa các bảng)
    db.exec('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
            console.error("Lỗi bật FOREIGN KEYS:", err.message);
        } else {
             console.log("PRAGMA foreign_keys = ON.");
        }
    });
  }
});

db.serialize(() => {
  // Bảng cho Đặt bàn (Reservations)
  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT, /* ID tự tăng */
      customer_name TEXT NOT NULL,         /* Tên khách hàng */
      customer_contact TEXT NOT NULL,      /* Số điện thoại hoặc email */
      reservation_time TEXT NOT NULL,      /* Thời gian đặt */
      number_of_guests INTEGER NOT NULL,   /* Số lượng khách */
      table_type TEXT NOT NULL,          /* Hạng bàn */
      booking_time DATETIME DEFAULT CURRENT_TIMESTAMP /* Thời gian đặt trên hệ thống */
    );
  `, (err) => {
      if (err) {
          console.error('Lỗi tạo bảng reservations:', err.message);
      } else {
          console.log('Bảng reservations sẵn sàng.');
      }
  });

  // Bảng cho Đơn hàng (Orders) - Cho chức năng gọi món
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,                 /* Tên khách hàng (nếu có) */
      customer_contact TEXT,              /* Liên hệ khách hàng (nếu có) */
      order_time DATETIME DEFAULT CURRENT_TIMESTAMP, /* Thời gian đặt hàng */
      total_amount REAL                   /* Tổng tiền (sẽ tính sau) */
    );
  `, (err) => {
       if (err) {
          console.error('Lỗi tạo bảng orders:', err.message);
      } else {
          console.log('Bảng orders sẵn sàng.');
      }
  });
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL, /* ID của đơn hàng mà item này thuộc về */
      item_id INTEGER NOT NULL,  /* ID của món ăn */
      item_name TEXT NOT NULL,   /* Tên món ăn (copy từ dữ liệu món ăn) */
      quantity INTEGER NOT NULL, /* Số lượng món này */
      price REAL NOT NULL,       /* Giá của 1 item (copy từ dữ liệu món ăn) */
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE /* Liên kết với bảng orders */
    );
  `, (err) => {
       if (err) {
          console.error('Lỗi tạo bảng order_items:', err.message);
      } else {
          console.log('Bảng order_items sẵn sàng.');
      }
  });

});

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
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

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

app.post('/api/reservations', (req, res) => {
  // Lấy dữ liệu đặt bàn từ request body
  const { customerName, customerContact, reservationTime, numberOfGuests, tableType } = req.body; // Đảm bảo tên các trường khớp với frontend

  // Kiểm tra dữ liệu cơ bản (tùy chọn, nên kiểm tra kỹ hơn)
  if (!customerName || !customerContact || !reservationTime || !numberOfGuests || !tableType) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin đặt bàn." });
  }

  // Câu lệnh SQL để chèn dữ liệu vào bảng reservations
  const sql = `INSERT INTO reservations (customer_name, customer_contact, reservation_time, number_of_guests, table_type) VALUES (?, ?, ?, ?, ?)`;

  // Chạy câu lệnh SQL
  // Sử dụng db.run() để thực thi câu lệnh INSERT/UPDATE/DELETE
  db.run(sql, [customerName, customerContact, reservationTime, numberOfGuests, tableType], function(err) {
    // 'function' thay vì arrow function để có thể truy cập this.lastID
    if (err) {
      console.error('Lỗi khi lưu đặt bàn vào DB:', err.message);
      // Gửi phản hồi lỗi về frontend
      res.status(500).json({ success: false, message: "Lỗi khi lưu đặt bàn." });
    } else {
      // Lưu thành công, this.lastID là ID của dòng vừa chèn
      console.log(`Đã lưu đặt bàn với ID: ${this.lastID}`);
      // Gửi phản hồi thành công về frontend
      res.status(201).json({ success: true, message: "Đặt bàn thành công!", reservationId: this.lastID });
    }
  });
});

app.get('/api/export/reservations', (req, res) => {
  // Truy vấn database để lấy tất cả dữ liệu từ bảng reservations
  const sql = `SELECT * FROM reservations`;

  // Thực thi truy vấn
  // Sử dụng db.all() để lấy TẤT CẢ các dòng kết quả
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Lỗi khi truy vấn database để xuất:', err.message);
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu đặt bàn." });
    } else {
      // Dữ liệu đã lấy thành công (rows là mảng các object)

      // <-- ĐỊNH DẠNG DỮ LIỆU THÀNH CHUỖI CSV -->
      let csvString = '';

      // Thêm dòng header CSV (tên các cột)
      const headers = Object.keys(rows[0] || {}); // Lấy tên các key từ object dòng đầu tiên
      csvString += headers.join(',') + '\n'; // Nối các tên cột bằng dấu phẩy và thêm xuống dòng mới

      // Thêm dữ liệu từng dòng
      rows.forEach((row) => {
        const values = headers.map(header => {
            // Xử lý các giá trị có dấu phẩy hoặc ngoặc kép nếu cần (để tránh lỗi định dạng CSV)
            let value = row[header];
            if (value === null || value === undefined) {
                value = ''; // Xử lý giá trị null/undefined
            }
             // Bọc giá trị trong ngoặc kép nếu chứa dấu phẩy hoặc ngoặc kép
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                 // Thay thế ngoặc kép bằng hai ngoặc kép
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        });
        csvString += values.join(',') + '\n'; // Nối các giá trị bằng dấu phẩy và thêm xuống dòng
      });

      // <-- GỬI PHẢN HỒI CSV VỀ TRÌNH DUYỆT -->
      // Thiết lập header để trình duyệt hiểu đây là file CSV cần tải về
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="reservations.csv"'); // Tên file khi tải về

      // Gửi chuỗi CSV làm nội dung phản hồi
      res.status(200).send(csvString);
    }
  });
});

app.post('/api/orders', (req, res) => {
  // Lấy dữ liệu giỏ hàng từ request body (sẽ là object { itemId: quantity, ... })
  const cartItems = req.body.cart; // Đảm bảo tên trường là 'cart' từ frontend

  // Kiểm tra giỏ hàng có rỗng không
  const itemIds = Object.keys(cartItems);
  if (itemIds.length === 0) {
    return res.status(400).json({ success: false, message: "Giỏ hàng trống, không thể đặt hàng." });
  }

  // Lấy thông tin khách hàng nếu có (tạm thời bỏ qua hoặc lấy từ request body nếu có)
  // const customerName = req.body.customerName;
  // const customerContact = req.body.customerContact;

  // --- BẮT ĐẦU LƯU VÀO DATABASE ---
  // Bước 1: Tạo một đơn hàng mới trong bảng orders
  // Sử dụng db.run với FUNCTION để có thể truy cập this.lastID
  db.run(`INSERT INTO orders (customer_name, customer_contact, order_time) VALUES (?, ?, ?)`,
    [null, null, new Date().toISOString()], // Tạm thời null cho tên/liên hệ, lưu thời gian server
    function(err) {
    if (err) {
      console.error('Lỗi khi tạo đơn hàng trong DB:', err.message);
      return res.status(500).json({ success: false, message: "Lỗi khi tạo đơn hàng." });
    }

    const orderId = this.lastID; // Lấy ID của đơn hàng vừa tạo
    console.log(`Đã tạo đơn hàng với ID: ${orderId}`);

    // Bước 2: Thêm từng món từ giỏ hàng vào bảng order_items
    // Sử dụng db.serialize để đảm bảo các insert item chạy tuần tự sau khi order được tạo
    db.serialize(() => {
        let itemsSavedCount = 0;
        let errorSavingItems = false;

        itemIds.forEach(itemId => {
            const quantity = cartItems[itemId];
            // Cần lấy thông tin chi tiết món ăn (tên, giá) dựa vào itemId
            // Hiện tại chúng ta không có API lấy chi tiết món ăn từ backend
            // Tạm thời sử dụng placeholder hoặc lấy từ dữ liệu món ăn ở frontend
            // Tốt nhất: Frontend gửi kèm tên/giá hoặc Backend có thể lookup trong DB/file
            // Tạm thời: giả định frontend gửi kèm tên và giá của mỗi item trong cart object.
            // Hoặc Context Provider có thể cung cấp hàm lookup item theo ID

            // *** GIẢI PHÁP TẠM: Giả định Context Provider cung cấp hàm getItemById ***
            // Endpoint backend không thể dùng useCart().
            // Cần cách khác để backend lấy thông tin món ăn chi tiết từ ID.
            // Cách tốt nhất là frontend gửi toàn bộ chi tiết món ăn (id, name, price) trong cart object.
            // Hoặc backend có bảng riêng lưu chi tiết món ăn và lookup tại đây.

            // *** SỬA LẠI: Frontend sẽ gửi object cart có cấu trúc tốt hơn {itemId: {quantity: x, name: "...", price: y}, ...} ***
            // Hoặc backend sẽ có bảng 'menu_items_details' và lookup ở đây.
            // Tạm thời, giả định frontend gửi object cart: { itemId: {quantity: ..., name: "...", price: ...} }
             const itemDetails = cartItems[itemId]; // Lấy details từ object cart gửi lên

            // Chèn item vào bảng order_items
            const itemSql = `INSERT INTO order_items (order_id, item_id, item_name, quantity, price) VALUES (?, ?, ?, ?, ?)`;
            db.run(itemSql, [orderId, parseInt(itemId, 10), itemDetails.name, itemDetails.quantity, itemDetails.price], (err) => {
                if (err) {
                    console.error(`Lỗi khi lưu item ${itemId} vào DB:`, err.message);
                    errorSavingItems = true;
                } else {
                    itemsSavedCount++;
                    console.log(`Đã lưu item ${itemDetails.name} (ID: ${itemId}) vào đơn hàng ${orderId}`);
                }

                // Kiểm tra xem đã xử lý hết tất cả các item chưa
                if (itemsSavedCount + (errorSavingItems ? 1 : 0) === itemIds.length) {
                    // Đã xử lý xong tất cả các item
                    if (errorSavingItems) {
                        res.status(500).json({ success: false, message: "Đã lưu đơn hàng, nhưng có lỗi khi lưu một vài món." });
                    } else {
                        res.status(201).json({ success: true, message: "Đơn hàng đã được đặt thành công!", orderId: orderId });
                    }
                }
            });
        });

        // Xử lý trường hợp giỏ hàng rỗng nhưng vẫn gọi API (đã kiểm tra ở trên)
        if (itemIds.length === 0 && !errorSavingItems) {
             res.status(201).json({ success: true, message: "Đơn hàng trống đã được xử lý.", orderId: orderId });
        }

    }); // Kết thúc db.serialize()

    // Nếu db.serialize() không được dùng, cần đếm callback db.run để biết khi nào xong

  }); // Kết thúc db.run() cho bảng orders
  // --- KẾT THÚC LƯU VÀO DATABASE ---
});

app.listen(port, () => {
  console.log(`Server backend đang chạy tại http://localhost:${port}`);
  console.log('Endpoint chat:', `POST http://localhost:${port}/api/chat`);
  console.log('Endpoint đặt bàn:', `POST http://localhost:${port}/api/reservations`);
  console.log('Endpoint xuất đặt bàn CSV:', `GET http://localhost:${port}/api/export/reservations`);
  console.log('Endpoint đặt đồ ăn:', `POST http://localhost:${port}/api/orders`);
});