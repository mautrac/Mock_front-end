//Luồng xử lý
//1) vào ticket đặt hàng sẽ được list ticket theo id của người dùng
//Router 1: /api/v1/tickets/list
//2) Trong trường "id" sẽ lấy được scheduleId của từng ticket được đặt
//Thông qua scheduleId sẽ lấy được lịch chiếu (1 id tương ứng với 1 lịch chiếu)
//Router 2: /api/v1/film-schedules/:scheduleId
//3) Trong trường "film" sẽ lấy được filmId của phim trong lịch chiếu đó (1 id lịch chiếu chỉ có 1 phim)
//Thông qua filmId sẽ lấy được phim
//Router 3: /api/v1/films/:filmId
//4)Từ các router sẽ lấy được kết quả cần trả về cho các trường cart item
// poster  |   Tên phim   |  Thời gian chiếu   |  Số lượng  |  Tổng tiền
//5) 2-3-4 sẽ được chạy trong vòng for để lấy hết các item trong list ticket
import React from "react";
const CartItem = () => (
  <div className="text-center">
    <p className="h2 font-weight-normal mt-3 mb-4">
     This thi cart page
    </p>
  </div>
);
export default CartItem;