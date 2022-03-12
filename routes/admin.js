import express from "express";
import { selectsql, deletesql, insertsql } from "../database/sql";

const router = express.Router();

router.get("/", async (req, res) => {
  const User = await selectsql.getUser();
  const airport = await selectsql.getAirport();
  const airplane = await selectsql.getAirplane();
  const legInstance = await selectsql.getLegInstance();
  res.render("admin", {
    //admin.hbs파일을 렌더링한다.
    title: "관리자 페이지 ",
    User,
    airport,
    airplane,
    legInstance,
  });
});

router.post("/", async (req, res) => {
  console.log("delete router:", req.body.AirportdelBtn);
  const data = {
    Airport_code: req.body.AirportdelBtn,
  }; //post로 보낼 정보에는 data라는 객체 안에 Airport속성이 있다.
  await deletesql.deleteAirport(data);

  res.redirect("/admin"); // /delete로 redirect한다.
});

module.exports = router; // 꼭 export를 시켜줘야한다.
