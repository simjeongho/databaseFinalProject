import express from "express";
import { Reservationsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Reservation Post입니다:", req.body);
  //console.log(vars.id, "Reservation에서 부르는 vars.id");
  const data = {
    Flight_number: req.body.insert_Flight_Reservate,
    Leg_number: req.body.insert_Leg_number_Reservate,
    Date: req.body.insert_Date_Reservate,
    Seat_Number: req.body.insert_Seat_Number,
    Customer_Name: req.body.insert_Customer_Name,
    Customer_Phone: req.body.insert_Customer_Phone,
    Airplane_id: req.body.insert_Airplane_id_Reservate,
  }; //post로 보낼 정보에는 data라는 객체 안에 Airport속성이 있다.
  console.log(data);
  console.log("resbody입니다!!!!!!!!!", res.body);
  await Reservationsql.Reservation(data);

  res.redirect("/user"); // /delete로 redirect한다.
});

router.get("/", async (req, res) => {
  res.render("user", {
    //user.hbs파일을 렌더링한다.
    title: "유저 페이지",
  });
});

module.exports = router; // 꼭 export를 시켜줘야한다.
