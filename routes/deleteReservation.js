import express from "express";
import { Reservationsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("delete Reservation Router:", req.body);
  const data = {
    Flight_number: req.body.ReservationdelBtn.substring(0, 1),
    Leg_number: req.body.ReservationdelBtn.substring(1, 2),
    Seat_Number: req.body.ReservationdelBtn.substring(2, 3),
    Airplane_id: req.body.ReservationdelBtn.substring(3, 9),
    Date: req.body.ReservationdelBtn.substring(9, 60),
  };
  console.log(data);
  Reservationsql.deleteSeatReservation(data);
  res.redirect("/user");
});
router.get("/", async (req, res) => {
  const Seat_Reservation = await Reservationsql.getSeatReservation();
  res.render("user", {
    //user.hbs파일을 렌더링한다.
    title: "유저 페이지",
    Seat_Reservation,
  });
});
module.exports = router; // 꼭 export를 시켜줘야한다.
