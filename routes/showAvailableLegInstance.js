import express from "express";
import { Reservationsql, selectsql } from "../database/sql";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("ShowAvailableReservation입니다:", req.body);
  const data = {
    Arrival_Airport: req.body.insert_Arrival_Airport,
    Departure_Airport: req.body.insert_Departure_Airport,
  }; //post로 보낼 정보에는 data라는 객체 안에 Airport속성이 있다.
  await Reservationsql.showAvailableLegInstance(data);

  res.redirect("/user"); // /delete로 redirect한다.
});

router.get("/", async (req, res) => {
  console.log("예약가능 한 거 가져와보자");
  const Avdata = Reservationsql.showAvailableLegInstance();
  const Airport = selectsql.getAirport();
  res.render("user", {
    Avdata,
    Airport,
  });
});

module.exports = router; // 꼭 export를 시켜줘야한다.
