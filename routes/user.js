import express from "express";
import { Reservationsql, selectsql } from "../database/sql";

const router = express.Router();

router.get("/", async (req, res) => {
  const Av = await Reservationsql.getAvailableInstance();
  const user = await Reservationsql.showUser();
  const Airport = await selectsql.getAirport();
  const Seat_Reservation = await Reservationsql.getSeatReservation();
  res.render("user", {
    //user.hbs파일을 렌더링한다.
    title: "유저 페이지",
    Av,
    user,
    Airport,
    Seat_Reservation,
  });
});

router.post("/", async (req, res) => {
  console.log("Reservation Post입니다:", req.body.ReservationBtn);
  const data = {
    Flight_number: req.body.ReservationBtn.substring(0, 1),
    Leg_number: req.body.ReservationBtn.substring(1, 2),
    Airplane_id: req.body.ReservationBtn.substring(2, 8),
    Date: req.body.ReservationBtn.substring(8, 8),
  }; //post로 보낼 정보에는 data라는 객체 안에 Airport속성이 있다.
  await Reservationsql.Reservation(data);

  res.redirect("/user"); // /delete로 redirect한다.
});

module.exports = router; // 꼭 export를 시켜줘야한다.
