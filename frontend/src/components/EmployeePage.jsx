// frontend/src/components/EmployeePage.jsx

import React from 'react';
// Bạn có thể tạo và import file CSS riêng cho trang Nhân viên sau:
import './EmployeePage.css';

function EmployeePage() {
  return (
    <div className="employee-container"> {/* Thêm class để tạo kiểu dáng sau */}
      <h1>Quản lý Nhân viên</h1>
      <p>Đây là trang hiển thị thông tin và các chức năng quản lý nhân viên.</p>
      {/* Nội dung về danh sách nhân viên, thêm/sửa/xóa sẽ ở đây */}
    </div>
  );
}

export default EmployeePage; // Xuất Component này