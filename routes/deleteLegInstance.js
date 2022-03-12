import express from "express";
import { selectsql, deletesql, insertsql } from "../database/sql";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("delete LegInstance router:", req.body.LegInstancedelBtn);
  const data = {
    Flight_number: req.body.LegInstancedelBtn.substring(0, 1),
    Leg_number: req.body.LegInstancedelBtn.substring(1, 2),
    Airplane_id: req.body.LegInstancedelBtn.substring(2, 8),
  }; //post로 보낼 정보에는 data라는 객체 안에 Airport속성이 있다.
  await deletesql.deleteLegInstance(data);

  res.redirect("/admin"); // /delete로 redirect한다.
});

router.get("/", async (req, res) => {
  const Leginstance = await selectsql.getLegInstance();
  res.render("admin", {
    Leginstance,
  });
});

module.exports = router; // 꼭 export를 시켜줘야한다.
