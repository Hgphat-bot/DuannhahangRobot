import React, { useState } from 'react';
import './ReservationPage.css';

function ReservationPage() {
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [tableType, setTableType] = useState('normal');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  const handleTimeChange = (event) => {
    setReservationTime(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setNumberOfGuests(parseInt(event.target.value, 10));
  };

  const handleTableTypeChange = (event) => {
    setTableType(event.target.value);
  };

  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleContactChange = (event) => {
    setCustomerContact(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const bookingData = {
      customerName: customerName,
      customerContact: customerContact,
      reservationTime: reservationTime,
      numberOfGuests: numberOfGuests,
      tableType: tableType,
    };

    console.log("Thông tin đặt bàn:", bookingData);
    setBookingStatus('processing'); // Đặt trạng thái đang xử lý

    try {
      const response = await fetch('http://localhost:3001/api/reservations', { // <-- URL CỦA ENDPOINT BACKEND ĐẶT BÀN
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData), // Gửi dữ liệu form dưới dạng JSON
      });

      const result = await response.json(); // Chờ và đọc phản hồi JSON từ backend

      if (response.ok) { // Kiểm tra nếu backend trả về status 200-299 (thành công)
        console.log("Đặt bàn thành công:", result);
        setBookingStatus('success'); // Cập nhật state thành 'success'
        // Có thể xóa trắng form sau khi thành công
        // setReservationTime('');
        // setNumberOfGuests(1);
        // setTableType('normal');
        // setCustomerName('');
        // setCustomerContact('');

      } else { // Nếu backend trả về lỗi (status >= 400)
        console.error('Lỗi từ backend:', result.message || response.statusText);
        setBookingStatus('error'); // Cập nhật state thành 'error'
      }

    } catch (error) { // Bắt lỗi khi gửi request (ví dụ: server backend không chạy)
      console.error('Lỗi khi gửi request đặt bàn:', error);
      setBookingStatus('error'); // Cập nhật state thành 'error'
    }
    // --- KẾT THÚC GỬI DỮ LIỆU ĐẶT BÀN ---
  };

  return (
    <div className="reservation-container">
      <h1>Đặt Bàn</h1>
      <p>Vui lòng điền thông tin để đặt bàn tại nhà hàng của chúng tôi.</p>

      {bookingStatus === 'processing' && (
            <div className='booking-messege processing'>Đang sử lý đặt bàn...</div>
      )}
      {bookingStatus === 'success' && (
            <div className="booking-message success">Bạn đã đặt bàn thành công!</div>
      )}
      {bookingStatus === 'errol' && (
            <div className="booking-message error">Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại.</div>
      )}
      <form onSubmit={handleSubmit} className="reservation-form">

        <div className="form-group">
          <label htmlFor="reservationTime">Thời gian nhận bàn lúc mấy giờ:</label>
          <input
            type="time"
            id="reservationTime"
            value={reservationTime}
            onChange={handleTimeChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfGuests">Đi mấy người:</label>
          <input
            type="number"
            id="numberOfGuests"
            value={numberOfGuests}
            onChange={handleGuestsChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Hạng bàn:</label>
          <div className="radio-group">
            <input
              type="radio"
              id="tableTypeNormal"
              name="tableType"
              value="normal"
              checked={tableType === 'normal'}
              onChange={handleTableTypeChange}
            />
            <label htmlFor="tableTypeNormal">Hạng Thường</label>
          </div>
          <div className="radio-group">
             <input
              type="radio"
              id="tableTypeVIP"
              name="tableType"
              value="vip"
              checked={tableType === 'vip'}
              onChange={handleTableTypeChange}
            />
            <label htmlFor="tableTypeVIP">Hạng VIP</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Tên của bạn:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerContact">Số điện thoại hoặc Email:</label>
          <input
            type="text"
            id="customerContact"
            value={customerContact}
            onChange={handleContactChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Đặt Bàn Ngay</button>

      </form>

    </div>
  );
}

export default ReservationPage;