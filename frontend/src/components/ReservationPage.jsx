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

  const handleSubmit = (event) => {
    event.preventDefault();


    const bookingData = {
      time: reservationTime,
      guests: numberOfGuests,
      type: tableType,
      name: customerName,
      contact: customerContact,
    };

    console.log("Thông tin đặt bàn:", bookingData);
    setBookingStatus('processing');
    setTimeout(() => {
        setBookingStatus('success');
    }, 1000);

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